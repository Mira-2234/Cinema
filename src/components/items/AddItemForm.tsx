"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

interface FormData {
  title: string;
  shortDescription: string;
  description: string;
  genre: string;
  language: string;
  duration: string;
  releaseYear: string;
  rating: string;
  poster: string;
  banner: string;
}

interface FormErrors {
  [key: string]: string;
}

const initialData: FormData = {
  title: "",
  shortDescription: "",
  description: "",
  genre: "",
  language: "",
  duration: "",
  releaseYear: "",
  rating: "",
  poster: "",
  banner: "",
};

export default function AddItemForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  function handleChange(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function validate(): boolean {
    const next: FormErrors = {};
    const currentYear = new Date().getFullYear();

    if (!formData.title.trim()) next.title = "Title is required";

    if (!formData.shortDescription.trim()) {
      next.shortDescription = "Short description is required";
    } else if (formData.shortDescription.length > 120) {
      next.shortDescription = "Keep it under 120 characters";
    }

    if (!formData.description.trim()) {
      next.description = "Full description is required";
    } else if (formData.description.length < 20) {
      next.description = "Please write at least 20 characters";
    }

    if (!formData.genre.trim()) next.genre = "Genre is required";
    if (!formData.language.trim()) next.language = "Language is required";
    if (!formData.duration.trim()) next.duration = "Duration is required (e.g. 2h 15m)";

    if (!formData.releaseYear) {
      next.releaseYear = "Release year is required";
    } else {
      const year = Number(formData.releaseYear);
      if (isNaN(year) || year < 1900 || year > currentYear + 2) {
        next.releaseYear = `Enter a year between 1900 and ${currentYear + 2}`;
      }
    }

    if (!formData.rating) {
      next.rating = "Rating is required";
    } else {
      const rating = Number(formData.rating);
      if (isNaN(rating) || rating < 0 || rating > 10) {
        next.rating = "Rating must be between 0 and 10";
      }
    }

    if (!formData.poster.trim()) {
      next.poster = "Poster image URL is required";
    } else if (!/^https?:\/\/.+/.test(formData.poster)) {
      next.poster = "Enter a valid URL starting with http:// or https://";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError("");

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/movies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title: formData.title.trim(),
          shortDescription: formData.shortDescription.trim(),
          description: formData.description.trim(),
          genre: formData.genre.trim(),
          language: formData.language.trim(),
          duration: formData.duration.trim(),
          releaseYear: Number(formData.releaseYear),
          rating: Number(formData.rating),
          poster: formData.poster.trim(),
          banner: formData.banner.trim() || formData.poster.trim(),
          featured: false,
          trending: false,
        }),
      });

      if (res.status === 401) {
        router.push("/login?redirect=/items/add");
        return;
      }

      if (!res.ok) {
        const data = await res.json();
        setFormError(data.message || "Failed to add movie. Please try again.");
        return;
      }

      router.push("/items/manage");
      router.refresh();
    } catch {
      setFormError("Could not reach the server. Check your connection.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass = (field: string) =>
    `w-full rounded-lg bg-neutral-800 border px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-red-600 ${
      errors[field] ? "border-red-600" : "border-neutral-700"
    }`;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5 rounded-2xl border border-white/10 bg-neutral-900 p-8"
    >
      {formError && (
        <div className="rounded-lg border border-red-800 bg-red-950 px-4 py-3 text-sm text-red-300">
          {formError}
        </div>
      )}

      <div>
        <label className="mb-1 block text-sm text-neutral-300">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className={inputClass("title")}
          placeholder="e.g. Interstellar"
        />
        {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm text-neutral-300">
          Short description
          <span className="ml-1 text-neutral-500">(max 120 characters)</span>
        </label>
        <input
          type="text"
          value={formData.shortDescription}
          onChange={(e) => handleChange("shortDescription", e.target.value)}
          className={inputClass("shortDescription")}
          placeholder="A one-line hook for the card view"
          maxLength={120}
        />
        {errors.shortDescription && (
          <p className="mt-1 text-xs text-red-400">{errors.shortDescription}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm text-neutral-300">Full description</label>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={4}
          className={inputClass("description")}
          placeholder="Full synopsis of the movie"
        />
        {errors.description && (
          <p className="mt-1 text-xs text-red-400">{errors.description}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm text-neutral-300">Genre</label>
          <input
            type="text"
            value={formData.genre}
            onChange={(e) => handleChange("genre", e.target.value)}
            className={inputClass("genre")}
            placeholder="Sci-Fi"
          />
          {errors.genre && <p className="mt-1 text-xs text-red-400">{errors.genre}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm text-neutral-300">Language</label>
          <input
            type="text"
            value={formData.language}
            onChange={(e) => handleChange("language", e.target.value)}
            className={inputClass("language")}
            placeholder="English"
          />
          {errors.language && (
            <p className="mt-1 text-xs text-red-400">{errors.language}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm text-neutral-300">Duration</label>
          <input
            type="text"
            value={formData.duration}
            onChange={(e) => handleChange("duration", e.target.value)}
            className={inputClass("duration")}
            placeholder="2h 49m"
          />
          {errors.duration && (
            <p className="mt-1 text-xs text-red-400">{errors.duration}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm text-neutral-300">Release year</label>
          <input
            type="number"
            value={formData.releaseYear}
            onChange={(e) => handleChange("releaseYear", e.target.value)}
            className={inputClass("releaseYear")}
            placeholder="2014"
          />
          {errors.releaseYear && (
            <p className="mt-1 text-xs text-red-400">{errors.releaseYear}</p>
          )}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm text-neutral-300">Rating (0–10)</label>
        <input
          type="number"
          step="0.1"
          min="0"
          max="10"
          value={formData.rating}
          onChange={(e) => handleChange("rating", e.target.value)}
          className={inputClass("rating")}
          placeholder="8.6"
        />
        {errors.rating && <p className="mt-1 text-xs text-red-400">{errors.rating}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm text-neutral-300">Poster image URL</label>
        <input
          type="text"
          value={formData.poster}
          onChange={(e) => handleChange("poster", e.target.value)}
          className={inputClass("poster")}
          placeholder="https://..."
        />
        {errors.poster && <p className="mt-1 text-xs text-red-400">{errors.poster}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm text-neutral-300">
          Banner image URL
          <span className="ml-1 text-neutral-500">(optional — uses poster if empty)</span>
        </label>
        <input
          type="text"
          value={formData.banner}
          onChange={(e) => handleChange("banner", e.target.value)}
          className={inputClass("banner")}
          placeholder="https://..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-red-600 py-3 font-semibold text-white transition hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Adding..." : "Add Movie"}
      </button>
    </form>
  );
}