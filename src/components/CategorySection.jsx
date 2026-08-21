import { useNavigate } from "react-router-dom";

const categories = [
  {
    number: "01",
    title: "Jewellery",
    description:
      "Elegant artificial jewellery designed to complete your everyday and special occasion looks.",
    button: "Shop Jewellery",
    link: "/shop?category=Jewellery",
    image: "/products/jewellery-1.jpg",
    background:
      "from-[#F3E4E0] via-[#EBD5D1] to-[#D8B7B0]",
  },
  {
    number: "02",
    title: "Garments",
    description:
      "Explore premium cloth materials and stylish fabrics for creating beautiful looks.",
    button: "Explore Garments",
    link: "/shop?category=Garments",
    image: "/products/garment-1.jpg",
    background:
      "from-[#F3EEE8] via-[#E8DED5] to-[#D2C2B5]",
  },
  {
    number: "03",
    title: "Accessories",
    description:
      "Discover elegant Kundan clutches and statement accessories designed for weddings and special occasions.",
    button: "Shop Accessories",
    link: "/shop?category=Accessories",
    image: "/products/kundan-clutch-1.jpg",
    background:
      "from-[#F4E9D8] via-[#E8D5BA] to-[#D2B88F]",
  },
];

const CategorySection = () => {
  const navigate = useNavigate();

  return (
    <section
      className="
        relative overflow-hidden
        bg-[#FFFDF9]
        px-5 py-20
        sm:px-8
        lg:px-16 lg:py-28
      "
    >
      {/* =====================================================
          SOFT BACKGROUND DETAILS
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute -left-32 top-20
          h-72 w-72
          rounded-full
          bg-[#EFD9D5]/30
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute -right-32 bottom-10
          h-80 w-80
          rounded-full
          bg-[#E9D8B9]/20
          blur-3xl
        "
      />

      {/* =====================================================
          SECTION HEADING
      ===================================================== */}

      <div
        className="
          relative z-10
          mx-auto mb-12
          max-w-7xl
          text-center
          sm:mb-16
        "
      >
        <div className="mb-5 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-[#C9A66B]/50" />

          <p
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.35em]
              text-[#B18A83]
              sm:text-xs
            "
          >
            Explore Our Collection
          </p>

          <span className="h-px w-8 bg-[#C9A66B]/50" />
        </div>

        <h2
          className="
            font-serif
            text-4xl
            leading-tight
            tracking-[-0.02em]
            text-[#3E302D]
            sm:text-5xl
            lg:text-6xl
          "
        >
          Shop by Category
        </h2>

        <p
          className="
            mx-auto mt-5
            max-w-2xl
            text-sm
            leading-7
            text-[#776965]
            sm:text-base
          "
        >
          Discover elegant artificial jewellery, beautiful cloth materials
          and statement Kundan clutches selected for every occasion.
        </p>

        {/* CHAMPAGNE GOLD ACCENT */}

        <div className="mx-auto mt-7 flex items-center justify-center gap-2">
          <span className="h-1 w-1 rounded-full bg-[#C9A66B]/70" />
          <span className="h-px w-12 bg-[#C9A66B]/40" />
          <span className="h-1 w-1 rounded-full bg-[#C9A66B]/70" />
        </div>
      </div>

      {/* =====================================================
          CATEGORY CARDS
      ===================================================== */}

      <div
        className="
          relative z-10
          mx-auto
          grid
          max-w-7xl
          gap-5
          sm:grid-cols-2
          lg:grid-cols-3
          lg:gap-7
        "
      >
        {categories.map((category) => (
          <article
            key={category.title}
            className="
              group
              relative
              min-h-[500px]
              overflow-hidden
              rounded-[2rem]
              bg-[#F3ECE7]
              shadow-[0_10px_35px_rgba(87,64,58,0.07)]
              transition-all
              duration-500
              hover:-translate-y-1
              hover:shadow-[0_18px_45px_rgba(87,64,58,0.12)]
              sm:min-h-[560px]
            "
          >
            {/* =================================================
                BACKGROUND
            ================================================= */}

            <div
              className={`
                absolute inset-0
                bg-gradient-to-br
                ${category.background}
              `}
            />

            {/* =================================================
                SOFT LIGHT OVERLAY
            ================================================= */}

            <div
              className="
                absolute inset-0
                bg-gradient-to-t
                from-[#4A3733]/10
                via-transparent
                to-white/20
              "
            />

            {/* =================================================
                LUXURY GLOW
            ================================================= */}

            <div
              className="
                absolute
                -right-20
                -top-20
                h-64
                w-64
                rounded-full
                bg-white/25
                blur-3xl
                transition-all
                duration-700
                group-hover:scale-125
                group-hover:bg-white/35
              "
            />

            {/* =================================================
                GOLD DECORATIVE CIRCLE
            ================================================= */}

            <div
              className="
                absolute
                right-7
                top-7
                h-14
                w-14
                rounded-full
                border
                border-[#C9A66B]/30
                transition-all
                duration-700
                group-hover:rotate-45
                group-hover:border-[#C9A66B]/55
                sm:right-9
                sm:top-9
              "
            />

            <div
              className="
                absolute
                right-[3.15rem]
                top-[3.15rem]
                h-2
                w-2
                rounded-full
                bg-[#C9A66B]/60
                sm:right-[3.65rem]
                sm:top-[3.65rem]
              "
            />

            {/* =================================================
                CARD CONTENT
            ================================================= */}

            <div
              className="
                relative z-10
                flex min-h-[500px]
                flex-col
                p-7
                sm:min-h-[560px]
                sm:p-9
              "
            >
              {/* =================================================
                  PRODUCT IMAGE AREA
              ================================================= */}

              <div
                className="
                  flex
                  h-[175px]
                  w-full
                  items-center
                  justify-center
                  pt-4
                  sm:h-[205px]
                  sm:pt-6
                "
              >
                <div
                  className={`
                    relative
                    flex
                    h-full
                    items-center
                    justify-center

                    ${
                      category.title === "Jewellery"
                        ? "w-[90%]"
                        : category.title === "Garments"
                        ? "w-[90%]"
                        : "w-[78%]"
                    }
                  `}
                >
                  {/* SOFT IMAGE GLOW */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      left-1/2
                      top-1/2
                      h-32
                      w-32
                      -translate-x-1/2
                      -translate-y-1/2
                      rounded-full
                      bg-white/35
                      blur-2xl
                    "
                  />

                  {/* ACTUAL PRODUCT IMAGE */}

                  <img
                    src={category.image}
                    alt={category.title}
                    className={`
                      relative
                      z-10
                      max-h-[155px]
                      max-w-full
                      object-contain
                      drop-shadow-[0_12px_16px_rgba(74,55,48,0.12)]
                      transition-transform
                      duration-700
                      ease-out
                      group-hover:scale-[1.04]
                      sm:max-h-[180px]

                      ${
                        category.title === "Accessories"
                          ? "-translate-x-2 sm:-translate-x-3"
                          : ""
                      }
                    `}
                    draggable="false"
                  />
                </div>
              </div>

              {/* =================================================
                  CONTENT BLOCK
              ================================================= */}

              <div
                className="
                  mt-auto
                  translate-y-2
                  transition-transform
                  duration-500
                  group-hover:translate-y-0
                "
              >
                {/* NUMBER */}

                <p
                  className="
                    mb-3
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.3em]
                    text-[#806A64]/70
                  "
                >
                  Collection {category.number}
                </p>

                {/* TITLE */}

                <h3
                  className="
                    font-serif
                    text-4xl
                    tracking-[-0.02em]
                    text-[#3E302D]
                    sm:text-5xl
                  "
                >
                  {category.title}
                </h3>

                {/* GOLD ACCENT */}

                <div
                  className="
                    mt-4
                    h-px
                    w-10
                    bg-[#C9A66B]/65
                    transition-all
                    duration-500
                    group-hover:w-16
                  "
                />

                {/* DESCRIPTION */}

                <p
                  className="
                    mt-4
                    max-w-sm
                    text-sm
                    leading-6
                    text-[#665652]/80
                  "
                >
                  {category.description}
                </p>

                {/* BUTTON */}

                <button
                  type="button"
                  onClick={() => navigate(category.link)}
                  className="
                    mt-7
                    rounded-full
                    border
                    border-[#4A3935]
                    bg-[#4A3935]
                    px-7
                    py-3.5
                    text-sm
                    font-medium
                    tracking-wide
                    text-[#FFFDF9]
                    shadow-[0_5px_18px_rgba(67,48,43,0.12)]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-[#5A4540]
                    hover:shadow-[0_8px_22px_rgba(67,48,43,0.18)]
                    active:translate-y-0
                  "
                >
                  {category.button}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;