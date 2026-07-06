import { NextResponse } from "next/server";
import { getOnlinePlayers } from "@/services/rcon";
import { savePlayers } from "@/services/PlayerDatabaseService";

export async function GET() {
  try {
    const result = await getOnlinePlayers();

    const playersForDb = result.players.map((player) => ({
      name: player.name,
      steamId: player.steam,
      upid: player.upid,
    }));

    await savePlayers(playersForDb);

    return NextResponse.json({
      ok: true,
      count: result.count,
      players: result.players,
    });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      count: 0,
      players: [],
      error: error instanceof Error ? error.message : "Neznámá chyba",
    });
  }
}