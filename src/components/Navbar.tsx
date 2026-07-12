"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Film } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Movies", href: "/movies" },
  { name: "Explore", href: "/explore" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          {/* <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600 shadow-lg shadow-red-600/30">
            <Film className="h-6 w-6 text-white" />
          </div> */}

          <h1
            className="text-4xl tracking-[0.18em] text-white"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            ReelBox
          </h1>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative text-sm font-medium text-gray-300 transition-all duration-300 hover:text-red-500 after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-red-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right Buttons */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/login"
            className="rounded-full border border-white/20 px-5 py-2 text-sm font-medium text-white transition hover:border-red-500 hover:text-red-500"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-full bg-red-600 px-6 py-2 text-sm font-semibold text-white transition duration-300 hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/40"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white lg:hidden"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-white/10 bg-black/95 backdrop-blur-xl lg:hidden">
          <div className="space-y-2 px-6 py-6">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-4 py-3 text-gray-300 transition hover:bg-white/5 hover:text-red-500"
              >
                {item.name}
              </Link>
            ))}

            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/login"
                className="rounded-full border border-white/20 py-3 text-center text-white transition hover:border-red-500 hover:text-red-500"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-full bg-red-600 py-3 text-center font-semibold text-white transition hover:bg-red-700"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}