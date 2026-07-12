"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

interface Movie {
  _id: string;
  title: string;
  poster: string;
  genre: string;
  language: string;
  rating: number;
  releaseYear: number;
  duration: string;
}

interface FilterOptions {
  genres: string[];
  languages: string[];
}

const SORT_OPTIONS = [
  { value: "year_desc", label: "Newest first" },
  { value: "year_asc", label: "Oldest first" },
  { value: "rating_desc", label: "Highest rated" },
  { value: "rating_asc", label: "Lowest rated" },
  { value: "title_asc", label: "Title A–Z" },
];

export default function ExplorePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    genres: [],
    languages: [],
  });
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const searchInput = searchParams.get("q") || "";
  const genre = searchParams.get("genre") || "";
  const language = searchParams.get("language") || "";
  const sort = searchParams.get("sort") || "year_desc";
  const page = parseInt(searchParams.get("page") || "1");

  const [searchDraft, setSearchDraft] = useState(searchInput);

  function updateParams(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    // filter/search/sort change hole page 1-e reset koro
    if (!("page" in updates)) {
      params.set("page", "1");
    }

    router.push(`/explore?${params.toString()}`);
  }

  // Load filter dropdown options — ekbar e
  useEffect(() => {
    async function loadFilters() {
      try {
        const res = await fetch(`${API_URL}/movies/filters`, {
          cache: "no-store",
        });
        const data = await res.json();
        setFilterOptions({
          genres: data.genres || [],
          languages: data.languages || [],
        });
      } catch {
        // filter dropdown fail hole bhi page use kora jabe, silently ignore
      }
    }
    loadFilters();
  }, []);

  // Debounced search — URL update
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchDraft !== searchInput) {
        updateParams({ q: searchDraft });
      }
    }, 400);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDraft]);

  // Fetch movies jokhon-i URL params change hoy
  const fetchMovies = useCallback(async () => {
    setLoading(true);

    try {
      const params = new URLSearchParams();
      if (searchInput) params.set("search", searchInput);
      if (genre) params.set("genre", genre);
      if (language) params.set("language", language);
      if (sort) params.set("sort", sort);
      params.set("page", String(page));
      params.set("limit", "12");

      const res = await fetch(`${API_URL}/movies/explore?${params.toString()}`, {
        cache: "no-store",
      });

      const data = await res.json();
      setMovies(data.movies || []);
      setTotalPages(data.totalPages || 1);
      setTotal(data.total || 0);
    } catch {
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, [searchInput, genre, language, sort, page]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  function clearFilters() {
    setSearchDraft("");
    router.push("/explore");
  }

  const hasActiveFilters = searchInput || genre || language;

  return (
    <main className="min-h-screen bg-[#0B0B0B] px-5 pt-28 pb-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[6px] text-red-500">
            Explore
          </p>
          <h1
            className="mt-3 text-5xl text-white"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            Find Your Next Watch
          </h1>
        </div>

        {/* Search bar */}
        <div className="mx-auto mb-6 max-w-2xl">
          <div className="relative">
            <input
              type="text"
              value={searchDraft}
              onChange={(e) => setSearchDraft(e.target.value)}
              placeholder="Search movies by title..."
              className="w-full rounded-full border border-white/15 bg-[#141414] px-5 py-3 pl-12 text-white placeholder-gray-500 focus:border-red-600 focus:outline-none"
            />
            <svg
              className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
          </div>
        </div>

        {/* Filters + Sort */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          <select
            value={genre}
            onChange={(e) => updateParams({ genre: e.target.value })}
            className="rounded-lg border border-white/15 bg-[#141414] px-4 py-2 text-sm text-white focus:border-red-600 focus:outline-none"
          >
            <option value="">All Genres</option>
            {filterOptions.genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>

          <select
            value={language}
            onChange={(e) => updateParams({ language: e.target.value })}
            className="rounded-lg border border-white/15 bg-[#141414] px-4 py-2 text-sm text-white focus:border-red-600 focus:outline-none"
          >
            <option value="">All Languages</option>
            {filterOptions.languages.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => updateParams({ sort: e.target.value })}
            className="rounded-lg border border-white/15 bg-[#141414] px-4 py-2 text-sm text-white focus:border-red-600 focus:outline-none"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="rounded-lg border border-red-800 px-4 py-2 text-sm text-red-400 hover:bg-red-950"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Result count */}
        {!loading && (
          <p className="mb-6 text-sm text-gray-400">
            {total} {total === 1 ? "movie" : "movies"} found
          </p>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-[440px] animate-pulse rounded-2xl bg-white/5"
              />
            ))}
          </div>
        ) : movies.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-[#121212] px-6 py-16 text-center">
            <p className="text-lg text-white">No movies match your filters</p>
            <p className="mt-2 text-sm text-gray-400">
              Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {movies.map((movie) => (
              <div
                key={movie._id}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-[#121212] transition duration-300 hover:-translate-y-2 hover:border-red-500"
              >
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

                <div className="p-5">
                  <h3 className="line-clamp-1 text-xl font-semibold text-white">
                    {movie.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-400">⭐ {movie.rating}</p>
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
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="mt-14 flex items-center justify-center gap-2">
            <button
              onClick={() => updateParams({ page: String(page - 1) })}
              disabled={page <= 1}
              className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white disabled:opacity-30"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => updateParams({ page: String(pageNum) })}
                  className={`rounded-lg px-4 py-2 text-sm ${
                    pageNum === page
                      ? "bg-red-600 text-white"
                      : "border border-white/15 text-white hover:border-white/30"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => updateParams({ page: String(page + 1) })}
              disabled={page >= totalPages}
              className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white disabled:opacity-30"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </main>
  );
}