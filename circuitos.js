import { calculateOutputs } from "./controladores.js";

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
    resistor: "Resistor · Limita corriente o establece divisores de tensión. Verifica resistencia, tolerancia, potencia y temperatura de operación.",
    capacitor: "Capacitor · Almacena carga y se usa en filtrado o acoplamiento. Comprueba capacitancia, tensión nominal, polaridad y temperatura.",
    diode: "Diodo · Conduce principalmente en un sentido y permite rectificación o protección. Revisa corriente, tensión inversa, polaridad y hoja técnica.",
    transistor: "Transistor · Puede funcionar como interruptor o amplificador. Identifica tipo, distribución de terminales, límites eléctricos y disipación térmica.",
    relay: "Relé · Conmuta contactos mediante una bobina. Comprueba tensión de bobina, configuración de contactos, corriente nominal y aislamiento."
  };
  const componentSelect = root.querySelector("#electronics-component-select");
  const componentInfo = root.querySelector("#electronics-component-info");
  const updateComponentInfo = () => { componentInfo.textContent = componentCatalog[componentSelect.value]; };
  componentSelect.addEventListener("change", updateComponentInfo);
  updateComponentInfo();

  root.querySelector("#led-resistor-calculate").addEventListener("click", () => {
    const sourceVoltage = Number(root.querySelector("#led-source-voltage").value);
    const ledVoltage = Number(root.querySelector("#led-forward-voltage").value);
    const targetCurrent = Number(root.querySelector("#led-target-current").value);
    const result = root.querySelector("#led-resistor-result");
    if (![sourceVoltage, ledVoltage, targetCurrent].every(Number.isFinite)
      || sourceVoltage <= ledVoltage || sourceVoltage > 24 || ledVoltage <= 0
      || targetCurrent < 1 || targetCurrent > 20) {
      result.classList.add("notice-error");
      result.textContent = "La fuente debe superar la caída del LED, ser de hasta 24 V y la corriente objetivo estar entre 1 y 20 mA.";
      return;
    }
    const currentAmps = targetCurrent / 1000;
    const resistance = (sourceVoltage - ledVoltage) / currentAmps;
    const resistorPower = currentAmps ** 2 * resistance;
    result.classList.remove("notice-error");
    result.textContent = `Resistencia teórica: ${resistance.toFixed(0)} Ω · disipación ideal: ${resistorPower.toFixed(3)} W. Elige componentes y márgenes según sus hojas técnicas; este cálculo no certifica un montaje.`;
  });

  root.querySelector("#instrument-scale").addEventListener("click", () => {
    const low = Number(root.querySelector("#instrument-low").value);
    const high = Number(root.querySelector("#instrument-high").value);
    const current = Number(root.querySelector("#instrument-current").value);
    const unit = root.querySelector("#instrument-unit").value.trim();
    const results = root.querySelector("#instrument-results");
    if (![low, high, current].every(Number.isFinite) || high <= low || current < 0 || current > 24 || !unit) {
      results.innerHTML = '<div class="notice notice-error">Define un rango de proceso válido, una corriente entre 0 y 24 mA y una unidad.</div>';
      return;
    }
    if (current < 4 || current > 20) {
      results.innerHTML = `<div class="notice notice-warning">Corriente ${current.toFixed(2)} mA fuera del rango nominal 4–20 mA. Revisa el lazo y la configuración del transmisor.</div>`;
      return;
    }
    const processValue = low + ((current - 4) / 16) * (high - low);
    const percent = ((current - 4) / 16) * 100;
    results.innerHTML = [
      ["Variable escalada", `${processValue.toFixed(2)} ${escapeText(unit)}`, "Conversión lineal"],
      ["Porcentaje del span", `${percent.toFixed(1)} %`, "4 mA = 0 % · 20 mA = 100 %"],
      ["Corriente de lazo", `${current.toFixed(2)} mA`, "Dentro del rango nominal"]
    ].map(([label, value, note]) => `<div class="metric"><span>${label}</span><strong>${value}</strong><small>${note}</small></div>`).join("");
  });

  root.querySelector("#ohm-calculate").addEventListener("click", () => {
    const voltage = Number(root.querySelector("#ohm-voltage").value);
    const resistance = Number(root.querySelector("#ohm-resistance").value);
    const results = root.querySelector("#ohm-results");
    if (![voltage, resistance].every(Number.isFinite) || voltage < 0 || resistance <= 0) {
      results.innerHTML = '<div class="notice notice-error">Ingresa tensión no negativa y resistencia mayor que cero.</div>';
      return;
    }
    const current = voltage / resistance;
    const power = voltage * current;
    results.innerHTML = [
      ["Corriente", `${(current * 1000).toFixed(2)} mA`, "I = V ÷ R"],
      ["Potencia", `${power.toFixed(3)} W`, "P = V × I"],
      ["Resistencia", `${resistance.toFixed(2)} Ω`, "Carga ideal"]
    ].map(([label, value, note]) => `<div class="metric"><span>${label}</span><strong>${value}</strong><small>${note}</small></div>`).join("");
  });

  const inputs = { power: false, level: false, emergency: false };
  const switches = root.querySelectorAll("[data-input]");
  const signal = root.querySelector("#signal-value");
  const fill = root.querySelector("#signal-fill");
  const description = root.querySelector("#signal-description");
  const relay = root.querySelector("#relay-pill");
  const motor = root.querySelector("#motor-pill");
  const message = root.querySelector("#circuit-message");

  function render() {
    const output = calculateOutputs(inputs);
    switches.forEach(button => button.setAttribute("aria-checked", String(inputs[button.dataset.input])));
    signal.textContent = `${output.signal.toFixed(1)} V`;
    fill.style.width = `${output.signal * 10}%`;
    description.textContent = output.signal ? "Señal analógica de salida." : "Circuito desenergizado.";
    relay.textContent = output.relay ? "Energizado" : "Apagado";
    relay.classList.toggle("status-warning", output.relay);
    root.querySelector("#relay-state").textContent = output.relay ? "Bobina activada" : "En reposo";
    motor.textContent = output.motor ? "En marcha" : "Apagado";
    motor.classList.toggle("status-warning", output.motor);
    root.querySelector("#motor-state").textContent = output.motor ? "Salida habilitada" : "Detenido";
    message.textContent = inputs.emergency
      ? "Parada de emergencia activa: todas las salidas están deshabilitadas."
      : output.motor ? "Condiciones de entrada satisfechas. Salida activa en esta simulación."
        : inputs.power ? "Control habilitado; verifica el sensor de nivel."
          : "Activa el interruptor principal y el sensor para energizar el circuito.";
  }
  switches.forEach(button => button.addEventListener("click", () => {
    const key = button.dataset.input;
    inputs[key] = !inputs[key];
    render();
    notify("Estado del circuito actualizado.");
  }));
  render();
}

function escapeText(value) {
  const element = document.createElement("span");
  element.textContent = value;
  return element.innerHTML;
}
