export function calculateOutputs({ power, level, emergency }) {
  const motor = Boolean(power && level && !emergency);
  return { relay: Boolean(power && !emergency), motor, signal: motor ? 7.5 : power && !emergency ? 2.5 : 0 };
}
