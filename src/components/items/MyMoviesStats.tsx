"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
  movies: Movie[];
}

interface GenreCount {
  genre: string;
  count: number;
}

export default function MyMoviesStats({ movies }: Props) {
  const totalMovies = movies.length;

  const uniqueGenres = new Set(movies.map((m) => m.genre)).size;

  const avgRating =
    movies.length > 0
      ? (movies.reduce((sum, m) => sum + m.rating, 0) / movies.length).toFixed(1)
      : "0.0";

  const latestYear =
    movies.length > 0 ? Math.max(...movies.map((m) => m.releaseYear)) : "-";

  // Genre distribution for bar chart
  const genreMap: Record<string, number> = {};
  movies.forEach((m) => {
    genreMap[m.genre] = (genreMap[m.genre] || 0) + 1;
  });

  const genreData: GenreCount[] = Object.entries(genreMap)
    .map(([genre, count]) => ({ genre, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="mb-10 space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Total Added" value={totalMovies.toString()} />
        <StatCard label="Genres Covered" value={uniqueGenres.toString()} />
        <StatCard label="Avg Rating" value={`${avgRating} / 10`} />
        <StatCard label="Latest Release" value={String(latestYear)} />
      </div>

      {/* Genre breakdown chart — only show if there's data */}
      {genreData.length > 0 && (
        <div className="rounded-2xl border border-white/10 bg-neutral-900 p-6">
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-wide text-gray-400">
            Your Movies by Genre
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={genreData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" horizontal={false} />
              <XAxis type="number" stroke="#9ca3af" fontSize={12} allowDecimals={false} />
              <YAxis
                type="category"
                dataKey="genre"
                stroke="#9ca3af"
                fontSize={12}
                width={80}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#171717",
                  border: "1px solid #262626",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                cursor={{ fill: "rgba(220, 38, 38, 0.08)" }}
              />
              <Bar dataKey="count" fill="#dc2626" radius={[0, 6, 6, 0]} barSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-neutral-900 p-5 text-center">
      <p className="text-2xl font-bold text-red-500">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-wide text-gray-400">
        {label}
      </p>
    </div>
  );
}