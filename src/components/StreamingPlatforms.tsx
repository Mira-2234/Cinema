"use client";

import Marquee from "react-fast-marquee";
import {
  Tv,
  PlayCircle,
  Clapperboard,
  MonitorPlay,
  Film,
  Popcorn,
} from "lucide-react";

type Platform = {
  id: number;
  name: string;
  color: string;
  icon: React.ReactNode;
};

const platforms: Platform[] = [
  {
    id: 1,
    name: "Netflix",
    color: "#E50914",
    icon: <Tv size={34} />,
  },
  {
    id: 2,
    name: "Disney+",
    color: "#113CCF",
    icon: <PlayCircle size={34} />,
  },
  {
    id: 3,
    name: "Prime Video",
    color: "#00A8E1",
    icon: <MonitorPlay size={34} />,
  },
  {
    id: 4,
    name: "HBO Max",
    color: "#6F2CFF",
    icon: <Film size={34} />,
  },
  {
    id: 5,
    name: "Apple TV+",
    color: "#6B7280",
    icon: <Clapperboard size={34} />,
  },
  {
    id: 6,
    name: "Paramount+",
    color: "#0EA5E9",
    icon: <Popcorn size={34} />,
  },
];

export default function StreamingPlatforms() {
  return (
    <section className="bg-[#0B0B0B] py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5">

        {/* Heading */}

        <div className="mb-16 text-center">

          <p className="uppercase tracking-[6px] text-red-500 font-semibold">
            Streaming Platforms
          </p>

          <h2
            className="mt-4 text-5xl text-white"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            WATCH EVERYWHERE
          </h2>

          <p className="mt-5 text-gray-400">
            Discover the world's most popular streaming services.
          </p>

        </div>

      </div>

      {/* Marquee */}

      <Marquee
        speed={45}
        gradient={false}
        pauseOnHover
      >
        {platforms.map((platform: Platform) => (
          <div
            key={platform.id}
            className="group mx-5 flex w-[260px] cursor-pointer items-center gap-5 rounded-3xl border border-white/10 bg-[#151515] p-6 transition-all duration-500 hover:-translate-y-2 hover:border-red-500"
          >
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl text-white transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
              style={{ backgroundColor: platform.color }}
            >
              {platform.icon}
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">
                {platform.name}
              </h3>

              <p className="mt-1 text-sm text-gray-400">
                Stream Movies Anytime
              </p>
            </div>
          </div>
        ))}
      </Marquee>
    </section>
  );
}