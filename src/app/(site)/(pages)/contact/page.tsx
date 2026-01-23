import Contact from "@/components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim | NextTekno - Bize Ulaşın",
  description: "NextTekno ile iletişime geçin. Müşteri hizmetleri, teknik destek ve sorularınız için bizimle iletişime geçebilirsiniz. 7/24 destek.",
  keywords: [
    "iletişim",
    "müşteri hizmetleri",
    "teknik destek",
    "NextTekno iletişim",
    "bize ulaşın",
    "destek",
    "yardım",
    "contact"
  ],
  openGraph: {
    title: "İletişim | NextTekno",
    description: "NextTekno ile iletişime geçin. 7/24 müşteri desteği.",
    url: 'https://nexttekno.com/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: "İletişim | NextTekno",
    description: "NextTekno ile iletişime geçin",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/contact',
  },
};

const ContactPage = () => {
  return (
    <main>
      <Contact />
    </main>
  );
};

export default ContactPage;
