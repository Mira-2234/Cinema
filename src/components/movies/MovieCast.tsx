"use client";

import Image from "next/image";

const cast = [
  {
    id: 1,
    name: "Timothée Chalamet",
    role: "Paul Atreides",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Zendaya",
    role: "Chani",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Rebecca Ferguson",
    role: "Lady Jessica",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 4,
    name: "Josh Brolin",
    role: "Gurney Halleck",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
  },
];

export default function MovieCast() {
  return (
    <section className="bg-[#0B0B0B] py-20">
      <div className="mx-auto max-w-7xl px-5">

        <div className="mb-12">
          <p className="uppercase tracking-[5px] text-red-500">
            Cast
          </p>

          <h2
            className="mt-3 text-5xl text-white"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            Top Cast
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {cast.map((actor) => (
            <div
              key={actor.id}
              className="rounded-2xl border border-white/10 bg-[#121212] p-6 text-center transition hover:border-red-600"
            >
              <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-full">
                <Image
                  src={actor.image}
                  alt={actor.name}
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="mt-5 text-xl font-semibold text-white">
                {actor.name}
              </h3>

              <p className="mt-2 text-gray-400">
                {actor.role}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}