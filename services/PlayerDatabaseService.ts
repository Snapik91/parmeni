import { prisma } from "@/lib/prisma";

export async function savePlayers(players: any[]) {
  for (const player of players) {
    await prisma.player.upsert({
      where: {
        steamId: player.steamId,
      },
      update: {
        name: player.name,
        upid: player.upid,
        lastSeen: new Date(),
      },
      create: {
        name: player.name,
        steamId: player.steamId,
        upid: player.upid,
      },
    });
  }
}