import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-[#FAF8F5]">

      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-10 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">

        {/* =========================
            HERO CONTENT
        ========================== */}
        <div className="order-1 flex flex-col justify-center text-center lg:order-1 lg:text-left">

          {/* Brand Label */}
          <p className="mb-4 text-xs font-semibold uppercase tracking-[3px] text-black/50 sm:text-sm">
            FN Jewelry Worldwide
          </p>

          {/* Main Heading */}
          <h1 className="font-serif text-4xl leading-[1.1] text-[#171717] sm:text-5xl lg:text-6xl">
            Elegance Made
            <span className="block italic">
              Effortless.
            </span>
          </h1>

          {/* Premium Tagline */}
          <p className="mt-5 font-serif text-xl italic leading-relaxed text-[#171717] sm:text-2xl">
            Wear your sparkle.
            <span className="block">
              Own your story.
            </span>
          </p>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-black/60 sm:text-base lg:mx-0">
            Discover thoughtfully curated artificial jewellery, elegant cloth
            materials and statement Kundan clutches designed to bring
            effortless sophistication to every look and every occasion.
          </p>

          {/* =========================
              HERO BUTTONS
          ========================== */}
          <div className="mx-auto mt-8 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center lg:mx-0 lg:justify-start">

            {/* Jewellery */}
            <button
              type="button"
              onClick={() => navigate("/shop?category=Jewellery")}
              className="flex h-12 w-full items-center justify-center rounded-full bg-black px-6 text-sm font-semibold text-white transition-all duration-300 hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:w-auto sm:min-w-[170px]"
            >
              Shop Jewellery
            </button>

            {/* Garments */}
            <button
              type="button"
              onClick={() => navigate("/shop?category=Garments")}
              className="flex h-12 w-full items-center justify-center rounded-full border border-black/20 bg-white px-6 text-sm font-semibold text-black transition-all duration-300 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:w-auto sm:min-w-[170px]"
            >
              Explore Garments
            </button>

            {/* Accessories */}
            <button
              type="button"
              onClick={() => navigate("/shop?category=Accessories")}
              className="flex h-12 w-full items-center justify-center rounded-full border border-black/20 bg-[#F7F4EF] px-6 text-sm font-semibold text-black transition-all duration-300 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:w-auto sm:min-w-[170px]"
            >
              Shop Accessories
            </button>

          </div>

        </div>

        {/* =========================
            HERO VIDEO
        ========================== */}
        <div className="order-2 lg:order-2">

          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] border border-black/5 bg-[#E8E0D7] shadow-[0_20px_60px_rgba(0,0,0,0.12)] sm:rounded-[2.25rem] lg:max-w-lg">

            {/* Cinematic Overlay */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/10 via-transparent to-white/5"
            />

            {/* Hero Video */}
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="FN Jewelry Worldwide artificial jewellery collection"
              className="h-full w-full object-cover"
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