"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Range = "1h" | "24h" | "7d";

type Snapshot = {
  id: number;
  online: boolean;
  players: number;
  maxPlayers: number;
  ping: number;
  createdAt: string;
};

export default function ServerDashboard() {
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [range, setRange] = useState<Range>("1h");

  useEffect(() => {
    async function loadSnapshots() {
      const res = await fetch(`/api/server-snapshots?range=${range}`);
      const data = await res.json();
      setSnapshots(data.snapshots ?? []);
    }

    loadSnapshots();
    const interval = setInterval(loadSnapshots, 15000);

    return () => clearInterval(interval);
  }, [range]);

  const latest = snapshots[snapshots.length - 1];

  const chartData = snapshots.map((snap) => ({
    time: new Date(snap.createdAt).toLocaleTimeString("cs-CZ", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    players: snap.players,
  }));

  return (
    <section className="bg-black py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-sm font-black uppercase tracking-[0.4em] text-green-500">
          Live dashboard
        </p>

        <h2 className="mt-3 text-4xl font-black uppercase md:text-6xl">
          Server přehled
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-4">
          <Card title="Status" value={latest?.online ? "Online" : "Načítám..."} />
          <Card title="Hráči" value={latest ? `${latest.players} / ${latest.maxPlayers}` : "..."} />
          <Card title="Ping" value={latest ? `${latest.ping} ms` : "..."} />
          <Card
            title="Update"
            value={latest ? new Date(latest.createdAt).toLocaleTimeString("cs-CZ") : "..."}
          />
        </div>

        <div className="mt-10 rounded-3xl border border-orange-900/40 bg-zinc-950 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h3 className="text-2xl font-black uppercase text-orange-500">
              Graf online hráčů
            </h3>

            <div className="flex gap-2">
              {(["1h", "24h", "7d"] as Range[]).map((item) => (
                <button
                  key={item}
                  onClick={() => setRange(item)}
                  className={`rounded-lg px-4 py-2 font-black uppercase transition ${
                    range === item
                      ? "bg-orange-600 text-white"
                      : "bg-black text-zinc-400 hover:bg-zinc-900"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="time" stroke="#a1a1aa" />
                <YAxis stroke="#a1a1aa" allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#09090b",
                    border: "1px solid #7c2d12",
                    color: "#fff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="players"
                  name="Hráči"
                  stroke="#22c55e"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <p className="text-sm font-black uppercase text-orange-500">{title}</p>
      <p className="mt-3 text-2xl font-black">{value}</p>
    </div>
  );
}