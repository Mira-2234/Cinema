import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { verifyToken, AUTH_COOKIE } from "@/lib/auth";

import MovieBanner from "@/components/movies/MovieBanner";
import MovieInfo from "@/components/movies/MovieInfo";
import MovieCast from "@/components/movies/MovieCast";
import MovieTrailer from "@/components/movies/MovieTrailler";
import MovieReview from "@/components/movies/MovieReview";

interface Movie {
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
  params: Promise<{ id: string }>;
}

async function getMovie(id: string): Promise<Movie | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function MovieDetailsPage({ params }: Props) {
  const { id } = await params;

  // Auth check — runs before any data fetching or rendering
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;
  const user = token ? await verifyToken(token) : null;

  if (!user) {
    redirect(`/login?redirect=/movies/${id}`);
  }

  const movie = await getMovie(id);

  if (!movie) {
    notFound();
  }

  return (
    <main className="bg-black">
      <MovieBanner movie={movie} />
      <MovieInfo movie={movie} />
      <MovieCast />
      <MovieTrailer />
      <MovieReview />
    </main>
  );
}