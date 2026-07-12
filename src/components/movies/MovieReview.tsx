"use client";

const reviews = [
  {
    id: 1,
    name: "John Carter",
    rating: 5,
    comment:
      "One of the best movies I've ever watched. Amazing visuals and storyline.",
  },
  {
    id: 2,
    name: "Emma Watson",
    rating: 4,
    comment:
      "Fantastic acting and great cinematography. Highly recommended.",
  },
  {
    id: 3,
    name: "David Miller",
    rating: 5,
    comment:
      "Absolutely worth watching. The soundtrack was incredible.",
  },
];

export default function MovieReview() {
  return (
    <section className="bg-[#0B0B0B] py-20">
      <div className="mx-auto max-w-7xl px-5">

        <div className="mb-12">
          <p className="uppercase tracking-[5px] text-red-500">
            Reviews
          </p>

          <h2
            className="mt-3 text-5xl text-white"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            User Reviews
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl border border-white/10 bg-[#121212] p-6"
            >
              <h3 className="text-xl font-semibold text-white">
                {review.name}
              </h3>

              <p className="mt-2 text-yellow-400">
                {"⭐".repeat(review.rating)}
              </p>

              <p className="mt-5 leading-7 text-gray-400">
                {review.comment}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}