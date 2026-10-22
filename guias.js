const studyPaths = {
  mineria: {
    name: "Minería",
    years: [
      {
        title: "Geología aplicada y caracterización de yacimientos",
        topics: ["Levantamiento geológico, cartografía y registro de testigos", "Mineralogía, petrografía y alteración hidrotermal", "Muestreo, QA/QC, densidad y cadena de custodia"],
        resources: [
          { category: "books", type: "Repositorio técnico", title: "Publicaciones geocientíficas del INGEMMET", url: "https://www.gob.pe/institucion/ingemmet/informes-publicaciones" },
          { category: "books", type: "Libros y mapas", title: "USGS Publications Warehouse", url: "https://pubs.usgs.gov/" },
          { category: "manuals", type: "Guías técnicas", title: "Publicaciones y normativa del MINEM", url: "https://www.gob.pe/minem" },
          { category: "sources", type: "Fuente oficial", title: "INGEMMET · información geológica del Perú", url: "https://www.gob.pe/ingemmet" }
        ]
      },
      {
        title: "Geomecánica, perforación y operaciones mineras",
        topics: ["Clasificación de macizos rocosos y mapeo geomecánico", "Perforación, control de desviación y registro de taladros", "Ventilación, seguridad operacional y control de riesgos"],
        resources: [
          { category: "books", type: "Publicaciones técnicas", title: "USGS · geología, recursos y métodos de campo", url: "https://pubs.usgs.gov/" },
          { category: "books", type: "Repositorio técnico", title: "INGEMMET · estudios y boletines geológicos", url: "https://www.gob.pe/institucion/ingemmet/informes-publicaciones" },
          { category: "manuals", type: "Normativa sectorial", title: "MINEM · normas y documentos del sector minero", url: "https://www.gob.pe/minem" },
          { category: "sources", type: "Referencia internacional", title: "ICMM · prácticas responsables en minería", url: "https://www.icmm.com/en-gb/our-work" }
        ]
      },
      {
        title: "Procesamiento, gestión y cierre de operaciones",
        topics: ["Balance metalúrgico y control de variables de proceso", "Gestión ambiental, agua y monitoreo de componentes", "Planificación, costos, cierre y comunicación de resultados técnicos"],
        resources: [
          { category: "books", type: "Libros y publicaciones", title: "USGS · minerales, recursos y publicaciones abiertas", url: "https://pubs.usgs.gov/" },
          { category: "manuals", type: "Guías del sector", title: "MINEM · gestión ambiental y normativa minera", url: "https://www.gob.pe/minem" },
          { category: "manuals", type: "Guías de buenas prácticas", title: "ICMM · salud, seguridad y desarrollo sostenible", url: "https://www.icmm.com/en-gb/our-work" },
          { category: "sources", type: "Datos e información geológica", title: "INGEMMET · publicaciones institucionales", url: "https://www.gob.pe/institucion/ingemmet/informes-publicaciones" }
        ]
      }
    ]
  },
  agropecuaria: {
    name: "Agropecuaria",
    years: [
      {
        title: "Suelos, agua y diagnóstico de sistemas productivos",
        topics: ["Muestreo, análisis e interpretación de propiedades de suelo", "Balance hídrico, calidad de agua y programación de riego", "Diseño de registros técnicos y diagnóstico de unidades productivas"],
        resources: [
          { category: "books", type: "Libros y publicaciones", title: "FAO Open Knowledge · agricultura, suelo y recursos naturales", url: "https://openknowledge.fao.org/" },
          { category: "books", type: "Repositorio agropecuario", title: "INIA Perú · investigación y transferencia tecnológica", url: "https://www.gob.pe/inia" },
          { category: "manuals", type: "Guías agroclimáticas", title: "SENAMHI · publicaciones y servicios climáticos", url: "https://www.senamhi.gob.pe/?p=publicaciones" },
          { category: "sources", type: "Fuente internacional", title: "FAO · buenas prácticas agropecuarias", url: "https://www.fao.org/publications/en/" }
        ]
      },
      {
        title: "Producción vegetal, sanidad y manejo pecuario",
        topics: ["Manejo integrado de plagas y diagnóstico fitosanitario", "Nutrición, reproducción y bienestar animal", "Trazabilidad, bioseguridad y evaluación de indicadores productivos"],
        resources: [
          { category: "books", type: "Libros y manuales", title: "FAO · producción vegetal y sanidad agropecuaria", url: "https://openknowledge.fao.org/" },
          { category: "books", type: "Publicaciones de investigación", title: "INIA Perú · tecnologías para agricultura y ganadería", url: "https://www.gob.pe/inia" },
          { category: "manuals", type: "Normas y sanidad", title: "SENASA · sanidad agraria e inocuidad", url: "https://www.gob.pe/senasa" },
          { category: "sources", type: "Referencia técnica", title: "FAO · recursos para desarrollo agropecuario", url: "https://www.fao.org/publications/en/" }
        ]
      },
      {
        title: "Gestión de agronegocios, innovación y sostenibilidad",
        topics: ["Costos de producción, planificación y evaluación de campañas", "Adaptación climática, gestión de riesgos y uso eficiente de recursos", "Diseño de proyecto productivo con indicadores y análisis de resultados"],
        resources: [
          { category: "books", type: "Publicaciones abiertas", title: "FAO · economía agrícola y sistemas alimentarios", url: "https://openknowledge.fao.org/" },
          { category: "books", type: "Biblioteca agropecuaria", title: "FAO Open Knowledge · desarrollo rural y cadenas de valor", url: "https://openknowledge.fao.org/" },
          { category: "manuals", type: "Información climática", title: "SENAMHI · datos y orientación agroclimática", url: "https://www.senamhi.gob.pe/?p=publicaciones" },
          { category: "sources", type: "Investigación nacional", title: "INIA Perú · proyectos y tecnologías agrarias", url: "https://www.gob.pe/inia" }
        ]
      }
    ]
  },
  mecanica: {
    name: "Mecánica",
    years: [
      {
        title: "Dibujo técnico, metrología y materiales",
        topics: ["Interpretación de planos, tolerancias geométricas y ajustes", "Metrología dimensional, incertidumbre y calibración", "Selección de materiales, procesos y seguridad de taller"],
        resources: [
          { category: "books", type: "Libro abierto", title: "Engineering LibreTexts · ingeniería y ciencias aplicadas", url: "https://eng.libretexts.org/Bookshelves" },
          { category: "books", type: "Cursos y apuntes", title: "MIT OpenCourseWare · ingeniería mecánica", url: "https://ocw.mit.edu/search/?d=Mechanical%20Engineering" },
          { category: "manuals", type: "Documentación técnica", title: "NIST · metrología, manufactura y estándares", url: "https://www.nist.gov/publications" },
          { category: "sources", type: "Formación técnica", title: "SENCICO · recursos para construcción e industria", url: "https://www.gob.pe/sencico" }
        ]
      },
      {
        title: "Mantenimiento industrial y diagnóstico de fallas",
        topics: ["Análisis de vibraciones, lubricación y termografía", "Gestión de órdenes de trabajo, criticidad y mantenimiento preventivo", "Diagnóstico de sistemas mecánicos, hidráulicos y neumáticos"],
        resources: [
          { category: "books", type: "Libro abierto", title: "Engineering LibreTexts · mecánica y mantenimiento", url: "https://eng.libretexts.org/Bookshelves/Mechanical_Engineering" },
          { category: "books", type: "Recursos académicos", title: "MIT OpenCourseWare · cursos de ingeniería mecánica", url: "https://ocw.mit.edu/search/?d=Mechanical%20Engineering" },
          { category: "manuals", type: "Literatura técnica", title: "Rockwell Automation · documentación de sistemas industriales", url: "https://www.rockwellautomation.com/en-us/support/documentation.html" },
          { category: "sources", type: "Normas y medición", title: "NIST · publicaciones de ingeniería y manufactura", url: "https://www.nist.gov/publications" }
        ]
      },
      {
        title: "Manufactura, calidad y gestión de activos",
        topics: ["Procesos de mecanizado, parámetros y control dimensional", "Indicadores de confiabilidad, disponibilidad y mantenibilidad", "Plan de mejora de activos con costos, riesgos y evidencias"],
        resources: [
          { category: "books", type: "Libros de ingeniería", title: "Engineering LibreTexts · manufactura y diseño mecánico", url: "https://eng.libretexts.org/Bookshelves/Mechanical_Engineering" },
          { category: "manuals", type: "Literatura técnica", title: "Rockwell Automation · documentación de sistemas industriales", url: "https://www.rockwellautomation.com/en-us/support/documentation.html" },
          { category: "manuals", type: "Publicaciones de manufactura", title: "NIST · tecnologías y gestión de manufactura", url: "https://www.nist.gov/manufacturing" },
          { category: "sources", type: "Formación técnica", title: "SENCICO · servicios y publicaciones", url: "https://www.gob.pe/sencico" }
        ]
      }
    ]
  },
  electronica: {
    name: "Electrónica",
    years: [
      {
        title: "Instrumentación, circuitos y medición eléctrica",
        topics: ["Análisis de circuitos DC/AC y selección de componentes", "Uso de osciloscopio, multímetro y fuentes con criterios de seguridad", "Sensores, acondicionamiento de señal e incertidumbre de medición"],
        resources: [
          { category: "books", type: "Libro abierto · lectura y PDF", title: "OpenStax · College Physics 2e", url: "https://openstax.org/details/books/college-physics-2e" },
          { category: "books", type: "Biblioteca de ingeniería", title: "Engineering LibreTexts · electrónica y circuitos", url: "https://eng.libretexts.org/Bookshelves/Electrical_Engineering" },
          { category: "manuals", type: "Documentación técnica", title: "Arduino Docs · hardware, sensores y programación", url: "https://docs.arduino.cc/" },
          { category: "sources", type: "Formación profesional", title: "MIT OpenCourseWare · electrónica e ingeniería eléctrica", url: "https://ocw.mit.edu/search/?d=Electrical%20Engineering%20and%20Computer%20Science" }
        ]
      },
      {
        title: "Electrónica digital, microcontroladores y PLC",
        topics: ["Diseño y verificación de sistemas digitales", "Programación de microcontroladores e integración de sensores", "Lógica de PLC, entradas/salidas y documentación de pruebas"],
        resources: [
          { category: "books", type: "Libro abierto", title: "Engineering LibreTexts · sistemas digitales y circuitos", url: "https://eng.libretexts.org/Bookshelves/Electrical_Engineering" },
          { category: "manuals", type: "Manuales de dispositivos", title: "Arduino Docs · placas, bibliotecas y proyectos técnicos", url: "https://docs.arduino.cc/" },
          { category: "manuals", type: "Literatura técnica", title: "Rockwell Automation · documentación de hardware y software", url: "https://www.rockwellautomation.com/en-us/support/documentation.html" },
          { category: "sources", type: "Cursos universitarios", title: "MIT OpenCourseWare · sistemas y electrónica", url: "https://ocw.mit.edu/search/?d=Electrical%20Engineering%20and%20Computer%20Science" }
        ]
      },
      {
        title: "Automatización, control y mantenimiento electrónico",
        topics: ["Sistemas de control, respuesta y sintonización de procesos", "Integración de tableros, actuadores y protocolos industriales", "Puesta en servicio, diagnóstico de fallas y mantenimiento documentado"],
        resources: [
          { category: "books", type: "Libros abiertos", title: "Engineering LibreTexts · control e ingeniería eléctrica", url: "https://eng.libretexts.org/Bookshelves/Electrical_Engineering" },
          { category: "manuals", type: "Literatura técnica", title: "Rockwell Automation · documentación de control y automatización", url: "https://www.rockwellautomation.com/en-us/support/documentation.html" },
          { category: "manuals", type: "Referencia de hardware", title: "Arduino Docs · comunicación e integración de sistemas", url: "https://docs.arduino.cc/" },
          { category: "sources", type: "Cursos de ingeniería", title: "MIT OpenCourseWare · control y sistemas eléctricos", url: "https://ocw.mit.edu/search/?d=Electrical%20Engineering%20and%20Computer%20Science" }
        ]
      }
    ]
  },
  apsti: {
    name: "APSTI",
    years: [
      {
        title: "Ofimática profesional, soporte y arquitectura de equipos",
        topics: ["Documentos técnicos, hojas de cálculo con fórmulas y presentaciones profesionales", "Diagnóstico, ensamblaje, compatibilidad y mantenimiento de estaciones de trabajo", "Gestión de incidencias, inventario tecnológico y documentación de soporte"],
        resources: [
          { category: "books", type: "Manuales de ofimática", title: "LibreOffice · guías y documentación oficial", url: "https://documentation.libreoffice.org/es/documentacion-en-espanol/" },
          { category: "books", type: "Manuales de hardware", title: "Cisco Networking Academy · soporte y hardware de TI", url: "https://www.netacad.com/courses/it-essentials" },
          { category: "manuals", type: "Documentación de equipos", title: "Intel · especificaciones y soporte de procesadores", url: "https://www.intel.com/content/www/us/en/support.html" },
          { category: "sources", type: "Formación en productividad", title: "Microsoft Learn · Microsoft 365 y herramientas digitales", url: "https://learn.microsoft.com/es-es/training/browse/?products=m365" }
        ]
      },
      {
        title: "Redes, cableado estructurado y administración de sistemas",
        topics: ["Diseño de LAN, direccionamiento IPv4/IPv6, VLAN y servicios de red", "Cableado estructurado, normas, certificación y documentación de enlaces", "Administración de Linux/Windows, usuarios, permisos y respaldos"],
        resources: [
          { category: "books", type: "Cursos de redes", title: "Cisco Networking Academy · redes y conectividad", url: "https://www.netacad.com/courses/networking" },
          { category: "books", type: "Manuales y documentación", title: "Microsoft Learn · administración y servicios Windows", url: "https://learn.microsoft.com/es-es/training/browse/?products=windows" },
          { category: "manuals", type: "Normas de cableado", title: "TIA · estándares de telecomunicaciones y cableado", url: "https://tiaonline.org/what-we-do/standards/" },
          { category: "sources", type: "Laboratorios y prácticas", title: "Cisco Networking Academy · cursos de redes", url: "https://www.netacad.com/networking" }
        ]
      },
      {
        title: "Servicios TI, bases de datos, nube y seguridad defensiva",
        topics: ["Despliegue y monitoreo de servicios, virtualización y nube", "Bases de datos, automatización y control de cambios", "Gestión de respaldos, continuidad, hardening y respuesta a incidentes"],
        resources: [
          { category: "books", type: "Manuales y formación", title: "Microsoft Learn · Azure, datos y servicios en la nube", url: "https://learn.microsoft.com/es-es/training/" },
          { category: "books", type: "Cursos profesionales", title: "Cisco Networking Academy · seguridad y redes", url: "https://www.netacad.com/" },
          { category: "manuals", type: "Publicaciones técnicas", title: "NIST CSRC · guías de ciberseguridad y gestión de riesgos", url: "https://csrc.nist.gov/publications" },
          { category: "sources", type: "Buenas prácticas", title: "CISA · recursos de seguridad y resiliencia", url: "https://www.cisa.gov/resources-tools" }
        ]
      }
    ]
  }
};

const resourceCategories = [
  { id: "books", label: "Libros y PDF" },
  { id: "manuals", label: "Manuales y guías" },
  { id: "sources", label: "Fuentes confiables" }
];

export function renderLearningPath({ root, area }) {
  const path = studyPaths[area];
  if (!path) return;

  const section = document.createElement("section");
  section.className = "learning-path";
  section.setAttribute("aria-labelledby", "learning-path-title");
  section.innerHTML = `
    <div class="learning-heading">
      <div><span class="eyebrow">Formación técnica profesional · 3 años</span><h2 id="learning-path-title">Ruta formativa de ${path.name}</h2>
      <p>Competencias técnicas, lecturas abiertas y referencias institucionales organizadas por año.</p></div>
      <span class="route-badge">NIVEL SUPERIOR</span>
    </div>
    <div class="year-tabs" role="tablist" aria-label="Año de formación">
      ${path.years.map((_, index) => `<button type="button" role="tab" id="year-tab-${area}-${index + 1}" aria-controls="year-panel-${area}" aria-selected="${index === 0}" class="${index === 0 ? "selected" : ""}" data-year="${index}">Año ${index + 1}</button>`).join("")}
    </div>
    <div class="year-panel" id="year-panel-${area}" role="tabpanel" aria-labelledby="year-tab-${area}-1"></div>
    <div class="route-disclaimer">Ruta de apoyo de nivel técnico superior. Los libros, normas y manuales se consultan en sus editoriales o repositorios originales; el acceso y la descarga dependen de la licencia de cada publicación. Confirma la malla curricular vigente con la coordinación académica.</div>`;
  root.append(section);

  const panel = section.querySelector(".year-panel");
  function showYear(index) {
    const year = path.years[index];
    section.querySelectorAll('.year-tabs [role="tab"]').forEach((tab, tabIndex) => {
      const selected = tabIndex === index;
      tab.setAttribute("aria-selected", String(selected));
      tab.classList.toggle("selected", selected);
      tab.tabIndex = selected ? 0 : -1;
    });
    panel.setAttribute("aria-labelledby", `year-tab-${area}-${index + 1}`);
    const topicsText = year.topics.map((topic, topicIndex) => `  ${topicIndex + 1}. ${topic}`).join("\n");
    const resourcesText = year.resources.map(resource => `${resource.type}: ${resource.title}\n${resource.url}`).join("\n");
    const content = [
      "IESTP-ESPINAR · Ruta de formación técnica profesional",
      `${path.name} · Año ${index + 1}: ${year.title}`,
      "",
      "Competencias y temas:",
      topicsText,
      "",
      "Libros, manuales y fuentes de consulta:",
      resourcesText,
      "",
      "Material referencial. Consulta las licencias y requisitos de acceso en cada fuente."
    ].join("\n");
    const guideData = `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`;
    panel.innerHTML = `
      <div class="year-summary"><div><span class="eyebrow">Año ${index + 1} · Competencias profesionales</span><h3>${year.title}</h3></div>
      <a class="button button-outline download-guide" href="${guideData}" download="${area}-ano-${index + 1}-ruta-tecnica.txt">Descargar guía ↓</a></div>
      <div class="topic-list">${year.topics.map((topic, topicIndex) => `<div class="topic-item"><span>0${topicIndex + 1}</span><p>${topic}</p></div>`).join("")}</div>
      <div class="resource-tabs" role="tablist" aria-label="Tipo de material">
        ${resourceCategories.map((category, categoryIndex) => `<button type="button" role="tab" aria-selected="${categoryIndex === 0}" class="${categoryIndex === 0 ? "selected" : ""}" data-resource-category="${category.id}">${category.label}</button>`).join("")}
      </div>
      <div class="resource-grid" role="tabpanel" aria-live="polite"></div>`;

    const resourceGrid = panel.querySelector(".resource-grid");
    function showResources(categoryId) {
      const category = resourceCategories.find(item => item.id === categoryId);
      panel.querySelectorAll(".resource-tabs [role='tab']").forEach(tab => {
        const selected = tab.dataset.resourceCategory === categoryId;
        tab.setAttribute("aria-selected", String(selected));
        tab.classList.toggle("selected", selected);
      });
      resourceGrid.setAttribute("aria-label", category.label);
      const resources = year.resources.filter(resource => resource.category === categoryId);
      resourceGrid.innerHTML = resources.map(resource => `
        <a class="resource-card" href="${resource.url}" target="_blank" rel="noopener noreferrer">
          <span>${resource.type}</span><strong>${resource.title}</strong><small>Abrir fuente y consultar materiales ↗</small>
        </a>`).join("");
    }
    panel.querySelectorAll(".resource-tabs [role='tab']").forEach(tab => {
      tab.addEventListener("click", () => showResources(tab.dataset.resourceCategory));
    });
    showResources("books");
  }

  section.querySelectorAll(".year-tabs [role='tab']").forEach((tab, index, tabs) => {
    tab.addEventListener("click", () => showYear(index));
    tab.addEventListener("keydown", event => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1
        : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
      tabs[next].focus();
      showYear(next);
    });
  });
  showYear(0);
}
