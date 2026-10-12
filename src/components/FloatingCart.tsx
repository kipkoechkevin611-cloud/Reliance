"use client";

import React from "react";
import { useCart } from "@/lib/cart-context";

interface FloatingCartProps {
  onClick: () => void;
}

export const FloatingCart: React.FC<FloatingCartProps> = ({ onClick }) => {
  const { cartCount } = useCart();

  if (cartCount === 0) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 left-6 md:hidden bg-navy text-white p-4 rounded-full shadow-lg hover:bg-navy-light transition-all duration-200 z-40 flex items-center gap-2"
      aria-label="View cart"
    >
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <span className="bg-yellow text-navy text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
        {cartCount}
      </span>
    </button>
  );
};
