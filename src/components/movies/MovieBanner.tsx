"use client";

import Image from "next/image";
import { Movie } from "./MovieCard";

interface Props {
  movie: Movie;
}

export default function MovieBanner({ movie }: Props) {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden mt-20">
      <Image
        src={movie.banner}
        alt={movie.title}
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20" />

      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto flex max-w-7xl items-center gap-12 px-5">
          {/* Poster */}

          <div className="relative hidden h-[500px] w-[340px] overflow-hidden rounded-2xl shadow-2xl lg:block">
            <Image
              src={movie.poster}
              alt={movie.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Info */}

          <div className="max-w-3xl">
            <span className="rounded-full bg-red-600 px-4 py-2 text-sm text-white">
              {movie.genre}
            </span>

            <h1
              className="mt-6 text-6xl text-white lg:text-8xl"
              style={{ fontFamily: "var(--font-bebas)" }}
            >
              {movie.title}
            </h1>

            <div className="mt-6 flex flex-wrap gap-5 text-gray-300">
              <span>⭐ {movie.rating}</span>
              <span>{movie.releaseYear}</span>
              <span>{movie.duration}</span>
              <span>{movie.language}</span>
            </div>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-300">
              {movie.description}
            </p>

            <div className="mt-10 flex gap-5">
              <button className="rounded-full bg-red-600 px-8 py-4 font-semibold text-white hover:bg-red-700">
                ▶ Watch Now
              </button>

              <button className="rounded-full border border-white/20 px-8 py-4 font-semibold text-white hover:border-red-600">
                + My List
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}