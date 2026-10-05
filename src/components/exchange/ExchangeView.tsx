import React, { useState } from 'react';
import { Repeat, Plus, CheckCircle2, MessageSquare, ArrowRight, User } from 'lucide-react';
import { ComponentCategory, ComponentRequest, User as UserType } from '../../types';
import { RELifeStore } from '../../services/storage';

interface ExchangeViewProps {
  currentUser: UserType;
  requests: ComponentRequest[];
  onRefreshRequests: () => void;
}

export const ExchangeView: React.FC<ExchangeViewProps> = ({
  currentUser,
  requests,
  onRefreshRequests
}) => {
  const [showPostModal, setShowPostModal] = useState(false);
  const [componentName, setComponentName] = useState('');
  const [category, setCategory] = useState<ComponentCategory>('Sensors');
  const [quantityNeeded, setQuantityNeeded] = useState(2);
  const [projectTitle, setProjectTitle] = useState('');

  // Make offer state
  const [offeringReqId, setOfferingReqId] = useState<string | null>(null);
  const [offerPrice, setOfferPrice] = useState(100);
  const [offerNote, setOfferNote] = useState('Available in my surplus inventory!');

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const newReq: ComponentRequest = {
      id: `req-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      componentName,
      category,
      quantityNeeded,
      projectTitle,
      status: 'Open',
      offers: [],
      createdAt: new Date().toISOString()
    };
    RELifeStore.addRequest(newReq);
    setShowPostModal(false);
    setComponentName('');
    setProjectTitle('');
    onRefreshRequests();
  };

  const handleSendOffer = (requestId: string) => {
    RELifeStore.addOfferToRequest(requestId, {
      userId: currentUser.id,
      userName: currentUser.name,
      componentId: `offer-${Date.now()}`,
      price: offerPrice,
      note: offerNote
    });
    setOfferingReqId(null);
    onRefreshRequests();
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900">
            Community Component Exchange
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Need a specific sensor or microcontroller? Post a request and trade surplus directly with fellow makers.
          </p>
        </div>
        <button
          onClick={() => setShowPostModal(true)}
          className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-md cursor-pointer transition-colors shadow-xs"
        >
          + Post Component Request
        </button>
      </div>

      {/* Requests List */}
      <div className="space-y-6">
        {requests.map(req => (
          <div key={req.id} className="bg-white rounded-xl border border-stone-200 shadow-xs p-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
              <div>
                <div className="text-[11px] text-stone-500 flex items-center gap-1.5 mb-1">
                  <User className="w-3.5 h-3.5 text-stone-400" />
                  <span>Posted by <strong className="text-stone-800">{req.userName}</strong></span>
                  <span>·</span>
                  <span>{new Date(req.createdAt).toLocaleDateString()}</span>
                </div>
                <h3 className="text-base font-bold text-stone-900">
                  Seeking {req.quantityNeeded}× {req.componentName}
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  For Project: <strong className="text-stone-800">{req.projectTitle}</strong> ({req.category})
                </p>
              </div>

              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 self-start">
                {req.status} ({req.offers.length} offers)
              </span>
            </div>

            {/* Existing Offers */}
            {req.offers.length > 0 && (
              <div className="mt-3 pt-3 border-t border-stone-100 space-y-2">
                <div className="text-[11px] font-semibold text-stone-500">Community Offers:</div>
                {req.offers.map((offer, idx) => (
                  <div key={idx} className="p-2.5 bg-stone-50 rounded-md border border-stone-200 text-xs flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-stone-900">{offer.userName}: </span>
                      <span className="text-stone-600">{offer.note}</span>
                    </div>
                    <span className="font-mono font-bold text-emerald-800">₹{offer.price}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Offer Action Form */}
            {offeringReqId === req.id ? (
              <div className="mt-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200 space-y-3 text-xs">
                <div className="font-semibold text-emerald-950">Offer Surplus to {req.userName}:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-stone-700 mb-1">Offered Price (₹)</label>
                    <input
                      type="number"
                      value={offerPrice}
                      onChange={e => setOfferPrice(parseInt(e.target.value) || 0)}
                      className="w-full px-2 py-1.5 text-xs bg-white border border-stone-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-stone-700 mb-1">Note / Delivery</label>
                    <input
                      type="text"
                      value={offerNote}
                      onChange={e => setOfferNote(e.target.value)}
                      className="w-full px-2 py-1.5 text-xs bg-white border border-stone-300 rounded"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setOfferingReqId(null)}
                    className="px-3 py-1.5 text-xs text-stone-600 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSendOffer(req.id)}
                    className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded cursor-pointer"
                  >
                    Submit Offer
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-4 pt-3 border-t border-stone-100 flex justify-end">
                <button
                  onClick={() => setOfferingReqId(req.id)}
                  className="text-xs font-semibold text-emerald-800 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-md cursor-pointer flex items-center gap-1 transition-colors"
                >
                  <Repeat className="w-3.5 h-3.5" />
                  <span>Offer from My Inventory</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal to Post Request */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/70 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-stone-900">Post a Component Request</h3>
            <form onSubmit={handleCreateRequest} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Component Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ESP32-WROOM-32 or HC-SR04"
                  value={componentName}
                  onChange={e => setComponentName(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Quantity Needed</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={quantityNeeded}
                  onChange={e => setQuantityNeeded(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Target Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Automated Plant Hydration Monitor"
                  value={projectTitle}
                  onChange={e => setProjectTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="px-3 py-2 text-stone-600 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-md cursor-pointer"
                >
                  Post Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
