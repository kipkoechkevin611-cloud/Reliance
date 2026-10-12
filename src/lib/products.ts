export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  capacity?: string;
  capacityLitres?: number;
  colors?: string[];
  price?: number;
  referencePrice?: number;
  description: string;
  isPriceVerified?: boolean;
}

export const products: Product[] = [
  // Vertical Cylindrical Tanks with various capacities
  {
    id: "vertical-1000",
    name: "Vertical Cylindrical Tank",
    category: "Vertical Cylindrical Tanks",
    image: "/vertical 1.webp",
    capacity: "1,000 litres",
    capacityLitres: 1000,
    colors: ["Black", "Blue", "Green"],
    referencePrice: 8500,
    description: "Durable triple-layer vertical cylindrical tank for residential water storage.",
    isPriceVerified: false,
  },
  {
    id: "vertical-2000",
    name: "Vertical Cylindrical Tank",
    category: "Vertical Cylindrical Tanks",
    image: "/vertical blue.webp",
    capacity: "2,000 litres",
    capacityLitres: 2000,
    colors: ["Black", "Blue", "Green"],
    referencePrice: 13500,
    description: "Medium-capacity vertical tank ideal for small to medium households.",
    isPriceVerified: false,
  },
  {
    id: "vertical-3000",
    name: "Vertical Cylindrical Tank",
    category: "Vertical Cylindrical Tanks",
    image: "/vertical tank.webp",
    capacity: "3,000 litres",
    capacityLitres: 3000,
    colors: ["Black", "Blue", "Green"],
    referencePrice: 17500,
    description: "Large vertical tank for homes and small businesses.",
    isPriceVerified: false,
  },
  {
    id: "vertical-4000",
    name: "Vertical Cylindrical Tank",
    category: "Vertical Cylindrical Tanks",
    image: "/vertical 1.webp",
    capacity: "4,000 litres",
    capacityLitres: 4000,
    colors: ["Black", "Blue", "Green"],
    referencePrice: 22500,
    description: "High-capacity vertical tank for commercial and institutional use.",
    isPriceVerified: false,
  },
  {
    id: "vertical-5000",
    name: "Vertical Cylindrical Tank",
    category: "Vertical Cylindrical Tanks",
    image: "/vertical blue.webp",
    capacity: "5,000 litres",
    capacityLitres: 5000,
    colors: ["Black", "Blue", "Green"],
    referencePrice: 29500,
    description: "Extra-large vertical tank for farms and large facilities.",
    isPriceVerified: false,
  },
  {
    id: "vertical-6000",
    name: "Vertical Cylindrical Tank",
    category: "Vertical Cylindrical Tanks",
    image: "/vertical tank.webp",
    capacity: "6,000 litres",
    capacityLitres: 6000,
    colors: ["Black", "Blue", "Green"],
    referencePrice: 33500,
    description: "Industrial-grade vertical tank for substantial water storage needs.",
    isPriceVerified: false,
  },
  {
    id: "vertical-8000",
    name: "Vertical Cylindrical Tank",
    category: "Vertical Cylindrical Tanks",
    image: "/vertical 1.webp",
    capacity: "8,000 litres",
    capacityLitres: 8000,
    colors: ["Black", "Blue", "Green"],
    referencePrice: 42500,
    description: "Massive capacity vertical tank for large-scale operations.",
    isPriceVerified: false,
  },
  {
    id: "vertical-10000",
    name: "Vertical Cylindrical Tank",
    category: "Vertical Cylindrical Tanks",
    image: "/vertical blue.webp",
    capacity: "10,000 litres",
    capacityLitres: 10000,
    colors: ["Black", "Blue", "Green"],
    referencePrice: 59500,
    description: "Premium large-capacity vertical tank for major facilities.",
    isPriceVerified: false,
  },
  {
    id: "vertical-16000",
    name: "Vertical Cylindrical Tank",
    category: "Vertical Cylindrical Tanks",
    image: "/vertical tank.webp",
    capacity: "16,000 litres",
    capacityLitres: 16000,
    colors: ["Black", "Blue", "Green"],
    referencePrice: 96500,
    description: "Industrial-scale vertical tank for extensive water storage.",
    isPriceVerified: false,
  },
  {
    id: "vertical-20000",
    name: "Vertical Cylindrical Tank",
    category: "Vertical Cylindrical Tanks",
    image: "/vertical 1.webp",
    capacity: "20,000 litres",
    capacityLitres: 20000,
    colors: ["Black", "Blue", "Green"],
    referencePrice: 126500,
    description: "Ultra-large capacity vertical tank for major installations.",
    isPriceVerified: false,
  },
  {
    id: "vertical-24000",
    name: "Vertical Cylindrical Tank",
    category: "Vertical Cylindrical Tanks",
    image: "/vertical blue.webp",
    capacity: "24,000 litres",
    capacityLitres: 24000,
    colors: ["Black", "Blue", "Green"],
    referencePrice: 148500,
    description: "Maximum capacity vertical tank for largest facilities.",
    isPriceVerified: false,
  },
  // Loft Tanks
  {
    id: "loft-tank",
    name: "Loft Tank",
    category: "Loft Tanks",
    image: "/Loft tanks.jpg",
    description: "Space-saving loft tanks designed for overhead water storage in residential buildings.",
    colors: ["Black", "Blue"],
  },
  // Underground Tanks
  {
    id: "underground-tank",
    name: "Underground Water Storage Tank",
    category: "Underground Water Storage Tanks",
    image: "/Underground tanks.jpeg",
    description: "Heavy-duty underground tanks for discreet water storage in residential and commercial properties.",
    colors: ["Black"],
  },
  // Septic and Sanitation Tanks
  {
    id: "septic-tank",
    name: "Septic and Sanitation Tank",
    category: "Septic and Sanitation Tanks",
    image: "/Septic and sanitation tanks.jpeg",
    description: "Specialized tanks for septic and sanitation applications in residential and commercial settings.",
    colors: ["Black"],
  },
];

export const categories = Array.from(new Set(products.map((p) => p.category)));

export const capacities = Array.from(
  new Set(products.filter((p) => p.capacity).map((p) => p.capacity))
)
  .filter((capacity): capacity is string => capacity !== undefined)
  .sort((a, b) => {
    const aNum = parseInt(a.replace(/,/g, ""));
    const bNum = parseInt(b.replace(/,/g, ""));
    return aNum - bNum;
  });

export const colors = Array.from(
  new Set(products.flatMap((p) => p.colors || []))
)
  .filter((color): color is string => color !== undefined)
  .sort();

export const priceRanges = [
  { label: "Under KSh 10,000", min: 0, max: 10000 },
  { label: "KSh 10,000 - KSh 50,000", min: 10000, max: 50000 },
  { label: "KSh 50,000 - KSh 100,000", min: 50000, max: 100000 },
  { label: "Over KSh 100,000", min: 100000, max: Infinity },
];
