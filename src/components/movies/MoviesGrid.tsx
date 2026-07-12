"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Movie {
  _id: string;
  title: string;
  poster: string;
  genre: string;
  rating: number;
  releaseYear: number;
  duration: string;
}

export default function MoviesGrid() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/movies`,
          {
            cache: "no-store",
          }
        );

        const data = await res.json();
        setMovies(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <section className="py-32 text-center text-white">
        Loading Movies...
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-20">
      {/* Heading */}

      <div className="mb-14 text-center">
        <p className="uppercase tracking-[6px] text-red-500">
          All Movies
        </p>

        <h2
          className="mt-3 text-5xl text-white"
          style={{ fontFamily: "var(--font-bebas)" }}
        >
          Explore Our Collection
        </h2>

        <p className="mt-4 text-gray-400">
          Browse all available movies from our database.
        </p>
      </div>

      {/* Grid */}

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-[#121212] transition duration-300 hover:-translate-y-2 hover:border-red-500"
          >
            {/* Poster */}

            <div className="relative h-[360px] overflow-hidden">
              <Image
                src={movie.poster}
                alt={movie.title}
                fill
                sizes="300px"
                className="object-cover duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              <span className="absolute left-3 top-3 rounded-full bg-red-600 px-3 py-1 text-xs text-white">
                {movie.genre}
              </span>
            </div>

            {/* Content */}

            <div className="p-5">
              <h3 className="line-clamp-1 text-xl font-semibold text-white">
                {movie.title}
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                ⭐ {movie.rating}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {movie.releaseYear} • {movie.duration}
              </p>

              <Link href={`/movies/${movie._id}`}>
                <button className="mt-5 w-full rounded-lg bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}