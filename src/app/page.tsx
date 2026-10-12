"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { Card, CardImage, CardContent } from "@/components/Card";
import { OrderModal } from "@/components/OrderModal";
import { CartModal } from "@/components/CartModal";
import { CheckoutModal } from "@/components/CheckoutModal";
import { FloatingCart } from "@/components/FloatingCart";
import { products, categories, capacities, colors, priceRanges, Product } from "@/lib/products";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedCapacity, setSelectedCapacity] = useState<string>("All");
  const [selectedColor, setSelectedColor] = useState<string>("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredProducts = products.filter((product) => {
    // Category filter
    if (selectedCategory !== "All" && product.category !== selectedCategory) {
      return false;
    }

    // Capacity filter
    if (selectedCapacity !== "All" && product.capacity !== selectedCapacity) {
      return false;
    }

    // Color filter
    if (selectedColor !== "All" && (!product.colors || !product.colors.includes(selectedColor))) {
      return false;
    }

    // Price range filter
    if (selectedPriceRange !== "All") {
      const range = priceRanges.find((r) => r.label === selectedPriceRange);
      const price = product.isPriceVerified ? product.price : product.referencePrice;
      if (!price || !range) return false;
      if (price < range.min || price >= range.max) return false;
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesName = product.name.toLowerCase().includes(query);
      const matchesCategory = product.category.toLowerCase().includes(query);
      const matchesCapacity = product.capacity?.toLowerCase().includes(query);
      if (!matchesName && !matchesCategory && !matchesCapacity) {
        return false;
      }
    }

    return true;
  });

  const handleOrderClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const whatsappOrder = () => {
    const message = encodeURIComponent(
      "Hello Reliance Tanks, I would like to inquire about your water tanks."
    );
    window.open(`https://wa.me/254732934360?text=${message}`, "_blank");
  };

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedCapacity("All");
    setSelectedColor("All");
    setSelectedPriceRange("All");
    setSearchQuery("");
  };

  const faqs = [
    {
      question: "How do I order a tank?",
      answer: "You can order by clicking 'View Details' on any product, then select 'Add to Cart' to build your order or 'Order via WhatsApp' to enquire directly. You can also call us at 0732934360.",
    },
    {
      question: "How can I confirm the price?",
      answer: "Prices shown are reference prices. Please contact us via WhatsApp or phone to confirm current pricing. Prices may vary based on tank capacity, quantity, and delivery location.",
    },
    {
      question: "Which tank capacity should I choose?",
      answer: "The right capacity depends on your water usage needs. For homes, smaller tanks (500-1000L) may suffice. For farms or businesses, larger capacities (2000L+) are recommended. Contact us for personalized advice.",
    },
    {
      question: "Do you arrange delivery?",
      answer: "Yes, we can coordinate delivery to your location. Please provide your delivery town or location when placing your order, and we'll confirm delivery options and costs.",
    },
    {
      question: "How can I contact Reliance Tanks?",
      answer: "You can reach us via WhatsApp at 254732934360, phone at 0732934360, or email at reliancetanksltd@gmail.com. We're based in Nakuru, Kenya.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header onCartClick={() => setIsCartOpen(true)} />

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-br from-blue-50 to-white py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="order-2 md:order-1">
              <p className="text-sm font-semibold text-navy tracking-wide uppercase mb-4">
                Kenya&apos;s Trusted Water Storage Solutions
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-6 leading-tight">
                Reliable Tanks. Lasting Value.
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
                Explore quality water storage solutions for homes, farms, businesses and institutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Button variant="secondary" size="lg" onClick={whatsappOrder}>
                  Order on WhatsApp
                </Button>
                <Button variant="outline" size="lg" onClick={() => document.getElementById("tanks")?.scrollIntoView({ behavior: "smooth" })}>
                  Explore Our Tanks
                </Button>
              </div>
              <div className="flex flex-wrap gap-8 text-sm text-gray-600">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">💪</span>
                  <span>Durable Construction</span>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-3">💧</span>
                  <span>Water Storage Solutions</span>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🤝</span>
                  <span>Customer Support</span>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative">
                <img
                  src="/vertical tank.webp"
                  alt="Reliance Water Tank"
                  className="w-full h-auto object-contain rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Catalogue */}
      <section id="tanks" className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Our Tanks</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Browse our range of quality water storage solutions designed for various applications.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-10">
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search tanks by name, category, or capacity..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-4 pl-14 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy text-lg"
              />
              <svg
                className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-gray-50 rounded-xl p-8 mb-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <h3 className="font-semibold text-navy text-lg">Filters</h3>
              <button
                onClick={clearFilters}
                className="text-sm text-navy hover:text-yellow transition-colors font-medium"
              >
                Clear All
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-navy mb-3">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                >
                  <option value="All">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Capacity Filter */}
              <div>
                <label className="block text-sm font-medium text-navy mb-3">Capacity</label>
                <select
                  value={selectedCapacity}
                  onChange={(e) => setSelectedCapacity(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                >
                  <option value="All">All Capacities</option>
                  {capacities.map((capacity) => (
                    <option key={capacity} value={capacity}>
                      {capacity}
                    </option>
                  ))}
                </select>
              </div>

              {/* Color Filter */}
              <div>
                <label className="block text-sm font-medium text-navy mb-3">Color</label>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                >
                  <option value="All">All Colors</option>
                  {colors.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-navy mb-3">Price Range</label>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                >
                  <option value="All">All Prices</option>
                  {priceRanges.map((range) => (
                    <option key={range.label} value={range.label}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active Filters Display */}
            {(selectedCategory !== "All" ||
              selectedCapacity !== "All" ||
              selectedColor !== "All" ||
              selectedPriceRange !== "All" ||
              searchQuery) && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-3">
                  {selectedCategory !== "All" && (
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-navy text-white">
                      {selectedCategory}
                      <button
                        onClick={() => setSelectedCategory("All")}
                        className="ml-2 hover:text-yellow font-bold"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {selectedCapacity !== "All" && (
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-navy text-white">
                      {selectedCapacity}
                      <button
                        onClick={() => setSelectedCapacity("All")}
                        className="ml-2 hover:text-yellow font-bold"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {selectedColor !== "All" && (
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-navy text-white">
                      {selectedColor}
                      <button
                        onClick={() => setSelectedColor("All")}
                        className="ml-2 hover:text-yellow font-bold"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {selectedPriceRange !== "All" && (
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-navy text-white">
                      {selectedPriceRange}
                      <button
                        onClick={() => setSelectedPriceRange("All")}
                        className="ml-2 hover:text-yellow font-bold"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {searchQuery && (
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-navy text-white">
                      Search: {searchQuery}
                      <button
                        onClick={() => setSearchQuery("")}
                        className="ml-2 hover:text-yellow font-bold"
                      >
                        ×
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-8">
            <p className="text-gray-600 text-lg">
              Showing {filteredProducts.length} tank{filteredProducts.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 mb-6 text-lg">No tanks match your filters.</p>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-xl transition-shadow duration-300">
                  <CardImage src={product.image} alt={product.name} />
                  <CardContent>
                    <h3 className="text-lg font-semibold text-navy mb-2">{product.name}</h3>
                    <p className="text-xs text-gray-500 mb-3">{product.category}</p>
                    {product.capacity && (
                      <p className="text-sm font-medium text-navy mb-3">{product.capacity}</p>
                    )}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">{product.description}</p>
                    <div className="mb-4">
                      <p className="text-lg font-bold text-navy">
                        {product.isPriceVerified
                          ? `KSh ${product.price?.toLocaleString()}`
                          : product.referencePrice
                          ? `KSh ${product.referencePrice?.toLocaleString()} (Ref)`
                          : "Request Price"}
                      </p>
                      {!product.isPriceVerified && (
                        <p className="text-xs text-gray-500 mt-1">* Contact for confirmed price</p>
                      )}
                    </div>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleOrderClick(product)}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleOrderClick(product)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-choose-us" className="py-20 md:py-24 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Why Choose Reliance Tanks</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We&apos;re committed to providing reliable water storage solutions that meet your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">🏗️</div>
              <h3 className="text-lg font-semibold text-navy mb-3">Durable Products</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Quality tanks built to last and withstand various environmental conditions.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">💧</div>
              <h3 className="text-lg font-semibold text-navy mb-3">Water Storage Solutions</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Range of tanks for residential, agricultural, commercial, and institutional use.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-lg font-semibold text-navy mb-3">Customer Support</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Dedicated team to help you choose the right tank for your specific needs.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="text-lg font-semibold text-navy mb-3">Delivery Coordination</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We help coordinate delivery to your location for a hassle-free experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <img
                src="/vertical blue.webp"
                alt="Reliance Tanks"
                className="w-full h-auto object-contain rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">About Reliance Tanks Ltd</h2>
              <p className="text-gray-600 mb-5 leading-relaxed">
                Reliance Tanks Ltd is a Kenyan company dedicated to providing quality water storage solutions. Based in Nakuru, we serve customers across Kenya with a range of tanks designed for various applications.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Whether you need a tank for your home, farm, business, or institution, we&apos;re here to help you find the right solution. Our team is committed to delivering reliable products and excellent customer service.
              </p>
              <Button variant="secondary" onClick={whatsappOrder}>
                Enquire on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Enquiry CTA */}
      <section className="py-20 md:py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Looking for the Right Water Tank?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
            Tell us what you need, and our team can help you enquire about the right option for your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" onClick={whatsappOrder}>
              Order on WhatsApp
            </Button>
            <a href="tel:0732934360" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg bg-white text-navy hover:bg-gray-100 transition-colors">
              Call Us
            </a>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="py-20 md:py-24 bg-blue-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-navy">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-navy transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Contact Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Get in touch with us for enquiries, orders, or any questions about our water tanks.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5">
                <span className="text-4xl">📞</span>
              </div>
              <h3 className="font-semibold text-navy mb-3 text-lg">Phone</h3>
              <a href="tel:0732934360" className="text-gray-600 hover:text-navy transition-colors text-lg">
                0732934360
              </a>
            </div>
            <div className="text-center">
              <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5">
                <span className="text-4xl">✉️</span>
              </div>
              <h3 className="font-semibold text-navy mb-3 text-lg">Email</h3>
              <a
                href="mailto:reliancetanksltd@gmail.com"
                className="text-gray-600 hover:text-navy transition-colors text-lg"
              >
                reliancetanksltd@gmail.com
              </a>
            </div>
            <div className="text-center">
              <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5">
                <span className="text-4xl">📍</span>
              </div>
              <h3 className="font-semibold text-navy mb-3 text-lg">Location</h3>
              <p className="text-gray-600 text-lg">Nakuru, Kenya</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Order Modal */}
      {selectedProduct && (
        <OrderModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProduct(null);
          }}
        />
      )}

      {/* Cart Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      {/* Floating Cart for Mobile */}
      <FloatingCart onClick={() => setIsCartOpen(true)} />
    </div>
  );
}
