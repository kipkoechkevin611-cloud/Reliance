"use client";

import React from "react";
import { Button } from "./Button";
import { useCart } from "@/lib/cart-context";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();

  if (!isOpen) return null;

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const message = encodeURIComponent(
      `Hello Reliance Tanks Ltd,

I would like to place an order for the following items:

${cart
  .map(
    (item) =>
      `- ${item.product.name} (${item.product.capacity || "Size TBD"})
    ${item.selectedColor ? `Color: ${item.selectedColor}` : ""}
    Quantity: ${item.quantity}
    ${item.product.isPriceVerified ? `Price: KSh ${item.product.price?.toLocaleString()}` : item.product.referencePrice ? `Reference Price: KSh ${item.product.referencePrice?.toLocaleString()}` : "Price: Request Price"}`
  )
  .join("\n\n")}

Total Reference: KSh ${cartTotal.toLocaleString()}

Please confirm availability, current prices, and delivery arrangements.
Thank you!`
    );

    window.open(`https://wa.me/254732934360?text=${message}`, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-navy">Shopping Cart</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close cart"
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
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor}`}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-contain rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-navy">{item.product.name}</h3>
                      {item.product.capacity && (
                        <p className="text-sm text-gray-600">{item.product.capacity}</p>
                      )}
                      {item.selectedColor && (
                        <p className="text-sm text-gray-600">Color: {item.selectedColor}</p>
                      )}
                      <p className="text-sm font-medium text-navy mt-1">
                        {item.product.isPriceVerified
                          ? `KSh ${item.product.price?.toLocaleString()}`
                          : item.product.referencePrice
                          ? `KSh ${item.product.referencePrice?.toLocaleString()} (Ref)`
                          : "Request Price"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-semibold"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-semibold"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-500 hover:text-red-700 p-2"
                      aria-label="Remove item"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total Reference:</span>
                  <span className="text-navy">KSh {cartTotal.toLocaleString()}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  * Prices are reference only. Contact us for confirmed pricing.
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    clearCart();
                    onClose();
                  }}
                >
                  Clear Cart
                </Button>
                <Button variant="whatsapp" className="flex-1" onClick={handleCheckout}>
                  Order via WhatsApp
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
