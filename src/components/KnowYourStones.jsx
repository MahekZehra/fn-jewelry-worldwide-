import { useEffect, useState } from "react";

const stoneSegments = [
  {
    name: "Polki",
    start: 0,
    info: "Polki is loved for its naturally expressive, uncut-inspired character. Its soft, imperfect sparkle gives traditional jewellery a beautifully heirloom-like feeling.",
  },
  {
    name: "Kundan",
    start: 5,
    info: "Kundan jewellery is traditionally created by setting stones into a refined framework, giving each piece its distinctive royal appearance. It remains especially beloved in South Asian bridal styling.",
  },
  {
    name: "Double Stone",
    start: 10,
    info: "Double stone designs pair two layers or dimensions of sparkle to create extra depth. They are often chosen when a jewellery piece needs a little more visual richness without looking overly heavy.",
  },
  {
    name: "Doublet",
    start: 15,
    info: "A doublet combines two layers of material to create a stronger visual effect. This technique can give a stone greater colour depth and an especially polished appearance.",
  },
  {
    name: "American Diamond",
    start: 20,
    info: "American Diamond is a popular jewellery-styling term for diamond-look stones designed to capture a bright, glamorous appearance. It is widely loved for creating an elegant sparkle at an accessible price point.",
  },
  {
    name: "Cubic Zirconia",
    start: 25,
    info: "Cubic Zirconia is a lab-created gemstone known for its clarity and brilliant appearance. Its clean sparkle makes it a favourite for contemporary statement jewellery.",
  },
  {
    name: "Monte Carlo",
    start: 30,
    info: "Monte Carlo stones are appreciated for their glamorous, crystal-like appearance and eye-catching shine. They work beautifully when a jewellery design calls for a more dramatic finish.",
  },
  {
    name: "Pearl",
    start: 35,
    info: "Pearls bring a softer kind of elegance, reflecting light with a gentle glow rather than a sharp sparkle. Their timeless character makes them equally beautiful in classic and modern jewellery.",
  },
];

const closingNote = {
  name: "A little note ✨",
  info: "Every stone has its own personality, its own little way of catching the light. Choose the one that feels a little like you.",
};

const KnowYourStones = () => {
  const [currentStone, setCurrentStone] = useState(stoneSegments[0]);
  const [showClosingNote, setShowClosingNote] = useState(false);

  useEffect(() => {
    const video = document.getElementById(
      "know-your-stones-video"
    );

    if (!video) return;

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;

      const reversedSegments = [...stoneSegments].reverse();

      const activeStone = reversedSegments.find(
        (stone) => currentTime >= stone.start
      );

      if (activeStone) {
        setCurrentStone(activeStone);
        setShowClosingNote(false);
      }
    };

    const handleEnded = () => {
      setShowClosingNote(true);
    };

    video.addEventListener(
      "timeupdate",
      handleTimeUpdate
    );

    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener(
        "timeupdate",
        handleTimeUpdate
      );

      video.removeEventListener(
        "ended",
        handleEnded
      );
    };
  }, []);

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#FFF9F7]
        px-5
        py-16
        sm:px-8
        sm:py-20
        lg:px-16
        lg:py-24
      "
    >
      {/* =====================================================
          SOFT BACKGROUND GLOWS
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-32
          top-16
          h-64
          w-64
          rounded-full
          bg-[#F8DDE5]/30
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
          h-72
          w-72
          rounded-full
          bg-[#EADCF5]/25
          blur-3xl
        "
      />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* =====================================================
            SECTION INTRO
        ===================================================== */}

        <div className="mx-auto max-w-3xl text-center">

          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-7 bg-[#C9A66B]/50" />

            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.35em]
                text-[#A87585]
                sm:text-xs
              "
            >
              A Little Sparkle Story
            </p>

            <span className="h-px w-7 bg-[#C9A66B]/50" />
          </div>

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
            Know Your
            <span className="block italic text-[#B9788B]">
              Stones.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-4
              max-w-2xl
              text-sm
              leading-6
              text-[#6F5A61]
              sm:text-base
              sm:leading-7
            "
          >
            Every stone catches the light a little
            differently. Discover the little details
            behind some of the beautiful stones that
            bring our jewellery to life.
          </p>

          <div className="mx-auto mt-6 flex items-center justify-center gap-2">
            <span className="h-1 w-1 rounded-full bg-[#C9A66B]/70" />
            <span className="h-px w-10 bg-[#C9A66B]/40" />
            <span className="h-1 w-1 rounded-full bg-[#C9A66B]/70" />
          </div>

        </div>

        {/* =====================================================
            VIDEO
        ===================================================== */}

        <div
          className="
            relative
            mx-auto
            mt-10
            w-full
            max-w-4xl
            overflow-hidden
            rounded-[1.75rem]
            border
            border-[#E9D5DA]
            bg-[#FFF9F7]
            shadow-[0_20px_55px_rgba(128,82,96,0.11)]
            sm:mt-12
            sm:rounded-[2rem]
          "
        >

          {/* Soft frame glow */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -inset-1
              z-0
              rounded-[1.75rem]
              bg-gradient-to-br
              from-[#F7DDE5]/35
              via-transparent
              to-[#E8DDF2]/35
              blur-xl
              sm:rounded-[2rem]
            "
          />

          {/* =================================================
              VIDEO
          ================================================= */}

          <video
            id="know-your-stones-video"
            autoPlay
            muted
            loop={false}
            playsInline
            preload="auto"
            controls={false}
            className="
              relative
              z-[1]
              mx-auto
              block
              h-auto
              max-h-[520px]
              w-full
              object-contain
              bg-[#FFF9F7]
              sm:max-h-[560px]
              lg:max-h-[600px]
            "
          >
            <source
              src="/videos/know-your-stones.mp4"
              type="video/mp4"
            />

            Your browser does not support the video tag.
          </video>

          {/* =================================================
              BOTTOM-LEFT STONE INFORMATION
          ================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              bottom-4
              left-4
              z-20
              w-[min(72%,260px)]
              sm:bottom-6
              sm:left-6
              sm:w-[280px]
            "
          >

            <div
              className="
                rounded-[1.1rem]
                border
                border-white/60
                bg-[#FFF9F7]/90
                px-4
                py-3
                shadow-[0_8px_28px_rgba(74,57,53,0.10)]
                backdrop-blur-md
                transition-all
                duration-500
              "
            >

              {/* Stone Name */}

              <div className="flex items-center gap-2">

                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-[#C9A66B]
                    shadow-[0_0_10px_rgba(201,166,107,0.5)]
                  "
                />

                <p
                  className="
                    font-serif
                    text-base
                    italic
                    text-[#4A343D]
                    sm:text-lg
                  "
                >
                  {showClosingNote
                    ? closingNote.name
                    : currentStone.name}
                </p>

              </div>

              {/* Stone Information */}

              <p
                className="
                  mt-1
                  text-[10px]
                  leading-[1.55]
                  text-[#725E65]
                  sm:text-[11px]
                "
              >
                {showClosingNote
                  ? closingNote.info
                  : currentStone.info}
              </p>

            </div>

          </div>

        </div>

        {/* =====================================================
            FOOTNOTE
        ===================================================== */}

        <p
          className="
            mx-auto
            mt-5
            max-w-xl
            text-center
            font-serif
            text-sm
            italic
            leading-6
            text-[#A87585]
            sm:text-base
          "
        >
          A little sparkle, a little story, and a
          whole lot of you. ✨
        </p>

      </div>
    </section>
  );
};

export default KnowYourStones;