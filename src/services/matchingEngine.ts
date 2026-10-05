import { ComponentItem, Project, ProjectComponentRequirement, ProjectMatchResult } from '../types';

export function matchProjectWithInventory(
  project: Project,
  userInventory: ComponentItem[],
  marketplaceComponents: ComponentItem[] = []
): ProjectMatchResult {
  const reqs = project.requiredComponents;
  const availableMatches: { req: ProjectComponentRequirement; matchedComponent?: ComponentItem }[] = [];
  const missingComponents: {
    req: ProjectComponentRequirement;
    marketPrice: number;
    availableInRELifeMarketplace?: ComponentItem;
  }[] = [];

  let matchedReqCount = 0;
  let criticalAvailableCount = 0;
  let totalCriticalCount = 0;
  let totalReqCount = reqs.length;
  let trustScoresSum = 0;
  let matchedComponentsCount = 0;

  for (const req of reqs) {
    if (req.isCritical) totalCriticalCount++;

    // Find in user's inventory
    const match = userInventory.find(item => {
      if (item.lifecycleState === 'Sold' || item.quantity <= 0) return false;
      const nameMatch = item.name.toLowerCase().includes(req.name.toLowerCase()) ||
        req.name.toLowerCase().includes(item.name.toLowerCase());
      const partMatch = req.compatiblePartNumbers.some(p =>
        item.model.toLowerCase().includes(p.toLowerCase()) ||
        item.name.toLowerCase().includes(p.toLowerCase())
      );
      const catMatch = item.category === req.category;
      return (nameMatch || partMatch) && (catMatch || partMatch);
    });

    if (match) {
      availableMatches.push({ req, matchedComponent: match });
      matchedReqCount++;
      if (req.isCritical) criticalAvailableCount++;
      trustScoresSum += match.trustProfile.overallTrustScore;
      matchedComponentsCount++;
    } else {
      // Find in marketplace for missing component optimization
      const marketplaceMatch = marketplaceComponents.find(item => {
        if (item.status !== 'active' || item.quantity <= 0) return false;
        const nameMatch = item.name.toLowerCase().includes(req.name.toLowerCase()) ||
          req.name.toLowerCase().includes(item.name.toLowerCase());
        const partMatch = req.compatiblePartNumbers.some(p =>
          item.model.toLowerCase().includes(p.toLowerCase()) ||
          item.name.toLowerCase().includes(p.toLowerCase())
        );
        return nameMatch || partMatch;
      });

      missingComponents.push({
        req,
        marketPrice: marketplaceMatch ? marketplaceMatch.price : req.estimatedCost,
        availableInRELifeMarketplace: marketplaceMatch
      });
    }
  }

  // Calculate Subscores
  const availabilityScore = totalReqCount > 0 ? (matchedReqCount / totalReqCount) * 100 : 0;
  const specScore = totalCriticalCount > 0 ? (criticalAvailableCount / totalCriticalCount) * 100 : 100;
  const qtyScore = availabilityScore >= 90 ? 100 : availabilityScore >= 50 ? 75 : 40;
  
  // Cost efficiency: higher if additional cost is low compared to project value
  const additionalCostToUnlock = missingComponents.reduce((acc, m) => acc + m.marketPrice, 0);
  const costEfficiency = Math.max(0, 100 - Math.min(100, (additionalCostToUnlock / (project.estimatedCost || 300)) * 60));

  // Difficulty & Time Fit
  const difficultyFit = project.difficulty === 'Beginner' ? 100 : project.difficulty === 'Intermediate' ? 85 : 70;
  const timeFit = project.estimatedBuildTimeHours <= 2 ? 100 : project.estimatedBuildTimeHours <= 4 ? 85 : 65;

  // Base weighted score
  const baseScore =
    0.40 * availabilityScore +
    0.20 * specScore +
    0.10 * qtyScore +
    0.10 * costEfficiency +
    0.10 * difficultyFit +
    0.10 * timeFit;

  // Trust modifier
  const avgTrust = matchedComponentsCount > 0 ? trustScoresSum / matchedComponentsCount : 70;
  const trustModifier = (avgTrust - 80) * 0.1; // -2 to +2% modifier

  const finalScore = Math.min(100, Math.max(10, Math.round(baseScore + trustModifier)));

  // Safety flags check
  const safetyFlags: string[] = [];
  project.safetyRequirements.forEach(reqText => {
    if (reqText.toLowerCase().includes('high voltage') || reqText.toLowerCase().includes('mains') || reqText.toLowerCase().includes('danger')) {
      safetyFlags.push('⚠️ Requires certified low-voltage testing or AC mains caution.');
    }
    if (reqText.toLowerCase().includes('laser') || reqText.toLowerCase().includes('beam')) {
      safetyFlags.push('⚠️ Class 2 optical laser component: avoid direct eye exposure.');
    }
    if (reqText.toLowerCase().includes('battery') || reqText.toLowerCase().includes('18650')) {
      safetyFlags.push('⚠️ High-current lithium cell handling: verify polarity and BMS.');
    }
  });

  // Why recommended explanations
  const whyRecommended: string[] = [];
  if (missingComponents.length === 0) {
    whyRecommended.push(`✓ Complete component match: 100% of required hardware is in your inventory.`);
  } else if (missingComponents.length <= 2) {
    whyRecommended.push(`✓ Highly feasible: ${matchedReqCount} of ${totalReqCount} parts ready in inventory.`);
  } else {
    whyRecommended.push(`✓ Compatible architecture: ${matchedReqCount} key module(s) already identified.`);
  }

  if (criticalAvailableCount === totalCriticalCount && totalCriticalCount > 0) {
    whyRecommended.push(`✓ All ${totalCriticalCount} critical controller and core sensors are verified available.`);
  }

  if (additionalCostToUnlock === 0) {
    whyRecommended.push(`✓ ₹0 additional cost to construct and test.`);
  } else {
    whyRecommended.push(`✓ Low procurement barrier: only ₹${additionalCostToUnlock} needed to unlock complete build.`);
  }

  if (project.estimatedEwasteAvoidedGrams > 0) {
    whyRecommended.push(`✓ Prevents an estimated ${project.estimatedEwasteAvoidedGrams}g of electronics from scrap waste.`);
  }

  // Feasibility tier assignment
  let feasibilityTier: 'BUILD_NOW' | 'SMALL_ADDITIONS' | 'NOT_FEASIBLE' = 'NOT_FEASIBLE';
  if (missingComponents.length === 0) {
    feasibilityTier = 'BUILD_NOW';
  } else if (missingComponents.length <= 3) {
    feasibilityTier = 'SMALL_ADDITIONS';
  } else {
    feasibilityTier = 'NOT_FEASIBLE';
  }

  const impactPerCostRatio = additionalCostToUnlock > 0
    ? Number((project.estimatedEwasteAvoidedGrams / additionalCostToUnlock).toFixed(2))
    : Number((project.estimatedEwasteAvoidedGrams / 10).toFixed(2));

  return {
    project,
    compatibilityScore: finalScore,
    availableComponents: availableMatches,
    missingComponents,
    feasibilityTier,
    whyRecommended,
    safetyFlags,
    additionalCostToUnlock,
    impactPerCostRatio,
    formulaBreakdown: {
      availabilityScore: Math.round(availabilityScore),
      specScore: Math.round(specScore),
      qtyScore: Math.round(qtyScore),
      costEfficiency: Math.round(costEfficiency),
      difficultyFit: Math.round(difficultyFit),
      timeFit: Math.round(timeFit),
      trustModifier: Math.round(trustModifier * 10) / 10
    }
  };
}

export function evaluateBuildWhatIHave(
  projects: Project[],
  userInventory: ComponentItem[],
  marketplaceComponents: ComponentItem[] = []
): {
  buildNow: ProjectMatchResult[];
  smallAdditions: ProjectMatchResult[];
  notFeasible: ProjectMatchResult[];
} {
  const allResults = projects.map(p =>
    matchProjectWithInventory(p, userInventory, marketplaceComponents)
  );

  // Sort each tier by compatibility score descending and impact
  const buildNow = allResults
    .filter(r => r.feasibilityTier === 'BUILD_NOW')
    .sort((a, b) => b.compatibilityScore - a.compatibilityScore);

  const smallAdditions = allResults
    .filter(r => r.feasibilityTier === 'SMALL_ADDITIONS')
    .sort((a, b) => {
      // rank by lowest additional cost, then highest score
      if (a.additionalCostToUnlock !== b.additionalCostToUnlock) {
        return a.additionalCostToUnlock - b.additionalCostToUnlock;
      }
      return b.compatibilityScore - a.compatibilityScore;
    });

  const notFeasible = allResults
    .filter(r => r.feasibilityTier === 'NOT_FEASIBLE')
    .sort((a, b) => b.compatibilityScore - a.compatibilityScore);

  return { buildNow, smallAdditions, notFeasible };
}
