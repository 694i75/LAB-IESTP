import { rockTypes } from "./datos-minas.js";

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

  const minerals = {
    chalcopyrite: "Calcopirita · CuFeS₂. Sulfuro de cobre y hierro; brillo metálico, color amarillo latón y raya negra verdosa. Es una mena importante de cobre. Las propiedades pueden variar en muestras reales.",
    bornite: "Bornita · Cu₅FeS₄. Sulfuro de cobre y hierro que puede mostrar tonos iridiscentes en superficies alteradas; se conoce como mena de cobre. Confirma identificación con análisis mineralógico.",
    quartz: "Cuarzo · SiO₂. Silicato de dureza 7 en la escala de Mohs, brillo vítreo y raya blanca. Tiene usos industriales diversos; no es un mineral metálico.",
    pyrite: "Pirita · FeS₂. Sulfuro de hierro, brillo metálico amarillo latón, raya oscura y dureza aproximada de 6 a 6,5. Puede confundirse visualmente con minerales de cobre u oro.",
    galena: "Galena · PbS. Sulfuro de plomo con brillo metálico y exfoliación cúbica característica. El plomo es tóxico: no manipules ni generes polvo de muestras sin controles especializados."
  };
  const mineralSelect = root.querySelector("#mining-mineral-select");
  const mineralInfo = root.querySelector("#mining-mineral-info");
  const mineralAnswer = root.querySelector("#mining-mineral-answer");
  const mineralAnswerResult = root.querySelector("#mining-mineral-answer-result");
  const showMineral = () => { mineralInfo.textContent = minerals[mineralSelect.value]; };
  mineralSelect.addEventListener("change", showMineral);
  showMineral();
  root.querySelector("#mining-mineral-check").addEventListener("click", () => {
    const answeredCorrectly = mineralAnswer.value === "chalcopyrite";
    mineralAnswerResult.classList.toggle("notice-error", !answeredCorrectly);
    mineralAnswerResult.textContent = !mineralAnswer.value
      ? "Selecciona una respuesta para continuar."
      : answeredCorrectly
        ? "Correcto: la calcopirita suele mostrar raya negra verdosa. Usa más de una propiedad y confirma con métodos de laboratorio."
        : "Aún no: compara la raya y la dureza junto con el color; el parecido visual por sí solo puede confundir.";
  });

  root.querySelector("#mining-qaqc-check").addEventListener("click", () => {
    const original = Number(root.querySelector("#mining-grade-original").value);
    const duplicate = Number(root.querySelector("#mining-grade-duplicate").value);
    const tolerance = Number(root.querySelector("#mining-grade-tolerance").value);
    const result = root.querySelector("#mining-qaqc-result");
    if (![original, duplicate, tolerance].every(Number.isFinite) || original <= 0 || duplicate <= 0 || tolerance <= 0) {
      result.classList.add("notice-error");
      result.textContent = "Ingresa leyes mayores que cero y un umbral válido.";
      return;
    }
    const mean = (original + duplicate) / 2;
    const relativeDifference = Math.abs(duplicate - original) / mean * 100;
    const accepted = relativeDifference <= tolerance;
    result.classList.toggle("notice-error", !accepted);
    result.textContent = `Diferencia relativa: ${relativeDifference.toFixed(2)} %. ${accepted ? "Dentro" : "Fuera"} del umbral didáctico de ${tolerance.toFixed(1)} %. Revisa el protocolo QA/QC aplicable antes de interpretar datos reales.`;
  });

  root.querySelector("#mining-block-calculate").addEventListener("click", () => {
    const area = Number(root.querySelector("#mining-block-area").value);
    const thickness = Number(root.querySelector("#mining-block-thickness").value);
    const density = Number(root.querySelector("#mining-block-density").value);
    const grade = Number(root.querySelector("#mining-block-grade").value);
    const results = root.querySelector("#mining-block-results");
    if (![area, thickness, density, grade].every(Number.isFinite) || area <= 0 || thickness <= 0 || density <= 0 || grade < 0 || grade > 100) {
      results.innerHTML = '<div class="notice notice-error">Revisa los parámetros: dimensiones y densidad positivas; ley entre 0 y 100 %.</div>';
      return;
    }
    const volume = area * thickness;
    const tonnage = volume * density;
    const containedMetal = tonnage * grade / 100;
    results.innerHTML = [
      ["Volumen geométrico", `${volume.toLocaleString("es-PE")} m³`, "Área × potencia"],
      ["Tonelaje in situ", `${tonnage.toLocaleString("es-PE", { maximumFractionDigits: 1 })} t`, "Volumen × densidad"],
      ["Metal contenido", `${containedMetal.toLocaleString("es-PE", { maximumFractionDigits: 2 })} t`, "Tonelaje × ley"]
    ].map(([label, value, note]) => `<div class="metric"><span>${label}</span><strong>${value}</strong><small>${note}</small></div>`).join("");
  });

  const form = root.querySelector("#sample-form");
  const select = root.querySelector("#rock-select");
  const info = root.querySelector("#rock-info");
  const results = root.querySelector("#sample-results");
  const summary = root.querySelector("#sample-summary");

  select.innerHTML = rockTypes.map(rock => `<option value="${rock.id}">${rock.name}</option>`).join("");
  function updateRock() {
    const rock = rockTypes.find(item => item.id === select.value);
    info.textContent = `${rock.description} Densidad referencial: ${rock.density.toFixed(2)} t/m³ · Competencia: ${rock.hardness}.`;
  }
  select.addEventListener("change", updateRock);
  updateRock();

  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const mass = Number(data.get("mass"));
    const volume = Number(data.get("volume"));
    const rock = rockTypes.find(item => item.id === data.get("rock"));
    if (![mass, volume].every(Number.isFinite) || volume <= 0 || !rock) {
      notify("Revisa los parámetros ingresados.", "error");
      return;
    }
    const measuredDensity = mass / volume;
    const difference = ((measuredDensity - rock.density) / rock.density) * 100;
    const comparison = Math.abs(difference) <= 10 ? "Cercana al valor de referencia" : "Diferencia notable; revisar la muestra";
    const values = [
      ["Densidad calculada", `${measuredDensity.toFixed(2)} t/m³`, "Masa ÷ volumen"],
      ["Valor de referencia", `${rock.density.toFixed(2)} t/m³`, "Perfil didáctico"],
      ["Diferencia relativa", `${Math.abs(difference).toFixed(1)} %`, "Comparación simple"],
      ["Interpretación", comparison, "No sustituye un ensayo"]
    ];
    results.innerHTML = values.map(([label, value, note]) => `<div class="metric"><span>${label}</span><strong>${value}</strong><small>${note}</small></div>`).join("");
    summary.textContent = `${rock.name} · muestra de ${mass.toFixed(2)} t y ${volume.toFixed(2)} m³`;
    notify("Análisis de muestra actualizado.");
  });
  form.requestSubmit();
}
