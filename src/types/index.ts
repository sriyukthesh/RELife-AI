export type UserRole = 'USER' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  points: number;
  rating: number;
  location: string;
  bio?: string;
  badges: string[];
  componentsReusedCount: number;
  projectsCompletedCount: number;
  ewasteAvoidedGrams: number;
  createdAt: string;
}

export type ComponentCategory =
  | 'Microcontrollers'
  | 'Sensors'
  | 'Displays'
  | 'Motors'
  | 'Actuators'
  | 'Communication Modules'
  | 'Power Components'
  | 'ICs'
  | 'Resistors'
  | 'Capacitors'
  | 'PCBs'
  | 'Cables'
  | 'Batteries'
  | 'Embedded Devices'
  | 'Other Electronics';

export type ComponentCondition =
  | 'New/Unused'
  | 'Like New'
  | 'Good'
  | 'Fair'
  | 'Salvage/Parts Only'
  | 'Non-Functional';

export type VerificationLevel =
  | 'UNVERIFIED'
  | 'IDENTITY_CHECKED'
  | 'FUNCTIONALITY_EVIDENCE'
  | 'ADMIN_VERIFIED'
  | 'HIGH_TRUST';

export interface TrustProfile {
  identityConfidence: number; // 0-100
  authenticityConfidence: number; // 0-100
  functionalEvidence: 'Verified' | 'User claimed' | 'Unknown';
  provenance: 'Documented' | 'Undocumented';
  conditionEvidence: 'Photo verified' | 'User reported' | 'Lab inspected';
  overallTrustScore: number; // 0-100
  aiAnalysis?: {
    detectedModel: string;
    packageType: string;
    markingIntegrity: string;
    visualDamageDetected: string[];
    isSafeForTesting: boolean;
  };
}

export type ComponentLifecycleState =
  | 'Discarded'
  | 'Recovered'
  | 'Inspected'
  | 'Listed'
  | 'Verified'
  | 'Available'
  | 'Reserved'
  | 'Sold'
  | 'Used in Project'
  | 'Reused';

export interface ComponentItem {
  id: string;
  name: string;
  category: ComponentCategory;
  manufacturer: string;
  model: string;
  quantity: number;
  price: number; // in currency units (₹)
  isGiveaway?: boolean;
  condition: ComponentCondition;
  ageMonths: number;
  specifications: Record<string, string>;
  sellerId: string;
  sellerName: string;
  sellerRating: number;
  location: string;
  images: {
    front: string;
    back: string;
    functionalProof?: string;
  };
  verificationLevel: VerificationLevel;
  trustProfile: TrustProfile;
  lifecycleState: ComponentLifecycleState;
  safetyWarnings: string[];
  compatibleProjectIds: string[];
  sustainabilityImpactGrams: number;
  status: 'pending_verification' | 'active' | 'sold' | 'rejected' | 'reserved';
  isSuspicious?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  componentId: string;
  component: ComponentItem;
  quantity: number;
}

export interface OrderItem {
  componentId: string;
  name: string;
  quantity: number;
  price: number;
  sustainabilityImpactGrams: number;
}

export interface Order {
  id: string;
  buyerId: string;
  buyerName: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  totalEwasteReusedGrams: number;
  potentialProjectsEnabled: number;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
  };
  paymentMethod: 'UPI' | 'Card' | 'Cash/Offline' | 'Demo Payment';
  status: 'confirmed' | 'dispatched' | 'delivered';
  createdAt: string;
}

export type ProjectDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type ProjectCategory =
  | 'IoT'
  | 'Sensors & Monitoring'
  | 'Robotics & Motion'
  | 'Automation & Smart Home'
  | 'Environmental & CleanTech'
  | 'Security & Access';

export interface ProjectComponentRequirement {
  name: string;
  category: ComponentCategory;
  quantity: number;
  estimatedCost: number;
  isCritical: boolean;
  compatiblePartNumbers: string[];
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: ProjectCategory;
  difficulty: ProjectDifficulty;
  requiredComponents: ProjectComponentRequirement[];
  estimatedBuildTimeHours: number;
  estimatedCost: number;
  requiredSkills: string[];
  safetyRequirements: string[];
  instructions: {
    step: number;
    title: string;
    detail: string;
  }[];
  expectedOutput: string;
  estimatedEwasteAvoidedGrams: number;
  wiringGuide?: string;
  codeSnippet?: string;
  testingChecklist?: string[];
  imageUrl: string;
}

export interface ProjectMatchResult {
  project: Project;
  compatibilityScore: number; // 0 - 100
  availableComponents: {
    req: ProjectComponentRequirement;
    matchedComponent?: ComponentItem;
  }[];
  missingComponents: {
    req: ProjectComponentRequirement;
    marketPrice: number;
    availableInRELifeMarketplace?: ComponentItem;
  }[];
  feasibilityTier: 'BUILD_NOW' | 'SMALL_ADDITIONS' | 'NOT_FEASIBLE';
  whyRecommended: string[];
  safetyFlags: string[];
  additionalCostToUnlock: number;
  impactPerCostRatio: number;
  formulaBreakdown: {
    availabilityScore: number;
    specScore: number;
    qtyScore: number;
    costEfficiency: number;
    difficultyFit: number;
    timeFit: number;
    trustModifier: number;
  };
}

export interface ProjectTeam {
  id: string;
  name: string;
  projectId: string;
  projectTitle: string;
  status: 'Planning' | 'Components Collected' | 'Building' | 'Testing' | 'Completed';
  leadId: string;
  leadName: string;
  members: { userId: string; name: string; role: string }[];
  tasks: { id: string; title: string; assignee: string; completed: boolean }[];
  claimedComponents: { componentName: string; quantity: number; claimedBy: string }[];
  notes: string;
  updatedAt: string;
}

export interface ComponentRequest {
  id: string;
  userId: string;
  userName: string;
  componentName: string;
  category: ComponentCategory;
  quantityNeeded: number;
  projectTitle: string;
  status: 'Open' | 'Fulfilled' | 'Closed';
  offers: {
    userId: string;
    userName: string;
    componentId: string;
    price: number;
    note: string;
  }[];
  createdAt: string;
}

export interface ReuseCertificate {
  id: string;
  certificateNumber: string;
  userId: string;
  userName: string;
  projectId: string;
  projectTitle: string;
  componentsReused: string[];
  totalWasteAvoidedGrams: number;
  circularityScore: number;
  dateIssued: string;
  verificationCode: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  criteria: string;
  earnedAt?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  actorRole: string;
  action: string;
  target: string;
  result: 'SUCCESS' | 'WARNING' | 'FAILED';
  details: string;
}

export interface Report {
  id: string;
  reporterId: string;
  reporterName: string;
  targetType: 'listing' | 'user' | 'project';
  targetId: string;
  targetTitle: string;
  reason:
    | 'Fake listing'
    | 'Incorrect component'
    | 'Misleading condition'
    | 'Suspicious seller'
    | 'Unsafe component'
    | 'Wrong specifications'
    | 'Counterfeit suspicion'
    | 'Scam behavior';
  explanation: string;
  status: 'Open' | 'Under Review' | 'Resolved' | 'Closed';
  adminNotes?: string;
  createdAt: string;
}

export interface SustainabilityFactor {
  category: ComponentCategory;
  estimatedMassGrams: number;
  reuseFactor: number;
  carbonAvoidedKgPerGram: number;
  replacementValueFactor: number;
}

export interface SafetyRule {
  id: string;
  category: string;
  pattern: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  warningTitle: string;
  instructions: string;
  requiresAdminReview: boolean;
}
