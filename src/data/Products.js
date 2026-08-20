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
    id: 10,
    name: "Elegant Kundan Clutch",
    priceAED: 229,
    salePriceAED: null,
    onSale: false,

    category: "Accessories",
    subCategory: "Kundan Clutches",

    image: "/products/kundan-clutch-4.jpg",

    description:
      "An elegant Kundan clutch with delicate traditional-inspired detailing and a graceful silhouette. Designed to complement wedding, festive and formal outfits.",

    details: {
      material: "Kundan & Artificial Stones",
      type: "Kundan Clutch",
      occasion: "Weddings & Festive Wear",
    },
  },

  {
    id: 11,
    name: "Royal Pearl Kundan Clutch",
    priceAED: 239,
    salePriceAED: null,
    onSale: false,

    category: "Accessories",
    subCategory: "Kundan Clutches",

    image: "/products/kundan-clutch-5.jpg",

    description:
      "A sophisticated Kundan clutch enhanced with elegant pearl-inspired detailing and a refined finish. Perfect for weddings, formal events and festive occasions.",

    details: {
      material: "Kundan & Pearl Detailing",
      type: "Pearl Kundan Clutch",
      occasion: "Weddings & Formal Events",
    },
  },

  {
    id: 12,
    name: "Signature Kundan Clutch",
    priceAED: 249,
    salePriceAED: null,
    onSale: false,

    category: "Accessories",
    subCategory: "Kundan Clutches",

    image: "/products/kundan-clutch-6.jpg",

    description:
      "A signature Kundan clutch with traditional-inspired embellishment and a polished finish. Ideal for weddings, festive celebrations and formal events.",

    details: {
      material: "Kundan & Artificial Stones",
      type: "Signature Kundan Clutch",
      occasion: "Wedding & Formal Wear",
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
];

export default products;