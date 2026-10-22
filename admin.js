const STORAGE_KEY = "iestp-admin-data-v2";

const initialData = {
  students: [],
  resources: []
};

export function init({ root, notify }) {
  let data = loadData(notify);
  const studentsList = root.querySelector("#students-list");
  const resourcesList = root.querySelector("#resources-list");
  const stats = root.querySelector("#admin-stats");

  function persist() {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("No se pudieron guardar los datos locales de demostración:", error);
      notify("No se pudieron guardar los cambios en esta sesión.", "error");
      return false;
    }
    return true;
  }

  function renderStats() {
    const careers = new Set(data.students.map(student => student.career)).size;
    const items = [
      ["Estudiantes", data.students.length, "Registros académicos"],
      ["Guías y recursos", data.resources.length, "Materiales enlazados"],
      ["Carreras con estudiantes", careers, "De 5 áreas"]
    ];
    stats.replaceChildren(...items.map(([label, value, note]) => {
      const card = document.createElement("article");
      card.className = "admin-stat-card";
      const title = document.createElement("span");
      title.textContent = label;
      const metric = document.createElement("strong");
      metric.textContent = value;
      const description = document.createElement("small");
      description.textContent = note;
      card.append(title, metric, description);
      return card;
    }));
  }

  function renderStudents() {
    studentsList.replaceChildren();
    if (!data.students.length) {
      studentsList.append(createEmptyRow(4, "Todavía no hay estudiantes registrados."));
      return;
    }
    data.students.forEach(student => {
      const row = document.createElement("tr");
      appendTextCell(row, student.name);
      appendTextCell(row, student.code);
      appendTextCell(row, student.career);
      const actionCell = document.createElement("td");
      const removeButton = createRemoveButton("Eliminar registro", "student", student.id);
      actionCell.append(removeButton);
      row.append(actionCell);
      studentsList.append(row);
    });
  }

  function renderResources() {
    resourcesList.replaceChildren();
    if (!data.resources.length) {
      resourcesList.append(createEmptyRow(4, "No hay recursos agregados."));
      return;
    }
    data.resources.forEach(resource => {
      const row = document.createElement("tr");
      const titleCell = document.createElement("td");
      const link = document.createElement("a");
      link.textContent = resource.title;
      link.href = resource.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      titleCell.append(link);
      row.append(titleCell);
      appendTextCell(row, resource.career);
      appendTextCell(row, `Año ${resource.year}`);
      const actionCell = document.createElement("td");
      actionCell.append(createRemoveButton("Eliminar recurso", "resource", resource.id));
      row.append(actionCell);
      resourcesList.append(row);
    });
  }

  function render() {
    renderStats();
    renderStudents();
    renderResources();
  }

  root.querySelector("#student-form").addEventListener("submit", event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const name = String(values.get("name")).trim();
    const code = String(values.get("code")).trim();
    if (!name || !code || data.students.some(student => student.code.toLowerCase() === code.toLowerCase())) {
      notify("Completa los datos y usa un código de estudiante distinto.", "error");
      return;
    }
    data.students.push({ id: makeId("student"), name, code, career: String(values.get("career")) });
    if (!persist()) {
      data.students.pop();
      return;
    }
    form.reset();
    render();
    notify("Estudiante agregado correctamente.");
  });

  root.querySelector("#resource-form").addEventListener("submit", event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const url = String(values.get("url")).trim();
    let parsedUrl;
    try {
      parsedUrl = new URL(url);
    } catch {
      notify("Ingresa un enlace web válido.", "error");
      return;
    }
    if (parsedUrl.protocol !== "https:" && parsedUrl.protocol !== "http:") {
      notify("El recurso debe usar un enlace web HTTP o HTTPS.", "error");
      return;
    }
    const resource = {
      id: makeId("resource"),
      title: String(values.get("title")).trim(),
      career: String(values.get("career")),
      year: Number(values.get("year")),
      url: parsedUrl.href
    };
    if (!resource.title) {
      notify("El título del recurso no puede quedar vacío.", "error");
      return;
    }
    data.resources.push(resource);
    if (!persist()) {
      data.resources.pop();
      return;
    }
    form.reset();
    render();
    notify("Recurso agregado correctamente.");
  });

  root.addEventListener("click", event => {
    const button = event.target.closest("[data-remove-kind]");
    if (!button) return;
    const key = button.dataset.removeKind === "student" ? "students" : "resources";
    const previous = data[key];
    data[key] = previous.filter(item => item.id !== button.dataset.removeId);
    if (!persist()) {
      data[key] = previous;
      return;
    }
    render();
    notify("Registro eliminado.");
  });

  render();
}

function loadData(notify) {
  const stored = sessionStorage.getItem(STORAGE_KEY);
  if (!stored) return structuredClone(initialData);
  try {
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed.students) || !Array.isArray(parsed.resources)) {
      throw new TypeError("Formato inesperado para el estado del panel.");
    }
    return parsed;
  } catch (error) {
    console.error("No se pudo leer el estado del panel de demostración:", error);
    notify("Los datos de demostración guardados están dañados; se cargará la muestra inicial.", "error");
    sessionStorage.removeItem(STORAGE_KEY);
    return structuredClone(initialData);
  }
}

function appendTextCell(row, value) {
  const cell = document.createElement("td");
  cell.textContent = value;
  row.append(cell);
}

function createEmptyRow(columnCount, message) {
  const row = document.createElement("tr");
  const cell = document.createElement("td");
  cell.colSpan = columnCount;
  cell.className = "empty-state";
  cell.textContent = message;
  row.append(cell);
  return row;
}

function createRemoveButton(label, kind, id) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "table-action";
  button.textContent = "Quitar";
  button.setAttribute("aria-label", label);
  button.dataset.removeKind = kind;
  button.dataset.removeId = id;
  return button;
}

function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
