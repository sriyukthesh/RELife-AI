import {
  Order,
  ProjectTeam,
  ComponentRequest,
  ReuseCertificate,
  Badge,
  AuditLog,
  Report,
  SafetyRule,
  SustainabilityFactor
} from '../types';

export const mockOrders: Order[] = [
  {
    id: 'ORD-2026-8812',
    buyerId: 'user-demo',
    buyerName: 'Alex Rivera',
    items: [
      {
        componentId: 'comp-1',
        name: 'ESP32 DevKit V1 (30-Pin CP2102)',
        quantity: 2,
        price: 180,
        sustainabilityImpactGrams: 170
      },
      {
        componentId: 'comp-3',
        name: 'HC-SR04 Ultrasonic Distance Sensor',
        quantity: 1,
        price: 70,
        sustainabilityImpactGrams: 45
      }
    ],
    subtotal: 430,
    shipping: 40,
    total: 470,
    totalEwasteReusedGrams: 215,
    potentialProjectsEnabled: 4,
    shippingAddress: {
      fullName: 'Alex Rivera',
      address: '742 Evergreen Terrace, Suite 4B',
      city: 'Austin, TX',
      postalCode: '78701'
    },
    paymentMethod: 'UPI',
    status: 'delivered',
    createdAt: '2026-02-10T14:30:00Z'
  },
  {
    id: 'ORD-2026-7941',
    buyerId: 'user-3',
    buyerName: 'Marcus Chen',
    items: [
      {
        componentId: 'comp-7',
        name: 'L298N Dual H-Bridge Motor Driver Module',
        quantity: 1,
        price: 130,
        sustainabilityImpactGrams: 140
      },
      {
        componentId: 'comp-12',
        name: '18650 Dual Lithium Battery Holder with DC Switch',
        quantity: 1,
        price: 75,
        sustainabilityImpactGrams: 55
      }
    ],
    subtotal: 205,
    shipping: 35,
    total: 240,
    totalEwasteReusedGrams: 195,
    potentialProjectsEnabled: 2,
    shippingAddress: {
      fullName: 'Marcus Chen',
      address: '102 Silicon Way',
      city: 'San Jose, CA',
      postalCode: '95112'
    },
    paymentMethod: 'Demo Payment',
    status: 'dispatched',
    createdAt: '2026-02-12T11:00:00Z'
  }
];

export const mockProjectTeams: ProjectTeam[] = [
  {
    id: 'team-1',
    name: 'Makerspace Eco-Sentinels',
    projectId: 'proj-1',
    projectTitle: 'Smart Environmental & Weather Monitor',
    status: 'Building',
    leadId: 'user-demo',
    leadName: 'Alex Rivera',
    members: [
      { userId: 'user-demo', name: 'Alex Rivera', role: 'Firmware & I2C Lead' },
      { userId: 'user-6', name: 'Sofia Rodriguez', role: 'Enclosure 3D Print & Mechanical' },
      { userId: 'user-4', name: 'Priya Sharma', role: 'Sensor Calibration' }
    ],
    tasks: [
      { id: 'task-1', title: 'Source DHT22 sensor and verify pull-up resistor', assignee: 'Priya Sharma', completed: true },
      { id: 'task-2', title: 'Draft MicroPython driver for SSD1306', assignee: 'Alex Rivera', completed: true },
      { id: 'task-3', title: 'Laser cut recycled acrylic faceplate', assignee: 'Sofia Rodriguez', completed: false }
    ],
    claimedComponents: [
      { componentName: 'ESP32 DevKit V1', quantity: 1, claimedBy: 'Alex Rivera' },
      { componentName: '0.96 inch I2C OLED Display', quantity: 1, claimedBy: 'Sofia Rodriguez' }
    ],
    notes: 'Prototype enclosure ready from reclaimed polystyrene takeout containers.',
    updatedAt: '2026-02-14T16:00:00Z'
  },
  {
    id: 'team-2',
    name: 'Autonomous Rover Lab',
    projectId: 'proj-4',
    projectTitle: 'Autonomous Obstacle-Avoiding Rover',
    status: 'Planning',
    leadId: 'user-3',
    leadName: 'Marcus Chen',
    members: [
      { userId: 'user-3', name: 'Marcus Chen', role: 'Robotics Kinematics' },
      { userId: 'user-5', name: 'Liam O’Connor', role: 'Chassis & Battery Security' }
    ],
    tasks: [
      { id: 'task-4', title: 'Test L298N driver under 7.4V load', assignee: 'Marcus Chen', completed: true },
      { id: 'task-5', title: 'Verify ultrasonic sweep arc clearance', assignee: 'Liam O’Connor', completed: false }
    ],
    claimedComponents: [
      { componentName: 'L298N Dual H-Bridge', quantity: 1, claimedBy: 'Marcus Chen' }
    ],
    notes: 'Aiming to enter regional circular robotics design showcase.',
    updatedAt: '2026-02-13T10:00:00Z'
  }
];

export const mockComponentRequests: ComponentRequest[] = [
  {
    id: 'req-1',
    userId: 'user-6',
    userName: 'Sofia Rodriguez',
    componentName: 'ESP32 DevKit V1 (30-Pin)',
    category: 'Microcontrollers',
    quantityNeeded: 2,
    projectTitle: 'Smart Plant Soil Hydration & Health Monitor',
    status: 'Open',
    offers: [
      {
        userId: 'user-demo',
        userName: 'Alex Rivera',
        componentId: 'comp-1',
        price: 180,
        note: 'Have 2 tested units ready to ship or local pickup in Austin!'
      }
    ],
    createdAt: '2026-02-11T12:00:00Z'
  },
  {
    id: 'req-2',
    userId: 'user-5',
    userName: 'Liam O’Connor',
    componentName: 'SG90 Micro Servo Motor',
    category: 'Motors',
    quantityNeeded: 3,
    projectTitle: 'Touchless Ultrasonic Smart Dustbin',
    status: 'Open',
    offers: [],
    createdAt: '2026-02-13T09:30:00Z'
  }
];

export const mockReuseCertificates: ReuseCertificate[] = [
  {
    id: 'cert-1',
    certificateNumber: 'RL-2026-0491',
    userId: 'user-demo',
    userName: 'Alex Rivera',
    projectId: 'proj-1',
    projectTitle: 'Smart Environmental & Weather Monitor',
    componentsReused: ['ESP32 DevKit', 'DHT22 Sensor', '0.96 inch I2C OLED', 'Dupont Jumper Wires (10x)'],
    totalWasteAvoidedGrams: 420,
    circularityScore: 94,
    dateIssued: '2026-02-10',
    verificationCode: 'RELIFE-VERIFIED-7F9A2B'
  },
  {
    id: 'cert-2',
    certificateNumber: 'RL-2026-0382',
    userId: 'user-4',
    userName: 'Priya Sharma',
    projectId: 'proj-2',
    projectTitle: 'Smart Parking & Space Availability Monitor',
    componentsReused: ['Arduino Uno R3', 'HC-SR04 Ultrasonic Sensor', 'Active Buzzer 5V'],
    totalWasteAvoidedGrams: 380,
    circularityScore: 91,
    dateIssued: '2026-01-28',
    verificationCode: 'RELIFE-VERIFIED-8D3C1E'
  }
];

export const mockBadges: Badge[] = [
  { id: 'b-1', title: 'First Reuse', description: 'Gave a decommissioned component a RELife in a verified build.', icon: 'Seedling', criteria: 'Complete 1 project with reused components' },
  { id: 'b-2', title: 'Component Rescuer', description: 'Prevented over 2kg of electronics from entering landfill streams.', icon: 'ShieldCheck', criteria: 'Divert 2000g of e-waste' },
  { id: 'b-3', title: 'Builder', description: 'Successfully engineered and documented 5 verified circular hardware prototypes.', icon: 'Wrench', criteria: 'Complete 5 projects' },
  { id: 'b-4', title: 'Circular Innovator', description: 'Designed high-circularity builds achieving a composite score above 90.', icon: 'Recycle', criteria: 'Attain 90+ circularity score' },
  { id: 'b-5', title: 'E-Waste Reducer', description: 'Active contributor in community component exchange and recovery.', icon: 'Sparkles', criteria: 'List 10 verified components' },
  { id: 'b-6', title: 'Trusted Contributor', description: '100% positive verification rating across all submissions.', icon: 'Award', criteria: 'Maintain 4.8+ rating and 10+ sales' }
];

export const mockAuditLogs: AuditLog[] = [
  { id: 'log-1', timestamp: '2026-02-14T11:22:10Z', actor: 'Alex Rivera (user-demo)', actorRole: 'USER', action: 'LISTING_CREATED', target: 'comp-15 (Breadboard Jumper Wires)', result: 'SUCCESS', details: 'Added 12 units to marketplace with camera evidence.' },
  { id: 'log-2', timestamp: '2026-02-14T09:45:00Z', actor: 'Elena Vance (user-admin)', actorRole: 'ADMIN', action: 'VERIFICATION_APPROVED', target: 'comp-1 (ESP32 DevKit V1)', result: 'SUCCESS', details: 'Validated front/back laser markings and functional demo clip.' },
  { id: 'log-3', timestamp: '2026-02-13T16:10:45Z', actor: 'System Matching Engine', actorRole: 'SYSTEM', action: 'FEASIBILITY_EVALUATION', target: 'Inventory: Alex Rivera', result: 'SUCCESS', details: 'Computed 96% feasibility for Smart Environmental Monitor.' },
  { id: 'log-4', timestamp: '2026-02-12T11:00:12Z', actor: 'Marcus Chen (user-3)', actorRole: 'USER', action: 'ORDER_PLACED', target: 'ORD-2026-7941', result: 'SUCCESS', details: 'Completed demo checkout for L298N and battery holder.' },
  { id: 'log-5', timestamp: '2026-02-11T14:05:30Z', actor: 'Elena Vance (user-admin)', actorRole: 'ADMIN', action: 'SAFETY_RULE_UPDATED', target: 'SR-01 (Lithium Batteries)', result: 'SUCCESS', details: 'Enforced mandatory packaging warnings on 18650 listings.' }
];

export const mockReports: Report[] = [
  {
    id: 'rep-1',
    reporterId: 'user-3',
    reporterName: 'Marcus Chen',
    targetType: 'listing',
    targetId: 'comp-18',
    targetTitle: 'Arduino Uno R3 (Defective Bootloader)',
    reason: 'Misleading condition',
    explanation: 'Listing accurately marks non-functional in details, but please verify the chip is removable socket DIP.',
    status: 'Resolved',
    adminNotes: 'Confirmed socket DIP ATmega328P package. Clear repair instructions added.',
    createdAt: '2026-02-03T10:00:00Z'
  }
];

export const mockSafetyRules: SafetyRule[] = [
  {
    id: 'sr-1',
    category: 'Batteries & High Current',
    pattern: '18650|lithium|lipo|battery|accumulator',
    riskLevel: 'HIGH',
    warningTitle: '⚠️ LITHIUM CELL SAFETY INSPECTION REQUIRED',
    instructions: 'Inspect cell sleeves for tears or punctures. Never connect in parallel with mismatched state of charge. Use certified BMS circuit.',
    requiresAdminReview: true
  },
  {
    id: 'sr-2',
    category: 'Mains AC Switching',
    pattern: 'relay|triac|solid state|mains|220v|110v|ssr',
    riskLevel: 'CRITICAL',
    warningTitle: '⚠️ HIGH VOLTAGE HAZARD (MAINS AC 110V/230V)',
    instructions: 'Do not handle exposed relay contacts while energized. Keep 8mm PCB creepage distance. Initial testing must only use safe low-voltage 12V DC loads.',
    requiresAdminReview: true
  },
  {
    id: 'sr-3',
    category: 'Heater & Thermal Elements',
    pattern: 'mq-2|mq-135|heater|nichrome|soldering|hot-end',
    riskLevel: 'MEDIUM',
    warningTitle: '⚠️ THERMAL HEATING ELEMENT NOTICE',
    instructions: 'Gas sensors and heating elements operate above 50°C. Mount in flame-retardant enclosures away from flammable solvents.',
    requiresAdminReview: false
  }
];

export const mockSustainabilityFactors: SustainabilityFactor[] = [
  { category: 'Microcontrollers', estimatedMassGrams: 85, reuseFactor: 0.92, carbonAvoidedKgPerGram: 0.055, replacementValueFactor: 1.0 },
  { category: 'Sensors', estimatedMassGrams: 35, reuseFactor: 0.88, carbonAvoidedKgPerGram: 0.040, replacementValueFactor: 0.9 },
  { category: 'Displays', estimatedMassGrams: 45, reuseFactor: 0.85, carbonAvoidedKgPerGram: 0.060, replacementValueFactor: 1.1 },
  { category: 'Motors', estimatedMassGrams: 90, reuseFactor: 0.90, carbonAvoidedKgPerGram: 0.045, replacementValueFactor: 0.95 },
  { category: 'Power Components', estimatedMassGrams: 80, reuseFactor: 0.87, carbonAvoidedKgPerGram: 0.050, replacementValueFactor: 0.9 },
  { category: 'Communication Modules', estimatedMassGrams: 30, reuseFactor: 0.91, carbonAvoidedKgPerGram: 0.048, replacementValueFactor: 1.0 },
  { category: 'Actuators', estimatedMassGrams: 40, reuseFactor: 0.89, carbonAvoidedKgPerGram: 0.035, replacementValueFactor: 0.85 },
  { category: 'Cables', estimatedMassGrams: 50, reuseFactor: 0.95, carbonAvoidedKgPerGram: 0.020, replacementValueFactor: 0.7 },
  { category: 'Batteries', estimatedMassGrams: 60, reuseFactor: 0.75, carbonAvoidedKgPerGram: 0.070, replacementValueFactor: 1.2 },
  { category: 'Other Electronics', estimatedMassGrams: 40, reuseFactor: 0.85, carbonAvoidedKgPerGram: 0.030, replacementValueFactor: 0.8 }
];
