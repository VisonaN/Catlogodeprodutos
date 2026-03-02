import { type LucideIcon, Armchair, Headphones, Watch, Speaker, Backpack, Footprints, Flower2, Lamp, Sparkles, Shirt, Circle, Star, GripHorizontal, Gem, Waves } from "lucide-react";
import img1 from "figma:asset/bc26e95e68f8c6fc511de34503bcc41486e9e6e8.png";
import img2 from "figma:asset/d181b73574f523f12e836404d2fede8d7432b92e.png";
import img3 from "figma:asset/a0df42cbd73d46f7d7b57d290b65e6726aed1a51.png";
import redCraftSuppliesImg from "figma:asset/da9fc0f3cce21640d4b70bdc82744c1ed7b371a6.png";

export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  isNew?: boolean;
  isOnSale?: boolean;
  salePrice?: number;
  description: string;
  size: number; // size in mm
}

export const CATEGORIES = [
  { id: "apl", name: "APL", icon: Sparkles },
  { id: "bordados", name: "Bordados", icon: Flower2 },
  { id: "botoes-infantis", name: "Botões Infantis", icon: Circle },
  { id: "botoes", name: "Botões", icon: Circle },
  { id: "cartelas", name: "Cartelas", icon: GripHorizontal },
  { id: "galao", name: "Galão", icon: Waves },
  { id: "guipir", name: "Guipir", icon: Shirt },
  { id: "lantejoula", name: "Lantejoula", icon: Sparkles },
  { id: "manta", name: "Manta", icon: Armchair },
  { id: "micanga", name: "Miçanga", icon: Star },
  { id: "perola", name: "Pérola", icon: Circle },
  { id: "renda", name: "Renda", icon: Flower2 },
  { id: "spf", name: "SPF", icon: Gem },
  { id: "strass", name: "Strass", icon: Gem },
  { id: "taz", name: "Taz", icon: Waves },
];

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Modern Lounge Chair",
    price: 299.99,
    rating: 4.8,
    reviews: 124,
    image: redCraftSuppliesImg,
    category: "apl",
    isNew: true,
    description: "Experience ultimate comfort with our modern lounge chair, featuring premium upholstery and a sleek wooden frame.",
    size: 25
  },
  {
    id: "2",
    name: "Premium Noise-Canceling Headphones",
    price: 349.00,
    rating: 4.9,
    reviews: 856,
    image: img2,
    category: "bordados",
    isOnSale: true,
    salePrice: 299.00,
    description: "Immerse yourself in high-fidelity sound with our premium noise-canceling headphones.",
    size: 50
  },
  {
    id: "3",
    name: "Minimalist Analog Watch",
    price: 129.50,
    rating: 4.6,
    reviews: 42,
    image: img3,
    category: "guipir",
    description: "A timeless minimalist watch that complements any outfit, from casual to formal.",
    size: 80
  },
  {
    id: "4",
    name: "Smart Home Speaker",
    price: 99.00,
    rating: 4.5,
    reviews: 320,
    image: img1,
    category: "renda",
    description: "Control your home with voice commands and enjoy crystal-clear audio with our smart home speaker.",
    size: 120
  },
  {
    id: "5",
    name: "Urban Designer Backpack",
    price: 89.99,
    rating: 4.7,
    reviews: 215,
    image: img2,
    category: "lantejoula",
    isNew: true,
    description: "Stylish and functional, this designer backpack is perfect for your daily commute or weekend getaways.",
    size: 15
  },
  {
    id: "6",
    name: "Performance Running Shoes",
    price: 119.95,
    rating: 4.8,
    reviews: 540,
    image: img3,
    category: "strass",
    isOnSale: true,
    salePrice: 89.95,
    description: "Reach your personal best with our lightweight and responsive performance running shoes.",
    size: 35
  },
  {
    id: "7",
    name: "Ceramic Plant Pot",
    price: 35.00,
    rating: 4.9,
    reviews: 67,
    image: img1,
    category: "perola",
    description: "Add a touch of greenery to your home with this handcrafted ceramic plant pot.",
    size: 60
  },
  {
    id: "8",
    name: "Wooden Desk Lamp",
    price: 55.00,
    rating: 4.4,
    reviews: 112,
    image: img2,
    category: "micanga",
    description: "Illuminate your workspace with the warm glow of our Scandinavian-inspired wooden desk lamp.",
    size: 100
  },
    {
    id: "9",
    name: "Ergonomic Office Chair",
    price: 499.00,
    rating: 4.9,
    reviews: 89,
    image: img3,
    category: "botoes",
    description: "Work in comfort with our top-of-the-line ergonomic office chair.",
    size: 45
  },
  {
    id: "10",
    name: "Wireless Earbuds",
    price: 149.00,
    rating: 4.7,
    reviews: 330,
    image: img1,
    category: "galao",
    isNew: true,
    description: "Truly wireless freedom with exceptional sound quality and battery life.",
    size: 150
  }
];

export const SORT_OPTIONS = [
  { id: "relevance", label: "Relevância" },
  { id: "price-asc", label: "Preço: Menor para Maior" },
  { id: "price-desc", label: "Preço: Maior para Menor" },
  { id: "rating", label: "Mais Bem Avaliados" },
  { id: "newest", label: "Lançamentos" },
];