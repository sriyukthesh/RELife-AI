import React, { useState } from 'react';
import {
  Package,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Plus,
  Repeat,
  Sparkles,
  Search
} from 'lucide-react';
import { ComponentItem, ComponentLifecycleState, User } from '../../types';
import { RELifeStore } from '../../services/storage';

interface InventoryViewProps {
  currentUser: User;
  inventory: ComponentItem[];
  onNavigateToSell: () => void;
  onNavigateToBuildWhatIHave: () => void;
  onSelectComponent: (component: ComponentItem) => void;
}

export const InventoryView: React.FC<InventoryViewProps> = ({
  currentUser,
  inventory,
  onNavigateToSell,
  onNavigateToBuildWhatIHave,
  onSelectComponent
}) => {
  const [selectedLifecycle, setSelectedLifecycle] = useState<string>('All');
  const [search, setSearch] = useState('');

  const lifecycleStages: ComponentLifecycleState[] = [
    'Discarded',
    'Recovered',
    'Inspected',
    'Listed',
    'Verified',
    'Available',
    'Reserved',
    'Sold',
    'Used in Project',
    'Reused'
  ];

  const filtered = inventory.filter(item => {
    if (selectedLifecycle !== 'All' && item.lifecycleState !== selectedLifecycle) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return item.name.toLowerCase().includes(q) || item.model.toLowerCase().includes(q);
    }
    return true;
  });

  const getLifecycleColor = (state: ComponentLifecycleState) => {
    switch (state) {
      case 'Available':
      case 'Verified':
        return 'bg-emerald-100 text-emerald-900 border-emerald-200';
      case 'Used in Project':
      case 'Reused':
        return 'bg-blue-100 text-blue-900 border-blue-200';
      case 'Sold':
      case 'Reserved':
        return 'bg-purple-100 text-purple-900 border-purple-200';
      case 'Recovered':
      case 'Inspected':
        return 'bg-amber-100 text-amber-900 border-amber-200';
      default:
        return 'bg-stone-100 text-stone-800 border-stone-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900">
            My Electronics Inventory
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Track hardware lifecycle states from discarded recovery through verification, listing, and project reuse.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateToBuildWhatIHave}
            className="px-4 py-2 text-xs font-semibold text-emerald-950 bg-emerald-100 hover:bg-emerald-200 rounded-md cursor-pointer transition-colors shadow-xs"
          >
            What Can I Build?
          </button>
          <button
            onClick={onNavigateToSell}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-md cursor-pointer transition-colors shadow-xs"
          >
            + Add Component
          </button>
        </div>
      </div>

      {/* Lifecycle Flow Visual Bar */}
      <div className="bg-white rounded-xl border border-stone-200 p-4 mb-8 shadow-xs overflow-x-auto">
        <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-2">
          Circular Lifecycle Pipeline
        </div>
        <div className="flex items-center gap-2 min-w-[700px] text-xs">
          {lifecycleStages.map((stage, idx) => (
            <React.Fragment key={stage}>
              <button
                onClick={() => setSelectedLifecycle(stage === selectedLifecycle ? 'All' : stage)}
                className={`px-2.5 py-1 rounded border text-[11px] font-medium whitespace-nowrap cursor-pointer transition-colors ${
                  selectedLifecycle === stage
                    ? 'bg-emerald-800 text-white border-emerald-900'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {stage}
              </button>
              {idx < lifecycleStages.length - 1 && (
                <ArrowRight className="w-3 h-3 text-stone-300 shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-xl border border-stone-200 p-4 mb-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search inventory by component name or part number..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border border-stone-200 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-3 text-xs text-stone-600">
          <span>Active filter: <strong className="text-stone-900">{selectedLifecycle}</strong></span>
          {selectedLifecycle !== 'All' && (
            <button
              onClick={() => setSelectedLifecycle('All')}
              className="text-emerald-800 font-semibold hover:underline cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Inventory Table / Cards */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-stone-200 p-12 text-center max-w-md mx-auto space-y-3">
          <Package className="w-10 h-10 text-stone-300 mx-auto" />
          <h3 className="text-sm font-semibold text-stone-900">No components found in this state</h3>
          <p className="text-xs text-stone-500">
            Use the listing wizard with live camera verification to digitize components into your inventory.
          </p>
          <button
            onClick={onNavigateToSell}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-md cursor-pointer"
          >
            List a Component
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(comp => (
            <div
              key={comp.id}
              onClick={() => onSelectComponent(comp)}
              className="bg-white rounded-xl border border-stone-200 hover:border-emerald-700/50 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between cursor-pointer"
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <img
                    src={comp.images.front}
                    alt={comp.name}
                    className="w-16 h-16 object-cover rounded-lg border border-stone-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 text-[10px] text-stone-500 mb-0.5">
                      <span>{comp.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono">{comp.model}</span>
                    </div>
                    <h3 className="font-bold text-stone-900 text-xs leading-snug truncate">
                      {comp.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${getLifecycleColor(comp.lifecycleState)}`}>
                        {comp.lifecycleState}
                      </span>
                      <span className="text-[10px] text-stone-500">
                        Qty: <strong>{comp.quantity}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1 text-emerald-800 font-semibold font-mono">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Trust: {comp.trustProfile.overallTrustScore}/100</span>
                  </div>
                  <div className="text-stone-500">
                    Avoids: <strong className="text-stone-800">{comp.sustainabilityImpactGrams}g</strong> e-waste
                  </div>
                </div>
              </div>

              <div className="px-4 py-2.5 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="font-bold text-stone-900">
                  {comp.isGiveaway || comp.price === 0 ? 'Giveaway' : `₹${comp.price}`}
                </span>
                <span className="text-emerald-800 font-semibold hover:underline flex items-center gap-1">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
