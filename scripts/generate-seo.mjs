import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import products from "../src/data/Products.js";

const SITE_URL = "https://amnafacollective.com";
const BRAND = "F&A Collective";
const DIST = path.resolve("dist");
const DEFAULT_DESCRIPTION =
  "Shop curated artificial jewellery, elegant jewellery sets and Kundan clutches online at F&A Collective. Explore occasion-ready styles with delivery within the UAE.";

const escapeHtml = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const escapeXml = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

function upsertMeta(html, attribute, key, value) {
  const opening = '<meta ' + attribute + '="' + key + '"';
  const start = html.indexOf(opening);
  const tag =
    '<meta ' + attribute + '="' + escapeHtml(key) +
    '" content="' + escapeHtml(value) + '" />';

  if (start === -1) {
    return html.replace("</head>", "  " + tag + "\n  </head>");
  }

  const end = html.indexOf(">", start);
  return html.slice(0, start) + tag + html.slice(end + 1);
}

function upsertCanonical(html, url) {
  const opening = '<link rel="canonical"';
  const start = html.indexOf(opening);
  const tag = '<link rel="canonical" href="' + escapeHtml(url) + '" />';

  if (start === -1) {
    return html.replace("</head>", "  " + tag + "\n  </head>");
  }

  const end = html.indexOf(">", start);
  return html.slice(0, start) + tag + html.slice(end + 1);
}

function setTitle(html, title) {
  const start = html.indexOf("<title>");
  const end = html.indexOf("</title>", start);

  if (start === -1 || end === -1) {
    return html.replace("</head>", "  <title>" + escapeHtml(title) + "</title>\n  </head>");
  }

  return (
    html.slice(0, start) +
    "<title>" + escapeHtml(title) + "</title>" +
    html.slice(end + "</title>".length)
  );
}

function applyMetadata(baseHtml, metadata, schema) {
  let html = setTitle(baseHtml, metadata.title);

  const values = [
    ["name", "description", metadata.description],
    ["name", "robots", "index, follow, max-image-preview:large"],
    ["property", "og:type", metadata.type || "website"],
    ["property", "og:site_name", "F&A Collective Fashion & Jewellery"],
    ["property", "og:title", metadata.title],
    ["property", "og:description", metadata.description],
    ["property", "og:url", metadata.canonical],
    ["property", "og:image", metadata.image],
    ["property", "og:locale", "en_AE"],
    ["name", "twitter:card", "summary_large_image"],
    ["name", "twitter:title", metadata.title],
    ["name", "twitter:description", metadata.description],
    ["name", "twitter:image", metadata.image],
  ];

  for (const [attribute, key, value] of values) {
    html = upsertMeta(html, attribute, key, value);
  }

  html = upsertCanonical(html, metadata.canonical);

  if (schema) {
    const json = JSON.stringify(schema).replace(/</g, "\\u003c");
    const script =
      '<script id="site-seo-jsonld" type="application/ld+json">' +
      json +
      "</script>";
    html = html.replace("</head>", "  " + script + "\n  </head>");
  }

  return html;
}

function productMetadata(product) {
  const descriptionText =
    product.description || (product.name + " from F&A Collective.");
  const description =
    (descriptionText + " Shop online at F&A Collective with delivery within the UAE.")
      .replace(/\s+/g, " ")
      .slice(0, 300);
  const image = product.image && product.image.startsWith("http")
    ? product.image
    : SITE_URL + (product.image || "/logo/fa-logo.jpg");
  const canonical = SITE_URL + "/product/" + product.id;

  return {
    title: product.name + " | F&A Collective UAE",
    description,
    canonical,
    image,
    type: "product",
    schema: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description,
      image: [image],
      sku: String(product.id),
      category: [product.category, product.subCategory].filter(Boolean).join(" > "),
      brand: {
        "@type": "Brand",
        name: BRAND,
      },
      offers: {
        "@type": "Offer",
        url: canonical,
        price: Number((
          product.onSale === true && Number(product.salePriceAED) > 0
            ? product.salePriceAED
            : product.priceAED ?? product.price
        ).toFixed(2)),
        priceCurrency: "AED",
      },
      ...(product.details && product.details.material
        ? { material: product.details.material }
        : {}),
    },
  };
}

const baseHtml = await readFile(path.join(DIST, "index.html"), "utf8");

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": SITE_URL + "/#organization",
      name: "F&A Collective Fashion & Jewellery",
      url: SITE_URL + "/",
      logo: SITE_URL + "/logo/fa-logo.jpg",
      description: DEFAULT_DESCRIPTION,
    },
    {
      "@type": "WebSite",
      "@id": SITE_URL + "/#website",
      name: "F&A Collective Fashion & Jewellery",
      url: SITE_URL + "/",
      publisher: { "@id": SITE_URL + "/#organization" },
      inLanguage: "en-AE",
    },
  ],
};

const homeMetadata = {
  title: "Artificial Jewellery & Kundan Clutches in UAE | F&A Collective",
  description: DEFAULT_DESCRIPTION,
  canonical: SITE_URL + "/",
  image: SITE_URL + "/logo/fa-logo.jpg",
  type: "website",
};

const shopMetadata = {
  title: "Shop Artificial Jewellery Online in UAE | F&A Collective",
  description:
    "Browse artificial jewellery, elegant jewellery sets, earrings and Kundan clutches at F&A Collective. Shop online with delivery within the UAE.",
  canonical: SITE_URL + "/shop",
  image: SITE_URL + "/logo/fa-logo.jpg",
  type: "website",
};

const shopSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: shopMetadata.title,
  description: shopMetadata.description,
  url: shopMetadata.canonical,
  isPartOf: { "@id": SITE_URL + "/#website" },
};

await writeFile(
  path.join(DIST, "index.html"),
  applyMetadata(baseHtml, homeMetadata, homeSchema),
  "utf8"
);

await mkdir(path.join(DIST, "shop"), { recursive: true });
await writeFile(
  path.join(DIST, "shop", "index.html"),
  applyMetadata(baseHtml, shopMetadata, shopSchema),
  "utf8"
);

const urls = [
  { loc: SITE_URL + "/", image: SITE_URL + "/logo/fa-logo.jpg" },
  { loc: SITE_URL + "/shop", image: SITE_URL + "/logo/fa-logo.jpg" },
  {
    loc: SITE_URL + "/shop?category=Jewellery",
    image: SITE_URL + "/products/jewellery-35.jpg",
  },
  {
    loc: SITE_URL + "/shop?category=Accessories",
    image: SITE_URL + "/products/kundan-clutch-1.jpg",
  },
];

for (const product of products) {
  const metadata = productMetadata(product);
  const relativePath = path.join("product", String(product.id), "index.html");
  const fullPath = path.join(DIST, relativePath);

  await mkdir(path.dirname(fullPath), { recursive: true });
  await writeFile(
    fullPath,
    applyMetadata(baseHtml, metadata, metadata.schema),
    "utf8"
  );

  urls.push({
    loc: metadata.canonical,
    image: metadata.image,
  });
}

const xmlUrls = urls
  .map(({ loc, image }) => {
    const imageTag = image
      ? "<image:image><image:loc>" + escapeXml(image) + "</image:loc></image:image>"
      : "";
    return (
      "  <url><loc>" + escapeXml(loc) + "</loc><lastmod>" +
      new Date().toISOString().slice(0, 10) + "</lastmod>" +
      imageTag + "</url>"
    );
  })
  .join("\n");

const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ' +
  'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n' +
  xmlUrls + "\n</urlset>\n";

await writeFile(path.join(DIST, "sitemap.xml"), sitemap, "utf8");

console.log(
  "SEO assets generated: homepage, shop page, " +
  products.length + " product pages and sitemap.xml."
);
