import Image from "next/image";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Movie Enthusiast",
    image: "https://i.pravatar.cc/150?img=32",
    review:
      "ReelBox completely changed my movie nights. The interface is clean, fast, and I always discover amazing films.",
  },
  {
    id: 2,
    name: "Michael Brown",
    role: "Film Critic",
    image: "https://i.pravatar.cc/150?img=14",
    review:
      "The recommendation system is excellent. I found many hidden gems that I wouldn't have watched otherwise.",
  },
  {
    id: 3,
    name: "Emma Wilson",
    role: "Netflix User",
    image: "https://i.pravatar.cc/150?img=45",
    review:
      "Smooth streaming, beautiful UI, and a huge movie collection. ReelBox is now my favorite entertainment platform.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#0B0B0B] py-24">
      <div className="mx-auto max-w-7xl px-5">

        <div className="mb-16 text-center">
          <p className="font-semibold uppercase tracking-[5px] text-red-500">
            Testimonials
          </p>

          <h2
            className="mt-4 text-5xl text-white"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            WHAT OUR USERS SAY
          </h2>

          <p className="mt-4 text-gray-400">
            Thousands of movie lovers trust ReelBox every day.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {testimonials.map((user) => (
            <div
              key={user.id}
              className="group rounded-3xl border border-white/10 bg-[#141414] p-8 transition-all duration-500 hover:-translate-y-3 hover:border-red-500 hover:shadow-[0_0_35px_rgba(239,68,68,.25)]"
            >
              {/* Rating */}
              <div className="mb-6 flex gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>

              {/* Review */}
              <p className="leading-8 text-gray-300">
                "{user.review}"
              </p>

              {/* User */}
              <div className="mt-8 flex items-center gap-4">
                <Image
                  src={user.image}
                  alt={user.name}
                  width={60}
                  height={60}
                  className="rounded-full border-2 border-red-500"
                />

                <div>
                  <h3 className="font-semibold text-white">
                    {user.name}
                  </h3>

                  <p className="text-sm text-gray-400">
                    {user.role}
                  </p>
                </div>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}