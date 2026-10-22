import { createTerminal } from "./orquestador.js";
import { runCommand } from "./parser.js";

export function init({ root }) {
  const practiceTabs = [...root.querySelectorAll("[data-practice-tab]")];
  const practicePanels = [...root.querySelectorAll("[data-practice-panel]")];
  practiceTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => showPractice(tab.dataset.practiceTab));
    tab.addEventListener("keydown", event => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === "Home" ? 0 : event.key === "End" ? practiceTabs.length - 1
        : (index + (event.key === "ArrowRight" ? 1 : -1) + practiceTabs.length) % practiceTabs.length;
      practiceTabs[next].focus();
      showPractice(practiceTabs[next].dataset.practiceTab);
    });
  });

  function showPractice(id) {
    practiceTabs.forEach(tab => {
      const selected = tab.dataset.practiceTab === id;
      tab.setAttribute("aria-selected", String(selected));
      tab.classList.toggle("selected", selected);
      tab.tabIndex = selected ? 0 : -1;
    });
    practicePanels.forEach(panel => {
      panel.hidden = panel.dataset.practicePanel !== id;
    });
  }

  const serviceCatalog = {
    dhcp: "DHCP · Asigna parámetros IP automáticamente a los clientes de una red. En diagnóstico, revisa alcance configurado, concesiones, puerta de enlace y disponibilidad del servicio.",
    dns: "DNS · Traduce nombres de dominio a registros de red. Para resolver fallos, comprueba el nombre consultado, la configuración del resolvedor y la respuesta autorizada.",
    backup: "Copias de seguridad · Permiten recuperar datos ante pérdidas o fallos. Define alcance, retención, protección, pruebas de restauración y responsables según la política institucional.",
    virtualization: "Virtualización · Ejecuta sistemas aislados sobre recursos compartidos. Evalúa capacidad, almacenamiento, redes virtuales, actualizaciones y copias de seguridad.",
    database: "Base de datos · Organiza datos estructurados y permite consultas controladas. Aprende roles, respaldo, integridad y control de acceso en entornos autorizados."
  };
  const serviceSelect = root.querySelector("#apsti-service-select");
  const serviceInfo = root.querySelector("#apsti-service-info");
  const updateServiceInfo = () => { serviceInfo.textContent = serviceCatalog[serviceSelect.value]; };
  serviceSelect.addEventListener("change", updateServiceInfo);
  updateServiceInfo();

  root.querySelector("#apsti-subnet-calculate").addEventListener("click", () => {
    const prefix = Number(root.querySelector("#apsti-subnet-prefix").value);
    const result = root.querySelector("#apsti-subnet-result");
    if (!Number.isInteger(prefix) || prefix < 24 || prefix > 30) {
      result.classList.add("notice-error");
      result.textContent = "Selecciona un prefijo CIDR entre /24 y /30.";
      return;
    }
    const totalAddresses = 2 ** (32 - prefix);
    const hostAddresses = totalAddresses - 2;
    result.classList.remove("notice-error");
    result.textContent = `Prefijo /${prefix}: ${totalAddresses} direcciones totales y ${hostAddresses} direcciones de host en el modelo IPv4 convencional. La capacidad real depende del diseño y del uso de direcciones reservadas.`;
  });

  root.querySelector("#office-calculate").addEventListener("click", () => {
    const values = ["#office-labor", "#office-parts", "#office-supplies"].map(selector => Number(root.querySelector(selector).value));
    const results = root.querySelector("#office-results");
    if (values.some(value => !Number.isFinite(value) || value < 0)) {
      results.innerHTML = '<div class="notice notice-error">Ingresa importes válidos iguales o mayores que cero.</div>';
      return;
    }
    const subtotal = values.reduce((total, value) => total + value, 0);
    const tax = subtotal * 0.18;
    const total = subtotal + tax;
    results.innerHTML = `
      <div class="metric"><span>Subtotal</span><strong>S/ ${subtotal.toFixed(2)}</strong><small>SUMA de conceptos</small></div>
      <div class="metric"><span>IGV referencial (18%)</span><strong>S/ ${tax.toFixed(2)}</strong><small>Verifica la tasa vigente</small></div>
      <div class="metric"><span>Total calculado</span><strong>S/ ${total.toFixed(2)}</strong><small>Subtotal más impuesto</small></div>`;
  });

  const socket = root.querySelector("#assembly-cpu");
  const boardSocket = root.querySelector("#assembly-board-socket");
  const boardRam = root.querySelector("#assembly-board-ram");
  const selectedRam = root.querySelector("#assembly-ram");
  const load = root.querySelector("#assembly-load");
  const psu = root.querySelector("#assembly-psu");
  root.querySelector("#assembly-check").addEventListener("click", () => {
    const issues = [];
    if (socket.value !== boardSocket.value) issues.push("El socket del procesador no coincide con el de la placa.");
    if (boardRam.value !== selectedRam.value) issues.push("La generación de memoria no coincide con la placa.");
    const estimatedLoad = Number(load.value);
    if (!Number.isFinite(estimatedLoad) || estimatedLoad < 100) {
      issues.push("Ingresa un consumo estimado válido para el equipo.");
    } else if (Number(psu.value) < estimatedLoad * 1.2) {
      issues.push("La fuente no conserva el margen didáctico del 20% sobre el consumo estimado.");
    }
    const result = root.querySelector("#assembly-result");
    result.classList.toggle("notice-error", issues.length > 0);
    result.textContent = issues.length
      ? issues.join(" ")
      : "Configuración compatible según los criterios de esta práctica. Confirma siempre las especificaciones y recomendaciones del fabricante.";
  });

  const cableColors = [
    "Blanco/naranja", "Naranja", "Blanco/verde", "Azul",
    "Blanco/azul", "Verde", "Blanco/marrón", "Marrón"
  ];
  const cableSequence = root.querySelector("#cable-sequence");
  cableColors.forEach((_, index) => {
    const label = document.createElement("label");
    label.className = "field";
    label.textContent = `Pin ${index + 1}`;
    const select = document.createElement("select");
    select.dataset.pin = String(index + 1);
    select.setAttribute("aria-label", `Conductor para el pin ${index + 1}`);
    select.add(new Option("Seleccionar conductor", ""));
    cableColors.forEach(color => select.add(new Option(color, color)));
    label.append(select);
    cableSequence.append(label);
  });
  root.querySelector("#cable-check").addEventListener("click", () => {
    const selectedColors = [...cableSequence.querySelectorAll("select")].map(select => select.value);
    const isComplete = selectedColors.every(Boolean);
    const isUnique = new Set(selectedColors).size === cableColors.length;
    const isCorrect = selectedColors.every((color, index) => color === cableColors[index]);
    const result = root.querySelector("#cable-result");
    const success = isComplete && isUnique && isCorrect;
    result.classList.toggle("notice-error", !success);
    result.textContent = success
      ? "Secuencia T568B correcta para esta actividad. En una instalación real, valida la terminación con el plano y el certificador correspondiente."
      : "La secuencia aún no coincide con T568B. Revisa el orden de colores y verifica que no haya conductores repetidos.";
  });
  root.querySelector("#cable-reset").addEventListener("click", () => {
    cableSequence.querySelectorAll("select").forEach(select => { select.value = ""; });
    const result = root.querySelector("#cable-result");
    result.classList.remove("notice-error");
    result.textContent = "Selecciona el conductor correspondiente a cada pin.";
  });

  showPractice("office");
  const output = root.querySelector("#terminal-output");
  const form = root.querySelector("#terminal-form");
  const input = root.querySelector("#terminal-input");
  const terminal = createTerminal();

  function writeLine(text, kind = "") {
    const line = document.createElement("div");
    line.className = `terminal-line ${kind}`.trim();
    line.textContent = text;
    output.append(line);
    output.scrollTop = output.scrollHeight;
  }
  writeLine("Laboratorio APSTI · entorno de práctica simulado.");
  writeLine("Escribe help para consultar los comandos disponibles.");
  form.addEventListener("submit", event => {
    event.preventDefault();
    const command = input.value.trim();
    if (!command) return;
    writeLine(`estudiante@laboratorio:~$ ${command}`, "command");
    const result = runCommand(command, terminal);
    if (result.clear) output.replaceChildren();
    else writeLine(result.message, result.error ? "error" : "");
    input.value = "";
  });
}
