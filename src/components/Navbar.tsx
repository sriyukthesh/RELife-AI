import React, { useState } from 'react';
import {
  Recycle,
  ShoppingBag,
  Cpu,
  Layers,
  Sparkles,
  BarChart3,
  Package,
  Wrench,
  Users,
  ShieldCheck,
  Menu,
  X,
  Repeat,
  ShoppingBasket
} from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  currentUser: User;
  onSwitchUser: (role: 'USER' | 'ADMIN') => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onSwitchUser,
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  onOpenAuth
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAdmin = currentUser.role === 'ADMIN';

  // Navigation items strictly segregated by role
  // In the admin profile: NO Building the project, Projects, My Inventory, Exchange, Teams, Sell/List.
  const navItems = isAdmin
    ? [
        { id: 'admin', label: 'Admin Console', icon: ShieldCheck, highlight: true },
        { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
        { id: 'impact', label: 'Circularity Impact', icon: BarChart3 },
        { id: 'orders', label: 'Orders & Audits', icon: Package }
      ]
    : [
        { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
        { id: 'sell', label: 'Sell / List', icon: Layers },
        { id: 'inventory', label: 'My Inventory', icon: Package },
        { id: 'build-what-i-have', label: 'Build What I Have', icon: Wrench, highlight: true },
        { id: 'projects', label: 'Projects', icon: Cpu },
        { id: 'advisor', label: 'AI Advisor', icon: Sparkles },
        { id: 'impact', label: 'Impact', icon: BarChart3 },
        { id: 'exchange', label: 'Exchange', icon: Repeat },
        { id: 'teams', label: 'Teams', icon: Users }
      ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => setActiveTab(isAdmin ? 'admin' : 'home')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-800 flex items-center justify-center text-white shadow-sm group-hover:bg-emerald-700 transition-colors">
                <Recycle className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-stone-900 flex items-center gap-1.5">
                  RELIFE
                </span>
                <span className="block text-[10px] uppercase tracking-wider text-emerald-700 font-bold -mt-1">
                  Circular Electronics
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      isActive
                        ? item.highlight
                          ? 'bg-emerald-900 text-white font-semibold'
                          : 'bg-stone-100 text-stone-900 font-semibold'
                        : item.highlight
                        ? 'text-emerald-800 hover:bg-emerald-50'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Action Icons & Profile Switcher */}
          <div className="flex items-center gap-3">
            {/* Quick Demo Switcher Button for easy testing */}
            <button
              onClick={() => onSwitchUser(isAdmin ? 'USER' : 'ADMIN')}
              className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md border cursor-pointer transition-colors ${
                isAdmin
                  ? 'bg-stone-100 text-stone-700 border-stone-300 hover:bg-stone-200'
                  : 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
              }`}
            >
              <span>{isAdmin ? 'Switch to Maker' : 'Switch to Admin'}</span>
            </button>

            {/* Cart Trigger */}
            {!isAdmin && (
              <button
                onClick={onOpenCart}
                className="relative p-2 text-stone-700 hover:text-emerald-800 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-700 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </button>
            )}

            {/* User Profile / Status */}
            <div className="flex items-center gap-2 pl-2 border-l border-stone-200">
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-2 text-left p-1 rounded-lg hover:bg-stone-50 cursor-pointer"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-600/30"
                />
                <div className="hidden sm:block">
                  <div className="text-xs font-semibold text-stone-900 leading-tight flex items-center gap-1.5">
                    {currentUser.name}
                    {isAdmin ? (
                      <span className="text-[10px] text-amber-700 font-bold bg-amber-100 px-1.5 py-0.5 rounded">ADMIN</span>
                    ) : (
                      <span className="text-[10px] text-emerald-700 font-medium">{currentUser.points} pts</span>
                    )}
                  </div>
                  <div className="text-[10px] text-stone-500">{currentUser.location}</div>
                </div>
              </button>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-md"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-2 pb-4 space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg text-left cursor-pointer ${
                  isActive
                    ? 'bg-emerald-900 text-white font-medium'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2 border-t border-stone-100">
            <button
              onClick={() => {
                onSwitchUser(isAdmin ? 'USER' : 'ADMIN');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 text-xs font-semibold text-emerald-800"
            >
              {isAdmin ? 'Switch to Maker User' : 'Switch to Admin Console'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
