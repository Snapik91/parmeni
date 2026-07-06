export default function AboutServer() {
  return (
    <section className="relative bg-zinc-950 py-24 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.4em] text-orange-500">
            O serveru
          </p>

          <h2 className="mt-4 text-5xl font-black uppercase md:text-7xl">
            Přežij.
            <br />
            Buduj.
            <br />
            Obchoduj.
            <br />
            Bojuj.
          </h2>

          <p className="mt-8 text-lg leading-8 text-zinc-300">
            Pařmeni.cz je CZ/SK SCUM komunita zaměřená na férovou hru,
            aktivní admin tým, eventy a zábavu pro nové i zkušené hráče.
          </p>

          <p className="mt-4 text-lg leading-8 text-zinc-400">
            Najdeš u nás PvE i PvP zóny, ekonomiku, questy, obchodníky,
            komunitní akce a pohodovou partu lidí, která hraje hlavně pro
            radost.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["PvE + PvP", "Zóny pro klidné hraní i tvrdé souboje."],
            ["Eventy", "Pravidelné komunitní akce a speciální výzvy."],
            ["Ekonomika", "Obchodování, odměny a postup hráče."],
            ["Admin Team", "Aktivní podpora a dohled nad férovou hrou."],
          ].map(([title, text]) => (
            <div
              key={title}
              className="rounded-2xl border border-orange-900/40 bg-black/60 p-6 transition hover:-translate-y-1 hover:border-orange-500"
            >
              <h3 className="text-2xl font-black uppercase text-orange-500">
                {title}
              </h3>
              <p className="mt-3 text-zinc-400">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}