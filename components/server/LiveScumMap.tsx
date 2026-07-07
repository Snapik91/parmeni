"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ImageOverlay,
  MapContainer,
  Marker,
  Tooltip,
  Popup,
  Circle,
} from "react-leaflet";
import L from "leaflet";
import { worldToPixel } from "@/lib/scumCalibration";

type Player = {
  name: string;
  steam?: string;
  upid?: string;
  location: string;
};

type Location = {
  x: number;
  y: number;
  z: number;
};

const MAP_WIDTH = 1536;
const MAP_HEIGHT = 1024;

function createPlayerIcon(name: string) {
  return new L.DivIcon({
    html: `
      <div style="
        position:relative;
        width:18px;
        height:18px;
      ">
        <div style="
          width:18px;
          height:18px;
          background:#22c55e;
          border:3px solid white;
          border-radius:999px;
          box-shadow:0 0 18px #22c55e;
        "></div>
        <div style="
          position:absolute;
          left:50%;
          top:50%;
          width:38px;
          height:38px;
          transform:translate(-50%,-50%);
          border:1px solid rgba(34,197,94,.6);
          border-radius:999px;
          animation:pulse 1.8s infinite;
        "></div>
      </div>
    `,
    className: `player-marker-${name}`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

const traderIcon = new L.DivIcon({
  html: `
    <div style="
      width:22px;
      height:22px;
      background:#f97316;
      border:3px solid white;
      border-radius:6px;
      box-shadow:0 0 18px #f97316;
      transform:rotate(45deg);
    "></div>
  `,
  className: "",
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

const traders = [
  { name: "A0 Trader", pos: worldToPixel(-621118.625, -555661.125) },
  { name: "Z3 Trader", pos: worldToPixel(19579.059, -678454.625) },
  { name: "B4 Trader", pos: worldToPixel(573951.5, -228643.578) },
  { name: "C2 Trader", pos: worldToPixel(-150633.844, 289783.906) },
];

function parseLocation(location: string): Location | null {
  const match = location.match(
    /\(?\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)?/
  );

  if (!match) return null;

  return {
    x: Number(match[1]),
    y: Number(match[2]),
    z: Number(match[3]),
  };
}

export default function LiveScumMap() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [showPlayers, setShowPlayers] = useState(true);
  const [showTraders, setShowTraders] = useState(true);

  useEffect(() => {
    async function loadPlayers() {
      const res = await fetch("/api/players");
      const data = await res.json();
      setPlayers(data.players || []);
    }

    loadPlayers();
    const interval = setInterval(loadPlayers, 5000);

    return () => clearInterval(interval);
  }, []);

  const mappedPlayers = useMemo(() => {
    return players
      .map((player) => {
        const loc = parseLocation(player.location);
        if (!loc) return null;

        return {
          ...player,
          loc,
          pos: worldToPixel(loc.x, loc.y),
        };
      })
      .filter(Boolean) as Array<Player & { loc: Location; pos: [number, number] }>;
  }, [players]);

  return (
    <section className="bg-black py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-sm font-black uppercase tracking-[0.4em] text-green-500">
          Live mapa hráčů
        </p>

        <h2 className="mb-8 mt-3 text-5xl font-black uppercase text-white">
          Mapa serveru
        </h2>

        <div className="mb-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
            <p className="text-sm font-black uppercase text-orange-500">
              Online hráči
            </p>
            <p className="mt-2 text-4xl font-black text-green-500">
              {mappedPlayers.length}
            </p>
          </div>

          <button
            onClick={() => setShowPlayers(!showPlayers)}
            className={`rounded-2xl border p-5 text-left font-black uppercase transition ${
              showPlayers
                ? "border-green-500 bg-green-950/40 text-green-400"
                : "border-zinc-800 bg-zinc-950 text-zinc-500"
            }`}
          >
            🟢 Hráči {showPlayers ? "zapnuto" : "vypnuto"}
          </button>

          <button
            onClick={() => setShowTraders(!showTraders)}
            className={`rounded-2xl border p-5 text-left font-black uppercase transition ${
              showTraders
                ? "border-orange-500 bg-orange-950/40 text-orange-400"
                : "border-zinc-800 bg-zinc-950 text-zinc-500"
            }`}
          >
            🛒 Tradeři {showTraders ? "zapnuto" : "vypnuto"}
          </button>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-orange-800 shadow-2xl shadow-orange-950/30">
          <div className="absolute left-5 top-5 z-[500] rounded-2xl border border-zinc-800 bg-black/85 p-4 backdrop-blur-md">
            <p className="text-sm font-black uppercase text-orange-500">
              Legenda
            </p>
            <p className="mt-2 text-sm text-zinc-300">🟢 Online hráč</p>
            <p className="text-sm text-zinc-300">🟠 Trader</p>
            <p className="text-sm text-zinc-300">🔴 PvP zóna</p>
            <p className="text-sm text-zinc-300">🔵 PvE zóna</p>
            <p className="text-sm text-zinc-300">🟡 Nuclear PvE</p>
            <p className="text-sm text-zinc-300">🟣 PvE loot</p>
          </div>

          <MapContainer
            center={[MAP_HEIGHT / 2, MAP_WIDTH / 2]}
            zoom={0}
            minZoom={-1}
            maxZoom={4}
            crs={L.CRS.Simple}
            style={{ height: "900px", background: "#000" }}
          >
            <ImageOverlay
              url="/images/scum-map.png"
              bounds={[
                [0, 0],
                [MAP_HEIGHT, MAP_WIDTH],
              ]}
            />

            {showTraders &&
              traders.map((trader) => (
                <Marker
                  key={trader.name}
                  position={trader.pos}
                  icon={traderIcon}
                >
                  <Tooltip permanent>{trader.name}</Tooltip>
                </Marker>
              ))}

            {showPlayers &&
              mappedPlayers.map((player) => (
                <Marker
                  key={player.upid || player.steam || player.name}
                  position={player.pos}
                  icon={createPlayerIcon(player.name)}
                >
                  <Tooltip>{player.name}</Tooltip>
                  <Popup>
                    <div>
                      <strong>{player.name}</strong>
                      <br />
                      Steam: {player.steam || "nezjištěno"}
                      <br />
                      UPID: {player.upid || "nezjištěno"}
                      <br />
                      X: {Math.round(player.loc.x)}
                      <br />
                      Y: {Math.round(player.loc.y)}
                    </div>
                  </Popup>
                  <Circle
                    center={player.pos}
                    radius={18}
                    pathOptions={{
                      color: "#22c55e",
                      fillColor: "#22c55e",
                      fillOpacity: 0.08,
                      weight: 1,
                    }}
                  />
                </Marker>
              ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
}