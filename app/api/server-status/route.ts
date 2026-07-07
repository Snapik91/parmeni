import { NextResponse } from "next/server";
import { SERVER } from "@/config/server";
import { getOnlinePlayers } from "@/services/rcon";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const online = await getOnlinePlayers();

    await prisma.serverSnapshot.create({
      data: {
        online: true,
        players: online.count,
        maxPlayers: SERVER.maxPlayers,
        ping: 18,
      },
    });

    return NextResponse.json({
      online: true,
      players: online.count,
      maxPlayers: SERVER.maxPlayers,
      ip: SERVER.ip,
      port: SERVER.port,
      game: SERVER.game,
      version: SERVER.version,
      ping: 18,
      restartIn: "02:15:43",
    });
  } catch (error) {
    return NextResponse.json({
      online: false,
      players: 0,
      maxPlayers: SERVER.maxPlayers,
      ip: SERVER.ip,
      port: SERVER.port,
      game: SERVER.game,
      version: SERVER.version,
      ping: 0,
      restartIn: "--:--:--",
      error: error instanceof Error ? error.message : "Neznámá chyba",
    });
  }
}