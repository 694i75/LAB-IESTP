import { evaluateFrostRisk, makeReading } from "./alertas.js";

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

  const productCatalog = {
    fertilizer: [
      ["urea", "Urea", "Fertilizante nitrogenado. Comprueba concentración declarada, compatibilidad y manejo indicado en la etiqueta; no define por sí solo la necesidad del cultivo."],
      ["npk", "Fertilizante NPK", "Mezcla de nutrientes cuya formulación varía por producto. Interpreta el grado garantizado junto con análisis de suelo y recomendación agronómica."],
      ["compost", "Compost", "Enmienda orgánica cuya calidad depende del proceso y origen. Revisa madurez, salinidad, higiene y especificaciones del proveedor."]
    ],
    "crop-protection": [
      ["biocontrol", "Agente de control biológico", "Producto o preparado biológico para manejo integrado. Verifica especie objetivo, registro, condiciones de almacenamiento y compatibilidad indicadas por el fabricante."],
      ["fungicide", "Fungicida agrícola", "Familia de productos para el manejo de enfermedades específicas. Usa únicamente productos registrados para el cultivo y objetivo indicados en la etiqueta."],
      ["herbicide", "Herbicida agrícola", "Familia de productos para manejo de malezas. La selección depende de etiqueta, cultivo, etapa y normativa; este catálogo no recomienda aplicaciones."]
    ],
    veterinary: [
      ["vaccine", "Vacunas veterinarias", "Productos biológicos preventivos que requieren cadena de frío y un plan sanitario profesional. La selección y calendario corresponden al médico veterinario."],
      ["antiparasitic", "Antiparasitarios veterinarios", "Familia de medicamentos cuya indicación depende de especie, diagnóstico y producto autorizado. Requiere prescripción o supervisión veterinaria y registro del tratamiento."],
      ["antimicrobial", "Antimicrobianos veterinarios", "Medicamentos de uso regulado. Solo deben emplearse bajo criterio veterinario, respetando receta, normativa y periodo de retiro para alimentos."]
    ]
  };
  const productCategory = root.querySelector("#agro-product-category");
  const productSelect = root.querySelector("#agro-product-select");
  const productInfo = root.querySelector("#agro-product-info");
  function updateProductCatalog() {
    const products = productCatalog[productCategory.value];
    productSelect.replaceChildren(...products.map(([id, name]) => new Option(name, id)));
    updateProductInfo();
  }
  function updateProductInfo() {
    const product = productCatalog[productCategory.value].find(([id]) => id === productSelect.value);
    productInfo.textContent = product
      ? `${product[1]}. ${product[2]}`
      : "Selecciona un producto para consultar su descripción.";
  }
  productCategory.addEventListener("change", updateProductCatalog);
  productSelect.addEventListener("change", updateProductInfo);
  updateProductCatalog();

  root.querySelector("#agro-irrigation-calculate").addEventListener("click", () => {
    const eto = Number(root.querySelector("#agro-eto").value);
    const kc = Number(root.querySelector("#agro-kc").value);
    const area = Number(root.querySelector("#agro-area").value);
    const efficiency = Number(root.querySelector("#agro-efficiency").value);
    const results = root.querySelector("#agro-irrigation-results");
    if (![eto, kc, area, efficiency].every(Number.isFinite) || eto < 0 || kc < 0 || area <= 0 || efficiency <= 0 || efficiency > 100) {
      results.innerHTML = '<div class="notice notice-error">Revisa los datos: área positiva, eficiencia entre 1 y 100 %, y coeficientes no negativos.</div>';
      return;
    }
    const cropEvapotranspiration = eto * kc;
    const grossDepth = cropEvapotranspiration / (efficiency / 100);
    const grossVolume = grossDepth * area * 10;
    results.innerHTML = [
      ["ETc estimada", `${cropEvapotranspiration.toFixed(2)} mm/día`, "ETo × Kc"],
      ["Lámina bruta", `${grossDepth.toFixed(2)} mm/día`, "ETc ÷ eficiencia"],
      ["Volumen bruto", `${grossVolume.toFixed(1)} m³/día`, "1 mm·ha = 10 m³"]
    ].map(([label, value, note]) => `<div class="metric"><span>${label}</span><strong>${value}</strong><small>${note}</small></div>`).join("");
  });

  root.querySelector("#agro-fertilizer-calculate").addEventListener("click", () => {
    const nutrientRate = Number(root.querySelector("#agro-nutrient-rate").value);
    const productGrade = Number(root.querySelector("#agro-product-grade").value);
    const area = Number(root.querySelector("#agro-fertilizer-area").value);
    const results = root.querySelector("#agro-fertilizer-results");
    if (![nutrientRate, productGrade, area].every(Number.isFinite) || nutrientRate < 0 || productGrade <= 0 || productGrade > 100 || area <= 0) {
      results.innerHTML = '<div class="notice notice-error">Ingresa una dosis no negativa, concentración entre 0 y 100 % y área mayor que cero.</div>';
      return;
    }
    const productPerHectare = nutrientRate / (productGrade / 100);
    const totalProduct = productPerHectare * area;
    results.innerHTML = [
      ["Producto por hectárea", `${productPerHectare.toFixed(1)} kg/ha`, "Dosis ÷ fracción de nutriente"],
      ["Área calculada", `${area.toFixed(2)} ha`, "Superficie indicada"],
      ["Producto total", `${totalProduct.toFixed(1)} kg`, "Producto/ha × área"]
    ].map(([label, value, note]) => `<div class="metric"><span>${label}</span><strong>${value}</strong><small>${note}</small></div>`).join("");
  });

  const metrics = root.querySelector("#sensor-metrics");
  const history = root.querySelector("#sensor-history");
  const alert = root.querySelector("#weather-alert");
  const threshold = root.querySelector("#frost-threshold");
  const updated = root.querySelector("#sensor-updated");
  const readings = [];
  let current;

  function updateRisk() {
    if (!current) return;
    const limit = Number(threshold.value);
    const risk = evaluateFrostRisk(current.temperature, limit);
    alert.textContent = risk
      ? `Alerta didáctica: la lectura (${current.temperature.toFixed(1)} °C) está bajo el umbral de ${limit.toFixed(1)} °C.`
      : `Sin alerta por temperatura. Lectura actual: ${current.temperature.toFixed(1)} °C.`;
    alert.classList.toggle("notice-warning", risk);
    history.innerHTML = readings.map(reading => {
      const readingRisk = evaluateFrostRisk(reading.temperature, limit);
      return `<tr><td>${reading.time}</td><td>${reading.temperature.toFixed(1)} °C</td><td>${reading.humidity.toFixed(0)} %</td><td><span class="status-pill ${readingRisk ? "status-warning" : ""}">${readingRisk ? "Revisar" : "Normal"}</span></td></tr>`;
    }).join("");
  }
  function render() {
    current = makeReading();
    readings.unshift(current);
    readings.splice(6);
    metrics.innerHTML = [
      ["Temperatura", `${current.temperature.toFixed(1)} °C`, "Aire ambiente"],
      ["Humedad relativa", `${current.humidity.toFixed(0)} %`, "Sensor ambiental"],
      ["Humedad del suelo", `${current.soilMoisture.toFixed(0)} %`, "Capa superficial"],
      ["Luz ambiental", `${current.light.toFixed(0)} lx`, "Lectura simulada"]
    ].map(([label, value, note]) => `<div class="metric"><span>${label}</span><strong>${value}</strong><small>${note}</small></div>`).join("");
    updateRisk();
    updated.textContent = `Actualizado ${current.time}`;
  }
  root.querySelector("#refresh-sensors").addEventListener("click", () => {
    render();
    notify("Lecturas simuladas actualizadas.");
  });
  threshold.addEventListener("input", updateRisk);
  render();
}
