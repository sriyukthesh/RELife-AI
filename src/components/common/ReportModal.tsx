import React, { useState } from 'react';
import { X, AlertTriangle, ShieldAlert } from 'lucide-react';
import { ComponentItem, Report, User } from '../../types';
import { RELifeStore } from '../../services/storage';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  component: ComponentItem | null;
  currentUser: User;
  onReportSubmitted: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  component,
  currentUser,
  onReportSubmitted
}) => {
  if (!isOpen || !component) return null;

  const [reason, setReason] = useState<Report['reason']>('Incorrect component');
  const [explanation, setExplanation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReport: Report = {
      id: `rep-${Date.now()}`,
      reporterId: currentUser.id,
      reporterName: currentUser.name,
      targetType: 'listing',
      targetId: component.id,
      targetTitle: component.name,
      reason,
      explanation,
      status: 'Open',
      createdAt: new Date().toISOString()
    };
    RELifeStore.addReport(newReport);
    onReportSubmitted();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/70 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
            <ShieldAlert className="w-5 h-5 text-amber-600" />
            <span>Report Suspicious Listing</span>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <span className="font-semibold text-stone-700">Component: </span>
            <span className="text-stone-900 font-bold">{component.name}</span>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">Reason for Report *</label>
            <select
              value={reason}
              onChange={e => setReason(e.target.value as any)}
              className="w-full px-3 py-2 border border-stone-300 rounded-md bg-white text-xs"
            >
              <option value="Fake listing">Fake listing / Scam</option>
              <option value="Incorrect component">Incorrect component marking / IC model</option>
              <option value="Misleading condition">Misleading condition (damaged pins/pads)</option>
              <option value="Unsafe component">Unsafe component (swollen battery / burned trace)</option>
              <option value="Suspicious seller">Suspicious seller behavior</option>
              <option value="Counterfeit suspicion">Counterfeit / Re-marked clone</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">Explanation & Evidence Details *</label>
            <textarea
              required
              rows={3}
              value={explanation}
              onChange={e => setExplanation(e.target.value)}
              placeholder="Describe why this component fails verification standards..."
              className="w-full px-3 py-2 border border-stone-300 rounded-md text-xs"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-stone-600 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 font-semibold text-white bg-amber-800 hover:bg-amber-700 rounded-md cursor-pointer"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
