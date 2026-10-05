import React from 'react';
import { X, Printer, Award, Recycle, ShieldCheck, Sparkles } from 'lucide-react';
import { ReuseCertificate } from '../../types';

interface CertificateModalProps {
  certificate: ReuseCertificate | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  onClose
}) => {
  if (!certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden my-8">
        {/* Modal Top Bar */}
        <div className="no-print p-4 sm:px-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-700">
            <Award className="w-4 h-4 text-emerald-700" />
            <span>RELIFE Digital Reuse Certificate</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-200 hover:bg-stone-300 rounded-md cursor-pointer flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-stone-400 hover:text-stone-700 hover:bg-stone-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Printable Area */}
        <div className="certificate-print-area p-8 sm:p-12 bg-white border-8 border-double border-emerald-900/40 m-4 rounded-lg relative overflow-hidden">
          {/* Watermark Logo */}
          <div className="absolute right-4 bottom-4 opacity-5 pointer-events-none">
            <Recycle className="w-64 h-64 text-emerald-950" />
          </div>

          <div className="text-center max-w-xl mx-auto space-y-4">
            {/* Seal Header */}
            <div className="flex items-center justify-center gap-2 text-emerald-900 font-bold tracking-widest text-xs uppercase mb-1">
              <Recycle className="w-5 h-5 text-emerald-700" />
              <span>RELIFE PLATFORM · CIRCULAR HARDWARE ACCREDITATION</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight font-serif">
              Digital Reuse Certificate
            </h1>

            <p className="text-xs text-stone-500 font-mono tracking-wider">
              CERTIFICATE SERIAL: {certificate.certificateNumber}
            </p>

            <div className="pt-4 pb-2">
              <p className="text-xs text-stone-500 italic">This verified citation is proudly awarded to</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-emerald-950 mt-1 border-b-2 border-emerald-800/20 pb-2 inline-block px-8">
                {certificate.userName}
              </h2>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed max-w-lg mx-auto">
              for successfully preventing electronic waste by sourcing, testing, and constructing the circular hardware build:
            </p>

            <div className="text-base sm:text-lg font-bold text-stone-900 bg-stone-50 p-2.5 rounded border border-stone-200/80">
              {certificate.projectTitle}
            </div>

            {/* Impact Badges */}
            <div className="grid grid-cols-2 gap-4 pt-4 max-w-md mx-auto text-left">
              <div className="p-3 bg-emerald-50/60 rounded border border-emerald-200">
                <div className="text-[10px] text-emerald-800 font-semibold uppercase tracking-wider">
                  E-Waste Diverted
                </div>
                <div className="text-xl font-bold text-emerald-950 mt-0.5 font-mono">
                  {certificate.totalWasteAvoidedGrams} grams
                </div>
                <div className="text-[10px] text-stone-500 mt-0.5">Physical silicon & copper salvaged</div>
              </div>

              <div className="p-3 bg-emerald-50/60 rounded border border-emerald-200">
                <div className="text-[10px] text-emerald-800 font-semibold uppercase tracking-wider">
                  Circularity Index
                </div>
                <div className="text-xl font-bold text-emerald-950 mt-0.5 font-mono">
                  {certificate.circularityScore} / 100
                </div>
                <div className="text-[10px] text-stone-500 mt-0.5">Composite resource efficiency</div>
              </div>
            </div>

            {/* Reused Silicon Breakdown */}
            <div className="pt-4 text-left">
              <div className="text-[11px] font-semibold text-stone-700 mb-1">
                Verified Components Given a RELife:
              </div>
              <div className="flex flex-wrap gap-1 text-[11px] text-stone-600">
                {certificate.componentsReused.map((comp, idx) => (
                  <span
                    key={idx}
                    className="bg-stone-100 text-stone-800 px-2 py-0.5 rounded border border-stone-200 font-mono text-[10px]"
                  >
                    ✓ {comp}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer signatures & verification seal */}
            <div className="pt-8 mt-6 border-t border-stone-200 grid grid-cols-2 gap-6 text-left items-end">
              <div>
                <div className="text-[11px] font-bold text-stone-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>RELife Platform Core</span>
                </div>
                <div className="text-[10px] text-stone-500 font-mono mt-0.5">
                  Verification Code: {certificate.verificationCode}
                </div>
                <div className="text-[10px] text-stone-400">Date Issued: {certificate.dateIssued}</div>
              </div>

              <div className="text-right">
                <div className="inline-block border-t border-stone-400 pt-1 px-4 text-center">
                  <div className="text-xs font-serif font-semibold text-stone-800 italic">Elena Vance</div>
                  <div className="text-[10px] text-stone-500">Platform Safety & Verification Lead</div>
                </div>
              </div>
            </div>

            <div className="text-[10px] text-stone-400 pt-2 italic">
              Notice: This certificate records community hardware reuse and model-estimated landfill avoidance. It does not constitute official regulatory environmental credit.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
