import Home from "@/components/Home";
import HepsiburadaHome from "@/components/Home/HepsiburadaStyle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NextTekno | Türkiye'nin En Büyük Teknoloji Mağazası - iPhone, Samsung, Laptop",
  description: "NextTekno'da en uygun fiyatlı iPhone, Samsung, MacBook, laptop, akıllı telefon ve teknoloji ürünleri. Ücretsiz kargo, hızlı teslimat, güvenli alışveriş. Taksit imkanı!",
  keywords: [
    "teknoloji mağazası",
    "iPhone 15",
    "Samsung Galaxy",
    "MacBook",
    "laptop",
    "akıllı telefon",
    "tablet",
    "kulaklık",
    "akıllı saat",
    "oyun konsolu",
    "elektronik",
    "teknoloji ürünleri",
    "online alışveriş",
    "ücretsiz kargo",
    "taksit imkanı",
    "NextTekno"
  ],
  authors: [{ name: "NextTekno" }],
  creator: "NextTekno",
  publisher: "NextTekno",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://nexttekno.com'),
  alternates: {
    canonical: '/',
    languages: {
      'tr-TR': '/tr',
      'en-US': '/en',
    },
  },
  openGraph: {
    title: "NextTekno | Türkiye'nin En Büyük Teknoloji Mağazası",
    description: "En uygun fiyatlı iPhone, Samsung, MacBook ve teknoloji ürünleri. Ücretsiz kargo, hızlı teslimat!",
    url: 'https://nexttekno.com',
    siteName: 'NextTekno',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NextTekno - Teknoloji Mağazası',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "NextTekno | Türkiye'nin En Büyük Teknoloji Mağazası",
    description: "En uygun fiyatlı iPhone, Samsung, MacBook ve teknoloji ürünleri. Ücretsiz kargo!",
    images: ['/images/twitter-image.jpg'],
    creator: '@nexttekno',
    site: '@nexttekno',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
    yahoo: 'yahoo-verification-code',
  },
  category: 'technology',
};

export default function HomePage() {
  return (
    <>
      {/* Hepsiburada Style Homepage */}
      <HepsiburadaHome />
      
      {/* Original Homepage - Comment out to use Hepsiburada style */}
      {/* <Home /> */}
    </>
  );
}
