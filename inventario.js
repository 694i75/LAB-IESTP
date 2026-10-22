import { addPart, getInitialParts, partStatus } from "./inventario-datos.js";
import { estimateMaintenance } from "./reportes.js";

export function init({ root, notify }) {
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
    practicePanels.forEach(panel => { panel.hidden = panel.dataset.practicePanel !== id; });
  }

  const componentCatalog = {
    bearing: "Rodamiento · Soporta y guía ejes. Inspecciona ruido, temperatura, holgura, contaminación y lubricación según el manual del fabricante.",
    belt: "Correa de transmisión · Transmite movimiento entre poleas. Revisa alineación, tensión y desgaste con el equipo detenido y bajo el procedimiento de seguridad correspondiente.",
    filter: "Filtro industrial · Retiene contaminantes del fluido o del aire. La selección depende del equipo y la especificación; registra diferencial de presión y cambio según manual.",
    lubricant: "Lubricante · Reduce fricción y desgaste. Confirma viscosidad, especificación, compatibilidad y método de aplicación recomendados por el fabricante.",
    coupling: "Acoplamiento · Conecta ejes y transmite par. Revisa alineación, elementos flexibles, fijaciones y resguardos con el equipo aislado."
  };
  const componentSelect = root.querySelector("#mechanics-component-select");
  const componentInfo = root.querySelector("#mechanics-component-info");
  const updateComponentInfo = () => { componentInfo.textContent = componentCatalog[componentSelect.value]; };
  componentSelect.addEventListener("change", updateComponentInfo);
  updateComponentInfo();

  root.querySelector("#maintenance-schedule-check").addEventListener("click", () => {
    const operatingHours = Number(root.querySelector("#maintenance-hours-current").value);
    const interval = Number(root.querySelector("#maintenance-hours-interval").value);
    const result = root.querySelector("#maintenance-schedule-result");
    if (![operatingHours, interval].every(Number.isFinite) || operatingHours < 0 || interval <= 0) {
      result.classList.add("notice-error");
      result.textContent = "Ingresa horas actuales no negativas e intervalo mayor que cero.";
      return;
    }
    result.classList.remove("notice-error");
    result.textContent = operatingHours >= interval
      ? `El horómetro alcanzó el intervalo didáctico (${interval.toFixed(0)} h). Contrasta el plan con el manual y la condición del equipo.`
      : `Quedan ${(interval - operatingHours).toFixed(0)} h hasta el intervalo didáctico. Confirma el programa real con el fabricante y el historial del equipo.`;
  });

  root.querySelector("#fmea-calculate").addEventListener("click", () => {
    const scores = ["#fmea-severity", "#fmea-occurrence", "#fmea-detection"].map(selector => Number(root.querySelector(selector).value));
    const results = root.querySelector("#fmea-results");
    if (scores.some(score => !Number.isInteger(score) || score < 1 || score > 10)) {
      results.innerHTML = '<div class="notice notice-error">Cada criterio debe ser un número entero del 1 al 10.</div>';
      return;
    }
    const [severity, occurrence, detection] = scores;
    const npr = severity * occurrence * detection;
    const priority = npr >= 200 || severity >= 9 ? "Revisión prioritaria en este ejercicio" : npr >= 100 ? "Requiere análisis y seguimiento" : "Registrar y mantener controles";
    results.innerHTML = `
      <div class="metric"><span>NPR</span><strong>${npr}</strong><small>${severity} × ${occurrence} × ${detection}</small></div>
      <div class="notice ${npr >= 200 || severity >= 9 ? "notice-warning" : ""}">${priority}. Aplica los criterios de riesgo aprobados por tu organización.</div>`;
  });

  root.querySelector("#gear-calculate").addEventListener("click", () => {
    const driverTeeth = Number(root.querySelector("#gear-driver-teeth").value);
    const drivenTeeth = Number(root.querySelector("#gear-driven-teeth").value);
    const inputSpeed = Number(root.querySelector("#gear-input-speed").value);
    const inputTorque = Number(root.querySelector("#gear-input-torque").value);
    const results = root.querySelector("#gear-results");
    if (![driverTeeth, drivenTeeth, inputSpeed, inputTorque].every(Number.isFinite)
      || !Number.isInteger(driverTeeth) || !Number.isInteger(drivenTeeth)
      || driverTeeth < 1 || drivenTeeth < 1 || inputSpeed <= 0 || inputTorque < 0) {
      results.innerHTML = '<div class="notice notice-error">Usa cantidades enteras de dientes, velocidad positiva y par no negativo.</div>';
      return;
    }
    const speedRatio = driverTeeth / drivenTeeth;
    const outputSpeed = inputSpeed * speedRatio;
    const outputTorque = inputTorque / speedRatio;
    results.innerHTML = [
      ["Relación de velocidad n₂/n₁", speedRatio.toFixed(3), "z₁ ÷ z₂"],
      ["Velocidad de salida", `${outputSpeed.toFixed(1)} rpm`, "Modelo ideal"],
      ["Par de salida ideal", `${outputTorque.toFixed(2)} N·m`, "Sin pérdidas"]
    ].map(([label, value, note]) => `<div class="metric"><span>${label}</span><strong>${value}</strong><small>${note}</small></div>`).join("");
  });

  const list = root.querySelector("#parts-list");
  const count = root.querySelector("#inventory-count");
  let parts = getInitialParts();

  function renderParts() {
    count.textContent = `${parts.length} ${parts.length === 1 ? "elemento" : "elementos"}`;
    list.innerHTML = parts.map(part => {
      const status = partStatus(part.quantity);
      return `<tr><td>${escapeHtml(part.name)}</td><td>${part.quantity}</td><td><span class="status-pill ${status.className}">${status.label}</span></td><td><button class="table-action" type="button" data-remove="${part.id}" aria-label="Eliminar ${escapeHtml(part.name)}">Quitar</button></td></tr>`;
    }).join("") || `<tr><td colspan="4"><div class="empty-state">Aún no hay repuestos. Agrega el primero.</div></td></tr>`;
  }
  root.querySelector("#part-form").addEventListener("submit", event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const quantity = Number(data.get("quantity"));
    const name = String(data.get("name")).trim();
    if (!name || !Number.isInteger(quantity) || quantity < 0) {
      notify("Ingresa un nombre y una cantidad válida.", "error");
      return;
    }
    parts = addPart(parts, name, quantity);
    form.reset();
    form.elements.quantity.value = "1";
    renderParts();
    notify("Repuesto agregado al inventario de demostración.");
  });
  list.addEventListener("click", event => {
    const button = event.target.closest("[data-remove]");
    if (!button) return;
    parts = parts.filter(part => part.id !== button.dataset.remove);
    renderParts();
    notify("Repuesto retirado del inventario.");
  });
  root.querySelector("#maintenance-form").addEventListener("submit", event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const values = Object.fromEntries(new FormData(form));
    const total = estimateMaintenance(Number(values.hours), Number(values.rate), Number(values.parts));
    root.querySelector("#maintenance-total").textContent = new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(total);
    notify("Estimación de mantenimiento calculada.");
  });
  renderParts();
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}
