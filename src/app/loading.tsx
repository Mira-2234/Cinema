"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0B0B0F] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute h-96 w-96 rounded-full bg-red-600/20 blur-[140px]" />

      <div className="relative flex flex-col items-center gap-8">

        {/* Logo */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
          }}
          className="text-6xl font-black tracking-widest text-red-600"
        >
          REELBOX
        </motion.h1>

        {/* Loader */}
        <div className="flex gap-3">
          {[0, 1, 2].map((item) => (
            <motion.span
              key={item}
              className="h-5 w-5 rounded-full bg-red-600"
              animate={{
                y: [0, -18, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                repeat: Infinity,
                duration: 0.7,
                delay: item * 0.15,
              }}
            />
          ))}
        </div>

        {/* Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          className="text-lg tracking-widest text-gray-400"
        >
          Loading your entertainment...
        </motion.p>

      </div>
    </main>
  );
}