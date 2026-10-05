// src/components/build/BuildWhatIHaveView.tsx
import React from 'react';

type Props = {
  userInventory: any[];
  allProjects: any[];
  marketplaceComponents: any[];
  onOpenProjectBuilder: (project: any, matchResult?: any) => void;
  onAddToCart: (item: any) => void;
  onNavigateToMarketplace: () => void;
  onNavigateToSell: () => void;
};

export const BuildWhatIHaveView: React.FC<Props> = () => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Build What I Have</h2>
      <p className="text-stone-600">This feature is not implemented yet.</p>
    </div>
  );
};
