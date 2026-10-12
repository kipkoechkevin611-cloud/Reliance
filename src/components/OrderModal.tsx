"use client";

import React, { useState } from "react";
import { Button } from "./Button";
import { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

interface OrderModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({ product, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    color: "",
    quantity: "1",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { addToCart } = useCart();

  if (!isOpen) return null;

  const handleAddToCart = () => {
    const quantity = parseInt(formData.quantity) || 1;
    addToCart(product, quantity, formData.color || undefined);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = encodeURIComponent(
      `Hello Reliance Tanks Ltd,

I would like to enquire about the following tank:

Product: ${product.name}
Category: ${product.category}
${product.capacity ? `Capacity: ${product.capacity}` : "Capacity: Contact us to confirm available sizes"}
${formData.color ? `Colour: ${formData.color}` : ""}
Quantity: ${formData.quantity}
${product.isPriceVerified ? `Price: KSh ${product.price?.toLocaleString()}` : product.referencePrice ? `Reference Price: KSh ${product.referencePrice?.toLocaleString()}` : "Price: Request Price"}

Please confirm availability, the current price and delivery arrangements.
Thank you!`
    );

    window.open(`https://wa.me/254732934360?text=${message}`, "_blank");
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-navy">Product Details</h2>
              <p className="text-gray-600 mt-2">{product.name}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-8">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-contain rounded-lg bg-gray-50"
            />
          </div>

          <div className="space-y-4 mb-8">
            <div>
              <span className="text-sm text-gray-500">Category:</span>
              <p className="font-medium text-navy">{product.category}</p>
            </div>
            {product.capacity && (
              <div>
                <span className="text-sm text-gray-500">Capacity:</span>
                <p className="font-medium text-navy">{product.capacity}</p>
              </div>
            )}
            {product.colors && product.colors.length > 0 && (
              <div>
                <span className="text-sm text-gray-500">Available Colors:</span>
                <p className="font-medium text-navy">{product.colors.join(", ")}</p>
              </div>
            )}
            <div>
              <span className="text-sm text-gray-500">Price:</span>
              <p className="font-medium text-navy text-lg">
                {product.isPriceVerified
                  ? `KSh ${product.price?.toLocaleString()}`
                  : product.referencePrice
                  ? `KSh ${product.referencePrice?.toLocaleString()} (Reference)`
                  : "Request Price"}
              </p>
              {!product.isPriceVerified && (
                <p className="text-xs text-gray-500 mt-2">
                  * Contact us for confirmed pricing
                </p>
              )}
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-navy mb-2">
                  Select Color
                </label>
                <select
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                >
                  <option value="">Select color</option>
                  {product.colors.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-navy mb-2">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="secondary"
                className="flex-1"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
              <Button type="submit" variant="whatsapp" className="flex-1">
                Enquire via WhatsApp
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
