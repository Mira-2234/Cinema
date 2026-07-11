import Image from "next/image";

const collections = [
  {
    id: 1,
    title: "Marvel Universe",
    subtitle: "35+ Movies",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "Oscar Winners",
    subtitle: "Award Winning Movies",
    image:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "Anime Collection",
    subtitle: "Top Rated Anime",
    image:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function FeaturedCollections() {
  return (
    <section className="bg-[#0B0B0B] py-24">
      <div className="mx-auto max-w-7xl px-5">

        <div className="mb-16 text-center">
          <p className="uppercase tracking-[5px] text-red-500 font-semibold">
            Collections
          </p>

          <h2
            className="mt-4 text-5xl text-white"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            FEATURED COLLECTIONS
          </h2>

          <p className="mt-5 text-gray-400">
            Explore curated collections of the world's best entertainment.
          </p>
        </div>

        <div className="space-y-8">

          {collections.map((item) => (
            <div
              key={item.id}
              className="group relative h-[280px] overflow-hidden rounded-3xl cursor-pointer"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />

              <div className="absolute left-12 top-1/2 -translate-y-1/2">

                <p className="text-red-500 uppercase tracking-[4px]">
                  Collection
                </p>

                <h2
                  className="mt-3 text-5xl text-white"
                  style={{ fontFamily: "var(--font-bebas)" }}
                >
                  {item.title}
                </h2>

                <p className="mt-3 text-gray-300">
                  {item.subtitle}
                </p>

                <button className="mt-8 rounded-full bg-red-600 px-7 py-3 font-semibold text-white transition hover:bg-red-700">
                  Explore Collection →
                </button>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}