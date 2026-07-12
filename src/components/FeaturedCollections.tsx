"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Movie {
  _id: string;
  title: string;
  poster: string;
  banner: string;
  genre: string;
  rating: number;
  releaseYear: number;
}

export default function FeaturedCollections() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/movies/featured`
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setMovies(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, []);

  if (loading) {
    return (
      <section className="bg-[#0B0B0B] py-24 text-center text-white">
        Loading...
      </section>
    );
  }

  if (error || movies.length === 0) {
    return (
      <section className="bg-[#0B0B0B] py-24 text-center text-gray-400">
        No featured collections available right now.
      </section>
    );
  }

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
            Explore our hand-picked featured movies.
          </p>
        </div>

          
        <div className="space-y-8">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="group relative h-[280px] overflow-hidden rounded-3xl"
            >
              {movie.banner ? (
                <Image
                  src={movie.banner}
                  alt={movie.title}
                  fill
                  sizes="100vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="h-full w-full bg-neutral-800" />
              )}

              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />

              <div className="absolute left-6 top-1/2 -translate-y-1/2 sm:left-12">
                <p className="uppercase tracking-[4px] text-red-500">
                  {movie.genre}
                </p>
                <h2
                  className="mt-3 text-3xl text-white sm:text-5xl"
                  style={{ fontFamily: "var(--font-bebas)" }}
                >
                  {movie.title}
                </h2>
                <p className="mt-3 text-gray-300">
                  ⭐ {movie.rating} • {movie.releaseYear}
                </p>
                <button className="mt-8 rounded-full bg-red-600 px-7 py-3 font-semibold text-white transition hover:bg-red-700">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}