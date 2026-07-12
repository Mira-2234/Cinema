import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6">

     
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-red-600/20 blur-[140px]" />
      <div className="absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-red-500/20 blur-[140px]" />

      <div className="relative z-10 max-w-2xl text-center">

        <h1 className="text-[120px] font-extrabold leading-none text-red-600 md:text-[180px]">
          404
        </h1>

        <h2 className="mt-2 text-4xl font-bold text-white">
          Scene Not Found
        </h2>

        <p className="mx-auto mt-5 max-w-lg text-lg text-gray-400">
          Looks like this movie scene has been removed or the page you're
          looking for doesn't exist anymore.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">

          <Link
            href="/"
            className="flex items-center gap-2 rounded-full bg-red-600 px-7 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            <Home size={20} />
            Back Home
          </Link>

          <Link
            href="/movies"
            className="flex items-center gap-2 rounded-full border border-gray-700 px-7 py-3 font-semibold text-white transition hover:border-red-600 hover:text-red-500"
          >
            <Search size={20} />
            Browse Movies
          </Link>

        </div>

      </div>
    </main>
  );
}