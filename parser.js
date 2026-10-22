import { listContainers, startContainer, stopContainer } from "./orquestador.js";

const helpText = "Comandos de práctica: help, status, ipconfig, ping <host>, docker ps, docker run <nombre>, docker stop <nombre>, clear";

export function runCommand(command, terminal) {
  const parts = command.trim().split(/\s+/);
  const verb = parts[0].toLowerCase();
  if (verb === "help") return { message: helpText };
  if (verb === "clear") return { message: "", clear: true };
  if (verb === "status") return { message: "Sistema de práctica: disponible · CPU simulado: 12% · Memoria simulada: 2.1 / 8 GB" };
  if (verb === "ipconfig") return { message: "Adaptador LAB-LOCAL\nIPv4 de ejemplo: 192.0.2.10\nMáscara: 255.255.255.0\nSin conexión de red real." };
  if (verb === "ping") {
    if (!parts[1]) return { message: "Uso: ping <host>", error: true };
    return { message: `Respuesta simulada de ${parts[1]}: tiempo=12 ms · paquetes recibidos: 1 (sin enviar tráfico real)` };
  }
  if (verb === "docker" && parts[1] === "ps") {
    const containers = listContainers(terminal);
    return { message: containers.length ? containers.map(item => `${item.name}\t${item.state}`).join("\n") : "No hay contenedores en ejecución. (Lista ficticia)" };
  }
  if (verb === "docker" && parts[1] === "run") {
    const name = parts[2];
    if (!isValidName(name)) return { message: "Uso: docker run <nombre> (usa letras, números, punto, guion o guion bajo; máximo 32 caracteres)", error: true };
    if (!startContainer(terminal, name)) return { message: `Ya existe un contenedor de práctica llamado "${name}".`, error: true };
    return { message: `Contenedor simulado "${name}" creado y en ejecución.` };
  }
  if (verb === "docker" && parts[1] === "stop") {
    const name = parts[2];
    if (!isValidName(name)) return { message: "Uso: docker stop <nombre>", error: true };
    if (!stopContainer(terminal, name)) return { message: `No se encontró el contenedor de práctica "${name}".`, error: true };
    return { message: `Contenedor simulado "${name}" detenido.` };
  }
  return { message: `Comando no reconocido: ${parts[0]}. Escribe help para ver la lista.`, error: true };
}

function isValidName(name) {
  return typeof name === "string" && /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,31}$/.test(name);
}
