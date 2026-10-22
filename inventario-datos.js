export function getInitialParts() {
  return [
    { id: "part-1", name: "Rodamiento 6204", quantity: 4 },
    { id: "part-2", name: "Correa industrial A-42", quantity: 1 },
    { id: "part-3", name: "Grasa multipropósito (kg)", quantity: 0 }
  ];
}

export function addPart(parts, name, quantity) {
  return [...parts, { id: `part-${Date.now()}-${Math.random().toString(16).slice(2)}`, name, quantity }];
}

export function partStatus(quantity) {
  if (quantity === 0) return { label: "Sin stock", className: "status-danger" };
  if (quantity < 3) return { label: "Stock bajo", className: "status-warning" };
  return { label: "Disponible", className: "" };
}
