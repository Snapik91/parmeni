import { Rcon } from "rcon-client";

function getRconConfig() {
  const host = process.env.SCUM_RCON_HOST;
  const port = Number(process.env.SCUM_RCON_PORT);
  const password = process.env.SCUM_RCON_PASSWORD;

  if (!host || !port || !password) {
    throw new Error("Chybí RCON údaje v .env.local");
  }

  return { host, port, password };
}

export async function sendRconCommand(command: string) {
  const config = getRconConfig();

  const rcon = await Rcon.connect({
    host: config.host,
    port: config.port,
    password: config.password,
  });

  try {
    const response = await rcon.send(command);
    return response;
  } finally {
    await rcon.end();
  }
}

export type OnlinePlayer = {
  name: string;
  steam: string;
  upid: string;
  location: string;
};

export function parsePlayers(raw: string): OnlinePlayer[] {
  return raw
    .split("\n")
    .filter((line) => line.startsWith("PLAYER"))
    .map((line) => {
      const parts = line.split("|").map((p) => p.trim());

      return {
        name: parts[1] ?? "Unknown",
        steam: parts[2]?.replace("steam=", "") ?? "",
        upid: parts[3]?.replace("upid=", "") ?? "",
        location: parts[4] ?? "",
      };
    });
}

export async function getOnlinePlayers() {
  const raw = await sendRconCommand("ListPlayers");
  const players = parsePlayers(raw);

  return {
    count: players.length,
    players,
    raw,
  };
}