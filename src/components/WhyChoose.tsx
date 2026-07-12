import {
  PlayCircle,
  MonitorPlay,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const features = [
  {
    id: 1,
    icon: <PlayCircle size={40} />,
    title: "Unlimited Streaming",
    description:
      "Watch thousands of blockbuster movies and TV shows anytime without limits.",
  },
  {
    id: 2,
    icon: <MonitorPlay size={40} />,
    title: "4K Ultra HD",
    description:
      "Experience crystal-clear picture quality with immersive 4K streaming.",
  },
  {
    id: 3,
    icon: <ShieldCheck size={40} />,
    title: "Safe & Secure",
    description:
      "Your account and payment information are protected with industry-level security.",
  },
  {
    id: 4,
    icon: <Sparkles size={40} />,
    title: "Personalized Picks",
    description:
      "Discover movies and TV series recommended based on your interests.",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-[#0B0B0B] py-24">
      <div className="mx-auto max-w-7xl px-5">
 
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[6px] text-red-500">
            Why ReelBox
          </p>

          <h2
            className="mt-4 text-5xl text-white"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            WHY CHOOSE REELBOX
          </h2>

          <p className="mt-5 text-lg text-gray-400">
            Experience premium entertainment with powerful features designed
            for movie lovers.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group rounded-3xl border border-white/10 bg-[#141414] p-8 transition-all duration-500 hover:-translate-y-3 hover:border-red-500 hover:shadow-[0_0_40px_rgba(239,68,68,.25)]"
            >
              <div className="mb-6 inline-flex rounded-2xl bg-red-600/10 p-4 text-red-500 transition group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white">
                {feature.icon}
              </div>

              <h3 className="mb-4 text-2xl font-bold text-white">
                {feature.title}
              </h3>

              <p className="leading-7 text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}