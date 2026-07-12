import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import ManageItemsTable from "@/components/items/ManageItemsTable";
import MyMoviesStats from "@/components/items/MyMoviesStats";

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

async function getMyMovies(token: string): Promise<Movie[]> {
  const res = await fetch(`${API_URL}/movies/mine`, {
    headers: { Cookie: `cinema_auth_token=${token}` },
    cache: "no-store",
  });

  if (!res.ok) return [];

  return res.json();
}

export default async function ManageItemsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("cinema_auth_token")?.value;

  if (!token) {
    redirect("/login?redirect=/items/manage");
  }

  const movies = await getMyMovies(token);

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
              {movies.length} {movies.length === 1 ? "movie" : "movies"} added by you.
            </p>
          </div>

          <Link
            href="/items/add"
            className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500"
          >
            + Add Movie
          </Link>
        </div>

        {movies.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-neutral-900 px-6 py-16 text-center">
            <p className="text-lg text-white">You haven't added any movies yet.</p>
            <p className="mt-2 text-sm text-gray-400">
              Click "Add Movie" above to contribute your first title.
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