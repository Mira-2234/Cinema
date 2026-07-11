import Image from "next/image";

const genres = [
  {
    id: 1,
    name: "Action",
    image: "https://picsum.photos/seed/action/600/800",
  },
  {
    id: 2,
    name: "Adventure",
    image: "https://picsum.photos/seed/adventure/600/800",
  },
  {
    id: 3,
    name: "Comedy",
    image: "https://picsum.photos/seed/comedy/600/800",
  },
  {
    id: 4,
    name: "Drama",
    image: "https://picsum.photos/seed/drama/600/800",
  },
  {
    id: 5,
    name: "Horror",
    image: "https://picsum.photos/seed/horror/600/800",
  },
  {
    id: 6,
    name: "Sci-Fi",
    image: "https://picsum.photos/seed/scifi/600/800",
  },
  {
    id: 7,
    name: "Romance",
    image: "https://picsum.photos/seed/romance/600/800",
  },
  {
    id: 8,
    name: "Thriller",
    image: "https://picsum.photos/seed/thriller/600/800",
  },
];

export default function BrowseGenres() {
  return (
    <section className="bg-[#0F0F0F] py-20">
      <div className="mx-auto max-w-7xl px-5">
        {/* Heading */}
        <div className="mb-12 text-center">
          <p className="text-red-500 font-semibold uppercase tracking-[4px]">
            Explore
          </p>

          <h2
            className="mt-3 text-4xl md:text-5xl text-white"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            Browse By Genres
          </h2>

          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Find your favorite movies from every genre. Explore action,
            thriller, comedy, romance and much more.
          </p>
        </div>

        {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
  {genres.map((genre) => (
    <div
      key={genre.id}
      className="group relative h-80 cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 transition-all duration-500 hover:-translate-y-3 hover:border-red-500 hover:shadow-2xl hover:shadow-red-500/30"
    >
      {/* Image */}
      <Image
        src={genre.image}
        alt={genre.name}
        fill
        className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition duration-500 group-hover:from-black/90" />

      {/* Content */}
      <div className="absolute bottom-[-70] w-full p-6 transition-all duration-500 group-hover:bottom-2">
        <h3 className="mt-4 text-3xl font-bold text-white transition-all duration-500">
          {genre.name}
        </h3>

        <p className="mt-2 translate-y-4 text-sm text-gray-300 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          Explore the best {genre.name.toLowerCase()} movies from around the world.
        </p>

        <button className="mt-5 rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white opacity-0 transition-all duration-500 group-hover:opacity-100 hover:bg-red-700">
          Explore →
        </button>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-transparent transition-all duration-500 group-hover:ring-red-500/40" />
    </div>
  ))}
</div>
      </div>
    </section>
  );
}