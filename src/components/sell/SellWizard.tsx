import React, { useState } from 'react';
import {
  Camera,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Upload,
  Info,
  DollarSign,
  Tag,
  MapPin,
  Cpu
} from 'lucide-react';
import { ComponentCategory, ComponentCondition, ComponentItem, User } from '../../types';
import { CameraVerification } from './CameraVerification';
import { AiIdentificationResult, generateQuickTestGuide } from '../../services/cameraAi';
import { RELifeStore } from '../../services/storage';

interface SellWizardProps {
  currentUser: User;
  onListingSuccess: (createdItem: ComponentItem) => void;
  onCancel: () => void;
}

const CATEGORIES: ComponentCategory[] = [
  'Microcontrollers',
  'Sensors',
  'Displays',
  'Motors',
  'Actuators',
  'Communication Modules',
  'Power Components',
  'ICs',
  'Resistors',
  'Capacitors',
  'PCBs',
  'Cables',
  'Batteries',
  'Embedded Devices',
  'Other Electronics'
];

export const SellWizard: React.FC<SellWizardProps> = ({
  currentUser,
  onListingSuccess,
  onCancel
}) => {
  // 1: Live Camera Verification -> 2: Gemini AI Review & Specs -> 3: Pricing & Marketplace Listing
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Live Camera & Gemini AI verification data
  const [frontImage, setFrontImage] = useState<string>('');
  const [backImage, setBackImage] = useState<string>('');
  const [aiResult, setAiResult] = useState<AiIdentificationResult | null>(null);

  // Component details (automatically filled by Gemini AI from camera)
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ComponentCategory>('Microcontrollers');
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');
  const [packageType, setPackageType] = useState('Standard Module');
  const [quantity, setQuantity] = useState(1);
  const [condition, setCondition] = useState<ComponentCondition>('Like New');
  const [ageMonths, setAgeMonths] = useState(3);
  const [specifications, setSpecifications] = useState<Record<string, string>>({});

  // Functionality & Test
  const [isWorking, setIsWorking] = useState<'Yes' | 'No' | 'Unknown'>('Yes');
  const [quickTestCompleted, setQuickTestCompleted] = useState(false);

  // Pricing & Logistics
  const [price, setPrice] = useState(150);
  const [isGiveaway, setIsGiveaway] = useState(false);
  const [location, setLocation] = useState(currentUser.location || 'Austin, TX');

  // Triggered when Live Camera front & back photos are confirmed and verified by Gemini AI
  const handleCameraComplete = (result: {
    frontImage: string;
    backImage: string;
    aiResult: AiIdentificationResult;
  }) => {
    setFrontImage(result.frontImage);
    setBackImage(result.backImage);
    setAiResult(result.aiResult);

    // Auto-populate from Gemini AI inspection
    setName(result.aiResult.detectedName || 'Verified Component');
    setCategory(result.aiResult.category || 'Microcontrollers');
    setManufacturer(result.aiResult.detectedManufacturer || 'OEM');
    setModel(result.aiResult.detectedModel || '');
    setPackageType(result.aiResult.packageType || 'Through-hole Module');
    setSpecifications(result.aiResult.suggestedSpecifications || {});

    // Move directly to Step 2: AI Verification Findings Review
    setCurrentStep(2);
  };

  const calculateFinalTrust = () => {
    let identity = aiResult ? aiResult.identityConfidence : 94;
    let auth = aiResult ? aiResult.authenticityConfidence : 92;
    let functionalBonus = isWorking === 'Yes' ? (quickTestCompleted ? 8 : 4) : isWorking === 'No' ? -15 : 0;
    let overall = Math.min(99, Math.max(50, Math.round(0.5 * identity + 0.3 * auth + functionalBonus + 10)));

    let level: ComponentItem['verificationLevel'] = 'HIGH_TRUST';
    if (aiResult?.isAiVerifiedByGemini) {
      level = 'ADMIN_VERIFIED';
    }

    return { overall, identity, auth, level };
  };

  const handleSubmitListing = (e: React.FormEvent) => {
    e.preventDefault();
    const trust = calculateFinalTrust();

    const newComponent: ComponentItem = {
      id: `comp-${Date.now()}`,
      name: name || 'Verified Electronic Component',
      category,
      manufacturer: manufacturer || 'OEM Standard',
      model: model || 'Standard Part',
      quantity,
      price: isGiveaway ? 0 : price,
      isGiveaway,
      condition,
      ageMonths,
      specifications: {
        ...specifications,
        'Form Factor': packageType,
        'Optical Inspection': aiResult?.isAiVerifiedByGemini ? 'Gemini AI Vision Certified' : 'Verified'
      },
      sellerId: currentUser.id,
      sellerName: currentUser.name,
      sellerRating: currentUser.rating || 5.0,
      location,
      images: {
        front: frontImage,
        back: backImage || frontImage
      },
      verificationLevel: trust.level,
      trustProfile: {
        identityConfidence: trust.identity,
        authenticityConfidence: trust.auth,
        functionalEvidence: isWorking === 'Yes' ? 'Verified' : 'User claimed',
        provenance: 'Documented',
        conditionEvidence: 'Photo verified',
        overallTrustScore: trust.overall,
        aiAnalysis: aiResult
          ? {
              detectedModel: aiResult.detectedModel,
              packageType: aiResult.packageType,
              markingIntegrity: aiResult.visibleMarkings,
              visualDamageDetected: aiResult.visibleDamageDetected,
              isSafeForTesting: true
            }
          : undefined
      },
      lifecycleState: 'Available',
      safetyWarnings: aiResult?.safetyHazards || [],
      compatibleProjectIds: ['proj-1', 'proj-2', 'proj-3', 'proj-6'],
      sustainabilityImpactGrams: 85,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    RELifeStore.addComponent(newComponent);
    onListingSuccess(newComponent);
  };

  const quickTest = generateQuickTestGuide(name, category);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Step Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-medium text-stone-500 mb-2">
          <span>
            Step {currentStep} of 3:{' '}
            {currentStep === 1
              ? 'Live Camera Optical Verification'
              : currentStep === 2
              ? 'Gemini AI Inspection & Hardware Specs'
              : 'Pricing & Publish to Marketplace'}
          </span>
          <span className="text-emerald-700 font-semibold">{Math.round((currentStep / 3) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-emerald-800 h-full transition-all duration-300"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* STEP 1: LIVE CAMERA VERIFICATION */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              <Camera className="w-3.5 h-3.5" />
              <span>Step 1: Capture With Live Camera</span>
            </div>
            <h1 className="text-2xl font-bold text-stone-900">
              Live Camera Component Verification
            </h1>
            <p className="text-xs text-stone-600">
              Take photos lively of your electronic component. Gemini AI will analyze the live images, read the part number &amp; silkscreen text, and generate verified marketplace specs automatically.
            </p>
          </div>

          <CameraVerification
            onVerificationComplete={handleCameraComplete}
            onCancel={onCancel}
          />
        </div>
      )}

      {/* STEP 2: GEMINI AI INSPECTION FINDINGS */}
      {currentStep === 2 && aiResult && (
        <div className="space-y-6">
          {/* AI Banner */}
          <div className="bg-emerald-950 text-white rounded-xl p-6 border border-emerald-900 shadow-md">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Gemini AI Optical Inspection Complete</span>
                </div>
                <h2 className="text-2xl font-extrabold">{aiResult.detectedName}</h2>
                <div className="flex items-center gap-3 mt-2 text-xs text-stone-300">
                  <span>Manufacturer: <strong className="text-white">{aiResult.detectedManufacturer}</strong></span>
                  <span>·</span>
                  <span>Part No: <strong className="text-white font-mono">{aiResult.detectedModel}</strong></span>
                  <span>·</span>
                  <span>Category: <strong className="text-white">{aiResult.category}</strong></span>
                </div>
              </div>
              <div className="text-right shrink-0 bg-emerald-900/60 p-3 rounded-lg border border-emerald-800">
                <div className="text-[10px] text-emerald-300 uppercase tracking-wider">Overall Trust Score</div>
                <div className="text-2xl font-bold text-white font-mono mt-0.5">{aiResult.initialTrustScore}/100</div>
                <div className="text-[10px] text-emerald-400">Gemini AI Verified</div>
              </div>
            </div>

            {/* Photos Taken Live */}
            <div className="grid grid-cols-2 gap-4 mt-5 pt-4 border-t border-emerald-900/80">
              <div>
                <span className="text-[10px] text-emerald-300 uppercase block mb-1">Front Photo (Captured Live)</span>
                <div className="aspect-4/3 rounded-lg overflow-hidden border border-emerald-800 bg-stone-900">
                  <img src={frontImage} alt="Front capture" className="w-full h-full object-contain" />
                </div>
              </div>
              <div>
                <span className="text-[10px] text-emerald-300 uppercase block mb-1">Back Solder Photo (Captured Live)</span>
                <div className="aspect-4/3 rounded-lg overflow-hidden border border-emerald-800 bg-stone-900">
                  <img src={backImage || frontImage} alt="Back capture" className="w-full h-full object-contain" />
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-emerald-900/40 rounded border border-emerald-800/80 text-xs text-stone-200">
              <strong className="text-emerald-300">Markings Detected: </strong>
              {aiResult.visibleMarkings}
            </div>
          </div>

          {/* Component Specifications Editor Form */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-800" />
              <span>Verified Specifications (Editable)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Component Title</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:ring-1 focus:ring-emerald-700 focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as ComponentCategory)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:ring-1 focus:ring-emerald-700 focus:outline-hidden"
                >
                  {CATEGORIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Manufacturer</label>
                <input
                  type="text"
                  value={manufacturer}
                  onChange={e => setManufacturer(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:ring-1 focus:ring-emerald-700 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Model / Part Number</label>
                <input
                  type="text"
                  value={model}
                  onChange={e => setModel(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:ring-1 focus:ring-emerald-700 focus:outline-hidden font-mono"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Package Form Factor</label>
                <input
                  type="text"
                  value={packageType}
                  onChange={e => setPackageType(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:ring-1 focus:ring-emerald-700 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Physical Condition</label>
                <select
                  value={condition}
                  onChange={e => setCondition(e.target.value as ComponentCondition)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:ring-1 focus:ring-emerald-700 focus:outline-hidden"
                >
                  <option value="Like New">Like New (Unused / Pristine pins)</option>
                  <option value="Good">Good (Tested working / Light solder trace)</option>
                  <option value="Fair">Fair (Functional with cosmetic wear)</option>
                  <option value="Salvage / For Parts">Salvage / For Parts (For repair)</option>
                </select>
              </div>
            </div>

            {/* Quick Test Guide */}
            <div className="mt-4 pt-4 border-t border-stone-100">
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-stone-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Quick Diagnostic Protocol: {quickTest.testTitle}</span>
                  </span>
                  <label className="flex items-center gap-2 cursor-pointer font-semibold text-emerald-800">
                    <input
                      type="checkbox"
                      checked={quickTestCompleted}
                      onChange={e => setQuickTestCompleted(e.target.checked)}
                      className="rounded text-emerald-800 focus:ring-emerald-700"
                    />
                    <span>I tested this component</span>
                  </label>
                </div>
                <ul className="list-disc list-inside text-stone-600 space-y-1 text-[11px]">
                  {quickTest.steps.map((st, i) => (
                    <li key={i}>{st}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retake Live Photos</span>
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-700 rounded-md cursor-pointer flex items-center gap-2 shadow-xs"
            >
              <span>Continue to Pricing &amp; Publish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: PRICING & MARKETPLACE LISTING */}
      {currentStep === 3 && (
        <form onSubmit={handleSubmitListing} className="space-y-6">
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-6">
            <div>
              <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <Tag className="w-4 h-4 text-emerald-800" />
                <span>Pricing &amp; Marketplace Availability</span>
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Your component will be immediately listed in the RELife marketplace with the live camera photos you just captured.
              </p>
            </div>

            {/* Pricing Mode */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setIsGiveaway(false)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  !isGiveaway
                    ? 'border-emerald-800 bg-emerald-50/40 ring-1 ring-emerald-800'
                    : 'border-stone-200 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xs text-stone-900">Paid Circular Sale</span>
                  <DollarSign className="w-4 h-4 text-emerald-800" />
                </div>
                <p className="text-stone-500 text-[11px] mb-3">
                  Sell at a fair circular discount to makers in the community.
                </p>
                <div>
                  <label className="text-[10px] text-stone-500 font-semibold block mb-1">Sale Price (₹)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-stone-400 font-bold">₹</span>
                    <input
                      type="number"
                      min="10"
                      value={price}
                      onChange={e => setPrice(Math.max(10, parseInt(e.target.value) || 0))}
                      disabled={isGiveaway}
                      className="w-full pl-8 pr-3 py-1.5 border border-stone-300 rounded-md font-mono text-xs focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>
                </div>
              </div>

              <div
                onClick={() => setIsGiveaway(true)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isGiveaway
                    ? 'border-emerald-800 bg-emerald-50/40 ring-1 ring-emerald-800'
                    : 'border-stone-200 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xs text-stone-900">Community Free Giveaway</span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">+200 Karma</span>
                </div>
                <p className="text-stone-500 text-[11px]">
                  Donate unused components to student makers and school STEM projects for zero waste.
                </p>
                <div className="mt-4 text-xs font-semibold text-emerald-800">
                  {isGiveaway ? '✓ Selected as Free Community Giveaway' : 'Click to select Free Giveaway'}
                </div>
              </div>
            </div>

            {/* Quantity and Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Available Quantity</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={quantity}
                  onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span>Pickup / Shipping Origin</span>
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md"
                  required
                />
              </div>
            </div>

            {/* Summary Preview Box */}
            <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 flex items-center gap-4">
              <img
                src={frontImage}
                alt={name}
                className="w-16 h-16 object-cover rounded-lg border border-stone-300 shrink-0"
              />
              <div className="flex-1 min-w-0 text-xs">
                <div className="font-bold text-stone-900 truncate">{name}</div>
                <div className="text-stone-500 mt-0.5">
                  {category} · {condition} · Qty: {quantity} · {isGiveaway ? 'FREE GIVEAWAY' : `₹${price}`}
                </div>
                <div className="flex items-center gap-2 mt-1 text-[10px] text-emerald-800 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified by Gemini AI · Ready for immediate marketplace listing</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Review</span>
            </button>

            <button
              type="submit"
              className="px-8 py-3 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-700 rounded-md cursor-pointer flex items-center gap-2 shadow-md transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Publish to RELife Marketplace</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
