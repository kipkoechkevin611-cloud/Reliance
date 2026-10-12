"use client";

import React, { useState } from "react";
import { Button } from "./Button";
import { useCart } from "@/lib/cart-context";

interface HeaderProps {
  onCartClick: () => void;
}

export const Header = ({ onCartClick }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();

  const whatsappOrder = () => {
    const message = encodeURIComponent(
      "Hello Reliance Tanks, I would like to inquire about your water tanks."
    );
    window.open(`https://wa.me/254732934360?text=${message}`, "_blank");
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      {/* Top Info Bar */}
      <div className="bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center py-3 text-sm">
            <div className="flex flex-wrap justify-center sm:justify-start gap-6 sm:gap-8 mb-3 sm:mb-0">
              <a href="tel:0732934360" className="hover:text-yellow transition-colors">
                📞 0732934360
              </a>
              <a
                href="mailto:reliancetanksltd@gmail.com"
                className="hover:text-yellow transition-colors"
              >
                ✉️ reliancetanksltd@gmail.com
              </a>
              <span className="flex items-center">📍 Nakuru, Kenya</span>
            </div>
            <div className="text-yellow font-medium text-center sm:text-right">
              Kenya&apos;s Trusted Water Storage Solutions
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-navy">
                Reliance <span className="text-yellow">Tanks</span>
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#home"
                className="text-navy hover:text-yellow transition-colors font-medium"
              >
                Home
              </a>
              <a
                href="#tanks"
                className="text-navy hover:text-yellow transition-colors font-medium"
              >
                Our Tanks
              </a>
              <a
                href="#about"
                className="text-navy hover:text-yellow transition-colors font-medium"
              >
                About Us
              </a>
              <a
                href="#why-choose-us"
                className="text-navy hover:text-yellow transition-colors font-medium"
              >
                Why Choose Us
              </a>
              <a
                href="#faqs"
                className="text-navy hover:text-yellow transition-colors font-medium"
              >
                FAQs
              </a>
              <a
                href="#contact"
                className="text-navy hover:text-yellow transition-colors font-medium"
              >
                Contact Us
              </a>
              <button
                onClick={onCartClick}
                className="relative text-navy hover:text-yellow transition-colors"
                aria-label="View cart"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow text-navy text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <Button variant="secondary" size="sm" onClick={whatsappOrder}>
                Order on WhatsApp
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-navy hover:text-yellow p-2"
                aria-label="Toggle menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 pt-2 pb-4 space-y-2">
              <a
                href="#home"
                className="block px-3 py-2 text-navy hover:bg-gray-50 rounded-md font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#tanks"
                className="block px-3 py-2 text-navy hover:bg-gray-50 rounded-md font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Our Tanks
              </a>
              <a
                href="#about"
                className="block px-3 py-2 text-navy hover:bg-gray-50 rounded-md font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </a>
              <a
                href="#why-choose-us"
                className="block px-3 py-2 text-navy hover:bg-gray-50 rounded-md font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Why Choose Us
              </a>
              <a
                href="#faqs"
                className="block px-3 py-2 text-navy hover:bg-gray-50 rounded-md font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQs
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 text-navy hover:bg-gray-50 rounded-md font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </a>
              <div className="pt-2 space-y-2">
                <button
                  onClick={() => {
                    onCartClick();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-navy bg-gray-100 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Cart ({cartCount})
                </button>
                <Button
                  variant="secondary"
                  size="md"
                  className="w-full"
                  onClick={() => {
                    whatsappOrder();
                    setMobileMenuOpen(false);
                  }}
                >
                  Order on WhatsApp
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
