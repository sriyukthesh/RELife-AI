import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  Code,
  CheckSquare,
  Wrench,
  Award,
  Sparkles,
  ShoppingBag,
  Cpu,
  Layers,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ComponentItem, Project, ProjectMatchResult, User } from '../../types';
import { RELifeStore } from '../../services/storage';

interface ProjectBuilderModalProps {
  project: Project | null;
  matchResult?: ProjectMatchResult | null;
  currentUser: User;
  onClose: () => void;
  onCompleteProject: (project: Project, reusedComponents: string[]) => void;
  onAddToCart: (component: ComponentItem) => void;
}

export const ProjectBuilderModal: React.FC<ProjectBuilderModalProps> = ({
  project,
  matchResult,
  currentUser,
  onClose,
  onCompleteProject,
  onAddToCart
}) => {
  if (!project) return null;

  const [activeStepTab, setActiveStepTab] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [completedChecklist, setCompletedChecklist] = useState<Record<number, boolean>>({});

  const toggleChecklist = (idx: number) => {
    setCompletedChecklist(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleFinishBuild = () => {
    const reusedNames = project.requiredComponents.map(r => r.name);
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });
    onCompleteProject(project, reusedNames);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="p-4 sm:px-6 border-b border-stone-200 flex items-center justify-between bg-emerald-950 text-white">
          <div>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-semibold uppercase tracking-wider">
              <Wrench className="w-3.5 h-3.5" />
              <span>Project Builder & Bill of Materials</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold">{project.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-emerald-300 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Bill of Materials (BOM) Table */}
          <div>
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Interactive Bill of Materials (BOM)</span>
              <span className="text-[11px] font-normal text-stone-500">
                {matchResult ? `${matchResult.availableComponents.length} of ${project.requiredComponents.length} components ready` : ''}
              </span>
            </h3>

            <div className="border border-stone-200 rounded-lg overflow-hidden divide-y divide-stone-100 text-xs">
              <div className="bg-stone-50 py-2 px-3 font-semibold text-stone-600 grid grid-cols-12 gap-2">
                <span className="col-span-5">Component</span>
                <span className="col-span-2 text-center">Req Qty</span>
                <span className="col-span-3">Status</span>
                <span className="col-span-2 text-right">Action / Price</span>
              </div>

              {project.requiredComponents.map((req, idx) => {
                const isAvailable = matchResult?.availableComponents.some(c => c.req.name === req.name) ?? false;
                const missingData = matchResult?.missingComponents.find(m => m.req.name === req.name);

                return (
                  <div key={idx} className="py-2.5 px-3 grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-5">
                      <div className="font-semibold text-stone-900">{req.name}</div>
                      <div className="text-[10px] text-stone-500">{req.category}</div>
                    </div>
                    <div className="col-span-2 text-center font-mono">
                      ×{req.quantity}
                    </div>
                    <div className="col-span-3">
                      {isAvailable ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>In Inventory</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          <span>Missing</span>
                        </span>
                      )}
                    </div>
                    <div className="col-span-2 text-right">
                      {isAvailable ? (
                        <span className="text-stone-400 text-[11px]">Ready</span>
                      ) : missingData?.availableInRELifeMarketplace ? (
                        <button
                          onClick={() => onAddToCart(missingData.availableInRELifeMarketplace!)}
                          className="px-2 py-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded border border-emerald-300 cursor-pointer"
                        >
                          Buy ₹{missingData.marketPrice}
                        </button>
                      ) : (
                        <span className="text-stone-600 font-mono text-[11px]">~₹{req.estimatedCost}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5-Step Build Plan Navigation */}
          <div>
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
              Guided 5-Step Construction Workflow
            </h3>
            <div className="grid grid-cols-5 gap-1.5 p-1 bg-stone-100 rounded-lg text-xs">
              {[
                { step: 1, label: '1. Connect' },
                { step: 2, label: '2. Wire Pins' },
                { step: 3, label: '3. Firmware' },
                { step: 4, label: '4. Test' },
                { step: 5, label: '5. Deploy' }
              ].map(tab => (
                <button
                  key={tab.step}
                  onClick={() => setActiveStepTab(tab.step)}
                  className={`py-2 rounded-md font-semibold text-center cursor-pointer transition-colors ${
                    activeStepTab === tab.step
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step Detail Content */}
          <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 text-xs space-y-4">
            {activeStepTab === 1 && (
              <div>
                <h4 className="font-bold text-stone-900 text-sm mb-1">
                  Step 1: Physical Placement & Breadboard Assembly
                </h4>
                <p className="text-stone-600 leading-relaxed mb-3">
                  {project.instructions[0]?.detail || 'Place microcontrollers and sensors onto breadboard power rails. Ensure clean contact pins.'}
                </p>
                <div className="p-3 bg-white rounded border border-stone-200 text-[11px] text-stone-600">
                  <span className="font-semibold text-stone-800">Pro-Tip: </span>
                  Keep high-frequency bus lines (I2C/SPI) under 15cm to prevent capacitive noise on reclaimed jump leads.
                </div>
              </div>
            )}

            {activeStepTab === 2 && (
              <div>
                <h4 className="font-bold text-stone-900 text-sm mb-1">
                  Step 2: Circuit Pinout & Interconnects
                </h4>
                <p className="text-stone-600 leading-relaxed mb-3">
                  {project.instructions[1]?.detail || 'Connect power rails and digital I/O lines.'}
                </p>
                {project.wiringGuide && (
                  <div className="p-3 bg-stone-900 text-emerald-300 font-mono text-[11px] rounded-md overflow-x-auto leading-relaxed">
                    {project.wiringGuide}
                  </div>
                )}
              </div>
            )}

            {activeStepTab === 3 && (
              <div>
                <h4 className="font-bold text-stone-900 text-sm mb-1">
                  Step 3: Flashing Open Firmware Sketch
                </h4>
                <p className="text-stone-600 leading-relaxed mb-3">
                  {project.instructions[2]?.detail || 'Flash microcontroller code via Arduino IDE, PlatformIO, or Thonny.'}
                </p>
                {project.codeSnippet && (
                  <div className="p-3 bg-stone-900 text-stone-100 font-mono text-[11px] rounded-md overflow-x-auto max-h-48 leading-relaxed whitespace-pre">
                    {project.codeSnippet}
                  </div>
                )}
              </div>
            )}

            {activeStepTab === 4 && (
              <div>
                <h4 className="font-bold text-stone-900 text-sm mb-1">
                  Step 4: Functional Testing & Calibration Checklist
                </h4>
                <p className="text-stone-600 leading-relaxed mb-3">
                  Execute the safety checklist below before enclosing the electronics.
                </p>
                <div className="space-y-2">
                  {(project.testingChecklist || [
                    'Multimeter DC voltage reads within rated limits (3.3V or 5V)',
                    'Sensor data updates continuously in terminal at 115200 baud',
                    'Indicator LEDs respond without thermal rise on voltage regulator'
                  ]).map((check, idx) => (
                    <label key={idx} className="flex items-center gap-2 cursor-pointer text-stone-700">
                      <input
                        type="checkbox"
                        checked={!!completedChecklist[idx]}
                        onChange={() => toggleChecklist(idx)}
                        className="rounded text-emerald-800 focus:ring-emerald-700"
                      />
                      <span>{check}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {activeStepTab === 5 && (
              <div>
                <h4 className="font-bold text-stone-900 text-sm mb-1">
                  Step 5: Enclosure & Circular Deployment
                </h4>
                <p className="text-stone-600 leading-relaxed mb-3">
                  Fit the finished hardware into a recycled enclosure (acrylic scraps, repurposed container, or 3D printed PETG).
                </p>
                <div className="p-3 bg-emerald-50 text-emerald-950 rounded border border-emerald-200 flex items-center justify-between">
                  <div>
                    <div className="font-bold">E-Waste Avoidance Impact:</div>
                    <div className="text-[11px]">This verified build prevents {project.estimatedEwasteAvoidedGrams}g of electronics from entering landfills.</div>
                  </div>
                  <Sparkles className="w-6 h-6 text-emerald-700 shrink-0 ml-3" />
                </div>
              </div>
            )}
          </div>

          {/* Complete Build CTA */}
          <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-stone-500">
              Completing this build awards <strong>+150 Reuse Points</strong> and generates a RELife Digital Certificate.
            </div>
            <button
              onClick={handleFinishBuild}
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-md cursor-pointer flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <Award className="w-4 h-4 text-emerald-300" />
              <span>Complete Build & Generate Certificate</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ProjectsViewProps {
  projects: Project[];
  userInventory: ComponentItem[];
  marketplaceComponents: ComponentItem[];
  onOpenProjectBuilder: (project: Project, matchResult: ProjectMatchResult) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  userInventory,
  marketplaceComponents,
  onOpenProjectBuilder
}) => {
  const [search, setSearch] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Environmental & CleanTech',
    'Automation & Smart Home',
    'Sensors & Monitoring',
    'Robotics & Motion',
    'Security & Access'
  ];

  const filtered = projects.filter(p => {
    if (selectedDifficulty !== 'All' && p.difficulty !== selectedDifficulty) return false;
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-stone-900">
          Circular Projects Catalog ({projects.length}+ Builds)
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Open-hardware builds engineered specifically around commonly salvaged microcontrollers, sensors, and actuators.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-stone-200 p-4 mb-8 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            placeholder="Search projects by name, sensors, or skills..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 w-full px-3 py-2 text-xs border border-stone-200 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-hidden"
          />
          <div className="flex items-center gap-2">
            <select
              value={selectedDifficulty}
              onChange={e => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 text-xs border border-stone-200 rounded-lg bg-white"
            >
              <option value="All">All Difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
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
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(proj => (
          <div
            key={proj.id}
            className="bg-white rounded-xl border border-stone-200 hover:border-emerald-700/50 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="aspect-16/9 bg-stone-100 relative overflow-hidden">
                <img src={proj.imageUrl} alt={proj.title} className="w-full h-full object-cover" />
                <div className="absolute top-2.5 left-2.5 bg-stone-900/80 text-white text-[10px] font-medium px-2 py-0.5 rounded">
                  {proj.category}
                </div>
                <div className="absolute top-2.5 right-2.5 bg-white/95 text-stone-900 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                  {proj.difficulty}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-stone-900 text-sm leading-snug line-clamp-1 mb-1">
                  {proj.title}
                </h3>
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-3">
                  {proj.description}
                </p>

                <div className="text-[11px] text-stone-500 space-y-1 mb-3 bg-stone-50 p-2.5 rounded border border-stone-200/80">
                  <div className="flex justify-between">
                    <span>Build Time:</span>
                    <span className="font-semibold text-stone-800">{proj.estimatedBuildTimeHours} hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>E-Waste Diverted:</span>
                    <span className="font-semibold text-emerald-800">{proj.estimatedEwasteAvoidedGrams}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Required Hardware:</span>
                    <span className="font-semibold text-stone-800">{proj.requiredComponents.length} items</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <button
                onClick={() => onOpenProjectBuilder(proj, null as any)}
                className="w-full py-2 px-3 text-xs font-semibold text-emerald-950 bg-emerald-100 hover:bg-emerald-200 rounded-md cursor-pointer flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>View BOM & Instructions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
