"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

// Demo account
const DEMO_EMAIL = "demo@reelbox.com";
const DEMO_PASSWORD = "demo1234";

interface FormErrors {
  email?: string;
  password?: string;
  form?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { refetchUser } = useAuth();

  const redirectTo = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  function validate(): boolean {
    const next: FormErrors = {};

    if (!email.trim()) {
      next.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Enter a valid email address";
    }

    if (!password) {
      next.password = "Password is required";
    } else if (password.length < 6) {
      next.password = "Password must be at least 6 characters";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function submitLogin(loginEmail: string, loginPassword: string) {
    setLoading(true);
    setErrors({});

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({
          form: data.message || "Login failed. Please try again.",
        });
        return;
      }

      // ⭐ Update user in AuthContext
      await refetchUser();

      router.push(redirectTo);
      router.refresh();
    } catch {
      setErrors({
        form: "Could not reach the server. Check your connection.",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!validate()) return;

    await submitLogin(email, password);
  }

  function handleDemoLogin() {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setErrors({});

    submitLogin(DEMO_EMAIL, DEMO_PASSWORD);
  }

  return (
    <main className="mt-20 flex min-h-screen items-center justify-center bg-neutral-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-900 p-8 shadow-xl">
        <h1 className="mb-1 text-2xl font-bold text-white">
          Log in to ReelBox
        </h1>

        <p className="mb-6 text-sm text-neutral-400">
          Find cinema halls, showtimes, and more near you.
        </p>

        {errors.form && (
          <div className="mb-4 rounded-lg border border-red-800 bg-red-950 px-4 py-3 text-sm text-red-300">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm text-neutral-300"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={`w-full rounded-lg border bg-neutral-800 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-red-600 ${
                errors.email ? "border-red-600" : "border-neutral-700"
              }`}
            />

            {errors.email && (
              <p className="mt-1 text-xs text-red-400">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm text-neutral-300"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`w-full rounded-lg border bg-neutral-800 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-red-600 ${
                errors.password ? "border-red-600" : "border-neutral-700"
              }`}
            />

            {errors.password && (
              <p className="mt-1 text-xs text-red-400">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-red-600 py-2.5 font-medium text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-neutral-800" />
          <span className="text-xs text-neutral-500">or</span>
          <div className="h-px flex-1 bg-neutral-800" />
        </div>

        <button
          onClick={handleDemoLogin}
          disabled={loading}
          className="w-full rounded-lg border border-neutral-700 py-2.5 font-medium text-neutral-200 transition hover:border-neutral-500 disabled:opacity-50"
        >
          {loading ? "Please wait..." : "Try Demo Login"}
        </button>

        <p className="mt-6 text-center text-sm text-neutral-400">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-red-400 hover:text-red-300"
          >
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}