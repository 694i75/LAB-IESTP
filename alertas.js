export function makeReading() {
  return {
    time: new Intl.DateTimeFormat("es-PE", { hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(new Date()),
    temperature: 2 + Math.random() * 18,
    humidity: 38 + Math.random() * 52,
    soilMoisture: 24 + Math.random() * 60,
    light: 120 + Math.random() * 780
  };
}

export function evaluateFrostRisk(temperature, threshold) {
  return Number.isFinite(temperature) && Number.isFinite(threshold) && temperature <= threshold;
}
