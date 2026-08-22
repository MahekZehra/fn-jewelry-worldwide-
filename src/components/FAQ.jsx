import { useState } from "react";
import { FiPlus } from "react-icons/fi";

const faqs = [
  {
    question: "How can I find the right piece for my style?",
    answer:
      "Explore our curated collections by jewellery type, occasion and style to discover pieces that complement your personal look.",
  },
  {
    question: "Will the jewellery look exactly like it does in the pictures?",
    answer:
      "We aim to showcase each piece as accurately as possible through detailed product photography. Slight variations may occur due to lighting and screen settings.",
  },
  {
    question: "How should I care for my jewellery to keep it looking beautiful?",
    answer:
      "Keep your pieces away from water, perfume, lotions and harsh chemicals. Store them in a dry place and gently wipe them after wearing.",
  },
  {
    question: "Are the pieces available in different styles and origins?",
    answer:
      "Yes. Our collection brings together different jewellery aesthetics, including Indian, Pakistani and Turkish-inspired pieces, with the style origin displayed on relevant products.",
  },
  {
    question: "What should I do if the piece I want is currently unavailable?",
    answer:
      "If a favourite piece is unavailable, keep an eye on our new arrivals as we regularly refresh the collection with new designs and curated finds.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((current) =>
      current === index ? null : index
    );
  };

  return (
    <section className="relative overflow-hidden bg-[#FFF9F7] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">

      {/* =================================================
          SOFT BACKGROUND GLOW
      ================================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-16 h-72 w-72 rounded-full bg-[#F8DDE5]/35 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 bottom-10 h-80 w-80 rounded-full bg-[#E8DDF2]/35 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-56 w-56 -translate-x-1/2 rounded-full bg-[#F3E6D8]/25 blur-3xl"
      />

      {/* =================================================
          DECORATIVE SPARKLES
      ================================================= */}

      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[8%] top-20 font-serif text-xl text-[#C9A26B]/60"
      >
        ✦
      </span>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-[10%] top-32 font-serif text-sm text-[#B9788B]/50"
      >
        ✧
      </span>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-24 left-[14%] font-serif text-sm text-[#B9788B]/40"
      >
        ♡
      </span>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-20 right-[16%] font-serif text-lg text-[#C9A26B]/50"
      >
        ✦
      </span>

      {/* =================================================
          MAIN CONTAINER
      ================================================= */}

      <div className="relative mx-auto max-w-5xl">

        {/* =================================================
            SECTION INTRO
        ================================================= */}

        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">

          {/* Small decorative label */}
          <div className="mb-4 flex items-center justify-center gap-3">

            <span className="h-px w-8 bg-[#D8B7A2]/60" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A87585]">
              A little help, darling
            </span>

            <span className="h-px w-8 bg-[#D8B7A2]/60" />

          </div>

          {/* Heading */}
          <h2 className="font-serif text-4xl leading-tight tracking-tight text-[#3B2930] sm:text-5xl lg:text-6xl">

            Everything you may want
            <span className="block italic text-[#B9788B]">
              to know. ✦
            </span>

          </h2>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#76636A] sm:text-base">
            A few little details to make your FN Jewelry experience
            effortless, beautiful and worry-free.
          </p>

        </div>

        {/* =================================================
            FAQ LIST
        ================================================= */}

        <div className="mx-auto max-w-3xl space-y-4">

          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className={`
                  group relative overflow-hidden
                  rounded-[1.75rem]
                  border
                  transition-all
                  duration-500
                  ${
                    isOpen
                      ? "border-[#D9B8C1] bg-[#FFFDFD] shadow-[0_18px_50px_rgba(128,82,96,0.10)]"
                      : "border-[#E9D8D5]/80 bg-white/70 shadow-[0_8px_30px_rgba(128,82,96,0.045)] hover:-translate-y-0.5 hover:border-[#DFC4CA] hover:bg-white hover:shadow-[0_14px_40px_rgba(128,82,96,0.08)]"
                  }
                `}
              >

                {/* =================================================
                    SUBTLE CARD DECORATION
                ================================================= */}

                <div
                  aria-hidden="true"
                  className={`
                    pointer-events-none absolute -right-8 -top-8
                    h-20 w-20 rounded-full blur-2xl
                    transition-opacity duration-500
                    ${
                      isOpen
                        ? "bg-[#F8DDE5]/60 opacity-100"
                        : "bg-[#F8DDE5]/35 opacity-0 group-hover:opacity-100"
                    }
                  `}
                />

                {/* =================================================
                    QUESTION BUTTON
                ================================================= */}

                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="relative flex w-full items-center gap-4 px-5 py-5 text-left sm:px-7 sm:py-6"
                >

                  {/* Number */}
                  <span
                    className={`
                      flex h-9 w-9 shrink-0 items-center justify-center
                      rounded-full
                      border
                      font-serif
                      text-xs
                      transition-all
                      duration-300
                      ${
                        isOpen
                          ? "border-[#D9A9B7] bg-[#FBECEF] text-[#A87585]"
                          : "border-[#E7D5D0] bg-[#FFF9F7] text-[#A68B91]"
                      }
                    `}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Question */}
                  <span
                    className={`
                      flex-1 pr-2
                      font-serif
                      text-[15px]
                      leading-6
                      transition-colors
                      duration-300
                      sm:text-base
                      ${
                        isOpen
                          ? "text-[#9D687A]"
                          : "text-[#3B2930]"
                      }
                    `}
                  >
                    {faq.question}
                  </span>

                  {/* Plus Icon */}
                  <span
                    className={`
                      flex h-9 w-9 shrink-0 items-center justify-center
                      rounded-full
                      border
                      transition-all
                      duration-500
                      ${
                        isOpen
                          ? "rotate-45 border-[#D9A9B7] bg-[#B9788B] text-white"
                          : "border-[#E4D2D2] bg-[#FFF9F7] text-[#A87585]"
                      }
                    `}
                  >
                    <FiPlus className="text-sm" />
                  </span>

                </button>

                {/* =================================================
                    ANSWER
                ================================================= */}

                <div
                  className={`
                    grid transition-all duration-500 ease-in-out
                    ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }
                  `}
                >

                  <div className="overflow-hidden">

                    <div className="px-5 pb-6 pl-[4.5rem] pr-7 sm:px-7 sm:pb-7 sm:pl-[5.5rem]">

                      <div className="mb-4 h-px w-12 bg-gradient-to-r from-[#D8B7A2] to-transparent" />

                      <p className="max-w-2xl text-sm leading-7 text-[#76636A]">
                        {faq.answer}
                      </p>

                    </div>

                  </div>

                </div>

              </div>
            );
          })}

        </div>

        {/* =================================================
            BOTTOM DECORATIVE NOTE
        ================================================= */}

        <div className="mt-12 flex items-center justify-center gap-3 text-center">

          <span className="text-[#C9A26B]/70">
            ✦
          </span>

          <p className="font-serif text-sm italic text-[#92747D]">
            Still curious? We’re always happy to help.
          </p>

          <span className="text-[#C9A26B]/70">
            ✦
          </span>

        </div>

      </div>

    </section>
  );
};

export default FAQ;