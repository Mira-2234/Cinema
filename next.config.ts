import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com", 
      },
      {
        protocol: "https",
        hostname: "**", 
      },
       {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
       protocol: "https",
       hostname: "i.pravatar.cc",
       },
        {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
       {
        protocol: "https",
        hostname: "randomuser.me",
      },
    ],
  },
};

export default nextConfig;