"use client";

import { useEffect, useState } from "react";

type ServerData = {
  online: boolean;
  players: number;
  maxPlayers: number;
  ip: string;
  port: number;
  game: string;
  version: string;
  ping: number;
  restartIn: string;
};

export default function ServerStatus() {
  const [server, setServer] = useState<ServerData | null>(null);

  useEffect(() => {
    loadServer();
    const interval = setInterval(loadServer, 10000);
    return () => clearInterval(interval);
  }, []);

  async function loadServer() {
    const res = await fetch("/api/server-status");
    const data = await res.json();
    setServer(data);
  }

  return (
    <section className="bg-black py-16 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-3xl border border-orange-900/50 bg-zinc-950/90 p-8 shadow-2xl shadow-orange-950/30">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.4em] text-green-500">
                🟢 Server online
              </p>

              <h2 className="mt-3 text-4xl font-black uppercase md:text-6xl">
                Live status
              </h2>
            </div>

            <p className="text-zinc-400">
              Údaje zatím testovací, později napojíme na server.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3 xl:grid-cols-6">
            <StatusCard
  title="Hráči"
  value={server ? `${server.players} / ${server.maxPlayers}` : "Načítám..."}
/>

<div className="rounded-2xl border border-zinc-800 bg-black/70 p-5 transition hover:-translate-y-1 hover:border-orange-500">
  <p className="text-sm font-black uppercase text-orange-500">
    IP SERVERU
  </p>

  <p className="mt-3 break-all text-lg font-black text-white">
    {server ? server.ip : "Načítám..."}
  </p>

  <p className="text-lg font-black text-orange-400">
    {server ? `:${server.port}` : ""}
  </p>
</div>

<StatusCard
  title="Hra"
  value={server ? server.game : "Načítám..."}
/>

<StatusCard
  title="Verze"
  value={server ? server.version : "Načítám..."}
/>

<StatusCard
  title="Restart"
  value={server ? server.restartIn : "Načítám..."}
/>

<StatusCard
  title="Ping"
  value={server ? `${server.ping} ms` : "Načítám..."}
/>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatusCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-black/70 p-5 transition hover:-translate-y-1 hover:border-orange-500">
      <p className="text-sm font-black uppercase text-orange-500">{title}</p>
      <p className="mt-3 text-2xl font-black text-white">{value}</p>
    </div>
  );
}