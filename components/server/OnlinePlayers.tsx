"use client";

import { useEffect, useState } from "react";

type Player = {
  name: string;
  steam: string;
  upid: string;
  location: string;
};

type PlayersResponse = {
  ok: boolean;
  players: {
    count: number;
    players: Player[];
  };
};

export default function OnlinePlayers() {
  const [data, setData] = useState<PlayersResponse | null>(null);

  useEffect(() => {
    async function loadPlayers() {
      const res = await fetch("/api/players");
      const json = await res.json();
      setData(json);
    }

    loadPlayers();
    const interval = setInterval(loadPlayers, 10000);

    return () => clearInterval(interval);
  }, []);

  const players = data?.players?.players ?? [];

  return (
    <section className="bg-black py-16 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-4xl font-black uppercase text-orange-500">
          Online hráči
        </h2>

        <p className="mt-2 text-zinc-400">
          Aktuálně na serveru: {players.length}
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {players.length === 0 ? (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-400">
              Nikdo není online.
            </div>
          ) : (
            players.map((player) => (
              <div
                key={player.upid || player.steam || player.name}
                className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition hover:border-orange-500"
              >
                <h3 className="text-2xl font-black text-green-500">
                  {player.name}
                </h3>

                <p className="mt-2 text-sm text-zinc-400">
                  Steam: {player.steam || "nezjištěno"}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}