"use client";

// Kategori Yapısı
export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  parentId?: string;
  children?: Category[];
  productCount: number;
}

// Ürün Yapısı
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  categoryId: string;
  subcategoryId?: string;
  images: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  brand: string;
  features: string[];
  isFlashSale?: boolean;
  flashSaleEndTime?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// Ana Kategoriler
export const mainCategories: Category[] = [
  {
    id: "electronics",
    name: "Elektronik",
    slug: "elektronik",
    productCount: 1250,
    children: [
      {
        id: "phone-accessories",
        name: "Telefon & Aksesuar",
        slug: "telefon-aksesuar",
        parentId: "electronics",
        productCount: 450,
        children: [
          { id: "iphone", name: "iPhone", slug: "iphone", parentId: "phone-accessories", productCount: 120 },
          { id: "samsung", name: "Samsung", slug: "samsung", parentId: "phone-accessories", productCount: 95 },
          { id: "xiaomi", name: "Xiaomi", slug: "xiaomi", parentId: "phone-accessories", productCount: 80 },
          { id: "phone-cases", name: "Kılıf & Koruma", slug: "kilif-koruma", parentId: "phone-accessories", productCount: 200 },
          { id: "chargers", name: "Şarj Cihazları", slug: "sarj-cihazlari", parentId: "phone-accessories", productCount: 150 }
        ]
      },
      {
        id: "computer-tablet",
        name: "Bilgisayar & Tablet",
        slug: "bilgisayar-tablet",
        parentId: "electronics",
        productCount: 320,
        children: [
          { id: "laptops", name: "Laptop", slug: "laptop", parentId: "computer-tablet", productCount: 85 },
          { id: "desktop", name: "Masaüstü PC", slug: "masaustu-pc", parentId: "computer-tablet", productCount: 45 },
          { id: "tablets", name: "Tablet", slug: "tablet", parentId: "computer-tablet", productCount: 60 },
          { id: "monitors", name: "Monitör", slug: "monitor", parentId: "computer-tablet", productCount: 75 },
          { id: "keyboard-mouse", name: "Klavye & Mouse", slug: "klavye-mouse", parentId: "computer-tablet", productCount: 55 }
        ]
      },
      {
        id: "audio-video",
        name: "Ses & Görüntü",
        slug: "ses-goruntu",
        parentId: "electronics",
        productCount: 280,
        children: [
          { id: "headphones", name: "Kulaklık", slug: "kulaklik", parentId: "audio-video", productCount: 120 },
          { id: "speakers", name: "Hoparlör", slug: "hoparlor", parentId: "audio-video", productCount: 80 },
          { id: "microphones", name: "Mikrofon", slug: "mikrofon", parentId: "audio-video", productCount: 40 },
          { id: "sound-systems", name: "Ses Sistemleri", slug: "ses-sistemleri", parentId: "audio-video", productCount: 40 }
        ]
      },
      {
        id: "photo-camera",
        name: "Fotoğraf & Kamera",
        slug: "fotograf-kamera",
        parentId: "electronics",
        productCount: 150,
        children: [
          { id: "dslr", name: "DSLR Kamera", slug: "dslr-kamera", parentId: "photo-camera", productCount: 45 },
          { id: "action-camera", name: "Aksiyon Kamera", slug: "aksiyon-kamera", parentId: "photo-camera", productCount: 35 },
          { id: "lenses", name: "Objektif", slug: "objektif", parentId: "photo-camera", productCount: 40 },
          { id: "tripods", name: "Tripod", slug: "tripod", parentId: "photo-camera", productCount: 30 }
        ]
      },
      {
        id: "smart-watch",
        name: "Akıllı Saat",
        slug: "akilli-saat",
        parentId: "electronics",
        productCount: 180,
        children: [
          { id: "apple-watch", name: "Apple Watch", slug: "apple-watch", parentId: "smart-watch", productCount: 60 },
          { id: "samsung-watch", name: "Samsung Galaxy Watch", slug: "samsung-galaxy-watch", parentId: "smart-watch", productCount: 45 },
          { id: "huawei-watch", name: "Huawei Watch", slug: "huawei-watch", parentId: "smart-watch", productCount: 35 },
          { id: "watch-bands", name: "Kordon", slug: "kordon", parentId: "smart-watch", productCount: 40 }
        ]
      },
      {
        id: "gaming-console",
        name: "Oyun & Konsol",
        slug: "oyun-konsol",
        parentId: "electronics",
        productCount: 220,
        children: [
          { id: "playstation", name: "PlayStation", slug: "playstation", parentId: "gaming-console", productCount: 65 },
          { id: "xbox", name: "Xbox", slug: "xbox", parentId: "gaming-console", productCount: 55 },
          { id: "nintendo", name: "Nintendo", slug: "nintendo", parentId: "gaming-console", productCount: 40 },
          { id: "pc-games", name: "PC Oyunları", slug: "pc-oyunlari", parentId: "gaming-console", productCount: 35 },
          { id: "game-controllers", name: "Oyun Kolları", slug: "oyun-kollari", parentId: "gaming-console", productCount: 25 }
        ]
      },
      {
        id: "tv-audio",
        name: "TV & Ses Sistemleri",
        slug: "tv-ses-sistemleri",
        parentId: "electronics",
        productCount: 160,
        children: [
          { id: "smart-tv", name: "Smart TV", slug: "smart-tv", parentId: "tv-audio", productCount: 70 },
          { id: "soundbar", name: "Soundbar", slug: "soundbar", parentId: "tv-audio", productCount: 45 },
          { id: "projectors", name: "Projeksiyon", slug: "projeksiyon", parentId: "tv-audio", productCount: 25 },
          { id: "tv-accessories", name: "TV Aksesuarları", slug: "tv-aksesuarlari", parentId: "tv-audio", productCount: 20 }
        ]
      }
    ]
  },
  {
    id: "fashion",
    name: "Moda",
    slug: "moda",
    productCount: 2500,
    children: [
      { id: "mens-fashion", name: "Erkek Giyim", slug: "erkek-giyim", parentId: "fashion", productCount: 800 },
      { id: "womens-fashion", name: "Kadın Giyim", slug: "kadin-giyim", parentId: "fashion", productCount: 1200 },
      { id: "shoes", name: "Ayakkabı", slug: "ayakkabi", parentId: "fashion", productCount: 500 }
    ]
  },
  {
    id: "home-living",
    name: "Ev & Yaşam",
    slug: "ev-yasam",
    productCount: 1800,
    children: [
      { id: "furniture", name: "Mobilya", slug: "mobilya", parentId: "home-living", productCount: 600 },
      { id: "decoration", name: "Dekorasyon", slug: "dekorasyon", parentId: "home-living", productCount: 400 },
      { id: "kitchen", name: "Mutfak", slug: "mutfak", parentId: "home-living", productCount: 500 },
      { id: "bathroom", name: "Banyo", slug: "banyo", parentId: "home-living", productCount: 300 }
    ]
  },
  {
    id: "supermarket",
    name: "Süpermarket",
    slug: "supermarket",
    productCount: 3200,
    children: [
      { id: "food", name: "Gıda", slug: "gida", parentId: "supermarket", productCount: 1500 },
      { id: "beverages", name: "İçecek", slug: "icecek", parentId: "supermarket", productCount: 800 },
      { id: "cleaning", name: "Temizlik", slug: "temizlik", parentId: "supermarket", productCount: 600 },
      { id: "personal-care", name: "Kişisel Bakım", slug: "kisisel-bakim", parentId: "supermarket", productCount: 300 }
    ]
  },
  {
    id: "books",
    name: "Kitap",
    slug: "kitap",
    productCount: 5000,
    children: [
      { id: "fiction", name: "Roman", slug: "roman", parentId: "books", productCount: 2000 },
      { id: "non-fiction", name: "Kişisel Gelişim", slug: "kisisel-gelisim", parentId: "books", productCount: 1200 },
      { id: "textbooks", name: "Ders Kitapları", slug: "ders-kitaplari", parentId: "books", productCount: 800 },
      { id: "children", name: "Çocuk Kitapları", slug: "cocuk-kitaplari", parentId: "books", productCount: 1000 }
    ]
  },
  {
    id: "sports-outdoor",
    name: "Spor & Outdoor",
    slug: "spor-outdoor",
    productCount: 1500,
    children: [
      { id: "fitness", name: "Fitness", slug: "fitness", parentId: "sports-outdoor", productCount: 400 },
      { id: "outdoor", name: "Outdoor", slug: "outdoor", parentId: "sports-outdoor", productCount: 350 },
      { id: "team-sports", name: "Takım Sporları", slug: "takim-sporlari", parentId: "sports-outdoor", productCount: 450 },
      { id: "water-sports", name: "Su Sporları", slug: "su-sporlari", parentId: "sports-outdoor", productCount: 300 }
    ]
  }
];

// Örnek Ürünler
export const sampleProducts: Product[] = [
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro 128GB Doğal Titanyum",
    slug: "iphone-15-pro-128gb-dogal-titanyum",
    description: "Apple'ın en gelişmiş iPhone'u. A17 Pro çip, titanyum tasarım ve gelişmiş kamera sistemi.",
    price: 52999,
    originalPrice: 59999,
    discount: 12,
    categoryId: "electronics",
    subcategoryId: "iphone",
    images: ["/images/products/iphone-15-pro-1.jpg", "/images/products/iphone-15-pro-2.jpg"],
    rating: 4.8,
    reviewCount: 1250,
    stock: 45,
    brand: "Apple",
    features: ["A17 Pro çip", "48MP Ana Kamera", "Titanyum Tasarım", "USB-C"],
    isFlashSale: true,
    flashSaleEndTime: "2024-12-31T23:59:59",
    tags: ["yeni", "popüler", "premium"],
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-20T15:30:00Z"
  },
  {
    id: "samsung-galaxy-s24-ultra",
    name: "Samsung Galaxy S24 Ultra 512GB Titanyum Gri",
    slug: "samsung-galaxy-s24-ultra-512gb-titanyum-gri",
    description: "Samsung'un amiral gemisi telefonu. AI destekli özellikler ve S Pen ile.",
    price: 48999,
    originalPrice: 54999,
    discount: 11,
    categoryId: "electronics",
    subcategoryId: "samsung",
    images: ["/images/products/galaxy-s24-ultra-1.jpg"],
    rating: 4.7,
    reviewCount: 890,
    stock: 32,
    brand: "Samsung",
    features: ["200MP Kamera", "S Pen", "AI Özellikler", "5000mAh Batarya"],
    tags: ["yeni", "ai", "premium"],
    createdAt: "2024-01-10T08:00:00Z",
    updatedAt: "2024-01-18T12:00:00Z"
  },
  {
    id: "macbook-air-m3",
    name: "MacBook Air 15\" M3 Çip 8GB RAM 256GB SSD",
    slug: "macbook-air-15-m3-chip-8gb-256gb",
    description: "Apple'ın en ince ve hafif dizüstü bilgisayarı. M3 çip ile güçlü performans.",
    price: 32999,
    originalPrice: 36999,
    discount: 11,
    categoryId: "electronics",
    subcategoryId: "laptops",
    images: ["/images/products/macbook-air-m3-1.jpg"],
    rating: 4.9,
    reviewCount: 567,
    stock: 28,
    brand: "Apple",
    features: ["M3 Çip", "15.3\" Liquid Retina", "18 Saat Batarya", "MagSafe"],
    isFlashSale: true,
    flashSaleEndTime: "2024-12-25T23:59:59",
    tags: ["yeni", "performans", "taşınabilir"],
    createdAt: "2024-01-05T14:00:00Z",
    updatedAt: "2024-01-22T09:15:00Z"
  }
];

// Kategori bulma fonksiyonları
export const findCategoryBySlug = (slug: string): Category | null => {
  const findInCategories = (categories: Category[]): Category | null => {
    for (const category of categories) {
      if (category.slug === slug) return category;
      if (category.children) {
        const found = findInCategories(category.children);
        if (found) return found;
      }
    }
    return null;
  };
  return findInCategories(mainCategories);
};

export const getProductsByCategory = (categorySlug: string): Product[] => {
  const category = findCategoryBySlug(categorySlug);
  if (!category) return [];
  
  return sampleProducts.filter(product => 
    product.subcategoryId === category.id || 
    product.categoryId === category.id
  );
};

export const getFlashSaleProducts = (): Product[] => {
  return sampleProducts.filter(product => product.isFlashSale);
};

export const getAllCategories = (): Category[] => {
  return mainCategories;
};