import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Reliance Tanks Ltd - Kenya's Trusted Water Storage Solutions",
  description: "Quality water storage solutions for homes, farms, businesses and institutions in Kenya. Order vertical tanks, loft tanks, underground tanks and more with convenient WhatsApp checkout.",
  keywords: "water tanks Kenya, storage tanks, vertical tanks, loft tanks, underground tanks, Nakuru, water storage, septic tanks, sanitation tanks",
  authors: [{ name: "Reliance Tanks Ltd" }],
  creator: "Reliance Tanks Ltd",
  publisher: "Reliance Tanks Ltd",
  robots: "index, follow",
  openGraph: {
    title: "Reliance Tanks Ltd - Kenya's Trusted Water Storage Solutions",
    description: "Quality water storage solutions for homes, farms, businesses and institutions in Kenya. Order online with convenient WhatsApp checkout.",
    type: "website",
    locale: "en_KE",
    siteName: "Reliance Tanks Ltd",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reliance Tanks Ltd - Kenya's Trusted Water Storage Solutions",
    description: "Quality water storage solutions for homes, farms, businesses and institutions in Kenya.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
