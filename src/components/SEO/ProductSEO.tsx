"use client";
import Head from "next/head";
import { Product } from "@/types/product";

interface ProductSEOProps {
  product: Product;
}

const ProductSEO: React.FC<ProductSEOProps> = ({ product }) => {
  const productName = product.name;
  const brand = product.brand || "NextTekno";
  const price = product.price;
  const originalPrice = product.originalPrice;
  const rating = product.rating || 4.5;
  const reviewCount = product.reviewCount || 0;
  const availability = product.stock > 0 ? "InStock" : "OutOfStock";

  return (
    <Head>
      <title>{`${productName} | ${brand} - NextTekno`}</title>
      <meta 
        name="description" 
        content={`${productName} ürününü NextTekno'da satın alın. ${brand} markası, ₺${price.toLocaleString('tr-TR')} fiyat. Ücretsiz kargo, hızlı teslimat!`} 
      />
      <meta 
        name="keywords" 
        content={`${productName.toLowerCase()}, ${brand.toLowerCase()}, ${productName.toLowerCase()} fiyat, ${brand.toLowerCase()} ${productName.toLowerCase()}, teknoloji, NextTekno`} 
      />
      
      {/* Open Graph */}
      <meta property="og:title" content={`${productName} | ${brand}`} />
      <meta property="og:description" content={`${productName} - ₺${price.toLocaleString('tr-TR')} - NextTekno'da!`} />
      <meta property="og:type" content="product" />
      <meta property="og:image" content={product.image || `https://nexttekno.com/images/products/default.jpg`} />
      <meta property="product:price:amount" content={price.toString()} />
      <meta property="product:price:currency" content="TRY" />
      <meta property="product:availability" content={availability} />
      <meta property="product:brand" content={brand} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${productName} | ${brand}`} />
      <meta name="twitter:description" content={`₺${price.toLocaleString('tr-TR')} - NextTekno'da!`} />
      <meta name="twitter:image" content={product.image || `https://nexttekno.com/images/products/default.jpg`} />
      
      {/* Product JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": productName,
            "brand": {
              "@type": "Brand",
              "name": brand
            },
            "description": product.description || `${productName} - ${brand} markası`,
            "image": product.image || `https://nexttekno.com/images/products/default.jpg`,
            "sku": product.id.toString(),
            "offers": {
              "@type": "Offer",
              "price": price,
              "priceCurrency": "TRY",
              "availability": `https://schema.org/${availability}`,
              "seller": {
                "@type": "Organization",
                "name": "NextTekno"
              },
              "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            },
            "aggregateRating": reviewCount > 0 ? {
              "@type": "AggregateRating",
              "ratingValue": rating,
              "reviewCount": reviewCount,
              "bestRating": 5,
              "worstRating": 1
            } : undefined,
            "category": product.category || "Teknoloji",
            "productID": product.id.toString()
          })
        }}
      />

      {/* Breadcrumb JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Ana Sayfa",
                "item": "https://nexttekno.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": product.category || "Ürünler",
                "item": `https://nexttekno.com/kategori/${(product.category || 'urunler').toLowerCase().replace(/\s+/g, '-')}`
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": productName,
                "item": `https://nexttekno.com/urun/${product.id}`
              }
            ]
          })
        }}
      />
    </Head>
  );
};

export default ProductSEO;