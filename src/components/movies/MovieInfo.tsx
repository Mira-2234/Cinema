"use client";

import { Movie } from "./MovieCard";

interface Props {
  movie: Movie;
}

export default function MovieInfo({ movie }: Props) {
  return (
    <section className="bg-[#0B0B0B] py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-3">

        {/* Left */}

        <div className="lg:col-span-2">
          <h2
            className="text-4xl text-white"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            Storyline
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            {movie.description}
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">

            <div className="rounded-2xl border border-white/10 bg-[#121212] p-6">
              <p className="text-gray-500">Genre</p>

              <h3 className="mt-2 text-xl text-white">
                {movie.genre}
              </h3>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#121212] p-6">
              <p className="text-gray-500">Language</p>

              <h3 className="mt-2 text-xl text-white">
                {movie.language}
              </h3>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#121212] p-6">
              <p className="text-gray-500">Runtime</p>

              <h3 className="mt-2 text-xl text-white">
                {movie.duration}
              </h3>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#121212] p-6">
              <p className="text-gray-500">Release</p>

              <h3 className="mt-2 text-xl text-white">
                {movie.releaseYear}
              </h3>
            </div>

          </div>
        </div>

        {/* Right */}

        <div className="rounded-3xl border border-white/10 bg-[#121212] p-8">
          <h2
            className="text-3xl text-white"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            Movie Details
          </h2>

          <div className="mt-8 space-y-6">

            <div>
              <p className="text-gray-500">Rating</p>
              <h3 className="text-2xl text-yellow-400">
                ⭐ {movie.rating}/10
              </h3>
            </div>

            <div>
              <p className="text-gray-500">Language</p>
              <h3 className="text-white">{movie.language}</h3>
            </div>

            <div>
              <p className="text-gray-500">Genre</p>
              <h3 className="text-white">{movie.genre}</h3>
            </div>

            <div>
              <p className="text-gray-500">Release Year</p>
              <h3 className="text-white">{movie.releaseYear}</h3>
            </div>

            <div>
              <p className="text-gray-500">Duration</p>
              <h3 className="text-white">{movie.duration}</h3>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}