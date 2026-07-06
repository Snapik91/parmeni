"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["Domů", "O serveru", "Pravidla", "Novinky", "Eventy", "Kontakt"];

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/90 border-b border-orange-900/60 backdrop-blur-md"
          : "bg-black/35 border-b border-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-300 ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        <div>
          <h1 className="text-2xl font-black tracking-wide text-white md:text-3xl">
            PAŘMENI.CZ
          </h1>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-orange-500">
            SCUM CZ/SK SERVER
          </p>
        </div>

        <nav className="hidden gap-8 font-bold uppercase text-zinc-300 lg:flex">
          {links.map((link, index) => (
            <a
              key={link}
              href="#"
              className={`transition hover:text-orange-500 ${
                index === 0 ? "text-orange-500" : ""
              }`}
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="#"
            className="rounded-lg border border-orange-700 px-5 py-3 font-bold uppercase text-white transition hover:bg-orange-700"
          >
            Discord
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="rounded border border-orange-700 px-4 py-2 font-black text-orange-500 lg:hidden"
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="border-t border-orange-900/50 bg-black/95 px-6 py-5 lg:hidden">
          <nav className="flex flex-col gap-4 font-bold uppercase text-zinc-300">
            {links.map((link) => (
              <a
                key={link}
                href="#"
                className="hover:text-orange-500"
                onClick={() => setOpen(false)}
              >
                {link}
              </a>
            ))}

            <a
              href="#"
              className="mt-3 rounded-lg border border-orange-700 px-5 py-3 text-center font-black uppercase text-white hover:bg-orange-700"
            >
              Discord
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}