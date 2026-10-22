import { renderLearningPath } from "./guias.js";

const pages = {
  mineria: {
    title: "Minería",
    description: "Practica caracterización geológica, control de muestras y análisis técnico de operaciones mineras.",
    template: "js/modulos/mineria/mineria.html",
    module: "./modulos/mineria/simulador.js",
    learningPath: "mineria"
  },
  agropecuaria: {
    title: "Agropecuaria",
    description: "Interpreta datos agroclimáticos y evalúa decisiones de manejo para sistemas productivos.",
    template: "js/modulos/agropecuaria/agro.html",
    module: "./modulos/agropecuaria/sensores.js",
    learningPath: "agropecuaria"
  },
  mecanica: {
    title: "Mecánica",
    description: "Gestiona repuestos, órdenes de trabajo y costos de mantenimiento industrial.",
    template: "js/modulos/mecanica/mecanica.html",
    module: "./modulos/mecanica/inventario.js",
    learningPath: "mecanica"
  },
  electronica: {
    title: "Electrónica",
    description: "Analiza señales, lógica de control y respuesta de sistemas de automatización.",
    template: "js/modulos/electronica/electronica.html",
    module: "./modulos/electronica/circuitos.js",
    learningPath: "electronica"
  },
  apsti: {
    title: "APSTI",
    description: "Practica ofimática, soporte de hardware, cableado estructurado y administración de servicios TI.",
    template: "js/modulos/apsti/apsti.html",
    module: "./modulos/apsti/terminal.js",
    learningPath: "apsti"
  },
  administracion: {
    title: "Administración",
    description: "Panel local de gestión académica.",
    template: "js/modulos/administracion/admin.html",
    module: "./modulos/administracion/admin.js"
  }
};

const appView = document.querySelector("#app-view");
const appShell = document.querySelector("#app-shell");
const loginGate = document.querySelector("#login-gate");
const pageTitle = document.querySelector("#page-title");
const toastRegion = document.querySelector("#toast-region");
const sidebar = document.querySelector("#sidebar");
const menuToggle = document.querySelector("#menu-toggle");
const identityDisplay = document.querySelector("#session-identity");
const adminNavLink = document.querySelector("#admin-nav-link");
const roleOptions = document.querySelectorAll("[data-role]");
const identityLabel = document.querySelector("#identity-label");
const identityInput = document.querySelector("#gate-identity");
const gateForm = document.querySelector("#gate-form");
const loginGateHeading = document.querySelector(".gate-title");
const rememberIdentity = document.querySelector("#remember-identity");
const passwordInput = document.querySelector("#gate-password");
const passwordToggle = document.querySelector("#password-toggle");
const SESSION_KEY = "iestp-demo-session";
const REMEMBERED_IDENTITY_KEY = "iestp-remembered-identity";
const DEMO_PASSWORDS = {
  student: "ClavePrueba123",
  admin: "AdminPrueba123"
};
let selectedRole = "student";
let currentSession = readSession();
let routeRequest = 0;

function readSession() {
  const stored = sessionStorage.getItem(SESSION_KEY);
  if (!stored) return null;
  let session;
  try {
    session = JSON.parse(stored);
  } catch (error) {
    console.error("No se pudo leer la sesión local:", error);
    sessionStorage.removeItem(SESSION_KEY);
    return null;
  }
  if (!session || (session.role !== "student" && session.role !== "admin") || typeof session.identity !== "string") {
    sessionStorage.removeItem(SESSION_KEY);
    return null;
  }
  return session;
}

function showToast(message, kind = "success") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${kind}`;
  toast.textContent = message;
  toastRegion.append(toast);
  window.setTimeout(() => toast.remove(), 3200);
}

function renderHome() {
  pageTitle.textContent = "Inicio";
  appView.innerHTML = `
    <section class="hero">
      <div class="hero-copy">
        <span class="eyebrow"><span class="live-dot"></span> Aprendizaje práctico, desde cualquier lugar</span>
        <h1>Laboratorios virtuales<br><span>para aprender haciendo.</span></h1>
        <p>Experimenta, consulta rutas formativas y fortalece tus habilidades técnicas con simuladores educativos del IESTP-ESPINAR.</p>
        <a class="button button-light" href="#mineria">Explorar laboratorios <span aria-hidden="true">→</span></a>
      </div>
      <div class="hero-art" aria-hidden="true">
        <div class="orbit orbit-one"></div><div class="orbit orbit-two"></div>
        <div class="hero-core"><span>IESTP</span><strong>LAB</strong></div>
        <span class="orbit-node node-one">⚙</span><span class="orbit-node node-two">ϟ</span>
        <span class="orbit-node node-three">◉</span>
      </div>
      <div class="hero-index">ESPINAR <span>·</span> CUSCO</div>
    </section>
    <section class="section-block">
      <div class="section-heading">
        <div><span class="eyebrow">Entornos de práctica</span><h2>Elige tu laboratorio</h2></div>
        <span class="section-count">05 áreas técnicas</span>
      </div>
      <div class="lab-grid">
        ${Object.entries(pages).filter(([id]) => id !== "administracion").map(([id, page], index) => `
          <a class="lab-card" href="#${id}">
            <div class="lab-card-top"><span class="lab-card-icon icon-${id}">${["⛏", "◉", "⚙", "ϟ", "⌘"][index]}</span><span class="card-arrow">↗</span></div>
            <span class="card-number">0${index + 1} / LABORATORIO</span>
            <h3>${page.title}</h3>
            <p>${page.description}</p>
            <span class="card-action">Abrir simulador <span aria-hidden="true">→</span></span>
          </a>`).join("")}
      </div>
    </section>
    <section class="open-banner">
      <div class="open-mark">↗</div>
      <div><span class="eyebrow">Conocimiento compartido</span><h2>Aprender también es experimentar.</h2><p>Este espacio reúne prácticas digitales para acompañar la formación técnica. Los datos y procesos presentados son simulaciones didácticas.</p></div>
      <a class="button button-outline" href="https://iestpespinar.edu.pe/" target="_blank" rel="noreferrer">Conocer el instituto ↗</a>
    </section>`;
}

async function renderRoute() {
  if (!currentSession) return;
  const request = ++routeRequest;
  let route = window.location.hash.slice(1) || "inicio";
  if (route === "administracion" && currentSession.role !== "admin") {
    route = "inicio";
    window.location.hash = route;
    showToast("El panel de administración es exclusivo del modo administrador.", "error");
  }
  document.querySelectorAll(".nav-link").forEach(link => {
    const active = link.dataset.route === route;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  setSidebarOpen(false);

  if (route === "inicio" || !pages[route]) {
    renderHome();
    return;
  }

  const page = pages[route];
  pageTitle.textContent = page.title;
  appView.innerHTML = `<div class="loading-state"><span class="loader"></span><p>Cargando laboratorio…</p></div>`;
  try {
    const response = await fetch(page.template);
    if (!response.ok) throw new Error(`No se pudo cargar ${page.template}: ${response.status}`);
    const template = await response.text();
    if (request !== routeRequest) return;
    appView.innerHTML = template;
    const module = await import(page.module);
    if (request !== routeRequest) return;
    if (page.learningPath) {
      module.init({ root: appView, notify: showToast });
      renderLearningPath({ root: appView, area: page.learningPath });
    } else {
      module.init({ root: appView, notify: showToast });
    }
  } catch (error) {
    if (request !== routeRequest) return;
    console.error("Error al cargar el laboratorio:", error);
    appView.innerHTML = `<section class="error-card"><span class="eyebrow">No disponible</span><h1>No se pudo abrir este laboratorio.</h1><p>Comprueba que los archivos del proyecto estén servidos desde un servidor web local y vuelve a intentarlo.</p><a class="button button-dark" href="#inicio">Volver al inicio</a></section>`;
  }
}

window.addEventListener("hashchange", renderRoute);
menuToggle.addEventListener("click", () => {
  setSidebarOpen(!sidebar.classList.contains("sidebar-open"));
});
document.addEventListener("click", event => {
  if (!sidebar.classList.contains("sidebar-open")) return;
  if (sidebar.contains(event.target) || menuToggle.contains(event.target)) return;
  setSidebarOpen(false);
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && sidebar.classList.contains("sidebar-open")) {
    setSidebarOpen(false);
    menuToggle.focus();
  }
});

function setSidebarOpen(isOpen) {
  sidebar.classList.toggle("sidebar-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
}

function updateRole(role) {
  const roleChanged = selectedRole !== role;
  selectedRole = role;
  roleOptions.forEach(option => {
    const selected = option.dataset.role === role;
    option.hidden = selected;
    option.classList.toggle("selected", selected);
    option.setAttribute("aria-selected", String(selected));
    option.tabIndex = selected ? 0 : -1;
  });
  const administrator = role === "admin";
  identityLabel.textContent = administrator ? "Usuario administrador" : "DNI o usuario";
  identityInput.placeholder = administrator ? "Escribe tu usuario administrador" : "Escribe tu DNI o usuario";
  loginGateHeading.textContent = administrator ? "Acceso de administrador" : "Iniciar sesión";
  if (roleChanged) passwordInput.value = "";
  try {
    const rememberedIdentity = localStorage.getItem(`${REMEMBERED_IDENTITY_KEY}-${role}`);
    identityInput.value = rememberedIdentity || "";
    rememberIdentity.checked = Boolean(rememberedIdentity);
  } catch (error) {
    console.error("No se pudo cargar el usuario recordado:", error);
  }
  gateForm.querySelector("button[type='submit']").innerHTML = administrator
    ? "Entrar al panel administrador <span aria-hidden='true'>→</span>"
    : "Ingresar al sistema <span aria-hidden='true'>→</span>";
}

function startDemoSession(role, identity) {
  const nextSession = { role, identity };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(nextSession));
  currentSession = nextSession;
  loginGate.hidden = true;
  appShell.hidden = false;
  adminNavLink.hidden = role !== "admin";
  identityDisplay.textContent = `${role === "admin" ? "Administrador" : "Estudiante"} · ${identity}`;
  if (role === "admin") window.location.hash = "#administracion";
  else window.location.hash = "#inicio";
  renderRoute();
}

function endDemoSession() {
  sessionStorage.removeItem(SESSION_KEY);
  currentSession = null;
  appShell.hidden = true;
  loginGate.hidden = false;
  identityDisplay.textContent = "";
  adminNavLink.hidden = true;
  gateForm.reset();
  updateRole("student");
  window.location.hash = "#inicio";
}

roleOptions.forEach((option, index) => {
  option.addEventListener("click", () => updateRole(option.dataset.role));
  option.addEventListener("keydown", event => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? roleOptions.length - 1
      : (index + (event.key === "ArrowRight" ? 1 : -1) + roleOptions.length) % roleOptions.length;
    roleOptions[next].focus();
    updateRole(roleOptions[next].dataset.role);
  });
});
gateForm.addEventListener("submit", event => {
  event.preventDefault();
  if (!gateForm.reportValidity()) return;
  const identity = identityInput.value.trim();
  const password = passwordInput.value;
  if (!identity) {
    identityInput.focus();
    return;
  }
  const role = password === DEMO_PASSWORDS.student ? "student"
    : password === DEMO_PASSWORDS.admin ? "admin"
      : null;
  if (!role) {
    passwordInput.focus();
    showToast("La contraseña no corresponde al acceso de estudiante ni al de administrador.", "error");
    return;
  }
  selectedRole = role;
  try {
    const rememberKey = `${REMEMBERED_IDENTITY_KEY}-${selectedRole}`;
    if (rememberIdentity.checked) localStorage.setItem(rememberKey, identity);
    else localStorage.removeItem(rememberKey);
  } catch (error) {
    console.error("No se pudo guardar la preferencia de usuario:", error);
    showToast("No se pudo guardar la opción de recordatorio.", "error");
  }
  try {
    startDemoSession(selectedRole, identity);
    passwordInput.value = "";
  } catch (error) {
    currentSession = null;
    console.error("No se pudo iniciar la sesión:", error);
    showToast("El navegador no permitió iniciar la sesión local. Revisa su configuración.", "error");
  }
});
document.querySelector("#logout-trigger").addEventListener("click", endDemoSession);
passwordToggle.addEventListener("click", () => {
  const visible = passwordInput.type === "password";
  passwordInput.type = visible ? "text" : "password";
  passwordToggle.setAttribute("aria-pressed", String(visible));
  passwordToggle.setAttribute("aria-label", visible ? "Ocultar contraseña" : "Mostrar contraseña");
});

try {
  const rememberedIdentity = localStorage.getItem(`${REMEMBERED_IDENTITY_KEY}-student`);
  identityInput.value = rememberedIdentity || "";
  rememberIdentity.checked = Boolean(rememberedIdentity);
} catch (error) {
  console.error("No se pudo leer la preferencia de usuario:", error);
}

if (currentSession) {
  loginGate.hidden = true;
  appShell.hidden = false;
  adminNavLink.hidden = currentSession.role !== "admin";
  identityDisplay.textContent = `${currentSession.role === "admin" ? "Administrador" : "Estudiante"} · ${currentSession.identity}`;
  renderRoute();
} else {
  appShell.hidden = true;
  loginGate.hidden = false;
  updateRole("student");
}
