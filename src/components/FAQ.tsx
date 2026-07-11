"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FAQ = {
  id: number;
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    id: 1,
    question: "Is ReelBox free to use?",
    answer:
      "Yes. You can browse movies for free, while premium members enjoy exclusive content and ad-free streaming.",
  },
  {
    id: 2,
    question: "Can I watch movies offline?",
    answer:
      "Yes. Premium users can download supported movies and TV shows for offline viewing.",
  },
  {
    id: 3,
    question: "Which devices are supported?",
    answer:
      "ReelBox works on desktops, laptops, smartphones, tablets, and smart TVs.",
  },
  {
    id: 4,
    question: "How do I create an account?",
    answer:
      "Click the Sign Up button, enter your information, verify your email, and start exploring movies instantly.",
  },
  {
    id: 5,
    question: "Can I cancel my subscription anytime?",
    answer:
      "Absolutely. You can upgrade, downgrade, or cancel your subscription whenever you want.",
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleFAQ = (id: number): void => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-[#0B0B0B] py-24">
      <div className="mx-auto max-w-4xl px-5">

        <div className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-[6px] text-red-500">
            FAQ
          </p>

          <h2
            className="mt-4 text-5xl text-white"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            FREQUENTLY ASKED QUESTIONS
          </h2>

          <p className="mt-5 text-gray-400">
            Find answers to the most common questions about ReelBox.
          </p>
        </div>

        <div className="space-y-5">
          {faqs.map((faq: FAQ) => (
            <div
              key={faq.id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-[#151515]"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <span className="text-lg font-semibold text-white">
                  {faq.question}
                </span>

                <ChevronDown
                  className={`transition-transform duration-300 ${
                    openId === faq.id
                      ? "rotate-180 text-red-500"
                      : "text-gray-400"
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ${
                  openId === faq.id
                    ? "grid-rows-[1fr]"
                    : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 leading-8 text-gray-400">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}