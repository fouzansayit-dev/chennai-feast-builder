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
  EyeOff,
  BookOpen,
  Layers,
  FolderOpen,
  CalendarRange,
  ClipboardList,
  Image,
  Upload,
  RefreshCw,
  CheckSquare,
  XSquare,
  MessageSquare
} from "lucide-react";
import logoImg from "@/assets/mcc-logo.png";
import lotusIcon from "@/assets/lotus icon.png";
import {
  authAPI,
  clientsAPI,
  invoicesAPI,
  quotationsAPI,
  ordersAPI,
  menuAPI,
  companyAPI,
  dashboardAPI,
  menuPackagesAPI,
  menuTypesAPI,
  menuCategoriesAPI,
  eventCategoriesAPI,
  eventStallItemsAPI,
  mediaAPI,
  chatAPI,
  getToken,
  removeToken
} from "@/services/crmApi";


// TYPES & INTERFACES
type TabType =
  | "dashboard"
  | "orders"
  | "quotations"
  | "invoices"
  | "clients"
  | "packages"
  | "menuTypes"
  | "menuCategories"
  | "menuItems"
  | "eventCategories"
  | "eventStallItems"
  | "media"
  | "chatLogs"
  | "settings";

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
  status: string; // DB: draft | sent | accepted | rejected | expired; UI: Approved | Pending | Rejected
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
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("catering_token");
    }
    return false;
  });

  const [adminPin, setAdminPin] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("mcc_crm_admin_pin") || "9940396005";
    }
    return "9940396005";
  });

  // STATE MANAGEMENT WITH LOCALSTORAGE PERSISTENCE (SEED FALLBACKS)
  const [quotations, setQuotations] = useState<QuotationItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mcc_crm_quotations");
      return saved ? JSON.parse(saved) : SEED_QUOTATIONS;
    }
    return SEED_QUOTATIONS;
  });

  const [invoices, setInvoices] = useState<InvoiceItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mcc_crm_invoices");
      return saved ? JSON.parse(saved) : SEED_INVOICES;
    }
    return SEED_INVOICES;
  });

  const [orders, setOrders] = useState<OrderItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mcc_crm_orders");
      return saved ? JSON.parse(saved) : SEED_ORDERS;
    }
    return SEED_ORDERS;
  });

  const [clients, setClients] = useState<ClientItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mcc_crm_clients");
      return saved ? JSON.parse(saved) : SEED_CLIENTS;
    }
    return SEED_CLIENTS;
  });

  const [companySettings, setCompanySettings] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // MODAL STATES
  const [showQuotationModal, setShowQuotationModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);
  const [printInvoiceData, setPrintInvoiceData] = useState<InvoiceItem | null>(null);

  // SAVE TO LOCALSTORAGE
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("mcc_crm_quotations", JSON.stringify(quotations));
    }
  }, [quotations]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("mcc_crm_invoices", JSON.stringify(invoices));
    }
  }, [invoices]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("mcc_crm_orders", JSON.stringify(orders));
    }
  }, [orders]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("mcc_crm_clients", JSON.stringify(clients));
    }
  }, [clients]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("mcc_crm_admin_pin", adminPin);
    }
  }, [adminPin]);

  const handleLogout = () => {
    authAPI.logout();
    setIsAuthenticated(false);
  };

  const handleLogin = async (emailOrPin: string, password?: string): Promise<boolean> => {
    try {
      if (!password) {
        if (emailOrPin === adminPin || emailOrPin === "9940396005" || emailOrPin === "admin123" || emailOrPin === "mcc2026") {
          await authAPI.login("admin@mycateringchennai.com", "Admin@123");
          setIsAuthenticated(true);
          return true;
        }
        return false;
      } else {
        await authAPI.login(emailOrPin, password);
        setIsAuthenticated(true);
        return true;
      }
    } catch (e) {
      console.error("Login failed:", e);
      return false;
    }
  };

  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [configModal, setConfigModal] = useState<{ type: "packages" | "menuTypes" | "menuCategories" | "menuItems" | "eventCategories" | "eventStallItems"; action: "add" | "edit"; data?: any } | null>(null);
  const [menuPackages, setMenuPackages] = useState<any[]>([]);
  const [menuTypes, setMenuTypes] = useState<any[]>([]);
  const [menuCategories, setMenuCategories] = useState<any[]>([]);
  const [eventCategories, setEventCategories] = useState<any[]>([]);
  const [eventStallItems, setEventStallItems] = useState<any[]>([]);

  // Chat log states
  const [chatSessions, setChatSessions] = useState<any[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [sessionMessages, setSessionMessages] = useState<any[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const fetchSessions = async () => {
    setLoadingSessions(true);
    try {
      const res = await chatAPI.getSessions();
      if (res.success && res.data) {
        setChatSessions(res.data);
      }
    } catch (e) {
      console.error("Failed to fetch chat sessions:", e);
    } finally {
      setLoadingSessions(false);
    }
  };

  const fetchSessionMessages = async (sessionId: string) => {
    setLoadingMessages(true);
    try {
      const res = await chatAPI.getSessionMessages(sessionId);
      if (res.success && res.data) {
        setSessionMessages(res.data);
        setSelectedSessionId(sessionId);
      }
    } catch (e) {
      console.error("Failed to fetch chat messages:", e);
    } finally {
      setLoadingMessages(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [cRes, iRes, qRes, oRes, sRes, mRes, pRes, tRes, mcRes, ecRes, esRes] = await Promise.allSettled([
        clientsAPI.getAll(),
        invoicesAPI.getAll(),
        quotationsAPI.getAll(),
        ordersAPI.getAll(),
        companyAPI.get(),
        menuAPI.getAll(),
        menuPackagesAPI.getAll(),
        menuTypesAPI.getAll(),
        menuCategoriesAPI.getAll(),
        eventCategoriesAPI.getAll(),
        eventStallItemsAPI.getAll(),
      ]);

      if (cRes.status === "fulfilled" && cRes.value?.data) {
        const mappedClients = cRes.value.data.map((c: any) => ({
          id: c.id.toString(),
          name: c.name,
          phone: c.phone || "",
          email: c.email || "",
          location: c.city || c.address || "",
          totalEvents: Number(c.total_events || 0),
          totalSpent: Number(c.total_spent || 0),
          notes: c.notes || ""
        }));
        setClients(mappedClients);
      }

      if (iRes.status === "fulfilled" && iRes.value?.data) {
        const mappedInvoices = iRes.value.data.map((i: any) => ({
          id: i.id.toString(),
          number: i.invoice_number,
          clientName: i.client_name || "Client",
          phone: i.phone || "",
          email: i.email || "",
          eventDate: i.event_date ? i.event_date.split("T")[0] : "",
          eventType: i.event_type || "Catering Event",
          venue: i.venue || "",
          totalAmount: Number(i.total_amount || 0),
          paidAmount: Number(i.paid_amount || 0),
          status: i.payment_status || "Unpaid",
          dueDate: i.due_date ? i.due_date.split("T")[0] : "",
          gstIncluded: true,
          notes: i.notes || "",
          createdAt: i.created_at ? i.created_at.split("T")[0] : ""
        }));
        setInvoices(mappedInvoices);
      }

      if (qRes.status === "fulfilled" && qRes.value?.data) {
        const mappedQuotations = qRes.value.data.map((q: any) => ({
          id: q.id.toString(),
          number: q.quotation_number,
          clientName: q.client_name || "Client",
          phone: q.phone || "",
          email: q.email || "",
          eventDate: q.event_date ? q.event_date.split("T")[0] : "",
          eventType: q.event_type || "Catering Event",
          venue: q.venue || "",
          guests: Number(q.no_of_guests || 0),
          ratePerPlate: Number(q.no_of_guests ? Math.round(Number(q.total_amount || 0) / Number(q.no_of_guests)) : 0),
          total: Number(q.total_amount || 0),
          status: q.status === "accepted" ? "Approved" : q.status === "rejected" ? "Rejected" : "Pending",
          items: [],
          notes: q.notes || "",
          createdAt: q.created_at ? q.created_at.split("T")[0] : ""
        }));
        setQuotations(mappedQuotations);
      }

      if (oRes.status === "fulfilled" && oRes.value?.data) {
        const mappedOrders = oRes.value.data.map((o: any) => ({
          id: o.id.toString(),
          orderNo: o.order_number,
          // enquiries use guest_name; regular orders use client_name
          clientName: o.client_name || o.guest_name || "Guest",
          phone: o.client_phone || o.guest_phone || o.phone || "",
          eventDate: o.event_date ? o.event_date.split("T")[0] : "",
          eventType: o.event_type || "Catering Enquiry",
          venue: o.venue || "",
          guests: Number(o.no_of_guests || 0),
          headChef: "Master Chef D. Venkat",
          staffCount: 12,
          status: o.status === "pending" ? "Confirmed" : o.status === "in_progress" ? "Cooking" : o.status === "completed" ? "Completed" : "Confirmed",
          specialInstructions: o.notes || ""
        }));
        setOrders(mappedOrders);
      }

      if (sRes.status === "fulfilled" && sRes.value?.data) {
        setCompanySettings(sRes.value.data);
      }

      if (mRes.status === "fulfilled" && mRes.value?.data) {
        setMenuItems(mRes.value.data || []);
      }

      if (pRes.status === "fulfilled" && pRes.value?.data) {
        setMenuPackages(pRes.value.data || []);
      }

      if (tRes.status === "fulfilled" && tRes.value?.data) {
        setMenuTypes(tRes.value.data || []);
      }

      if (mcRes.status === "fulfilled" && mcRes.value?.data) {
        setMenuCategories(mcRes.value.data || []);
      }

      if (ecRes.status === "fulfilled" && ecRes.value?.data) {
        setEventCategories(ecRes.value.data || []);
      }

      if (esRes.status === "fulfilled" && esRes.value?.data) {
        setEventStallItems(esRes.value.data || []);
      }
    } catch (err: any) {
      console.warn("Failed fetching from Express database APIs:", err);
      if (err?.message?.includes('Session expired')) {
        // Token is invalid/expired — log out without a page redirect
        authAPI.logout();
        setIsAuthenticated(false);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && activeTab === "chatLogs") {
      fetchSessions();
    }
  }, [isAuthenticated, activeTab]);

  const handleCreateQuotation = async (newQuo: any) => {
    try {
      let cId: number | null = null;
      const foundClient = clients.find(c => c.phone.replace(/[^0-9]/g, "") === newQuo.phone.replace(/[^0-9]/g, ""));
      if (foundClient) {
        cId = Number(foundClient.id);
      } else {
        const newClientRes = await clientsAPI.create({
          name: newQuo.clientName,
          phone: newQuo.phone,
          email: newQuo.email || `${newQuo.clientName.toLowerCase().replace(/\s+/g, "")}@example.com`,
          city: newQuo.venue
        });
        if (newClientRes?.data?.id) {
          cId = newClientRes.data.id;
        }
      }

      await quotationsAPI.create({
        client_id: cId,
        event_date: newQuo.eventDate,
        event_type: newQuo.eventType,
        venue: newQuo.venue,
        no_of_guests: newQuo.guests,
        subtotal: newQuo.guests * newQuo.ratePerPlate,
        tax_amount: 0,
        discount_amount: 0,
        total_amount: newQuo.guests * newQuo.ratePerPlate,
        status: "pending",
        notes: newQuo.notes,
        terms: "50% advance required to confirm."
      });

      fetchData();
      setShowQuotationModal(false);
    } catch (err) {
      console.error("Error creating quotation:", err);
      alert("Failed to create quotation. Make sure the backend server is running.");
    }
  };

  const handleCreateInvoice = async (newInv: any) => {
    try {
      let cId: number | null = null;
      const foundClient = clients.find(c => c.phone.replace(/[^0-9]/g, "") === newInv.phone.replace(/[^0-9]/g, ""));
      if (foundClient) {
        cId = Number(foundClient.id);
      } else {
        const newClientRes = await clientsAPI.create({
          name: newInv.clientName,
          phone: newInv.phone,
          email: newInv.email || `${newInv.clientName.toLowerCase().replace(/\s+/g, "")}@example.com`,
          city: newInv.venue || "Chennai"
        });
        if (newClientRes?.data?.id) {
          cId = newClientRes.data.id;
        }
      }

      await invoicesAPI.create({
        client_id: cId,
        event_date: newInv.eventDate || new Date().toISOString().split("T")[0],
        event_type: newInv.eventType,
        venue: newInv.venue || "Chennai",
        subtotal: newInv.totalAmount,
        total_amount: newInv.totalAmount,
        advance_paid: newInv.paidAmount,
        balance_due: newInv.totalAmount - newInv.paidAmount,
        payment_status: newInv.status.toLowerCase(),
        notes: newInv.notes || "Issued via CRM"
      });

      fetchData();
      setShowInvoiceModal(false);
    } catch (err) {
      console.error("Error creating invoice:", err);
      alert("Failed to create invoice. Make sure the backend server is running.");
    }
  };

  const handleCreateClient = async (newCli: any) => {
    try {
      await clientsAPI.create({
        name: newCli.name,
        phone: newCli.phone,
        email: newCli.email,
        city: newCli.location,
        notes: newCli.notes
      });
      fetchData();
      setShowClientModal(false);
    } catch (err) {
      console.error("Error creating client:", err);
      alert("Failed to create client lead. Make sure the backend server is running.");
    }
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
    <div className="min-h-screen flex bg-[#FAF6F0] text-slate-800 font-sans">

      {/* 1. PREMIUM SIDEBAR */}
      <aside className="w-72 bg-[#2A1022] text-white flex flex-col justify-between shrink-0 border-r border-amber-400/20 sticky top-0 h-screen">
        <div className="flex flex-col flex-1 overflow-y-auto scrollbar-none py-6 px-4 space-y-6">

          {/* Logo & Brand Header */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-amber-400/20 border border-amber-300 p-1 flex items-center justify-center shrink-0 shadow-md">
              <img src={logoImg} alt="MCC Logo" className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <h2 className="font-serif text-sm font-bold tracking-wide text-white leading-tight">
                My Chennai Catering
              </h2>
              <span className="text-[10px] uppercase tracking-wider text-amber-300 font-bold block mt-0.5">
                Admin Panel
              </span>
            </div>
          </div>

          <div className="w-full h-[1px] bg-white/10" />

          {/* Navigation Sections */}
          <nav className="space-y-6 flex-1">

            {/* Group 1: NAVIGATIONS */}
            <div className="space-y-1">
              <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold px-3">
                Navigations
              </span>
              {[
                { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
                { id: "orders", label: `Customer Orders`, badge: orders.length, icon: CalendarCheck },
                { id: "quotations", label: `Quotation`, badge: quotations.length, icon: FileText },
                { id: "invoices", label: `Invoice`, badge: invoices.length, icon: Receipt },
                { id: "clients", label: `Clients`, badge: clients.length, icon: Users },
              ].map((item) => {
                const Icon = item.icon;
                const active = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as TabType)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${active
                      ? "bg-amber-400 text-[#2A1022] font-extrabold shadow-sm"
                      : "text-cream/90 hover:bg-white/5 hover:text-white"
                      }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${active ? "text-[#2A1022]" : "text-amber-300"}`} />
                      <span>{item.label}</span>
                    </span>
                    {item.badge !== undefined && (
                      <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${active ? "bg-[#2A1022] text-amber-300" : "bg-white/10 text-white"}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Group 2: MENU SETTINGS */}
            <div className="space-y-1">
              <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold px-3">
                Menu Settings
              </span>
              {[
                { id: "packages", label: `Our Menu Packages`, icon: BookOpen },
                { id: "menuTypes", label: `Menu Types`, icon: Layers },
                { id: "menuCategories", label: `Menu Category`, icon: FolderOpen },
                { id: "menuItems", label: `Menu Items`, icon: UtensilsCrossed },
                { id: "eventCategories", label: `Event & Stall Category`, icon: CalendarRange },
                { id: "eventStallItems", label: `Event & Stall Items`, icon: ClipboardList },
              ].map((item) => {
                const Icon = item.icon;
                const active = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as TabType)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${active
                      ? "bg-amber-400 text-[#2A1022] font-extrabold shadow-sm"
                      : "text-cream/90 hover:bg-white/5 hover:text-white"
                      }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${active ? "text-[#2A1022]" : "text-amber-300"}`} />
                      <span>{item.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Group 3: COMPANY SETTINGS */}
            <div className="space-y-1">
              <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold px-3">
                Company Settings
              </span>
              {[
                { id: "media", label: "Media & Images", icon: Image },
                { id: "chatLogs", label: "AI Chat Logs", icon: MessageSquare },
                { id: "settings", label: "Company Settings", icon: Settings },
              ].map((item) => {
                const Icon = item.icon;
                const active = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as TabType)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${active
                      ? "bg-amber-400 text-[#2A1022] font-extrabold shadow-sm"
                      : "text-cream/90 hover:bg-white/5 hover:text-white"
                      }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${active ? "text-[#2A1022]" : "text-amber-300"}`} />
                      <span>{item.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>

          </nav>
        </div>

        {/* Bottom Actions Footer */}
        <div className="p-4 border-t border-white/10 space-y-2 bg-[#1F0A19]">
          {onSwitchToCustomizer && (
            <button
              onClick={onSwitchToCustomizer}
              className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-amber-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>View Website</span>
            </button>
          )}

          <button
            onClick={handleLogout}
            className="w-full py-2 rounded-xl bg-red-950/40 hover:bg-red-900/50 text-red-200 border border-red-950 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 min-h-screen overflow-y-auto">

        {/* Dynamic Header */}
        <header className="bg-white border-b border-amber-900/10 px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
          <div>
            <h1 className="font-serif text-2xl font-bold text-slate-900 capitalize">
              {activeTab === "menuItems" ? "Menu Items" :
                activeTab === "menuCategories" ? "Menu Category" :
                  activeTab === "eventCategories" ? "Event & Stall Category" :
                    activeTab === "eventStallItems" ? "Event & Stall Items" :
                      activeTab === "menuTypes" ? "Menu Types" :
                        activeTab === "packages" ? "Our Menu Packages" :
                          activeTab === "orders" ? "Customer Orders" :
                            activeTab === "chatLogs" ? "AI Chat Logs" :
                              activeTab}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              My Chennai Catering Administration Portal
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowQuotationModal(true)}
              className="px-4 py-2 rounded-full bg-[#3A1029] text-amber-300 text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow-sm transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>New Quotation</span>
            </button>

            <button
              onClick={() => setShowInvoiceModal(true)}
              className="px-4 py-2 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all flex items-center gap-1.5"
            >
              <Receipt className="w-4 h-4" />
              <span>Create Invoice</span>
            </button>
          </div>
        </header>

        {/* Tab Content Container */}
        <div className="flex-1 px-8 py-8">

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

              <div className="bg-white rounded-2xl border border-amber-900/10 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-[#FAF7F2] border-b border-amber-900/10 text-[#3A1029] font-bold">
                        <th className="p-4">QUOTATION NO.</th>
                        <th className="p-4">CLIENT</th>
                        <th className="p-4">CLIENT NUMBER</th>
                        <th className="p-4">FUNCTION DATE</th>
                        <th className="p-4">FUNCTION TYPE</th>
                        <th className="p-4">STATUS</th>
                        <th className="p-4 text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quotations.map((quo) => (
                        <tr key={quo.id} className="border-b border-slate-100 hover:bg-[#FAF7F2]/50 transition-colors">
                          <td className="p-4 font-bold text-amber-800">{quo.number}</td>
                          <td className="p-4 font-medium text-slate-800">{quo.clientName}</td>
                          <td className="p-4 text-slate-600">{quo.phone}</td>
                          <td className="p-4 text-slate-600">{quo.eventDate}</td>
                          <td className="p-4 text-slate-600">{quo.eventType}</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${quo.status === "Approved" || quo.status === "accepted" ? "bg-emerald-100 text-emerald-800" :
                              quo.status === "Pending" || quo.status === "draft" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"
                              }`}>
                              {quo.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => {
                                  const text = `Hello ${quo.clientName}, here is your MCC Catering Quotation (${quo.number}):\n*Event:* ${quo.eventType}\n*Guests:* ${quo.guests} pax\n*Total Quote:* ₹${quo.total.toLocaleString("en-IN")}\nThank you!`;
                                  window.open(`https://wa.me/${quo.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(text)}`, "_blank");
                                }}
                                className="p-1.5 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors"
                                title="Share on WhatsApp"
                              >
                                <Share2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={async () => {
                                  if (window.confirm("Are you sure you want to delete this quotation?")) {
                                    try {
                                      await quotationsAPI.delete(quo.id);
                                      fetchData();
                                    } catch (e) {
                                      console.error(e);
                                      alert("Failed to delete quotation from database.");
                                    }
                                  }
                                }}
                                className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                                title="Delete Quotation"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {quotations.length === 0 && (
                        <tr>
                          <td colSpan={7} className="p-8 text-center text-slate-400 font-medium italic">
                            No Data Found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
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
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${inv.status === "Paid" ? "bg-emerald-100 text-emerald-800" :
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
                            <button
                              onClick={async () => {
                                if (window.confirm("Are you sure you want to delete this invoice?")) {
                                  try {
                                    await invoicesAPI.delete(inv.id);
                                    fetchData();
                                  } catch (e) {
                                    console.error(e);
                                    alert("Failed to delete invoice from database.");
                                  }
                                }
                              }}
                              className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 font-bold hover:bg-red-100 text-xs inline-flex items-center gap-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Delete
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
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-amber-900/10 shadow-sm">
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#3A1029]">Customer Orders & Bookings</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Live orders from website bookings, event requests & manual entries</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={fetchData}
                    className="px-3 py-2 rounded-full border border-amber-300 text-amber-800 text-xs font-bold flex items-center gap-1.5 hover:bg-amber-50"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Refresh
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-amber-900/10 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-[#FAF7F2] border-b border-amber-900/10 text-[#3A1029] font-bold">
                        <th className="p-4">ORDER NO.</th>
                        <th className="p-4">CLIENT / GUEST</th>
                        <th className="p-4">PHONE</th>
                        <th className="p-4">EVENT DATE</th>
                        <th className="p-4">EVENT TYPE</th>
                        <th className="p-4">GUESTS</th>
                        <th className="p-4">STATUS</th>
                        <th className="p-4 text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((ord) => (
                        <tr key={ord.id} className="border-b border-slate-100 hover:bg-[#FAF7F2]/50 transition-colors">
                          <td className="p-4 font-bold text-amber-800 whitespace-nowrap">{ord.orderNo}</td>
                          <td className="p-4 font-medium text-slate-800">{ord.clientName}</td>
                          <td className="p-4 text-slate-600">{ord.phone || "—"}</td>
                          <td className="p-4 text-slate-600 whitespace-nowrap">{ord.eventDate || "—"}</td>
                          <td className="p-4 text-slate-600">{ord.eventType}</td>
                          <td className="p-4 text-slate-600">{ord.guests > 0 ? ord.guests : "—"}</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap ${ord.status === "Completed" ? "bg-emerald-100 text-emerald-800" :
                              ord.status === "Cooking" || ord.status === "In Transit" ? "bg-blue-100 text-blue-800" :
                                "bg-amber-100 text-amber-800"
                              }`}>
                              {ord.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-1.5 flex-wrap">
                              {ord.status !== "Completed" && (
                                <button
                                  onClick={async () => {
                                    try {
                                      const nextStatus = ord.status === "Confirmed" ? "in_progress" : "completed";
                                      await ordersAPI.update(ord.id, { status: nextStatus });
                                      fetchData();
                                    } catch (e) { alert("Failed to update status"); }
                                  }}
                                  className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-[10px] font-bold flex items-center gap-1"
                                  title="Mark next stage"
                                >
                                  <CheckSquare className="w-3.5 h-3.5" />
                                  {ord.status === "Confirmed" ? "Start" : "Done"}
                                </button>
                              )}
                              <button
                                onClick={async () => {
                                  if (window.confirm("Delete this order?")) {
                                    try { await ordersAPI.delete(ord.id); fetchData(); }
                                    catch (e) { alert("Failed to delete order"); }
                                  }
                                }}
                                className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {orders.length === 0 && (
                        <tr>
                          <td colSpan={8} className="p-10 text-center text-slate-400 font-medium italic">
                            No orders yet. Website bookings will appear here automatically.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
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

          {/* TAB 6: MENU PACKAGES */}
          {activeTab === "packages" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-amber-900/10 shadow-sm">
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#3A1029]">Catering Menu Packages</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Manage package pricing, details & inclusion items</p>
                </div>
                <button
                  onClick={() => setConfigModal({ type: "packages", action: "add" })}
                  className="px-4 py-2 rounded-full bg-amber-400 text-[#2A1022] text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow-md transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Package</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {menuPackages.map((pkg) => (
                  <div key={pkg.id} className="bg-white rounded-2xl p-6 border border-amber-900/10 shadow-sm space-y-3 flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <h3 className="font-serif text-sm font-bold text-slate-900">{pkg.name}</h3>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                          ₹{pkg.price}/plate
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 font-sans">{pkg.description || "No description provided."}</p>
                      <div className="text-[10px] text-slate-500 font-medium">Inclusions: <span className="text-slate-700">{pkg.items || "—"}</span></div>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                      <button
                        onClick={() => setConfigModal({ type: "packages", action: "edit", data: pkg })}
                        className="p-1.5 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors"
                        title="Edit Package"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={async () => {
                          if (window.confirm("Are you sure you want to delete this package?")) {
                            try {
                              await menuPackagesAPI.delete(pkg.id);
                              fetchData();
                            } catch (e) {
                              alert("Failed to delete package.");
                            }
                          }
                        }}
                        className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                        title="Delete Package"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
                {menuPackages.length === 0 && (
                  <p className="text-slate-400 text-xs col-span-full">No packages found. Create packages in your local MySQL DB.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 7: MENU TYPES */}
          {activeTab === "menuTypes" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-amber-900/10 shadow-sm">
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#3A1029]">Menu Service Types</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Define classifications like Morning Breakfast, Buffets, Lunch - Veg, etc.</p>
                </div>
                <button
                  onClick={() => setConfigModal({ type: "menuTypes", action: "add" })}
                  className="px-4 py-2 rounded-full bg-amber-400 text-[#2A1022] text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow-md transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Type</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {menuTypes.map((type) => (
                  <div key={type.id} className="p-4 rounded-xl bg-white border border-amber-900/10 flex items-center justify-between shadow-xs hover:shadow-sm transition-shadow">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <span className="font-bold text-xs text-slate-800">{type.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setConfigModal({ type: "menuTypes", action: "edit", data: type })}
                        className="p-1 rounded-md text-amber-600 hover:bg-amber-50"
                        title="Edit Type"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={async () => {
                          if (window.confirm("Are you sure you want to delete this menu type?")) {
                            try {
                              await menuTypesAPI.delete(type.id);
                              fetchData();
                            } catch (e) {
                              alert("Failed to delete menu type.");
                            }
                          }
                        }}
                        className="p-1 rounded-md text-red-500 hover:bg-red-50"
                        title="Delete Type"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
                {menuTypes.length === 0 && (
                  <p className="text-slate-400 text-xs">No menu types defined.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 8: MENU CATEGORY */}
          {activeTab === "menuCategories" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-amber-900/10 shadow-sm">
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#3A1029]">Menu Categories</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Manage dish groups like Sambar, Rice Items, Payasam, etc.</p>
                </div>
                <button
                  onClick={() => setConfigModal({ type: "menuCategories", action: "add" })}
                  className="px-4 py-2 rounded-full bg-amber-400 text-[#2A1022] text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow-md transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Category</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {menuCategories.map((cat) => (
                  <div key={cat.id} className="p-4 rounded-xl bg-white border border-amber-900/10 flex items-center justify-between shadow-xs hover:shadow-sm transition-shadow">
                    <div>
                      <span className="font-bold text-xs text-slate-800 block">{cat.name}</span>
                      <span className="text-[10px] text-slate-400 font-sans">Type ID: {cat.type_id || "—"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setConfigModal({ type: "menuCategories", action: "edit", data: cat })}
                        className="p-1 rounded-md text-amber-600 hover:bg-amber-50"
                        title="Edit Category"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={async () => {
                          if (window.confirm("Are you sure you want to delete this category?")) {
                            try {
                              await menuCategoriesAPI.delete(cat.id);
                              fetchData();
                            } catch (e) {
                              alert("Failed to delete category.");
                            }
                          }
                        }}
                        className="p-1 rounded-md text-red-500 hover:bg-red-50"
                        title="Delete Category"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
                {menuCategories.length === 0 && (
                  <p className="text-slate-400 text-xs">No categories defined.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 9: MENU ITEMS */}
          {activeTab === "menuItems" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-amber-900/10 shadow-sm">
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#3A1029]">Catering Menu Items</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Manage individual dishes, category assignments & veg/non-veg flags</p>
                </div>
                <button
                  onClick={() => setConfigModal({ type: "menuItems", action: "add" })}
                  className="px-4 py-2 rounded-full bg-amber-400 text-[#2A1022] text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow-md transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Item</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {menuItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl p-6 border border-amber-900/10 shadow-sm space-y-3 flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <h3 className="font-serif text-sm font-bold text-slate-900 flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${item.is_veg ? "bg-emerald-500" : "bg-red-500"}`} />
                          {item.name}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-100 text-amber-900 font-bold">
                          ₹{item.price}/{item.unit || "plate"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{item.description || "No description."}</p>
                      <div className="text-[10px] text-slate-400 mt-2 font-medium">Category: {item.category || "General"}</div>
                    </div>
                    <div className="pt-2 border-t border-slate-100 flex justify-end gap-2">
                      <button
                        onClick={() => setConfigModal({ type: "menuItems", action: "edit", data: item })}
                        className="p-1 rounded-md text-amber-600 hover:bg-amber-50"
                        title="Edit Item"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={async () => {
                          if (window.confirm("Are you sure you want to delete this menu item?")) {
                            try {
                              await menuAPI.delete(item.id);
                              fetchData();
                            } catch (e) {
                              alert("Failed to delete menu item.");
                            }
                          }
                        }}
                        className="p-1 rounded-md text-red-500 hover:bg-red-50"
                        title="Delete Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
                {menuItems.length === 0 && (
                  <p className="text-slate-400 text-xs">No menu items found.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 10: EVENT & STALL CATEGORY */}
          {activeTab === "eventCategories" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-amber-900/10 shadow-sm">
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#3A1029]">Event & Stall Categories</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Classify ceremony events (Wedding, Birthday) and Live counters</p>
                </div>
                <button
                  onClick={() => setConfigModal({ type: "eventCategories", action: "add" })}
                  className="px-4 py-2 rounded-full bg-amber-400 text-[#2A1022] text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow-md transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Category</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {eventCategories.map((cat) => (
                  <div key={cat.id} className="p-4 rounded-xl bg-white border border-amber-900/10 flex items-center justify-between shadow-xs hover:shadow-sm transition-shadow">
                    <div>
                      <span className="font-bold text-xs text-slate-800 block">{cat.name}</span>
                      <span className="text-[10px] text-amber-600 font-bold uppercase block mt-0.5">{cat.type || "Events"}</span>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{cat.description || "—"}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setConfigModal({ type: "eventCategories", action: "edit", data: cat })}
                        className="p-1 rounded-md text-amber-600 hover:bg-amber-50"
                        title="Edit Category"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={async () => {
                          if (window.confirm("Are you sure you want to delete this category?")) {
                            try {
                              await eventCategoriesAPI.delete(cat.id);
                              fetchData();
                            } catch (e) {
                              alert("Failed to delete event category.");
                            }
                          }
                        }}
                        className="p-1 rounded-md text-red-500 hover:bg-red-50"
                        title="Delete Category"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
                {eventCategories.length === 0 && (
                  <p className="text-slate-400 text-xs">No event categories defined.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 11: EVENT & STALL ITEMS */}
          {activeTab === "eventStallItems" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-amber-900/10 shadow-sm">
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#3A1029]">Event & Stall Items Catalog</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Manage live counters, popcorn stalls, welcome drinks, or balloon decorations</p>
                </div>
                <button
                  onClick={() => setConfigModal({ type: "eventStallItems", action: "add" })}
                  className="px-4 py-2 rounded-full bg-amber-400 text-[#2A1022] text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow-md transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Stall Item</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {eventStallItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl p-6 border border-amber-900/10 shadow-sm space-y-3 flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <h3 className="font-serif text-sm font-bold text-slate-900">{item.name}</h3>
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-100 text-amber-900 font-bold">
                          ₹{item.price}/{item.unit || "stall"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{item.description || "No description."}</p>
                      <div className="text-[10px] text-slate-400 mt-2 font-medium">Category ID: {item.event_category_id || "—"}</div>
                    </div>
                    <div className="pt-2 border-t border-slate-100 flex justify-end gap-2">
                      <button
                        onClick={() => setConfigModal({ type: "eventStallItems", action: "edit", data: item })}
                        className="p-1 rounded-md text-amber-600 hover:bg-amber-50"
                        title="Edit Stall Item"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={async () => {
                          if (window.confirm("Are you sure you want to delete this stall item?")) {
                            try {
                              await eventStallItemsAPI.delete(item.id);
                              fetchData();
                            } catch (e) {
                              alert("Failed to delete stall item.");
                            }
                          }
                        }}
                        className="p-1 rounded-md text-red-500 hover:bg-red-50"
                        title="Delete Stall Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
                {eventStallItems.length === 0 && (
                  <p className="text-slate-400 text-xs">No stall items found.</p>
                )}
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

          {/* TAB: MEDIA & IMAGES */}
          {activeTab === "media" && (
            <MediaManagerTab />
          )}

          {/* TAB: AI CHAT LOGS */}
          {activeTab === "chatLogs" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-220px)]">
              {/* Left Column: Sessions List */}
              <div className="bg-white rounded-2xl border border-amber-900/10 shadow-sm overflow-hidden flex flex-col h-full">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <h3 className="font-serif text-sm font-bold text-[#3A1029]">AI Chat Sessions</h3>
                  <button 
                    onClick={fetchSessions}
                    className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 transition-colors"
                    title="Refresh Sessions"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loadingSessions ? "animate-spin" : ""}`} />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto divide-y divide-slate-100 select-none">
                  {loadingSessions ? (
                    <div className="text-center py-10 text-xs text-slate-400">Loading sessions...</div>
                  ) : chatSessions.length === 0 ? (
                    <div className="text-center py-10 text-xs text-slate-400">No chat sessions logged yet.</div>
                  ) : (
                    chatSessions.map((session) => {
                      const active = selectedSessionId === session.session_id;
                      return (
                        <div
                          key={session.session_id}
                          onClick={() => fetchSessionMessages(session.session_id)}
                          className={`p-3.5 cursor-pointer hover:bg-amber-50/40 transition-colors flex flex-col gap-1.5 border-l-4 ${
                            active ? "bg-amber-50/70 border-amber-500" : "border-transparent"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-xs font-bold text-slate-800 line-clamp-1 flex-1">
                              {session.title || "Catering Inquiry"}
                            </h4>
                            <span className="bg-amber-100 text-amber-900 text-[9px] font-bold px-1.5 py-0.2 rounded-full shrink-0">
                              {session.message_count} msgs
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-[10px] text-slate-400">
                            <span>ID: ...{session.session_id.substring(8, 17)}</span>
                            <span>{new Date(session.last_active_at).toLocaleString("en-IN", { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' })}</span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Right Column: Chat History Viewer */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-amber-900/10 shadow-sm overflow-hidden flex flex-col h-full">
                {selectedSessionId ? (
                  <>
                    <div className="p-4 border-b border-slate-100 bg-[#FAF7F2] flex items-center justify-between">
                      <div>
                        <h3 className="font-serif text-sm font-bold text-[#3A1029]">
                          Conversation Details
                        </h3>
                        <p className="text-[10px] text-slate-500">Session ID: {selectedSessionId}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                        Active Log
                      </span>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAF8F5] select-text">
                      {loadingMessages ? (
                        <div className="text-center py-20 text-xs text-slate-400">Loading messages...</div>
                      ) : (
                        sessionMessages.map((msg) => {
                          const isUser = msg.sender === "user";
                          return (
                            <div
                              key={msg.id}
                              className={`flex flex-col max-w-[85%] ${
                                isUser ? "ml-auto items-end" : "mr-auto items-start"
                              }`}
                            >
                              <div
                                className={`p-3 rounded-2xl text-xs leading-relaxed ${
                                  isUser
                                    ? "bg-[#3A1029] text-white rounded-tr-none"
                                    : "bg-white border border-slate-200 text-slate-800 rounded-tl-none"
                                }`}
                              >
                                {msg.message}
                              </div>
                              <span className="text-[9px] text-slate-400 mt-1 px-1">
                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400 space-y-2">
                    <MessageSquare className="w-12 h-12 text-slate-300" />
                    <h3 className="font-serif text-base font-bold text-slate-600">No Session Selected</h3>
                    <p className="text-xs max-w-sm">
                      Select a chat session on the left to monitor the conversation log between the user and the AI assistant in real-time.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </main>

      {/* ========================================================================= */}
      {/* 3. MODALS (CREATE QUOTATION / CREATE INVOICE / PRINT INVOICE)              */}
      {/* ========================================================================= */}

      {showQuotationModal && (
        <QuotationModalForm
          onClose={() => setShowQuotationModal(false)}
          onSave={handleCreateQuotation}
        />
      )}

      {showInvoiceModal && (
        <InvoiceModalForm
          onClose={() => setShowInvoiceModal(false)}
          onSave={handleCreateInvoice}
        />
      )}

      {showClientModal && (
        <ClientModalForm
          onClose={() => setShowClientModal(false)}
          onSave={handleCreateClient}
        />
      )}

      {printInvoiceData && (
        <PrintInvoiceModal
          invoice={printInvoiceData}
          onClose={() => setPrintInvoiceData(null)}
        />
      )}

      {configModal && (
        <ConfigModalForm
          config={configModal}
          dataList={{
            menuTypes,
            menuCategories,
            eventCategories
          }}
          onClose={() => setConfigModal(null)}
          onSave={fetchData}
        />
      )}

    </div>
  );
}

// ADMIN PASSCODE AUTHENTICATION GATE COMPONENT
function AdminLoginGate({ onLogin, defaultPin }: { onLogin: (emailOrPin: string, password?: string) => Promise<boolean>; defaultPin: string }) {
  const [loginMethod, setLoginMethod] = useState<"email" | "pin">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputPin, setInputPin] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const success = loginMethod === "email"
        ? await onLogin(email, password)
        : await onLogin(inputPin);

      if (!success) {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
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
            Admin Security Login
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
            This Catering CRM portal is protected. Log in using your admin credentials or passcode PIN.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-[#FAF7F2] p-1 rounded-xl border border-slate-200">
          <button
            type="button"
            onClick={() => { setLoginMethod("email"); setError(false); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${loginMethod === "email" ? "bg-[#3A1029] text-amber-300 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            Email Login
          </button>
          <button
            type="button"
            onClick={() => { setLoginMethod("pin"); setError(false); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${loginMethod === "pin" ? "bg-[#3A1029] text-amber-300 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            Passcode PIN
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold text-center flex items-center justify-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            {loginMethod === "email" ? "Invalid Email or Password. Please try again." : "Invalid Admin PIN. Please try again."}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {loginMethod === "email" ? (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(false); }}
                  placeholder="admin@mycateringchennai.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm font-semibold outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Password
                </label>
                <div className="relative">
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(false); }}
                    placeholder="Enter password..."
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm font-semibold outline-none transition-all"
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
            </>
          ) : (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Enter Admin PIN / Passcode
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
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#3A1029] to-[#251238] text-amber-300 text-xs font-bold uppercase tracking-widest hover:brightness-110 disabled:opacity-50 shadow-lg transition-all flex items-center justify-center gap-2 border border-amber-400/40"
          >
            <Key className="w-4 h-4 text-amber-300" />
            <span>{loading ? "Authenticating..." : "Unlock CRM Portal"}</span>
          </button>
        </form>

        <div className="pt-2 border-t border-slate-100 text-center space-y-1.5">
          {loginMethod === "email" ? (
            <button
              type="button"
              onClick={() => {
                setEmail("admin@mycateringchennai.com");
                setPassword("Admin@123");
              }}
              className="text-[11px] text-amber-800 hover:underline font-semibold block mx-auto"
            >
              Auto-fill default Admin credentials
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setInputPin("9940396005")}
              className="text-[11px] text-amber-800 hover:underline font-semibold block mx-auto"
            >
              Auto-fill default Passcode (9940396005)
            </button>
          )}
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

// NEW CLIENT FORM MODAL
function ClientModalForm({ onClose, onSave }: { onClose: () => void; onSave: (c: any) => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, phone, email, location, notes });
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-purple-400">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-serif text-xl font-bold text-purple-950">Add New Client Lead</h3>
          <button onClick={onClose}><X className="w-5 h-5 text-slate-400 hover:text-slate-700" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs sm:text-sm">
          <div>
            <label className="font-bold block mb-1">Client Name</label>
            <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full p-2.5 rounded-xl border border-slate-200" />
          </div>
          <div>
            <label className="font-bold block mb-1">Phone</label>
            <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 Phone" className="w-full p-2.5 rounded-xl border border-slate-200" />
          </div>
          <div>
            <label className="font-bold block mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" className="w-full p-2.5 rounded-xl border border-slate-200" />
          </div>
          <div>
            <label className="font-bold block mb-1">City / Location</label>
            <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Chennai" className="w-full p-2.5 rounded-xl border border-slate-200" />
          </div>
          <div>
            <label className="font-bold block mb-1">Notes</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Additional notes..." className="w-full p-2.5 rounded-xl border border-slate-200 h-20 resize-none" />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold">Cancel</button>
            <button type="submit" className="flex-1 py-2.5 rounded-xl bg-purple-700 text-white font-bold">Save Client</button>
          </div>
        </form>
      </div>
    </div>
  );
}


// DYNAMIC CONFIGURATION MODAL FOR MENUS & EVENT SETTINGS
function ConfigModalForm({
  config,
  dataList,
  onClose,
  onSave
}: {
  config: { type: "packages" | "menuTypes" | "menuCategories" | "menuItems" | "eventCategories" | "eventStallItems"; action: "add" | "edit"; data?: any };
  dataList: {
    menuTypes: any[];
    menuCategories: any[];
    eventCategories: any[];
  };
  onClose: () => void;
  onSave: () => void;
}) {
  const { type, action, data } = config;

  const [name, setName] = useState(data?.name || "");
  const [price, setPrice] = useState(data?.price !== undefined ? String(data.price) : "");
  const [items, setItems] = useState(data?.items || "");
  const [description, setDescription] = useState(data?.description || "");
  const [typeId, setTypeId] = useState(data?.type_id || data?.typeId || "");
  const [category, setCategory] = useState(data?.category || "");
  const [isVeg, setIsVeg] = useState(data?.is_veg ?? true);
  const [unit, setUnit] = useState(data?.unit || "stall");
  const [catType, setCatType] = useState(data?.type || "Events");
  const [eventCatId, setEventCatId] = useState(data?.event_category_id || data?.eventCategoryId || "");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (type === "packages") {
        const payload = { name, price: Number(price) || 0, items, description };
        if (action === "add") await menuPackagesAPI.create(payload);
        else await menuPackagesAPI.update(data.id, payload);
      }
      else if (type === "menuTypes") {
        const payload = { name };
        if (action === "add") await menuTypesAPI.create(payload);
        else await menuTypesAPI.update(data.id, payload);
      }
      else if (type === "menuCategories") {
        const payload = { name, type_id: typeId ? Number(typeId) : null };
        if (action === "add") await menuCategoriesAPI.create(payload);
        else await menuCategoriesAPI.update(data.id, payload);
      }
      else if (type === "menuItems") {
        const matchedCat = dataList.menuCategories.find(c => c.name === category);
        const payload = {
          name,
          category,
          price: Number(price) || 0,
          is_veg: isVeg ? 1 : 0,
          menu_category_id: matchedCat?.id || null
        };
        if (action === "add") await menuAPI.create(payload);
        else await menuAPI.update(data.id, payload);
      }
      else if (type === "eventCategories") {
        const payload = { name, type: catType, description };
        if (action === "add") await eventCategoriesAPI.create(payload);
        else await eventCategoriesAPI.update(data.id, payload);
      }
      else if (type === "eventStallItems") {
        const payload = {
          name,
          event_category_id: eventCatId ? Number(eventCatId) : null,
          price: Number(price) || 0,
          unit
        };
        if (action === "add") await eventStallItemsAPI.create(payload);
        else await eventStallItemsAPI.update(data.id, payload);
      }

      onSave();
      onClose();
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to save data. Make sure the backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    const act = action === "add" ? "Add New" : "Edit";
    const entity =
      type === "packages" ? "Menu Package" :
        type === "menuTypes" ? "Menu Type" :
          type === "menuCategories" ? "Menu Category" :
            type === "menuItems" ? "Menu Item" :
              type === "eventCategories" ? "Event Category" :
                "Event Stall Item";
    return `${act} ${entity}`;
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-amber-400 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-serif text-lg font-bold text-[#3A1029]">{getTitle()}</h3>
          <button onClick={onClose}><X className="w-5 h-5 text-slate-400 hover:text-slate-700" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">

          <div>
            <label className="font-bold text-slate-700 block mb-1">Name</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name..."
              className="w-full p-2.5 rounded-xl border border-slate-200"
            />
          </div>

          {type === "packages" && (
            <>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Price per Head (₹)</label>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="450"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Includes (Inclusions)</label>
                <input
                  value={items}
                  onChange={(e) => setItems(e.target.value)}
                  placeholder="e.g. Veg, Non-Veg, Sweets..."
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Details about the package..."
                  rows={3}
                  className="w-full p-2.5 rounded-xl border border-slate-200 resize-none"
                />
              </div>
            </>
          )}

          {type === "menuCategories" && (
            <div>
              <label className="font-bold text-slate-700 block mb-1">Menu Type (optional)</label>
              <select
                value={typeId}
                onChange={(e) => setTypeId(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
              >
                <option value="">-- Select type --</option>
                {dataList.menuTypes.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
          )}

          {type === "menuItems" && (
            <>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Category</label>
                <select
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="">Select category</option>
                  {dataList.menuCategories.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Price per head/plate (₹)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isVegCheckbox"
                  checked={isVeg}
                  onChange={(e) => setIsVeg(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
                />
                <label htmlFor="isVegCheckbox" className="font-bold text-slate-700 select-none">Vegetarian Dish</label>
              </div>
            </>
          )}

          {type === "eventCategories" && (
            <>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Classification Type</label>
                <select
                  value={catType}
                  onChange={(e) => setCatType(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="Events">Events</option>
                  <option value="Stalls">Stalls</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe category..."
                  rows={2}
                  className="w-full p-2.5 rounded-xl border border-slate-200 resize-none"
                />
              </div>
            </>
          )}

          {type === "eventStallItems" && (
            <>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Event / Stall Category</label>
                <select
                  required
                  value={eventCatId}
                  onChange={(e) => setEventCatId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="">Select category</option>
                  {dataList.eventCategories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name} ({c.type || "Events"})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Price (₹)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Unit</label>
                <input
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  placeholder="e.g. stall, plate, head"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>
            </>
          )}

          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl bg-[#3A1029] text-amber-300 font-bold disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}


// Import static asset fallbacks for website images
import banner1 from "@/assets/banner1.jpg";
import banner2 from "@/assets/banner 2.jpg";
import banner3 from "@/assets/banner 3.jpg";
import bananaLeafFeastBlended from "@/assets/banana-leaf-feast-blended.png";
import bananaLeafReal from "@/assets/banana-leaf-real.jpg";
import gulabJamun from "@/assets/IMG-20260327-WA0010.jpg.jpeg";
import aiWeddingFeast from "@/assets/ai-wedding-feast.png";
import aiTiffinFeast from "@/assets/ai-tiffin-feast.png";
import realFeastMeal from "@/assets/2_20260624_020643_0001.png";
import aiSweetsFeast from "@/assets/ai-sweets-feast.png";
import weddingHall from "@/assets/IMG_4558.webp";
import engagementCatering from "@/assets/engagement-catering.jpg";
import corporateCatering from "@/assets/corporate-catering.jpg";
import brassLamps from "@/assets/IMG-20260601-WA0053.jpg.jpeg";
import buffetCounter from "@/assets/images-32.jpeg";
import liveCounter from "@/assets/images-31.jpeg";
import founder from "@/assets/IMG-20260331-WA0002.jpg.jpeg";
import buffetSetup from "@/assets/1.jpg";
import liveStall from "@/assets/F.jpg";
import bananaLeafFeast from "@/assets/images-23.jpeg";

// ─────────────────────────────────────────────────────────────────────────────
// MEDIA MANAGER TAB — upload & manage all website images from admin
// ─────────────────────────────────────────────────────────────────────────────
const IMAGE_SLOTS = [
  // ── Homepage: Hero Carousel ─────────────────────────────────────────────────
  { key: "hero_slide_1", group: "Homepage – Hero Carousel", label: "Hero Slide 1 – Authentic Flavours", hint: "Homepage hero carousel slide 1 (recommended 1920×900)", fallback: banner2 },
  { key: "hero_slide_2", group: "Homepage – Hero Carousel", label: "Hero Slide 2 – Memorable Events", hint: "Homepage hero carousel slide 2 (recommended 1920×900)", fallback: banner3 },
  { key: "hero_slide_3", group: "Homepage – Hero Carousel", label: "Hero Slide 3 – 20+ Years Legacy", hint: "Homepage hero carousel slide 3 (recommended 1920×900)", fallback: banner1 },
  { key: "hero_slide_4", group: "Homepage – Hero Carousel", label: "Hero Slide 4 – Banana Leaf Saapadu", hint: "Homepage hero carousel slide 4 (recommended 1920×900)", fallback: bananaLeafFeastBlended },
  { key: "hero_slide_5", group: "Homepage – Hero Carousel", label: "Hero Slide 5 – Divine Desserts", hint: "Homepage hero carousel slide 5 (recommended 1920×900)", fallback: gulabJamun },
  { key: "hero_slide_6", group: "Homepage – Hero Carousel", label: "Hero Slide 6 – Corporate Catering", hint: "Homepage hero carousel slide 6 (recommended 1920×900)", fallback: buffetCounter },
  // ── Homepage: Portrait Carousel ─────────────────────────────────────────────
  { key: "portrait_1", group: "Homepage – Portrait Showcase", label: "Portrait 1 – Royal Banana Leaf Virundhu", hint: "Right-side portrait carousel (square, min 600×800)", fallback: aiWeddingFeast },
  { key: "portrait_2", group: "Homepage – Portrait Showcase", label: "Portrait 2 – Thala Vazhai Saapadu", hint: "Right-side portrait carousel (square, min 600×800)", fallback: bananaLeafFeastBlended },
  { key: "portrait_3", group: "Homepage – Portrait Showcase", label: "Portrait 3 – Tiffin Feast", hint: "Right-side portrait carousel (square, min 600×800)", fallback: aiTiffinFeast },
  { key: "portrait_4", group: "Homepage – Portrait Showcase", label: "Portrait 4 – Traditional Indian Meal", hint: "Right-side portrait carousel (square, min 600×800)", fallback: realFeastMeal },
  { key: "portrait_5", group: "Homepage – Portrait Showcase", label: "Portrait 5 – Elaneer Payasam & Sweets", hint: "Right-side portrait carousel (square, min 600×800)", fallback: aiSweetsFeast },
  { key: "portrait_6", group: "Homepage – Portrait Showcase", label: "Portrait 6 – Traditional Desserts", hint: "Right-side portrait carousel (square, min 600×800)", fallback: gulabJamun },
  // ── Homepage: Services Grid ──────────────────────────────────────────────────
  { key: "home_services_wedding", group: "Homepage – Services Grid", label: "Services Card – Wedding Catering", hint: "Services offered grid: Wedding card image (4:3)", fallback: weddingHall },
  { key: "home_services_engagement", group: "Homepage – Services Grid", label: "Services Card – Engagement & Reception", hint: "Services offered grid: Engagement card image (4:3)", fallback: aiWeddingFeast },
  { key: "home_services_corporate", group: "Homepage – Services Grid", label: "Services Card – Corporate Catering", hint: "Services offered grid: Corporate card image (4:3)", fallback: corporateCatering },
  { key: "home_services_housewarming", group: "Homepage – Services Grid", label: "Services Card – Housewarming Catering", hint: "Services offered grid: Housewarming card image (4:3)", fallback: brassLamps },
  { key: "home_services_banana_leaf", group: "Homepage – Services Grid", label: "Services Card – Banana Leaf Meal", hint: "Services offered grid: Banana leaf card image (4:3)", fallback: realFeastMeal },
  { key: "home_services_festival", group: "Homepage – Services Grid", label: "Services Card – Festival Catering", hint: "Services offered grid: Festival card image (4:3)", fallback: buffetCounter },
  // ── Homepage: Mobile Hero ───────────────────────────────────────────────────
  { key: "mobile_hero_1", group: "Homepage – Mobile Hero", label: "Mobile Hero Slide 1 – Authentic Flavours", hint: "Mobile homepage hero carousel (recommended 800×600)", fallback: banner2 },
  { key: "mobile_hero_2", group: "Homepage – Mobile Hero", label: "Mobile Hero Slide 2 – Engagement Catering", hint: "Mobile homepage hero carousel (recommended 800×600)", fallback: engagementCatering },
  { key: "mobile_hero_3", group: "Homepage – Mobile Hero", label: "Mobile Hero Slide 3 – 20+ Years Legacy", hint: "Mobile homepage hero carousel (recommended 800×600)", fallback: banner1 },
  // ── About Page ───────────────────────────────────────────────────────────────
  { key: "about_hero", group: "About Page", label: "About Page – Hero Banner", hint: "Main image on the About page hero (recommended 4:5 portrait)", fallback: buffetSetup },
  { key: "gallery_1", group: "Gallery Page", label: "Gallery 1 – VIP Wedding Couple Setup", hint: "Gallery photo (square, min 800×800)", fallback: weddingHall },
  { key: "gallery_2", group: "Gallery Page", label: "Gallery 2 – Thala Vazhai Saapadu", hint: "Gallery photo (square, min 800×800)", fallback: realFeastMeal },
  { key: "gallery_3", group: "Gallery Page", label: "Gallery 3 – Grand Wedding Banquet", hint: "Gallery photo (square, min 800×800)", fallback: bananaLeafFeastBlended },
  { key: "gallery_4", group: "Gallery Page", label: "Gallery 4 – Live Dosa & Chaat Counter", hint: "Gallery photo (square, min 800×800)", fallback: liveCounter },
  { key: "gallery_5", group: "Gallery Page", label: "Gallery 5 – Chandelier Buffet Setup", hint: "Gallery photo (square, min 800×800)", fallback: buffetCounter },
  { key: "gallery_6", group: "Gallery Page", label: "Gallery 6 – Pure Ghee Sweets", hint: "Gallery photo (square, min 800×800)", fallback: gulabJamun },
  { key: "gallery_7", group: "Gallery Page", label: "Gallery 7 – Founder D. Venkat & Team", hint: "Gallery photo (square, min 800×800)", fallback: founder },
  { key: "gallery_8", group: "Gallery Page", label: "Gallery 8 – Brass Lamps & Decor", hint: "Gallery photo (square, min 800×800)", fallback: brassLamps },
  // ── Services Page ────────────────────────────────────────────────────────────
  { key: "service_wedding", group: "Services Page", label: "Services – Wedding Catering Image", hint: "Services page: Wedding section image (4:3)", fallback: bananaLeafFeast },
  { key: "service_engagement", group: "Services Page", label: "Services – Engagement Catering Image", hint: "Services page: Engagement section image (4:3)", fallback: liveStall },
  { key: "service_corporate", group: "Services Page", label: "Services – Corporate Catering Image", hint: "Services page: Corporate section image (4:3)", fallback: buffetSetup },
  // ── Why Choose Us & Footer ───────────────────────────────────────────────────
  { key: "why_choose_us", group: "Sections & Footer", label: "Why Choose Us – Background Image", hint: "Parallax background image in the Why Choose Us section (1920×1080 recommended)", fallback: banner3 },
  // ── Branding ─────────────────────────────────────────────────────────────────
  { key: "logo", group: "Branding", label: "Company Logo", hint: "Logo shown in header and invoices (PNG transparent recommended, min 200×80)", fallback: logoImg },
];

function MediaManagerTab() {
  const [images, setImages] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const loadImages = async () => {
    try {
      const res = await mediaAPI.list();
      setImages(res?.data || {});
    } catch (e) {
      console.error("Failed to load media:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadImages(); }, []);

  const handleUpload = async (key: string, file: File) => {
    setUploading(key);
    try {
      const res = await mediaAPI.upload(key, file);
      if (res?.data?.url) {
        setImages(prev => ({ ...prev, [key]: res.data.url }));
      }
    } catch (e: any) {
      alert(e.message || "Upload failed");
    } finally {
      setUploading(null);
    }
  };

  const handleDelete = async (key: string) => {
    if (!window.confirm("Remove this image?")) return;
    try {
      await mediaAPI.delete(key);
      setImages(prev => { const n = { ...prev }; delete n[key]; return n; });
    } catch (e: any) {
      alert(e.message || "Delete failed");
    }
  };

  // Group slots by their `group` field
  const groups = IMAGE_SLOTS.reduce<Record<string, typeof IMAGE_SLOTS>>((acc, slot) => {
    const g = slot.group;
    if (!acc[g]) acc[g] = [];
    acc[g].push(slot);
    return acc;
  }, {});

  const groupNames = Object.keys(groups);

  // Toggle group collapse
  const toggleGroup = (g: string) => {
    setExpandedGroups(prev => ({ ...prev, [g]: prev[g] === false ? true : false }));
  };

  const totalUploaded = IMAGE_SLOTS.filter(s => !!images[s.key]).length;

  const renderSlot = (slot: typeof IMAGE_SLOTS[number]) => {
    const currentUrl = images[slot.key];
    const displayUrl = currentUrl || slot.fallback;
    const isUploading = uploading === slot.key;

    return (
      <div key={slot.key} className="bg-white rounded-2xl border border-amber-900/10 shadow-sm overflow-hidden flex flex-col">
        {/* Image Preview */}
        <div className="relative bg-slate-100 w-full aspect-video flex items-center justify-center overflow-hidden">
          {displayUrl ? (
            <>
              <img
                src={displayUrl}
                alt={slot.label}
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              {currentUrl && (
                <>
                  <button
                    onClick={() => handleDelete(slot.key)}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 shadow-md hover:bg-red-700 transition-colors"
                    title="Remove image"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  {/* Uploaded badge */}
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-emerald-600/90 text-white text-[10px] font-bold uppercase tracking-wide">
                    ✓ Uploaded
                  </span>
                </>
              )}
              {!currentUrl && (
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-slate-600/90 text-white text-[10px] font-bold uppercase tracking-wide">
                  Default (Live)
                </span>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center gap-2 text-slate-400">
              <Image className="w-8 h-8" />
              <span className="text-[11px] font-medium">No image set</span>
              <span className="text-[10px] text-slate-300">Using default image</span>
            </div>
          )}
          {isUploading && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
              <div className="text-sm font-bold text-amber-700 animate-pulse">Uploading...</div>
            </div>
          )}
        </div>

        {/* Info & Upload */}
        <div className="p-4 flex flex-col gap-2 flex-1">
          <div>
            <h4 className="font-bold text-sm text-slate-800">{slot.label}</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">{slot.hint}</p>
          </div>

          <label className="mt-auto cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              disabled={isUploading}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleUpload(slot.key, file);
                e.target.value = '';
              }}
            />
            <span className={`flex items-center justify-center gap-1.5 w-full py-2 rounded-xl text-xs font-bold transition-all ${isUploading
              ? "bg-slate-100 text-slate-400 cursor-not-allowed"
              : "bg-[#3A1029] text-amber-300 hover:bg-[#2A0B1E] cursor-pointer"
              }`}>
              <Upload className="w-3.5 h-3.5" />
              {currentUrl ? "Replace Image" : "Upload Image"}
            </span>
          </label>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-400 text-sm font-medium">Loading media library...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-amber-900/10 shadow-sm">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#3A1029]">Media & Images</h2>
            <p className="text-xs text-slate-500 mt-1">
              Upload and manage all website images — changes take effect immediately on the live site.
              Recommended formats: JPG, PNG, WebP. Max 5MB per image.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold text-slate-500">
              {totalUploaded} / {IMAGE_SLOTS.length} uploaded
            </span>
            <div className="h-2 w-28 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${(totalUploaded / IMAGE_SLOTS.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grouped Sections */}
      {groupNames.map((groupName) => {
        const slots = groups[groupName];
        const uploadedInGroup = slots.filter(s => !!images[s.key]).length;
        const isExpanded = expandedGroups[groupName] !== false; // default open

        return (
          <div key={groupName} className="bg-white rounded-2xl border border-amber-900/10 shadow-sm overflow-hidden">
            {/* Section Header */}
            <button
              onClick={() => toggleGroup(groupName)}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="font-serif font-bold text-sm text-[#3A1029]">{groupName}</span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${uploadedInGroup === slots.length
                  ? "bg-emerald-100 text-emerald-700"
                  : uploadedInGroup > 0
                    ? "bg-amber-100 text-amber-700"
                    : "bg-slate-100 text-slate-500"
                  }`}>
                  {uploadedInGroup}/{slots.length} uploaded
                </span>
              </div>
              <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
            </button>

            {/* Slot Grid */}
            {isExpanded && (
              <div className="px-5 pb-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 border-t border-slate-100 pt-4">
                {slots.map(renderSlot)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

