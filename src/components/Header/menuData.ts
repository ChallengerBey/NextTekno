import { Menu } from "@/types/Menu";

export const menuData: Menu[] = [
  {
    id: 1,
    title: "Popüler",
    newTab: false,
    path: "/",
  },
  {
    id: 2,
    title: "Mağaza",
    newTab: false,
    path: "/shop-with-sidebar",
    submenu: [
      {
        id: 21,
        title: "Televizyonlar",
        newTab: false,
        path: "/shop-with-sidebar",
      },
      {
        id: 22,
        title: "Dizüstü ve PC",
        newTab: false,
        path: "/shop-with-sidebar",
      },
      {
        id: 23,
        title: "Mobil ve Tabletler",
        newTab: false,
        path: "/shop-with-sidebar",
      },
      {
        id: 24,
        title: "Oyun ve Videolar",
        newTab: false,
        path: "/shop-with-sidebar",
      },
      {
        id: 25,
        title: "Ev Aletleri",
        newTab: false,
        path: "/shop-with-sidebar",
      },
      {
        id: 26,
        title: "Saatler",
        newTab: false,
        path: "/shop-with-sidebar",
      },
    ],
  },
  {
    id: 3,
    title: "İletişim",
    newTab: false,
    path: "/contact",
  },
  {
    id: 6,
    title: "Sayfalar",
    newTab: false,
    path: "/",
    submenu: [
      {
        id: 61,
        title: "Kenar Çubuklu Mağaza",
        newTab: false,
        path: "/shop-with-sidebar",
      },
      {
        id: 62,
        title: "Kenarlıksız Mağaza",
        newTab: false,
        path: "/shop-without-sidebar",
      },
      {
        id: 64,
        title: "Ödeme",
        newTab: false,
        path: "/checkout",
      },
      {
        id: 65,
        title: "Sepet",
        newTab: false,
        path: "/cart",
      },
      {
        id: 67,
        title: "Giriş Yap",
        newTab: false,
        path: "/signin",
      },
      {
        id: 68,
        title: "Kayıt Ol",
        newTab: false,
        path: "/signup",
      },
      {
        id: 69,
        title: "Hesabım",
        newTab: false,
        path: "/my-account",
      },
      {
        id: 70,
        title: "İletişim",
        newTab: false,
        path: "/contact",
      },
      {
        id: 62,
        title: "Hata",
        newTab: false,
        path: "/error",
      },
      {
        id: 63,
        title: "E-posta Başarılı",
        newTab: false,
        path: "/mail-success",
      },
    ],
  },

];
