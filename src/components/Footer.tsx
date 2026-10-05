import React from 'react';
import { Recycle, ShieldAlert, Cpu, Award } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  isAdmin?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, isAdmin }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 text-xs py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded bg-emerald-800 flex items-center justify-center text-white">
              <Recycle className="w-4 h-4 text-emerald-300" />
            </div>
            <span className="font-bold text-base text-white tracking-tight">RELIFE</span>
          </div>
          <p className="text-stone-400 leading-relaxed mb-4">
            Giving unused electronic components and decommissioned devices a fresh RELife through AI verification, project matching, and community reuse.
          </p>
          <div className="text-[11px] text-stone-500">
            A circular hardware initiative preventing electronics from entering hazardous landfills.
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 tracking-wide uppercase text-[11px]">
            {isAdmin ? 'Administration Modules' : 'Circular Modules'}
          </h4>
          <ul className="space-y-2">
            {isAdmin ? (
              <>
                <li>
                  <button onClick={() => onSelectTab('admin')} className="hover:text-emerald-400 cursor-pointer">
                    Admin Verification Queue
                  </button>
                </li>
                <li>
                  <button onClick={() => onSelectTab('marketplace')} className="hover:text-emerald-400 cursor-pointer">
                    Component Marketplace Catalog
                  </button>
                </li>
                <li>
                  <button onClick={() => onSelectTab('impact')} className="hover:text-emerald-400 cursor-pointer">
                    Circularity Platform Impact
                  </button>
                </li>
                <li>
                  <button onClick={() => onSelectTab('orders')} className="hover:text-emerald-400 cursor-pointer">
                    System Orders &amp; Audit Logs
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button onClick={() => onSelectTab('build-what-i-have')} className="hover:text-emerald-400 cursor-pointer">
                    Build What I Have
                  </button>
                </li>
                <li>
                  <button onClick={() => onSelectTab('marketplace')} className="hover:text-emerald-400 cursor-pointer">
                    Component Marketplace
                  </button>
                </li>
                <li>
                  <button onClick={() => onSelectTab('sell')} className="hover:text-emerald-400 cursor-pointer">
                    Live Camera Component Verification
                  </button>
                </li>
                <li>
                  <button onClick={() => onSelectTab('projects')} className="hover:text-emerald-400 cursor-pointer">
                    Verified Projects Library (20+ Builds)
                  </button>
                </li>
                <li>
                  <button onClick={() => onSelectTab('advisor')} className="hover:text-emerald-400 cursor-pointer">
                    RELife AI Hardware Advisor
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 tracking-wide uppercase text-[11px]">Safety & Trust</h4>
          <ul className="space-y-2 text-stone-400">
            <li className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>Identity & Authenticity Scoring</span>
            </li>
            <li className="flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>Safety Rule Engine for Lithium & AC</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              <span>Digital Reuse Verification Certificates</span>
            </li>
            <li>
              <button onClick={() => onSelectTab('impact')} className="hover:text-emerald-400 cursor-pointer">
                Circularity Index & Carbon Avoidance
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 tracking-wide uppercase text-[11px]">Important Technical Disclaimer</h4>
          <p className="text-[11px] text-stone-400 leading-relaxed">
            AI-assisted optical inspection provides visual identity confidence and surface anomaly analysis only. It does not certify electrical functionality, insulation impedance, or high-voltage safety. Always conduct low-voltage continuity and current limit checks before connecting to live power.
          </p>
          <div className="mt-4 pt-3 border-t border-stone-800 text-[10px] text-stone-500">
            Platform Prototype v2.4 · Built with Vite & React
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-stone-500 gap-4">
        <div>© 2026 RELIFE. Don't buy new until you check what already exists.</div>
        <div className="flex items-center gap-4 text-xs">
          <span>Austin, TX</span>
          <span>·</span>
          <span>Open Hardware Sustainability</span>
          <span>·</span>
          <span>WCAG 2.1 AA Compliant</span>
        </div>
      </div>
    </footer>
  );
};
