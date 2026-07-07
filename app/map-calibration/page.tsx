"use client";

import { useState } from "react";

export default function Calibration() {
  const [point, setPoint] = useState("");

  return (
    <div className="bg-black min-h-screen flex justify-center items-center">
      <div className="relative">

        <img
          src="/images/scum-map.png"
          className="max-w-none"
          onClick={(e) => {

            const rect = e.currentTarget.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            setPoint(`X=${Math.round(x)}  Y=${Math.round(y)}`);

            console.log({
              pixelX: Math.round(x),
              pixelY: Math.round(y),
            });

          }}
        />

        <div className="absolute left-5 top-5 bg-black/80 text-white p-4 rounded-xl">
          {point}
        </div>

      </div>
    </div>
  );
}