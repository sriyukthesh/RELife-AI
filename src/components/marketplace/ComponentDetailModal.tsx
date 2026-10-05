import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  ShoppingBag,
  AlertTriangle,
  FileText,
  MapPin,
  Star,
  CheckCircle2,
  Flag,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { ComponentItem, Project } from '../../types';

interface ComponentDetailModalProps {
  component: ComponentItem | null;
  onClose: () => void;
  onAddToCart: (component: ComponentItem) => void;
  onBuyNow: (component: ComponentItem) => void;
  onOpenReport: (component: ComponentItem) => void;
  onSelectProject: (projectId: string) => void;
  allProjects: Project[];
}

export const ComponentDetailModal: React.FC<ComponentDetailModalProps> = ({
  component,
  onClose,
  onAddToCart,
  onBuyNow,
  onOpenReport,
  onSelectProject,
  allProjects
}) => {
  if (!component) return null;

  const [activeImageKey, setActiveImageKey] = useState<'front' | 'back' | 'functionalProof'>('front');

  const compatibleProjects = allProjects.filter(p =>
    p.requiredComponents.some(req =>
      req.category === component.category ||
      req.name.toLowerCase().includes(component.name.toLowerCase()) ||
      component.compatibleProjectIds.includes(p.id)
    )
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="p-4 sm:px-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2 text-xs text-stone-600">
            <span className="font-semibold text-stone-900">{component.category}</span>
            <span aria-hidden="true">/</span>
            <span>{component.manufacturer}</span>
            <span aria-hidden="true">/</span>
            <span className="font-mono text-stone-500">{component.model}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-stone-400 hover:text-stone-700 hover:bg-stone-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Image Gallery */}
            <div>
              <div className="aspect-4/3 w-full bg-stone-950 rounded-lg overflow-hidden border border-stone-200 flex items-center justify-center relative">
                <img
                  src={
                    activeImageKey === 'front'
                      ? component.images.front
                      : activeImageKey === 'back'
                      ? component.images.back
                      : component.images.functionalProof || component.images.front
                  }
                  alt={component.name}
                  className="w-full h-full object-contain"
                />
                <div className="absolute bottom-2.5 left-2.5 bg-stone-900/80 text-white text-[11px] px-2 py-0.5 rounded backdrop-blur-xs">
                  {activeImageKey === 'front' ? 'Front Side View' : activeImageKey === 'back' ? 'Back / Solder Mask View' : 'Functional Evidence'}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={() => setActiveImageKey('front')}
                  className={`w-16 h-12 rounded border overflow-hidden cursor-pointer ${
                    activeImageKey === 'front' ? 'border-emerald-700 ring-2 ring-emerald-600/30' : 'border-stone-200'
                  }`}
                >
                  <img src={component.images.front} alt="Front" className="w-full h-full object-cover" />
                </button>
                <button
                  onClick={() => setActiveImageKey('back')}
                  className={`w-16 h-12 rounded border overflow-hidden cursor-pointer ${
                    activeImageKey === 'back' ? 'border-emerald-700 ring-2 ring-emerald-600/30' : 'border-stone-200'
                  }`}
                >
                  <img src={component.images.back} alt="Back" className="w-full h-full object-cover" />
                </button>
                {component.images.functionalProof && (
                  <button
                    onClick={() => setActiveImageKey('functionalProof')}
                    className={`w-16 h-12 rounded border overflow-hidden cursor-pointer ${
                      activeImageKey === 'functionalProof' ? 'border-emerald-700 ring-2 ring-emerald-600/30' : 'border-stone-200'
                    }`}
                  >
                    <img src={component.images.functionalProof} alt="Proof" className="w-full h-full object-cover" />
                  </button>
                )}
              </div>

              {/* Seller snippet */}
              <div className="mt-6 p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center justify-between text-xs">
                <div>
                  <div className="text-stone-500 text-[11px]">Listed by Maker</div>
                  <div className="font-semibold text-stone-900">{component.sellerName}</div>
                  <div className="text-stone-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-stone-400" />
                    <span>{component.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-emerald-800 font-bold bg-white px-2 py-1 rounded border border-stone-200">
                  <Star className="w-3.5 h-3.5 fill-emerald-700 text-emerald-700" />
                  <span>{component.sellerRating}</span>
                </div>
              </div>
            </div>

            {/* Right: Component Identity & Trust Profile */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-stone-900 leading-tight">
                  {component.name}
                </h2>
                <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                  <span>Condition: <strong className="text-stone-800">{component.condition}</strong></span>
                  <span aria-hidden="true">·</span>
                  <span>Age: {component.ageMonths} months</span>
                  <span aria-hidden="true">·</span>
                  <span>Available: {component.quantity} units</span>
                </div>
              </div>

              {/* Price Banner */}
              <div className="p-4 bg-emerald-50/50 rounded-lg border border-emerald-200/80 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-emerald-800 font-medium block">RELife Circular Price</span>
                  {component.isGiveaway || component.price === 0 ? (
                    <span className="text-xl font-bold text-emerald-800">FREE COMMUNITY REUSE</span>
                  ) : (
                    <div className="text-2xl font-bold text-stone-900 flex items-baseline gap-1">
                      <span className="text-sm font-normal text-stone-500">₹</span>
                      <span>{component.price}</span>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-emerald-700 font-semibold block uppercase">Waste Avoidance</span>
                  <span className="text-xs font-bold text-stone-900">{component.sustainabilityImpactGrams}g E-Waste</span>
                </div>
              </div>

              {/* Trust & Verification Breakdown */}
              <div className="border border-stone-200 rounded-lg p-4 bg-white shadow-2xs space-y-3">
                <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span className="text-xs font-bold text-stone-900">Verified Component Trust Profile</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-emerald-800">
                    {component.trustProfile.overallTrustScore} / 100 Trust Score
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-stone-50 rounded">
                    <span className="text-stone-500 text-[11px] block">Identity Confidence</span>
                    <span className="font-bold text-stone-900">{component.trustProfile.identityConfidence}%</span>
                  </div>
                  <div className="p-2 bg-stone-50 rounded">
                    <span className="text-stone-500 text-[11px] block">Authenticity Conf.</span>
                    <span className="font-bold text-stone-900">{component.trustProfile.authenticityConfidence}%</span>
                  </div>
                  <div className="p-2 bg-stone-50 rounded">
                    <span className="text-stone-500 text-[11px] block">Functional Evidence</span>
                    <span className="font-semibold text-emerald-800">{component.trustProfile.functionalEvidence}</span>
                  </div>
                  <div className="p-2 bg-stone-50 rounded">
                    <span className="text-stone-500 text-[11px] block">Verification Level</span>
                    <span className="font-semibold text-stone-900">{component.verificationLevel.replace('_', ' ')}</span>
                  </div>
                </div>

                {component.trustProfile.aiAnalysis && (
                  <div className="text-[11px] text-stone-600 bg-emerald-50/40 p-2.5 rounded border border-emerald-100 flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-stone-800">Optical Inspection: </span>
                      {component.trustProfile.aiAnalysis.markingIntegrity}. No cracked pins or surface delamination.
                    </div>
                  </div>
                )}
              </div>

              {/* Safety Warnings if any */}
              {component.safetyWarnings.length > 0 && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Safety Notice: </span>
                    <span>{component.safetyWarnings.join(' ')}</span>
                  </div>
                </div>
              )}

              {/* Specifications Table */}
              <div>
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                  Technical Specifications
                </h4>
                <div className="border border-stone-200 rounded-lg overflow-hidden divide-y divide-stone-100 text-xs">
                  {Object.entries(component.specifications).map(([key, val]) => (
                    <div key={key} className="flex justify-between py-1.5 px-3">
                      <span className="text-stone-500">{key}</span>
                      <span className="font-medium text-stone-900 text-right">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4 border-t border-stone-200">
                <button
                  onClick={() => onAddToCart(component)}
                  className="flex-1 py-2.5 px-4 text-xs font-semibold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 rounded-md cursor-pointer flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={() => onBuyNow(component)}
                  className="flex-1 py-2.5 px-4 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-md cursor-pointer flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>Buy Now</span>
                </button>
                <button
                  onClick={() => onOpenReport(component)}
                  className="p-2.5 text-stone-400 hover:text-amber-700 hover:bg-amber-50 rounded-md cursor-pointer transition-colors"
                  title="Report Listing"
                >
                  <Flag className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Compatible Projects Section */}
          {compatibleProjects.length > 0 && (
            <div className="pt-6 border-t border-stone-200">
              <h3 className="text-sm font-bold text-stone-900 mb-3 flex items-center gap-2">
                <span>Compatible RELife Projects Using This Component ({compatibleProjects.length})</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {compatibleProjects.slice(0, 3).map(proj => (
                  <div
                    key={proj.id}
                    onClick={() => {
                      onClose();
                      onSelectProject(proj.id);
                    }}
                    className="p-3 bg-stone-50 hover:bg-emerald-50/50 rounded-lg border border-stone-200 hover:border-emerald-700/50 transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-semibold text-stone-900">{proj.title}</div>
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        {proj.difficulty} · Diverts {proj.estimatedEwasteAvoidedGrams}g waste
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-400 shrink-0 ml-2" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
