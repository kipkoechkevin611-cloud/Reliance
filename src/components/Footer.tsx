"use client";

import React from "react";
import { Button } from "./Button";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const whatsappOrder = () => {
    const message = encodeURIComponent(
      "Hello Reliance Tanks, I would like to inquire about your water tanks."
    );
    window.open(`https://wa.me/254732934360?text=${message}`, "_blank");
  };

  return (
    <>
      <footer className="bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Reliance <span className="text-yellow">Tanks</span>
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                Kenya&apos;s trusted provider of quality water storage solutions for homes, farms, businesses, and institutions.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#home" className="text-gray-300 hover:text-yellow transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#tanks" className="text-gray-300 hover:text-yellow transition-colors">
                    Our Tanks
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-300 hover:text-yellow transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#why-choose-us" className="text-gray-300 hover:text-yellow transition-colors">
                    Why Choose Us
                  </a>
                </li>
                <li>
                  <a href="#faqs" className="text-gray-300 hover:text-yellow transition-colors">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-300 hover:text-yellow transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Product Categories */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow">Products</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#tanks" className="text-gray-300 hover:text-yellow transition-colors">
                    Vertical Tanks
                  </a>
                </li>
                <li>
                  <a href="#tanks" className="text-gray-300 hover:text-yellow transition-colors">
                    Loft Tanks
                  </a>
                </li>
                <li>
                  <a href="#tanks" className="text-gray-300 hover:text-yellow transition-colors">
                    Underground Tanks
                  </a>
                </li>
                <li>
                  <a href="#tanks" className="text-gray-300 hover:text-yellow transition-colors">
                    Sanitation Tanks
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow">Contact Us</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <span className="mr-2">📞</span>
                  <div>
                    <a href="tel:0732934360" className="text-gray-300 hover:text-yellow transition-colors">
                      0732934360
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✉️</span>
                  <div>
                    <a
                      href="mailto:reliancetanksltd@gmail.com"
                      className="text-gray-300 hover:text-yellow transition-colors"
                    >
                      reliancetanksltd@gmail.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">📍</span>
                  <span className="text-gray-300">Nakuru, Kenya</span>
                </li>
              </ul>
              <div className="mt-4">
                <Button variant="secondary" size="sm" onClick={whatsappOrder}>
                  Order on WhatsApp
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {currentYear} Reliance Tanks Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/254732934360"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-all duration-200 z-50 hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </>
  );
};
