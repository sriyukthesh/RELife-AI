import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { CartItem } from '../../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (componentId: string, quantity: number) => void;
  onRemoveItem: (componentId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.component.price * item.quantity, 0);
  const totalEwasteGrams = cart.reduce(
    (sum, item) => sum + (item.component.sustainabilityImpactGrams || 50) * item.quantity,
    0
  );
  const estimatedProjectsEnabled = Math.min(cart.length * 2, 8);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-950/60 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col">
        {/* Drawer Header */}
        <div className="p-4 sm:px-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-800" />
            <h2 className="font-bold text-stone-900 text-sm">Shopping Cart ({cart.length})</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-stone-400 hover:text-stone-700 hover:bg-stone-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:px-6 divide-y divide-stone-100">
          {cart.length === 0 ? (
            <div className="py-20 text-center text-stone-500 space-y-3">
              <ShoppingBag className="w-10 h-10 text-stone-300 mx-auto" />
              <p className="text-sm font-medium text-stone-700">Your cart is currently empty</p>
              <p className="text-xs text-stone-400 max-w-xs mx-auto">
                Explore the marketplace for salvaged microcontrollers, sensors, and actuators to build your next project.
              </p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.componentId} className="py-4 first:pt-0 flex items-start gap-3">
                <img
                  src={item.component.images.front}
                  alt={item.component.name}
                  className="w-14 h-14 object-cover rounded-md border border-stone-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-xs text-stone-900 truncate">
                    {item.component.name}
                  </h4>
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    {item.component.condition} · ₹{item.component.price} each
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-stone-200 rounded-md">
                      <button
                        onClick={() => onUpdateQuantity(item.componentId, item.quantity - 1)}
                        className="p-1 text-stone-500 hover:text-stone-900 hover:bg-stone-100 cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2.5 text-xs font-semibold text-stone-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.componentId, item.quantity + 1)}
                        disabled={item.quantity >= item.component.quantity}
                        className="p-1 text-stone-500 hover:text-stone-900 hover:bg-stone-100 disabled:opacity-30 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.componentId)}
                      className="text-stone-400 hover:text-red-600 p-1 cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary */}
        {cart.length > 0 && (
          <div className="p-4 sm:px-6 border-t border-stone-200 bg-stone-50 space-y-4">
            {/* Impact Metric callout */}
            <div className="p-3 bg-emerald-100/60 border border-emerald-200 rounded-lg text-xs space-y-1">
              <div className="flex items-center justify-between font-bold text-emerald-950">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Estimated E-Waste Reused:</span>
                </span>
                <span>{totalEwasteGrams} grams</span>
              </div>
              <div className="text-[11px] text-emerald-900/80">
                Potential RELife projects enabled: <strong>{estimatedProjectsEnabled}</strong>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Estimated Shipping</span>
                <span>{subtotal > 500 ? 'FREE' : '₹40'}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                <span>Total</span>
                <span>₹{subtotal + (subtotal > 500 ? 0 : 40)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-md cursor-pointer flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
