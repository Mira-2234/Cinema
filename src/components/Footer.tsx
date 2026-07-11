import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        {/* Logo */}
        <div>
          <h2
            className="text-4xl text-white"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            ReelBox
          </h2>

          <p className="mt-4 text-gray-400">
            Your ultimate destination for blockbuster movies, trending series,
            and premium entertainment.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="mb-5 text-xl font-semibold text-white">
            Explore
          </h3>

          <ul className="space-y-3 text-gray-400">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/movies">Movies</Link></li>
            <li><Link href="/series">Series</Link></li>
            <li><Link href="/explore">Explore</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="mb-5 text-xl font-semibold text-white">
            Company
          </h3>

          <ul className="space-y-3 text-gray-400">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/privacy">Privacy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-5 text-xl font-semibold text-white">
            Contact
          </h3>

          <p className="text-gray-400">
            📧 support@reelbox.com
          </p>

          <p className="mt-2 text-gray-400">
            📍 Tokoyo, Japan
          </p>

          
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-gray-500">
        © 2026 ReelBox. All Rights Reserved.
      </div>
    </footer>
  );
}