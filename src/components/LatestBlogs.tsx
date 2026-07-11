import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

type Blog = {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
};

const blogs: Blog[] = [
  {
    id: 1,
    title: "Top 10 Must-Watch Movies of 2026",
    description:
      "Discover the biggest blockbuster movies that every movie lover should watch this year.",
    date: "July 12, 2026",
    image: "https://picsum.photos/seed/movie1/600/400",
  },
  {
    id: 2,
    title: "Upcoming Marvel Movies & Release Dates",
    description:
      "A complete guide to all upcoming Marvel movies and TV series with official release dates.",
    date: "July 08, 2026",
    image: "https://picsum.photos/seed/movie2/600/400",
  },
  {
    id: 3,
    title: "Best Sci-Fi Movies You Can't Miss",
    description:
      "Explore the highest-rated science fiction movies with unforgettable stories and visuals.",
    date: "July 02, 2026",
    image: "https://picsum.photos/seed/movie3/600/400",
  },
];
export default function LatestBlogs() {
  return (
    <section className="bg-[#0B0B0B] py-24">
      <div className="mx-auto max-w-7xl px-5">

        {/* Heading */}
        <div className="mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[6px] text-red-500">
            Latest News
          </p>

          <h2
            className="mt-4 text-5xl text-white"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            MOVIE BLOGS & NEWS
          </h2>

          <p className="mt-5 text-gray-400">
            Stay updated with the latest movie news, reviews, and industry
            updates.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog: Blog) => (
            <article
              key={blog.id}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-[#141414] transition-all duration-500 hover:-translate-y-2 hover:border-red-500"
            >
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
              </div>

              <div className="p-6">

                <div className="mb-4 flex items-center gap-2 text-sm text-red-400">
                  <Calendar size={16} />
                  {blog.date}
                </div>

                <h3 className="text-2xl font-bold text-white">
                  {blog.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-400">
                  {blog.description}
                </p>

                <Link
                  href="/blogs"
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-red-500 transition hover:text-red-400"
                >
                  Read More
                  <ArrowRight size={18} />
                </Link>

              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}