"use client";

import React, { useState } from "react";
import { Button } from "./Button";
import { useCart } from "@/lib/cart-context";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { cart, cartTotal, verifiedTotal, hasUnverifiedPrices, clearCart } = useCart();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    deliveryLocation: "",
    orderNotes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const generateOrderReference = () => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `REL-${timestamp}-${random}`;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    if (!formData.deliveryLocation.trim()) {
      newErrors.deliveryLocation = "Delivery location is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    setIsSubmitting(true);

    const orderReference = generateOrderReference();

    const items = cart
      .map(
        (item) =>
          `${item.product.name} — ${item.product.capacity || "Size TBD"}
Quantity: ${item.quantity}
${item.selectedColor ? `Color: ${item.selectedColor}` : ""}
Price: ${
  item.product.isPriceVerified
    ? `KSh ${item.product.price?.toLocaleString()}`
    : "To be confirmed"
}`
      )
      .join("\n\n");

    const message = encodeURIComponent(
      `Hello Reliance Tanks Ltd,

I would like to place an order.

Order reference: ${orderReference}

Customer name: ${formData.fullName}
Phone: ${formData.phone}
Delivery location: ${formData.deliveryLocation}
${formData.orderNotes ? `Order notes: ${formData.orderNotes}` : ""}

Items:
${items}

${hasUnverifiedPrices
  ? `Estimated total: To be confirmed (some prices require verification)`
  : `Estimated total: KSh ${verifiedTotal.toLocaleString()}`
}

Please confirm the final prices, product availability and delivery charges.
Thank you.`
    );

    window.open(`https://wa.me/254732934360?text=${message}`, "_blank");

    setIsSubmitting(false);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-navy">Checkout</h2>
              <p className="text-gray-600 mt-1">Complete your order via WhatsApp</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close checkout"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">Your cart is empty</p>
              <Button variant="outline" onClick={onClose}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-navy mb-4">Order Summary</h3>
                <div className="space-y-3 mb-4">
                  {cart.map((item, index) => (
                    <div
                      key={`${item.product.id}-${item.selectedColor}-${index}`}
                      className="flex justify-between items-start text-sm"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-navy">{item.product.name}</p>
                        <p className="text-gray-600">{item.product.capacity || "Size TBD"}</p>
                        {item.selectedColor && (
                          <p className="text-gray-600">Color: {item.selectedColor}</p>
                        )}
                        <p className="text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-navy">
                          {item.product.isPriceVerified
                            ? `KSh ${((item.product.price || 0) * item.quantity).toLocaleString()}`
                            : item.product.referencePrice
                            ? `KSh ${(item.product.referencePrice * item.quantity).toLocaleString()} (Ref)`
                            : "Request Price"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Estimated Total:</span>
                    <span className="text-navy">
                      {hasUnverifiedPrices
                        ? "To be confirmed"
                        : `KSh ${verifiedTotal.toLocaleString()}`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pricing Notice */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> Prices shown as reference prices are not confirmed Reliance Tanks quotations. Final product prices, availability and delivery charges will be confirmed by Reliance Tanks Ltd before an order is finalized.
                </p>
              </div>

              {/* Checkout Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy ${
                      errors.fullName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Delivery Location *
                  </label>
                  <input
                    type="text"
                    name="deliveryLocation"
                    value={formData.deliveryLocation}
                    onChange={handleChange}
                    placeholder="Enter your town or location"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy ${
                      errors.deliveryLocation ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.deliveryLocation && (
                    <p className="text-red-500 text-sm mt-1">{errors.deliveryLocation}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Order Notes (Optional)
                  </label>
                  <textarea
                    name="orderNotes"
                    value={formData.orderNotes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Any specific requirements or questions"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy resize-none"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="whatsapp"
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Place Order on WhatsApp"}
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
