import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";

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

async function getMovie(id: string, token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/${id}`, {
    headers: { Cookie: `cinema_auth_token=${token}` },
    cache: "no-store",
  });

  return res;
}

export default async function MovieDetailsPage({ params }: Props) {
  const { id } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get("cinema_auth_token")?.value;

  if (!token) {
    redirect(`/login?redirect=/movies/${id}`);
  }

  const res = await getMovie(id, token);

  if (res.status === 401) {
    redirect(`/login?redirect=/movies/${id}`);
  }

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("Failed to load movie");
  }

  const movie: Movie = await res.json();

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