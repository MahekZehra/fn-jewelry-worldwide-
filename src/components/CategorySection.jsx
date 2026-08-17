import { useNavigate } from "react-router-dom";

const categories = [
  {
    number: "01",
    title: "Jewellery",
    description:
      "Elegant artificial jewellery designed to complete your everyday and special occasion looks.",
    button: "Shop Jewellery",
    link: "/shop?category=Jewellery",
    background:
      "from-[#E9DED2] via-[#DCCBBB] to-[#C9B39D]",
  },
  {
    number: "02",
    title: "Garments",
    description:
      "Explore premium cloth materials and stylish fabrics for creating beautiful looks.",
    button: "Explore Garments",
    link: "/shop?category=Garments",
    background:
      "from-[#DDD9D3] via-[#C9C2B9] to-[#B5ABA0]",
  },
  {
    number: "03",
    title: "Accessories",
    description:
      "Discover elegant Kundan clutches and statement accessories designed for weddings and special occasions.",
    button: "Shop Accessories",
    link: "/shop?category=Accessories",
    background:
      "from-[#E8D9C8] via-[#D5BEA4] to-[#B99A78]",
  },
];

const CategorySection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#F7F4EF] px-5 py-20 sm:px-8 lg:px-16 lg:py-28">

      {/* Section Heading */}
      <div className="mx-auto mb-12 max-w-7xl text-center sm:mb-16">

        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-black/45 sm:text-xs">
          Explore Our Collection
        </p>

        <h2 className="font-serif text-4xl leading-tight tracking-tight text-[#171717] sm:text-5xl lg:text-6xl">
          Shop by Category
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-black/55 sm:text-base">
          Discover elegant artificial jewellery, beautiful cloth materials
          and statement Kundan clutches selected for every occasion.
        </p>

      </div>

      {/* Category Cards */}
      <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">

        {categories.map((category) => (
          <article
            key={category.title}
            className="group relative min-h-[440px] overflow-hidden rounded-[2rem] bg-[#DED8D0] sm:min-h-[510px]"
          >

            {/* Background */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${category.background} transition-transform duration-700 ease-out group-hover:scale-110`}
            />

            {/* Dark subtle overlay */}
            <div className="absolute inset-0 bg-black/[0.03] transition duration-500 group-hover:bg-black/[0.08]" />

            {/* Decorative glow */}
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/20 blur-3xl transition duration-700 group-hover:scale-125" />

            {/* Content */}
            <div className="relative z-10 flex min-h-[440px] flex-col justify-end p-7 sm:min-h-[510px] sm:p-9">

              <div className="translate-y-2 transition-transform duration-500 group-hover:translate-y-0">

                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-black/50">
                  Collection {category.number}
                </p>

                <h3 className="font-serif text-4xl tracking-tight text-[#171717] sm:text-5xl">
                  {category.title}
                </h3>

                <p className="mt-4 max-w-sm text-sm leading-6 text-black/60">
                  {category.description}
                </p>

                <button
                  type="button"
                  onClick={() => navigate(category.link)}
                  className="mt-7 rounded-full bg-[#171717] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2D2D2D] hover:shadow-lg"
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