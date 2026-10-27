export interface ProductVariant {
  id: string;
  name: string;
  price: string;
  numericPrice: number;
  sizes: string[];
  colors: string[];
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: string;
  numericPrice: number;
  image: string;
  isLiked?: boolean;
  rating: number;
  reviewsCount: number;
  colors: string[];
  sizes: string[];
  limited?: boolean;
  category?: string;
  listedAt?: string;
  images?: string[];
  variants?: ProductVariant[];
}

export interface CatalogCategory {
  id: string;
  name: string;
  slug: string;
  emoji: string;
}

export const CATEGORIES: CatalogCategory[] = [
  { id: "business-laptops", name: "Business", slug: "business-laptops", emoji: "💼" },
  { id: "student-laptops", name: "Student", slug: "student-laptops", emoji: "📚" },
  { id: "creator-laptops", name: "Creator", slug: "creator-laptops", emoji: "🎨" },
  { id: "performance-laptops", name: "Performance", slug: "performance-laptops", emoji: "⚡" },
];

export const PRODUCTS: Product[] = [
  {
    id: "thinkpad-t480",
    name: "Lenovo ThinkPad T480",
    subtitle: "Refurbished business laptop · 8 GB RAM · 256 GB SSD",
    description: "A dependable refurbished ThinkPad for everyday work, study, and browsing. Demo listing: confirm the exact configuration and condition before purchase.",
    price: "₹19,999",
    numericPrice: 19999,
    image: "/images/laptop_rugged.png",
    rating: 4.7,
    reviewsCount: 38,
    colors: [],
    sizes: ["8 GB RAM · 256 GB SSD"],
    category: "business-laptops",
  },
  {
    id: "latitude-5420",
    name: "Dell Latitude 5420",
    subtitle: "Refurbished business laptop · 16 GB RAM · 512 GB SSD",
    description: "A practical Latitude configuration for multitasking and office work. Demo listing: confirm the exact configuration and condition before purchase.",
    price: "₹28,499",
    numericPrice: 28499,
    image: "/images/laptop_sleek.png",
    rating: 4.8,
    reviewsCount: 29,
    colors: [],
    sizes: ["16 GB RAM · 512 GB SSD"],
    category: "business-laptops",
  },
  {
    id: "elitebook-840-g7",
    name: "HP EliteBook 840 G7",
    subtitle: "Refurbished business laptop · 16 GB RAM · 512 GB SSD",
    description: "A slim, professional EliteBook for work on the go. Demo listing: confirm the exact configuration and condition before purchase.",
    price: "₹29,999",
    numericPrice: 29999,
    image: "/images/laptop_rugged.png",
    rating: 4.6,
    reviewsCount: 21,
    colors: [],
    sizes: ["16 GB RAM · 512 GB SSD"],
    category: "business-laptops",
  },
  {
    id: "latitude-7420",
    name: "Dell Latitude 7420",
    subtitle: "Refurbished premium laptop · 16 GB RAM · 512 GB SSD",
    description: "A premium refurbished Latitude suited to travel and productivity. Demo listing: confirm the exact configuration and condition before purchase.",
    price: "₹38,999",
    numericPrice: 38999,
    image: "/images/laptop_sleek.png",
    rating: 4.8,
    reviewsCount: 17,
    colors: [],
    sizes: ["16 GB RAM · 512 GB SSD"],
    category: "business-laptops",
  },
  {
    id: "aspire-5",
    name: "Acer Aspire 5",
    subtitle: "Refurbished everyday laptop · 8 GB RAM · 512 GB SSD",
    description: "A versatile Aspire for classes, home use, and everyday tasks. Demo listing: confirm the exact configuration and condition before purchase.",
    price: "₹24,999",
    numericPrice: 24999,
    image: "/images/laptop_sleek.png",
    rating: 4.5,
    reviewsCount: 24,
    colors: [],
    sizes: ["8 GB RAM · 512 GB SSD"],
    category: "student-laptops",
  },
  {
    id: "vivobook-15",
    name: "ASUS VivoBook 15",
    subtitle: "Refurbished student laptop · 8 GB RAM · 512 GB SSD",
    description: "A lightweight everyday laptop for coursework, streaming, and browsing. Demo listing: confirm the exact configuration and condition before purchase.",
    price: "₹31,999",
    numericPrice: 31999,
    image: "/images/laptop_rugged.png",
    rating: 4.6,
    reviewsCount: 19,
    colors: [],
    sizes: ["8 GB RAM · 512 GB SSD"],
    category: "student-laptops",
  },
  {
    id: "probook-440-g8",
    name: "HP ProBook 440 G8",
    subtitle: "Refurbished student laptop · 8 GB RAM · 256 GB SSD",
    description: "A compact ProBook option for study and everyday productivity. Demo listing: confirm the exact configuration and condition before purchase.",
    price: "₹26,999",
    numericPrice: 26999,
    image: "/images/laptop_sleek.png",
    rating: 4.5,
    reviewsCount: 16,
    colors: [],
    sizes: ["8 GB RAM · 256 GB SSD"],
    category: "student-laptops",
  },
  {
    id: "macbook-air-2020",
    name: "Apple MacBook Air 2020",
    subtitle: "Refurbished creator laptop · 8 GB RAM · 256 GB SSD",
    description: "A compact MacBook Air for creative projects and daily productivity. Demo listing: confirm the exact configuration and condition before purchase.",
    price: "₹49,999",
    numericPrice: 49999,
    image: "/images/laptop_sleek.png",
    rating: 4.9,
    reviewsCount: 42,
    colors: [],
    sizes: ["8 GB RAM · 256 GB SSD"],
    limited: true,
    category: "creator-laptops",
  },
  {
    id: "legion-5",
    name: "Lenovo Legion 5",
    subtitle: "Refurbished performance laptop · 16 GB RAM · 512 GB SSD",
    description: "A performance-focused Legion configuration for gaming and demanding tasks. Demo listing: confirm the exact configuration and condition before purchase.",
    price: "₹54,999",
    numericPrice: 54999,
    image: "/images/laptop_rugged.png",
    rating: 4.8,
    reviewsCount: 33,
    colors: [],
    sizes: ["16 GB RAM · 512 GB SSD"],
    limited: true,
    category: "performance-laptops",
  },
  {
    id: "gf63-thin",
    name: "MSI GF63 Thin",
    subtitle: "Refurbished performance laptop · 16 GB RAM · 512 GB SSD",
    description: "A slim gaming laptop mock listing for users who need extra performance. Demo listing: confirm the exact configuration and condition before purchase.",
    price: "₹44,999",
    numericPrice: 44999,
    image: "/images/laptop_rugged.png",
    rating: 4.7,
    reviewsCount: 26,
    colors: [],
    sizes: ["16 GB RAM · 512 GB SSD"],
    category: "performance-laptops",
  },
  {
    id: "nitro-5",
    name: "Acer Nitro 5",
    subtitle: "Refurbished gaming laptop · 16 GB RAM · 512 GB SSD",
    description: "A gaming-oriented Nitro mock listing for entertainment and creative workloads. Demo listing: confirm the exact configuration and condition before purchase.",
    price: "₹48,999",
    numericPrice: 48999,
    image: "/images/laptop_rugged.png",
    rating: 4.6,
    reviewsCount: 22,
    colors: [],
    sizes: ["16 GB RAM · 512 GB SSD"],
    category: "performance-laptops",
  },
  {
    id: "tuf-gaming-f15",
    name: "ASUS TUF Gaming F15",
    subtitle: "Refurbished performance laptop · 16 GB RAM · 1 TB SSD",
    description: "A robust gaming laptop mock listing for demanding workloads. Demo listing: confirm the exact configuration and condition before purchase.",
    price: "₹52,999",
    numericPrice: 52999,
    image: "/images/laptop_rugged.png",
    rating: 4.7,
    reviewsCount: 18,
    colors: [],
    sizes: ["16 GB RAM · 1 TB SSD"],
    category: "performance-laptops",
  },
  {
    id: "thinkpad-e14-gen4",
    name: "Lenovo ThinkPad E14 Gen 4",
    subtitle: "Demo listing · 16 GB RAM · 512 GB SSD",
    description: "Sample refurbished ThinkPad listing for business and everyday productivity. Demo model, price, configuration, and listing date are illustrative, not live inventory details.",
    price: "₹34,999",
    numericPrice: 34999,
    image: "/images/laptop_rugged.png",
    rating: 0,
    reviewsCount: 0,
    colors: [],
    sizes: ["16 GB RAM · 512 GB SSD"],
    category: "business-laptops",
    listedAt: "2026-10-24T00:00:00+05:30",
  },
  {
    id: "latitude-5430",
    name: "Dell Latitude 5430",
    subtitle: "Demo listing · 16 GB RAM · 512 GB SSD",
    description: "Sample refurbished Latitude listing for office work and multitasking. Demo model, price, configuration, and listing date are illustrative, not live inventory details.",
    price: "₹37,999",
    numericPrice: 37999,
    image: "/images/laptop_sleek.png",
    rating: 0,
    reviewsCount: 0,
    colors: [],
    sizes: ["16 GB RAM · 512 GB SSD"],
    category: "business-laptops",
    listedAt: "2026-10-23T00:00:00+05:30",
  },
  {
    id: "elitebook-845-g8",
    name: "HP EliteBook 845 G8",
    subtitle: "Demo listing · 16 GB RAM · 512 GB SSD",
    description: "Sample refurbished EliteBook listing for portable productivity. Demo model, price, configuration, and listing date are illustrative, not live inventory details.",
    price: "₹35,499",
    numericPrice: 35499,
    image: "/images/laptop_sleek.png",
    rating: 0,
    reviewsCount: 0,
    colors: [],
    sizes: ["16 GB RAM · 512 GB SSD"],
    category: "business-laptops",
    listedAt: "2026-10-22T00:00:00+05:30",
  },
  {
    id: "expertbook-b5",
    name: "ASUS ExpertBook B5",
    subtitle: "Demo listing · 16 GB RAM · 1 TB SSD",
    description: "Sample refurbished ExpertBook listing for work and travel. Demo model, price, configuration, and listing date are illustrative, not live inventory details.",
    price: "₹39,999",
    numericPrice: 39999,
    image: "/images/laptop_rugged.png",
    rating: 0,
    reviewsCount: 0,
    colors: [],
    sizes: ["16 GB RAM · 1 TB SSD"],
    category: "business-laptops",
    listedAt: "2026-10-21T00:00:00+05:30",
  },
];
