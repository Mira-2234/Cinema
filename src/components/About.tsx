import Image from "next/image";

export default function AboutPage() {
  return (
     <div className="bg-black text-white min-h-screen">
      <div className="mx-auto max-w-5xl px-5 py-16 grid md:grid-cols-2 gap-10 items-start">
        <div className="relative w-full h-64 md:h-full md:min-h-[420px] rounded-lg overflow-hidden border border-white/10">
          <Image
            src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=900&q=75&auto=format&fit=crop"
            alt="Empty red cinema seats"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <p className="text-xs uppercase tracking-wide text-red-500 mb-3">
          About
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold mb-6">
          Ratings from people who actually finish the movie
        </h1>
        <p className="text-white/70 leading-relaxed mb-4">
          ReelBox started as a shared spreadsheet between three friends who
          were tired of algorithm-driven recommendations that never matched
          their taste. It's grown into a place where real viewers write real
          reviews, rate what they watch, and build lists worth trusting.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Every film on ReelBox is added by a member of the community, not
          scraped from a licensing feed. Ratings are earned one honest review
          at a time, and there's no paid placement — what rises to the top
          is what people genuinely rate highly.
        </p>
        <p className="text-white/70 leading-relaxed">
          Whether you're hunting for your next favorite or just want to
          remember what you thought of a film years later, ReelBox is built
          to be a personal, dependable record of what you've watched.
        </p>

        {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
          <div className="border border-white/10 rounded-lg p-5">
            <p className="text-2xl font-semibold text-red-500">1,200+</p>
            <p className="text-sm text-white/60 mt-1">films catalogued</p>
          </div>
          <div className="border border-white/10 rounded-lg p-5">
            <p className="text-2xl font-semibold text-red-500">8,400+</p>
            <p className="text-sm text-white/60 mt-1">reviews written</p>
          </div>
          <div className="border border-white/10 rounded-lg p-5">
            <p className="text-2xl font-semibold text-red-500">2021</p>
            <p className="text-sm text-white/60 mt-1">founded</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}