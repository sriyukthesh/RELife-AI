import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  BarChart3,
  Users,
  Package,
  Layers,
  Sparkles,
  ShoppingBag,
  Sliders,
  Check,
  X
} from 'lucide-react';
import {
  AuditLog,
  ComponentItem,
  Order,
  Report,
  SafetyRule,
  SustainabilityFactor,
  User
} from '../../types';
import { RELifeStore } from '../../services/storage';

interface AdminDashboardProps {
  currentUser: User;
  components: ComponentItem[];
  orders: Order[];
  users: User[];
  reports: Report[];
  auditLogs: AuditLog[];
  safetyRules: SafetyRule[];
  sustainabilityFactors: SustainabilityFactor[];
  onRefreshData: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  components,
  orders,
  users,
  reports,
  auditLogs,
  safetyRules,
  sustainabilityFactors,
  onRefreshData
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<
    'overview' | 'verification' | 'listings' | 'reports' | 'safety' | 'sustainability' | 'audit'
  >('verification');

  const pendingVerification = components.filter(
    c => c.verificationLevel === 'IDENTITY_CHECKED' || c.status === 'pending_verification'
  );

  const handleApproveVerification = (comp: ComponentItem) => {
    const updated = {
      ...comp,
      verificationLevel: 'ADMIN_VERIFIED' as const,
      trustProfile: {
        ...comp.trustProfile,
        overallTrustScore: Math.min(99, comp.trustProfile.overallTrustScore + 5),
        conditionEvidence: 'Photo verified' as const
      },
      status: 'active' as const
    };
    RELifeStore.updateComponent(updated);
    RELifeStore.logAction(
      `${currentUser.name} (Admin)`,
      'ADMIN',
      'VERIFICATION_APPROVED',
      `${comp.id} (${comp.name})`,
      'SUCCESS',
      `Manual admin review confirmed genuine component traits and safety tags.`
    );
    onRefreshData();
  };

  const handleRejectVerification = (comp: ComponentItem) => {
    const updated = {
      ...comp,
      status: 'rejected' as const
    };
    RELifeStore.updateComponent(updated);
    RELifeStore.logAction(
      `${currentUser.name} (Admin)`,
      'ADMIN',
      'VERIFICATION_REJECTED',
      `${comp.id} (${comp.name})`,
      'WARNING',
      `Listing marked rejected due to insufficient markings or condition discrepancy.`
    );
    onRefreshData();
  };

  const handleResolveReport = (reportId: string) => {
    RELifeStore.updateReportStatus(reportId, 'Resolved', 'Admin verified and addressed concerns.');
    RELifeStore.logAction(
      `${currentUser.name} (Admin)`,
      'ADMIN',
      'REPORT_RESOLVED',
      reportId,
      'SUCCESS',
      `Resolved user report on marketplace item.`
    );
    onRefreshData();
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Platform Administration & Safety Command</span>
          </div>
          <h1 className="text-2xl font-bold">Admin Console</h1>
          <p className="text-stone-400 text-xs mt-1">
            Moderating {components.length} components, {orders.length} orders, and {users.length} active maker accounts.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <span className="text-xs bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-500/30 font-semibold">
            {pendingVerification.length} Submissions Pending Review
          </span>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-stone-200 text-xs">
        {[
          { id: 'verification', label: `Verification Queue (${pendingVerification.length})` },
          { id: 'overview', label: 'Platform KPIs' },
          { id: 'listings', label: `Listings (${components.length})` },
          { id: 'reports', label: `Reports (${reports.length})` },
          { id: 'safety', label: 'Safety Rules' },
          { id: 'sustainability', label: 'Circularity Factors' },
          { id: 'audit', label: `Audit Logs (${auditLogs.length})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveAdminTab(tab.id as any)}
            className={`px-3.5 py-2 font-semibold rounded-md whitespace-nowrap cursor-pointer transition-colors ${
              activeAdminTab === tab.id
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB: VERIFICATION QUEUE */}
      {activeAdminTab === 'verification' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-stone-900">
              Component Verification Queue ({pendingVerification.length})
            </h2>
            <span className="text-xs text-stone-500">
              Review camera capture evidence, optical findings, and assign Admin Verified status.
            </span>
          </div>

          {pendingVerification.length === 0 ? (
            <div className="p-12 bg-white rounded-xl border border-stone-200 text-center text-xs text-stone-500 space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <p className="font-semibold text-stone-800">Verification queue is completely clear!</p>
              <p>All component submissions currently hold valid verification badges.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingVerification.map(item => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs flex flex-col md:flex-row items-start justify-between gap-6"
                >
                  {/* Photos */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-center">
                      <img
                        src={item.images.front}
                        alt="Front"
                        className="w-20 h-16 object-cover rounded border border-stone-200"
                      />
                      <span className="text-[10px] text-stone-400 block mt-0.5">Front View</span>
                    </div>
                    <div className="text-center">
                      <img
                        src={item.images.back}
                        alt="Back"
                        className="w-20 h-16 object-cover rounded border border-stone-200"
                      />
                      <span className="text-[10px] text-stone-400 block mt-0.5">Back Solder</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 text-xs space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-emerald-800">{item.category}</span>
                      <span className="text-stone-300">·</span>
                      <span className="font-mono text-stone-500">{item.model}</span>
                    </div>
                    <h3 className="font-bold text-sm text-stone-900 truncate">{item.name}</h3>
                    <div className="text-stone-600">
                      Seller: <strong className="text-stone-800">{item.sellerName}</strong> · Condition: {item.condition} · Qty: {item.quantity} · ₹{item.price}
                    </div>

                    {/* AI analysis snippet */}
                    {item.trustProfile.aiAnalysis && (
                      <div className="p-2 bg-stone-50 rounded border border-stone-200 text-[11px] text-stone-600">
                        <span className="font-semibold text-stone-800">Optical Check: </span>
                        {item.trustProfile.aiAnalysis.markingIntegrity}. Identity confidence: {item.trustProfile.identityConfidence}%.
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                    <button
                      onClick={() => handleRejectVerification(item)}
                      className="px-3 py-1.5 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded-md cursor-pointer flex items-center gap-1"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                    <button
                      onClick={() => handleApproveVerification(item)}
                      className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-md cursor-pointer flex items-center gap-1 shadow-xs"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve & Verify</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB: OVERVIEW KPIS */}
      {activeAdminTab === 'overview' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-5 bg-white rounded-xl border border-stone-200">
            <div className="text-[11px] font-semibold text-stone-500 uppercase">Total User Accounts</div>
            <div className="text-2xl font-bold text-stone-900 mt-1">{users.length} Users</div>
            <div className="text-[11px] text-emerald-700 mt-1">100% Organic Makers</div>
          </div>
          <div className="p-5 bg-white rounded-xl border border-stone-200">
            <div className="text-[11px] font-semibold text-stone-500 uppercase">Cataloged Hardware</div>
            <div className="text-2xl font-bold text-stone-900 mt-1">{components.length} Listings</div>
            <div className="text-[11px] text-stone-500 mt-1">Across 10 Categories</div>
          </div>
          <div className="p-5 bg-white rounded-xl border border-stone-200">
            <div className="text-[11px] font-semibold text-stone-500 uppercase">Platform Orders</div>
            <div className="text-2xl font-bold text-stone-900 mt-1">{orders.length} Orders</div>
            <div className="text-[11px] text-stone-500 mt-1">₹{orders.reduce((a, b) => a + b.total, 0)} Total Volume</div>
          </div>
          <div className="p-5 bg-white rounded-xl border border-stone-200">
            <div className="text-[11px] font-semibold text-stone-500 uppercase">Reported Items</div>
            <div className="text-2xl font-bold text-amber-700 mt-1">{reports.length} Reports</div>
            <div className="text-[11px] text-stone-500 mt-1">Resolution Rate: 100%</div>
          </div>
        </div>
      )}

      {/* TAB: LISTINGS */}
      {activeAdminTab === 'listings' && (
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs text-xs">
          <table className="w-full text-left">
            <thead className="bg-stone-50 text-stone-600 border-b border-stone-200">
              <tr>
                <th className="py-2.5 px-4">Component</th>
                <th className="py-2.5 px-4">Category</th>
                <th className="py-2.5 px-4">Seller</th>
                <th className="py-2.5 px-4">Price</th>
                <th className="py-2.5 px-4">Trust</th>
                <th className="py-2.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {components.map(c => (
                <tr key={c.id} className="hover:bg-stone-50">
                  <td className="py-2.5 px-4 font-semibold text-stone-900">{c.name}</td>
                  <td className="py-2.5 px-4 text-stone-600">{c.category}</td>
                  <td className="py-2.5 px-4 text-stone-600">{c.sellerName}</td>
                  <td className="py-2.5 px-4 font-mono font-medium">₹{c.price}</td>
                  <td className="py-2.5 px-4 font-mono text-emerald-800 font-bold">{c.trustProfile.overallTrustScore}/100</td>
                  <td className="py-2.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-100 text-stone-800">
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB: REPORTS */}
      {activeAdminTab === 'reports' && (
        <div className="space-y-4">
          {reports.map(rep => (
            <div key={rep.id} className="p-4 bg-white rounded-xl border border-stone-200 shadow-xs text-xs space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-bold text-amber-800 uppercase tracking-wide text-[10px]">{rep.reason}</span>
                  <h3 className="font-bold text-stone-900 mt-0.5">{rep.targetTitle}</h3>
                  <div className="text-stone-500 text-[11px]">Reported by {rep.reporterName}</div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                  {rep.status}
                </span>
              </div>
              <p className="text-stone-700 bg-stone-50 p-2 rounded">{rep.explanation}</p>
              {rep.status !== 'Resolved' && (
                <button
                  onClick={() => handleResolveReport(rep.id)}
                  className="px-3 py-1 bg-emerald-800 text-white rounded text-xs font-semibold cursor-pointer"
                >
                  Mark Resolved
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* TAB: SAFETY RULES */}
      {activeAdminTab === 'safety' && (
        <div className="space-y-4 text-xs">
          <div className="text-stone-500">
            Configured safety detection patterns that automatically inject hazard warnings into matching components and projects:
          </div>
          {safetyRules.map(rule => (
            <div key={rule.id} className="p-4 bg-white rounded-xl border border-stone-200 shadow-xs space-y-1">
              <div className="flex justify-between font-bold text-stone-900">
                <span>{rule.warningTitle}</span>
                <span className="text-red-700 uppercase font-mono">{rule.riskLevel}</span>
              </div>
              <div className="text-stone-500 font-mono text-[11px]">Regex Match: {rule.pattern}</div>
              <p className="text-stone-700 mt-1">{rule.instructions}</p>
            </div>
          ))}
        </div>
      )}

      {/* TAB: SUSTAINABILITY FACTORS */}
      {activeAdminTab === 'sustainability' && (
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs text-xs">
          <table className="w-full text-left">
            <thead className="bg-stone-50 text-stone-600 border-b border-stone-200">
              <tr>
                <th className="py-2.5 px-4">Category</th>
                <th className="py-2.5 px-4">Avg Mass (g)</th>
                <th className="py-2.5 px-4">Reuse Factor</th>
                <th className="py-2.5 px-4">CO2e Saved (kg/g)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {sustainabilityFactors.map(f => (
                <tr key={f.category}>
                  <td className="py-2.5 px-4 font-semibold text-stone-900">{f.category}</td>
                  <td className="py-2.5 px-4 font-mono">{f.estimatedMassGrams}g</td>
                  <td className="py-2.5 px-4 font-mono">{f.reuseFactor}</td>
                  <td className="py-2.5 px-4 font-mono">{f.carbonAvoidedKgPerGram}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB: AUDIT LOGS */}
      {activeAdminTab === 'audit' && (
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs text-xs">
          <div className="p-3 bg-stone-50 border-b border-stone-200 font-semibold text-stone-700">
            System Event & Security Audit Trail
          </div>
          <div className="divide-y divide-stone-100 max-h-[500px] overflow-y-auto">
            {auditLogs.map(log => (
              <div key={log.id} className="p-3 hover:bg-stone-50 space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-mono text-stone-400">{new Date(log.timestamp).toLocaleString()}</span>
                  <span className="font-mono font-bold text-emerald-800">{log.action}</span>
                </div>
                <div className="text-stone-800">
                  <span className="font-semibold">{log.actor}</span> ({log.actorRole}) → <span className="font-mono text-stone-600">{log.target}</span>
                </div>
                <div className="text-[11px] text-stone-500">{log.details}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
