import { Metadata } from "next";

export const siteConfig = {
  name: "NextTekno",
  description: "Türkiye'nin en büyük teknoloji mağazası",
  url: "https://nexttekno.com",
  ogImage: "/images/og-image.jpg",
  twitterHandle: "@nexttekno",
  keywords: [
    "teknoloji mağazası",
    "iPhone",
    "Samsung",
    "laptop",
    "akıllı telefon",
    "tablet",
    "kulaklık",
    "akıllı saat",
    "elektronik",
    "NextTekno"
  ]
};

export function generateMetadata({
  title,
  description,
  keywords = [],
  canonical,
  noIndex = false,
  ogImage,
}: {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  noIndex?: boolean;
  ogImage?: string;
}): Metadata {
  const fullTitle = title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`;
  const allKeywords = [...siteConfig.keywords, ...keywords];
  const canonicalUrl = canonical ? `${siteConfig.url}${canonical}` : undefined;
  const imageUrl = ogImage || siteConfig.ogImage;

  return {
    title: fullTitle,
    description,
    keywords: allKeywords,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonical || "/",
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl || siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: "tr_TR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: siteConfig.twitterHandle,
      site: siteConfig.twitterHandle,
    },
    robots: {
      index: !noIndex,
      follow: true,
      nocache: false,
      googleBot: {
        index: !noIndex,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "google-site-verification-code",
      yandex: "yandex-verification-code",
    },
  };
}

export function generateProductStructuredData(product: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    brand: {
      "@type": "Brand",
      name: product.brand || siteConfig.name,
    },
    description: product.description || `${product.name} - ${product.brand || siteConfig.name} markası`,
    image: product.image || `${siteConfig.url}/images/products/default.jpg`,
    sku: product.id?.toString(),
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "TRY",
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: siteConfig.name,
      },
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    },
    aggregateRating: product.reviewCount > 0 ? {
      "@type": "AggregateRating",
      ratingValue: product.rating || 4.5,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1,
    } : undefined,
    category: product.category || "Teknoloji",
  };
}

export function generateCategoryStructuredData(category: any, productCount: number) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name} Ürünleri`,
    description: `${category.name} kategorisinde ${productCount}+ ürün`,
    url: `${siteConfig.url}/kategori/${category.slug}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: productCount,
      itemListElement: category.children?.map((subcat: any, index: number) => ({
        "@type": "ListItem",
        position: index + 1,
        name: subcat.name,
        url: `${siteConfig.url}/kategori/${subcat.slug}`,
      })) || [],
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Ana Sayfa",
          item: siteConfig.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: category.name,
          item: `${siteConfig.url}/kategori/${category.slug}`,
        },
      ],
    },
  };
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export const commonFAQs = [
  {
    question: "NextTekno'da kargo ücretsiz mi?",
    answer: "Evet, NextTekno'da tüm siparişlerde kargo ücretsizdir. Türkiye'nin her yerine hızlı ve güvenli teslimat yapıyoruz.",
  },
  {
    question: "Taksit imkanı var mı?",
    answer: "Evet, tüm kredi kartlarına 12 aya varan taksit imkanı sunuyoruz. Ayrıca 0% faiz kampanyalarımızdan da yararlanabilirsiniz.",
  },
  {
    question: "İade politikanız nasıl?",
    answer: "14 gün içinde koşulsuz iade hakkınız bulunmaktadır. Ürünü orijinal ambalajında ve hasarsız şekilde iade edebilirsiniz.",
  },
  {
    question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
    answer: "Kredi kartı, banka kartı, havale/EFT ve kapıda ödeme seçeneklerini kabul ediyoruz. Tüm ödemeler SSL ile güvence altındadır.",
  },
];

export function generateOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo-orange.svg`,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Teknoloji Caddesi No:1",
      addressLocality: "İstanbul",
      addressRegion: "İstanbul",
      postalCode: "34000",
      addressCountry: "TR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+90-212-555-0000",
      contactType: "customer service",
      availableLanguage: ["Turkish", "English"],
    },
    sameAs: [
      "https://facebook.com/nexttekno",
      "https://twitter.com/nexttekno",
      "https://instagram.com/nexttekno",
      "https://linkedin.com/company/nexttekno",
    ],
  };
}