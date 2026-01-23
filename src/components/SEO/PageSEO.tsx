"use client";
import Head from "next/head";

interface PageSEOProps {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
  structuredData?: any;
}

const PageSEO: React.FC<PageSEOProps> = ({
  title,
  description,
  keywords = [],
  canonical,
  ogImage = "/images/og-default.jpg",
  noIndex = false,
  structuredData
}) => {
  const fullTitle = title.includes("NextTekno") ? title : `${title} | NextTekno`;
  const canonicalUrl = canonical ? `https://nexttekno.com${canonical}` : undefined;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      
      {/* Robots */}
      <meta name="robots" content={noIndex ? "noindex,follow" : "index,follow"} />
      
      {/* Canonical */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="NextTekno" />
      <meta property="og:image" content={`https://nexttekno.com${ogImage}`} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`https://nexttekno.com${ogImage}`} />
      <meta name="twitter:site" content="@nexttekno" />
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}
    </Head>
  );
};

export default PageSEO;