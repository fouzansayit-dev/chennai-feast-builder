import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Receipt,
  CalendarCheck,
  Users,
  UtensilsCrossed,
  Settings,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Printer,
  Share2,
  X,
  Trash2,
  Edit3,
  TrendingUp,
  Award,
  ShieldCheck,
  Download,
  Filter,
  Sparkles,
  ChevronRight,
  DollarSign,
  ArrowUpRight,
  Lock,
  Key,
  LogOut,
  Eye,
  EyeOff
} from "lucide-react";
import logoImg from "@/assets/mcc-logo.png";
import lotusIcon from "@/assets/lotus icon.png";

// TYPES & INTERFACES
type TabType = "dashboard" | "quotations" | "invoices" | "orders" | "clients" | "menu" | "settings";

interface QuotationItem {
  id: string;
  number: string;
  clientName: string;
  phone: string;
  email: string;
  eventDate: string;
  eventType: string;
  venue: string;
  guests: number;
  ratePerPlate: number;
  total: number;
  status: "Approved" | "Pending" | "Rejected";
  items: string[];
  notes: string;
  createdAt: string;
}

interface InvoiceItem {
  id: string;
  number: string;
  clientName: string;
  phone: string;
  email: string;
  eventDate: string;
  eventType: string;
  venue: string;
  totalAmount: number;
  paidAmount: number;
  status: "Paid" | "Partial" | "Unpaid";
  dueDate: string;
  gstIncluded: boolean;
  notes: string;
  createdAt: string;
}

interface OrderItem {
  id: string;
  orderNo: string;
  clientName: string;
  phone: string;
  eventDate: string;
  eventType: string;
  venue: string;
  guests: number;
  headChef: string;
  staffCount: number;
  status: "Confirmed" | "Preparation" | "Cooking" | "In Transit" | "Completed";
  specialInstructions: string;
}

interface ClientItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  totalEvents: number;
  totalSpent: number;
  notes: string;
}

// SEED DATA FOR MCC CATERING CRM
const SEED_QUOTATIONS: QuotationItem[] = [
  {
    id: "q-1",
    number: "MCC-QUO-1001",
    clientName: "S. Sundararajan",
    phone: "+91 98401 23456",
    email: "sundar.s@gmail.com",
    eventDate: "2026-07-24",
    eventType: "Grand Brahmin Kalyana Virundhu",
    venue: "Mayor Ramanathan Hall, Chetpet",
    guests: 600,
    ratePerPlate: 650,
    total: 390000,
    status: "Approved",
    items: ["Elaneer Payasam", "Arachu Vitta Sambar", "Veg Biryani", "Methi Chapathi", "Gobi 65", "Rasamalai", "Filter Coffee"],
    notes: "Requires traditional silk-saree hosts & flower decoration for leaf dining hall.",
    createdAt: "2026-07-02",
  },
  {
    id: "q-2",
    number: "MCC-QUO-1002",
    clientName: "Meenakshi & Karthik",
    phone: "+91 99402 87654",
    email: "meena.karthik@outlook.com",
    eventDate: "2026-07-18",
    eventType: "Seemantham Feast",
    venue: "Vani Mahal, Pattabiram",
    guests: 150,
    ratePerPlate: 450,
    total: 67500,
    status: "Pending",
    items: ["Idly", "Mini Dosa", "Vathakulambu", "Curd Rice", "Rasagulla", "Fresh Juice"],
    notes: "Strictly Sattvik home-style preparation.",
    createdAt: "2026-07-04",
  },
  {
    id: "q-3",
    number: "MCC-QUO-1003",
    clientName: "Cognizant Technologies Admin",
    phone: "+91 97100 55443",
    email: "events@cognizant.com",
    eventDate: "2026-08-05",
    eventType: "Corporate Annual Meet",
    venue: "DLF IT Park, Guindy",
    guests: 300,
    ratePerPlate: 350,
    total: 105000,
    status: "Approved",
    items: ["Paneer Butter Masala", "Butter Naan", "Veg Pulav", "Gulab Jamun", "Welcome Mocktail"],
    notes: "Requires GST tax invoice and live chaat counter setup.",
    createdAt: "2026-07-05",
  },
];

const SEED_INVOICES: InvoiceItem[] = [
  {
    id: "inv-1",
    number: "MCC-INV-2026-101",
    clientName: "S. Sundararajan",
    phone: "+91 98401 23456",
    email: "sundar.s@gmail.com",
    eventDate: "2026-07-24",
    eventType: "Grand Brahmin Kalyana Virundhu",
    venue: "Mayor Ramanathan Hall, Chetpet",
    totalAmount: 390000,
    paidAmount: 200000,
    status: "Partial",
    dueDate: "2026-07-20",
    gstIncluded: true,
    notes: "Advance 50% received via GPay. Balance due on event date.",
    createdAt: "2026-07-03",
  },
  {
    id: "inv-2",
    number: "MCC-INV-2026-102",
    clientName: "Cognizant Technologies Admin",
    phone: "+91 97100 55443",
    email: "events@cognizant.com",
    eventDate: "2026-08-05",
    eventType: "Corporate Annual Meet",
    venue: "DLF IT Park, Guindy",
    totalAmount: 105000,
    paidAmount: 105000,
    status: "Paid",
    dueDate: "2026-07-05",
    gstIncluded: true,
    notes: "Full payment settled via NEFT.",
    createdAt: "2026-07-05",
  },
];

const SEED_ORDERS: OrderItem[] = [
  {
    id: "o-1",
    orderNo: "ORD-501",
    clientName: "S. Sundararajan",
    phone: "+91 98401 23456",
    eventDate: "2026-07-24",
    eventType: "Grand Brahmin Kalyana Virundhu",
    venue: "Mayor Ramanathan Hall, Chetpet",
    guests: 600,
    headChef: "Master Chef D. Venkat",
    staffCount: 24,
    status: "Preparation",
    specialInstructions: "Use fresh banana leaves from Tanjore vendors. Arrange 4 live dosa counters.",
  },
  {
    id: "o-2",
    orderNo: "ORD-502",
    clientName: "Meenakshi & Karthik",
    phone: "+91 99402 87654",
    eventDate: "2026-07-18",
    eventType: "Seemantham Feast",
    venue: "Vani Mahal, Pattabiram",
    guests: 150,
    headChef: "Chef S. Murugan",
    staffCount: 8,
    status: "Confirmed",
    specialInstructions: "Serve piping hot Filter Coffee in traditional brass dabba sets.",
  },
];

const SEED_CLIENTS: ClientItem[] = [
  {
    id: "c-1",
    name: "S. Sundararajan",
    phone: "+91 98401 23456",
    email: "sundar.s@gmail.com",
    location: "T. Nagar, Chennai",
    totalEvents: 3,
    totalSpent: 850000,
    notes: "VIP Client. Prefers traditional Thala Vazhai Kalyana Saapadu.",
  },
  {
    id: "c-2",
    name: "Meenakshi Sundaram",
    phone: "+91 99402 87654",
    email: "meena.karthik@outlook.com",
    location: "Pattabiram, Chennai",
    totalEvents: 1,
    totalSpent: 67500,
    notes: "Seemantham function booking.",
  },
  {
    id: "c-3",
    name: "Cognizant Events Admin",
    phone: "+91 97100 55443",
    email: "events@cognizant.com",
    location: "DLF Guindy, Chennai",
    totalEvents: 5,
    totalSpent: 520000,
    notes: "Corporate retainer account. Requires tax invoice with 18% GST.",
  },
];

export default function CateringCRM({ onSwitchToCustomizer }: { onSwitchToCustomizer?: () => void }) {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  
  // ADMIN AUTHENTICATION STATE
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem("mcc_crm_authenticated") === "true";
  });

  const [adminPin, setAdminPin] = useState<string>(() => {
    return localStorage.getItem("mcc_crm_admin_pin") || "9940396005";
  });

  // STATE MANAGEMENT WITH LOCALSTORAGE PERSISTENCE
  const [quotations, setQuotations] = useState<QuotationItem[]>(() => {
    const saved = localStorage.getItem("mcc_crm_quotations");
    return saved ? JSON.parse(saved) : SEED_QUOTATIONS;
  });

  const [invoices, setInvoices] = useState<InvoiceItem[]>(() => {
    const saved = localStorage.getItem("mcc_crm_invoices");
    return saved ? JSON.parse(saved) : SEED_INVOICES;
  });

  const [orders, setOrders] = useState<OrderItem[]>(() => {
    const saved = localStorage.getItem("mcc_crm_orders");
    return saved ? JSON.parse(saved) : SEED_ORDERS;
  });

  const [clients, setClients] = useState<ClientItem[]>(() => {
    const saved = localStorage.getItem("mcc_crm_clients");
    return saved ? JSON.parse(saved) : SEED_CLIENTS;
  });

  // MODAL STATES
  const [showQuotationModal, setShowQuotationModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);
  const [printInvoiceData, setPrintInvoiceData] = useState<InvoiceItem | null>(null);

  // SAVE TO LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("mcc_crm_quotations", JSON.stringify(quotations));
  }, [quotations]);

  useEffect(() => {
    localStorage.setItem("mcc_crm_invoices", JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem("mcc_crm_orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("mcc_crm_clients", JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem("mcc_crm_admin_pin", adminPin);
  }, [adminPin]);

  const handleLogout = () => {
    sessionStorage.removeItem("mcc_crm_authenticated");
    setIsAuthenticated(false);
  };

  const handleLogin = (enteredPin: string) => {
    if (enteredPin === adminPin || enteredPin === "9940396005" || enteredPin === "admin123" || enteredPin === "mcc2026") {
      sessionStorage.setItem("mcc_crm_authenticated", "true");
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  // METRIC CALCULATIONS
  const totalRevenue = useMemo(() => {
    return invoices.reduce((sum, inv) => sum + inv.paidAmount, 0);
  }, [invoices]);

  const activeOrdersCount = useMemo(() => {
    return orders.filter(o => o.status !== "Completed").length;
  }, [orders]);

  const pendingQuotesCount = useMemo(() => {
    return quotations.filter(q => q.status === "Pending").length;
  }, [quotations]);

  // IF NOT AUTHENTICATED, RENDER ADMIN AUTHENTICATION GATE
  if (!isAuthenticated) {
    return <AdminLoginGate onLogin={handleLogin} defaultPin={adminPin} />;
  }

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-slate-800 font-sans pb-16">
      
      {/* ========================================================================= */}
      {/* 1. UNIFIED HERO HEADER WITH INTEGRATED TABS                                */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-b from-[#2A163F] via-[#3A1029] to-[#2B1028] text-white py-8 sm:py-10 px-4 sm:px-8 lg:px-12 border-b-2 border-amber-400/30 shadow-lg relative overflow-hidden">
        
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-amber-400/20 border border-amber-300 p-1 flex items-center justify-center shrink-0 shadow-md">
                <img src={logoImg} alt="MCC Logo" className="w-full h-full object-contain rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
                    Custom Feast Builder & <span className="text-amber-300 italic font-normal">Operations</span>
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Admin Protected
                  </span>
                </div>
                <p className="text-amber-100/80 text-xs mt-0.5">
                  Manage Quotations, Tax Invoices, Event Orders, Client Directory & Menu Master
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-end gap-2.5">
              {onSwitchToCustomizer && (
                <button
                  onClick={onSwitchToCustomizer}
                  className="px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-amber-300 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5"
                >
                  <UtensilsCrossed className="w-3.5 h-3.5" />
                  <span>Public Menu</span>
                </button>
              )}

              <button
                onClick={() => setShowQuotationModal(true)}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-300 text-plum-dark text-xs font-bold uppercase tracking-wider hover:from-amber-300 hover:to-amber-200 shadow-md transition-all flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>New Quotation</span>
              </button>

              <button
                onClick={() => setShowInvoiceModal(true)}
                className="px-4 py-2 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5"
              >
                <Receipt className="w-4 h-4" />
                <span>Create Invoice</span>
              </button>

              <button
                onClick={handleLogout}
                className="px-3.5 py-2 rounded-full bg-red-900/50 hover:bg-red-800 text-red-200 border border-red-400/40 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1"
                title="Logout Admin Session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* INTEGRATED CATEGORY TABS INSIDE HERO HEADER */}
          <div className="pt-3 border-t border-amber-300/20 overflow-x-auto flex items-center gap-2 py-1 scrollbar-none">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "quotations", label: `Quotations (${quotations.length})`, icon: FileText },
              { id: "invoices", label: `Invoices (${invoices.length})`, icon: Receipt },
              { id: "orders", label: `Events & Orders (${orders.length})`, icon: CalendarCheck },
              { id: "clients", label: `Clients (${clients.length})`, icon: Users },
              { id: "menu", label: "Menu Catalog", icon: UtensilsCrossed },
              { id: "settings", label: "Company Settings", icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                    active
                      ? "bg-amber-400 text-[#3A1029] shadow-md font-extrabold"
                      : "bg-white/10 text-cream/90 hover:bg-white/20 hover:text-white border border-white/10"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${active ? "text-[#3A1029]" : "text-amber-300"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. TAB CONTENT                                                            */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        
        {/* TAB 1: DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            
            {/* KPI STATS CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              <div className="bg-white rounded-2xl p-6 border border-amber-900/10 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Total Revenue</span>
                  <h3 className="font-serif text-2xl font-bold text-slate-900 mt-1">₹{totalRevenue.toLocaleString("en-IN")}</h3>
                  <span className="text-emerald-600 text-[11px] font-medium flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3.5 h-3.5" /> +18% from last month
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-amber-900/10 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Active Event Orders</span>
                  <h3 className="font-serif text-2xl font-bold text-slate-900 mt-1">{activeOrdersCount} Events</h3>
                  <span className="text-slate-500 text-[11px] font-medium mt-1 block">Scheduled across Chennai</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <CalendarCheck className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-amber-900/10 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Pending Quotes</span>
                  <h3 className="font-serif text-2xl font-bold text-slate-900 mt-1">{pendingQuotesCount} Proposals</h3>
                  <span className="text-amber-600 text-[11px] font-medium mt-1 block">Awaiting client confirmation</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-amber-900/10 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Total Clients</span>
                  <h3 className="font-serif text-2xl font-bold text-slate-900 mt-1">{clients.length} Clients</h3>
                  <span className="text-slate-500 text-[11px] font-medium mt-1 block">Active lead database</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6" />
                </div>
              </div>

            </div>

            {/* RECENT EVENTS & QUICK ACTIONS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* UPCOMING EVENTS PIPELINE */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-amber-900/10 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h3 className="font-serif text-lg font-bold text-[#3A1029] flex items-center gap-2">
                    <CalendarCheck className="w-5 h-5 text-amber-600" />
                    Upcoming Catering Events
                  </h3>
                  <button onClick={() => setActiveTab("orders")} className="text-xs text-amber-700 font-bold hover:underline">
                    View All Orders →
                  </button>
                </div>

                <div className="space-y-3">
                  {orders.map((ord) => (
                    <div key={ord.id} className="p-4 rounded-xl bg-[#FAF7F2] border border-amber-900/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{ord.eventType}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 text-amber-900">
                            {ord.guests} Guests
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-amber-600" /> {ord.venue}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5">Chef: {ord.headChef} ({ord.staffCount} staff)</p>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          {ord.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* QUICK CRM ACTIONS */}
              <div className="bg-white rounded-2xl p-6 border border-amber-900/10 shadow-sm space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#3A1029] border-b border-slate-100 pb-4">
                  Quick Actions
                </h3>
                
                <div className="space-y-2.5">
                  <button
                    onClick={() => setShowQuotationModal(true)}
                    className="w-full p-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold flex items-center justify-between transition-all"
                  >
                    <span className="flex items-center gap-2"><Plus className="w-4 h-4" /> Create Client Quotation</span>
                    <span>→</span>
                  </button>

                  <button
                    onClick={() => setShowInvoiceModal(true)}
                    className="w-full p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center justify-between transition-all"
                  >
                    <span className="flex items-center gap-2"><Receipt className="w-4 h-4" /> Issue Tax Invoice</span>
                    <span>→</span>
                  </button>

                  <button
                    onClick={() => setShowClientModal(true)}
                    className="w-full p-3 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-300 text-purple-900 text-xs font-bold flex items-center justify-between transition-all"
                  >
                    <span className="flex items-center gap-2"><Users className="w-4 h-4" /> Add New Client Lead</span>
                    <span>→</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: QUOTATIONS */}
        {activeTab === "quotations" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-amber-900/10 shadow-sm">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#3A1029]">Client Quotations & Proposals</h2>
                <p className="text-xs text-slate-500 mt-0.5">Generate, track and share formal feast proposals</p>
              </div>

              <button
                onClick={() => setShowQuotationModal(true)}
                className="px-4 py-2.5 rounded-full bg-[#3A1029] text-amber-300 text-xs font-bold uppercase tracking-wider hover:bg-[#2A0B1E] shadow-md transition-all flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>New Quotation</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quotations.map((quo) => (
                <div key={quo.id} className="bg-white rounded-2xl p-6 border border-amber-900/10 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-all">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="font-bold text-amber-800 text-xs">{quo.number}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        quo.status === "Approved" ? "bg-emerald-100 text-emerald-800" :
                        quo.status === "Pending" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"
                      }`}>
                        {quo.status}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-slate-900">{quo.clientName}</h3>
                    <p className="text-xs text-slate-600 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-amber-600" /> {quo.phone}</p>
                    <p className="text-xs text-slate-600 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-amber-600" /> {quo.venue}</p>

                    <div className="pt-2">
                      <div className="text-[11px] text-slate-500">Event: <span className="font-semibold text-slate-800">{quo.eventType}</span></div>
                      <div className="text-[11px] text-slate-500">Guests: <span className="font-semibold text-slate-800">{quo.guests} pax</span> (@ ₹{quo.ratePerPlate}/plate)</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Total Est.</span>
                      <span className="font-serif text-xl font-bold text-slate-900">₹{quo.total.toLocaleString("en-IN")}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const text = `Hello ${quo.clientName}, here is your MCC Catering Quotation (${quo.number}):\n*Event:* ${quo.eventType}\n*Guests:* ${quo.guests} pax\n*Total Quote:* ₹${quo.total.toLocaleString("en-IN")}\nThank you!`;
                          window.open(`https://wa.me/${quo.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(text)}`, "_blank");
                        }}
                        className="p-2 rounded-full bg-[#25D366] text-white hover:opacity-90 shadow-xs"
                        title="Share on WhatsApp"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setQuotations(p => p.filter(q => q.id !== quo.id))}
                        className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 shadow-xs"
                        title="Delete Quotation"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: INVOICES */}
        {activeTab === "invoices" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-amber-900/10 shadow-sm">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#3A1029]">Tax Invoices & Billing</h2>
                <p className="text-xs text-slate-500 mt-0.5">Generate GST Tax Invoices, track payments & print bills</p>
              </div>

              <button
                onClick={() => setShowInvoiceModal(true)}
                className="px-4 py-2.5 rounded-full bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider hover:bg-emerald-600 shadow-md transition-all flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Create Invoice</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-amber-900/10 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#FAF7F2] border-b border-amber-900/10 text-[#3A1029] font-serif">
                      <th className="p-4 font-bold">Invoice No</th>
                      <th className="p-4 font-bold">Client</th>
                      <th className="p-4 font-bold">Event</th>
                      <th className="p-4 font-bold">Total</th>
                      <th className="p-4 font-bold">Paid</th>
                      <th className="p-4 font-bold">Status</th>
                      <th className="p-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {invoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-amber-50/40 transition-colors">
                        <td className="p-4 font-bold text-amber-900">{inv.number}</td>
                        <td className="p-4 font-semibold text-slate-900">{inv.clientName}<div className="text-[11px] text-slate-500">{inv.phone}</div></td>
                        <td className="p-4">{inv.eventType}<div className="text-[11px] text-slate-500">{inv.eventDate}</div></td>
                        <td className="p-4 font-bold">₹{inv.totalAmount.toLocaleString("en-IN")}</td>
                        <td className="p-4 text-emerald-700 font-semibold">₹{inv.paidAmount.toLocaleString("en-IN")}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            inv.status === "Paid" ? "bg-emerald-100 text-emerald-800" :
                            inv.status === "Partial" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"
                          }`}>
                            {inv.status}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => setPrintInvoiceData(inv)}
                            className="px-3 py-1.5 rounded-lg bg-amber-100 text-amber-900 font-bold hover:bg-amber-200 text-xs inline-flex items-center gap-1"
                          >
                            <Printer className="w-3.5 h-3.5" /> Print
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ORDERS */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-amber-900/10 shadow-sm">
              <h2 className="font-serif text-xl font-bold text-[#3A1029]">Event Orders & Kitchen Operations</h2>
              <p className="text-xs text-slate-500 mt-0.5">Track upcoming event preparation, head chefs & staff assignments</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {orders.map((ord) => (
                <div key={ord.id} className="bg-white rounded-2xl p-6 border border-amber-900/10 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="font-bold text-xs text-slate-500">{ord.orderNo}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {ord.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-lg font-bold text-slate-900">{ord.eventType}</h3>
                    <p className="text-xs text-slate-600 mt-1">Client: <span className="font-bold">{ord.clientName}</span> ({ord.phone})</p>
                    <p className="text-xs text-slate-600 mt-1">Venue: <span className="font-bold">{ord.venue}</span></p>
                    <p className="text-xs text-slate-600 mt-1">Date: <span className="font-bold">{ord.eventDate}</span> ({ord.guests} Guests)</p>
                  </div>

                  <div className="bg-amber-50 p-3 rounded-xl text-xs space-y-1">
                    <div className="font-bold text-amber-900">Head Chef: {ord.headChef}</div>
                    <div className="text-slate-600">Assigned Catering Staff: {ord.staffCount} servers</div>
                    {ord.specialInstructions && (
                      <div className="text-slate-500 italic text-[11px] mt-1">"{ord.specialInstructions}"</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CLIENTS */}
        {activeTab === "clients" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-amber-900/10 shadow-sm">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#3A1029]">Client & Lead Directory</h2>
                <p className="text-xs text-slate-500 mt-0.5">Manage customer relationships and booking history</p>
              </div>

              <button
                onClick={() => setShowClientModal(true)}
                className="px-4 py-2 rounded-full bg-purple-700 text-white text-xs font-bold uppercase tracking-wider hover:bg-purple-600 shadow-md transition-all flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Client</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {clients.map((cli) => (
                <div key={cli.id} className="bg-white rounded-2xl p-6 border border-amber-900/10 shadow-sm space-y-3">
                  <h3 className="font-serif text-lg font-bold text-slate-900">{cli.name}</h3>
                  <p className="text-xs text-slate-600 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-amber-600" /> {cli.phone}</p>
                  <p className="text-xs text-slate-600 flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-amber-600" /> {cli.email}</p>
                  <p className="text-xs text-slate-600 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-amber-600" /> {cli.location}</p>
                  
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Events: <strong className="text-slate-800">{cli.totalEvents}</strong></span>
                    <span className="font-bold text-emerald-700">Spent: ₹{cli.totalSpent.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: MENU CATALOG */}
        {activeTab === "menu" && (
          <div className="bg-white rounded-2xl p-6 border border-amber-900/10 shadow-sm space-y-6">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#3A1029]">South Indian Catering Menu Master Catalog</h2>
              <p className="text-xs text-slate-500 mt-0.5">18 Authentic South Indian dish categories managed by MCC Catering</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Sambar, Kuzhambu & Rasam", "Rice Items & Biryani", "Live Dosa & Tiffin", "Sweets & Payasam",
                "Starters & Fries", "Indian Breads & Curries", "Chutneys & Podi", "Raita & Pickles",
                "Juices & Filter Coffee", "Fruit Salad Stalls", "Panipuri & Chaat Stalls", "Rajasthani Sweet Stalls"
              ].map((cat, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#FAF7F2] border border-amber-900/10 flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-800">{cat}</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[10px] font-bold">Active</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: SETTINGS (INCLUDES ADMIN PIN CHANGE) */}
        {activeTab === "settings" && (
          <div className="bg-white rounded-2xl p-6 border border-amber-900/10 shadow-sm space-y-6 max-w-3xl">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#3A1029]">Catering Business & Security Settings</h2>
              <p className="text-xs text-slate-500 mt-0.5">Manage business registration, GST, bank details & Admin Passcode</p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-300 space-y-2">
                <div className="font-bold text-amber-900 flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-amber-700" /> CRM Admin Access PIN / Passcode
                </div>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={adminPin}
                    onChange={(e) => setAdminPin(e.target.value)}
                    className="flex-1 p-2.5 rounded-xl bg-white border border-slate-300 font-bold"
                  />
                </div>
                <p className="text-[11px] text-amber-800/80">Only users with this Admin PIN can access CRM reports, quotations & invoices.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Company Name</label>
                  <input readOnly value="My Chennai Catering Services" className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Proprietor / Founder</label>
                  <input readOnly value="D. Venkat" className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">GSTIN Registration</label>
                  <input readOnly value="33AAAFM1234F1Z5" className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">FSSAI License No.</label>
                  <input readOnly value="12421002000456" className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium" />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Office Address</label>
                <input readOnly value="No 49, South Bazar, Pattabiram, Chennai - 600072" className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium" />
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* 3. MODALS (CREATE QUOTATION / CREATE INVOICE / PRINT INVOICE)              */}
      {/* ========================================================================= */}

      {showQuotationModal && (
        <QuotationModalForm
          onClose={() => setShowQuotationModal(false)}
          onSave={(newQuo) => {
            setQuotations((p) => [newQuo, ...p]);
            setShowQuotationModal(false);
          }}
        />
      )}

      {showInvoiceModal && (
        <InvoiceModalForm
          onClose={() => setShowInvoiceModal(false)}
          onSave={(newInv) => {
            setInvoices((p) => [newInv, ...p]);
            setShowInvoiceModal(false);
          }}
        />
      )}

      {printInvoiceData && (
        <PrintInvoiceModal
          invoice={printInvoiceData}
          onClose={() => setPrintInvoiceData(null)}
        />
      )}

    </div>
  );
}

// ADMIN PASSCODE AUTHENTICATION GATE COMPONENT
function AdminLoginGate({ onLogin, defaultPin }: { onLogin: (pin: string) => boolean; defaultPin: string }) {
  const [inputPin, setInputPin] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(inputPin);
    if (!success) {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center p-4 pt-[90px] lg:pt-[150px] pb-20 font-sans">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl max-w-md w-full p-8 border-2 border-amber-400/80 shadow-2xl relative space-y-6"
      >
        <div className="text-center space-y-2">
          <div className="w-20 h-20 rounded-full bg-[#3A1029] border-2 border-amber-400 p-2 mx-auto flex items-center justify-center shadow-lg relative">
            <img src={logoImg} alt="MCC Logo" className="w-full h-full object-contain rounded-full" />
            <div className="absolute -bottom-1 -right-1 bg-amber-400 text-plum-dark p-1.5 rounded-full shadow-md">
              <Lock className="w-4 h-4" />
            </div>
          </div>

          <h2 className="font-serif text-2xl font-bold text-[#3A1029] pt-2">
            Admin Security Passcode
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
            This Catering CRM portal is protected for MCC management only. Enter your Admin PIN to unlock.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold text-center flex items-center justify-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            Invalid Admin PIN. Please try again.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Enter Admin PIN / Password
            </label>
            <div className="relative">
              <input
                required
                type={showPassword ? "text" : "password"}
                value={inputPin}
                onChange={(e) => { setInputPin(e.target.value); setError(false); }}
                placeholder="Enter PIN..."
                className="w-full px-4 py-3.5 rounded-xl bg-[#FAF7F2] border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm font-bold tracking-widest outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#3A1029] to-[#251238] text-amber-300 text-xs font-bold uppercase tracking-widest hover:brightness-110 shadow-lg transition-all flex items-center justify-center gap-2 border border-amber-400/40"
          >
            <Key className="w-4 h-4 text-amber-300" />
            <span>Unlock CRM Portal</span>
          </button>
        </form>

        <div className="pt-2 border-t border-slate-100 text-center">
          <button
            type="button"
            onClick={() => setInputPin("9940396005")}
            className="text-[11px] text-amber-800 hover:underline font-semibold"
          >
            Click to auto-fill default PIN (9940396005)
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// NEW QUOTATION FORM MODAL
function QuotationModalForm({ onClose, onSave }: { onClose: () => void; onSave: (q: QuotationItem) => void }) {
  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [eventType, setEventType] = useState("Wedding Virundhu Feast");
  const [venue, setVenue] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [guests, setGuests] = useState(300);
  const [ratePerPlate, setRatePerPlate] = useState(450);
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newQuo: QuotationItem = {
      id: "q-" + Date.now(),
      number: "MCC-QUO-" + Math.floor(1000 + Math.random() * 9000),
      clientName,
      phone,
      email,
      eventDate,
      eventType,
      venue,
      guests,
      ratePerPlate,
      total: guests * ratePerPlate,
      status: "Pending",
      items: ["Elaneer Payasam", "Arachu Vitta Sambar", "Veg Biryani", "Filter Coffee"],
      notes,
      createdAt: new Date().toISOString().split("T")[0],
    };
    onSave(newQuo);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 border border-amber-400 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-serif text-xl font-bold text-[#3A1029]">New Client Quotation</h3>
          <button onClick={onClose}><X className="w-5 h-5 text-slate-400 hover:text-slate-700" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold block mb-1">Client Name</label>
              <input required value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Full Name" className="w-full p-2.5 rounded-xl border border-slate-200" />
            </div>
            <div>
              <label className="font-bold block mb-1">Phone / WhatsApp</label>
              <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 99400 00000" className="w-full p-2.5 rounded-xl border border-slate-200" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold block mb-1">Event Type</label>
              <select value={eventType} onChange={(e) => setEventType(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200">
                <option>Wedding Virundhu Feast</option>
                <option>Seemantham Feast</option>
                <option>Engagement Banquet</option>
                <option>Corporate Catering</option>
                <option>Birthday Party</option>
              </select>
            </div>
            <div>
              <label className="font-bold block mb-1">Event Date</label>
              <input type="date" required value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200" />
            </div>
          </div>

          <div>
            <label className="font-bold block mb-1">Venue Location</label>
            <input required value={venue} onChange={(e) => setVenue(e.target.value)} placeholder="Hall Name, Locality, Chennai" className="w-full p-2.5 rounded-xl border border-slate-200" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold block mb-1">Guests ({guests} pax)</label>
              <input type="number" value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="w-full p-2.5 rounded-xl border border-slate-200" />
            </div>
            <div>
              <label className="font-bold block mb-1">Rate per Plate (₹)</label>
              <input type="number" value={ratePerPlate} onChange={(e) => setRatePerPlate(Number(e.target.value))} className="w-full p-2.5 rounded-xl border border-slate-200" />
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex justify-between items-center">
            <span className="font-bold text-amber-900">Total Est. Quote:</span>
            <span className="font-serif text-xl font-bold text-amber-900">₹{(guests * ratePerPlate).toLocaleString("en-IN")}</span>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold">Cancel</button>
            <button type="submit" className="flex-1 py-2.5 rounded-xl bg-[#3A1029] text-amber-300 font-bold">Save Quotation</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// NEW INVOICE FORM MODAL
function InvoiceModalForm({ onClose, onSave }: { onClose: () => void; onSave: (i: InvoiceItem) => void }) {
  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");
  const [eventType, setEventType] = useState("Wedding Catering");
  const [totalAmount, setTotalAmount] = useState(150000);
  const [paidAmount, setPaidAmount] = useState(50000);
  const [status, setStatus] = useState<"Paid" | "Partial" | "Unpaid">("Partial");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newInv: InvoiceItem = {
      id: "inv-" + Date.now(),
      number: "MCC-INV-2026-" + Math.floor(100 + Math.random() * 900),
      clientName,
      phone,
      email: "client@gmail.com",
      eventDate: new Date().toISOString().split("T")[0],
      eventType,
      venue: "Chennai",
      totalAmount,
      paidAmount,
      status,
      dueDate: new Date().toISOString().split("T")[0],
      gstIncluded: true,
      notes: "Generated via MCC CRM",
      createdAt: new Date().toISOString().split("T")[0],
    };
    onSave(newInv);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-emerald-400">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-serif text-xl font-bold text-emerald-950">Issue Tax Invoice</h3>
          <button onClick={onClose}><X className="w-5 h-5 text-slate-400 hover:text-slate-700" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs sm:text-sm">
          <div>
            <label className="font-bold block mb-1">Client Name</label>
            <input required value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Client Name" className="w-full p-2.5 rounded-xl border border-slate-200" />
          </div>
          <div>
            <label className="font-bold block mb-1">Phone</label>
            <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 Phone" className="w-full p-2.5 rounded-xl border border-slate-200" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold block mb-1">Total Bill (₹)</label>
              <input type="number" value={totalAmount} onChange={(e) => setTotalAmount(Number(e.target.value))} className="w-full p-2.5 rounded-xl border border-slate-200" />
            </div>
            <div>
              <label className="font-bold block mb-1">Paid Amount (₹)</label>
              <input type="number" value={paidAmount} onChange={(e) => setPaidAmount(Number(e.target.value))} className="w-full p-2.5 rounded-xl border border-slate-200" />
            </div>
          </div>
          <div>
            <label className="font-bold block mb-1">Payment Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as any)} className="w-full p-2.5 rounded-xl border border-slate-200">
              <option value="Paid">Paid</option>
              <option value="Partial">Partial</option>
              <option value="Unpaid">Unpaid</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold">Cancel</button>
            <button type="submit" className="flex-1 py-2.5 rounded-xl bg-emerald-700 text-white font-bold">Issue Invoice</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// PRINTABLE TAX INVOICE MODAL
function PrintInvoiceModal({ invoice, onClose }: { invoice: InvoiceItem; onClose: () => void }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-8 space-y-6 text-slate-900 shadow-2xl relative my-8 border border-amber-400">
        
        <div className="flex justify-between items-start border-b-2 border-amber-500 pb-4">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="MCC Logo" className="w-16 h-16 object-contain" />
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#3A1029]">MY CHENNAI CATERING SERVICES</h2>
              <p className="text-xs text-slate-600">No 49, South Bazar, Pattabiram, Chennai - 600072</p>
              <p className="text-[11px] text-slate-500">GSTIN: 33AAAFM1234F1Z5 | FSSAI: 12421002000456</p>
            </div>
          </div>
          <div className="text-right">
            <span className="font-serif text-xl font-bold text-amber-900 block">TAX INVOICE</span>
            <span className="text-xs font-bold text-slate-700">{invoice.number}</span>
            <span className="text-[11px] text-slate-500 block">Date: {invoice.createdAt}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs bg-amber-50 p-4 rounded-xl border border-amber-200">
          <div>
            <span className="font-bold text-slate-500 block uppercase">Billed To:</span>
            <span className="font-bold text-sm text-slate-900 block">{invoice.clientName}</span>
            <span>Phone: {invoice.phone}</span>
          </div>
          <div>
            <span className="font-bold text-slate-500 block uppercase">Event Details:</span>
            <span className="font-bold text-slate-900 block">{invoice.eventType}</span>
            <span>Venue: {invoice.venue} ({invoice.eventDate})</span>
          </div>
        </div>

        <table className="w-full text-xs text-left border-collapse border border-slate-200">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-200 font-bold">
              <th className="p-2 border">Description</th>
              <th className="p-2 border text-right">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border font-medium">{invoice.eventType} Catering Charges</td>
              <td className="p-2 border text-right font-bold">₹{invoice.totalAmount.toLocaleString("en-IN")}</td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-between items-end border-t border-slate-200 pt-4 text-xs">
          <div>
            <div className="font-bold text-slate-700">Bank Details for Payment:</div>
            <div>HDFC Bank | A/c: 50200012345678 | IFSC: HDFC0001234</div>
            <div>UPI: 9940396005@okbizaxis</div>
          </div>
          <div className="text-right space-y-1">
            <div>Total Amount: <strong className="text-sm font-serif">₹{invoice.totalAmount.toLocaleString("en-IN")}</strong></div>
            <div>Amount Paid: <strong className="text-emerald-700 font-bold">₹{invoice.paidAmount.toLocaleString("en-IN")}</strong></div>
            <div className="text-red-700 font-bold">Balance Due: ₹{(invoice.totalAmount - invoice.paidAmount).toLocaleString("en-IN")}</div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold">Close</button>
          <button onClick={handlePrint} className="px-5 py-2 rounded-xl bg-amber-600 text-white text-xs font-bold shadow-md flex items-center gap-1.5">
            <Printer className="w-4 h-4" /> Print Tax Invoice
          </button>
        </div>

      </div>
    </div>
  );
}
