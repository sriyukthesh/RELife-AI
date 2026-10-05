import { ComponentItem, Project, User } from '../types';
import { evaluateBuildWhatIHave } from './matchingEngine';

export interface AdvisorMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestedProjects?: {
    projectId: string;
    title: string;
    feasibilityScore: number;
    missingCount: number;
    additionalCost: number;
  }[];
  safetyAlert?: string;
}

export function generateAdvisorResponse(
  userQuery: string,
  user: User,
  inventory: ComponentItem[],
  allProjects: Project[],
  marketplace: ComponentItem[]
): AdvisorMessage {
  const query = userQuery.toLowerCase();
  const evaluation = evaluateBuildWhatIHave(allProjects, inventory, marketplace);
  const inventoryNames = inventory.map(i => i.name).join(', ');

  let responseText = '';
  let suggestedProjects: {
    projectId: string;
    title: string;
    feasibilityScore: number;
    missingCount: number;
    additionalCost: number;
  }[] | undefined;
  let safetyAlert: string | undefined;

  if (query.includes('what can i build') || query.includes('what to build') || query.includes('have') || query.includes('recommend')) {
    if (evaluation.buildNow.length > 0) {
      const top = evaluation.buildNow[0];
      responseText = `Based on your verified inventory (${inventory.length} components including ${inventory.slice(0, 3).map(i => i.name).join(', ')}), you can immediately build the **${top.project.title}** with **100% component availability** and ₹0 additional procurement!\n\n` +
        `• **Feasibility:** ${top.compatibilityScore}%\n` +
        `• **Estimated Build Time:** ${top.project.estimatedBuildTimeHours} hours\n` +
        `• **E-Waste Diverted:** ${top.project.estimatedEwasteAvoidedGrams}g\n` +
        `• **Key Components Used:** ${top.availableComponents.map(c => c.req.name).join(', ')}`;

      suggestedProjects = evaluation.buildNow.slice(0, 3).map(m => ({
        projectId: m.project.id,
        title: m.project.title,
        feasibilityScore: m.compatibilityScore,
        missingCount: m.missingComponents.length,
        additionalCost: m.additionalCostToUnlock
      }));
    } else if (evaluation.smallAdditions.length > 0) {
      const top = evaluation.smallAdditions[0];
      responseText = `You are very close to multiple functional builds! Your highest ranked opportunity is the **${top.project.title}** (Feasibility: ${top.compatibilityScore}%).\n\n` +
        `You currently own: ${top.availableComponents.map(c => c.req.name).join(', ')}.\n\n` +
        `**Missing Parts to Unlock:**\n` +
        top.missingComponents.map(m => `• ${m.req.name} (~₹${m.marketPrice})`).join('\n') +
        `\n\nTotal additional cost is only **₹${top.additionalCostToUnlock}**, preventing **${top.project.estimatedEwasteAvoidedGrams}g** of e-waste.`;

      suggestedProjects = evaluation.smallAdditions.slice(0, 3).map(m => ({
        projectId: m.project.id,
        title: m.project.title,
        feasibilityScore: m.compatibilityScore,
        missingCount: m.missingComponents.length,
        additionalCost: m.additionalCostToUnlock
      }));
    } else {
      responseText = `I checked your inventory of ${inventory.length} items against all ${allProjects.length} cataloged circular projects. Most builds currently require multiple additional modules. Would you like to check the RELife Marketplace for affordable salvaged parts?`;
    }
  } else if (query.includes('safety') || query.includes('relay') || query.includes('battery') || query.includes('high voltage')) {
    safetyAlert = 'High-voltage and battery safety reminder active.';
    responseText = `**Crucial Safety Architecture Guidelines for Circular Electronics:**\n\n` +
      `1. **Mains AC Isolation:** When using relay modules like the SRD-05VDC with an ESP32 or Arduino, always verify optocoupler isolation. Never touch bare copper contacts when plugged into 110V/230V mains.\n` +
      `2. **Lithium 18650 Cells:** Inspect reused lithium batteries for outer heat-shrink tears, dented terminals, or bulging. Always use a dedicated BMS (Battery Management System) and verify polarity before switching on.\n` +
      `3. **Thermal Safety:** Sensors like MQ-2 contain internal heating coils that run warm (~50°C). Allow natural ventilation.`;
  } else if (query.includes('repair') || query.includes('bootloader') || query.includes('broken') || query.includes('salvage')) {
    responseText = `**Repair-Before-Recycle Strategy:**\n\n` +
      `Before discarding non-functional electronics:\n` +
      `• **AVR/Arduino Bootloaders:** If your Uno/Nano power LED lights but uploads fail (stk500 sync error), the microcontroller chip bootloader can often be restored using another working Arduino as an ISP programmer in 5 minutes.\n` +
      `• **Cold Solder Joints:** Inspect pin headers with magnification. Over 40% of discarded educational boards simply have cracked solder on the USB or DC connector.\n` +
      `• **Component Harvesting:** If the main MCU is unrecoverable, salvage the quartz crystal, female headers, LED indicators, and tactile switches!`;
  } else if (query.includes('wire') || query.includes('pin') || query.includes('connect')) {
    responseText = `**Standard Pinout Configuration Protocol:**\n\n` +
      `• **I2C Bus on ESP32:** SDA defaults to GPIO 21, SCL to GPIO 22. Operating at 3.3V logic.\n` +
      `• **I2C Bus on Arduino Uno:** SDA is Pin A4, SCL is Pin A5.\n` +
      `• **HC-SR04 Ultrasonic:** Trigger to standard GPIO (OUTPUT), Echo to GPIO (INPUT). If pairing with 3.3V boards like ESP32, use a 1k/2k resistor voltage divider on the 5V Echo pin for over-voltage protection.`;
  } else {
    responseText = `I'm analyzing your inventory (**${inventory.length} verified items** on hand). You can ask me:\n\n` +
      `• *"What can I build with my current components?"*\n` +
      `• *"How much would it cost to finish an obstacle-avoiding rover?"*\n` +
      `• *"How do I safely wire an ESP32 with an OLED display?"*\n` +
      `• *"How do I test if my ultrasonic sensor is working?"*`;
  }

  return {
    id: `msg-${Date.now()}`,
    sender: 'assistant',
    content: responseText,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    suggestedProjects,
    safetyAlert
  };
}
