"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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

export default function PopularMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/movies`
        );

        const data = await res.json();

        setMovies(data.slice(0, 9));
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
        <h2 className="text-center text-white text-2xl">
          Loading Popular Movies...
        </h2>
      </section>
    );
  }

  // Layout Data

  const firstBig = movies[0];

  const firstSmall = movies.slice(1, 3);

  const secondSmall = movies.slice(3, 5);

  const secondBig = movies[5];

  const thirdBig = movies[6];

  const thirdSmall = movies.slice(7, 9);

  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-7xl px-5">

        {/* Heading */}

        <div className="mb-14 text-center">

          <p className="text-sm uppercase tracking-[6px] text-red-500">
            Popular Movies
          </p>

          <h2 className="mt-3 text-5xl font-bold text-white">
            Discover Popular Movies
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Explore hand-picked blockbuster movies and trending collections.
          </p>

        </div>

        <div className="space-y-8">

  {/* ================= ROW 1 ================= */}

  <div className="grid grid-cols-3 gap-6">

    {/* Big Card */}

    {firstBig && (
      <div className="group relative col-span-2 h-[620px] cursor-pointer overflow-hidden rounded-3xl">

        <img
          src={firstBig.banner}
          alt={firstBig.title}
          fill
          className="object-cover duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        <div className="absolute bottom-8 left-8">

          <span className="rounded-full bg-red-600 px-4 py-1 text-sm text-white">
            {firstBig.genre}
          </span>

          <h2 className="mt-4 text-5xl font-bold text-white">
            {firstBig.title}
          </h2>

          <p className="mt-3 text-gray-300">
            ⭐ {firstBig.rating} • {firstBig.releaseYear}
          </p>

        </div>

      </div>
    )}

    {/* Small Cards */}

    <div className="space-y-6">

      {firstSmall.map((movie) => (

        <div
          key={movie._id}
          className="group relative h-[297px] cursor-pointer overflow-hidden rounded-3xl"
        >

          <Image
            src={movie.poster}
            alt={movie.title}
            fill
            className="object-cover duration-500 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

          <div className="absolute bottom-6 left-6">

            <h3 className="text-2xl font-bold text-white">
              {movie.title}
            </h3>

            <p className="text-gray-300">
              ⭐ {movie.rating}
            </p>

          </div>

        </div>

      ))}

    </div>

  </div>

  {/* ================= ROW 2 ================= */}

  <div className="grid grid-cols-3 gap-6">

    {/* Small Cards */}

    <div className="space-y-6">

      {secondSmall.map((movie) => (

        <div
          key={movie._id}
          className="group relative h-[297px] cursor-pointer overflow-hidden rounded-3xl"
        >

          <Image
            src={movie.poster}
            alt={movie.title}
            fill
            className="object-cover duration-500 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

          <div className="absolute bottom-6 left-6">

            <h3 className="text-2xl font-bold text-white">
              {movie.title}
            </h3>

            <p className="text-gray-300">
              ⭐ {movie.rating}
            </p>

          </div>

        </div>

      ))}

    </div>

    {/* Big Card */}

    {secondBig && (
      <div className="group relative col-span-2 h-[620px] cursor-pointer overflow-hidden rounded-3xl">

        <Image
          src={secondBig.banner}
          alt={secondBig.title}
          fill
          className="object-cover duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        <div className="absolute bottom-8 left-8">

          <span className="rounded-full bg-red-600 px-4 py-1 text-sm text-white">
            {secondBig.genre}
          </span>

          <h2 className="mt-4 text-5xl font-bold text-white">
            {secondBig.title}
          </h2>

          <p className="mt-3 text-gray-300">
            ⭐ {secondBig.rating} • {secondBig.releaseYear}
          </p>

        </div>

      </div>
    )}

  </div>

  {/* ================= ROW 3 ================= */}

  <div className="grid grid-cols-3 gap-6">

    {/* Big Card */}

    {thirdBig && (
      <div className="group relative col-span-2 h-[620px] cursor-pointer overflow-hidden rounded-3xl">

        <Image
          src={thirdBig.banner}
          alt={thirdBig.title}
          fill
          className="object-cover duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        <div className="absolute bottom-8 left-8">

          <span className="rounded-full bg-red-600 px-4 py-1 text-sm text-white">
            {thirdBig.genre}
          </span>

          <h2 className="mt-4 text-5xl font-bold text-white">
            {thirdBig.title}
          </h2>

          <p className="mt-3 text-gray-300">
            ⭐ {thirdBig.rating} • {thirdBig.releaseYear}
          </p>

        </div>

      </div>
    )}

    {/* Small Cards */}

    <div className="space-y-6">

      {thirdSmall.map((movie) => (

        <div
          key={movie._id}
          className="group relative h-[297px] cursor-pointer overflow-hidden rounded-3xl"
        >

          <Image
            src={movie.poster}
            alt={movie.title}
            fill
            className="object-cover duration-500 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

          <div className="absolute bottom-6 left-6">

            <h3 className="text-2xl font-bold text-white">
              {movie.title}
            </h3>

            <p className="text-gray-300">
              ⭐ {movie.rating}
            </p>

          </div>

        </div>

      ))}

    </div>

  </div>

</div>

      </div>
    </section>
  );
}