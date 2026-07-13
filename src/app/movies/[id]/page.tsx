import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyToken, AUTH_COOKIE } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

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

async function getMovie(id: string): Promise<Movie | null> {
  try {
    const res = await fetch(`${API_URL}/movies/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function MovieDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;


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
    <main className="min-h-screen bg-[#0B0B0B] pb-20">
   
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