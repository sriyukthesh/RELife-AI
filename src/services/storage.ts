import {
  User,
  ComponentItem,
  Project,
  Order,
  CartItem,
  ProjectTeam,
  ComponentRequest,
  ReuseCertificate,
  AuditLog,
  Report,
  SafetyRule,
  SustainabilityFactor
} from '../types';
import { mockUsers } from '../data/mockUsers';
import { mockProjects } from '../data/mockProjects';
import { mockComponents } from '../data/mockComponents';
import {
  mockOrders,
  mockProjectTeams,
  mockComponentRequests,
  mockReuseCertificates,
  mockAuditLogs,
  mockReports,
  mockSafetyRules,
  mockSustainabilityFactors
} from '../data/mockData';
import { getComponentImage } from '../data/componentImages';

const STORAGE_KEYS = {
  CURRENT_USER: 'relife_current_user',
  USERS: 'relife_users',
  COMPONENTS: 'relife_components',
  PROJECTS: 'relife_projects',
  ORDERS: 'relife_orders',
  CART: 'relife_cart',
  TEAMS: 'relife_teams',
  REQUESTS: 'relife_requests',
  CERTIFICATES: 'relife_certificates',
  AUDIT_LOGS: 'relife_audit_logs',
  REPORTS: 'relife_reports',
  SAFETY_RULES: 'relife_safety_rules',
  SUSTAINABILITY: 'relife_sustainability'
};

function getStored<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw);
  } catch (e) {
    console.error('Storage parse error for', key, e);
    return defaultValue;
  }
}

function setStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage save error for', key, e);
  }
}

export class RELifeStore {
  // Current User
  static getCurrentUser(): User {
    return getStored<User>(STORAGE_KEYS.CURRENT_USER, mockUsers[0]);
  }

  static setCurrentUser(user: User): void {
    setStored(STORAGE_KEYS.CURRENT_USER, user);
  }

  static switchUserRole(role: 'USER' | 'ADMIN'): User {
    const targetUser = role === 'ADMIN' ? mockUsers[1] : mockUsers[0];
    this.setCurrentUser(targetUser);
    this.logAction(
      `${targetUser.name} (${targetUser.id})`,
      targetUser.role,
      'SWITCH_PROFILE',
      `Switched session to ${role} profile`,
      'SUCCESS',
      `Active account: ${targetUser.email}`
    );
    return targetUser;
  }

  // Users
  static getUsers(): User[] {
    return getStored<User[]>(STORAGE_KEYS.USERS, mockUsers);
  }

  static addUser(user: User): void {
    const users = this.getUsers();
    users.unshift(user);
    setStored(STORAGE_KEYS.USERS, users);
    this.setCurrentUser(user);
  }

  // Components / Marketplace & Inventory with Authentic Original Images
  static getComponents(): ComponentItem[] {
    const stored = getStored<ComponentItem[]>(STORAGE_KEYS.COMPONENTS, mockComponents);
    // Guarantee that authentic, original component photos are attached for all known components
    // while keeping real photos captured live by users via the webcam/camera (data:image)
    return stored.map(comp => {
      // If user took a live camera photo, preserve the user's live capture
      if (comp.images.front && comp.images.front.startsWith('data:image/jpeg')) {
        return comp;
      }
      // For all catalog and existing components, provide the authentic original hardware photo
      const orig = getComponentImage(comp.name, comp.category);
      return {
        ...comp,
        images: {
          ...comp.images,
          front: orig.front,
          back: comp.images.back && comp.images.back.startsWith('data:image/jpeg') ? comp.images.back : orig.back
        }
      };
    });
  }

  static getUserInventory(userId: string): ComponentItem[] {
    const all = this.getComponents();
    return all.filter(c => c.sellerId === userId);
  }

  static addComponent(component: ComponentItem): void {
    const all = this.getComponents();
    all.unshift(component);
    setStored(STORAGE_KEYS.COMPONENTS, all);

    const currentUser = this.getCurrentUser();
    this.logAction(
      `${currentUser.name} (${currentUser.id})`,
      currentUser.role,
      'LISTING_CREATED',
      `${component.id} (${component.name})`,
      'SUCCESS',
      `Condition: ${component.condition}, Trust Score: ${component.trustProfile.overallTrustScore}`
    );
  }

  static updateComponent(updated: ComponentItem): void {
    const all = this.getComponents();
    const idx = all.findIndex(c => c.id === updated.id);
    if (idx !== -1) {
      all[idx] = updated;
      setStored(STORAGE_KEYS.COMPONENTS, all);
    }
  }

  // Cart
  static getCart(): CartItem[] {
    return getStored<CartItem[]>(STORAGE_KEYS.CART, []);
  }

  static addToCart(component: ComponentItem, quantity: number = 1): void {
    const cart = this.getCart();
    const existing = cart.find(i => i.componentId === component.id);
    if (existing) {
      existing.quantity = Math.min(component.quantity, existing.quantity + quantity);
    } else {
      cart.push({ componentId: component.id, component, quantity: Math.min(component.quantity, quantity) });
    }
    setStored(STORAGE_KEYS.CART, cart);
  }

  static updateCartQuantity(componentId: string, quantity: number): void {
    let cart = this.getCart();
    if (quantity <= 0) {
      cart = cart.filter(i => i.componentId !== componentId);
    } else {
      const item = cart.find(i => i.componentId === componentId);
      if (item) item.quantity = quantity;
    }
    setStored(STORAGE_KEYS.CART, cart);
  }

  static removeFromCart(componentId: string): void {
    const cart = this.getCart().filter(i => i.componentId !== componentId);
    setStored(STORAGE_KEYS.CART, cart);
  }

  static clearCart(): void {
    setStored(STORAGE_KEYS.CART, []);
  }

  // Orders
  static getOrders(): Order[] {
    return getStored<Order[]>(STORAGE_KEYS.ORDERS, mockOrders);
  }

  static createOrder(
    buyer: User,
    shippingAddress: { fullName: string; address: string; city: string; postalCode: string },
    paymentMethod: 'UPI' | 'Card' | 'Cash/Offline' | 'Demo Payment'
  ): Order {
    const cart = this.getCart();
    if (cart.length === 0) throw new Error('Cart is empty');

    let subtotal = 0;
    let totalEwasteReusedGrams = 0;
    const items = cart.map(i => {
      const itemTotal = i.component.price * i.quantity;
      const itemEwaste = (i.component.sustainabilityImpactGrams || 50) * i.quantity;
      subtotal += itemTotal;
      totalEwasteReusedGrams += itemEwaste;
      return {
        componentId: i.component.id,
        name: i.component.name,
        quantity: i.quantity,
        price: i.component.price,
        sustainabilityImpactGrams: itemEwaste
      };
    });

    const shipping = subtotal > 500 ? 0 : 40;
    const total = subtotal + shipping;
    const orderId = `ORD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: orderId,
      buyerId: buyer.id,
      buyerName: buyer.name,
      items,
      subtotal,
      shipping,
      total,
      totalEwasteReusedGrams,
      potentialProjectsEnabled: Math.min(items.length * 2, 8),
      shippingAddress,
      paymentMethod,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    // Reduce stock and update component states
    const allComponents = this.getComponents();
    cart.forEach(cartItem => {
      const found = allComponents.find(c => c.id === cartItem.componentId);
      if (found) {
        found.quantity = Math.max(0, found.quantity - cartItem.quantity);
        if (found.quantity === 0) {
          found.lifecycleState = 'Sold';
          found.status = 'sold';
        }
      }
    });
    setStored(STORAGE_KEYS.COMPONENTS, allComponents);

    // Save order
    const orders = this.getOrders();
    orders.unshift(newOrder);
    setStored(STORAGE_KEYS.ORDERS, orders);

    // Clear cart
    this.clearCart();

    // Update buyer stats & award reuse points
    buyer.points += Math.round(total / 10) + 50;
    buyer.componentsReusedCount += items.reduce((a, b) => a + b.quantity, 0);
    buyer.ewasteAvoidedGrams += totalEwasteReusedGrams;
    this.setCurrentUser(buyer);

    // Log action
    this.logAction(
      `${buyer.name} (${buyer.id})`,
      buyer.role,
      'ORDER_CREATED',
      newOrder.id,
      'SUCCESS',
      `Payment: ${paymentMethod}, Total: ₹${total}, Avoided: ${totalEwasteReusedGrams}g e-waste`
    );

    return newOrder;
  }

  // Projects
  static getProjects(): Project[] {
    return getStored<Project[]>(STORAGE_KEYS.PROJECTS, mockProjects);
  }

  // Teams
  static getTeams(): ProjectTeam[] {
    return getStored<ProjectTeam[]>(STORAGE_KEYS.TEAMS, mockProjectTeams);
  }

  static addTeam(team: ProjectTeam): void {
    const teams = this.getTeams();
    teams.unshift(team);
    setStored(STORAGE_KEYS.TEAMS, teams);
  }

  static updateTeam(updated: ProjectTeam): void {
    const teams = this.getTeams();
    const idx = teams.findIndex(t => t.id === updated.id);
    if (idx !== -1) {
      teams[idx] = updated;
      setStored(STORAGE_KEYS.TEAMS, teams);
    }
  }

  // Requests
  static getRequests(): ComponentRequest[] {
    return getStored<ComponentRequest[]>(STORAGE_KEYS.REQUESTS, mockComponentRequests);
  }

  static addRequest(req: ComponentRequest): void {
    const requests = this.getRequests();
    requests.unshift(req);
    setStored(STORAGE_KEYS.REQUESTS, requests);
  }

  static addOfferToRequest(requestId: string, offer: { userId: string; userName: string; componentId: string; price: number; note: string }): void {
    const requests = this.getRequests();
    const req = requests.find(r => r.id === requestId);
    if (req) {
      req.offers.push(offer);
      setStored(STORAGE_KEYS.REQUESTS, requests);
    }
  }

  // Certificates
  static getCertificates(): ReuseCertificate[] {
    return getStored<ReuseCertificate[]>(STORAGE_KEYS.CERTIFICATES, mockReuseCertificates);
  }

  static issueCertificate(
    user: User,
    project: Project,
    componentsReused: string[],
    circularityScore: number
  ): ReuseCertificate {
    const certNumber = `RL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const verificationCode = `RELIFE-VERIFIED-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const newCert: ReuseCertificate = {
      id: `cert-${Date.now()}`,
      certificateNumber: certNumber,
      userId: user.id,
      userName: user.name,
      projectId: project.id,
      projectTitle: project.title,
      componentsReused,
      totalWasteAvoidedGrams: project.estimatedEwasteAvoidedGrams,
      circularityScore,
      dateIssued: new Date().toISOString().split('T')[0],
      verificationCode
    };

    const certs = this.getCertificates();
    certs.unshift(newCert);
    setStored(STORAGE_KEYS.CERTIFICATES, certs);

    // Update user stats
    user.projectsCompletedCount += 1;
    user.ewasteAvoidedGrams += project.estimatedEwasteAvoidedGrams;
    user.points += 150;
    this.setCurrentUser(user);

    this.logAction(
      `${user.name} (${user.id})`,
      user.role,
      'CERTIFICATE_GENERATED',
      certNumber,
      'SUCCESS',
      `Project: ${project.title}, Diverted: ${project.estimatedEwasteAvoidedGrams}g`
    );

    return newCert;
  }

  // Audit Logs
  static getAuditLogs(): AuditLog[] {
    return getStored<AuditLog[]>(STORAGE_KEYS.AUDIT_LOGS, mockAuditLogs);
  }

  static logAction(
    actor: string,
    actorRole: string,
    action: string,
    target: string,
    result: 'SUCCESS' | 'WARNING' | 'FAILED',
    details: string
  ): void {
    const logs = this.getAuditLogs();
    const newLog: AuditLog = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      actor,
      actorRole,
      action,
      target,
      result,
      details
    };
    logs.unshift(newLog);
    if (logs.length > 100) logs.pop();
    setStored(STORAGE_KEYS.AUDIT_LOGS, logs);
  }

  // Reports
  static getReports(): Report[] {
    return getStored<Report[]>(STORAGE_KEYS.REPORTS, mockReports);
  }

  static addReport(report: Report): void {
    const reports = this.getReports();
    reports.unshift(report);
    setStored(STORAGE_KEYS.REPORTS, reports);
    this.logAction(
      `${report.reporterName} (${report.reporterId})`,
      'USER',
      'REPORT_SUBMITTED',
      `${report.targetType}:${report.targetId}`,
      'WARNING',
      `Reason: ${report.reason} - ${report.explanation}`
    );
  }

  static updateReportStatus(reportId: string, status: Report['status'], adminNotes?: string): void {
    const reports = this.getReports();
    const r = reports.find(item => item.id === reportId);
    if (r) {
      r.status = status;
      if (adminNotes) r.adminNotes = adminNotes;
      setStored(STORAGE_KEYS.REPORTS, reports);
    }
  }

  // Safety Rules & Sustainability
  static getSafetyRules(): SafetyRule[] {
    return getStored<SafetyRule[]>(STORAGE_KEYS.SAFETY_RULES, mockSafetyRules);
  }

  static updateSafetyRules(rules: SafetyRule[]): void {
    setStored(STORAGE_KEYS.SAFETY_RULES, rules);
  }

  static getSustainabilityFactors(): SustainabilityFactor[] {
    return getStored<SustainabilityFactor[]>(STORAGE_KEYS.SUSTAINABILITY, mockSustainabilityFactors);
  }

  static updateSustainabilityFactors(factors: SustainabilityFactor[]): void {
    setStored(STORAGE_KEYS.SUSTAINABILITY, factors);
  }

  // Reset to Demo Seed Data
  static resetToDemoData(): void {
    localStorage.removeItem(STORAGE_KEYS.USERS);
    localStorage.removeItem(STORAGE_KEYS.COMPONENTS);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.CART);
    localStorage.removeItem(STORAGE_KEYS.TEAMS);
    localStorage.removeItem(STORAGE_KEYS.REQUESTS);
    localStorage.removeItem(STORAGE_KEYS.CERTIFICATES);
    localStorage.removeItem(STORAGE_KEYS.AUDIT_LOGS);
    localStorage.removeItem(STORAGE_KEYS.REPORTS);
    localStorage.removeItem(STORAGE_KEYS.SAFETY_RULES);
    localStorage.removeItem(STORAGE_KEYS.SUSTAINABILITY);
    this.setCurrentUser(mockUsers[0]);
  }
}

// Backward-compatible alias
export const SecondLifeStore = RELifeStore;
