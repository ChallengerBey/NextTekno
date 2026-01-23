"use client";
import "../css/euclid-circular-a-font.css";
import "../css/style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { ModalProvider } from "../context/QuickViewModalContext";
import { CartModalProvider } from "../context/CartSidebarModalContext";
import { ReduxProvider } from "@/redux/provider";
import QuickViewModal from "@/components/Common/QuickViewModal";
import CartSidebarModal from "@/components/Common/CartSidebarModal";
import { PreviewSliderProvider } from "../context/PreviewSliderContext";
import PreviewSliderModal from "@/components/Common/PreviewSlider";
import { AdminProvider } from "../context/AdminContext";
import { ThemeProvider } from "../context/ThemeContext";
import Breadcrumbs from "@/components/Common/Breadcrumbs";

import { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import ScrollToTop from "@/components/Common/ScrollToTop";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning={true}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "NextTekno",
              "url": "https://nexttekno.com",
              "logo": "https://nexttekno.com/logo-orange.svg",
              "description": "Türkiye'nin en büyük teknoloji mağazası. iPhone, Samsung, MacBook ve teknoloji ürünleri.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Teknoloji Caddesi No:1",
                "addressLocality": "İstanbul",
                "addressRegion": "İstanbul",
                "postalCode": "34000",
                "addressCountry": "TR"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+90-212-555-0000",
                "contactType": "customer service",
                "availableLanguage": ["Turkish", "English"]
              },
              "sameAs": [
                "https://facebook.com/nexttekno",
                "https://twitter.com/nexttekno",
                "https://instagram.com/nexttekno",
                "https://linkedin.com/company/nexttekno"
              ]
            })
          }}
        />
        
        {/* Website JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "NextTekno",
              "url": "https://nexttekno.com",
              "description": "Türkiye'nin en büyük teknoloji mağazası",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://nexttekno.com/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

        {/* Store JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              "name": "NextTekno",
              "image": "https://nexttekno.com/logo-orange.svg",
              "description": "Teknoloji ürünleri mağazası",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Teknoloji Caddesi No:1",
                "addressLocality": "İstanbul",
                "addressRegion": "İstanbul",
                "postalCode": "34000",
                "addressCountry": "TR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "41.0082",
                "longitude": "28.9784"
              },
              "url": "https://nexttekno.com",
              "telephone": "+90-212-555-0000",
              "priceRange": "₺₺",
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday",
                    "Tuesday", 
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday"
                  ],
                  "opens": "00:00",
                  "closes": "23:59"
                }
              ]
            })
          }}
        />

        {/* LocalBusiness JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://nexttekno.com/#business",
              "name": "NextTekno",
              "image": "https://nexttekno.com/logo-orange.svg",
              "description": "Türkiye'nin en büyük teknoloji mağazası",
              "url": "https://nexttekno.com",
              "telephone": "+90-212-555-0000",
              "email": "info@nexttekno.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Teknoloji Caddesi No:1",
                "addressLocality": "İstanbul",
                "addressRegion": "İstanbul",
                "postalCode": "34000",
                "addressCountry": "TR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "41.0082",
                "longitude": "28.9784"
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                  "opens": "00:00",
                  "closes": "23:59"
                }
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "2547",
                "bestRating": "5",
                "worstRating": "1"
              },
              "paymentAccepted": ["Cash", "Credit Card", "Debit Card", "Bank Transfer"],
              "currenciesAccepted": "TRY"
            })
          }}
        />

        {/* FAQ JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "NextTekno'da kargo ücretsiz mi?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Evet, NextTekno'da tüm siparişlerde kargo ücretsizdir. Türkiye'nin her yerine hızlı ve güvenli teslimat yapıyoruz."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Taksit imkanı var mı?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Evet, tüm kredi kartlarına 12 aya varan taksit imkanı sunuyoruz. Ayrıca 0% faiz kampanyalarımızdan da yararlanabilirsiniz."
                  }
                },
                {
                  "@type": "Question",
                  "name": "İade politikanız nasıl?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "14 gün içinde koşulsuz iade hakkınız bulunmaktadır. Ürünü orijinal ambalajında ve hasarsız şekilde iade edebilirsiniz."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Kredi kartı, banka kartı, havale/EFT ve kapıda ödeme seçeneklerini kabul ediyoruz. Tüm ödemeler SSL ile güvence altındadır."
                  }
                }
              ]
            })
          }}
        />

        {/* BreadcrumbList JSON-LD */}
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
                }
              ]
            })
          }}
        />
      </head>
      <body>
        <Toaster position="top-right" reverseOrder={false} />
        <ReduxProvider>
          <ThemeProvider>
            <AdminProvider>
              <CartModalProvider>
                <ModalProvider>
                  <PreviewSliderProvider>
                    {/* Original Header - Comment out for Hepsiburada style */}
                    {/* <Header /> */}
                    
                    {/* Breadcrumbs - Only show for non-home pages */}
                    {/* <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0 pt-36 lg:pt-44">
                      <Breadcrumbs />
                    </div> */}
                    
                    <AnimatePresence mode="wait">
                      <motion.main
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="min-h-screen"
                      >
                        {children}
                      </motion.main>
                    </AnimatePresence>
                    <QuickViewModal />
                    <CartSidebarModal />
                    <PreviewSliderModal />
                  </PreviewSliderProvider>
                </ModalProvider>
              </CartModalProvider>
            </AdminProvider>
          </ThemeProvider>
        </ReduxProvider>
        <ScrollToTop />
        <Footer />
      </body>
    </html>
  );
}
