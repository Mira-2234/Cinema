"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RequireAuth from "@/components/RequireAuth";
import ManageItemsTable from "@/components/items/ManageItemsTable";
import MyMoviesStats from "@/components/items/MyMoviesStats";

const API_URL = "https://cinema-server-1.onrender.com";

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

function ManageItemsContent() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/movies/mine`, {
      credentials: "include", // sends cinema_auth_token directly to Render, browser handles it
      cache: "no-store",
    })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setMovies(data))
      .catch(() => setMovies([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-[#0B0B0B] px-5 pt-28 pb-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[6px] text-red-500">
              Dashboard
            </p>
            <h1
              className="mt-3 text-4xl text-white"
              style={{ fontFamily: "var(--font-bebas)" }}
            >
              Manage Your Movies
            </h1>
            <p className="mt-3 text-gray-400">
              {loading
                ? "Loading your movies…"
                : `${movies.length} ${
                    movies.length === 1 ? "movie" : "movies"
                  } added by you.`}
            </p>
          </div>

          <Link
            href="/items/add"
            className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500"
          >
            + Add Movie
          </Link>
        </div>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-40 animate-pulse rounded-2xl border border-white/10 bg-neutral-900"
              />
            ))}
          </div>
        ) : movies.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-neutral-900 px-6 py-16 text-center">
            <p className="text-lg text-white">
              You haven&apos;t added any movies yet.
            </p>
            <p className="mt-2 text-sm text-gray-400">
              Click &quot;Add Movie&quot; above to contribute your first
              title.
            </p>
          </div>
        ) : (
          <>
            <MyMoviesStats movies={movies} />
            <ManageItemsTable initialMovies={movies} />
          </>
        )}
      </div>
    </main>
  );
}

export default function ManageItemsPage() {
  return (
    <RequireAuth>
      <ManageItemsContent />
    </RequireAuth>
  );
}