export function estimateMaintenance(hours, hourlyRate, partsCost) {
  if (![hours, hourlyRate, partsCost].every(Number.isFinite) || hours < 0 || hourlyRate < 0 || partsCost < 0) {
    throw new RangeError("Los valores de mantenimiento deben ser números no negativos.");
  }
  return hours * hourlyRate + partsCost;
}
