const products = [
  // =====================================================
  // ACCESSORIES — KUNDAN CLUTCHES
  // =====================================================

  {
    id: 7,
    name: "Royal Kundan Clutch",
    priceAED: 189,
    category: "Accessories",
    subCategory: "Kundan Clutches",
    image: "/products/kundan-clutch-1.jpg",
    description:
      "A regal Kundan clutch featuring intricate embellishment and elegant traditional detailing. Perfect for weddings, festive celebrations and sophisticated evening looks.",
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
    category: "Accessories",
    subCategory: "Kundan Clutches",
    image: "/products/kundan-clutch-2.jpg",
    description:
      "A timeless Kundan clutch designed with classic detailing and a refined finish. An elegant accessory for festive gatherings, formal events and traditional outfits.",
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
    category: "Accessories",
    subCategory: "Kundan Clutches",
    image: "/products/kundan-clutch-3.jpg",
    description:
      "A luxurious statement Kundan clutch created to elevate your occasion wardrobe. Its detailed finish makes it an ideal companion for weddings, receptions and evening celebrations.",
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
    category: "Accessories",
    subCategory: "Kundan Clutches",
    image: "/products/kundan-clutch-4.jpg",
    description:
      "An elegant Kundan clutch featuring delicate traditional-inspired detailing and a graceful silhouette. Designed to beautifully complement festive and wedding ensembles.",
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
    category: "Accessories",
    subCategory: "Kundan Clutches",
    image: "/products/kundan-clutch-5.jpg",
    description:
      "A sophisticated Kundan clutch enhanced with beautiful pearl-inspired detailing. Perfect for adding a luxurious finishing touch to wedding, formal and festive outfits.",
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
    category: "Accessories",
    subCategory: "Kundan Clutches",
    image: "/products/kundan-clutch-6.jpg",
    description:
      "A signature Kundan clutch created for elegant festive and formal styling. Its traditional-inspired embellishment adds a luxurious statement to special occasion looks.",
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
    category: "Jewellery",
    subCategory: "Sets",
    image: "/products/jewellery-1.jpg",
    description:
      "An elegant artificial jewellery set designed to add effortless grace to your look. Its versatile styling makes it suitable for both traditional outfits and modern occasion wear.",
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
    category: "Jewellery",
    subCategory: "Designer Sets",
    image: "/products/jewellery-2.jpg",
    description:
      "A timeless artificial jewellery set with a refined designer-inspired appearance. Perfect for adding a polished finishing touch to dinners, gatherings and special occasions.",
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
    category: "Jewellery",
    subCategory: "Designer Sets",
    image: "/products/jewellery-3.jpg",
    description:
      "A striking artificial jewellery set designed to create an elegant statement. Beautiful detailing makes it an ideal choice for weddings, parties and festive celebrations.",
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
    category: "Jewellery",
    subCategory: "Designer Sets",
    image: "/products/jewellery-8.jpg",
    description:
      "A luxurious artificial jewellery design created for memorable occasions. Its sophisticated detailing adds a glamorous touch to wedding, formal and evening outfits.",
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
    category: "Jewellery",
    subCategory: "Designer Sets",
    image: "/products/jewellery-13.jpg",
    description:
      "A premium artificial jewellery set created to elevate your occasion wardrobe. Elegant detailing gives the piece a sophisticated appearance for celebrations and formal events.",
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
    category: "Jewellery",
    subCategory: "Designer Sets",
    image: "/products/jewellery-15.jpg",
    description:
      "A royal-inspired artificial jewellery set designed for grand celebrations. Its luxurious detailing makes it perfect for brides, wedding guests and festive occasions.",
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
    category: "Jewellery",
    subCategory: "Necklaces",
    image: "/products/jewellery-4.jpg",
    description:
      "A sophisticated artificial golden-finish necklace designed for timeless elegance. Its graceful design pairs beautifully with both traditional and contemporary outfits.",
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
    category: "Jewellery",
    subCategory: "Necklaces",
    image: "/products/jewellery-14.jpg",
    description:
      "A signature artificial golden-finish necklace combining classic elegance with contemporary styling. Perfect for adding a refined finishing touch to everyday and occasion looks.",
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
    category: "Jewellery",
    subCategory: "Everyday Jewellery",
    image: "/products/jewellery-5.jpg",
    description:
      "A delicate artificial pearl jewellery design offering a soft and graceful appearance. Easy to style with casual, semi-formal and everyday outfits.",
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
    category: "Jewellery",
    subCategory: "Everyday Jewellery",
    image: "/products/jewellery-9.jpg",
    description:
      "A subtle artificial golden-finish jewellery design created for effortless daily styling. Its delicate appearance makes it perfect for casual outings and everyday elegance.",
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
    category: "Jewellery",
    subCategory: "Sets",
    image: "/products/jewellery-6.jpg",
    description:
      "A beautiful artificial jewellery set designed to complement festive and traditional outfits. Elegant detailing adds a graceful finishing touch to celebrations and wedding gatherings.",
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
    category: "Jewellery",
    subCategory: "Earrings",
    image: "/products/jewellery-7.jpg",
    description:
      "Elegant artificial golden-finish earrings designed for effortless styling. Their versatile look works beautifully with traditional outfits, casual wear and special occasion looks.",
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
    category: "Jewellery",
    subCategory: "Traditional Sets",
    image: "/products/jewellery-10.jpg",
    description:
      "A traditional-inspired artificial jewellery set created to complement festive and wedding attire. Rich detailing gives the design a graceful cultural character for special celebrations.",
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
    category: "Jewellery",
    subCategory: "Statement Jewellery",
    image: "/products/jewellery-11.jpg",
    description:
      "A modern artificial jewellery piece designed to make a confident style statement. Its contemporary appearance is perfect for dinners, parties and fashionable occasions.",
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
    category: "Jewellery",
    subCategory: "Party Jewellery",
    image: "/products/jewellery-12.jpg",
    description:
      "An elegant artificial jewellery design made for parties, dinners and evening occasions. Its polished detailing adds a sophisticated finishing touch to your outfit.",
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
    category: "Garments",
    subCategory: "Lawn — Single Shirt Piece",
    image: "/products/garment-1.jpg",
    description:
      "A premium Lawn fabric selected for creating an elegant custom shirt. This is a single shirt piece with a lightweight, breathable feel, making it ideal for warm-weather and everyday styling.",
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
    category: "Garments",
    subCategory: "Lawn — 2 Piece",
    image: "/products/garment-2.jpg",
    description:
      "A beautiful Lawn fabric collection designed as a complete 2-piece outfit material. Comfortable and breathable, it is perfect for creating elegant festive, semi-formal and summer looks.",
    details: {
      material: "Premium Lawn",
      fabricLength: "6 Yards",
      type: "2-Piece Fabric",
      occasion: "Festive & Formal Wear",
    },
  },
];

export default products;