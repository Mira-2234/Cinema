export default function ExplorePage() {
  return (
    <main className="min-h-screen bg-[#0B0B0B] pt-28 pb-10">
      <div className="mx-auto max-w-7xl px-5">

        <div className="text-center">
          <p className="uppercase tracking-[6px] text-red-500">
            Explore
          </p>

          <h1
            className="mt-4 text-6xl text-white"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            Explore The World Of Cinema
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
            Discover thousands of blockbuster movies, award-winning classics,
            trending TV shows, and exclusive entertainment from around the world.
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">

          <div className="rounded-3xl border border-white/10 bg-[#121212] p-8">
            <h2 className="text-3xl text-white">🎬 Movies</h2>

            <p className="mt-5 text-gray-400 leading-8">
              Browse thousands of blockbuster movies from every genre including
              Action, Comedy, Horror, Thriller, Adventure and Sci-Fi.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#121212] p-8">
            <h2 className="text-3xl text-white">🔥 Trending</h2>

            <p className="mt-5 text-gray-400 leading-8">
              Stay updated with the most popular movies watched by millions of
              users every day.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#121212] p-8">
            <h2 className="text-3xl text-white">⭐ Collections</h2>

            <p className="mt-5 text-gray-400 leading-8">
              Explore hand-picked collections carefully selected by our editors.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}