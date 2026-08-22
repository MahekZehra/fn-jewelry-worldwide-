import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  /* =====================================================
     MOBILE VIDEO AUTOPLAY FIX
  ===================================================== */

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.log("Hero video autoplay waiting for browser permission.");
      }
    };

    playVideo();

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        playVideo();
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#FFF9F7]">

      {/* Soft pastel background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#F8DDE5]/40 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-[#EADCF5]/35 blur-3xl"
      />

      <div className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-10 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">

        {/* =========================
            HERO CONTENT
        ========================== */}
        <div className="order-1 flex flex-col justify-center text-center lg:order-1 lg:text-left">

          {/* Brand Label */}
          <p className="mb-4 text-xs font-semibold uppercase tracking-[3px] text-[#A87585] sm:text-sm">
            FN Jewelry Worldwide
          </p>

          {/* Main Heading */}
          <h1 className="font-serif text-4xl leading-[1.1] tracking-tight text-[#3B2930] sm:text-5xl lg:text-6xl">
            Elegance Made
            <span className="block italic text-[#B9788B]">
              Effortless.
            </span>
          </h1>

          {/* Premium Tagline */}
          <p className="mt-5 font-serif text-xl italic leading-relaxed text-[#5B414B] sm:text-2xl">
            Wear the moment.
            <span className="block text-[#9D687A]">
              Own your sparkle.
            </span>
          </p>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#6F5A61] sm:text-base lg:mx-0">
            Where timeless tradition meets modern glamour. ✨
            <br />
            From statement pieces to everyday elegance, jewellery curated to
            make every moment shine.
          </p>

          {/* =========================
              HERO BUTTONS
          ========================== */}
          <div className="mx-auto mt-8 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center lg:mx-0 lg:justify-start">

            {/* Jewellery */}
            <button
              type="button"
              onClick={() => navigate("/shop?category=Jewellery")}
              className="flex h-12 w-full items-center justify-center rounded-full bg-[#B9788B] px-6 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(185,120,139,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A9677A] hover:shadow-[0_12px_30px_rgba(185,120,139,0.25)] focus:outline-none focus:ring-2 focus:ring-[#D9A9B7] focus:ring-offset-2 focus:ring-offset-[#FFF9F7] active:scale-[0.98] sm:w-auto sm:min-w-[170px]"
            >
              Shop Jewellery
            </button>

            {/* Garments */}
            <button
              type="button"
              onClick={() => navigate("/shop?category=Garments")}
              className="flex h-12 w-full items-center justify-center rounded-full border border-[#E4C8D0] bg-[#FFFDFD] px-6 text-sm font-semibold text-[#6D4A55] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C997A7] hover:bg-[#FBECEF] focus:outline-none focus:ring-2 focus:ring-[#D9A9B7] focus:ring-offset-2 focus:ring-offset-[#FFF9F7] active:scale-[0.98] sm:w-auto sm:min-w-[170px]"
            >
              Explore Garments
            </button>

            {/* Accessories */}
            <button
              type="button"
              onClick={() => navigate("/shop?category=Accessories")}
              className="flex h-12 w-full items-center justify-center rounded-full border border-[#DCCFE7] bg-[#F7F2FA] px-6 text-sm font-semibold text-[#66516F] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#BDA8CD] hover:bg-[#EDE3F3] focus:outline-none focus:ring-2 focus:ring-[#CBB9D7] focus:ring-offset-2 focus:ring-offset-[#FFF9F7] active:scale-[0.98] sm:w-auto sm:min-w-[170px]"
            >
              Shop Accessories
            </button>

          </div>

        </div>

        {/* =========================
            HERO VIDEO
        ========================== */}
        <div className="order-2 lg:order-2">

          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] border border-[#E9D5DA] bg-[#F3E3E7] shadow-[0_24px_70px_rgba(128,82,96,0.14)] sm:rounded-[2.25rem] lg:max-w-lg">

            {/* Soft pastel frame glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-1 z-0 rounded-[2rem] bg-gradient-to-br from-[#F7DDE5]/50 via-transparent to-[#E8DDF2]/50 blur-xl sm:rounded-[2.25rem]"
            />

            {/* Cinematic Overlay */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#5B3C46]/10 via-transparent to-[#FFF8FA]/10"
            />

            {/* Hero Video */}
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              controls={false}
              disablePictureInPicture
              aria-label="FN Jewelry Worldwide artificial jewellery collection"
              className="relative z-[1] h-full w-full object-cover"
            >
              <source
                src="/videos/jewelry-hero.mp4"
                type="video/mp4"
              />

              Your browser does not support the video tag.
            </video>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;