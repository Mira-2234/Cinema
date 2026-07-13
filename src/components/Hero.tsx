"use client"

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const heroImages = [
  // "/Hero1.jpg",
  "/Hero2.jpg",
  // "/Hero3.jpg",
  // "/Hero4.jpg"
];
export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative  min-h-screen w-full overflow-hidden pt-25">

      <AnimatePresence mode="wait">
        <motion.div
          key={heroImages[index]}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
          }}
        >
   
     <Image
            src={heroImages[index]}
            alt="Hero Background"
            fill
            priority
            className="object-cover ml-60"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />

      {/* Content */}
      <div className="relative mx-auto flex h-full max-w-7xl items-center px-10 ">
        <div className="max-w-2xl">
          <span className="rounded-full border border-red-500/40 bg-red-600/20 px-4 py-2 text-sm text-red-400">
            #1 Movie Streaming Platform
          </span>

          <h1
            className="mt-6 text-6xl font-bold leading-tight text-white lg:text-8xl"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            Unlimited Movies,
            <br />
            TV Shows &
            <span className="text-red-600"> Entertainment</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-gray-300">
            Discover thousands of blockbuster movies, trending TV series,
            exclusive originals, and timeless classics — all in one place.
          </p>

          <div className="mt-10 flex flex-wrap gap-5">

            <Link href="/movies"
            className="rounded-full bg-red-600 px-8 py-4 font-semibold text-white transition hover:bg-red-700">

            ▶ Watch Now
            </Link>
            

            <button className="rounded-full border border-white/20 px-8 py-4 font-semibold text-white transition hover:border-red-500 hover:text-red-500">
              Browse Movies
            </button>
          </div>

          <div className="mt-14 flex gap-10">
            <div>
              <h2 className="text-3xl font-bold text-white">15K+</h2>
              <p className="text-gray-400">Movies</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white">5K+</h2>
              <p className="text-gray-400">TV Shows</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white">10M+</h2>
              <p className="text-gray-400">Users</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}