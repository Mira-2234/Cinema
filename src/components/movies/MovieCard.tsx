"use client";

import Image from "next/image";
import Link from "next/link";

export interface Movie {
  _id: string;
  title: string;
  poster: string;
  banner: string;
  genre: string;
  language: string;
  duration: string;
  releaseYear: number;
  rating: number;
  description: string;
}

interface Props {
  movie: Movie;
}

export default function MovieCard({ movie }: Props) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-[#111] transition-all duration-300 hover:-translate-y-2 hover:border-red-600 hover:shadow-xl hover:shadow-red-600/20">
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

        <span className="absolute left-3 top-3 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
          {movie.genre}
        </span>

        <span className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs text-yellow-400 backdrop-blur">
          ⭐ {movie.rating}
        </span>
      </div>

      {/* Content */}

      <div className="space-y-3 p-5">
        <h3 className="line-clamp-1 text-2xl font-bold text-white">
          {movie.title}
        </h3>

        <p className="text-sm text-gray-400">
          {movie.releaseYear} • {movie.duration}
        </p>

        <p className="line-clamp-2 text-sm text-gray-500">
          {movie.description}
        </p>

        <Link href={`/movies/${movie._id}`}>
          <button className="mt-3 w-full rounded-lg bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}