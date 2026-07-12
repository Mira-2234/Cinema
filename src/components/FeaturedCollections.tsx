"use client";

import Image from "next/image";

const collections = [
  {
    id: 1,
    title: "Marvel Universe",
    subtitle: "35+ Movies",
    genre: "Superhero Collection",
    image:
      "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
  },
  {
    id: 2,
    title: "Sci-Fi Collection",
    subtitle: "Best Space Adventures",
    genre: "Sci-Fi",
    image:
      "https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
  },
  {
    id: 3,
    title: "DC Collection",
    subtitle: "Batman • Joker • More",
    genre: "Action",
    image:
      "https://image.tmdb.org/t/p/original/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
  },
];

export default function FeaturedCollections() {
  return (
    <section className="bg-[#0B0B0B] py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-16 text-center">
          <p className="font-semibold uppercase tracking-[5px] text-red-500">
            Collections
          </p>

          <h2
            className="mt-4 text-5xl text-white"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            FEATURED COLLECTIONS
          </h2>

          <p className="mt-5 text-gray-400">
            Explore our hand-picked featured movie collections.
          </p>
        </div>

        <div className="space-y-8">
          {collections.map((item) => (
            <div
              key={item.id}
              className="group relative h-[280px] overflow-hidden rounded-3xl"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                priority
                sizes="100vw"
                className="object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />

              <div className="absolute left-6 top-1/2 -translate-y-1/2 sm:left-12">
                <p className="uppercase tracking-[4px] text-red-500">
                  {item.genre}
                </p>

                <h2
                  className="mt-3 text-3xl text-white sm:text-5xl"
                  style={{ fontFamily: "var(--font-bebas)" }}
                >
                  {item.title}
                </h2>

                <p className="mt-3 text-gray-300">
                  {item.subtitle}
                </p>

                <button className="mt-8 rounded-full bg-red-600 px-7 py-3 font-semibold text-white transition hover:bg-red-700">
                  Explore Collection →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}