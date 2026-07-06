export default function Features() {
  return (
    <section className="bg-black py-12">
      <div className="mx-auto grid max-w-7xl gap-5 px-6 md:grid-cols-3 xl:grid-cols-6">

        {[
          "PvE + PvP zóny",
          "Loot x3",
          "Questy",
          "Eventy",
          "Ekonomika",
          "Komunita",
        ].map((item) => (
          <div
            key={item}
            className="rounded-xl border border-orange-900/40 bg-zinc-950 p-6 transition hover:border-orange-500 hover:-translate-y-1"
          >
            <h3 className="font-black uppercase text-orange-500">
              {item}
            </h3>
          </div>
        ))}

      </div>
    </section>
  );
}