import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import products from "../data/Products";
import { useCart } from "../context/CartContext";

const SITE_URL = "https://amnafacollective.com";
const BRAND_NAME = "F&A Collective Fashion & Jewellery";
const DEFAULT_IMAGE = `${SITE_URL}/logo/fa-logo.jpg`;

const DEFAULT_DESCRIPTION =
  "Shop curated artificial jewellery, elegant jewellery sets and Kundan clutches online at F&A Collective. Explore occasion-ready styles with delivery within the UAE.";

const RETURN_POLICY_ID = `${SITE_URL}/returns-exchanges#merchant-return-policy`;
const MERCHANT_RETURN_POLICY = {
  "@type": "MerchantReturnPolicy",
  "@id": RETURN_POLICY_ID,
  applicableCountry: "AE",
  returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
  merchantReturnDays: 3,
  merchantReturnLink: `${SITE_URL}/returns-exchanges`,
};

function upsertMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function upsertCanonical(url) {
  let element = document.head.querySelector('link[rel="canonical"]');

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }

  element.setAttribute("href", url);
}

function upsertJsonLd(data) {
  let element = document.getElementById("site-seo-jsonld");

  if (!element) {
    element = document.createElement("script");
    element.id = "site-seo-jsonld";
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(data).replace(/</g, "\\u003c");
}

function getPageMetadata(pathname, search, inventoryStatus = "checking") {
  const params = new URLSearchParams(search);

  if (pathname === "/") {
    return {
      title: "Artificial Jewellery & Kundan Clutches in UAE | F&A Collective",
      description: DEFAULT_DESCRIPTION,
      canonical: `${SITE_URL}/`,
      image: DEFAULT_IMAGE,
      type: "website",
      schema: {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": `${SITE_URL}/#organization`,
            name: BRAND_NAME,
            url: `${SITE_URL}/`,
            logo: DEFAULT_IMAGE,
            description: DEFAULT_DESCRIPTION,
            hasMerchantReturnPolicy: MERCHANT_RETURN_POLICY,
          },
          {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            name: BRAND_NAME,
            url: `${SITE_URL}/`,
            publisher: { "@id": `${SITE_URL}/#organization` },
            inLanguage: "en-AE",
          },
        ],
      },
    };
  }

  if (pathname === "/shop") {
    const category = params.get("category");
    const subCategory = params.get("subCategory");
    const isSale = params.get("sale") === "true";
    let title = "Shop Artificial Jewellery Online in UAE | F&A Collective";
    let description =
      "Browse the F&A Collective collection of artificial jewellery, jewellery sets and elegant accessories. Shop online with UAE delivery.";

    if (category === "Jewellery") {
      title = "Artificial Jewellery Online in Dubai & UAE | F&A Collective";
      description =
        "Discover artificial jewellery online at F&A Collective, including elegant jewellery sets, necklaces, earrings and occasion-ready designs. UAE delivery only.";
    } else if (category === "Accessories") {
      title = "Kundan Clutches Online in UAE | F&A Collective";
      description =
        "Explore embellished Kundan clutches for weddings, festive celebrations and special occasions at F&A Collective. Shop online with UAE delivery.";
    } else if (category === "Garments") {
      title = "Garments Collection | F&A Collective";
      description = "Explore the F&A Collective garments collection.";
    }

    if (subCategory) {
      title = `${subCategory} in UAE | F&A Collective`;
      description = `Explore ${subCategory.toLowerCase()} at F&A Collective. Discover curated designs and shop online with delivery within the UAE.`;
    }

    if (isSale) {
      title = "Jewellery Offers & Sale in UAE | F&A Collective";
      description =
        "Explore selected jewellery offers at F&A Collective. Shop available artificial jewellery and accessories online with UAE delivery.";
    }

    const canonicalQuery = new URLSearchParams();
    if (category) canonicalQuery.set("category", category);
    if (subCategory) canonicalQuery.set("subCategory", subCategory);
    if (isSale) canonicalQuery.set("sale", "true");
    const query = canonicalQuery.toString();

    return {
      title,
      description,
      canonical: `${SITE_URL}/shop${query ? `?${query}` : ""}`,
      image: DEFAULT_IMAGE,
      type: "website",
      schema: {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: title,
        description,
        url: `${SITE_URL}/shop${query ? `?${query}` : ""}`,
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
    };
  }

  const productMatch = pathname.match(/^\/product\/(\d+)\/?$/);
  if (productMatch) {
    const product = products.find(
      (item) => String(item.id) === String(productMatch[1])
    );

    if (product) {
      const price =
        product.onSale === true && Number(product.salePriceAED) > 0
          ? Number(product.salePriceAED)
          : Number(product.priceAED ?? product.price);

      const details = product.description || `${product.name} from F&A Collective.`;
      const description =
        `${details} Shop online at F&A Collective with delivery within the UAE.`
          .replace(/\s+/g, " ")
          .slice(0, 300);
      const image = product.image?.startsWith("http")
        ? product.image
        : `${SITE_URL}${product.image || "/logo/fa-logo.jpg"}`;
      const canonical = `${SITE_URL}/product/${product.id}`;
      const availability = inventoryStatus === "available"
        ? "https://schema.org/InStock"
        : ["sold", "reserved"].includes(inventoryStatus)
          ? "https://schema.org/OutOfStock"
          : null;

      return {
        title: `${product.name} | F&A Collective UAE`,
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
            name: "F&A Collective",
          },
          offers: {
            "@type": "Offer",
            url: canonical,
            price: Number(price.toFixed(2)),
            priceCurrency: "AED",
            hasMerchantReturnPolicy: { "@id": RETURN_POLICY_ID },
            ...(availability ? { availability } : {}),
          },
          material: product.details?.material,
        },
      };
    }
  }

  if (pathname === "/returns-exchanges") {
    return {
      title: "Returns & Exchanges | F&A Collective UAE",
      description:
        "Read the F&A Collective returns and exchanges information before placing your UAE order.",
      canonical: `${SITE_URL}/returns-exchanges`,
      image: DEFAULT_IMAGE,
      type: "website",
      schema: {
        "@context": "https://schema.org",
        ...MERCHANT_RETURN_POLICY,
      },
    };
  }

  return {
    title: BRAND_NAME,
    description: DEFAULT_DESCRIPTION,
    canonical: `${SITE_URL}${pathname}`,
    image: DEFAULT_IMAGE,
    type: "website",
  };
}

export default function SEO() {
  const location = useLocation();
  const { inventory, inventoryReady } = useCart();

  useEffect(() => {
    const productMatch = location.pathname.match(/^\/product\/(\d+)\/?$/);
    const inventoryStatus = productMatch
      ? inventoryReady
        ? inventory[String(productMatch[1])]?.status || "available"
        : "checking"
      : "checking";
    const metadata = getPageMetadata(location.pathname, location.search, inventoryStatus);

    document.title = metadata.title;
    upsertMeta("name", "description", metadata.description);
    upsertMeta("name", "robots", "index, follow, max-image-preview:large");
    upsertMeta("property", "og:type", metadata.type || "website");
    upsertMeta("property", "og:site_name", BRAND_NAME);
    upsertMeta("property", "og:title", metadata.title);
    upsertMeta("property", "og:description", metadata.description);
    upsertMeta("property", "og:url", metadata.canonical);
    upsertMeta("property", "og:image", metadata.image || DEFAULT_IMAGE);
    upsertMeta("property", "og:locale", "en_AE");
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", metadata.title);
    upsertMeta("name", "twitter:description", metadata.description);
    upsertMeta("name", "twitter:image", metadata.image || DEFAULT_IMAGE);
    upsertCanonical(metadata.canonical);

    if (metadata.schema) {
      upsertJsonLd(metadata.schema);
    } else {
      const existing = document.getElementById("site-seo-jsonld");
      if (existing) existing.remove();
    }
  }, [location.pathname, location.search, inventory, inventoryReady]);

  return null;
}
