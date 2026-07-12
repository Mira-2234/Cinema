"use client";

export default function MovieTrailer() {
  return (
    <section className="bg-black py-20">
      <div className="mx-auto max-w-7xl px-5">

        <div className="mb-12 text-center">
          <p className="uppercase tracking-[5px] text-red-500">
            Trailer
          </p>

          <h2
            className="mt-3 text-5xl text-white"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            Official Trailer
          </h2>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
          <iframe
            className="aspect-video w-full"
            src="https://www.youtube.com/embed/Way9Dexny3w"
            title="Movie Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

      </div>
    </section>
  );
}