"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

interface Movie {
  _id: string;
  genre: string;
  language: string;
  rating: number;
  releaseYear: number;
}

interface GenreCount {
  genre: string;
  count: number;
}

interface LanguageCount {
  name: string;
  value: number;
}

const COLORS = ["#dc2626", "#ef4444", "#f87171", "#fca5a5", "#fecaca", "#7f1d1d"];

export default function StatisticsSection() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await fetch(`${API_URL}/movies`);
        const data = await res.json();
        setMovies(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  if (loading) {
    return (
      <section className="bg-black py-24">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="h-96 animate-pulse rounded-2xl bg-neutral-900" />
            <div className="h-96 animate-pulse rounded-2xl bg-neutral-900" />
          </div>
        </div>
      </section>
    );
  }

  // ---- Derived stats from real data ----

  const totalMovies = movies.length;

  const uniqueGenres = new Set(movies.map((m) => m.genre)).size;

  const uniqueLanguages = new Set(movies.map((m) => m.language)).size;

  const avgRating =
    movies.length > 0
      ? (movies.reduce((sum, m) => sum + m.rating, 0) / movies.length).toFixed(1)
      : "0.0";

  // Genre distribution (bar chart)
  const genreMap: Record<string, number> = {};
  movies.forEach((m) => {
    genreMap[m.genre] = (genreMap[m.genre] || 0) + 1;
  });
  const genreData: GenreCount[] = Object.entries(genreMap)
    .map(([genre, count]) => ({ genre, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  // Language distribution (pie chart)
  const languageMap: Record<string, number> = {};
  movies.forEach((m) => {
    languageMap[m.language] = (languageMap[m.language] || 0) + 1;
  });
  const languageData: LanguageCount[] = Object.entries(languageMap).map(
    ([name, value]) => ({ name, value })
  );

  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-7xl px-5">
        {/* Heading */}
        <div className="mb-14 text-center">
          <p className="text-sm uppercase tracking-[6px] text-red-500">
            By The Numbers
          </p>
          <h2 className="mt-3 text-5xl font-bold text-white">
            Platform Statistics
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            A live snapshot of the movies our community has added to ReelBox.
          </p>
        </div>

        {/* Summary cards */}
        <div className="mb-12 grid grid-cols-2 gap-6 md:grid-cols-4">
          <StatCard label="Total Movies" value={totalMovies.toString()} />
          <StatCard label="Genres Covered" value={uniqueGenres.toString()} />
          <StatCard label="Languages" value={uniqueLanguages.toString()} />
          <StatCard label="Average Rating" value={`${avgRating} / 10`} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Bar Chart — Genre distribution */}
          <div className="rounded-2xl border border-white/10 bg-neutral-900 p-6">
            <h3 className="mb-6 text-lg font-semibold text-white">
              Movies by Genre
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={genreData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                <XAxis
                  dataKey="genre"
                  stroke="#9ca3af"
                  fontSize={12}
                  interval={0}
                  angle={-25}
                  textAnchor="end"
                  height={60}
                />
                <YAxis stroke="#9ca3af" fontSize={12} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#171717",
                    border: "1px solid #262626",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  cursor={{ fill: "rgba(220, 38, 38, 0.08)" }}
                />
                <Bar dataKey="count" fill="#dc2626" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart — Language distribution */}
          <div className="rounded-2xl border border-white/10 bg-neutral-900 p-6">
            <h3 className="mb-6 text-lg font-semibold text-white">
              Movies by Language
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={languageData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  labelLine={false}
                >
                  {languageData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#171717",
                    border: "1px solid #262626",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: "12px", color: "#9ca3af" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-neutral-900 p-6 text-center">
      <p className="text-3xl font-bold text-red-500">{value}</p>
      <p className="mt-2 text-xs uppercase tracking-wide text-gray-400">
        {label}
      </p>
    </div>
  );
}