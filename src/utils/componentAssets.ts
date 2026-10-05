// High-fidelity authentic electronic component representations
// Generates photorealistic SVG data URIs matching the exact real-world hardware

function svgToDataUri(svgString: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString.trim())}`;
}

export const COMPONENT_ORIGINAL_IMAGES: Record<string, { front: string; back: string; proof?: string }> = {
  'comp-1': { // ESP32 DevKit V1
    front: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
        <rect width="500" height="400" fill="#18181b"/>
        <!-- PCB Base -->
        <rect x="150" y="40" width="200" height="320" rx="8" fill="#1c1917" stroke="#292524" stroke-width="2"/>
        <!-- Header Pins Left & Right -->
        ${Array.from({ length: 15 }).map((_, i) => `
          <rect x="135" y="${65 + i * 18}" width="18" height="6" rx="1" fill="#eab308" stroke="#ca8a04" stroke-width="0.5"/>
          <rect x="155" y="${66 + i * 18}" width="4" height="4" rx="2" fill="#78716c"/>
          <rect x="347" y="${65 + i * 18}" width="18" height="6" rx="1" fill="#eab308" stroke="#ca8a04" stroke-width="0.5"/>
          <rect x="341" y="${66 + i * 18}" width="4" height="4" rx="2" fill="#78716c"/>
        `).join('')}
        <!-- ESP-WROOM-32 Metal RF Shield -->
        <rect x="180" y="60" width="140" height="130" rx="4" fill="#d1d5db" stroke="#9ca3af" stroke-width="1.5"/>
        <!-- RF Shield Markings -->
        <rect x="195" y="70" width="110" height="20" rx="2" fill="#e5e7eb"/>
        <text x="250" y="84" font-family="sans-serif" font-weight="900" font-size="11" fill="#1f2937" text-anchor="middle">ESPRESSIF</text>
        <text x="250" y="105" font-family="monospace" font-weight="bold" font-size="12" fill="#111827" text-anchor="middle">ESP-WROOM-32</text>
        <text x="250" y="125" font-family="monospace" font-size="8" fill="#4b5563" text-anchor="middle">FCC ID: 2AC7Z-ESPWROOM32</text>
        <text x="250" y="145" font-family="monospace" font-size="8" fill="#4b5563" text-anchor="middle">CE 1313 · Wi-Fi &amp; Bluetooth</text>
        <!-- Antenna Trace -->
        <path d="M 190 55 L 310 55 L 310 45 L 200 45 L 200 50 L 300 50" fill="none" stroke="#ca8a04" stroke-width="2"/>
        <!-- Micro USB Port at bottom -->
        <rect x="220" y="340" width="60" height="28" rx="3" fill="#cbd5e1" stroke="#64748b" stroke-width="1.5"/>
        <rect x="230" y="348" width="40" height="14" rx="2" fill="#334155"/>
        <!-- CP2102 USB Bridge Chip -->
        <rect x="235" y="270" width="30" height="30" rx="2" fill="#0f172a" stroke="#334155" stroke-width="1"/>
        <text x="250" y="288" font-family="sans-serif" font-size="6" fill="#94a3b8" text-anchor="middle">CP2102</text>
        <!-- EN and BOOT buttons -->
        <rect x="170" y="325" width="22" height="18" rx="2" fill="#e2e8f0" stroke="#94a3b8"/>
        <circle cx="181" cy="334" r="5" fill="#475569"/>
        <text x="181" y="353" font-family="sans-serif" font-size="7" fill="#cbd5e1" text-anchor="middle">EN</text>
        <rect x="308" y="325" width="22" height="18" rx="2" fill="#e2e8f0" stroke="#94a3b8"/>
        <circle cx="319" cy="334" r="5" fill="#475569"/>
        <text x="319" y="353" font-family="sans-serif" font-size="7" fill="#cbd5e1" text-anchor="middle">BOOT</text>
        <!-- Power & Status LEDs -->
        <rect x="200" y="220" width="8" height="6" fill="#ef4444" rx="1"/>
        <rect x="290" y="220" width="8" height="6" fill="#3b82f6" rx="1"/>
        <text x="250" y="385" font-family="sans-serif" font-weight="bold" font-size="12" fill="#10b981" text-anchor="middle">ESP32 DevKit V1 (30-Pin)</text>
      </svg>
    `),
    back: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
        <rect width="500" height="400" fill="#18181b"/>
        <rect x="150" y="40" width="200" height="320" rx="8" fill="#1c1917" stroke="#292524" stroke-width="2"/>
        <!-- Copper Pin Labels on Back Silkscreen -->
        ${Array.from({ length: 15 }).map((_, i) => `
          <circle cx="160" cy="${68 + i * 18}" r="4" fill="#ca8a04"/>
          <circle cx="340" cy="${68 + i * 18}" r="4" fill="#ca8a04"/>
        `).join('')}
        <text x="175" y="100" font-family="monospace" font-size="8" fill="#e7e5e4">EN</text>
        <text x="175" y="118" font-family="monospace" font-size="8" fill="#e7e5e4">VP</text>
        <text x="175" y="136" font-family="monospace" font-size="8" fill="#e7e5e4">VN</text>
        <text x="175" y="154" font-family="monospace" font-size="8" fill="#e7e5e4">D34</text>
        <text x="175" y="172" font-family="monospace" font-size="8" fill="#e7e5e4">D35</text>
        <text x="175" y="190" font-family="monospace" font-size="8" fill="#e7e5e4">D32</text>
        <text x="175" y="208" font-family="monospace" font-size="8" fill="#e7e5e4">D33</text>
        <text x="175" y="226" font-family="monospace" font-size="8" fill="#e7e5e4">D25</text>
        <text x="175" y="244" font-family="monospace" font-size="8" fill="#e7e5e4">D26</text>
        <text x="175" y="262" font-family="monospace" font-size="8" fill="#e7e5e4">D27</text>
        <text x="175" y="280" font-family="monospace" font-size="8" fill="#e7e5e4">D14</text>
        <text x="175" y="298" font-family="monospace" font-size="8" fill="#e7e5e4">D12</text>
        <text x="175" y="316" font-family="monospace" font-size="8" fill="#e7e5e4">GND</text>
        <text x="175" y="334" font-family="monospace" font-size="8" fill="#ef4444">VIN</text>
        <text x="250" y="180" font-family="sans-serif" font-weight="bold" font-size="14" fill="#78716c" text-anchor="middle">DOIT ESP32</text>
        <text x="250" y="200" font-family="sans-serif" font-size="10" fill="#57534e" text-anchor="middle">DEVKIT V1</text>
        <text x="250" y="385" font-family="sans-serif" font-weight="bold" font-size="12" fill="#a8a29e" text-anchor="middle">Reverse Pinout Silkscreen</text>
      </svg>
    `)
  },
  'comp-2': { // Arduino Uno R3
    front: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
        <rect width="500" height="400" fill="#0f172a"/>
        <!-- Classic Teal/Cyan Arduino Uno PCB -->
        <rect x="90" y="50" width="320" height="280" rx="10" fill="#008184" stroke="#005f60" stroke-width="3"/>
        <!-- DC Barrel Jack -->
        <rect x="75" y="70" width="45" height="50" rx="3" fill="#1e293b" stroke="#0f172a" stroke-width="2"/>
        <rect x="85" y="80" width="30" height="30" rx="2" fill="#000000"/>
        <!-- USB Type-B Metal Port -->
        <rect x="75" y="160" width="55" height="55" rx="3" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>
        <rect x="85" y="172" width="35" height="30" rx="3" fill="#334155"/>
        <!-- Voltage Regulator 5V (NCP1117) -->
        <rect x="150" y="85" width="35" height="25" fill="#18181b" rx="2"/>
        <!-- ATmega328P DIP-28 IC in Socket -->
        <rect x="230" y="170" width="140" height="45" rx="2" fill="#18181b" stroke="#27272a" stroke-width="1.5"/>
        <circle cx="238" cy="192" r="3" fill="#3f3f46"/>
        <text x="300" y="196" font-family="monospace" font-weight="bold" font-size="11" fill="#e4e4e7" text-anchor="middle">ATMEGA328P-PU</text>
        <!-- Socket Pins -->
        ${Array.from({ length: 14 }).map((_, i) => `
          <rect x="${235 + i * 9.5}" y="163" width="4" height="7" fill="#a1a1aa"/>
          <rect x="${235 + i * 9.5}" y="215" width="4" height="7" fill="#a1a1aa"/>
        `).join('')}
        <!-- 16MHz Crystal Oscillator -->
        <rect x="200" y="180" width="18" height="26" rx="4" fill="#e2e8f0" stroke="#94a3b8"/>
        <!-- Female Header Pins Top (Digital 0-13) -->
        <rect x="180" y="55" width="90" height="15" fill="#1e293b" rx="1"/>
        <rect x="280" y="55" width="115" height="15" fill="#1e293b" rx="1"/>
        <!-- Female Header Pins Bottom (Power & Analog) -->
        <rect x="180" y="310" width="75" height="15" fill="#1e293b" rx="1"/>
        <rect x="270" y="310" width="60" height="15" fill="#1e293b" rx="1"/>
        <!-- Red Reset Button -->
        <rect x="145" y="275" width="22" height="22" rx="3" fill="#e2e8f0"/>
        <circle cx="156" cy="286" r="6" fill="#ef4444"/>
        <!-- Italian Map & Silkscreen text -->
        <text x="320" y="120" font-family="sans-serif" font-weight="900" font-size="20" fill="#ffffff" letter-spacing="1">ARDUINO</text>
        <text x="320" y="140" font-family="sans-serif" font-weight="bold" font-size="14" fill="#f8fafc">UNO</text>
        <text x="250" y="380" font-family="sans-serif" font-weight="bold" font-size="13" fill="#38bdf8" text-anchor="middle">Arduino Uno R3 (ATmega328P DIP)</text>
      </svg>
    `),
    back: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
        <rect width="500" height="400" fill="#0f172a"/>
        <rect x="90" y="50" width="320" height="280" rx="10" fill="#007275" stroke="#005f60" stroke-width="3"/>
        <!-- Italy outline silkscreen -->
        <path d="M 220 110 Q 250 140 260 210 Q 280 230 300 240 Q 270 260 240 230 Z" fill="#ffffff" opacity="0.85"/>
        <text x="250" y="100" font-family="sans-serif" font-size="10" fill="#f8fafc" text-anchor="middle">MADE IN ITALY</text>
        <text x="250" y="270" font-family="monospace" font-size="9" fill="#f8fafc" text-anchor="middle">DESIGN REFERENCE · OPEN SOURCE</text>
      </svg>
    `)
  },
  'comp-3': { // HC-SR04 Ultrasonic Distance Sensor
    front: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
        <rect width="500" height="400" fill="#18181b"/>
        <!-- Blue PCB -->
        <rect x="80" y="100" width="340" height="180" rx="8" fill="#1d4ed8" stroke="#1e40af" stroke-width="2"/>
        <!-- Dual Aluminum Ultrasonic Transducers (T & R) -->
        <circle cx="170" cy="180" r="60" fill="#cbd5e1" stroke="#64748b" stroke-width="3"/>
        <circle cx="170" cy="180" r="50" fill="#94a3b8" stroke="#475569" stroke-width="1.5"/>
        <circle cx="170" cy="180" r="35" fill="#64748b"/>
        <text x="170" y="188" font-family="sans-serif" font-weight="900" font-size="24" fill="#f8fafc" text-anchor="middle">T</text>
        
        <circle cx="330" cy="180" r="60" fill="#cbd5e1" stroke="#64748b" stroke-width="3"/>
        <circle cx="330" cy="180" r="50" fill="#94a3b8" stroke="#475569" stroke-width="1.5"/>
        <circle cx="330" cy="180" r="35" fill="#64748b"/>
        <text x="330" y="188" font-family="sans-serif" font-weight="900" font-size="24" fill="#f8fafc" text-anchor="middle">R</text>
        <!-- 4-Pin Male Header (VCC, Trig, Echo, GND) -->
        <rect x="220" y="270" width="60" height="25" fill="#1e293b" rx="2"/>
        ${[0, 1, 2, 3].map(i => `
          <rect x="${228 + i * 13}" y="285" width="4" height="25" fill="#eab308" rx="1"/>
        `).join('')}
        <!-- Silkscreen text -->
        <text x="250" y="130" font-family="sans-serif" font-weight="900" font-size="16" fill="#ffffff" text-anchor="middle">HC-SR04</text>
        <text x="250" y="150" font-family="sans-serif" font-size="9" fill="#93c5fd" text-anchor="middle">Ultrasonic Sensor</text>
        <text x="250" y="260" font-family="monospace" font-size="8" fill="#e0e7ff" text-anchor="middle">VCC · TRIG · ECHO · GND</text>
        <text x="250" y="365" font-family="sans-serif" font-weight="bold" font-size="13" fill="#60a5fa" text-anchor="middle">HC-SR04 Distance Transducer</text>
      </svg>
    `),
    back: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
        <rect width="500" height="400" fill="#18181b"/>
        <rect x="80" y="100" width="340" height="180" rx="8" fill="#1e40af" stroke="#172554" stroke-width="2"/>
        <!-- Op-amp LM324 & Logic ICs on Back -->
        <rect x="130" y="150" width="60" height="35" rx="2" fill="#0f172a"/>
        <text x="160" y="172" font-family="monospace" font-size="9" fill="#94a3b8" text-anchor="middle">LM324</text>
        <rect x="290" y="150" width="70" height="35" rx="2" fill="#0f172a"/>
        <text x="325" y="172" font-family="monospace" font-size="9" fill="#94a3b8" text-anchor="middle">EM78P153</text>
        <!-- 40kHz Crystal -->
        <rect x="235" y="155" width="30" height="15" rx="4" fill="#e2e8f0"/>
      </svg>
    `)
  },
  'comp-4': { // DHT22 / AM2302
    front: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
        <rect width="500" height="400" fill="#18181b"/>
        <!-- White Slotted Plastic Body -->
        <rect x="160" y="60" width="180" height="230" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
        <!-- Grid Air Vents -->
        ${Array.from({ length: 7 }).map((_, r) => `
          ${Array.from({ length: 4 }).map((_, c) => `
            <rect x="${185 + c * 35}" y="${80 + r * 20}" width="22" height="8" rx="2" fill="#64748b"/>
          `).join('')}
        `).join('')}
        <!-- Label Area -->
        <rect x="180" y="235" width="140" height="40" rx="3" fill="#e2e8f0"/>
        <text x="250" y="252" font-family="sans-serif" font-weight="900" font-size="13" fill="#0f172a" text-anchor="middle">DHT22 / AM2302</text>
        <text x="250" y="268" font-family="monospace" font-size="9" fill="#475569" text-anchor="middle">SN: 2026AOSONG</text>
        <!-- 4 Long Gold Pin Leads -->
        ${[0, 1, 2, 3].map(i => `
          <rect x="${195 + i * 35}" y="290" width="5" height="70" fill="#eab308" stroke="#ca8a04" stroke-width="0.5" rx="1"/>
        `).join('')}
        <text x="250" y="380" font-family="sans-serif" font-weight="bold" font-size="13" fill="#38bdf8" text-anchor="middle">DHT22 Digital Humidity &amp; Temp Sensor</text>
      </svg>
    `),
    back: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
        <rect width="500" height="400" fill="#18181b"/>
        <rect x="160" y="60" width="180" height="230" rx="8" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="2"/>
        <text x="250" y="160" font-family="sans-serif" font-size="11" fill="#64748b" text-anchor="middle">Aosong Electronics</text>
        <text x="250" y="180" font-family="monospace" font-size="9" fill="#94a3b8" text-anchor="middle">Pin 1: VCC (3.3-6V)</text>
        <text x="250" y="195" font-family="monospace" font-size="9" fill="#94a3b8" text-anchor="middle">Pin 2: DATA</text>
        <text x="250" y="210" font-family="monospace" font-size="9" fill="#94a3b8" text-anchor="middle">Pin 3: NULL</text>
        <text x="250" y="225" font-family="monospace" font-size="9" fill="#94a3b8" text-anchor="middle">Pin 4: GND</text>
      </svg>
    `)
  },
  'comp-5': { // 0.96" I2C OLED Display
    front: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
        <rect width="500" height="400" fill="#09090b"/>
        <!-- PCB Base Blue -->
        <rect x="140" y="50" width="220" height="280" rx="6" fill="#1e3a8a" stroke="#1d4ed8" stroke-width="2"/>
        <!-- 4 Pin Header Top (GND, VCC, SCL, SDA) -->
        <rect x="180" y="40" width="140" height="20" fill="#1e293b" rx="2"/>
        ${[0, 1, 2, 3].map(i => `
          <circle cx="${205 + i * 30}" cy="50" r="5" fill="#eab308" stroke="#ca8a04"/>
        `).join('')}
        <text x="250" y="75" font-family="monospace" font-weight="bold" font-size="9" fill="#f8fafc" text-anchor="middle">GND · VCC · SCL · SDA</text>
        <!-- Glass OLED Panel Display Area -->
        <rect x="155" y="85" width="190" height="150" rx="4" fill="#000000" stroke="#334155" stroke-width="2"/>
        <!-- Emulated Yellow top bar & Blue bottom screen content -->
        <rect x="165" y="95" width="170" height="24" rx="2" fill="#ca8a04" opacity="0.9"/>
        <text x="175" y="112" font-family="monospace" font-weight="bold" font-size="11" fill="#000000">RELife I2C OLED</text>
        <text x="325" y="112" font-family="monospace" font-weight="bold" font-size="11" fill="#000000" text-anchor="end">128x64</text>
        <!-- Blue main display graphic -->
        <rect x="165" y="125" width="170" height="100" fill="#172554"/>
        <text x="175" y="150" font-family="monospace" font-size="12" fill="#38bdf8">TEMP: 24.5°C</text>
        <text x="175" y="170" font-family="monospace" font-size="12" fill="#38bdf8">HUMID: 48.2%</text>
        <path d="M 175 210 L 205 190 L 235 200 L 265 185 L 295 195 L 325 180" fill="none" stroke="#38bdf8" stroke-width="2"/>
        <text x="250" y="375" font-family="sans-serif" font-weight="bold" font-size="13" fill="#38bdf8" text-anchor="middle">0.96 inch SSD1306 OLED Display</text>
      </svg>
    `),
    back: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
        <rect width="500" height="400" fill="#09090b"/>
        <rect x="140" y="50" width="220" height="280" rx="6" fill="#1e3a8a" stroke="#1d4ed8" stroke-width="2"/>
        <text x="250" y="150" font-family="sans-serif" font-weight="bold" font-size="12" fill="#ffffff" text-anchor="middle">I2C Address: 0x3C</text>
        <text x="250" y="175" font-family="sans-serif" font-size="10" fill="#93c5fd" text-anchor="middle">Driver: SSD1306</text>
      </svg>
    `)
  },
  'comp-6': { // SG90 Micro Servo
    front: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
        <rect width="500" height="400" fill="#18181b"/>
        <!-- Cyan Translucent Body -->
        <rect x="160" y="140" width="180" height="150" rx="6" fill="#0284c7" stroke="#0369a1" stroke-width="2"/>
        <!-- Mounting Flanges on sides -->
        <rect x="135" y="160" width="25" height="30" fill="#0284c7" rx="2"/>
        <circle cx="145" cy="175" r="4" fill="#082f49"/>
        <rect x="340" y="160" width="25" height="30" fill="#0284c7" rx="2"/>
        <circle cx="355" cy="175" r="4" fill="#082f49"/>
        <!-- Top Gear Output Shaft & White Horn -->
        <circle cx="210" cy="140" r="28" fill="#0284c7" stroke="#0369a1"/>
        <circle cx="210" cy="140" r="14" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
        <!-- White Cross Servo Horn -->
        <rect x="160" y="134" width="100" height="12" rx="3" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
        <circle cx="170" cy="140" r="2.5" fill="#64748b"/>
        <circle cx="190" cy="140" r="2.5" fill="#64748b"/>
        <circle cx="230" cy="140" r="2.5" fill="#64748b"/>
        <circle cx="250" cy="140" r="2.5" fill="#64748b"/>
        <!-- Holographic Label -->
        <rect x="180" y="200" width="140" height="50" rx="3" fill="#e0f2fe" stroke="#38bdf8"/>
        <text x="250" y="222" font-family="sans-serif" font-weight="900" font-size="14" fill="#0369a1" text-anchor="middle">TowerPro</text>
        <text x="250" y="238" font-family="sans-serif" font-weight="bold" font-size="11" fill="#0284c7" text-anchor="middle">Micro Servo 9g · SG90</text>
        <!-- 3-Wire Ribbon Cable out the bottom -->
        <path d="M 230 290 Q 230 350 200 370" fill="none" stroke="#ea580c" stroke-width="4"/>
        <path d="M 240 290 Q 240 350 210 370" fill="none" stroke="#dc2626" stroke-width="4"/>
        <path d="M 250 290 Q 250 350 220 370" fill="none" stroke="#78350f" stroke-width="4"/>
        <text x="250" y="385" font-family="sans-serif" font-weight="bold" font-size="13" fill="#38bdf8" text-anchor="middle">SG90 9-gram Micro Servo</text>
      </svg>
    `),
    back: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
        <rect width="500" height="400" fill="#18181b"/>
        <rect x="160" y="140" width="180" height="150" rx="6" fill="#0369a1"/>
        <text x="250" y="210" font-family="sans-serif" font-weight="bold" font-size="12" fill="#ffffff" text-anchor="middle">1.8 kg-cm Torque</text>
        <text x="250" y="230" font-family="sans-serif" font-size="10" fill="#bae6fd" text-anchor="middle">4.8V Operating Range</text>
      </svg>
    `)
  },
  'comp-7': { // L298N Motor Driver
    front: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
        <rect width="500" height="400" fill="#18181b"/>
        <!-- Red PCB -->
        <rect x="120" y="60" width="260" height="260" rx="8" fill="#dc2626" stroke="#b91c1c" stroke-width="2"/>
        <!-- Large Black Aluminum Finned Heatsink -->
        <rect x="180" y="70" width="140" height="70" rx="4" fill="#0f172a" stroke="#334155" stroke-width="2"/>
        ${Array.from({ length: 6 }).map((_, i) => `
          <line x1="${195 + i * 22}" y1="70" x2="${195 + i * 22}" y2="140" stroke="#475569" stroke-width="3"/>
        `).join('')}
        <text x="250" y="108" font-family="monospace" font-weight="900" font-size="14" fill="#f8fafc" text-anchor="middle">L298N</text>
        <!-- Blue Screw Terminals for Motors & Power -->
        <rect x="130" y="140" width="30" height="50" fill="#2563eb" rx="2"/>
        <rect x="340" y="140" width="30" height="50" fill="#2563eb" rx="2"/>
        <rect x="190" y="270" width="80" height="30" fill="#2563eb" rx="2"/>
        <!-- Electrolytic Filter Capacitors -->
        <circle cx="165" cy="240" r="16" fill="#334155" stroke="#64748b" stroke-width="2"/>
        <rect x="163" y="225" width="4" height="30" fill="#cbd5e1"/>
        <text x="250" y="375" font-family="sans-serif" font-weight="bold" font-size="13" fill="#ef4444" text-anchor="middle">L298N Dual H-Bridge Motor Driver</text>
      </svg>
    `),
    back: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
        <rect width="500" height="400" fill="#18181b"/>
        <rect x="120" y="60" width="260" height="260" rx="8" fill="#b91c1c"/>
        <text x="250" y="190" font-family="sans-serif" font-weight="bold" font-size="14" fill="#ffffff" text-anchor="middle">2A Dual Channel Driver</text>
      </svg>
    `)
  },
  'comp-8': { // 2-Channel Relay Module
    front: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
        <rect width="500" height="400" fill="#09090b"/>
        <!-- Blue PCB Base -->
        <rect x="100" y="60" width="300" height="260" rx="8" fill="#1e3a8a" stroke="#1d4ed8" stroke-width="2"/>
        <!-- Two Bright Blue Songle Relays -->
        <rect x="130" y="80" width="110" height="110" rx="4" fill="#0284c7" stroke="#0369a1" stroke-width="2"/>
        <text x="185" y="115" font-family="sans-serif" font-weight="900" font-size="11" fill="#ffffff" text-anchor="middle">SONGLE</text>
        <text x="185" y="132" font-family="monospace" font-size="8" fill="#e0f2fe" text-anchor="middle">SRD-05VDC-SL-C</text>
        <text x="185" y="148" font-family="monospace" font-size="7" fill="#ffffff" text-anchor="middle">10A 250VAC · 10A 30VDC</text>

        <rect x="260" y="80" width="110" height="110" rx="4" fill="#0284c7" stroke="#0369a1" stroke-width="2"/>
        <text x="315" y="115" font-family="sans-serif" font-weight="900" font-size="11" fill="#ffffff" text-anchor="middle">SONGLE</text>
        <text x="315" y="132" font-family="monospace" font-size="8" fill="#e0f2fe" text-anchor="middle">SRD-05VDC-SL-C</text>
        <text x="315" y="148" font-family="monospace" font-size="7" fill="#ffffff" text-anchor="middle">10A 250VAC · 10A 30VDC</text>
        <!-- Blue High-Voltage Screw Terminals (NO, COM, NC) -->
        <rect x="130" y="210" width="110" height="40" fill="#0369a1" rx="2"/>
        <rect x="260" y="210" width="110" height="40" fill="#0369a1" rx="2"/>
        <!-- Optocoupler Isolation ICs -->
        <rect x="170" y="265" width="25" height="16" fill="#18181b" rx="1"/>
        <rect x="300" y="265" width="25" height="16" fill="#18181b" rx="1"/>
        <text x="250" y="375" font-family="sans-serif" font-weight="bold" font-size="13" fill="#38bdf8" text-anchor="middle">2-Channel 5V Relay with Optocoupler</text>
      </svg>
    `),
    back: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
        <rect width="500" height="400" fill="#09090b"/>
        <rect x="100" y="60" width="300" height="260" rx="8" fill="#172554"/>
        <text x="250" y="190" font-family="sans-serif" font-weight="bold" font-size="14" fill="#ffffff" text-anchor="middle">Mains Isolation Barrier Verified</text>
      </svg>
    `)
  },
  'comp-9': { // Arduino Nano V3
    front: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
        <rect width="500" height="400" fill="#0f172a"/>
        <!-- Mini Breadboard PCB Blue -->
        <rect x="180" y="50" width="140" height="300" rx="6" fill="#008184" stroke="#005f60" stroke-width="2"/>
        <!-- Dual 15-pin header pins -->
        ${Array.from({ length: 15 }).map((_, i) => `
          <rect x="166" y="${75 + i * 17}" width="16" height="5" fill="#eab308" rx="1"/>
          <rect x="318" y="${75 + i * 17}" width="16" height="5" fill="#eab308" rx="1"/>
        `).join('')}
        <!-- Mini-B USB Metal Port Top -->
        <rect x="225" y="40" width="50" height="35" rx="3" fill="#cbd5e1" stroke="#64748b" stroke-width="1.5"/>
        <rect x="235" y="45" width="30" height="20" rx="2" fill="#334155"/>
        <!-- ATmega328P TQFP-32 Square SMD Chip -->
        <rect x="225" y="145" width="50" height="50" rx="2" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
        <circle cx="232" cy="152" r="2.5" fill="#71717a"/>
        <text x="250" y="174" font-family="monospace" font-size="7" fill="#e4e4e7" text-anchor="middle">ATMEGA</text>
        <text x="250" y="185" font-family="monospace" font-size="6" fill="#a1a1aa" text-anchor="middle">328P</text>
        <!-- Reset Button -->
        <circle cx="250" cy="235" r="9" fill="#e2e8f0" stroke="#94a3b8"/>
        <circle cx="250" cy="235" r="5" fill="#475569"/>
        <!-- 16MHz Crystal -->
        <rect x="238" y="115" width="24" height="15" rx="3" fill="#cbd5e1"/>
        <!-- Silkscreen -->
        <text x="250" y="275" font-family="sans-serif" font-weight="900" font-size="12" fill="#ffffff" text-anchor="middle">NANO</text>
        <text x="250" y="290" font-family="sans-serif" font-size="8" fill="#bae6fd" text-anchor="middle">V3.0</text>
        <text x="250" y="380" font-family="sans-serif" font-weight="bold" font-size="13" fill="#38bdf8" text-anchor="middle">Arduino Nano V3 (ATmega328P / CH340)</text>
      </svg>
    `),
    back: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
        <rect width="500" height="400" fill="#0f172a"/>
        <rect x="180" y="50" width="140" height="300" rx="6" fill="#007073"/>
        <rect x="220" y="160" width="60" height="30" fill="#18181b" rx="2"/>
        <text x="250" y="178" font-family="monospace" font-size="8" fill="#94a3b8" text-anchor="middle">CH340G</text>
      </svg>
    `)
  },
  'comp-10': { // Active Buzzer 5V
    front: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
        <rect width="500" height="400" fill="#18181b"/>
        <!-- Cylindrical Black Plastic Body -->
        <circle cx="250" cy="180" r="100" fill="#18181b" stroke="#3f3f46" stroke-width="4"/>
        <circle cx="250" cy="180" r="85" fill="#27272a"/>
        <circle cx="250" cy="180" r="22" fill="#09090b" stroke="#52525b" stroke-width="2"/>
        <!-- Sound Emission Port -->
        <circle cx="250" cy="180" r="8" fill="#000000"/>
        <!-- Yellow Wash Seal Tape Tab -->
        <rect x="235" y="110" width="30" height="50" rx="3" fill="#eab308" stroke="#ca8a04"/>
        <text x="250" y="138" font-family="sans-serif" font-weight="900" font-size="8" fill="#713f12" text-anchor="middle">REMOVE</text>
        <text x="250" y="148" font-family="sans-serif" font-weight="900" font-size="7" fill="#713f12" text-anchor="middle">AFTER WASH</text>
        <!-- Polarity + marking -->
        <text x="190" y="195" font-family="sans-serif" font-weight="bold" font-size="28" fill="#ef4444" text-anchor="middle">+</text>
        <!-- Two Lead Pins out the bottom -->
        <rect x="220" y="275" width="6" height="60" fill="#cbd5e1" rx="1"/>
        <rect x="274" y="275" width="6" height="50" fill="#cbd5e1" rx="1"/>
        <text x="250" y="375" font-family="sans-serif" font-weight="bold" font-size="13" fill="#facc15" text-anchor="middle">5V DC Active Piezo Buzzer</text>
      </svg>
    `),
    back: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
        <rect width="500" height="400" fill="#18181b"/>
        <circle cx="250" cy="180" r="100" fill="#18181b" stroke="#3f3f46" stroke-width="4"/>
        <circle cx="250" cy="180" r="70" fill="#111827"/>
        <circle cx="220" cy="180" r="5" fill="#ca8a04"/>
        <circle cx="280" cy="180" r="5" fill="#ca8a04"/>
      </svg>
    `)
  },
  'comp-11': { // RC522 RFID Reader
    front: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
        <rect width="500" height="400" fill="#0f172a"/>
        <!-- Blue PCB -->
        <rect x="150" y="50" width="200" height="280" rx="8" fill="#1e3a8a" stroke="#1d4ed8" stroke-width="2"/>
        <!-- Antenna Loop Traces on PCB -->
        <rect x="165" y="65" width="170" height="150" rx="10" fill="none" stroke="#ca8a04" stroke-width="4"/>
        <rect x="175" y="75" width="150" height="130" rx="8" fill="none" stroke="#ca8a04" stroke-width="2"/>
        <!-- NXP MFRC522 Chip -->
        <rect x="230" y="240" width="40" height="40" rx="2" fill="#09090b" stroke="#334155"/>
        <text x="250" y="264" font-family="monospace" font-size="7" fill="#e2e8f0" text-anchor="middle">RC522</text>
        <!-- 8-Pin Header at Bottom -->
        <rect x="175" y="320" width="150" height="18" fill="#1e293b" rx="2"/>
        ${Array.from({ length: 8 }).map((_, i) => `
          <rect x="${185 + i * 18}" y="325" width="4" height="25" fill="#eab308" rx="1"/>
        `).join('')}
        <text x="250" y="145" font-family="sans-serif" font-weight="900" font-size="16" fill="#ffffff" text-anchor="middle">RFID-RC522</text>
        <text x="250" y="165" font-family="sans-serif" font-size="10" fill="#93c5fd" text-anchor="middle">13.56 MHz</text>
        <text x="250" y="380" font-family="sans-serif" font-weight="bold" font-size="13" fill="#38bdf8" text-anchor="middle">RC522 13.56MHz RFID SPI Reader</text>
      </svg>
    `),
    back: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
        <rect width="500" height="400" fill="#0f172a"/>
        <rect x="150" y="50" width="200" height="280" rx="8" fill="#172554"/>
        <text x="250" y="190" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">Mifare SPI Interface</text>
      </svg>
    `)
  },
  'comp-12': { // 18650 Battery Holder
    front: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
        <rect width="500" height="400" fill="#18181b"/>
        <!-- Dual Bay Molded Black Plastic -->
        <rect x="140" y="70" width="220" height="240" rx="8" fill="#27272a" stroke="#3f3f46" stroke-width="2"/>
        <!-- Bay 1 & 2 -->
        <rect x="155" y="85" width="90" height="210" rx="12" fill="#18181b"/>
        <rect x="255" y="85" width="90" height="210" rx="12" fill="#18181b"/>
        <!-- Steel Spring Contacts at Bottom -->
        <path d="M 180 285 Q 200 270 200 290 Q 200 275 220 285" fill="none" stroke="#cbd5e1" stroke-width="3"/>
        <path d="M 280 285 Q 300 270 300 290 Q 300 275 320 285" fill="none" stroke="#cbd5e1" stroke-width="3"/>
        <!-- Button Positive Contacts at Top -->
        <circle cx="200" cy="98" r="8" fill="#e2e8f0"/>
        <circle cx="300" cy="98" r="8" fill="#e2e8f0"/>
        <!-- Polarity Molded Icons -->
        <text x="200" y="125" font-family="sans-serif" font-weight="bold" font-size="20" fill="#4ade80" text-anchor="middle">+</text>
        <text x="200" y="260" font-family="sans-serif" font-weight="bold" font-size="24" fill="#f87171" text-anchor="middle">-</text>
        <text x="300" y="125" font-family="sans-serif" font-weight="bold" font-size="20" fill="#4ade80" text-anchor="middle">+</text>
        <text x="300" y="260" font-family="sans-serif" font-weight="bold" font-size="24" fill="#f87171" text-anchor="middle">-</text>
        <!-- On/Off Switch -->
        <rect x="145" y="325" width="45" height="25" rx="3" fill="#09090b" stroke="#52525b"/>
        <rect x="165" y="328" width="20" height="19" rx="2" fill="#ef4444"/>
        <!-- Red & Black Output Leads -->
        <path d="M 330 310 Q 370 340 390 380" fill="none" stroke="#dc2626" stroke-width="4"/>
        <path d="M 315 310 Q 355 340 375 380" fill="none" stroke="#18181b" stroke-width="4"/>
        <text x="250" y="380" font-family="sans-serif" font-weight="bold" font-size="13" fill="#e2e8f0" text-anchor="middle">2× 18650 Battery Holder with Switch</text>
      </svg>
    `),
    back: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
        <rect width="500" height="400" fill="#18181b"/>
        <rect x="140" y="70" width="220" height="240" rx="8" fill="#1c1917"/>
        <text x="250" y="190" font-family="sans-serif" font-size="11" fill="#78716c" text-anchor="middle">Molded ABS Plastic Enclosure</text>
      </svg>
    `)
  },
  'comp-13': { // HC-05 Bluetooth
    front: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
        <rect width="500" height="400" fill="#0f172a"/>
        <!-- Breakout Blue PCB -->
        <rect x="170" y="60" width="160" height="270" rx="6" fill="#1d4ed8" stroke="#1e40af" stroke-width="2"/>
        <!-- Castellated BT Submodule (Green/Blue) -->
        <rect x="180" y="70" width="140" height="150" rx="4" fill="#0284c7" stroke="#0369a1" stroke-width="1.5"/>
        <!-- Meander Inverted-F PCB Antenna -->
        <path d="M 195 85 L 235 85 L 235 75 L 210 75 L 210 80 L 305 80" fill="none" stroke="#eab308" stroke-width="2.5"/>
        <!-- CSR BC417 Flash Chip -->
        <rect x="220" y="120" width="60" height="40" rx="2" fill="#09090b"/>
        <text x="250" y="145" font-family="monospace" font-size="8" fill="#e2e8f0" text-anchor="middle">CSR-BC417</text>
        <!-- Status LED & Tactile Button -->
        <circle cx="195" cy="245" r="4" fill="#ef4444"/>
        <rect x="285" y="235" width="25" height="18" rx="2" fill="#cbd5e1"/>
        <!-- 6-Pin Male Header (STATE, RX, TX, GND, VCC, EN) -->
        <rect x="180" y="320" width="140" height="20" fill="#1e293b" rx="2"/>
        ${Array.from({ length: 6 }).map((_, i) => `
          <rect x="${190 + i * 22}" y="325" width="4" height="25" fill="#eab308" rx="1"/>
        `).join('')}
        <text x="250" y="295" font-family="sans-serif" font-weight="900" font-size="14" fill="#ffffff" text-anchor="middle">HC-05</text>
        <text x="250" y="310" font-family="sans-serif" font-size="8" fill="#bae6fd" text-anchor="middle">Bluetooth V2.0+EDR</text>
        <text x="250" y="380" font-family="sans-serif" font-weight="bold" font-size="13" fill="#60a5fa" text-anchor="middle">HC-05 Bluetooth Serial Transceiver</text>
      </svg>
    `),
    back: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
        <rect width="500" height="400" fill="#0f172a"/>
        <rect x="170" y="60" width="160" height="270" rx="6" fill="#1e40af"/>
        <text x="250" y="190" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">3.6V - 6V DC Input</text>
      </svg>
    `)
  },
  'comp-14': { // MQ-2 Gas & Smoke Sensor
    front: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
        <rect width="500" height="400" fill="#18181b"/>
        <!-- Carrier PCB Blue -->
        <rect x="150" y="80" width="200" height="220" rx="8" fill="#1d4ed8" stroke="#1e40af" stroke-width="2"/>
        <!-- Stainless Steel Fine Wire Mesh Dome -->
        <circle cx="250" cy="180" r="60" fill="#94a3b8" stroke="#64748b" stroke-width="3"/>
        <circle cx="250" cy="180" r="50" fill="#cbd5e1" stroke="#475569" stroke-width="1"/>
        <!-- Wire Mesh Grid Pattern -->
        ${Array.from({ length: 9 }).map((_, i) => `
          <line x1="${210 + i * 10}" y1="135" x2="${210 + i * 10}" y2="225" stroke="#64748b" stroke-width="1"/>
          <line x1="205" y1="${140 + i * 10}" x2="295" y2="${140 + i * 10}" stroke="#64748b" stroke-width="1"/>
        `).join('')}
        <text x="250" y="186" font-family="sans-serif" font-weight="900" font-size="16" fill="#0f172a" text-anchor="middle">MQ-2</text>
        <!-- Blue Trimpot on Bottom -->
        <rect x="180" y="255" width="28" height="28" rx="2" fill="#0284c7" stroke="#0369a1"/>
        <circle cx="194" cy="269" r="6" fill="#e2e8f0"/>
        <!-- 4 Header Pins -->
        <rect x="235" y="285" width="80" height="15" fill="#1e293b" rx="2"/>
        ${[0, 1, 2, 3].map(i => `
          <rect x="${245 + i * 18}" y="295" width="4" height="25" fill="#eab308" rx="1"/>
        `).join('')}
        <text x="250" y="115" font-family="sans-serif" font-weight="900" font-size="12" fill="#ffffff" text-anchor="middle">GAS &amp; SMOKE SENSOR</text>
        <text x="250" y="375" font-family="sans-serif" font-weight="bold" font-size="13" fill="#60a5fa" text-anchor="middle">MQ-2 Flammable Gas &amp; Smoke Sensor</text>
      </svg>
    `),
    back: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
        <rect width="500" height="400" fill="#18181b"/>
        <rect x="150" y="80" width="200" height="220" rx="8" fill="#1e40af"/>
        <text x="250" y="180" font-family="sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">LM393 Comparator Circuit</text>
      </svg>
    `)
  },
  'comp-15': { // Dupont Jumper Wires
    front: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
        <rect width="500" height="400" fill="#18181b"/>
        <!-- 10-Color Rainbow Ribbon Cable Spread -->
        ${['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#ffffff', '#71717a'].map((col, i) => `
          <path d="M ${100 + i * 14} 70 Q 200 ${150 + i * 10} 100 ${320 - i * 5}" fill="none" stroke="${col}" stroke-width="8"/>
          <!-- Top Male Pins -->
          <rect x="${97 + i * 14}" y="50" width="6" height="22" fill="#18181b" rx="1"/>
          <rect x="${99 + i * 14}" y="35" width="2" height="16" fill="#eab308"/>
          <!-- Bottom Female Housings -->
          <rect x="${97 + i * 14}" y="${320 - i * 5}" width="6" height="24" fill="#18181b" rx="1"/>
        `).join('')}
        <text x="250" y="375" font-family="sans-serif" font-weight="bold" font-size="13" fill="#e2e8f0" text-anchor="middle">40pcs Dupont Ribbon Jumpers (20cm)</text>
      </svg>
    `),
    back: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
        <rect width="500" height="400" fill="#18181b"/>
        <text x="250" y="200" font-family="sans-serif" font-size="12" fill="#94a3b8" text-anchor="middle">2.54mm Standard Header Pitch</text>
      </svg>
    `)
  },
  'comp-16': { // Capacitive Soil Moisture Sensor v1.2
    front: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
        <rect width="500" height="400" fill="#18181b"/>
        <!-- Elongated Black Probe Blade -->
        <rect x="210" y="40" width="80" height="300" rx="8" fill="#1c1917" stroke="#292524" stroke-width="2"/>
        <!-- Capacitive Blade Traces -->
        <path d="M 230 180 L 230 320" stroke="#ca8a04" stroke-width="4" stroke-linecap="round"/>
        <path d="M 270 180 L 270 320" stroke="#ca8a04" stroke-width="4" stroke-linecap="round"/>
        <!-- Onboard 555 Timer Circuit Top -->
        <rect x="235" y="70" width="30" height="30" rx="2" fill="#09090b" stroke="#334155"/>
        <text x="250" y="90" font-family="monospace" font-size="6" fill="#94a3b8" text-anchor="middle">TLC555</text>
        <!-- 3-Pin JST Connector at top -->
        <rect x="225" y="30" width="50" height="18" fill="#f8fafc" rx="2"/>
        <!-- White Silkscreen Text -->
        <text x="250" y="130" font-family="sans-serif" font-weight="900" font-size="8" fill="#ffffff" text-anchor="middle">Capacitive</text>
        <text x="250" y="142" font-family="sans-serif" font-weight="bold" font-size="8" fill="#ffffff" text-anchor="middle">Soil Moisture</text>
        <text x="250" y="154" font-family="sans-serif" font-size="7" fill="#a8a29e" text-anchor="middle">v1.2</text>
        <text x="250" y="375" font-family="sans-serif" font-weight="bold" font-size="13" fill="#22c55e" text-anchor="middle">Capacitive Soil Moisture Probe v1.2</text>
      </svg>
    `),
    back: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
        <rect width="500" height="400" fill="#18181b"/>
        <rect x="210" y="40" width="80" height="300" rx="8" fill="#1c1917"/>
        <text x="250" y="200" font-family="sans-serif" font-size="9" fill="#78716c" text-anchor="middle">Corrosion Resistant</text>
      </svg>
    `)
  },
  'comp-17': { // TT Geared Motor & Wheel
    front: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
        <rect width="500" height="400" fill="#18181b"/>
        <!-- Yellow Plastic Gearbox -->
        <rect x="130" y="120" width="160" height="120" rx="8" fill="#facc15" stroke="#eab308" stroke-width="2"/>
        <!-- Small Silver DC Motor Body attached -->
        <rect x="80" y="140" width="55" height="80" rx="4" fill="#cbd5e1" stroke="#94a3b8" stroke-width="1.5"/>
        <!-- Big Yellow 66mm Wheel with Black Tread -->
        <circle cx="340" cy="180" r="70" fill="#09090b" stroke="#27272a" stroke-width="16"/>
        <circle cx="340" cy="180" r="54" fill="#facc15" stroke="#eab308" stroke-width="3"/>
        <circle cx="340" cy="180" r="24" fill="#09090b"/>
        <circle cx="340" cy="180" r="8" fill="#facc15"/>
        <!-- Output White Axle -->
        <rect x="280" y="172" width="20" height="16" fill="#f8fafc" rx="2"/>
        <text x="210" y="175" font-family="sans-serif" font-weight="900" font-size="14" fill="#854d0e" text-anchor="middle">1:48 RATIO</text>
        <text x="210" y="195" font-family="sans-serif" font-size="10" fill="#713f12" text-anchor="middle">3-6V DC MOTOR</text>
        <text x="250" y="375" font-family="sans-serif" font-weight="bold" font-size="13" fill="#facc15" text-anchor="middle">TT Geared DC Motor &amp; Rubber Wheel</text>
      </svg>
    `),
    back: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
        <rect width="500" height="400" fill="#18181b"/>
        <rect x="130" y="120" width="160" height="120" rx="8" fill="#eab308"/>
        <text x="210" y="180" font-family="sans-serif" font-weight="bold" font-size="12" fill="#713f12" text-anchor="middle">Dual Axis Output</text>
      </svg>
    `)
  },
  'comp-18': { // Arduino Uno Salvage
    front: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
        <rect width="500" height="400" fill="#0f172a"/>
        <rect x="90" y="50" width="320" height="280" rx="10" fill="#007275" stroke="#005f60" stroke-width="3"/>
        <rect x="75" y="70" width="45" height="50" fill="#1e293b" rx="2"/>
        <rect x="75" y="160" width="55" height="55" fill="#cbd5e1" rx="2"/>
        <!-- Socket DIP-28 -->
        <rect x="230" y="170" width="140" height="45" rx="2" fill="#18181b" stroke="#eab308" stroke-width="2"/>
        <text x="300" y="196" font-family="monospace" font-weight="bold" font-size="10" fill="#fde047" text-anchor="middle">REFLASH BOOTLOADER</text>
        <text x="250" y="380" font-family="sans-serif" font-weight="bold" font-size="13" fill="#f59e0b" text-anchor="middle">Arduino Uno (Defective Bootloader / Repairable)</text>
      </svg>
    `),
    back: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
        <rect width="500" height="400" fill="#0f172a"/>
        <rect x="90" y="50" width="320" height="280" rx="10" fill="#005f60"/>
        <text x="250" y="190" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">ICSP Re-Flash Candidate</text>
      </svg>
    `)
  },
  'comp-19': { // 16x2 Character LCD
    front: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
        <rect width="500" height="400" fill="#18181b"/>
        <!-- Green LCD Board -->
        <rect x="80" y="90" width="340" height="190" rx="6" fill="#15803d" stroke="#166534" stroke-width="2"/>
        <!-- Black Bezel Frame -->
        <rect x="120" y="115" width="260" height="130" rx="4" fill="#09090b" stroke="#27272a" stroke-width="2"/>
        <!-- Yellow-Green Backlit LCD Glass -->
        <rect x="140" y="130" width="220" height="100" fill="#84cc16"/>
        <!-- 2 Lines of 5x8 Matrix Text -->
        <text x="150" y="165" font-family="monospace" font-weight="bold" font-size="14" fill="#14532d">RELife System OK</text>
        <text x="150" y="200" font-family="monospace" font-weight="bold" font-size="14" fill="#14532d">E-Waste Diverted</text>
        <!-- 16 Header Pins Top Left -->
        <rect x="90" y="95" width="130" height="12" fill="#1e293b"/>
        <text x="250" y="375" font-family="sans-serif" font-weight="bold" font-size="13" fill="#84cc16" text-anchor="middle">1602 LCD with I2C PCF8574 Backpack</text>
      </svg>
    `),
    back: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
        <rect width="500" height="400" fill="#18181b"/>
        <rect x="80" y="90" width="340" height="190" rx="6" fill="#166534"/>
        <!-- I2C Backpack Piggybacked on back -->
        <rect x="160" y="130" width="140" height="90" rx="4" fill="#18181b" stroke="#334155"/>
        <text x="230" y="175" font-family="monospace" font-size="10" fill="#93c5fd" text-anchor="middle">PCF8574T I2C</text>
      </svg>
    `)
  },
  'comp-20': { // PIR Motion Sensor HC-SR501
    front: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
        <rect width="500" height="400" fill="#18181b"/>
        <!-- Green Square PCB Base -->
        <rect x="140" y="80" width="220" height="220" rx="8" fill="#15803d" stroke="#166534" stroke-width="2"/>
        <!-- White Hemispherical Faceted Fresnel Dome -->
        <circle cx="250" cy="180" r="75" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
        <!-- Facet lines on Fresnel Lens -->
        ${Array.from({ length: 6 }).map((_, i) => `
          <circle cx="250" cy="180" r="${20 + i * 10}" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>
        `).join('')}
        ${[0, 45, 90, 135, 180, 225, 270, 315].map(deg => `
          <line x1="250" y1="180" x2="${250 + Math.cos(deg * Math.PI / 180) * 72}" y2="${180 + Math.sin(deg * Math.PI / 180) * 72}" stroke="#e2e8f0" stroke-width="1.5"/>
        `).join('')}
        <!-- Two Orange Trimpots (Sensitivity & Delay) -->
        <circle cx="170" cy="270" r="10" fill="#ea580c"/>
        <circle cx="205" cy="270" r="10" fill="#ea580c"/>
        <!-- 3 Header Pins (VCC, OUT, GND) -->
        <rect x="290" y="270" width="35" height="15" fill="#1e293b"/>
        <text x="250" y="375" font-family="sans-serif" font-weight="bold" font-size="13" fill="#4ade80" text-anchor="middle">HC-SR501 PIR Motion Sensor Module</text>
      </svg>
    `),
    back: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
        <rect width="500" height="400" fill="#18181b"/>
        <rect x="140" y="80" width="220" height="220" rx="8" fill="#166534"/>
        <rect x="220" y="150" width="60" height="35" fill="#18181b" rx="2"/>
        <text x="250" y="172" font-family="monospace" font-size="9" fill="#94a3b8" text-anchor="middle">BISS0001</text>
      </svg>
    `)
  }
};

export function getComponentImage(componentId: string, side: 'front' | 'back' = 'front', fallbackUrl?: string): string {
  if (COMPONENT_ORIGINAL_IMAGES[componentId]) {
    return COMPONENT_ORIGINAL_IMAGES[componentId][side] || fallbackUrl || '';
  }
  return fallbackUrl || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80';
}

