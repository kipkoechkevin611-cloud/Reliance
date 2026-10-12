import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Reliance Tanks Ltd - Kenya's Trusted Water Storage Solutions",
  description: "Quality water storage solutions for homes, farms, businesses and institutions in Kenya. Order vertical tanks, loft tanks, underground tanks and more.",
  keywords: "water tanks Kenya, storage tanks, vertical tanks, loft tanks, underground tanks, Nakuru",
  openGraph: {
    title: "Reliance Tanks Ltd - Kenya's Trusted Water Storage Solutions",
    description: "Quality water storage solutions for homes, farms, businesses and institutions in Kenya.",
    type: "website",
    locale: "en_KE",
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
