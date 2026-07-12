export default function FeaturedCollections() {
  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-7xl px-5">
        {/* Heading */}
        <div className="mb-14 text-center">
          <p className="text-sm uppercase tracking-[6px] text-red-500">
            Featured Collections
          </p>

          <h2 className="mt-3 text-5xl font-bold text-white">
            Discover Popular Movies
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Explore hand-picked blockbuster movies and trending collections.
          </p>
        </div>

        <div className="space-y-8">

          {/* ROW 1 */}
          <div className="grid grid-cols-3 gap-6">

            {/* BIG */}
            <div className="relative col-span-2 h-[620px] overflow-hidden rounded-3xl group cursor-pointer">

              <img
                src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200"
                className="h-full w-full object-cover duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              <div className="absolute bottom-8 left-8">
                <span className="rounded-full bg-red-600 px-4 py-1 text-sm text-white">
                  Action
                </span>

                <h2 className="mt-4 text-5xl font-bold text-white">
                  Dune Part Two
                </h2>

                <p className="mt-3 text-gray-300">
                  ⭐ 8.9 • 2024
                </p>
              </div>

            </div>

            {/* SMALL */}
            <div className="space-y-6">

              {[1,2].map((item)=>(
                <div
                  key={item}
                  className="relative h-[297px] overflow-hidden rounded-3xl group cursor-pointer"
                >

                  <img
                    src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800"
                    className="h-full w-full object-cover duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"/>

                  <div className="absolute bottom-6 left-6">
                    <h3 className="text-2xl font-bold text-white">
                      Interstellar
                    </h3>

                    <p className="text-gray-300">
                      ⭐ 8.8
                    </p>
                  </div>

                </div>
              ))}

            </div>

          </div>



          {/* ROW 2 */}

          <div className="grid grid-cols-3 gap-6">

            <div className="space-y-6">

              {[3,4].map((item)=>(
                <div
                  key={item}
                  className="relative h-[297px] overflow-hidden rounded-3xl group cursor-pointer"
                >

                  <img
                    src="https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800"
                    className="h-full w-full object-cover duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"/>

                  <div className="absolute bottom-6 left-6">
                    <h3 className="text-2xl font-bold text-white">
                      Oppenheimer
                    </h3>

                    <p className="text-gray-300">
                      ⭐ 8.7
                    </p>
                  </div>

                </div>
              ))}

            </div>



            <div className="relative col-span-2 h-[620px] overflow-hidden rounded-3xl group cursor-pointer">

              <img
                src="https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?w=1200"
                className="h-full w-full object-cover duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"/>

              <div className="absolute bottom-8 left-8">
                <span className="rounded-full bg-red-600 px-4 py-1 text-sm text-white">
                  Sci-Fi
                </span>

                <h2 className="mt-4 text-5xl font-bold text-white">
                  Avatar 2
                </h2>

                <p className="mt-3 text-gray-300">
                  ⭐ 8.5 • 2023
                </p>
              </div>

            </div>

          </div>



          {/* ROW 3 */}

          <div className="grid grid-cols-3 gap-6">

            <div className="relative col-span-2 h-[620px] overflow-hidden rounded-3xl group cursor-pointer">

              <img
                src="https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=1200"
                className="h-full w-full object-cover duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"/>

              <div className="absolute bottom-8 left-8">
                <span className="rounded-full bg-red-600 px-4 py-1 text-sm text-white">
                  Thriller
                </span>

                <h2 className="mt-4 text-5xl font-bold text-white">
                  John Wick 4
                </h2>

                <p className="mt-3 text-gray-300">
                  ⭐ 8.4 • 2023
                </p>
              </div>

            </div>



            <div className="space-y-6">

              {[5,6].map((item)=>(
                <div
                  key={item}
                  className="relative h-[297px] overflow-hidden rounded-3xl group cursor-pointer"
                >

                  <img
                    src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800"
                    className="h-full w-full object-cover duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"/>

                  <div className="absolute bottom-6 left-6">
                    <h3 className="text-2xl font-bold text-white">
                      Joker
                    </h3>

                    <p className="text-gray-300">
                      ⭐ 8.6
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