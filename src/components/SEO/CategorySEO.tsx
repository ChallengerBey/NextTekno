"use client";
import Head from "next/head";
import { Category } from "@/lib/database";

interface CategorySEOProps {
  category: Category;
  productCount: number;
}

const CategorySEO: React.FC<CategorySEOProps> = ({ category, productCount }) => {
  const categoryName = category.name;
  const slug = category.slug;

  return (
    <Head>
      <title>{`${categoryName} Ürünleri | NextTekno - En Uygun Fiyatlar`}</title>
      <meta 
        name="description" 
        content={`${categoryName} kategorisinde ${productCount}+ ürün. En uygun fiyatlı ${categoryName.toLowerCase()} ürünleri NextTekno'da. Ücretsiz kargo, hızlı teslimat!`} 
      />
      <meta 
        name="keywords" 
        content={`${categoryName.toLowerCase()}, ${categoryName.toLowerCase()} ürünleri, ${categoryName.toLowerCase()} fiyatları, teknoloji, elektronik, NextTekno`} 
      />
      
      {/* Open Graph */}
      <meta property="og:title" content={`${categoryName} Ürünleri | NextTekno`} />
      <meta property="og:description" content={`${productCount}+ ${categoryName.toLowerCase()} ürünü. En uygun fiyatlar!`} />
      <meta property="og:url" content={`https://nexttekno.com/kategori/${slug}`} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={`https://nexttekno.com/images/categories/${slug}-og.jpg`} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${categoryName} Ürünleri | NextTekno`} />
      <meta name="twitter:description" content={`${productCount}+ ${categoryName.toLowerCase()} ürünü. En uygun fiyatlar!`} />
      
      {/* Canonical */}
      <link rel="canonical" href={`https://nexttekno.com/kategori/${slug}`} />
      
      {/* Category JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": `${categoryName} Ürünleri`,
            "description": `${categoryName} kategorisinde ${productCount}+ ürün`,
            "url": `https://nexttekno.com/kategori/${slug}`,
            "mainEntity": {
              "@type": "ItemList",
              "numberOfItems": productCount,
              "itemListElement": category.children?.map((subcat, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": subcat.name,
                "url": `https://nexttekno.com/kategori/${subcat.slug}`
              })) || []
            },
            "breadcrumb": {
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
                  "name": categoryName,
                  "item": `https://nexttekno.com/kategori/${slug}`
                }
              ]
            }
          })
        }}
      />

      {/* FAQ JSON-LD for category */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": `${categoryName} ürünlerinde hangi markalar var?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `NextTekno'da ${categoryName.toLowerCase()} kategorisinde Apple, Samsung, Xiaomi, Sony, LG ve daha birçok markanın ürünleri bulunmaktadır.`
                }
              },
              {
                "@type": "Question", 
                "name": `${categoryName} ürünlerinde kargo ücretsiz mi?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Evet, NextTekno'da tüm siparişlerde kargo ücretsizdir. Hızlı ve güvenli teslimat garantisi sunuyoruz."
                }
              },
              {
                "@type": "Question",
                "name": `${categoryName} ürünlerinde taksit imkanı var mı?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Evet, tüm kredi kartlarına 12 aya varan taksit imkanı sunuyoruz. Ayrıca 0% faiz kampanyalarımızdan da yararlanabilirsiniz."
                }
              }
            ]
          })
        }}
      />
    </Head>
  );
};

export default CategorySEO;