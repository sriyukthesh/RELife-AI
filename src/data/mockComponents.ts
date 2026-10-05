import { ComponentItem } from '../types';

export const mockComponents: ComponentItem[] = [
  {
    id: 'comp-1',
    name: 'ESP32 DevKit V1 (30-Pin CP2102)',
    category: 'Microcontrollers',
    manufacturer: 'Espressif / DOIT',
    model: 'ESP32-WROOM-32D',
    quantity: 3,
    price: 180,
    condition: 'Like New',
    ageMonths: 4,
    specifications: {
      'Core': 'Dual-core Tensilica Xtensa 32-bit LX6 @ 240MHz',
      'Wireless': 'Wi-Fi 802.11 b/g/n & Bluetooth 4.2 BLE',
      'Operating Voltage': '3.3V Logic / 5V USB Input',
      'SRAM': '520 KB',
      'Flash': '4 MB SPI Flash'
    },
    sellerId: 'user-3',
    sellerName: 'Marcus Chen',
    sellerRating: 4.8,
    location: 'San Jose, CA',
    images: {
      front: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80',
      back: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=500&q=80',
      functionalProof: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80'
    },
    verificationLevel: 'HIGH_TRUST',
    trustProfile: {
      identityConfidence: 96,
      authenticityConfidence: 94,
      functionalEvidence: 'Verified',
      provenance: 'Documented',
      conditionEvidence: 'Photo verified',
      overallTrustScore: 95,
      aiAnalysis: {
        detectedModel: 'ESP32-WROOM-32D',
        packageType: '30-Pin DIP Module',
        markingIntegrity: 'Crisp laser engraving on RF shield',
        visualDamageDetected: [],
        isSafeForTesting: true
      }
    },
    lifecycleState: 'Available',
    safetyWarnings: [],
    compatibleProjectIds: ['proj-1', 'proj-3', 'proj-6', 'proj-12'],
    sustainabilityImpactGrams: 85,
    status: 'active',
    createdAt: '2026-02-14T09:00:00Z',
    updatedAt: '2026-02-14T09:00:00Z'
  },
  {
    id: 'comp-2',
    name: 'Arduino Uno R3 (ATmega328P DIP)',
    category: 'Microcontrollers',
    manufacturer: 'Arduino / Microchip',
    model: 'A000066',
    quantity: 2,
    price: 240,
    condition: 'Good',
    ageMonths: 14,
    specifications: {
      'Microcontroller': 'ATmega328P (Socketed DIP-28)',
      'Operating Voltage': '5V',
      'Input Voltage (limits)': '6-20V',
      'Digital I/O Pins': '14 (6 PWM)',
      'Clock Speed': '16 MHz'
    },
    sellerId: 'user-demo',
    sellerName: 'Alex Rivera',
    sellerRating: 4.9,
    location: 'Austin, TX',
    images: {
      front: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=500&q=80',
      back: 'https://images.unsplash.com/photo-1608755728617-aefab37d45f6?auto=format&fit=crop&w=500&q=80'
    },
    verificationLevel: 'ADMIN_VERIFIED',
    trustProfile: {
      identityConfidence: 94,
      authenticityConfidence: 92,
      functionalEvidence: 'Verified',
      provenance: 'Documented',
      conditionEvidence: 'Photo verified',
      overallTrustScore: 92,
      aiAnalysis: {
        detectedModel: 'Arduino Uno R3 Italian Rev3 PCB',
        packageType: 'Development Board',
        markingIntegrity: 'Copper silkscreen verified',
        visualDamageDetected: ['Minor flux residue near DC barrel jack'],
        isSafeForTesting: true
      }
    },
    lifecycleState: 'Available',
    safetyWarnings: [],
    compatibleProjectIds: ['proj-2', 'proj-4', 'proj-8', 'proj-9'],
    sustainabilityImpactGrams: 110,
    status: 'active',
    createdAt: '2026-01-20T10:30:00Z',
    updatedAt: '2026-01-20T10:30:00Z'
  },
  {
    id: 'comp-3',
    name: 'HC-SR04 Ultrasonic Distance Sensor',
    category: 'Sensors',
    manufacturer: 'ElecFreaks',
    model: 'HC-SR04',
    quantity: 6,
    price: 70,
    condition: 'New/Unused',
    ageMonths: 2,
    specifications: {
      'Working Voltage': 'DC 5V',
      'Working Current': '15mA',
      'Working Frequency': '40Hz',
      'Max Range': '4m',
      'Min Range': '2cm'
    },
    sellerId: 'user-4',
    sellerName: 'Priya Sharma',
    sellerRating: 4.95,
    location: 'Bengaluru, KA',
    images: {
      front: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80',
      back: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=500&q=80'
    },
    verificationLevel: 'HIGH_TRUST',
    trustProfile: {
      identityConfidence: 98,
      authenticityConfidence: 95,
      functionalEvidence: 'Verified',
      provenance: 'Documented',
      conditionEvidence: 'Photo verified',
      overallTrustScore: 97,
      aiAnalysis: {
        detectedModel: 'HC-SR04 Ultrasonic Transducer Module',
        packageType: 'Dual transducer module with crystal',
        markingIntegrity: 'Pristine pins and solder joints',
        visualDamageDetected: [],
        isSafeForTesting: true
      }
    },
    lifecycleState: 'Available',
    safetyWarnings: [],
    compatibleProjectIds: ['proj-1', 'proj-2', 'proj-4', 'proj-5', 'proj-7'],
    sustainabilityImpactGrams: 45,
    status: 'active',
    createdAt: '2026-02-01T14:15:00Z',
    updatedAt: '2026-02-01T14:15:00Z'
  },
  {
    id: 'comp-4',
    name: 'DHT22 Digital Temperature & Humidity Sensor',
    category: 'Sensors',
    manufacturer: 'Aosong',
    model: 'AM2302',
    quantity: 4,
    price: 85,
    condition: 'Like New',
    ageMonths: 3,
    specifications: {
      'Temp Range': '-40 to 80°C (±0.5°C)',
      'Humidity Range': '0-100% RH (±2-5% RH)',
      'Sampling Rate': '0.5 Hz (every 2 seconds)',
      'Power Supply': '3.3 - 6V DC'
    },
    sellerId: 'user-demo',
    sellerName: 'Alex Rivera',
    sellerRating: 4.9,
    location: 'Austin, TX',
    images: {
      front: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80',
      back: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=500&q=80'
    },
    verificationLevel: 'FUNCTIONALITY_EVIDENCE',
    trustProfile: {
      identityConfidence: 92,
      authenticityConfidence: 90,
      functionalEvidence: 'Verified',
      provenance: 'Documented',
      conditionEvidence: 'Photo verified',
      overallTrustScore: 91,
      aiAnalysis: {
        detectedModel: 'Aosong AM2302 (DHT22)',
        packageType: '4-pin Single row plastic mesh package',
        markingIntegrity: 'Legible batch stamp',
        visualDamageDetected: [],
        isSafeForTesting: true
      }
    },
    lifecycleState: 'Available',
    safetyWarnings: [],
    compatibleProjectIds: ['proj-1', 'proj-12'],
    sustainabilityImpactGrams: 35,
    status: 'active',
    createdAt: '2026-01-28T11:20:00Z',
    updatedAt: '2026-01-28T11:20:00Z'
  },
  {
    id: 'comp-5',
    name: '0.96 inch I2C OLED Display (128x64 Blue/Yellow)',
    category: 'Displays',
    manufacturer: 'Solomon Systech',
    model: 'SSD1306-I2C',
    quantity: 3,
    price: 110,
    condition: 'Like New',
    ageMonths: 5,
    specifications: {
      'Resolution': '128 x 64 pixels',
      'Interface': 'I2C (Address 0x3C / 0x3D selectable)',
      'Driver IC': 'SSD1306',
      'Voltage': '3.3V - 5V DC'
    },
    sellerId: 'user-6',
    sellerName: 'Sofia Rodriguez',
    sellerRating: 4.85,
    location: 'Austin, TX',
    images: {
      front: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=500&q=80',
      back: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80'
    },
    verificationLevel: 'HIGH_TRUST',
    trustProfile: {
      identityConfidence: 97,
      authenticityConfidence: 93,
      functionalEvidence: 'Verified',
      provenance: 'Documented',
      conditionEvidence: 'Photo verified',
      overallTrustScore: 94,
      aiAnalysis: {
        detectedModel: 'SSD1306 4-pin I2C Display',
        packageType: '0.96" Glass substrate with soldered carrier board',
        markingIntegrity: 'No glass chipping or hairline fissures',
        visualDamageDetected: [],
        isSafeForTesting: true
      }
    },
    lifecycleState: 'Available',
    safetyWarnings: [],
    compatibleProjectIds: ['proj-1', 'proj-12'],
    sustainabilityImpactGrams: 30,
    status: 'active',
    createdAt: '2026-02-10T16:40:00Z',
    updatedAt: '2026-02-10T16:40:00Z'
  },
  {
    id: 'comp-6',
    name: 'SG90 Micro 9g Servo Motor with Horns',
    category: 'Motors',
    manufacturer: 'TowerPro',
    model: 'SG-90',
    quantity: 5,
    price: 80,
    condition: 'Good',
    ageMonths: 7,
    specifications: {
      'Weight': '9g',
      'Operating Voltage': '4.8V (~0.1s/60deg speed)',
      'Stall Torque': '1.8 kg-cm @ 4.8V',
      'Gear Type': 'Nylon gear set'
    },
    sellerId: 'user-5',
    sellerName: 'Liam O’Connor',
    sellerRating: 4.7,
    location: 'Dublin, Ireland',
    images: {
      front: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80',
      back: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=500&q=80'
    },
    verificationLevel: 'IDENTITY_CHECKED',
    trustProfile: {
      identityConfidence: 89,
      authenticityConfidence: 86,
      functionalEvidence: 'User claimed',
      provenance: 'Documented',
      conditionEvidence: 'Photo verified',
      overallTrustScore: 87,
      aiAnalysis: {
        detectedModel: 'TowerPro SG90 Mini Servo',
        packageType: 'Sub-micro blue plastic housing',
        markingIntegrity: 'Standard brand sticker intact',
        visualDamageDetected: [],
        isSafeForTesting: true
      }
    },
    lifecycleState: 'Available',
    safetyWarnings: [],
    compatibleProjectIds: ['proj-3', 'proj-4', 'proj-5', 'proj-9'],
    sustainabilityImpactGrams: 40,
    status: 'active',
    createdAt: '2026-01-15T08:00:00Z',
    updatedAt: '2026-01-15T08:00:00Z'
  },
  {
    id: 'comp-7',
    name: 'L298N Dual H-Bridge Motor Driver Module',
    category: 'Power Components',
    manufacturer: 'STMicroelectronics Clone',
    model: 'L298N Module',
    quantity: 2,
    price: 130,
    condition: 'Good',
    ageMonths: 9,
    specifications: {
      'Driver Chip': 'L298N Dual H Bridge',
      'Drive Voltage': '5V - 35V',
      'Peak Drive Current': '2A per bridge',
      'Logical Voltage': '5V'
    },
    sellerId: 'user-7',
    sellerName: 'Kenji Takahashi',
    sellerRating: 5.0,
    location: 'Osaka, Japan',
    images: {
      front: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80',
      back: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=500&q=80'
    },
    verificationLevel: 'ADMIN_VERIFIED',
    trustProfile: {
      identityConfidence: 95,
      authenticityConfidence: 91,
      functionalEvidence: 'Verified',
      provenance: 'Documented',
      conditionEvidence: 'Photo verified',
      overallTrustScore: 93,
      aiAnalysis: {
        detectedModel: 'ST L298N Dual Motor Driver on breakout PCB',
        packageType: 'Multiwatt15 mounted on black aluminum heatsink',
        markingIntegrity: 'Clear laser etch on Multiwatt IC',
        visualDamageDetected: [],
        isSafeForTesting: true
      }
    },
    lifecycleState: 'Available',
    safetyWarnings: ['Keep heat sink ventilated when driving loads above 1.2A'],
    compatibleProjectIds: ['proj-4', 'proj-10'],
    sustainabilityImpactGrams: 140,
    status: 'active',
    createdAt: '2026-02-05T12:00:00Z',
    updatedAt: '2026-02-05T12:00:00Z'
  },
  {
    id: 'comp-8',
    name: '2-Channel 5V Relay Module with Optocoupler',
    category: 'Power Components',
    manufacturer: 'Songle / OEM',
    model: 'SRD-05VDC-SL-C',
    quantity: 3,
    price: 110,
    condition: 'Like New',
    ageMonths: 6,
    specifications: {
      'Switching Load': '10A 250VAC / 10A 30VDC',
      'Trigger Current': '5mA',
      'Trigger Voltage': '0-5V Active Low / High selectable',
      'Isolation': 'Optocoupler galvanic barrier'
    },
    sellerId: 'user-demo',
    sellerName: 'Alex Rivera',
    sellerRating: 4.9,
    location: 'Austin, TX',
    images: {
      front: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=500&q=80',
      back: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80'
    },
    verificationLevel: 'ADMIN_VERIFIED',
    trustProfile: {
      identityConfidence: 95,
      authenticityConfidence: 93,
      functionalEvidence: 'Verified',
      provenance: 'Documented',
      conditionEvidence: 'Photo verified',
      overallTrustScore: 94,
      aiAnalysis: {
        detectedModel: 'Songle SRD-05VDC-SL-C Relay Breakout',
        packageType: 'Dual sealed cuboid relay module',
        markingIntegrity: 'Original Songle blue casing with specifications intact',
        visualDamageDetected: [],
        isSafeForTesting: true
      }
    },
    lifecycleState: 'Available',
    safetyWarnings: ['⚠️ HIGH VOLTAGE RISK: Test with 12V DC loads before connecting to mains AC power.'],
    compatibleProjectIds: ['proj-6', 'proj-11'],
    sustainabilityImpactGrams: 90,
    status: 'active',
    createdAt: '2026-01-10T11:00:00Z',
    updatedAt: '2026-01-10T11:00:00Z'
  },
  {
    id: 'comp-9',
    name: 'Arduino Nano V3 (CH340G / ATmega328P)',
    category: 'Microcontrollers',
    manufacturer: 'Gravitech / OpenClone',
    model: 'Nano V3.0',
    quantity: 3,
    price: 175,
    condition: 'Like New',
    ageMonths: 4,
    specifications: {
      'Microcontroller': 'ATmega328P QFP-32',
      'USB Interface': 'CH340G USB to Serial',
      'Operating Voltage': '5V',
      'Flash Memory': '32 KB (2 KB used by bootloader)'
    },
    sellerId: 'user-4',
    sellerName: 'Priya Sharma',
    sellerRating: 4.95,
    location: 'Bengaluru, KA',
    images: {
      front: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=500&q=80',
      back: 'https://images.unsplash.com/photo-1608755728617-aefab37d45f6?auto=format&fit=crop&w=500&q=80'
    },
    verificationLevel: 'HIGH_TRUST',
    trustProfile: {
      identityConfidence: 96,
      authenticityConfidence: 92,
      functionalEvidence: 'Verified',
      provenance: 'Documented',
      conditionEvidence: 'Photo verified',
      overallTrustScore: 94,
      aiAnalysis: {
        detectedModel: 'Arduino Nano V3 Clone',
        packageType: '30-pin mini breadboard form factor',
        markingIntegrity: 'No bridged pins on QFP chip',
        visualDamageDetected: [],
        isSafeForTesting: true
      }
    },
    lifecycleState: 'Available',
    safetyWarnings: [],
    compatibleProjectIds: ['proj-5', 'proj-7', 'proj-10', 'proj-11'],
    sustainabilityImpactGrams: 50,
    status: 'active',
    createdAt: '2026-02-12T10:00:00Z',
    updatedAt: '2026-02-12T10:00:00Z'
  },
  {
    id: 'comp-10',
    name: 'Active Buzzer 5V DC (Pack of 3)',
    category: 'Actuators',
    manufacturer: 'Murata / Generic',
    model: 'HY-1205',
    quantity: 8,
    price: 20,
    condition: 'New/Unused',
    ageMonths: 1,
    specifications: {
      'Operating Voltage': '3.5 - 5.5V DC',
      'Resonant Frequency': '2.3 kHz ± 300 Hz',
      'Current Draw': '< 25mA'
    },
    sellerId: 'user-demo',
    sellerName: 'Alex Rivera',
    sellerRating: 4.9,
    location: 'Austin, TX',
    images: {
      front: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80',
      back: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=500&q=80'
    },
    verificationLevel: 'HIGH_TRUST',
    trustProfile: {
      identityConfidence: 98,
      authenticityConfidence: 95,
      functionalEvidence: 'Verified',
      provenance: 'Documented',
      conditionEvidence: 'Photo verified',
      overallTrustScore: 96,
      aiAnalysis: {
        detectedModel: '5V Active Piezo Buzzer',
        packageType: '12mm sealed circular black plastic cylinder',
        markingIntegrity: 'Removable wash seal tape intact',
        visualDamageDetected: [],
        isSafeForTesting: true
      }
    },
    lifecycleState: 'Available',
    safetyWarnings: [],
    compatibleProjectIds: ['proj-1', 'proj-2', 'proj-7', 'proj-8', 'proj-9', 'proj-12'],
    sustainabilityImpactGrams: 15,
    status: 'active',
    createdAt: '2026-02-15T08:30:00Z',
    updatedAt: '2026-02-15T08:30:00Z'
  },
  {
    id: 'comp-11',
    name: 'RC522 13.56MHz RFID Reader with Keyfob & Card',
    category: 'Sensors',
    manufacturer: 'NXP / Generic',
    model: 'MFRC522',
    quantity: 2,
    price: 110,
    condition: 'Like New',
    ageMonths: 5,
    specifications: {
      'Frequency': '13.56 MHz',
      'Communication': 'SPI interface up to 10Mbit/s',
      'Operating Voltage': '3.3V ONLY',
      'Supported Cards': 'Mifare1 S50, S70, UltraLight'
    },
    sellerId: 'user-3',
    sellerName: 'Marcus Chen',
    sellerRating: 4.8,
    location: 'San Jose, CA',
    images: {
      front: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80',
      back: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=500&q=80'
    },
    verificationLevel: 'FUNCTIONALITY_EVIDENCE',
    trustProfile: {
      identityConfidence: 93,
      authenticityConfidence: 91,
      functionalEvidence: 'Verified',
      provenance: 'Documented',
      conditionEvidence: 'Photo verified',
      overallTrustScore: 92,
      aiAnalysis: {
        detectedModel: 'NXP MFRC522 RFID Module',
        packageType: 'PCB antenna board with 8-pin right angle header',
        markingIntegrity: 'PCB antenna traces continuous and undamaged',
        visualDamageDetected: [],
        isSafeForTesting: true
      }
    },
    lifecycleState: 'Available',
    safetyWarnings: ['Do not connect 5V logic directly to 3.3V VCC pin.'],
    compatibleProjectIds: ['proj-9'],
    sustainabilityImpactGrams: 42,
    status: 'active',
    createdAt: '2026-01-22T14:00:00Z',
    updatedAt: '2026-01-22T14:00:00Z'
  },
  {
    id: 'comp-12',
    name: '18650 Dual Lithium Battery Holder with DC Switch',
    category: 'Power Components',
    manufacturer: 'Keystone / Generic',
    model: 'BH-18650-2S',
    quantity: 4,
    price: 75,
    condition: 'New/Unused',
    ageMonths: 2,
    specifications: {
      'Series Configuration': '2S (7.4V nominal / 8.4V max)',
      'Wire Gauge': '22 AWG copper leads',
      'Switch': 'Integrated slide toggle switch',
      'Contacts': 'Nickel-plated spring steel'
    },
    sellerId: 'user-8',
    sellerName: 'Amara Okafor',
    sellerRating: 4.75,
    location: 'Lagos, Nigeria',
    images: {
      front: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80',
      back: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=500&q=80'
    },
    verificationLevel: 'ADMIN_VERIFIED',
    trustProfile: {
      identityConfidence: 95,
      authenticityConfidence: 94,
      functionalEvidence: 'Verified',
      provenance: 'Documented',
      conditionEvidence: 'Photo verified',
      overallTrustScore: 95,
      aiAnalysis: {
        detectedModel: '2x 18650 Battery Holder',
        packageType: 'Molded ABS plastic battery bay with leads',
        markingIntegrity: 'Polarity markings clearly molded into plastic',
        visualDamageDetected: [],
        isSafeForTesting: true
      }
    },
    lifecycleState: 'Available',
    safetyWarnings: ['⚠️ BATTERY SAFETY: Inspect 18650 cell wrappers for tears before insertion. Never short positive and negative leads.'],
    compatibleProjectIds: ['proj-4', 'proj-10'],
    sustainabilityImpactGrams: 55,
    status: 'active',
    createdAt: '2026-02-08T09:20:00Z',
    updatedAt: '2026-02-08T09:20:00Z'
  },
  {
    id: 'comp-13',
    name: 'HC-05 Bluetooth Serial Transceiver Module',
    category: 'Communication Modules',
    manufacturer: 'WaveGate',
    model: 'HC-05',
    quantity: 2,
    price: 140,
    condition: 'Good',
    ageMonths: 8,
    specifications: {
      'Protocol': 'Bluetooth v2.0 + EDR',
      'Frequency': '2.4 GHz ISM band',
      'Baud Rate': '9600 bps default (up to 1382400 bps)',
      'Operating Voltage': '3.6V - 6V DC'
    },
    sellerId: 'user-demo',
    sellerName: 'Alex Rivera',
    sellerRating: 4.9,
    location: 'Austin, TX',
    images: {
      front: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80',
      back: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=500&q=80'
    },
    verificationLevel: 'HIGH_TRUST',
    trustProfile: {
      identityConfidence: 94,
      authenticityConfidence: 92,
      functionalEvidence: 'Verified',
      provenance: 'Documented',
      conditionEvidence: 'Photo verified',
      overallTrustScore: 93,
      aiAnalysis: {
        detectedModel: 'HC-05 Master/Slave BT module',
        packageType: 'Castellated module on breakout board',
        markingIntegrity: 'Key button and status LED functional',
        visualDamageDetected: [],
        isSafeForTesting: true
      }
    },
    lifecycleState: 'Available',
    safetyWarnings: [],
    compatibleProjectIds: [],
    sustainabilityImpactGrams: 35,
    status: 'active',
    createdAt: '2026-01-05T15:00:00Z',
    updatedAt: '2026-01-05T15:00:00Z'
  },
  {
    id: 'comp-14',
    name: 'MQ-2 Flammable Gas & Smoke Sensor Module',
    category: 'Sensors',
    manufacturer: 'Hanwei Electronics',
    model: 'MQ-2',
    quantity: 2,
    price: 120,
    condition: 'Like New',
    ageMonths: 4,
    specifications: {
      'Target Gases': 'LPG, Propane, Methane, Hydrogen, Smoke',
      'Concentration Range': '300 - 10000 ppm',
      'Heater Voltage': '5.0V ± 0.2V',
      'Response Time': '< 10s'
    },
    sellerId: 'user-4',
    sellerName: 'Priya Sharma',
    sellerRating: 4.95,
    location: 'Bengaluru, KA',
    images: {
      front: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80',
      back: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=500&q=80'
    },
    verificationLevel: 'ADMIN_VERIFIED',
    trustProfile: {
      identityConfidence: 96,
      authenticityConfidence: 94,
      functionalEvidence: 'Verified',
      provenance: 'Documented',
      conditionEvidence: 'Photo verified',
      overallTrustScore: 95,
      aiAnalysis: {
        detectedModel: 'MQ-2 Metal Mesh Gas Sensor',
        packageType: '6-pin steel mesh transducer on carrier board',
        markingIntegrity: 'Clean mesh, no soot deposition',
        visualDamageDetected: [],
        isSafeForTesting: true
      }
    },
    lifecycleState: 'Available',
    safetyWarnings: ['Sensor heats up during standard operation (~50°C). Do not touch heater dome.'],
    compatibleProjectIds: ['proj-12'],
    sustainabilityImpactGrams: 60,
    status: 'active',
    createdAt: '2026-02-11T13:45:00Z',
    updatedAt: '2026-02-11T13:45:00Z'
  },
  {
    id: 'comp-15',
    name: 'Breadboard Jumper Wires (40pcs M-M / M-F Mix)',
    category: 'Cables',
    manufacturer: 'Generic Dupont',
    model: 'Dupont-20cm',
    quantity: 12,
    price: 35,
    condition: 'New/Unused',
    ageMonths: 1,
    specifications: {
      'Length': '20cm',
      'Pin Pitch': '2.54mm (0.1 inch standard)',
      'Wire Type': 'High-flex copper stranded core',
      'Colors': '10-color rainbow ribbon'
    },
    sellerId: 'user-demo',
    sellerName: 'Alex Rivera',
    sellerRating: 4.9,
    location: 'Austin, TX',
    images: {
      front: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=500&q=80',
      back: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80'
    },
    verificationLevel: 'HIGH_TRUST',
    trustProfile: {
      identityConfidence: 99,
      authenticityConfidence: 97,
      functionalEvidence: 'Verified',
      provenance: 'Documented',
      conditionEvidence: 'Photo verified',
      overallTrustScore: 98,
      aiAnalysis: {
        detectedModel: 'Dupont Ribbon Cable Assortment',
        packageType: 'Detachable 40-way rainbow jumper bundle',
        markingIntegrity: 'Crimp housings secure on both ends',
        visualDamageDetected: [],
        isSafeForTesting: true
      }
    },
    lifecycleState: 'Available',
    safetyWarnings: [],
    compatibleProjectIds: ['proj-1', 'proj-2', 'proj-3', 'proj-4', 'proj-5', 'proj-6'],
    sustainabilityImpactGrams: 80,
    status: 'active',
    createdAt: '2026-02-14T11:00:00Z',
    updatedAt: '2026-02-14T11:00:00Z'
  },
  {
    id: 'comp-16',
    name: 'Capacitive Soil Moisture Sensor Module v1.2',
    category: 'Sensors',
    manufacturer: 'DFRobot Compatible',
    model: 'Capacitive-Moisture-v1.2',
    quantity: 4,
    price: 75,
    condition: 'New/Unused',
    ageMonths: 2,
    specifications: {
      'Operating Voltage': '3.3V - 5.5V DC',
      'Output Voltage': '0 - 3.0V DC',
      'Interface': '3-Pin PH2.0 Gravity header',
      'Corrosion Resistance': 'Capacitive probe geometry (no exposed copper)'
    },
    sellerId: 'user-demo',
    sellerName: 'Alex Rivera',
    sellerRating: 4.9,
    location: 'Austin, TX',
    images: {
      front: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80',
      back: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=500&q=80'
    },
    verificationLevel: 'HIGH_TRUST',
    trustProfile: {
      identityConfidence: 97,
      authenticityConfidence: 94,
      functionalEvidence: 'Verified',
      provenance: 'Documented',
      conditionEvidence: 'Photo verified',
      overallTrustScore: 96,
      aiAnalysis: {
        detectedModel: 'Capacitive Soil Moisture v1.2',
        packageType: 'Elongated probe PCB with on-board 555 timer circuitry',
        markingIntegrity: 'Solder mask uniform across probe tines',
        visualDamageDetected: [],
        isSafeForTesting: true
      }
    },
    lifecycleState: 'Available',
    safetyWarnings: [],
    compatibleProjectIds: ['proj-3', 'proj-11'],
    sustainabilityImpactGrams: 30,
    status: 'active',
    createdAt: '2026-02-09T14:30:00Z',
    updatedAt: '2026-02-09T14:30:00Z'
  },
  {
    id: 'comp-17',
    name: 'TT Geared DC Motors with Rubber Wheels (Pair)',
    category: 'Motors',
    manufacturer: 'Haian / Adafruit Compatible',
    model: 'TT-Motor-1:48',
    quantity: 3,
    price: 150,
    condition: 'Like New',
    ageMonths: 3,
    specifications: {
      'Operating Voltage': '3V - 6V DC',
      'Gear Ratio': '1:48',
      'No-Load Speed': '200 RPM @ 6V',
      'Wheel Diameter': '66mm with rubber tread'
    },
    sellerId: 'user-3',
    sellerName: 'Marcus Chen',
    sellerRating: 4.8,
    location: 'San Jose, CA',
    images: {
      front: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80',
      back: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=500&q=80'
    },
    verificationLevel: 'HIGH_TRUST',
    trustProfile: {
      identityConfidence: 95,
      authenticityConfidence: 92,
      functionalEvidence: 'Verified',
      provenance: 'Documented',
      conditionEvidence: 'Photo verified',
      overallTrustScore: 93,
      aiAnalysis: {
        detectedModel: 'TT Yellow Dual Axis Geared Motor',
        packageType: 'Molded yellow gearbox with steel motor casing',
        markingIntegrity: 'EMC suppression capacitors soldered across terminals',
        visualDamageDetected: [],
        isSafeForTesting: true
      }
    },
    lifecycleState: 'Available',
    safetyWarnings: [],
    compatibleProjectIds: ['proj-4', 'proj-10'],
    sustainabilityImpactGrams: 160,
    status: 'active',
    createdAt: '2026-01-29T10:15:00Z',
    updatedAt: '2026-01-29T10:15:00Z'
  },
  {
    id: 'comp-18',
    name: 'Arduino Uno R3 (Defective Bootloader / Salvageable)',
    category: 'Microcontrollers',
    manufacturer: 'Arduino',
    model: 'A000066-Salvage',
    quantity: 1,
    price: 50,
    condition: 'Non-Functional',
    ageMonths: 24,
    specifications: {
      'Symptoms': 'Power LED lights up green, but AVRDUDE programmer timeout error (stk500)',
      'Potential Repair': 'Socketed DIP ATmega328P can be re-flashed via ICSP header or swapped',
      'Board Condition': 'Clean PCB, pristine barrel jack, 16MHz crystal intact'
    },
    sellerId: 'user-5',
    sellerName: 'Liam O’Connor',
    sellerRating: 4.7,
    location: 'Dublin, Ireland',
    images: {
      front: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=500&q=80',
      back: 'https://images.unsplash.com/photo-1608755728617-aefab37d45f6?auto=format&fit=crop&w=500&q=80'
    },
    verificationLevel: 'IDENTITY_CHECKED',
    trustProfile: {
      identityConfidence: 93,
      authenticityConfidence: 90,
      functionalEvidence: 'User claimed',
      provenance: 'Documented',
      conditionEvidence: 'Photo verified',
      overallTrustScore: 78,
      aiAnalysis: {
        detectedModel: 'Arduino Uno R3 Revision 3',
        packageType: 'DIP-28 socketed development board',
        markingIntegrity: 'Authentic silkscreen',
        visualDamageDetected: ['No visible burn marks on voltage regulators or USB chip'],
        isSafeForTesting: true
      }
    },
    lifecycleState: 'Recovered',
    safetyWarnings: ['Repair-Before-Recycle candidate: try flashing bootloader with USBasp programmer.'],
    compatibleProjectIds: ['proj-2', 'proj-4', 'proj-8'],
    sustainabilityImpactGrams: 110,
    status: 'active',
    createdAt: '2026-02-02T16:00:00Z',
    updatedAt: '2026-02-02T16:00:00Z'
  },
  {
    id: 'comp-19',
    name: '16x2 Character LCD Display with I2C Backpack',
    category: 'Displays',
    manufacturer: 'Hitachi / SunFounder',
    model: 'LCD1602-PCF8574',
    quantity: 2,
    price: 130,
    condition: 'Good',
    ageMonths: 6,
    specifications: {
      'Characters': '16 columns x 2 rows (5x8 dot matrix font)',
      'Backlight': 'Blue LED with white characters',
      'I2C Backpack': 'PCF8574 I/O expander (Address 0x27)',
      'Contrast': 'Onboard trimpot adjustment'
    },
    sellerId: 'user-7',
    sellerName: 'Kenji Takahashi',
    sellerRating: 5.0,
    location: 'Osaka, Japan',
    images: {
      front: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=500&q=80',
      back: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80'
    },
    verificationLevel: 'HIGH_TRUST',
    trustProfile: {
      identityConfidence: 96,
      authenticityConfidence: 93,
      functionalEvidence: 'Verified',
      provenance: 'Documented',
      conditionEvidence: 'Photo verified',
      overallTrustScore: 94,
      aiAnalysis: {
        detectedModel: 'LCD1602 with PCF8574T piggyback',
        packageType: '16-pin COB LCD module with soldered 4-pin I2C backpack',
        markingIntegrity: 'Pristine polarizer film with no scratches',
        visualDamageDetected: [],
        isSafeForTesting: true
      }
    },
    lifecycleState: 'Available',
    safetyWarnings: [],
    compatibleProjectIds: ['proj-7'],
    sustainabilityImpactGrams: 70,
    status: 'active',
    createdAt: '2026-01-18T13:30:00Z',
    updatedAt: '2026-01-18T13:30:00Z'
  },
  {
    id: 'comp-20',
    name: 'PIR Motion Sensor HC-SR501 with Fresnel Dome',
    category: 'Sensors',
    manufacturer: 'Nisene / Generic',
    model: 'HC-SR501',
    quantity: 4,
    price: 65,
    condition: 'Like New',
    ageMonths: 3,
    specifications: {
      'Sensing Angle': '< 100 degree cone angle',
      'Detection Range': '3 - 7 meters (adjustable via trimpot)',
      'Output Level': '3.3V High / 0V Low TTL',
      'Quiescent Current': '< 50uA'
    },
    sellerId: 'user-demo',
    sellerName: 'Alex Rivera',
    sellerRating: 4.9,
    location: 'Austin, TX',
    images: {
      front: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80',
      back: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=500&q=80'
    },
    verificationLevel: 'HIGH_TRUST',
    trustProfile: {
      identityConfidence: 98,
      authenticityConfidence: 94,
      functionalEvidence: 'Verified',
      provenance: 'Documented',
      conditionEvidence: 'Photo verified',
      overallTrustScore: 96,
      aiAnalysis: {
        detectedModel: 'HC-SR501 Pyroelectric Sensor Module',
        packageType: 'Dual-element pyroelectric detector under white segmented Fresnel lens',
        markingIntegrity: 'BISS0001 controller chip markings verified',
        visualDamageDetected: [],
        isSafeForTesting: true
      }
    },
    lifecycleState: 'Available',
    safetyWarnings: [],
    compatibleProjectIds: ['proj-8'],
    sustainabilityImpactGrams: 30,
    status: 'active',
    createdAt: '2026-02-04T15:20:00Z',
    updatedAt: '2026-02-04T15:20:00Z'
  }
];
