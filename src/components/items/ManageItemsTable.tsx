"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

interface Movie {
  _id: string;
  title: string;
  poster: string;
  genre: string;
  language: string;
  releaseYear: number;
  rating: number;
  addedBy: string;
}

interface Props {
  initialMovies: Movie[];
}

export default function ManageItemsTable({ initialMovies }: Props) {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function handleDelete(id: string, title: string) {
    const confirmed = window.confirm(`Delete "${title}"? This cannot be undone.`);
    if (!confirmed) return;

    setDeletingId(id);
    setError("");

    try {
      const res = await fetch(`${API_URL}/movies/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Failed to delete movie");
        return;
      }

      setMovies((prev) => prev.filter((m) => m._id !== id));
    } catch {
      setError("Could not reach the server. Check your connection.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="rounded-lg border border-red-800 bg-red-950 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 md:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-white/10 bg-neutral-800/50 text-gray-400">
            <tr>
              <th className="px-5 py-3 font-medium">Poster</th>
              <th className="px-5 py-3 font-medium">Title</th>
              <th className="px-5 py-3 font-medium">Genre</th>
              <th className="px-5 py-3 font-medium">Language</th>
              <th className="px-5 py-3 font-medium">Year</th>
              <th className="px-5 py-3 font-medium">Rating</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr
                key={movie._id}
                className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
              >
                <td className="px-5 py-3">
                  <div className="relative h-16 w-11 overflow-hidden rounded-md bg-neutral-800">
                    <Image
                      src={movie.poster}
                      alt={movie.title}
                      fill
                      className="object-cover"
                      sizes="44px"
                    />
                  </div>
                </td>
                <td className="px-5 py-3 text-white">{movie.title}</td>
                <td className="px-5 py-3 text-gray-400">{movie.genre}</td>
                <td className="px-5 py-3 text-gray-400">{movie.language}</td>
                <td className="px-5 py-3 text-gray-400">{movie.releaseYear}</td>
                <td className="px-5 py-3 text-gray-400">{movie.rating.toFixed(1)}</td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/movies/${movie._id}`}
                      className="rounded-md border border-white/10 px-3 py-1.5 text-xs text-gray-300 transition hover:bg-white/5"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(movie._id, movie.title)}
                      disabled={deletingId === movie._id}
                      className="rounded-md border border-red-800 px-3 py-1.5 text-xs text-red-400 transition hover:bg-red-950 disabled:opacity-50"
                    >
                      {deletingId === movie._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="flex gap-4 rounded-xl border border-white/10 bg-neutral-900 p-4"
          >
            <div className="relative h-24 w-16 flex-shrink-0 overflow-hidden rounded-md bg-neutral-800">
              <Image
                src={movie.poster}
                alt={movie.title}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>

            <div className="flex flex-1 flex-col justify-between">
              <div>
                <h3 className="text-white">{movie.title}</h3>
                <p className="mt-1 text-xs text-gray-400">
                  {movie.genre} • {movie.language} • {movie.releaseYear}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Rating: {movie.rating.toFixed(1)}
                </p>
              </div>

              <div className="mt-3 flex gap-2">
                <Link
                  href={`/movies/${movie._id}`}
                  className="flex-1 rounded-md border border-white/10 py-1.5 text-center text-xs text-gray-300"
                >
                  View
                </Link>
                <button
                  onClick={() => handleDelete(movie._id, movie.title)}
                  disabled={deletingId === movie._id}
                  className="flex-1 rounded-md border border-red-800 py-1.5 text-xs text-red-400 disabled:opacity-50"
                >
                  {deletingId === movie._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}