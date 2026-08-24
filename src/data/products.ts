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
  images?: string[];
  variants?: ProductVariant[];
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Home box honey",
    subtitle: "Pure wild organic honey",
    description: "Pure unprocessed wildflower honey harvested straight from farm boxes, retaining all natural enzymes and rich floral aroma.",
    price: "$15",
    numericPrice: 15,
    image: "/images/home_box_honey.png",
    isLiked: false,
    rating: 4.8,
    reviewsCount: 120,
    colors: ["#e5a63c"],
    sizes: ["250g", "500g", "1kg"],
    limited: false,
    category: "honey"
  },
  {
    id: "2",
    name: "dry fish varieties",
    subtitle: "Assorted sun-dried salted fish",
    description: "A select collection of premium quality sun-dried salted dry fish, processed traditionally using sea salt.",
    price: "$25",
    numericPrice: 25,
    image: "/images/dry_fish_varieties.png",
    isLiked: false,
    rating: 4.7,
    reviewsCount: 95,
    colors: ["#d9c5b2"],
    sizes: ["250g", "500g"],
    limited: false,
    category: "dry-fish"
  },
  {
    id: "3",
    name: "Uppukandam muttom",
    subtitle: "Dried salted mutton chunks",
    description: "Traditional South Indian dried meat. Mutton chunks seasoned with sea salt and turmeric, dried under the sun for rich concentrated flavor.",
    price: "$45",
    numericPrice: 45,
    image: "/images/uppukandam_mutton.png",
    isLiked: true,
    rating: 4.9,
    reviewsCount: 160,
    colors: ["#5d3c26"],
    sizes: ["100g", "250g", "500g"],
    limited: false,
    category: "meat"
  },
  {
    id: "4",
    name: "Uppukandam beef",
    subtitle: "Dried salted beef strips",
    description: "Authentic sun-dried beef strips prepared with traditional spices and salt. Reconstitutes beautifully for cooking or frying.",
    price: "$40",
    numericPrice: 40,
    image: "/images/uppukandam_beef.png",
    isLiked: false,
    rating: 4.8,
    reviewsCount: 140,
    colors: ["#4a2f1b"],
    sizes: ["100g", "250g", "500g"],
    limited: true,
    category: "meat"
  },
  {
    id: "5",
    name: "ribbon fish. - vaalai meen",
    subtitle: "Dried vaalai meen karuvadu",
    description: "Premium sun-dried ribbon fish (vaalai meen). Excellent flavor profile, low moisture, processed under hygienic conditions.",
    price: "$18",
    numericPrice: 18,
    image: "/images/ribbon_fish_vaalai.png",
    isLiked: false,
    rating: 4.6,
    reviewsCount: 75,
    colors: ["#c5cdd8"],
    sizes: ["250g", "500g"],
    limited: false,
    category: "dry-fish"
  },
  {
    id: "6",
    name: "masi karuvadu",
    subtitle: "Hard cured Maldives tuna",
    description: "Premium Maldive tuna chunks, hard-cured and dried. Perfect for grating over sambals, traditional South Indian, and Sri Lankan recipes.",
    price: "$30",
    numericPrice: 30,
    image: "/images/masi_karuvadu.png",
    isLiked: false,
    rating: 4.9,
    reviewsCount: 88,
    colors: ["#3d2719"],
    sizes: ["100g", "250g"],
    limited: true,
    category: "dry-fish"
  },
  {
    id: "7",
    name: "pattarai karuvadu",
    subtitle: "Sun-dried salted large fish",
    description: "Hygienically sun-dried and salted large fish, standard quality traditional karuvadu with rich flavor and aroma.",
    price: "$15",
    numericPrice: 15,
    image: "/images/pattarai_karuvadu.png",
    isLiked: false,
    rating: 4.5,
    reviewsCount: 64,
    colors: ["#9d9284"],
    sizes: ["250g", "500g"],
    limited: false,
    category: "dry-fish"
  },
  {
    id: "8",
    name: "maththi meen karuvadu",
    subtitle: "Sun-dried salted sardines",
    description: "Sun-dried maththi meen karuvadu (sardines). Highly nutritious, rich in Omega-3, dried using clean wind tunnels.",
    price: "$12",
    numericPrice: 12,
    image: "/images/maththi_karuvadu.png",
    isLiked: false,
    rating: 4.7,
    reviewsCount: 110,
    colors: ["#7d8c99"],
    sizes: ["250g", "500g", "1kg"],
    limited: false,
    category: "dry-fish"
  },
  {
    id: "9",
    name: "koogai kilangu",
    subtitle: "Arrowroot powder starch",
    description: "Pure arrowroot powder (koogai kilangu maavu) extracted from raw arrowroot tubers. Excellent natural coolant, thickener, and infant food base.",
    price: "$10",
    numericPrice: 10,
    image: "/images/koogai_kilangu.png",
    isLiked: false,
    rating: 4.8,
    reviewsCount: 52,
    colors: ["#f2f1ed"],
    sizes: ["250g", "500g", "1kg"],
    limited: false,
    category: "traditional"
  },
  {
    id: "10",
    name: "old tamarind",
    subtitle: "Aged dark pazhaya puli",
    description: "Dark, aged old tamarind (pazhaya puli) stored traditionally for over a year to reduce acidity and enhance deep flavor profiles.",
    price: "$8",
    numericPrice: 8,
    image: "/images/old_tamarind.png",
    isLiked: false,
    rating: 4.9,
    reviewsCount: 130,
    colors: ["#2d1708"],
    sizes: ["500g", "1kg"],
    limited: false,
    category: "traditional"
  },
  {
    id: "11",
    name: "kudam puli",
    subtitle: "Malabar tamarind Garcinia",
    description: "High-grade sun-dried Kudam Puli (Garcinia Cambogia). Adds the authentic tangy smoked flavor signature to traditional fish curries.",
    price: "$14",
    numericPrice: 14,
    image: "/images/kudam_puli.png",
    isLiked: false,
    rating: 4.8,
    reviewsCount: 92,
    colors: ["#211a18"],
    sizes: ["100g", "250g", "500g"],
    limited: false,
    category: "traditional"
  },
  {
    id: "12",
    name: "karupatti",
    subtitle: "Palm jaggery blocks",
    description: "100% natural, unrefined palm jaggery (karupatti) blocks. Rich in iron and minerals, perfect natural replacement for refined sugar.",
    price: "$16",
    numericPrice: 16,
    image: "/images/karupatti.png",
    isLiked: false,
    rating: 4.9,
    reviewsCount: 175,
    colors: ["#442a17"],
    sizes: ["500g", "1kg"],
    limited: true,
    category: "traditional"
  },
  {
    id: "13",
    name: "seemai nellikai",
    subtitle: "Fresh star gooseberries",
    description: "Freshly harvested star gooseberries (seemai nellikai). High in Vitamin C, crisp, tangy, ideal for pickling or eating fresh.",
    price: "$6",
    numericPrice: 6,
    image: "/images/seemai_nellikai.png",
    isLiked: false,
    rating: 4.6,
    reviewsCount: 45,
    colors: ["#99b350"],
    sizes: ["250g", "500g"],
    limited: false,
    category: "traditional"
  }
];
