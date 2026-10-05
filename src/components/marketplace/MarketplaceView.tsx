import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  ArrowUpDown,
  Tag,
  Check,
  AlertTriangle,
  Camera
} from 'lucide-react';
import { ComponentCategory, ComponentCondition, ComponentItem } from '../../types';

interface MarketplaceViewProps {
  components: ComponentItem[];
  onSelectComponent: (component: ComponentItem) => void;
  onAddToCart: (component: ComponentItem) => void;
  onNavigateToSell: () => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  components,
  onSelectComponent,
  onAddToCart,
  onNavigateToSell
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCondition, setSelectedCondition] = useState<string>('All');
  const [minTrustScore, setMinTrustScore] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc' | 'trust' | 'impact'>('relevance');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const categories = [
    'All',
    'Microcontrollers',
    'Sensors',
    'Displays',
    'Motors',
    'Power Components',
    'Actuators',
    'Communication Modules',
    'Cables',
    'Other Electronics'
  ];

  const filteredComponents = useMemo(() => {
    return components.filter(c => {
      if (c.status !== 'active' || c.quantity <= 0) return false;

      // Category filter
      if (selectedCategory !== 'All' && c.category !== selectedCategory) return false;

      // Condition filter
      if (selectedCondition !== 'All' && c.condition !== selectedCondition) return false;

      // Trust score filter
      if (c.trustProfile.overallTrustScore < minTrustScore) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = c.name.toLowerCase().includes(q);
        const matchesModel = c.model.toLowerCase().includes(q);
        const matchesMfg = c.manufacturer.toLowerCase().includes(q);
        const matchesCat = c.category.toLowerCase().includes(q);
        if (!matchesName && !matchesModel && !matchesMfg && !matchesCat) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'trust') return b.trustProfile.overallTrustScore - a.trustProfile.overallTrustScore;
      if (sortBy === 'impact') return b.sustainabilityImpactGrams - a.sustainabilityImpactGrams;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [components, searchQuery, selectedCategory, selectedCondition, minTrustScore, sortBy]);

  const handleAddToCartClick = (e: React.MouseEvent, comp: ComponentItem) => {
    e.stopPropagation();
    onAddToCart(comp);
    setAddedIds(prev => ({ ...prev, [comp.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [comp.id]: false }));
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Header and Callout */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900">
            Circular Electronics Marketplace
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Verified decommissioned components, surplus makerspace stock, and repairable hardware.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateToSell}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-md cursor-pointer transition-colors shadow-xs"
          >
            + List a Component
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-stone-200 p-4 mb-8 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search components by name, model, chip, or specification..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs border border-stone-200 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-hidden"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-500 shrink-0" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="w-full sm:w-auto px-3 py-2 text-xs border border-stone-200 rounded-lg bg-white focus:outline-hidden"
            >
              <option value="relevance">Sort: Latest Additions</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="trust">Highest Trust Score</option>
              <option value="impact">Highest E-Waste Impact</option>
            </select>
          </div>
        </div>

        {/* Category Segmented Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap cursor-pointer transition-colors ${
                selectedCategory === cat
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Secondary Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-stone-100 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-stone-500">Condition:</span>
              <select
                value={selectedCondition}
                onChange={e => setSelectedCondition(e.target.value)}
                className="px-2 py-1 border border-stone-200 rounded bg-white text-stone-700"
              >
                <option value="All">All Conditions</option>
                <option value="New/Unused">New / Unused</option>
                <option value="Like New">Like New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Salvage/Parts Only">Salvage Only</option>
                <option value="Non-Functional">Non-Functional (Repair)</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-stone-500">Min Trust:</span>
              <select
                value={minTrustScore}
                onChange={e => setMinTrustScore(parseInt(e.target.value))}
                className="px-2 py-1 border border-stone-200 rounded bg-white text-stone-700"
              >
                <option value={0}>Any Trust Score</option>
                <option value={85}>85+ (Identity Checked)</option>
                <option value={90}>90+ (High Trust)</option>
                <option value={95}>95+ (Verified Flagship)</option>
              </select>
            </div>
          </div>

          <div className="text-stone-500 text-[11px]">
            Showing <span className="font-semibold text-stone-900">{filteredComponents.length}</span> verified components
          </div>
        </div>
      </div>

      {/* Grid of Component Cards */}
      {filteredComponents.length === 0 ? (
        <div className="bg-white rounded-xl border border-stone-200 p-12 text-center max-w-md mx-auto">
          <SlidersHorizontal className="w-10 h-10 text-stone-400 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-stone-900">No components match your search</h3>
          <p className="text-xs text-stone-500 mt-1">
            Try adjusting your category or minimum trust filter, or check back soon as makers list new surplus daily.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedCondition('All');
              setMinTrustScore(0);
            }}
            className="mt-4 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-md cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredComponents.map(comp => (
            <div
              key={comp.id}
              onClick={() => onSelectComponent(comp)}
              className="group bg-white rounded-xl border border-stone-200 hover:border-emerald-700/50 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col cursor-pointer"
            >
              {/* Image Thumbnail */}
              <div className="relative aspect-4/3 bg-stone-100 overflow-hidden">
                <img
                  src={comp.images.front}
                  alt={comp.name}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                />
                {/* Clean unboxed category kicker */}
                <div className="absolute top-2.5 left-2.5 bg-stone-900/85 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded font-medium">
                  {comp.category}
                </div>
                {/* Trust Score */}
                <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-xs text-stone-900 text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-700" />
                  <span>{comp.trustProfile.overallTrustScore}/100</span>
                </div>
                {/* Live Camera Badge */}
                {comp.images.front && comp.images.front.startsWith('data:image') && (
                  <div className="absolute bottom-2.5 left-2.5 bg-emerald-950/90 text-emerald-300 text-[9px] font-bold px-2 py-0.5 rounded shadow-xs flex items-center gap-1 backdrop-blur-xs border border-emerald-700/60">
                    <Camera className="w-3 h-3 text-emerald-400" />
                    <span>LIVE PHOTO</span>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] text-stone-500 mb-1">
                    <span>{comp.manufacturer}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">{comp.model}</span>
                  </div>

                  <h3 className="font-bold text-stone-900 text-sm leading-snug line-clamp-1 group-hover:text-emerald-800 transition-colors">
                    {comp.name}
                  </h3>

                  <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-2">
                    <span className={comp.condition === 'Non-Functional' ? 'text-amber-700 font-semibold' : ''}>
                      {comp.condition}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>Qty: {comp.quantity}</span>
                    <span aria-hidden="true">·</span>
                    <span>{comp.location}</span>
                  </div>

                  {comp.safetyWarnings.length > 0 && (
                    <div className="mt-2 text-[10px] text-amber-800 flex items-center gap-1 font-medium bg-amber-50/80 px-2 py-0.5 rounded">
                      <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
                      <span className="truncate">{comp.safetyWarnings[0]}</span>
                    </div>
                  )}
                </div>

                {/* Footer Price & Add */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    {comp.isGiveaway || comp.price === 0 ? (
                      <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                        Free Giveaway
                      </span>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs text-stone-500 font-sans">₹</span>
                        <span className="text-base font-bold text-stone-900">{comp.price}</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={e => handleAddToCartClick(e, comp)}
                    disabled={addedIds[comp.id]}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md cursor-pointer transition-colors flex items-center gap-1 ${
                      addedIds[comp.id]
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-emerald-800 hover:bg-emerald-700 text-white shadow-xs'
                    }`}
                  >
                    {addedIds[comp.id] ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
