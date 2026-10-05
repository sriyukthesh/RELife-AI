import { Project } from '../types';

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'Smart Environmental & Weather Monitor',
    slug: 'smart-environmental-weather-monitor',
    description: 'An IoT station measuring ambient temperature, humidity, and atmospheric metrics with live local OLED readout and remote Wi-Fi data telemetry.',
    category: 'Environmental & CleanTech',
    difficulty: 'Beginner',
    estimatedBuildTimeHours: 2.5,
    estimatedCost: 350,
    requiredSkills: ['Basic Breadboarding', 'Arduino IDE or MicroPython', 'Wi-Fi Configuration'],
    safetyRequirements: ['Low DC voltage (3.3V-5V) safe for beginners', 'Keep sensors dry if testing outdoors'],
    expectedOutput: 'OLED updates real-time temperature, humidity, and heat index while periodically sending telemetry over MQTT/HTTP.',
    estimatedEwasteAvoidedGrams: 420,
    requiredComponents: [
      { name: 'ESP32 DevKit', category: 'Microcontrollers', quantity: 1, estimatedCost: 180, isCritical: true, compatiblePartNumbers: ['ESP32-WROOM-32', 'ESP32-NodeMCU', 'ESP-WROOM-32D'] },
      { name: 'DHT22 Temperature & Humidity Sensor', category: 'Sensors', quantity: 1, estimatedCost: 90, isCritical: true, compatiblePartNumbers: ['DHT22', 'AM2302', 'DHT11'] },
      { name: '0.96 inch I2C OLED Display', category: 'Displays', quantity: 1, estimatedCost: 110, isCritical: false, compatiblePartNumbers: ['SSD1306', 'SH1106'] },
      { name: 'Active Buzzer 5V', category: 'Actuators', quantity: 1, estimatedCost: 20, isCritical: false, compatiblePartNumbers: ['Buzzer-5V-Active'] },
      { name: 'Jumper Wires (M-M / M-F)', category: 'Cables', quantity: 10, estimatedCost: 30, isCritical: true, compatiblePartNumbers: ['Dupont-20cm'] }
    ],
    instructions: [
      { step: 1, title: 'Pin Mapping & Breadboard Layout', detail: 'Mount the ESP32 onto the breadboard. Connect 3V3 to the positive power rail and GND to the ground rail.' },
      { step: 2, title: 'I2C OLED Wiring', detail: 'Connect OLED VCC to 3V3, GND to GND, SCL to GPIO22, and SDA to GPIO21.' },
      { step: 3, title: 'DHT22 Sensor Integration', detail: 'Connect DHT22 Pin 1 (VCC) to 3V3, Pin 2 (Data) to GPIO4 with a 10k pull-up resistor, and Pin 4 to GND.' },
      { step: 4, title: 'Firmware Flash & Calibration', detail: 'Upload the ESP32 sensor firmware sketch via USB. Check Serial Monitor at 115200 baud for valid readings.' },
      { step: 5, title: 'Deployment in Recycled Enclosure', detail: 'Enclose the circuit in a repurposed plastic container with ventilation slits for ambient airflow.' }
    ],
    wiringGuide: 'ESP32 GPIO21 -> OLED SDA | GPIO22 -> OLED SCL | GPIO4 -> DHT22 Data (Pull-up 10k to 3.3V) | 3V3 & GND distributed to all modules.',
    codeSnippet: `#include <Wire.h>\n#include <Adafruit_GFX.h>\n#include <Adafruit_SSD1306.h>\n#include <DHT.h>\n\n#define DHTPIN 4\n#define DHTTYPE DHT22\nDHT dht(DHTPIN, DHTTYPE);\nAdafruit_SSD1306 display(128, 64, &Wire, -1);\n\nvoid setup() {\n  Serial.begin(115200);\n  dht.begin();\n  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);\n  display.clearDisplay();\n}\n\nvoid loop() {\n  float t = dht.readTemperature();\n  float h = dht.readHumidity();\n  display.clearDisplay();\n  display.setCursor(0,0);\n  display.printf("Temp: %.1f C\\nHumidity: %.1f%%", t, h);\n  display.display();\n  delay(2000);\n}`,
    testingChecklist: ['Verify OLED initialization splash screen', 'Blow gently on sensor to confirm humidity response', 'Check Wi-Fi packet transmission in debug log'],
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'proj-2',
    title: 'Smart Parking & Space Availability Monitor',
    slug: 'smart-parking-monitor',
    description: 'An automated ultrasonic vehicle slot occupancy detector with visual status indication (LED) and distance calculation to prevent parking congestion.',
    category: 'Automation & Smart Home',
    difficulty: 'Beginner',
    estimatedBuildTimeHours: 2.0,
    estimatedCost: 280,
    requiredSkills: ['Digital I/O', 'Distance Math', 'Basic Circuit Assembly'],
    safetyRequirements: ['Keep wiring shielded from vehicular movement', 'Ensure 5V power regulation'],
    expectedOutput: 'Detects parked vehicle within 2.5 meters, toggles status light, sounds gentle warning chime when boundary is breached.',
    estimatedEwasteAvoidedGrams: 380,
    requiredComponents: [
      { name: 'Arduino Uno R3', category: 'Microcontrollers', quantity: 1, estimatedCost: 250, isCritical: true, compatiblePartNumbers: ['Arduino Uno', 'Arduino Nano', 'Seeeduino'] },
      { name: 'HC-SR04 Ultrasonic Distance Sensor', category: 'Sensors', quantity: 1, estimatedCost: 80, isCritical: true, compatiblePartNumbers: ['HC-SR04', 'US-100'] },
      { name: 'Red & Green LED Set', category: 'Other Electronics', quantity: 2, estimatedCost: 15, isCritical: false, compatiblePartNumbers: ['5mm-LED-Red', '5mm-LED-Green'] },
      { name: '220 Ohm Resistors', category: 'Resistors', quantity: 2, estimatedCost: 5, isCritical: true, compatiblePartNumbers: ['Resistor-220R-0.25W'] },
      { name: 'Active Buzzer 5V', category: 'Actuators', quantity: 1, estimatedCost: 20, isCritical: false, compatiblePartNumbers: ['Buzzer-5V-Active'] }
    ],
    instructions: [
      { step: 1, title: 'Ultrasonic Sensor Wiring', detail: 'VCC to Arduino 5V, GND to GND, Trig to Pin 9, Echo to Pin 10.' },
      { step: 2, title: 'LED Status Indicators', detail: 'Green LED anode to Pin 7 (with 220Ω resistor). Red LED anode to Pin 8 (with 220Ω resistor).' },
      { step: 3, title: 'Trigger Logic Setup', detail: 'Send 10us high pulse on Trig pin, measure pulse width on Echo to derive centimeters.' },
      { step: 4, title: 'Threshold Testing', detail: 'Mark threshold at 30cm: Green if vacant, Red and chirp if occupied.' }
    ],
    wiringGuide: 'HC-SR04: Trig -> Pin 9, Echo -> Pin 10. Green LED -> Pin 7 (220Ω), Red LED -> Pin 8 (220Ω), Buzzer -> Pin 6.',
    codeSnippet: `const int trigPin = 9; const int echoPin = 10; const int ledGreen = 7; const int ledRed = 8;\nvoid setup() { pinMode(trigPin, OUTPUT); pinMode(echoPin, INPUT); pinMode(ledGreen, OUTPUT); pinMode(ledRed, OUTPUT); }\nvoid loop() {\n  digitalWrite(trigPin, LOW); delayMicroseconds(2);\n  digitalWrite(trigPin, HIGH); delayMicroseconds(10);\n  digitalWrite(trigPin, LOW);\n  long duration = pulseIn(echoPin, HIGH);\n  int cm = duration * 0.034 / 2;\n  if (cm < 30) { digitalWrite(ledRed, HIGH); digitalWrite(ledGreen, LOW); } else { digitalWrite(ledRed, LOW); digitalWrite(ledGreen, HIGH); }\n  delay(200);\n}`,
    testingChecklist: ['Verify distance calculation matches tape measure within 1cm', 'Confirm debounce logic prevents rapid flickering', 'Check LED current consumption under 20mA'],
    imageUrl: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'proj-3',
    title: 'Smart Plant Soil Hydration & Health Monitor',
    slug: 'smart-plant-monitor',
    description: 'Monitors soil moisture, ambient light level, and temperature to alert plant owners when hydration is needed, preventing plant loss.',
    category: 'Sensors & Monitoring',
    difficulty: 'Beginner',
    estimatedBuildTimeHours: 1.5,
    estimatedCost: 220,
    requiredSkills: ['Analog-to-Digital Conversion', 'Breadboarding'],
    safetyRequirements: ['Isolate soil probe cables from battery terminals to prevent short circuit', 'Use capacitive probes if possible to avoid corrosion'],
    expectedOutput: 'Low-power alert LED blinks when soil moisture drops below 25%, with serial logs outputting sunlight levels.',
    estimatedEwasteAvoidedGrams: 310,
    requiredComponents: [
      { name: 'ESP32 DevKit', category: 'Microcontrollers', quantity: 1, estimatedCost: 180, isCritical: true, compatiblePartNumbers: ['ESP32-WROOM-32', 'Arduino Nano'] },
      { name: 'Soil Moisture Sensor Module', category: 'Sensors', quantity: 1, estimatedCost: 75, isCritical: true, compatiblePartNumbers: ['Capacitive-Moisture-v1.2', 'Resistive-Soil-Sensor'] },
      { name: 'Photoresistor (LDR) Module', category: 'Sensors', quantity: 1, estimatedCost: 25, isCritical: false, compatiblePartNumbers: ['LDR-GL5528'] },
      { name: 'SG90 Micro Servo Motor', category: 'Motors', quantity: 1, estimatedCost: 90, isCritical: false, compatiblePartNumbers: ['SG90', 'MG90S'] }
    ],
    instructions: [
      { step: 1, title: 'Sensor Connection', detail: 'Connect Soil Moisture sensor analog out to ESP32 Pin 34 (ADC1), VCC to 3V3, GND to GND.' },
      { step: 2, title: 'Calibrate Dry vs Wet Values', detail: 'Record analog reading in air (dry ~3200) vs submerged in cup of water (~1400).' },
      { step: 3, title: 'Optional Auto-Watering Flag', detail: 'Use SG90 servo as a mechanical valve indicator or trip a small 5V relay pump.' }
    ],
    wiringGuide: 'Soil AOUT -> GPIO34. LDR AOUT -> GPIO35. Servo Signal -> GPIO18. Power rail from 3.3V and GND.',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'proj-4',
    title: 'Autonomous Obstacle-Avoiding Rover',
    slug: 'autonomous-obstacle-rover',
    description: 'A 2-wheel drive mobile chassis that roams autonomously using an ultrasonic sensor on a sweeping servo to detect and steer around obstacles.',
    category: 'Robotics & Motion',
    difficulty: 'Intermediate',
    estimatedBuildTimeHours: 4.5,
    estimatedCost: 650,
    requiredSkills: ['Motor Drivers', 'PWM Control', 'Robotics Kinematics', 'Power Isolation'],
    safetyRequirements: ['Never power motors directly from Arduino 5V regulator pin; use separate battery pack with common ground', 'Elevate wheels during initial code flash'],
    expectedOutput: 'Rover navigates open spaces, stops 20cm before walls, scans left and right, and turns into the clearest direction.',
    estimatedEwasteAvoidedGrams: 750,
    requiredComponents: [
      { name: 'Arduino Uno R3', category: 'Microcontrollers', quantity: 1, estimatedCost: 250, isCritical: true, compatiblePartNumbers: ['Arduino Uno', 'ESP32'] },
      { name: 'L298N Dual H-Bridge Motor Driver', category: 'Power Components', quantity: 1, estimatedCost: 140, isCritical: true, compatiblePartNumbers: ['L298N', 'TB6612FNG', 'L293D'] },
      { name: 'TT Geared DC Motors with Wheels (Pair)', category: 'Motors', quantity: 2, estimatedCost: 150, isCritical: true, compatiblePartNumbers: ['TT-Motor-3V-6V'] },
      { name: 'HC-SR04 Ultrasonic Distance Sensor', category: 'Sensors', quantity: 1, estimatedCost: 80, isCritical: true, compatiblePartNumbers: ['HC-SR04'] },
      { name: 'SG90 Micro Servo Motor', category: 'Motors', quantity: 1, estimatedCost: 90, isCritical: true, compatiblePartNumbers: ['SG90'] },
      { name: '18650 Battery Holder with Switch', category: 'Power Components', quantity: 1, estimatedCost: 80, isCritical: true, compatiblePartNumbers: ['2x-18650-Holder'] }
    ],
    instructions: [
      { step: 1, title: 'Chassis & Motor Assembly', detail: 'Fix TT motors to chassis plate using screws. Attach rubber drive wheels and front castor.' },
      { step: 2, title: 'L298N Driver Integration', detail: 'Wire Motor A to Left Output, Motor B to Right Output. Connect battery 7.4V to VMS and battery GND to Driver GND.' },
      { step: 3, title: 'Common Ground Bridge', detail: 'CRITICAL: Connect L298N GND to Arduino GND. Leave 5V logic powered from regulated rail.' },
      { step: 4, title: 'Servo Scanner Head Mount', detail: 'Mount HC-SR04 atop SG90 servo horn at front center.' },
      { step: 5, title: 'Autonomous Navigation Algorithm', detail: 'Implement continuous forward driving; interrupt on obstacle <25cm, scan ±45°, turn towards largest clearance.' }
    ],
    wiringGuide: 'L298N IN1..IN4 -> Arduino Pins 5,6,9,10 (PWM enabled). Servo -> Pin 11. Ultrasonic Trig/Echo -> Pins 12,13. Common GND verified.',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'proj-5',
    title: 'Touchless Ultrasonic Smart Dustbin',
    slug: 'touchless-smart-dustbin',
    description: 'An automatic lid-opening waste receptacle operated by hand proximity gesture, promoting hygiene in workshops and makerspaces.',
    category: 'Automation & Smart Home',
    difficulty: 'Beginner',
    estimatedBuildTimeHours: 1.5,
    estimatedCost: 200,
    requiredSkills: ['Servo Angles', 'Proximity Triggering'],
    safetyRequirements: ['Ensure mechanical servo horn does not jam against lid hinge under load'],
    expectedOutput: 'Hand gesture within 15cm causes servo to open bin lid to 90 degrees, hold for 4 seconds, then smoothly close.',
    estimatedEwasteAvoidedGrams: 340,
    requiredComponents: [
      { name: 'Arduino Nano', category: 'Microcontrollers', quantity: 1, estimatedCost: 190, isCritical: true, compatiblePartNumbers: ['Arduino Nano', 'Arduino Uno', 'ESP8266'] },
      { name: 'HC-SR04 Ultrasonic Distance Sensor', category: 'Sensors', quantity: 1, estimatedCost: 80, isCritical: true, compatiblePartNumbers: ['HC-SR04'] },
      { name: 'SG90 Micro Servo Motor', category: 'Motors', quantity: 1, estimatedCost: 90, isCritical: true, compatiblePartNumbers: ['SG90', 'MG90S'] },
      { name: '5V 2A USB Power Cable', category: 'Cables', quantity: 1, estimatedCost: 40, isCritical: true, compatiblePartNumbers: ['USB-A-to-Mini-B'] }
    ],
    instructions: [
      { step: 1, title: 'Mounting Proximity Eye', detail: 'Cut two 16mm holes in the front of bin lid. Insert HC-SR04 transducer tubes and secure with hot glue.' },
      { step: 2, title: 'Servo Arm Mechanics', detail: 'Fasten a lightweight pushrod from servo horn to the inner lid lever.' },
      { step: 3, title: 'Control Firmware', detail: 'Sample distance every 100ms. If distance <15cm, sweep servo to 90 deg, pause 4000ms, sweep back to 0 deg.' }
    ],
    wiringGuide: 'HC-SR04 Trig -> D2, Echo -> D3. Servo PWM -> D9. VCC 5V and GND common.',
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'proj-6',
    title: 'Smart Home Dual-Relay Appliance Controller',
    slug: 'smart-home-dual-relay-controller',
    description: 'Wi-Fi enabled appliance automation controller with optocoupler-isolated relays and local push-button overrides for circular home energy upgrades.',
    category: 'Automation & Smart Home',
    difficulty: 'Intermediate',
    estimatedBuildTimeHours: 3.0,
    estimatedCost: 420,
    requiredSkills: ['High Voltage Safety Awareness', 'Optocoupler Logic', 'Web Server on ESP32'],
    safetyRequirements: ['⚠️ DANGER: Mains AC (110V-230V) switching requires certified electrician or testing strictly on low-voltage 12V DC loads first', 'Never touch bare PCB while energized'],
    expectedOutput: 'Web interface accessible on local Wi-Fi lets user toggle 2 channels with live status feedback and physical button synchronization.',
    estimatedEwasteAvoidedGrams: 510,
    requiredComponents: [
      { name: 'ESP32 DevKit', category: 'Microcontrollers', quantity: 1, estimatedCost: 180, isCritical: true, compatiblePartNumbers: ['ESP32-WROOM-32', 'NodeMCU-ESP8266'] },
      { name: '2-Channel 5V Relay Module with Optocoupler', category: 'Power Components', quantity: 1, estimatedCost: 120, isCritical: true, compatiblePartNumbers: ['Relay-2CH-5V-Opto'] },
      { name: 'Momentary Push Buttons (Pair)', category: 'Other Electronics', quantity: 2, estimatedCost: 20, isCritical: false, compatiblePartNumbers: ['Tactile-Switch-12mm'] },
      { name: '10k Ohm Resistors', category: 'Resistors', quantity: 2, estimatedCost: 5, isCritical: true, compatiblePartNumbers: ['Resistor-10k-0.25W'] }
    ],
    instructions: [
      { step: 1, title: 'Optocoupler Relay Control', detail: 'Remove JD-VCC jumper if using separated logic supply. Connect ESP32 GPIO26 to IN1, GPIO27 to IN2.' },
      { step: 2, title: 'Button Hardware Debouncing', detail: 'Wire tactile buttons to GPIO14 and GPIO12 configured with internal pull-ups or 10k resistors.' },
      { step: 3, title: 'Flash AsyncWebServer Code', detail: 'Host a responsive web dashboard on ESP32 allowing toggle from smartphone browser.' }
    ],
    wiringGuide: 'ESP32 GPIO26 -> Relay IN1 | GPIO27 -> Relay IN2 | 5V -> Relay VCC | GND -> Relay GND. Buttons to GPIO14 & GPIO12 with GND pull.',
    imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'proj-7',
    title: 'Ultrasonic Liquid Level & Sump Tank Monitor',
    slug: 'water-tank-level-monitor',
    description: 'Non-contact water reservoir depth monitor with acoustic alarm when overflow or low-water dry run is imminent, conserving water and pump life.',
    category: 'Sensors & Monitoring',
    difficulty: 'Beginner',
    estimatedBuildTimeHours: 2.0,
    estimatedCost: 310,
    requiredSkills: ['Sensor Enclosures', 'Threshold Mapping'],
    safetyRequirements: ['Ultrasonic transducers must be protected against direct steam and condensation droplets'],
    expectedOutput: 'Calculates water percentage (0-100%) and sounds audible alarm when tank hits 90% full or below 15% threshold.',
    estimatedEwasteAvoidedGrams: 400,
    requiredComponents: [
      { name: 'Arduino Nano', category: 'Microcontrollers', quantity: 1, estimatedCost: 190, isCritical: true, compatiblePartNumbers: ['Arduino Nano', 'Arduino Uno'] },
      { name: 'HC-SR04 Ultrasonic Distance Sensor', category: 'Sensors', quantity: 1, estimatedCost: 80, isCritical: true, compatiblePartNumbers: ['HC-SR04', 'JSN-SR04T'] },
      { name: '16x2 I2C Character LCD', category: 'Displays', quantity: 1, estimatedCost: 130, isCritical: false, compatiblePartNumbers: ['LCD1602-I2C'] },
      { name: 'Active Buzzer 5V', category: 'Actuators', quantity: 1, estimatedCost: 20, isCritical: true, compatiblePartNumbers: ['Buzzer-5V-Active'] }
    ],
    instructions: [
      { step: 1, title: 'Sensor Top Mount', detail: 'Mount sensor at top lid pointing perpendicular to water surface.' },
      { step: 2, title: 'LCD I2C Interface', detail: 'Wire LCD SDA to Nano A4, SCL to A5, VCC to 5V, GND to GND.' },
      { step: 3, title: 'Level Math Conversion', detail: 'Level % = ((Total Tank Height - Measured Distance) / Total Tank Height) * 100.' }
    ],
    wiringGuide: 'Nano A4 -> LCD SDA, A5 -> LCD SCL. D4 -> Sensor Trig, D5 -> Sensor Echo. D6 -> Buzzer (+).',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'proj-8',
    title: 'Intrusion Detection Laser & PIR Security Tripwire',
    slug: 'pir-laser-security-tripwire',
    description: 'Multi-stage perimeter security tripwire combining passive infrared heat sensing and optical break-beam laser detection with warning buzzer.',
    category: 'Security & Access',
    difficulty: 'Beginner',
    estimatedBuildTimeHours: 2.0,
    estimatedCost: 260,
    requiredSkills: ['PIR Warm-up Timing', 'Interrupt Pin Handling'],
    safetyRequirements: ['Do not stare directly into the red laser diode beam (Class 2 rating)'],
    expectedOutput: 'Trips armed state when thermal motion is detected or optical path is interrupted, triggering buzzer cadence.',
    estimatedEwasteAvoidedGrams: 360,
    requiredComponents: [
      { name: 'Arduino Uno R3', category: 'Microcontrollers', quantity: 1, estimatedCost: 250, isCritical: true, compatiblePartNumbers: ['Arduino Uno', 'ESP32'] },
      { name: 'PIR Motion Sensor HC-SR501', category: 'Sensors', quantity: 1, estimatedCost: 70, isCritical: true, compatiblePartNumbers: ['HC-SR501', 'AM312'] },
      { name: 'Active Buzzer 5V', category: 'Actuators', quantity: 1, estimatedCost: 20, isCritical: true, compatiblePartNumbers: ['Buzzer-5V-Active'] },
      { name: 'Photoresistor (LDR) Module', category: 'Sensors', quantity: 1, estimatedCost: 25, isCritical: true, compatiblePartNumbers: ['LDR-GL5528'] },
      { name: 'Red & Green LED Set', category: 'Other Electronics', quantity: 2, estimatedCost: 15, isCritical: false, compatiblePartNumbers: ['5mm-LED-Red'] }
    ],
    instructions: [
      { step: 1, title: 'PIR Sensor Delay Tuning', detail: 'Adjust trimmer potentiometer on HC-SR501 to 3 seconds minimum re-trigger time.' },
      { step: 2, title: 'Optical Alignment', detail: 'Aim laser beam directly onto LDR face inside a black shroud to eliminate stray light interference.' },
      { step: 3, title: 'Arming State Machine', detail: 'Provide 30-second arming delay after power-on to allow user to vacate the protected perimeter.' }
    ],
    wiringGuide: 'PIR Out -> Arduino D2 (Interrupt 0). LDR Analog -> A0. Buzzer -> D8. Status LEDs -> D11 & D12.',
    imageUrl: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'proj-9',
    title: 'RFID Contactless Attendance & Access Prototype',
    slug: 'rfid-contactless-access-prototype',
    description: 'An SPI-interfaced RFID badge authentication terminal with dual-color confirmation LEDs and servo door latch actuator for makerspace tool access.',
    category: 'Security & Access',
    difficulty: 'Intermediate',
    estimatedBuildTimeHours: 3.0,
    estimatedCost: 390,
    requiredSkills: ['SPI Bus Protocol', 'UID Byte Parsing'],
    safetyRequirements: ['Low-voltage DC. Ensure servo mechanical stop does not pinch fingers.'],
    expectedOutput: 'Reads Mifare 13.56MHz cards, grants green access pulse and unlatches servo for authorized UIDs.',
    estimatedEwasteAvoidedGrams: 410,
    requiredComponents: [
      { name: 'Arduino Uno R3', category: 'Microcontrollers', quantity: 1, estimatedCost: 250, isCritical: true, compatiblePartNumbers: ['Arduino Uno', 'ESP32'] },
      { name: 'RC522 13.56MHz RFID Reader with Tags', category: 'Sensors', quantity: 1, estimatedCost: 110, isCritical: true, compatiblePartNumbers: ['RC522', 'PN532'] },
      { name: 'SG90 Micro Servo Motor', category: 'Motors', quantity: 1, estimatedCost: 90, isCritical: true, compatiblePartNumbers: ['SG90'] },
      { name: 'Red & Green LED Set', category: 'Other Electronics', quantity: 2, estimatedCost: 15, isCritical: false, compatiblePartNumbers: ['5mm-LED-Red', '5mm-LED-Green'] },
      { name: 'Active Buzzer 5V', category: 'Actuators', quantity: 1, estimatedCost: 20, isCritical: false, compatiblePartNumbers: ['Buzzer-5V-Active'] }
    ],
    instructions: [
      { step: 1, title: 'SPI Pin Connections', detail: 'RC522 SDA -> Pin 10, SCK -> Pin 13, MOSI -> Pin 11, MISO -> Pin 12, RST -> Pin 9, 3.3V power (NOT 5V).' },
      { step: 2, title: 'Authorized UID Registration', detail: 'Scan master card, copy HEX string into firmware whitelist array.' },
      { step: 3, title: 'Servo Latch Motion', detail: 'Drive servo to 90 degrees for 3 seconds upon recognized UID match, otherwise flash red.' }
    ],
    wiringGuide: 'RC522: 3.3V (do not feed 5V), RST -> D9, SDA -> D10, MOSI -> D11, MISO -> D12, SCK -> D13. Servo -> D6.',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'proj-10',
    title: 'Dual-Sensor Autonomous Line Following Robot',
    slug: 'autonomous-line-follower',
    description: 'A responsive differential-drive mobile cart using infrared reflectance array to navigate marked floor tracks in warehouses or educational contests.',
    category: 'Robotics & Motion',
    difficulty: 'Intermediate',
    estimatedBuildTimeHours: 3.5,
    estimatedCost: 520,
    requiredSkills: ['Differential Steering', 'IR Optical Calibration'],
    safetyRequirements: ['Secure battery firmly to prevent shorting or falling during turns.'],
    expectedOutput: 'Tracks high-contrast black line on white surface at up to 0.4 m/s with smooth proportional steering.',
    estimatedEwasteAvoidedGrams: 620,
    requiredComponents: [
      { name: 'Arduino Nano', category: 'Microcontrollers', quantity: 1, estimatedCost: 190, isCritical: true, compatiblePartNumbers: ['Arduino Nano'] },
      { name: 'L298N Dual H-Bridge Motor Driver', category: 'Power Components', quantity: 1, estimatedCost: 140, isCritical: true, compatiblePartNumbers: ['L298N'] },
      { name: 'TT Geared DC Motors with Wheels (Pair)', category: 'Motors', quantity: 2, estimatedCost: 150, isCritical: true, compatiblePartNumbers: ['TT-Motor-3V-6V'] },
      { name: 'TCRT5000 Dual IR Sensor Module', category: 'Sensors', quantity: 1, estimatedCost: 60, isCritical: true, compatiblePartNumbers: ['TCRT5000', 'IR-Obstacle-Sensor'] },
      { name: '18650 Battery Holder with Switch', category: 'Power Components', quantity: 1, estimatedCost: 80, isCritical: true, compatiblePartNumbers: ['2x-18650-Holder'] }
    ],
    instructions: [
      { step: 1, title: 'Ground Sensor Clearance', detail: 'Mount TCRT5000 sensor 8mm to 12mm above ground surface at front bumper.' },
      { step: 2, title: 'Calibrate Comparator Potentiometers', detail: 'Tune onboard trimpots so status LED lights on black tape and turns off on white poster board.' },
      { step: 3, title: 'PWM Speed Tuning', detail: 'Set base PWM speed to 160, reduce inner wheel speed to 60 during turn corrections.' }
    ],
    wiringGuide: 'Left IR Out -> Nano A1, Right IR Out -> Nano A2. L298N Left Motor -> D3/D5 (PWM), Right Motor -> D6/D9 (PWM).',
    imageUrl: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'proj-11',
    title: 'Smart Automated Plant Irrigation Pump',
    slug: 'smart-plant-irrigation-pump',
    description: 'Closed-loop precision irrigation system monitoring volumetric soil water content and driving a submerged 5V mini water pump via optocoupler relay.',
    category: 'Environmental & CleanTech',
    difficulty: 'Beginner',
    estimatedBuildTimeHours: 2.5,
    estimatedCost: 320,
    requiredSkills: ['Relay Control', 'Analog Sensor Averaging'],
    safetyRequirements: ['Submersible pump must be fully sealed; keep microcontroller electronics in dry elevated enclosure.'],
    expectedOutput: 'Dispenses 150ml water only when moisture level falls below custom threshold, preventing over-watering.',
    estimatedEwasteAvoidedGrams: 440,
    requiredComponents: [
      { name: 'Arduino Nano', category: 'Microcontrollers', quantity: 1, estimatedCost: 190, isCritical: true, compatiblePartNumbers: ['Arduino Nano', 'ESP32'] },
      { name: 'Soil Moisture Sensor Module', category: 'Sensors', quantity: 1, estimatedCost: 75, isCritical: true, compatiblePartNumbers: ['Capacitive-Moisture-v1.2'] },
      { name: '2-Channel 5V Relay Module with Optocoupler', category: 'Power Components', quantity: 1, estimatedCost: 120, isCritical: true, compatiblePartNumbers: ['Relay-2CH-5V-Opto'] },
      { name: '5V Mini Submersible Water Pump & Tube', category: 'Motors', quantity: 1, estimatedCost: 110, isCritical: true, compatiblePartNumbers: ['Pump-5V-DC'] }
    ],
    instructions: [
      { step: 1, title: 'Sensor Soil Embedding', detail: 'Insert capacitive blade into root zone of target plant.' },
      { step: 2, title: 'Relay Load Switching', detail: 'Route pump DC 5V positive wire through Relay Normally Open (NO) and Common (COM) terminals.' },
      { step: 3, title: 'Anti-Flooding Safety Timeout', detail: 'Add hard software safety interlock limiting pump runtime to max 12 seconds per hour.' }
    ],
    wiringGuide: 'Soil Sensor -> Nano A0. Relay IN1 -> Nano D7. Pump power isolated on dedicated 5V 1A adapter.',
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'proj-12',
    title: 'Air Quality & Particulate Matter Sentinel',
    slug: 'air-quality-particulate-sentinel',
    description: 'Indoor environmental safety station detecting airborne volatile compounds, gas leaks, and temperature with visual warning LED bar graph.',
    category: 'Environmental & CleanTech',
    difficulty: 'Intermediate',
    estimatedBuildTimeHours: 3.0,
    estimatedCost: 480,
    requiredSkills: ['Gas Sensor Pre-heating', 'Analog Threshold Mapping'],
    safetyRequirements: ['MQ-series gas sensors run an internal heating coil; the metal mesh will feel warm to the touch. Keep away from flammable solvents.'],
    expectedOutput: 'Monitors air purity index; alerts if hazardous gas concentration exceeds safe baseline.',
    estimatedEwasteAvoidedGrams: 470,
    requiredComponents: [
      { name: 'ESP32 DevKit', category: 'Microcontrollers', quantity: 1, estimatedCost: 180, isCritical: true, compatiblePartNumbers: ['ESP32-WROOM-32'] },
      { name: 'MQ-2 Flammable Gas & Smoke Sensor', category: 'Sensors', quantity: 1, estimatedCost: 120, isCritical: true, compatiblePartNumbers: ['MQ-2', 'MQ-135'] },
      { name: 'DHT22 Temperature & Humidity Sensor', category: 'Sensors', quantity: 1, estimatedCost: 90, isCritical: false, compatiblePartNumbers: ['DHT22'] },
      { name: '0.96 inch I2C OLED Display', category: 'Displays', quantity: 1, estimatedCost: 110, isCritical: true, compatiblePartNumbers: ['SSD1306'] },
      { name: 'Active Buzzer 5V', category: 'Actuators', quantity: 1, estimatedCost: 20, isCritical: false, compatiblePartNumbers: ['Buzzer-5V-Active'] }
    ],
    instructions: [
      { step: 1, title: 'MQ-2 Pre-Heat Burn-In', detail: 'Power MQ-2 module with 5V for 10-15 minutes prior to initial calibration.' },
      { step: 2, title: 'OLED Display Setup', detail: 'Wire OLED I2C to ESP32 pins 21/22 and display PPM trend graph.' },
      { step: 3, title: 'Alarm Trigger Logic', detail: 'Sound acoustic cadence if raw sensor voltage surpasses 1.8V for more than 3 consecutive samples.' }
    ],
    wiringGuide: 'MQ-2 AOUT -> ESP32 GPIO36 (ADC1_0). OLED -> GPIO21 (SDA), GPIO22 (SCL). Buzzer -> GPIO19.',
    imageUrl: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80'
  }
];
