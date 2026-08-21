import { useState } from "react";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";

const OurStory = () => {
  const [isStoryOpen, setIsStoryOpen] = useState(false);

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#FFF9F7]
        px-5
        py-20
        sm:px-8
        sm:py-24
        lg:px-16
        lg:py-32
      "
    >

      {/* =====================================================
          SOFT PASTEL BACKGROUND DETAILS
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-32
          top-20
          h-80
          w-80
          rounded-full
          bg-[#F8DDE5]/40
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-32
          bottom-10
          h-96
          w-96
          rounded-full
          bg-[#EADCF5]/35
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-72
          w-72
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#F6E9D8]/25
          blur-3xl
        "
      />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* =================================================
            TOP DECORATION
        ================================================= */}

        <div className="mb-6 flex items-center justify-center gap-3">

          <span className="h-px w-8 bg-[#C9A66B]/45 sm:w-12" />

          <span
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.35em]
              text-[#A87585]
              sm:text-xs
            "
          >
            A Little About Us
          </span>

          <span className="h-px w-8 bg-[#C9A66B]/45 sm:w-12" />

        </div>

        {/* =================================================
            HEADING
        ================================================= */}

        <div className="mx-auto max-w-3xl text-center">

          <h2
            className="
              font-serif
              text-4xl
              leading-tight
              tracking-[-0.02em]
              text-[#3B2930]
              sm:text-5xl
              lg:text-6xl
            "
          >
            A Love Letter
            <span className="block italic text-[#B9788B]">
              to Every Woman.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-sm
              leading-7
              text-[#6F5A61]
              sm:text-base
              sm:leading-8
            "
          >
            FN Jewelry Worldwide was founded in Dubai by Amina,
            with a simple belief — that jewellery is more than
            something you wear. It is a little piece of confidence,
            a celebration of individuality, and a reminder to feel
            beautiful in your own way.
          </p>

        </div>

        {/* =================================================
            DECORATIVE DIVIDER
        ================================================= */}

        <div className="mx-auto mt-8 flex items-center justify-center gap-2">

          <span className="h-1 w-1 rounded-full bg-[#C9A66B]/70" />

          <span className="h-px w-16 bg-[#C9A66B]/35 sm:w-24" />

          <span className="text-sm text-[#C9A66B]/70">
            ✦
          </span>

          <span className="h-px w-16 bg-[#C9A66B]/35 sm:w-24" />

          <span className="h-1 w-1 rounded-full bg-[#C9A66B]/70" />

        </div>

        {/* =================================================
            READ OUR STORY BUTTON
        ================================================= */}

        <div className="mt-8 flex justify-center">

          <button
            type="button"
            onClick={() => setIsStoryOpen((previous) => !previous)}
            aria-expanded={isStoryOpen}
            className="
              group
              inline-flex
              items-center
              gap-3
              rounded-full
              border
              border-[#D9B9C1]
              bg-white/70
              px-7
              py-3.5
              text-sm
              font-semibold
              tracking-wide
              text-[#704E59]
              shadow-[0_8px_25px_rgba(128,82,96,0.08)]
              backdrop-blur-sm
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:border-[#B9788B]
              hover:bg-[#FBECEF]
              hover:shadow-[0_12px_30px_rgba(128,82,96,0.12)]
              active:translate-y-0
            "
          >

            <span>
              {isStoryOpen
                ? "Close Our Story"
                : "Read Our Story"}
            </span>

            {isStoryOpen ? (
              <FiArrowUp
                className="
                  text-base
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                "
              />
            ) : (
              <FiArrowDown
                className="
                  text-base
                  transition-transform
                  duration-300
                  group-hover:translate-y-0.5
                "
              />
            )}

          </button>

        </div>

        {/* =================================================
            FULL STORY
        ================================================= */}

        <div
          className={`
            grid
            transition-all
            duration-700
            ease-in-out
            ${
              isStoryOpen
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }
          `}
        >

          <div className="overflow-hidden">

            <div
              className="
                mx-auto
                mt-10
                max-w-4xl
                rounded-[2rem]
                border
                border-[#E8D4D8]
                bg-white/65
                px-6
                py-8
                shadow-[0_15px_50px_rgba(91,60,70,0.07)]
                backdrop-blur-sm
                sm:px-10
                sm:py-10
                lg:px-14
                lg:py-12
              "
            >

              {/* STORY INTRO */}

              <div className="text-center">

                <p
                  className="
                    font-serif
                    text-2xl
                    italic
                    leading-relaxed
                    text-[#9D687A]
                    sm:text-3xl
                  "
                >
                  It began with a love for the little things
                  that make a woman feel beautiful.
                </p>

              </div>

              {/* STORY BODY */}

              <div
                className="
                  mx-auto
                  mt-8
                  max-w-3xl
                  space-y-5
                  text-sm
                  leading-7
                  text-[#6F5A61]
                  sm:text-base
                  sm:leading-8
                "
              >

                <p>
                  FN Jewelry Worldwide was founded in Dubai by
                  <span className="font-semibold text-[#704E59]">
                    {" "}Amina
                  </span>
                  , born from a simple yet heartfelt idea:
                  every woman deserves to find something that
                  feels beautifully, unmistakably hers.
                </p>

                <p>
                  From timeless traditional details to modern
                  statement pieces, FN was created to celebrate
                  the many sides of a woman — the effortlessly
                  elegant, the quietly confident, the romantic,
                  the bold, and everything in between.
                </p>

                <p>
                  We believe jewellery isn't simply about
                  completing an outfit. Sometimes, it's the
                  sparkle you reach for before a special evening.
                  Sometimes, it's the piece that makes you feel
                  a little more confident. And sometimes, it's
                  simply something beautiful that makes an
                  ordinary day feel special.
                </p>

              </div>

              {/* =================================================
                  LOVE LETTER QUOTE
              ================================================= */}

              <div
                className="
                  my-9
                  rounded-[1.5rem]
                  bg-gradient-to-br
                  from-[#FBECEF]
                  via-[#FFF8F5]
                  to-[#F2EAF7]
                  px-6
                  py-8
                  text-center
                  sm:px-10
                "
              >

                <p
                  className="
                    font-serif
                    text-2xl
                    italic
                    leading-relaxed
                    text-[#704E59]
                    sm:text-3xl
                  "
                >
                  FN Jewelry Worldwide is our love letter
                  to women.
                </p>

                <p
                  className="
                    mt-4
                    text-xs
                    uppercase
                    tracking-[0.25em]
                    text-[#A87585]
                  "
                >
                  To every beautiful version of you
                </p>

              </div>

              {/* =================================================
                  STORY CONTINUATION
              ================================================= */}

              <div
                className="
                  mx-auto
                  max-w-3xl
                  space-y-5
                  text-sm
                  leading-7
                  text-[#6F5A61]
                  sm:text-base
                  sm:leading-8
                "
              >

                <p>
                  To their stories. Their celebrations. Their
                  everyday moments. And all the beautiful
                  versions of themselves they carry within.
                </p>

                <p>
                  What began in Dubai is now a collection created
                  to travel beyond borders — bringing together
                  elegance, tradition and modern glamour, one
                  beautiful piece at a time.
                </p>

              </div>

              {/* =================================================
                  FINAL STATEMENT
              ================================================= */}

              <div className="mt-9 text-center">

                <div className="mx-auto mb-5 flex items-center justify-center gap-2">

                  <span className="h-px w-10 bg-[#C9A66B]/40" />

                  <span className="text-[#C9A66B]/70">
                    ✦
                  </span>

                  <span className="h-px w-10 bg-[#C9A66B]/40" />

                </div>

                <p
                  className="
                    font-serif
                    text-2xl
                    italic
                    leading-relaxed
                    text-[#3B2930]
                    sm:text-3xl
                  "
                >
                  Because every woman deserves a little
                  sparkle that feels like her.
                  <span className="ml-1">
                    ✨
                  </span>
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default OurStory;