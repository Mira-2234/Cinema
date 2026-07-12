export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0B0B0B] pt-28">
      <div className="mx-auto max-w-6xl px-5">

        <div className="text-center">
          <p className="uppercase tracking-[6px] text-red-500">
            About ReelBox
          </p>

          <h1
            className="mt-4 text-6xl text-white"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            Unlimited Entertainment
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">
            ReelBox is a modern movie streaming platform where users can
            discover blockbuster movies, trending collections, detailed movie
            information, trailers, ratings, and much more in one place.
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2">

          <div className="rounded-3xl border border-white/10 bg-[#121212] p-8">
            <h2 className="text-3xl text-white">
              🎯 Our Mission
            </h2>

            <p className="mt-5 leading-8 text-gray-400">
              Our mission is to create an immersive movie experience where
              users can easily discover, explore and enjoy their favorite
              entertainment.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#121212] p-8">
            <h2 className="text-3xl text-white">
              🚀 Why ReelBox?
            </h2>

            <ul className="mt-5 space-y-3 text-gray-400">
              <li>✔ Huge Movie Collection</li>
              <li>✔ Trending Movies</li>
              <li>✔ Responsive Design</li>
              <li>✔ Modern UI/UX</li>
              <li>✔ Fast Performance</li>
              <li>✔ Movie Details & Ratings</li>
            </ul>
          </div>

        </div>

        <div className="mt-20 rounded-3xl border border-red-500/20 bg-red-600/10 p-10 text-center">
          <h2
            className="text-5xl text-white"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            Watch. Discover. Enjoy.
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-gray-300">
            ReelBox brings together movies, trailers, ratings and collections
            into one modern platform designed for every movie lover.
          </p>
        </div>

      </div>
    </main>
  );
}