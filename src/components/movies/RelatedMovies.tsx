"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

interface Movie {
  _id: string;
  title: string;
  poster: string;
  genre: string;
  releaseYear: number;
  rating: number;
}

interface Props {
  genre: string;
  excludeId: string;
}

export default function RelatedMovies({ genre, excludeId }: Props) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRelated = async () => {
      try {
        const res = await fetch(
          `${API_URL}/movies/explore?genre=${encodeURIComponent(genre)}&limit=4`
        );
        const data = await res.json();
        const filtered = (data.movies as Movie[]).filter(
          (m) => m._id !== excludeId
        );
        setMovies(filtered.slice(0, 4));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getRelated();
  }, [genre, excludeId]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-64 animate-pulse rounded-xl bg-neutral-800"
          />
        ))}
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <p className="text-sm text-gray-500">No related movies found.</p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
      {movies.map((movie) => (
        <Link
          key={movie._id}
          href={`/movies/${movie._id}`}
          className="group overflow-hidden rounded-xl border border-white/10 bg-neutral-900"
        >
          <div className="relative h-56 w-full overflow-hidden">
            <Image
              src={movie.poster}
              alt={movie.title}
              fill
              className="object-cover duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
          <div className="p-3">
            <h3 className="line-clamp-1 text-sm font-medium text-white">
              {movie.title}
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              ⭐ {movie.rating.toFixed(1)} • {movie.releaseYear}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}