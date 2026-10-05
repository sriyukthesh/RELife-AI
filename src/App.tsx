import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeLanding } from './components/home/HomeLanding';
import { MarketplaceView } from './components/marketplace/MarketplaceView';
import { ComponentDetailModal } from './components/marketplace/ComponentDetailModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/cart/CheckoutModal';
import { SellWizard } from './components/sell/SellWizard';
import { BuildWhatIHaveView } from './components/build/BuildWhatIHaveView';
import { ProjectsView, ProjectBuilderModal } from './components/projects/ProjectBuilderModal';
import { CertificateModal } from './components/certificates/CertificateModal';
import { AiAdvisorView } from './components/advisor/AiAdvisorView';
import { InventoryView } from './components/inventory/InventoryView';
import { ImpactView } from './components/impact/ImpactView';
import { ExchangeView } from './components/exchange/ExchangeView';
import { TeamsView } from './components/teams/TeamsView';
import { OrdersView } from './components/orders/OrdersView';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AuthModal } from './components/auth/AuthModal';
import { ReportModal } from './components/common/ReportModal';

import { RELifeStore } from './services/storage';
import { ComponentItem, Project, ReuseCertificate, User, CartItem, Order, ProjectMatchResult } from './types';
import { matchProjectWithInventory } from './services/matchingEngine';

export const App: React.FC = () => {
  // Global Store State
  const [currentUser, setCurrentUser] = useState<User>(() => RELifeStore.getCurrentUser());
  const [components, setComponents] = useState<ComponentItem[]>(() => RELifeStore.getComponents());
  const [projects, setProjects] = useState<Project[]>(() => RELifeStore.getProjects());
  const [cart, setCart] = useState<CartItem[]>(() => RELifeStore.getCart());
  const [orders, setOrders] = useState<Order[]>(() => RELifeStore.getOrders());
  const [certificates, setCertificates] = useState<ReuseCertificate[]>(() => RELifeStore.getCertificates());
  const [teams, setTeams] = useState(() => RELifeStore.getTeams());
  const [requests, setRequests] = useState(() => RELifeStore.getRequests());
  const [reports, setReports] = useState(() => RELifeStore.getReports());
  const [auditLogs, setAuditLogs] = useState(() => RELifeStore.getAuditLogs());
  const [safetyRules, setSafetyRules] = useState(() => RELifeStore.getSafetyRules());
  const [sustainabilityFactors, setSustainabilityFactors] = useState(() => RELifeStore.getSustainabilityFactors());

  // Navigation: Admins start on admin console
  const [activeTab, setActiveTab] = useState<string>(() => (currentUser.role === 'ADMIN' ? 'admin' : 'home'));

  // Modals
  const [selectedComponent, setSelectedComponent] = useState<ComponentItem | null>(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [builderProject, setBuilderProject] = useState<Project | null>(null);
  const [builderMatchResult, setBuilderMatchResult] = useState<ProjectMatchResult | null>(null);
  const [viewingCertificate, setViewingCertificate] = useState<ReuseCertificate | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [reportingComponent, setReportingComponent] = useState<ComponentItem | null>(null);

  // Sync state helpers
  const refreshAllState = () => {
    setCurrentUser(RELifeStore.getCurrentUser());
    setComponents(RELifeStore.getComponents());
    setProjects(RELifeStore.getProjects());
    setCart(RELifeStore.getCart());
    setOrders(RELifeStore.getOrders());
    setCertificates(RELifeStore.getCertificates());
    setTeams(RELifeStore.getTeams());
    setRequests(RELifeStore.getRequests());
    setReports(RELifeStore.getReports());
    setAuditLogs(RELifeStore.getAuditLogs());
    setSafetyRules(RELifeStore.getSafetyRules());
    setSustainabilityFactors(RELifeStore.getSustainabilityFactors());
  };

  const handleRoleSwitch = (role: 'USER' | 'ADMIN') => {
    const newUser = RELifeStore.switchUserRole(role);
    setCurrentUser(newUser);
    if (role === 'ADMIN') {
      setActiveTab('admin');
    } else {
      setActiveTab('home');
    }
    refreshAllState();
  };

  // Cart actions
  const handleAddToCart = (component: ComponentItem) => {
    RELifeStore.addToCart(component, 1);
    setCart(RELifeStore.getCart());
  };

  const handleBuyNow = (component: ComponentItem) => {
    RELifeStore.addToCart(component, 1);
    setCart(RELifeStore.getCart());
    setSelectedComponent(null);
    setCheckoutModalOpen(true);
  };

  const handleUpdateCartQuantity = (componentId: string, quantity: number) => {
    RELifeStore.updateCartQuantity(componentId, quantity);
    setCart(RELifeStore.getCart());
  };

  const handleRemoveFromCart = (componentId: string) => {
    RELifeStore.removeFromCart(componentId);
    setCart(RELifeStore.getCart());
  };

  // User inventory
  const userInventory = components.filter(c => c.sellerId === currentUser.id);

  // Open Project Builder
  const handleOpenProjectBuilder = (project: Project, matchResult?: ProjectMatchResult | null) => {
    const match = matchResult || matchProjectWithInventory(project, userInventory, components);
    setBuilderProject(project);
    setBuilderMatchResult(match);
  };

  // Project Completed
  const handleCompleteProject = (project: Project, reusedComponents: string[]) => {
    const circularityScore = Math.floor(90 + Math.random() * 8);
    const newCert = RELifeStore.issueCertificate(
      currentUser,
      project,
      reusedComponents,
      circularityScore
    );
    refreshAllState();
    setBuilderProject(null);
    setViewingCertificate(newCert);
  };

  // Listing success
  const handleListingSuccess = (newComp: ComponentItem) => {
    refreshAllState();
    setSelectedComponent(newComp);
    setActiveTab('marketplace');
  };

  const isAdmin = currentUser.role === 'ADMIN';

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col text-stone-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation Bar */}
      <Navbar
        currentUser={currentUser}
        onSwitchUser={handleRoleSwitch}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
        onOpenCart={() => setCartDrawerOpen(true)}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* For Admin users, enforce that maker modules (Build, Projects, Inventory, Exchange, Teams, Sell) are not accessible */}
        {isAdmin ? (
          <>
            {activeTab === 'admin' && (
              <AdminDashboard
                currentUser={currentUser}
                components={components}
                orders={orders}
                users={RELifeStore.getUsers()}
                reports={reports}
                auditLogs={auditLogs}
                safetyRules={safetyRules}
                sustainabilityFactors={sustainabilityFactors}
                onRefreshData={refreshAllState}
              />
            )}

            {activeTab === 'marketplace' && (
              <MarketplaceView
                components={components}
                onSelectComponent={setSelectedComponent}
                onAddToCart={handleAddToCart}
                onNavigateToSell={() => setActiveTab('admin')}
              />
            )}

            {activeTab === 'impact' && (
              <ImpactView
                currentUser={currentUser}
                allComponents={components}
                certificates={certificates}
                onOpenCertificate={setViewingCertificate}
                onNavigateToMarketplace={() => setActiveTab('marketplace')}
              />
            )}

            {activeTab === 'orders' && (
              <OrdersView
                orders={orders}
                onNavigateToMarketplace={() => setActiveTab('marketplace')}
              />
            )}

            {/* If an admin URL / state ever lands on a maker tab, seamlessly redirect back to admin console */}
            {['build-what-i-have', 'projects', 'inventory', 'exchange', 'teams', 'sell', 'home', 'advisor'].includes(activeTab) && (
              <div className="max-w-2xl mx-auto p-12 text-center space-y-4">
                <div className="text-amber-800 font-bold text-sm">Admin Access Mode</div>
                <p className="text-xs text-stone-600">
                  Maker actions (Building, Projects, Inventory, Exchange, Teams, Selling) are reserved for maker profiles.
                </p>
                <button
                  onClick={() => setActiveTab('admin')}
                  className="px-4 py-2 text-xs font-semibold bg-emerald-800 text-white rounded-md cursor-pointer"
                >
                  Return to Admin Console
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            {activeTab === 'home' && (
              <HomeLanding
                onNavigateTab={setActiveTab}
                featuredProjects={projects}
                totalComponentsCount={components.length}
              />
            )}

            {activeTab === 'marketplace' && (
              <MarketplaceView
                components={components}
                onSelectComponent={setSelectedComponent}
                onAddToCart={handleAddToCart}
                onNavigateToSell={() => setActiveTab('sell')}
              />
            )}

            {activeTab === 'sell' && (
              <SellWizard
                currentUser={currentUser}
                onListingSuccess={handleListingSuccess}
                onCancel={() => setActiveTab('marketplace')}
              />
            )}

            {activeTab === 'inventory' && (
              <InventoryView
                currentUser={currentUser}
                inventory={userInventory}
                onNavigateToSell={() => setActiveTab('sell')}
                onNavigateToBuildWhatIHave={() => setActiveTab('build-what-i-have')}
                onSelectComponent={setSelectedComponent}
              />
            )}

            {activeTab === 'build-what-i-have' && (
              <BuildWhatIHaveView
                userInventory={userInventory}
                allProjects={projects}
                marketplaceComponents={components}
                onOpenProjectBuilder={handleOpenProjectBuilder}
                onAddToCart={handleAddToCart}
                onNavigateToMarketplace={() => setActiveTab('marketplace')}
                onNavigateToSell={() => setActiveTab('sell')}
              />
            )}

            {activeTab === 'projects' && (
              <ProjectsView
                projects={projects}
                userInventory={userInventory}
                marketplaceComponents={components}
                onOpenProjectBuilder={handleOpenProjectBuilder}
              />
            )}

            {activeTab === 'advisor' && (
              <AiAdvisorView
                currentUser={currentUser}
                userInventory={userInventory}
                allProjects={projects}
                marketplaceComponents={components}
                onOpenProject={projId => {
                  const p = projects.find(item => item.id === projId);
                  if (p) handleOpenProjectBuilder(p);
                }}
              />
            )}

            {activeTab === 'impact' && (
              <ImpactView
                currentUser={currentUser}
                allComponents={components}
                certificates={certificates}
                onOpenCertificate={setViewingCertificate}
                onNavigateToMarketplace={() => setActiveTab('marketplace')}
              />
            )}

            {activeTab === 'exchange' && (
              <ExchangeView
                currentUser={currentUser}
                requests={requests}
                onRefreshRequests={refreshAllState}
              />
            )}

            {activeTab === 'teams' && (
              <TeamsView
                currentUser={currentUser}
                teams={teams}
                onRefreshTeams={refreshAllState}
              />
            )}

            {activeTab === 'orders' && (
              <OrdersView
                orders={orders}
                onNavigateToMarketplace={() => setActiveTab('marketplace')}
              />
            )}
          </>
        )}
      </main>

      {/* Modals & Drawers */}
      <ComponentDetailModal
        component={selectedComponent}
        onClose={() => setSelectedComponent(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onOpenReport={comp => setReportingComponent(comp)}
        onSelectProject={projId => {
          const p = projects.find(item => item.id === projId);
          if (p) handleOpenProjectBuilder(p);
        }}
        allProjects={projects}
      />

      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => setCheckoutModalOpen(true)}
      />

      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        currentUser={currentUser}
        cart={cart}
        onOrderSuccess={() => {
          refreshAllState();
        }}
      />

      <ProjectBuilderModal
        project={builderProject}
        matchResult={builderMatchResult}
        currentUser={currentUser}
        onClose={() => {
          setBuilderProject(null);
          setBuilderMatchResult(null);
        }}
        onCompleteProject={handleCompleteProject}
        onAddToCart={handleAddToCart}
      />

      <CertificateModal
        certificate={viewingCertificate}
        onClose={() => setViewingCertificate(null)}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        currentUser={currentUser}
        onUserChange={u => {
          setCurrentUser(u);
          refreshAllState();
        }}
      />

      <ReportModal
        isOpen={!!reportingComponent}
        onClose={() => setReportingComponent(null)}
        component={reportingComponent}
        currentUser={currentUser}
        onReportSubmitted={refreshAllState}
      />

      {/* Footer */}
      <Footer onSelectTab={setActiveTab} isAdmin={isAdmin} />
    </div>
  );
};

export default App;
