"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import RequireAuth from "@/components/RequireAuth";
import RelatedMovies from "@/components/movies/RelatedMovies";

const API_URL = "https://cinema-server-1.onrender.com";

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
  featured: boolean;
  trending: boolean;
}

function MovieDetailsContent() {
  const params = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/movies/${params.id}`, { cache: "no-store" })
      .then((res) => {
        if (!res.ok) {
          setNotFoundState(true);
          return null;
        }
        return res.json();
      })
      .then((data) => setMovie(data))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (notFoundState) notFound();

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#0B0B0B]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-red-600" />
      </div>
    );
  }

  if (!movie) return null;

  return (
    <main className="min-h-screen bg-[#0B0B0B] pb-20">
      <section className="relative h-[55vh] w-full md:h-[65vh]">
        <Image
          src={movie.banner || movie.poster}
          alt={movie.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-black/50 to-black/20" />

        <div className="absolute bottom-0 left-0 w-full px-5 pb-10">
          <div className="mx-auto flex max-w-6xl items-end gap-6">
            <div className="relative hidden h-56 w-40 flex-shrink-0 overflow-hidden rounded-xl border border-white/10 shadow-xl sm:block">
              <Image
                src={movie.poster}
                alt={movie.title}
                fill
                className="object-cover"
              />
            </div>

            <div>
              <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-medium text-white">
                {movie.genre}
              </span>

              <h1
                className="mt-4 text-4xl text-white md:text-5xl"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                {movie.title}
              </h1>

              {movie.shortDescription && (
                <p className="mt-2 max-w-xl text-gray-300">
                  {movie.shortDescription}
                </p>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-300">
                <span>⭐ {movie.rating.toFixed(1)} / 10</span>
                <span>•</span>
                <span>{movie.releaseYear}</span>
                <span>•</span>
                <span>{movie.duration}</span>
                <span>•</span>
                <span>{movie.language}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 pt-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            <div>
              <h2 className="text-2xl font-semibold text-white">Overview</h2>
              <p className="mt-4 leading-relaxed text-gray-400">
                {movie.description}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white">
                Key Information
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-neutral-900 p-6 sm:grid-cols-3">
                <SpecItem label="Genre" value={movie.genre} />
                <SpecItem label="Language" value={movie.language} />
                <SpecItem label="Duration" value={movie.duration} />
                <SpecItem
                  label="Release Year"
                  value={String(movie.releaseYear)}
                />
                <SpecItem
                  label="Rating"
                  value={`${movie.rating.toFixed(1)} / 10`}
                />
                <SpecItem
                  label="Status"
                  value={
                    movie.trending
                      ? "Trending"
                      : movie.featured
                      ? "Featured"
                      : "Standard"
                  }
                />
              </div>
            </div>
          </div>

          <div>
            <div className="rounded-2xl border border-white/10 bg-neutral-900 p-6 text-center">
              <p className="text-sm uppercase tracking-widest text-gray-400">
                Audience Rating
              </p>
              <p className="mt-3 text-5xl font-bold text-red-500">
                {movie.rating.toFixed(1)}
              </p>
              <p className="mt-1 text-sm text-gray-500">out of 10</p>
            </div>

            <Link
              href="/explore"
              className="mt-6 block rounded-lg border border-white/10 py-3 text-center text-sm text-gray-300 transition hover:bg-white/5"
            >
              ← Back to Explore
            </Link>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-semibold text-white">
            Related Movies
          </h2>
          <RelatedMovies genre={movie.genre} excludeId={movie._id} />
        </div>
      </div>
    </main>
  );
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
      <p className="mt-1 text-white">{value}</p>
    </div>
  );
}

export default function MovieDetailsPage() {
  return (
    <RequireAuth>
      <MovieDetailsContent />
    </RequireAuth>
  );
}