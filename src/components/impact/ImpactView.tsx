import React, { useState } from 'react';
import {
  BarChart3,
  Recycle,
  Sparkles,
  Award,
  Search,
  CheckCircle2,
  TrendingUp,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { ComponentItem, ReuseCertificate, User } from '../../types';

interface ImpactViewProps {
  currentUser: User;
  allComponents: ComponentItem[];
  certificates: ReuseCertificate[];
  onOpenCertificate: (cert: ReuseCertificate) => void;
  onNavigateToMarketplace: () => void;
}

export const ImpactView: React.FC<ImpactViewProps> = ({
  currentUser,
  allComponents,
  certificates,
  onOpenCertificate,
  onNavigateToMarketplace
}) => {
  // Smart Procurement Calculator state
  const [procureName, setProcureName] = useState('ESP32');
  const [procureQty, setProcureQty] = useState(5);
  const [procureResult, setProcureResult] = useState<{
    availableInRELife: number;
    neededExternal: number;
    estimatedSavedINR: number;
    avoidedGrams: number;
  } | null>(null);

  const handleRunSmartProcurement = (e: React.FormEvent) => {
    e.preventDefault();
    const query = procureName.toLowerCase();
    const matches = allComponents.filter(c =>
      c.status === 'active' &&
      (c.name.toLowerCase().includes(query) || c.model.toLowerCase().includes(query))
    );

    const availableCount = matches.reduce((sum, item) => sum + item.quantity, 0);
    const availableInRELife = Math.min(procureQty, availableCount);
    const neededExternal = Math.max(0, procureQty - availableInRELife);
    const estimatedSavedINR = availableInRELife * 90; // saving vs buying retail new
    const avoidedGrams = availableInRELife * 85;

    setProcureResult({
      availableInRELife,
      neededExternal,
      estimatedSavedINR,
      avoidedGrams
    });
  };

  // Community-wide metrics
  const totalReusedCommunity = allComponents.filter(c => c.lifecycleState === 'Used in Project' || c.lifecycleState === 'Sold').length * 4 + 48;
  const totalEwasteCommunityKg = (totalReusedCommunity * 85) / 1000 + 14.5;
  const totalMoneySavedINR = Math.round(totalReusedCommunity * 110 + 4200);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Top Banner */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-stone-900">
          Sustainability & Circularity Impact Center
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Measurable landfill diversion, electronic component reuse metrics, and verified circular hardware credentials.
        </p>
      </div>

      {/* Primary KPI Grid (Personal vs Community) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
          <div className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">
            Personal E-Waste Avoided
          </div>
          <div className="text-2xl font-extrabold text-stone-900 mt-1 font-mono">
            {currentUser.ewasteAvoidedGrams.toLocaleString()} g
          </div>
          <div className="text-[11px] text-stone-500 mt-1">
            Equivalent to ~{Math.round(currentUser.ewasteAvoidedGrams / 85)} microcontrollers saved from scrap
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
          <div className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">
            Completed Verified Builds
          </div>
          <div className="text-2xl font-extrabold text-stone-900 mt-1 font-mono">
            {currentUser.projectsCompletedCount} Projects
          </div>
          <div className="text-[11px] text-stone-500 mt-1">
            Certified via RELife Digital Certificates
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
          <div className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">
            Maker Circularity Score
          </div>
          <div className="text-2xl font-extrabold text-emerald-950 mt-1 font-mono">
            92 / 100
          </div>
          <div className="text-[11px] text-stone-500 mt-1">
            Based on reuse efficiency & testing transparency
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
          <div className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">
            Total Community Diversion
          </div>
          <div className="text-2xl font-extrabold text-stone-900 mt-1 font-mono">
            {totalEwasteCommunityKg.toFixed(1)} kg
          </div>
          <div className="text-[11px] text-stone-500 mt-1">
            Over ₹{totalMoneySavedINR.toLocaleString()} estimated savings across makers
          </div>
        </div>
      </div>

      {/* Smart Procurement Module: "CHECK RELIFE FIRST" */}
      <div className="bg-emerald-950 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-2xl mb-6">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Search className="w-4 h-4" />
            <span>Smart Procurement Protocol</span>
          </div>
          <h2 className="text-xl font-bold">Check RELife First</h2>
          <p className="text-emerald-200/80 text-xs mt-1">
            Before buying brand new components from commercial retail distributors, search the circular pool to check what surplus already exists.
          </p>
        </div>

        <form onSubmit={handleRunSmartProcurement} className="flex flex-col sm:flex-row gap-3 max-w-xl">
          <div className="flex-1">
            <input
              type="text"
              required
              placeholder="e.g. ESP32, HC-SR04, Servo..."
              value={procureName}
              onChange={e => setProcureName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs text-stone-900 bg-white rounded-lg focus:outline-hidden"
            />
          </div>
          <div className="w-24">
            <input
              type="number"
              min="1"
              max="50"
              value={procureQty}
              onChange={e => setProcureQty(parseInt(e.target.value) || 1)}
              className="w-full px-3.5 py-2.5 text-xs text-stone-900 bg-white rounded-lg focus:outline-hidden"
              placeholder="Qty"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 text-xs font-semibold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg cursor-pointer transition-colors shrink-0 shadow-xs"
          >
            Check Surplus Pool
          </button>
        </form>

        {/* Results Card */}
        {procureResult && (
          <div className="mt-6 p-4 bg-emerald-900/60 border border-emerald-800 rounded-xl text-xs space-y-3 max-w-xl">
            <div className="font-semibold text-emerald-200 flex items-center justify-between">
              <span>Procurement Analysis for {procureQty}× {procureName}:</span>
              <span className="font-mono text-white">Save ~₹{procureResult.estimatedSavedINR}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-[11px]">
              <div className="p-2.5 bg-emerald-950 rounded border border-emerald-800">
                <span className="text-emerald-400 block font-semibold">Available in RELife:</span>
                <span className="text-lg font-bold text-white font-mono">
                  {procureResult.availableInRELife} units
                </span>
                <span className="text-emerald-300/80 block mt-0.5">Diverts {procureResult.avoidedGrams}g waste</span>
              </div>

              <div className="p-2.5 bg-emerald-950 rounded border border-emerald-800">
                <span className="text-stone-300 block font-semibold">New/External Needed:</span>
                <span className="text-lg font-bold text-white font-mono">
                  {procureResult.neededExternal} units
                </span>
                <span className="text-stone-400 block mt-0.5">Commercial purchase only if necessary</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={onNavigateToMarketplace}
                className="text-xs text-emerald-300 hover:text-white font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>View {procureName} in Marketplace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Issued Digital Reuse Certificates */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-stone-900">
              My Verified Digital Reuse Certificates ({certificates.length})
            </h2>
            <p className="text-xs text-stone-500">
              Credentials awarded for verified circular builds with serial numbers and circularity ratings.
            </p>
          </div>
        </div>

        {certificates.length === 0 ? (
          <div className="p-8 bg-stone-50 rounded-xl border border-stone-200 text-center text-xs text-stone-500">
            No certificates earned yet. Complete a project from "Build What I Have" to generate your first accreditation.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map(cert => (
              <div
                key={cert.id}
                onClick={() => onOpenCertificate(cert)}
                className="bg-white p-5 rounded-xl border border-stone-200 hover:border-emerald-700/60 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                    <span className="font-mono text-emerald-800 font-semibold">{cert.certificateNumber}</span>
                    <span>{cert.dateIssued}</span>
                  </div>
                  <h3 className="font-bold text-stone-900 text-sm mb-1">{cert.projectTitle}</h3>
                  <div className="text-xs text-stone-600 mt-2 space-y-1">
                    <div>• E-Waste Diverted: <strong className="text-emerald-800">{cert.totalWasteAvoidedGrams}g</strong></div>
                    <div>• Circularity Score: <strong className="text-stone-900">{cert.circularityScore}/100</strong></div>
                    <div>• Reused: <span className="font-mono text-[11px] text-stone-500">{cert.componentsReused.join(', ')}</span></div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-stone-400 font-mono">{cert.verificationCode}</span>
                  <span className="text-emerald-800 font-semibold flex items-center gap-1">
                    <span>View Certificate</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
