import React from 'react';
import { Package, Truck, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { Order } from '../../types';

interface OrdersViewProps {
  orders: Order[];
  onNavigateToMarketplace: () => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({ orders, onNavigateToMarketplace }) => {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-stone-900">My Orders & Allocations</h1>
        <p className="text-xs text-stone-500 mt-1">
          Review your circular hardware acquisitions and track delivery status.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="p-12 bg-white rounded-xl border border-stone-200 text-center space-y-3">
          <Package className="w-10 h-10 text-stone-300 mx-auto" />
          <h3 className="text-sm font-semibold text-stone-900">No active orders found</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Browse the marketplace to order surplus electronics or missing build components.
          </p>
          <button
            onClick={onNavigateToMarketplace}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-md cursor-pointer"
          >
            Explore Marketplace
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
              <div className="p-4 sm:px-6 bg-stone-50 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-stone-500">Order ID: </span>
                  <span className="font-mono font-bold text-stone-900">{order.id}</span>
                  <span className="text-stone-400 mx-2">·</span>
                  <span className="text-stone-500">{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-900 border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                    <span className="capitalize">{order.status}</span>
                  </span>
                  <span className="font-bold text-stone-900 text-sm">₹{order.total}</span>
                </div>
              </div>

              <div className="p-4 sm:px-6 divide-y divide-stone-100">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-3 first:pt-0 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-stone-900">{item.name}</div>
                      <div className="text-[11px] text-stone-500">
                        Qty: {item.quantity} · Salvaged e-waste: {item.sustainabilityImpactGrams}g
                      </div>
                    </div>
                    <div className="font-mono font-medium text-stone-900">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 sm:px-6 bg-stone-50/50 border-t border-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-stone-600 gap-2">
                <div className="flex items-center gap-1.5 text-emerald-900 font-semibold">
                  <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Diverted {order.totalEwasteReusedGrams}g e-waste · Payment: {order.paymentMethod}</span>
                </div>
                <div className="text-[11px] text-stone-500">
                  Shipping to: {order.shippingAddress.address}, {order.shippingAddress.city}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
