import MyAccount from "@/components/MyAccount";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hesabım | NextTekno - Kullanıcı Paneli",
  description: "NextTekno hesap yönetim paneli. Siparişlerinizi takip edin, adres bilgilerinizi güncelleyin ve hesap ayarlarınızı yönetin.",
  keywords: [
    "hesabım",
    "kullanıcı paneli",
    "hesap yönetimi",
    "NextTekno hesap",
    "sipariş takibi",
    "profil ayarları",
    "my account"
  ],
  openGraph: {
    title: "Hesabım | NextTekno",
    description: "Hesap yönetim paneli - siparişlerinizi takip edin",
    url: 'https://nexttekno.com/my-account',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: "Hesabım | NextTekno",
    description: "Hesap yönetim paneli",
  },
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: '/my-account',
  },
};

const MyAccountPage = () => {
  return (
    <main>
      <MyAccount />
    </main>
  );
};

export default MyAccountPage;
