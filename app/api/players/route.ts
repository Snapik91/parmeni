import { NextResponse } from "next/server";
import { getOnlinePlayers } from "@/services/rcon";

export async function GET() {
  try {
    const players = await getOnlinePlayers();

    return NextResponse.json({
      ok: true,
      players,
    });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      error: error instanceof Error ? error.message : "Neznámá chyba",
    });
  }
}