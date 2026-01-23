import Signup from "@/components/Auth/Signup";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kayıt Ol | NextTekno - Ücretsiz Hesap Oluşturun",
  description: "NextTekno'ya ücretsiz kayıt olun. Özel kampanyalardan haberdar olun, siparişlerinizi takip edin ve hızlı alışveriş yapın.",
  keywords: [
    "kayıt ol",
    "üye ol",
    "hesap oluştur",
    "NextTekno kayıt",
    "ücretsiz üyelik",
    "yeni hesap",
    "register"
  ],
  openGraph: {
    title: "Kayıt Ol | NextTekno",
    description: "NextTekno'ya ücretsiz kayıt olun",
    url: 'https://nexttekno.com/signup',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: "Kayıt Ol | NextTekno",
    description: "NextTekno'ya ücretsiz kayıt olun",
  },
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: '/signup',
  },
};

const SignupPage = () => {
  return (
    <main>
      <Signup />
    </main>
  );
};

export default SignupPage;
