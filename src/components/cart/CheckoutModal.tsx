import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, Order, User } from '../../types';
import { RELifeStore } from '../../services/storage';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  cart: CartItem[];
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  cart,
  onOrderSuccess
}) => {
  if (!isOpen) return null;

  const [fullName, setFullName] = useState(currentUser.name || 'Alex Rivera');
  const [address, setAddress] = useState('742 Evergreen Terrace, Suite 4B');
  const [city, setCity] = useState('Austin');
  const [postalCode, setPostalCode] = useState('78701');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'Cash/Offline' | 'Demo Payment'>('Demo Payment');
  const [processing, setProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const subtotal = cart.reduce((sum, item) => sum + item.component.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 40;
  const total = subtotal + shipping;
  const totalEwasteGrams = cart.reduce(
    (sum, item) => sum + (item.component.sustainabilityImpactGrams || 50) * item.quantity,
    0
  );

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    setTimeout(() => {
      try {
        const order = RELifeStore.createOrder(
          currentUser,
          { fullName, address, city, postalCode },
          paymentMethod
        );
        setConfirmedOrder(order);
        onOrderSuccess(order);

        // Confetti celebration
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.error('Order creation error:', err);
      } finally {
        setProcessing(false);
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden my-8">
        {/* Header */}
        <div className="p-4 sm:px-6 border-b border-stone-200 flex items-center justify-between bg-emerald-950 text-white">
          <div>
            <div className="text-[11px] text-emerald-400 font-semibold uppercase tracking-wider">
              RELife Checkout
            </div>
            <h2 className="text-base font-bold">
              {confirmedOrder ? 'Order Confirmed!' : 'Delivery & Demo Payment'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-emerald-300 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmed Order State */}
        {confirmedOrder ? (
          <div className="p-6 sm:p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-emerald-700" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-stone-900">Hardware Successfully Reserved!</h3>
              <p className="text-xs text-stone-500 mt-1 font-mono">
                Order ID: <span className="font-bold text-stone-800">{confirmedOrder.id}</span>
              </p>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-950 max-w-md mx-auto space-y-1 text-left">
              <div className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>Environmental Impact Generated:</span>
              </div>
              <div>• Reused: <strong>{confirmedOrder.totalEwasteReusedGrams}g</strong> of electronics</div>
              <div>• Enabled up to: <strong>{confirmedOrder.potentialProjectsEnabled}</strong> circular build projects</div>
              <div>• Awarded: <strong>+120 RELife points</strong> to your maker profile</div>
            </div>

            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Components have been deducted from marketplace inventory and added to your active orders history.
            </p>

            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-md cursor-pointer shadow-xs"
            >
              Continue to "Build What I Have"
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handlePlaceOrder} className="p-6 sm:p-8 space-y-6">
            {/* Demo Notice Banner */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">DEMO MODE ACTIVE: </span>
                <span>No real monetary transactions will occur. This prototype updates stock, records orders, and awards circularity impact.</span>
              </div>
            </div>

            {/* Delivery Fields */}
            <div>
              <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3">
                1. Delivery Destination
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-md focus:ring-1 focus:ring-emerald-700 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-md focus:ring-1 focus:ring-emerald-700 focus:outline-hidden"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Address</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-md focus:ring-1 focus:ring-emerald-700 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div>
              <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3">
                2. Select Prototype Payment Gateway
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'Demo Payment', label: 'Demo Pay (Instant)' },
                  { id: 'UPI', label: 'UPI (Demo)' },
                  { id: 'Card', label: 'Card (Demo)' },
                  { id: 'Cash/Offline', label: 'Cash / Pickup' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setPaymentMethod(opt.id as any)}
                    className={`p-2.5 rounded-lg border text-xs font-semibold text-left cursor-pointer transition-all ${
                      paymentMethod === opt.id
                        ? 'border-emerald-700 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-700'
                        : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Order Review Breakdown */}
            <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Items ({cart.length} types)</span>
                <span className="font-semibold text-stone-900">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Total E-Waste Reused</span>
                <span className="font-semibold text-emerald-800">{totalEwasteGrams} grams</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                <span>Final Payable</span>
                <span>₹{total}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-stone-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={processing}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 disabled:opacity-50 rounded-md cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                {processing ? (
                  <span>Processing Demo Payment...</span>
                ) : (
                  <>
                    <span>Confirm Order (₹{total})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
