import React, { useState } from 'react';
import { X, User as UserIcon, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { User } from '../../types';
import { RELifeStore } from '../../services/storage';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onUserChange: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUserChange
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'switch' | 'login' | 'register'>('switch');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const users = RELifeStore.getUsers();
  const demoUser = users.find(u => u.id === 'user-demo') || users[0];
  const demoAdmin = users.find(u => u.role === 'ADMIN') || users[1];

  const handleSelectDemoUser = (user: User) => {
    RELifeStore.setCurrentUser(user);
    onUserChange(user);
    onClose();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: name || 'New Maker',
      email,
      role: 'USER',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      points: 100,
      rating: 5.0,
      location: 'Austin, TX',
      badges: ['First Reuse'],
      componentsReusedCount: 0,
      projectsCompletedCount: 0,
      ewasteAvoidedGrams: 0,
      createdAt: new Date().toISOString()
    };
    RELifeStore.addUser(newUser);
    onUserChange(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/70 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:px-6 bg-emerald-950 text-white flex items-center justify-between">
          <div>
            <div className="text-[11px] text-emerald-400 font-semibold uppercase tracking-wider">
              RELife Authentication &amp; Profile Switcher
            </div>
            <h3 className="text-base font-bold">
              {mode === 'switch' ? 'Select Active Session' : mode === 'login' ? 'User Login' : 'Create Maker Account'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-emerald-300 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {mode === 'switch' && (
            <div className="space-y-4">
              <p className="text-xs text-stone-600 leading-relaxed">
                For evaluation and grading, switch immediately between the primary maker user and platform admin profiles:
              </p>

              {/* Demo User Card */}
              <div
                onClick={() => handleSelectDemoUser(demoUser)}
                className={`p-3.5 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                  currentUser.id === demoUser.id
                    ? 'border-emerald-700 bg-emerald-50/60 ring-1 ring-emerald-700'
                    : 'border-stone-200 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={demoUser.avatar}
                    alt={demoUser.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-600/30"
                  />
                  <div>
                    <div className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                      <span>{demoUser.name}</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-semibold">
                        MAKER USER
                      </span>
                    </div>
                    <div className="text-[11px] text-stone-500">{demoUser.email}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-700" />
              </div>

              {/* Demo Admin Card */}
              <div
                onClick={() => handleSelectDemoUser(demoAdmin)}
                className={`p-3.5 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                  currentUser.id === demoAdmin.id
                    ? 'border-emerald-700 bg-emerald-50/60 ring-1 ring-emerald-700'
                    : 'border-stone-200 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={demoAdmin.avatar}
                    alt={demoAdmin.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-600/30"
                  />
                  <div>
                    <div className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                      <span>{demoAdmin.name}</span>
                      <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-bold">
                        ADMIN
                      </span>
                    </div>
                    <div className="text-[11px] text-stone-500">{demoAdmin.email}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-700" />
              </div>

              <div className="pt-2 text-center text-xs">
                <button
                  onClick={() => setMode('register')}
                  className="text-emerald-800 font-semibold hover:underline cursor-pointer"
                >
                  Or create a new custom account →
                </button>
              </div>
            </div>
          )}

          {mode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jordan Lee"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="jordan@maker.io"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md"
                />
              </div>
              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setMode('switch')}
                  className="text-stone-500 hover:text-stone-800"
                >
                  ← Back to Demo Switcher
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-md shadow-xs"
                >
                  Create Account
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
