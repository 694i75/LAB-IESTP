export function createTerminal() {
  return { containers: new Map() };
}

export function listContainers(terminal) {
  return [...terminal.containers.entries()]
    .filter(([, state]) => state === "running")
    .map(([name, state]) => ({ name, state }));
}

export function startContainer(terminal, name) {
  if (terminal.containers.has(name)) return false;
  terminal.containers.set(name, "running");
  return true;
}

export function stopContainer(terminal, name) {
  if (!terminal.containers.has(name)) return false;
  terminal.containers.set(name, "stopped");
  return true;
}
