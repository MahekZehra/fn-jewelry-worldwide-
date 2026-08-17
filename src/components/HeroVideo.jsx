const HeroVideo = () => {
  return (
    <div className="relative w-full overflow-hidden rounded-[32px]">
      
      {/* Dark cinematic overlay */}
      <div className="absolute inset-0 z-10 bg-black/10" />

      {/* Gold glow */}
      <div className="absolute -inset-10 -z-10 rounded-full bg-[#D4AF37]/10 blur-[100px]" />

      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="h-[500px] w-full object-cover lg:h-[600px]"
      >
        <source
          src="/videos/jewelry-hero.mp4"
          type="video/mp4"
        />

        Your browser does not support the video tag.
      </video>

    </div>
  );
};

export default HeroVideo;