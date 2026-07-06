"use client";

import { useEffect, useMemo, useState } from "react";

type Player = {
  name: string;
  steam: string;
  upid: string;
  location: string;
};

type PlayersResponse = {
  ok: boolean;
  count: number;
  players: Player[];
  error?: string;
};

export default function OnlinePlayers() {
  const [data, setData] = useState<PlayersResponse | null>(null);
  const [search, setSearch] = useState("");

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

  const players = data?.players ?? [];

  const filteredPlayers = useMemo(() => {
    return players.filter((player) =>
      player.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [players, search]);

  return (
    <section className="bg-black py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.4em] text-green-500">
              🟢 Live seznam
            </p>

            <h2 className="mt-3 text-4xl font-black uppercase md:text-6xl">
              Online hráči
            </h2>

            <p className="mt-3 text-zinc-400">
              Aktuálně online:{" "}
              <span className="font-black text-green-500">
                {data ? data.count : 0}
              </span>
            </p>
          </div>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Hledat hráče..."
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-5 py-4 font-bold text-white outline-none transition placeholder:text-zinc-600 focus:border-orange-500 md:w-80"
          />
        </div>

        <div className="overflow-hidden rounded-3xl border border-orange-900/40 bg-zinc-950/80">
          <div className="grid grid-cols-12 border-b border-zinc-800 bg-black/70 px-5 py-4 text-xs font-black uppercase tracking-widest text-orange-500">
            <div className="col-span-4">Hráč</div>
            <div className="col-span-3 hidden md:block">Steam ID</div>
            <div className="col-span-2 hidden md:block">UPID</div>
            <div className="col-span-3">Pozice</div>
          </div>

          {filteredPlayers.length === 0 ? (
            <div className="p-6 text-zinc-400">
              {data ? "Nikdo není online nebo hráč nebyl nalezen." : "Načítám hráče..."}
            </div>
          ) : (
            filteredPlayers.map((player) => (
              <div
                key={player.upid || player.steam || player.name}
                className="grid grid-cols-12 items-center border-b border-zinc-900 px-5 py-4 transition hover:bg-orange-950/20"
              >
                <div className="col-span-4">
                  <p className="text-lg font-black text-white">
                    {player.name}
                  </p>
                  <p className="text-xs font-bold uppercase text-green-500">
                    Online
                  </p>
                </div>

                <div className="col-span-3 hidden break-all text-sm text-zinc-400 md:block">
                  {player.steam}
                </div>

                <div className="col-span-2 hidden text-sm text-zinc-400 md:block">
                  {player.upid}
                </div>

                <div className="col-span-8 break-all text-sm text-zinc-400 md:col-span-3">
                  {player.location || "Neznámá"}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}