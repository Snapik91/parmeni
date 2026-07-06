"use client";

import { useEffect, useState } from "react";

type ServerData = {
  online: boolean;
  players: number;
  maxPlayers: number;
  ip: string;
  port: number;
};

export default function Hero() {
  const [server, setServer] = useState<ServerData | null>(null);

  useEffect(() => {
    async function loadServer() {
      const res = await fetch("/api/server-status");
      const data = await res.json();
      setServer(data);
    }

    loadServer();
    const interval = setInterval(loadServer, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero relative min-h-screen overflow-hidden">
      <div
        className="hero-bg absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-parmeni.png')" }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/35 to-black/60" />

      <div className="absolute inset-0">
        <div className="smoke" />

        <div className="embers">
          {Array.from({ length: 35 }).map((_, i) => (
            <span
              key={i}
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${4 + Math.random() * 6}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        <div className="icebear-glow" />
        <div className="icetea-glow" />
        <div className="crown-glow" />
        <div className="falko-glow" />
      </div>

      <div className="relative z-20 mx-auto flex min-h-screen max-w-7xl items-center px-6">
        <div className="max-w-xl">
          <h1 className="text-6xl font-black uppercase md:text-8xl">
            PAŘMENI.CZ
          </h1>

          <h2 className="mt-2 text-3xl font-black uppercase text-orange-500 md:text-5xl">
            SCUM CZ/SK SERVER
          </h2>

          <p className="mt-8 text-xl leading-9 text-zinc-300">
            Přátelská komunita, férová hra a zábava na prvním místě.
            Respektuj pravidla, pomáhej ostatním a užij si přežití naplno.
          </p>

          <div className="mt-8">
            <p className="font-bold uppercase text-orange-500">IP serveru</p>

            <p className="text-4xl font-black md:text-5xl">
              {server ? `${server.ip}:${server.port}` : "Načítám..."}
            </p>
          </div>

          <div className="mt-6">
            <p className="font-bold uppercase text-orange-500">
              Online hráči
            </p>

            <p className="text-5xl font-black text-green-500">
              {server ? server.players : 0}
              <span className="text-white">
                {" "} / {server ? server.maxPlayers : 30}
              </span>
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-5">
            <a
              href={server ? `steam://connect/${server.ip}:${server.port}` : "#"}
              className="rounded-lg bg-orange-600 px-8 py-4 text-xl font-black uppercase transition hover:bg-orange-500"
            >
              ▶ Připojit se
            </a>

            <a
              href="#"
              className="rounded-lg bg-blue-900 px-8 py-4 text-xl font-black uppercase transition hover:bg-blue-800"
            >
              Discord
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}