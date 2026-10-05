import React from 'react';
import {
  Recycle,
  Wrench,
  ShoppingBag,
  Layers,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Cpu,
  BarChart3,
  Award,
  CheckCircle2,
  Camera
} from 'lucide-react';
import { Project } from '../../types';

interface HomeLandingProps {
  onNavigateTab: (tab: string) => void;
  featuredProjects: Project[];
  totalComponentsCount: number;
}

export const HomeLanding: React.FC<HomeLandingProps> = ({
  onNavigateTab,
  featuredProjects,
  totalComponentsCount
}) => {
  return (
    <div className="space-y-20 py-8">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-stone-900 via-emerald-950 to-stone-950 text-white rounded-3xl p-8 sm:p-16 border border-stone-800 shadow-xl relative overflow-hidden">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#064e3b15_1px,transparent_1px),linear-gradient(to_bottom,#064e3b15_1px,transparent_1px)] bg-[size:32px_32px]"></div>

          <div className="relative max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/50 text-emerald-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>AI-Powered Circular Electronics Reuse Platform</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Give Electronics a <span className="text-emerald-400">RELife.</span>
            </h1>

            <p className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-2xl">
              Turn unused electronic components into useful projects, discover components for your next build, and reduce electronic waste.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => onNavigateTab('build-what-i-have')}
                className="px-6 py-3.5 text-xs sm:text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-emerald-950 rounded-lg cursor-pointer transition-all shadow-md flex items-center gap-2 group"
              >
                <span>Build With What I Have</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => onNavigateTab('marketplace')}
                className="px-6 py-3.5 text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 cursor-pointer transition-colors backdrop-blur-xs flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-emerald-300" />
                <span>Explore Components</span>
              </button>

              <button
                onClick={() => onNavigateTab('sell')}
                className="px-5 py-3.5 text-xs sm:text-sm font-semibold text-emerald-300 hover:text-white cursor-pointer transition-colors flex items-center gap-1.5"
              >
                <Camera className="w-4 h-4" />
                <span>List a Component</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Impact Counters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white p-5 rounded-xl border border-stone-200 text-center shadow-2xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-900 font-mono">1,480+</div>
            <div className="text-[11px] font-semibold text-stone-600 mt-1 uppercase tracking-wider">Components Reused</div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-stone-200 text-center shadow-2xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-900 font-mono">320+</div>
            <div className="text-[11px] font-semibold text-stone-600 mt-1 uppercase tracking-wider">Devices Repurposed</div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-stone-200 text-center shadow-2xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-900 font-mono">20+</div>
            <div className="text-[11px] font-semibold text-stone-600 mt-1 uppercase tracking-wider">Verified Projects</div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-stone-200 text-center shadow-2xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-900 font-mono">48.2 kg</div>
            <div className="text-[11px] font-semibold text-stone-600 mt-1 uppercase tracking-wider">E-Waste Avoided</div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-stone-200 text-center shadow-2xs col-span-2 md:col-span-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-900 font-mono">₹142,000+</div>
            <div className="text-[11px] font-semibold text-stone-600 mt-1 uppercase tracking-wider">Estimated Saved</div>
          </div>
        </div>
      </section>

      {/* Visual Circular Loop */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">The RELife Circular Loop</h2>
          <p className="text-xs text-stone-500 mt-1">
            How discarded electronics transition into verified projects with transparent provenance.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-center text-xs">
          {[
            { step: '1', title: 'Unused Component', sub: 'Recovered from surplus boxes' },
            { step: '2', title: 'Verify With Camera', sub: 'Front & back optical inspection' },
            { step: '3', title: 'Intelligent Match', sub: 'Deterministic feasibility engine' },
            { step: '4', title: 'Build / Sell / Buy', sub: 'Circular community exchange' },
            { step: '5', title: 'Hands-on Reuse', sub: 'Guided interactive BOM' },
            { step: '6', title: 'Measure Impact', sub: 'Digital reuse certificates' }
          ].map(node => (
            <div
              key={node.step}
              className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs flex flex-col items-center justify-between"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-900 font-bold flex items-center justify-center text-xs mb-2">
                {node.step}
              </div>
              <h3 className="font-bold text-stone-900 text-xs">{node.title}</h3>
              <p className="text-[11px] text-stone-500 mt-1">{node.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Signature Feature Callout: "Build What I Have" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 text-white rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-stone-800">
          <div className="max-w-xl space-y-3">
            <span className="text-emerald-400 font-semibold text-xs uppercase tracking-wider">
              Signature Algorithm
            </span>
            <h2 className="text-2xl font-bold">
              What can you build with what you already have?
            </h2>
            <p className="text-stone-300 text-xs leading-relaxed">
              Our 6-factor deterministic scoring engine calculates hardware compatibility, specification match, and lowest missing component cost so you don't buy unnecessary new electronics.
            </p>
            <div className="flex items-center gap-4 pt-2 text-xs text-emerald-300 font-mono">
              <span>✓ 40% Availability</span>
              <span>·</span>
              <span>✓ 20% Spec Match</span>
              <span>·</span>
              <span>✓ Trust Modifiers</span>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('build-what-i-have')}
            className="px-6 py-3 text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-emerald-950 rounded-lg cursor-pointer shrink-0 shadow-md"
          >
            Launch "Build What I Have"
          </button>
        </div>
      </section>

      {/* Featured Projects Carousel Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-stone-900">Featured Verified Projects</h2>
            <p className="text-xs text-stone-500">Popular open-hardware builds with ready schematics.</p>
          </div>
          <button
            onClick={() => onNavigateTab('projects')}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.slice(0, 3).map(proj => (
            <div
              key={proj.id}
              onClick={() => onNavigateTab('projects')}
              className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:border-emerald-700/50 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="aspect-16/9 bg-stone-100 relative">
                <img src={proj.imageUrl} alt={proj.title} className="w-full h-full object-cover" />
                <span className="absolute top-2.5 left-2.5 bg-stone-900/80 text-white text-[10px] px-2 py-0.5 rounded">
                  {proj.difficulty}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-stone-900 text-sm line-clamp-1">{proj.title}</h3>
                <p className="text-xs text-stone-600 line-clamp-2 mt-1">{proj.description}</p>
                <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-emerald-800 font-semibold">
                  <span>Diverts {proj.estimatedEwasteAvoidedGrams}g waste</span>
                  <span className="text-stone-500">{proj.estimatedBuildTimeHours} hrs build</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
