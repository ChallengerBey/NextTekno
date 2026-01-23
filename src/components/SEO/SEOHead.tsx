"use client";
import Head from "next/head";
import { siteConfig } from "@/lib/seo";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
  structuredData?: any[];
  breadcrumbs?: Array<{ name: string; url: string }>;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords = [],
  canonical,
  ogImage,
  noIndex = false,
  structuredData = [],
  breadcrumbs = []
}) => {
  const fullTitle = title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`;
  const allKeywords = [...siteConfig.keywords, ...keywords];
  const canonicalUrl = canonical ? `${siteConfig.url}${canonical}` : undefined;
  const imageUrl = ogImage || siteConfig.ogImage;

  // Generate breadcrumb structured data if breadcrumbs are provided
  const breadcrumbStructuredData = breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  } : null;

  const allStructuredData = [
    ...structuredData,
    ...(breadcrumbStructuredData ? [breadcrumbStructuredData] : [])
  ];

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords.join(", ")} />
      <meta name="author" content={siteConfig.name} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Robots */}
      <meta name="robots" content={noIndex ? "noindex,follow" : "index,follow"} />
      <meta name="googlebot" content={noIndex ? "noindex,follow" : "index,follow"} />
      
      {/* Canonical */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:image" content={`${siteConfig.url}${imageUrl}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:locale" content="tr_TR" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteConfig.url}${imageUrl}`} />
      <meta name="twitter:site" content={siteConfig.twitterHandle} />
      <meta name="twitter:creator" content={siteConfig.twitterHandle} />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#F97316" />
      <meta name="msapplication-TileColor" content="#F97316" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={siteConfig.name} />
      
      {/* Structured Data */}
      {allStructuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data)
          }}
        />
      ))}
    </Head>
  );
};

export default SEOHead;