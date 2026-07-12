"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Movie {
  _id: string;
  title: string;
  shortDescription?: string;
  poster: string;
  banner: string;
  genre: string;
  language: string;
  duration: string;
  releaseYear: number;
  rating: number;
  description: string;
}

export default function PopularMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies`);
        const data = await res.json();
        setMovies(data.slice(0, 8));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-7xl px-5">
        {/* Heading */}
        <div className="mb-14 text-center">
          <p className="text-sm uppercase tracking-[6px] text-red-500">
            Popular Movies
          </p>
          <h2 className="mt-3 text-5xl font-bold text-white">
            Discover Popular Movies
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Explore hand-picked blockbuster movies and trending collections.
          </p>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-[380px] animate-pulse rounded-2xl bg-neutral-800"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {movies.map((movie) => (
              <div
                key={movie._id}
                className="group flex h-[380px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-900"
              >
                {/* Poster */}
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={movie.poster}
                    alt={movie.title}
                    fill
                    className="object-cover duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute left-3 top-3 rounded-full bg-red-600 px-3 py-1 text-xs text-white">
                    {movie.genre}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <h3 className="line-clamp-1 text-lg font-semibold text-white">
                      {movie.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-gray-400">
                      {movie.shortDescription || movie.description}
                    </p>
                    <p className="mt-2 text-xs text-gray-500">
                      ⭐ {movie.rating} • {movie.releaseYear} • {movie.duration}
                    </p>
                  </div>

                  <Link
                    href={`/movies/${movie._id}`}
                    className="mt-3 block rounded-lg border border-white/10 py-2 text-center text-sm text-gray-300 transition hover:bg-white/5"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      
        <div className="mt-14 flex justify-center">
          <Link
            href="/explore"
            className="rounded-lg bg-red-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
          >
            View All Movies
          </Link>
        </div>
      </div>
    </section>
  );
}