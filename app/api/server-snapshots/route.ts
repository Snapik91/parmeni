import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const range = searchParams.get("range") ?? "1h";

  const now = new Date();
  const from = new Date(now);

  if (range === "24h") from.setHours(now.getHours() - 24);
  else if (range === "7d") from.setDate(now.getDate() - 7);
  else from.setHours(now.getHours() - 1);

  const snapshots = await prisma.serverSnapshot.findMany({
    where: {
      createdAt: {
        gte: from,
      },
    },
    orderBy: {
      createdAt: "asc",
    },
    take: 500,
  });

  return NextResponse.json({
    ok: true,
    range,
    snapshots,
  });
}