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
        id: 66,
        title: "Favorilerim",
        newTab: false,
        path: "/wishlist",
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
  {
    id: 7,
    title: "Blog",
    newTab: false,
    path: "/",
    submenu: [
      {
        id: 71,
        title: "Kenarlıklı Blog Listesi",
        newTab: false,
        path: "/blogs/blog-grid-with-sidebar",
      },
      {
        id: 72,
        title: "Blog Listesi",
        newTab: false,
        path: "/blogs/blog-grid",
      },
      {
        id: 73,
        title: "Kenarlıklı Blog Detayı",
        newTab: false,
        path: "/blogs/blog-details-with-sidebar",
      },
      {
        id: 74,
        title: "Blog Detayı",
        newTab: false,
        path: "/blogs/blog-details",
      },
    ],
  },
];
