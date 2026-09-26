const products = [
  // =====================================================
  // ACCESSORIES — KUNDAN CLUTCHES
  // =====================================================

  {
    id: 7,
    name: "Royal Kundan Clutch",
    priceAED: 189,
    salePriceAED: 169,
    onSale: true,

    category: "Accessories",
    subCategory: "Kundan Clutches",

    image: "/products/kundan-clutch-1.jpg",

    description:
      "A regal Kundan clutch with elegant traditional detailing and a refined finish. Perfect for weddings, festive celebrations and evening occasions.",

    details: {
      material: "Kundan & Artificial Stones",
      type: "Kundan Clutch",
      occasion: "Weddings & Special Occasions",
    },
  },

  {
    id: 8,
    name: "Classic Kundan Clutch",
    priceAED: 199,
    salePriceAED: null,
    onSale: false,

    category: "Accessories",
    subCategory: "Kundan Clutches",

    image: "/products/kundan-clutch-2.jpg",

    description:
      "A classic Kundan clutch with elegant traditional detailing and a polished finish. A graceful choice for festive, formal and special occasions.",

    details: {
      material: "Kundan & Artificial Stones",
      type: "Kundan Clutch",
      occasion: "Festive & Formal Events",
    },
  },

  {
    id: 9,
    name: "Luxury Kundan Clutch",
    priceAED: 219,
    salePriceAED: null,
    onSale: false,

    category: "Accessories",
    subCategory: "Kundan Clutches",

    image: "/products/kundan-clutch-3.jpg",

    description:
      "A luxurious Kundan clutch with detailed embellishment and a statement finish. Perfect for weddings, receptions, festive celebrations and elegant evening looks.",

    details: {
      material: "Kundan & Artificial Stones",
      type: "Luxury Kundan Clutch",
      occasion: "Weddings & Evening Events",
    },
  },

  {
    id: 34,
    name: "Elegant Kundan Clutch",
    priceAED: 239,
    salePriceAED: null,
    onSale: false,

    category: "Accessories",
    subCategory: "Kundan Clutches",

    image: "/products/kundan-clutch-4.jpg",

    description:
      "An elegant Kundan clutch featuring intricate traditional-inspired detailing and a sophisticated finish. Perfect for weddings, festive celebrations, formal events and evening occasions.",

    details: {
      material: "Kundan & Artificial Stones",
      type: "Elegant Kundan Clutch",
      occasion: "Weddings & Special Occasions",
    },
  },

  {
    id: 35,
    name: "Luxury Statement Kundan Clutch",
    priceAED: 259,
    salePriceAED: null,
    onSale: false,

    category: "Accessories",
    subCategory: "Kundan Clutches",

    image: "/products/kundan-clutch-5.jpg",

    description:
      "A luxurious Kundan clutch with statement embellishment, elegant detailing and a refined finish. Designed to complement wedding, festive and sophisticated evening looks.",

    details: {
      material: "Kundan & Artificial Stones",
      type: "Luxury Kundan Clutch",
      occasion: "Weddings & Formal Events",
    },
  },

  // =====================================================
  // JEWELLERY — SETS
  // =====================================================

  {
    id: 13,
    name: "Elegant Jewellery Set",
    priceAED: 79,
    salePriceAED: null,
    onSale: false,

    category: "Jewellery",
    subCategory: "Sets",
    origin: "Indian Style",
    originFlag: "🇮🇳",

    image: "/products/jewellery-1.jpg",

    description:
      "An elegant artificial jewellery set with graceful detailing and a polished finish. Perfect for traditional, contemporary and special occasion styling.",

    details: {
      material: "Artificial Jewellery",
      type: "Jewellery Set",
      occasion: "Everyday & Special Occasions",
    },
  },

  {
    id: 14,
    name: "Classic Jewellery Collection",
    priceAED: 89,
    salePriceAED: null,
    onSale: false,

    category: "Jewellery",
    subCategory: "Designer Sets",
    origin: "Pakistani Style",
    originFlag: "🇵🇰",

    image: "/products/jewellery-2.jpg",

    description:
      "A classic imitation jewellery set with refined designer-inspired detailing and an elegant finish. Easy to style with traditional and modern outfits.",

    details: {
      material: "Artificial Jewellery",
      type: "Designer Jewellery Set",
      occasion: "Everyday & Occasion Wear",
    },
  },

  // =====================================================
  // JEWELLERY — DESIGNER SETS
  // =====================================================

  {
    id: 15,
    name: "Royal Statement Jewellery",
    priceAED: 99,
    salePriceAED: null,
    onSale: false,

    category: "Jewellery",
    subCategory: "Designer Sets",
    origin: "Indian Style",
    originFlag: "🇮🇳",

    image: "/products/jewellery-3.jpg",

    description:
      "A striking artificial jewellery set with detailed design and a sophisticated finish. Perfect for weddings, parties, festive gatherings and special celebrations.",

    details: {
      material: "Artificial Jewellery",
      type: "Statement Set",
      occasion: "Weddings & Parties",
    },
  },

  {
    id: 20,
    name: "Luxury Occasion Jewellery",
    priceAED: 129,
    salePriceAED: null,
    onSale: false,

    category: "Jewellery",
    subCategory: "Designer Sets",
    origin: "Pakistani Style",
    originFlag: "🇵🇰",

    image: "/products/jewellery-8.jpg",

    description:
      "A luxurious artificial jewellery design with sophisticated detailing and a polished finish. Ideal for weddings, formal events and elegant evening styling.",

    details: {
      material: "Artificial Jewellery",
      type: "Designer Set",
      occasion: "Wedding & Formal Wear",
    },
  },

  {
    id: 25,
    name: "Premium Jewellery Set",
    priceAED: 139,
    salePriceAED: null,
    onSale: false,

    category: "Jewellery",
    subCategory: "Designer Sets",
    origin: "Pakistani Style",
    originFlag: "🇵🇰",

    image: "/products/jewellery-13.jpg",

    description:
      "A premium artificial jewellery set featuring elegant detailing and a refined decorative finish. Designed to elevate wedding, formal and special occasion outfits.",

    details: {
      material: "Artificial Jewellery",
      type: "Premium Designer Set",
      occasion: "Wedding & Formal Wear",
    },
  },

  {
    id: 27,
    name: "Royal Occasion Set",
    priceAED: 149,
    salePriceAED: null,
    onSale: false,

    category: "Jewellery",
    subCategory: "Designer Sets",
    origin: "Indian Style",
    originFlag: "🇮🇳",

    image: "/products/jewellery-15.jpg",

    description:
      "A royal-inspired artificial jewellery set with luxurious detailing and an elegant finish. Perfect for brides, wedding guests and festive celebrations.",

    details: {
      material: "Artificial Jewellery",
      type: "Royal Designer Set",
      occasion: "Weddings & Grand Occasions",
    },
  },

  // =====================================================
  // JEWELLERY — NECKLACES
  // =====================================================

  {
    id: 16,
    name: "Golden Elegance",
    priceAED: 109,
    salePriceAED: null,
    onSale: false,

    category: "Jewellery",
    subCategory: "Necklaces",
    origin: "Turkish Style",
    originFlag: "🇹🇷",

    image: "/products/jewellery-4.jpg",

    description:
      "An artificial jewellery necklace with a sophisticated golden-finish appearance and graceful detailing. Perfect for traditional, contemporary and elegant occasion styling.",

    details: {
      material: "Artificial Jewellery",
      type: "Necklace",
      occasion: "Everyday & Occasion Wear",
    },
  },

  {
    id: 26,
    name: "Signature Gold Jewellery",
    priceAED: 109,
    salePriceAED: null,
    onSale: false,

    category: "Jewellery",
    subCategory: "Necklaces",
    origin: "Turkish Style",
    originFlag: "🇹🇷",

    image: "/products/jewellery-14.jpg",

    description:
      "A signature imitation jewellery necklace with a refined golden-finish look and contemporary detailing. Easy to pair with everyday and occasion outfits.",

    details: {
      material: "Artificial Jewellery",
      type: "Necklace",
      occasion: "Everyday & Occasion Wear",
    },
  },

  // =====================================================
  // JEWELLERY — EVERYDAY JEWELLERY
  // =====================================================

  {
    id: 17,
    name: "Pearl Grace Jewellery",
    priceAED: 95,
    salePriceAED: null,
    onSale: false,

    category: "Jewellery",
    subCategory: "Everyday Jewellery",
    origin: "Pakistani Style",
    originFlag: "🇵🇰",

    image: "/products/jewellery-5.jpg",

    description:
      "A delicate artificial jewellery design featuring elegant pearl-inspired detailing and a soft finish. Perfect for everyday, casual and semi-formal styling.",

    details: {
      material: "Artificial Jewellery & Pearls",
      type: "Everyday Jewellery",
      occasion: "Everyday & Casual Wear",
    },
  },

  {
    id: 21,
    name: "Delicate Gold Collection",
    priceAED: 85,
    salePriceAED: null,
    onSale: false,

    category: "Jewellery",
    subCategory: "Everyday Jewellery",
    origin: "Indian Style",
    originFlag: "🇮🇳",

    image: "/products/jewellery-9.jpg",

    description:
      "A delicate artificial jewellery design with a subtle golden-finish appearance and clean detailing. Created for effortless everyday styling and understated elegance.",

    details: {
      material: "Artificial Jewellery",
      type: "Everyday Jewellery",
      occasion: "Everyday Wear",
    },
  },

  // =====================================================
  // JEWELLERY — FESTIVE SETS
  // =====================================================

  {
    id: 18,
    name: "Festive Charm Set",
    priceAED: 119,
    salePriceAED: null,
    onSale: false,

    category: "Jewellery",
    subCategory: "Sets",
    origin: "Indian Style",
    originFlag: "🇮🇳",

    image: "/products/jewellery-6.jpg",

    description:
      "A beautiful artificial jewellery set with elegant festive detailing and a polished finish. Perfect for traditional outfits, celebrations, gatherings and special occasions.",

    details: {
      material: "Artificial Jewellery",
      type: "Jewellery Set",
      occasion: "Festive & Wedding Wear",
    },
  },

  // =====================================================
  // JEWELLERY — EARRINGS
  // =====================================================

  {
    id: 19,
    name: "Classic Golden Earrings",
    priceAED: 69,
    salePriceAED: null,
    onSale: false,

    category: "Jewellery",
    subCategory: "Earrings",
    origin: "Turkish Style",
    originFlag: "🇹🇷",

    image: "/products/jewellery-7.jpg",

    description:
      "Elegant artificial earrings with a classic golden-finish appearance and refined detailing. Easy to pair with traditional, casual and occasion outfits.",

    details: {
      material: "Artificial Jewellery",
      type: "Earrings",
      occasion: "Everyday & Special Occasions",
    },
  },

  // =====================================================
  // JEWELLERY — TRADITIONAL SETS
  // =====================================================

  {
    id: 22,
    name: "Traditional Beauty Set",
    priceAED: 119,
    salePriceAED: null,
    onSale: false,

    category: "Jewellery",
    subCategory: "Traditional Sets",
    origin: "Pakistani Style",
    originFlag: "🇵🇰",

    image: "/products/jewellery-10.jpg",

    description:
      "A traditional-inspired artificial jewellery set with rich detailing and an elegant finish. Designed to complement festive, wedding and traditional occasion wear.",

    details: {
      material: "Artificial Jewellery",
      type: "Traditional Jewellery Set",
      occasion: "Festive & Wedding Wear",
    },
  },

  // =====================================================
  // JEWELLERY — STATEMENT JEWELLERY
  // =====================================================

  {
    id: 23,
    name: "Modern Statement Piece",
    priceAED: 99,
    salePriceAED: null,
    onSale: false,

    category: "Jewellery",
    subCategory: "Statement Jewellery",
    origin: "Turkish Style",
    originFlag: "🇹🇷",

    image: "/products/jewellery-11.jpg",

    description:
      "A modern artificial jewellery piece with contemporary detailing and a polished finish. Ideal for parties, dinners and stylish special occasions.",

    details: {
      material: "Artificial Jewellery",
      type: "Statement Jewellery",
      occasion: "Party & Contemporary Wear",
    },
  },

  // =====================================================
  // JEWELLERY — PARTY JEWELLERY
  // =====================================================

  {
    id: 24,
    name: "Elegant Party Jewellery",
    priceAED: 109,
    salePriceAED: null,
    onSale: false,

    category: "Jewellery",
    subCategory: "Party Jewellery",
    origin: "Indian Style",
    originFlag: "🇮🇳",

    image: "/products/jewellery-12.jpg",

    description:
      "An elegant artificial jewellery design with polished detailing and a sophisticated finish. Perfect for parties, dinners and stylish evening occasions.",

    details: {
      material: "Artificial Jewellery",
      type: "Party Jewellery",
      occasion: "Parties & Dinners",
    },
  },

  // =====================================================
  // JEWELLERY — NEW ARRIVALS
  // =====================================================

  {
    id: 30,
    name: "Elegant New Arrival",
    priceAED: 99,
    salePriceAED: null,
    onSale: false,

    category: "Jewellery",
    subCategory: "New Arrivals",
    origin: "Pakistani Style",
    originFlag: "🇵🇰",

    image: "/products/jewellery-16.jpg",

    description:
      "A graceful artificial jewellery design with elegant detailing and a refined finish. Perfect for adding a sophisticated touch to everyday and special occasion looks.",

    details: {
      material: "Artificial Jewellery",
      type: "New Arrival",
      occasion: "Everyday & Special Occasions",
    },
  },

  {
    id: 31,
    name: "Graceful Statement Jewellery",
    priceAED: 109,
    salePriceAED: null,
    onSale: false,

    category: "Jewellery",
    subCategory: "New Arrivals",
    origin: "Turkish Style",
    originFlag: "🇹🇷",

    image: "/products/jewellery-17.jpg",

    description:
      "A beautiful artificial jewellery piece featuring elegant detailing and a polished finish. Designed to bring effortless charm to both traditional and contemporary outfits.",

    details: {
      material: "Artificial Jewellery",
      type: "Statement Jewellery",
      occasion: "Everyday & Occasion Wear",
    },
  },

  {
    id: 32,
    name: "Classic Elegance Jewellery",
    priceAED: 119,
    salePriceAED: null,
    onSale: false,

    category: "Jewellery",
    subCategory: "New Arrivals",
    origin: "Indian Style",
    originFlag: "🇮🇳",

    image: "/products/jewellery-18.jpg",

    description:
      "A timeless artificial jewellery design with sophisticated detailing and a graceful finish. An elegant choice for celebrations, gatherings and special occasions.",

    details: {
      material: "Artificial Jewellery",
      type: "Classic Jewellery",
      occasion: "Festive & Special Occasions",
    },
  },

  {
    id: 33,
    name: "Luxury Charm Jewellery",
    priceAED: 129,
    salePriceAED: null,
    onSale: false,

    category: "Jewellery",
    subCategory: "New Arrivals",
    origin: "Pakistani Style",
    originFlag: "🇵🇰",

    image: "/products/jewellery-19.jpg",

    description:
      "A luxurious artificial jewellery design created to add a refined statement to your look. Perfect for elegant styling, festive occasions and memorable evenings.",

    details: {
      material: "Artificial Jewellery",
      type: "Luxury Jewellery",
      occasion: "Festive & Formal Wear",
    },
  },

  // =====================================================
  // JEWELLERY — NEW TURKISH COLLECTION
  // =====================================================

  {
    id: 36,
    name: "Turkish Elegance Jewellery",
    priceAED: 119,
    salePriceAED: null,
    onSale: false,

    category: "Jewellery",
    subCategory: "New Arrivals",
    origin: "Turkish Style",
    originFlag: "🇹🇷",

    image: "/products/jewellery-20.jpg",

    description:
      "A graceful artificial jewellery design inspired by elegant Turkish styling, featuring refined detailing and a polished finish. Perfect for adding a sophisticated touch to both traditional and contemporary looks.",

    details: {
      material: "Artificial Jewellery",
      type: "Turkish Style Jewellery",
      occasion: "Everyday & Special Occasions",
    },
  },

  {
    id: 37,
    name: "Turkish Royal Jewellery",
    priceAED: 129,
    salePriceAED: null,
    onSale: false,

    category: "Jewellery",
    subCategory: "New Arrivals",
    origin: "Turkish Style",
    originFlag: "🇹🇷",

    image: "/products/jewellery-21.jpg",

    description:
      "A sophisticated artificial jewellery piece with elegant Turkish-inspired detailing and a luxurious finish. Designed to complement festive celebrations, parties and special occasion outfits.",

    details: {
      material: "Artificial Jewellery",
      type: "Turkish Style Jewellery",
      occasion: "Festive & Formal Wear",
    },
  },

  {
    id: 38,
    name: "Turkish Classic Collection",
    priceAED: 139,
    salePriceAED: null,
    onSale: false,

    category: "Jewellery",
    subCategory: "New Arrivals",
    origin: "Turkish Style",
    originFlag: "🇹🇷",

    image: "/products/jewellery-22.jpg",

    description:
      "A timeless artificial jewellery design inspired by classic Turkish aesthetics, featuring graceful detailing and a refined polished finish. Ideal for elegant everyday and occasion styling.",

    details: {
      material: "Artificial Jewellery",
      type: "Turkish Style Jewellery",
      occasion: "Everyday & Occasion Wear",
    },
  },

  {
    id: 39,
    name: "Turkish Luxury Statement",
    priceAED: 149,
    salePriceAED: null,
    onSale: false,

    category: "Jewellery",
    subCategory: "New Arrivals",
    origin: "Turkish Style",
    originFlag: "🇹🇷",

    image: "/products/jewellery-23.jpg",

    description:
      "A luxurious artificial jewellery design with striking Turkish-inspired detailing and an elegant statement finish. Perfect for weddings, celebrations, evening events and sophisticated styling.",

    details: {
      material: "Artificial Jewellery",
      type: "Turkish Style Statement Jewellery",
      occasion: "Weddings & Evening Events",
    },
  },

  // =====================================================
  // JEWELLERY — NEW COLLECTION
  // =====================================================

  {
    id: 40,
    name: "Emerald Pearl Floral Earrings",
    priceAED: 99,
    salePriceAED: null,
    onSale: false,

    category: "Jewellery",
    subCategory: "Earrings",
    origin: "Indian Style",
    originFlag: "🇮🇳",

    image: "/products/jewellery-24.jpg",

    description:
      "Elegant statement earrings featuring intricate emerald-green detailing, delicate pink accents and pearl-inspired elements. A graceful choice for festive celebrations, weddings and sophisticated occasion styling.",

    details: {
      material: "Artificial Jewellery & Pearl Detailing",
      type: "Statement Earrings",
      occasion: "Festive & Wedding Wear",
    },
  },

  {
    id: 41,
    name: "Midnight Pearl Floral Earrings",
    priceAED: 99,
    salePriceAED: null,
    onSale: false,

    category: "Jewellery",
    subCategory: "Earrings",
    origin: "Indian Style",
    originFlag: "🇮🇳",

    image: "/products/jewellery-25.jpg",

    description:
      "A sophisticated pair of statement earrings combining deep blue detailing, pink accents and elegant pearl-inspired elements. Perfect for evening events, festive occasions and special celebrations.",

    details: {
      material: "Artificial Jewellery & Pearl Detailing",
      type: "Statement Earrings",
      occasion: "Festive & Evening Wear",
    },
  },

  {
    id: 42,
    name: "Royal Pearl Floral Set",
    priceAED: 159,
    salePriceAED: null,
    onSale: false,

    category: "Jewellery",
    subCategory: "Sets",
    origin: "Indian Style",
    originFlag: "🇮🇳",

    image: "/products/jewellery-26.jpg",

    description:
      "A luxurious traditional-inspired jewellery set featuring intricate golden floral detailing and elegant pearl accents. Designed to complement weddings, festive celebrations and formal occasions.",

    details: {
      material: "Artificial Jewellery & Pearl Detailing",
      type: "Jewellery Set",
      occasion: "Weddings & Festive Wear",
    },
  },

  {
    id: 43,
    name: "Pearl Heritage Necklace Set",
    priceAED: 179,
    salePriceAED: null,
    onSale: false,

    category: "Jewellery",
    subCategory: "Sets",
    origin: "Indian Style",
    originFlag: "🇮🇳",

    image: "/products/jewellery-27.jpg",

    description:
      "An elegant pearl-inspired necklace set paired with coordinated earrings and intricate decorative detailing. A refined statement for bridal, festive and formal styling.",

    details: {
      material: "Artificial Jewellery & Pearls",
      type: "Necklace Set",
      occasion: "Bridal & Special Occasions",
    },
  },

  {
    id: 44,
    name: "Emerald Bloom Statement Earrings",
    priceAED: 109,
    salePriceAED: null,
    onSale: false,

    category: "Jewellery",
    subCategory: "Earrings",
    origin: "Indian Style",
    originFlag: "🇮🇳",

    image: "/products/jewellery-28.jpg",

    description:
      "Beautiful floral statement earrings featuring rich emerald-green detailing, pearl accents and delicate pink embellishment. Designed to add an elegant finishing touch to traditional and occasion looks.",

    details: {
      material: "Artificial Jewellery, Pearls & Stones",
      type: "Floral Statement Earrings",
      occasion: "Weddings & Festive Wear",
    },
  },

  {
    id: 45,
    name: "Emerald Garden Earrings",
    priceAED: 109,
    salePriceAED: null,
    onSale: false,

    category: "Jewellery",
    subCategory: "Earrings",
    origin: "Indian Style",
    originFlag: "🇮🇳",

    image: "/products/jewellery-29.jpg",

    description:
      "A graceful pair of floral-inspired statement earrings with emerald-green stones, pearl detailing and delicate pink accents. Perfect for elegant traditional and festive styling.",

    details: {
      material: "Artificial Jewellery, Pearls & Stones",
      type: "Floral Statement Earrings",
      occasion: "Festive & Occasion Wear",
    },
  },

  {
    id: 46,
    name: "Golden Pearl Heritage Set",
    priceAED: 169,
    salePriceAED: null,
    onSale: false,

    category: "Jewellery",
    subCategory: "Sets",
    origin: "Indian Style",
    originFlag: "🇮🇳",

    image: "/products/jewellery-30.jpg",

    description:
      "A statement traditional jewellery set featuring ornate golden detailing, floral motifs and elegant pearl accents. Perfect for weddings, festive celebrations and sophisticated traditional looks.",

    details: {
      material: "Artificial Jewellery & Pearl Detailing",
      type: "Traditional Jewellery Set",
      occasion: "Weddings & Festive Wear",
    },
  },

  // =====================================================
  // JEWELLERY — LATEST COLLECTION
  // =====================================================

  {
    id: 47,
    name: "Elegant Pearl Statement Jewellery",
    priceAED: 119,
    salePriceAED: null,
    onSale: false,

    category: "Jewellery",
    subCategory: "New Arrivals",
    origin: "Indian Style",
    originFlag: "🇮🇳",

    image: "/products/jewellery-31.jpg",

    description:
      "An elegant artificial jewellery design featuring refined detailing and a sophisticated statement finish. Perfect for festive celebrations, weddings and special occasion styling.",

    details: {
      material: "Artificial Jewellery",
      type: "Statement Jewellery",
      occasion: "Festive & Special Occasions",
    },
  },

  {
    id: 48,
    name: "Royal Floral Jewellery",
    priceAED: 129,
    salePriceAED: null,
    onSale: false,

    category: "Jewellery",
    subCategory: "New Arrivals",
    origin: "Indian Style",
    originFlag: "🇮🇳",

    image: "/products/jewellery-32.jpg",

    description:
      "A graceful artificial jewellery design with elegant floral detailing and a polished finish. Designed to complement traditional, festive and formal outfits.",

    details: {
      material: "Artificial Jewellery",
      type: "Floral Jewellery",
      occasion: "Festive & Wedding Wear",
    },
  },

  {
    id: 49,
    name: "Classic Pearl Elegance",
    priceAED: 139,
    salePriceAED: null,
    onSale: false,

    category: "Jewellery",
    subCategory: "New Arrivals",
    origin: "Pakistani Style",
    originFlag: "🇵🇰",

    image: "/products/jewellery-33.jpg",

    description:
      "A sophisticated artificial jewellery piece featuring elegant pearl-inspired detailing and a refined finish. Perfect for weddings, festive occasions and evening styling.",

    details: {
      material: "Artificial Jewellery & Pearl Detailing",
      type: "Pearl Jewellery",
      occasion: "Weddings & Special Occasions",
    },
  },

  {
    id: 50,
    name: "Golden Heritage Jewellery",
    priceAED: 149,
    salePriceAED: null,
    onSale: false,

    category: "Jewellery",
    subCategory: "New Arrivals",
    origin: "Indian Style",
    originFlag: "🇮🇳",

    image: "/products/jewellery-34.jpg",

    description:
      "A luxurious artificial jewellery design with ornate golden detailing and a graceful statement finish. Ideal for festive celebrations, weddings and formal occasions.",

    details: {
      material: "Artificial Jewellery",
      type: "Heritage Jewellery",
      occasion: "Wedding & Festive Wear",
    },
  },

  {
    id: 51,
    name: "Royal Statement Collection",
    priceAED: 159,
    salePriceAED: null,
    onSale: false,

    category: "Jewellery",
    subCategory: "New Arrivals",
    origin: "Indian Style",
    originFlag: "🇮🇳",

    image: "/products/jewellery-35.jpg",

    description:
      "A statement artificial jewellery design with intricate embellishment and an elegant polished finish. Perfect for adding a luxurious touch to special occasion looks.",

    details: {
      material: "Artificial Jewellery & Stones",
      type: "Statement Jewellery",
      occasion: "Weddings & Formal Events",
    },
  },

  {
    id: 52,
    name: "Luxury Floral Collection",
    priceAED: 149,
    salePriceAED: null,
    onSale: false,

    category: "Jewellery",
    subCategory: "New Arrivals",
    origin: "Pakistani Style",
    originFlag: "🇵🇰",

    image: "/products/jewellery-36.jpg",

    description:
      "A beautiful artificial jewellery design inspired by elegant floral motifs, featuring refined detailing and a sophisticated finish. Perfect for festive and formal styling.",

    details: {
      material: "Artificial Jewellery",
      type: "Floral Jewellery",
      occasion: "Festive & Formal Wear",
    },
  },

  {
    id: 53,
    name: "Pearl Charm Collection",
    priceAED: 139,
    salePriceAED: null,
    onSale: false,

    category: "Jewellery",
    subCategory: "New Arrivals",
    origin: "Indian Style",
    originFlag: "🇮🇳",

    image: "/products/jewellery-37.jpg",

    description:
      "An elegant artificial jewellery design enhanced with pearl-inspired accents and delicate detailing. A graceful choice for weddings, celebrations and evening occasions.",

    details: {
      material: "Artificial Jewellery & Pearl Detailing",
      type: "Pearl Jewellery",
      occasion: "Weddings & Evening Wear",
    },
  },

  {
    id: 54,
    name: "Elegant Golden Statement",
    priceAED: 159,
    salePriceAED: null,
    onSale: false,

    category: "Jewellery",
    subCategory: "New Arrivals",
    origin: "Turkish Style",
    originFlag: "🇹🇷",

    image: "/products/jewellery-38.jpg",

    description:
      "A sophisticated artificial jewellery piece with elegant golden detailing and a luxurious statement finish. Designed for refined traditional and contemporary styling.",

    details: {
      material: "Artificial Jewellery",
      type: "Statement Jewellery",
      occasion: "Festive & Special Occasions",
    },
  },

  {
    id: 55,
    name: "Signature Luxury Jewellery",
    priceAED: 169,
    salePriceAED: null,
    onSale: false,

    category: "Jewellery",
    subCategory: "New Arrivals",
    origin: "Pakistani Style",
    originFlag: "🇵🇰",

    image: "/products/jewellery-39.jpg",

    description:
      "A luxurious artificial jewellery design featuring intricate detailing and an elegant statement finish. Perfect for weddings, festive celebrations and sophisticated evening looks.",

    details: {
      material: "Artificial Jewellery & Stones",
      type: "Luxury Jewellery",
      occasion: "Weddings & Formal Events",
    },
  },

  // =====================================================
  // GARMENTS — LAWN
  // =====================================================

  {
    id: 28,
    name: "Elegant Premium Lawn",
    priceAED: 129,
    salePriceAED: 109,
    onSale: true,

    category: "Garments",
    subCategory: "Lawn — Single Shirt Piece",

    image: "/products/garment-1.jpg",

    description:
      "Premium Lawn fabric with a lightweight and breathable feel. This 3.5-yard single shirt piece is ideal for creating a stylish custom outfit for warm-weather wear.",

    details: {
      material: "Premium Lawn",
      fabricLength: "3.5 Yards",
      type: "Single Shirt Piece",
      occasion: "Everyday & Occasion Wear",
    },
  },

  {
    id: 29,
    name: "Luxury Lawn 2-Piece",
    priceAED: 149,
    salePriceAED: 129,
    onSale: true,

    category: "Garments",
    subCategory: "Lawn — 2 Piece",

    image: "/products/garment-2.jpg",

    description:
      "A premium Lawn 2-piece fabric collection with a lightweight and breathable feel. The 6-yard material is ideal for elegant festive, summer and semi-formal styling.",

    details: {
      material: "Premium Lawn",
      fabricLength: "6 Yards",
      type: "2-Piece Fabric",
      occasion: "Festive & Formal Wear",
    },
  },

  // =====================================================
  // GARMENTS — NEW LAWN COLLECTION
  // =====================================================

  {
    id: 56,
    name: "Blush Bloom Lawn",
    priceAED: 129,
    salePriceAED: null,
    onSale: false,

    category: "Garments",
    subCategory: "Lawn — Single Shirt Piece",

    image: "/products/garment-3.jpg",

    description:
      "A graceful premium Lawn fabric featuring an elegant printed design and a lightweight breathable feel. Perfect for creating a fresh and sophisticated warm-weather look. Currently out of stock, but this design can be made on order.",

    details: {
      material: "Premium Lawn",
      fabricLength: "3.5 Yards",
      type: "Single Shirt Piece",
      occasion: "Everyday & Summer Wear",
    },
  },

  {
    id: 57,
    name: "Rose Garden Lawn",
    priceAED: 139,
    salePriceAED: null,
    onSale: false,

    category: "Garments",
    subCategory: "Lawn — Single Shirt Piece",

    image: "/products/garment-4.jpg",

    description:
      "A beautifully detailed premium Lawn shirt piece designed with elegant floral-inspired styling. Lightweight, breathable and ideal for effortless seasonal dressing. Currently out of stock, but this design can be made on order.",

    details: {
      material: "Premium Lawn",
      fabricLength: "3.5 Yards",
      type: "Single Shirt Piece",
      occasion: "Everyday & Festive Wear",
    },
  },

  {
    id: 58,
    name: "Ivory Garden Lawn",
    priceAED: 139,
    salePriceAED: null,
    onSale: false,

    category: "Garments",
    subCategory: "Lawn — Single Shirt Piece",

    image: "/products/garment-5.jpg",

    description:
      "An elegant premium Lawn fabric with refined detailing and a soft sophisticated aesthetic. Perfect for creating a graceful custom shirt for summer and festive styling.",

    details: {
      material: "Premium Lawn",
      fabricLength: "3.5 Yards",
      type: "Single Shirt Piece",
      occasion: "Summer & Occasion Wear",
    },
  },

  {
    id: 59,
    name: "Pastel Dream Lawn",
    priceAED: 149,
    salePriceAED: null,
    onSale: false,

    category: "Garments",
    subCategory: "Lawn — 2 Piece",

    image: "/products/garment-6.jpg",

    description:
      "A premium Lawn 2-piece fabric collection featuring elegant seasonal detailing and a lightweight breathable texture. Ideal for polished everyday and semi-formal looks.",

    details: {
      material: "Premium Lawn",
      fabricLength: "6 Yards",
      type: "2-Piece Fabric",
      occasion: "Summer & Semi-Formal Wear",
    },
  },

  {
    id: 60,
    name: "Golden Bloom Lawn",
    priceAED: 159,
    salePriceAED: null,
    onSale: false,

    category: "Garments",
    subCategory: "Lawn — 2 Piece",

    image: "/products/garment-7.jpg",

    description:
      "A sophisticated premium Lawn 2-piece fabric design with elegant decorative detailing. Designed for graceful festive, summer and semi-formal styling.",

    details: {
      material: "Premium Lawn",
      fabricLength: "6 Yards",
      type: "2-Piece Fabric",
      occasion: "Festive & Semi-Formal Wear",
    },
  },

  {
    id: 61,
    name: "Pearl Blossom Lawn",
    priceAED: 169,
    salePriceAED: null,
    onSale: false,

    category: "Garments",
    subCategory: "Lawn — 2 Piece",

    image: "/products/garment-8.jpg",

    description:
      "A luxurious premium Lawn 2-piece fabric collection with graceful detailing and a refined finish. Perfect for creating elegant festive and occasion-ready outfits.",

    details: {
      material: "Premium Lawn",
      fabricLength: "6 Yards",
      type: "2-Piece Fabric",
      occasion: "Festive & Formal Wear",
    },
  },

  {
    id: 62,
    name: "Royal Garden Lawn",
    priceAED: 179,
    salePriceAED: null,
    onSale: false,

    category: "Garments",
    subCategory: "Lawn — 2 Piece",

    image: "/products/garment-9.jpg",

    description:
      "A premium statement Lawn 2-piece collection featuring sophisticated detailing and an elegant finish. Designed for stylish festive celebrations and special occasions.",

    details: {
      material: "Premium Lawn",
      fabricLength: "6 Yards",
      type: "2-Piece Fabric",
      occasion: "Festive & Special Occasions",
    },
  },
];

export default products;