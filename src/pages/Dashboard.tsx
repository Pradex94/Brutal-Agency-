import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { pageTransition, fadeUp } from '../utils/animations';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  FolderKanban, 
  Activity, 
  Clock, 
  CheckCircle, 
  XCircle, 
  ExternalLink,
  TrendingUp,
  Calendar,
  Zap
} from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  orderBy, 
  Timestamp,
  addDoc,
  serverTimestamp,
  limit
} from 'firebase/firestore';

interface Lead {
  id: string;
  name: string;
  email: string;
  website?: string;
  Revenue?: string;
  Bottleneck?: string;
  createdAt: Timestamp;
  status: 'new' | 'contacted' | 'closed';
  userId?: string;
}

interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  createdAt: Timestamp;
}

interface Automation {
  id: string;
  userId: string;
  whatsapp: 'active' | 'inactive';
  email: 'active' | 'inactive';
  chatbot: 'active' | 'inactive';
}

interface LeadRequest {
  id: string;
  userId: string;
  businessType: string;
  location: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  createdAt: Timestamp;
}

interface ClientLead {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  website?: string;
  rating?: number;
  status: 'new' | 'contacted' | 'closed';
  source?: string;
  createdAt: Timestamp | string;
  userId?: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [clientLeads, setClientLeads] = useState<ClientLead[]>([]);
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [automation, setAutomation] = useState<Automation | null>(null);
  const [lastRequest, setLastRequest] = useState<LeadRequest | null>(null);
  const [businessType, setBusinessType] = useState('');
  const [location, setLocation] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const leadsQuery = user?.email === "pradexbisla1994@gmail.com" 
      ? collection(db, 'leads')
      : query(
          collection(db, 'leads'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );

    const activitiesQuery = query(
      collection(db, 'activities'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const automationsQuery = query(
      collection(db, 'automations'),
      where('userId', '==', user.uid)
    );

    const requestsQuery = query(
      collection(db, 'lead_requests'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc'),
      limit(1)
    );

    const isAdminUser = user?.email?.toLowerCase() === "pradexbisla1994@gmail.com";
    console.log("Dashboard: User email:", user?.email, "isAdmin:", isAdminUser);

    const clientLeadsQuery = isAdminUser
      ? query(collection(db, 'client_leads'), orderBy('createdAt', 'desc'))
      : query(
          collection(db, 'client_leads'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );

    const unsubLeads = onSnapshot(leadsQuery, (snapshot) => {
      console.log(`Fetched ${snapshot.size} manual leads`);
      setLeads(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Lead)));
      setLoading(false);
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'leads'));

    const unsubClientLeads = onSnapshot(clientLeadsQuery, (snapshot) => {
      console.log(`Fetched ${snapshot.size} automated leads for query:`, clientLeadsQuery);
      setClientLeads(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ClientLead)));
    }, (err) => {
      console.error("Error fetching client leads:", err);
      handleFirestoreError(err, OperationType.LIST, 'client_leads');
    });

    const unsubActivities = onSnapshot(activitiesQuery, (snapshot) => {
      setActivities(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ActivityLog)));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'activities'));

    const unsubAutomations = onSnapshot(automationsQuery, (snapshot) => {
      if (!snapshot.empty) {
        setAutomation({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Automation);
      }
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'automations'));

    const unsubRequests = onSnapshot(requestsQuery, (snapshot) => {
      if (!snapshot.empty) {
        setLastRequest({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as LeadRequest);
      }
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'lead_requests'));

    return () => {
      unsubLeads();
      unsubClientLeads();
      unsubActivities();
      unsubAutomations();
      unsubRequests();
    };
  }, [user]);

  useEffect(() => {
    console.log("Dashboard: clientLeads state updated:", clientLeads);
  }, [clientLeads]);

  const handleStartGeneration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !businessType || !location) return;

    setIsGenerating(true);
    try {
      // 1. Save to Firestore
      const path = 'lead_requests';
      await addDoc(collection(db, path), {
        userId: user.uid,
        businessType,
        location,
        status: 'pending',
        createdAt: serverTimestamp()
      });

      // 2. Call local proxy endpoint to avoid Mixed Content (HTTPS -> HTTP) issues
      const response = await fetch("/api/generate-leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: user.uid,
          businessType,
          location
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || errorData.message || 'Webhook failed');
      }

      setBusinessType('');
      setLocation('');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (err) {
      console.error('Error starting lead generation:', err);
      alert(`FAILED TO START LEAD GENERATION: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const getLeadsToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const manualLeads = leads.filter(lead => lead.createdAt.toDate() >= today).length;
    const automatedLeads = clientLeads.filter(lead => {
      const date = typeof lead.createdAt === 'string' ? new Date(lead.createdAt) : lead.createdAt.toDate();
      return date >= today;
    }).length;
    return manualLeads + automatedLeads;
  };

  const getLeadsThisWeek = () => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const manualLeads = leads.filter(lead => lead.createdAt.toDate() >= weekAgo).length;
    const automatedLeads = clientLeads.filter(lead => {
      const date = typeof lead.createdAt === 'string' ? new Date(lead.createdAt) : lead.createdAt.toDate();
      return date >= weekAgo;
    }).length;
    return manualLeads + automatedLeads;
  };

  const isAutomationActive = () => {
    if (!automation) return 'INACTIVE';
    return (automation.whatsapp === 'active' || automation.email === 'active' || automation.chatbot === 'active') ? 'ACTIVE' : 'IDLE';
  };

  const stats = [
    { label: 'YOUR LEADS', value: (leads.length + clientLeads.length).toString(), icon: Users, color: 'bg-neon-green' },
    { label: 'YOUR PROJECTS', value: '0', icon: FolderKanban, color: 'bg-acid-yellow' },
    { label: 'AUTOMATION STATUS', value: isAutomationActive(), icon: Activity, color: 'bg-pure-white' },
  ];

  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'new': return 'bg-acid-yellow';
      case 'contacted': return 'bg-blue-400';
      case 'closed': return 'bg-neon-green';
      default: return 'bg-gray-200';
    }
  };

  return (
    <motion.div 
      key="dashboard-page"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen flex flex-col bg-pure-white"
    >
      <Navbar />
      
      <main className="flex-grow py-24 md:py-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={fadeUp}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-4">
              <LayoutDashboard className="w-10 h-10 md:w-12 md:h-12" strokeWidth={3} />
              <h1 className="font-heading font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter uppercase leading-none">
                DASHBOARD
              </h1>
            </div>
            <div className="bg-brutal-black text-pure-white p-6 md:p-8 border-4 border-brutal-black brutal-shadow inline-block">
              <p className="font-body font-bold text-xl md:text-2xl uppercase">
                WELCOME BACK, <span className="text-neon-green">{user?.email}</span>
              </p>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
                className={`${stat.color} border-4 border-brutal-black p-8 brutal-shadow relative overflow-hidden group`}
              >
                <stat.icon className="absolute -right-4 -bottom-4 w-24 h-24 opacity-10 group-hover:scale-110 transition-transform duration-500" />
                <h3 className="font-mono font-bold text-sm mb-4 uppercase tracking-widest">{stat.label}</h3>
                <p className="font-heading font-black text-5xl md:text-6xl uppercase leading-none">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Performance Overview */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-16"
          >
            <h2 className="font-heading font-black text-3xl md:text-4xl mb-8 uppercase border-b-4 border-brutal-black pb-4 flex items-center gap-3">
              <TrendingUp className="w-8 h-8" /> PERFORMANCE OVERVIEW
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="bg-pure-white border-4 border-brutal-black p-6 brutal-shadow flex flex-col items-center justify-center text-center">
                <p className="font-mono font-bold text-xs uppercase mb-2 opacity-60">LEADS TODAY</p>
                <p className="font-heading font-black text-4xl">{getLeadsToday()}</p>
              </div>
              <div className="bg-pure-white border-4 border-brutal-black p-6 brutal-shadow flex flex-col items-center justify-center text-center">
                <p className="font-mono font-bold text-xs uppercase mb-2 opacity-60">LEADS THIS WEEK</p>
                <p className="font-heading font-black text-4xl">{getLeadsThisWeek()}</p>
              </div>
              <div className="bg-pure-white border-4 border-brutal-black p-6 brutal-shadow flex flex-col items-center justify-center text-center">
                <p className="font-mono font-bold text-xs uppercase mb-2 opacity-60">TOTAL LEADS</p>
                <p className="font-heading font-black text-4xl">{leads.length + clientLeads.length}</p>
              </div>
            </div>
          </motion.div>

          {/* Lead Generation Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="mb-16"
          >
            <h2 className="font-heading font-black text-3xl md:text-4xl mb-8 uppercase border-b-4 border-brutal-black pb-4 flex items-center gap-3">
              <Zap className="w-8 h-8 text-acid-yellow" /> GENERATE LEADS
            </h2>
            <div className="bg-pure-white border-4 border-brutal-black p-8 brutal-shadow">
              <form onSubmit={handleStartGeneration} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                <div className="flex flex-col">
                  <label className="font-mono font-bold text-xs uppercase mb-2 opacity-60">BUSINESS TYPE</label>
                  <input 
                    type="text" 
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    placeholder="E.G. REAL ESTATE"
                    required
                    className="border-4 border-brutal-black p-4 font-body font-bold focus:bg-acid-yellow outline-none transition-colors"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-mono font-bold text-xs uppercase mb-2 opacity-60">LOCATION</label>
                  <input 
                    type="text" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="E.G. NEW YORK"
                    required
                    className="border-4 border-brutal-black p-4 font-body font-bold focus:bg-acid-yellow outline-none transition-colors"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isGenerating}
                  className="bg-neon-green border-4 border-brutal-black p-4 font-heading font-black text-xl brutal-shadow-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 uppercase"
                >
                  {isGenerating ? 'PROCESSING...' : 'START LEAD GENERATION'}
                </button>
              </form>

              {showSuccess && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="mt-6 bg-neon-green border-4 border-brutal-black p-4 brutal-shadow-sm flex items-center gap-3"
                >
                  <CheckCircle className="w-8 h-8" />
                  <div className="flex flex-col">
                    <span className="font-heading font-black text-xl uppercase tracking-tight leading-none">
                      GENERATION INITIATED!
                    </span>
                    <span className="font-mono text-xs font-bold uppercase opacity-70">
                      N8N WEBHOOK RECEIVED THE REQUEST. CHECK STATUS BELOW.
                    </span>
                  </div>
                </motion.div>
              )}

              {lastRequest && (
                <div className="mt-8 pt-6 border-t-4 border-brutal-black/10 flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs uppercase opacity-60">LATEST REQUEST:</span>
                    <span className="font-body font-bold uppercase bg-brutal-black text-pure-white px-2 py-1 text-sm">
                      {lastRequest.businessType} IN {lastRequest.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs uppercase opacity-60">STATUS:</span>
                    <span className={`font-body font-bold uppercase px-3 py-1 border-2 border-brutal-black text-sm
                      ${lastRequest.status === 'completed' ? 'bg-neon-green' : 
                        lastRequest.status === 'failed' ? 'bg-red-500 text-pure-white' : 
                        'bg-acid-yellow'}
                    `}>
                      {lastRequest.status === 'pending' ? 'PROCESSING...' : lastRequest.status}
                    </span>
                  </div>
                  <span className="font-mono text-xs uppercase opacity-40 ml-auto">
                    {lastRequest.createdAt?.toDate().toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Leads Table */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mb-16"
          >
            <h2 className="font-heading font-black text-3xl md:text-4xl mb-8 uppercase border-b-4 border-brutal-black pb-4 flex items-center gap-3">
              <Users className="w-8 h-8" /> AUTOMATED LEADS
            </h2>
            <div className="bg-pure-white border-4 border-brutal-black brutal-shadow overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1200px]">
                <thead>
                  <tr className="bg-brutal-black text-pure-white font-mono text-sm uppercase">
                    <th className="p-4 border-r-2 border-pure-white/20">NAME</th>
                    <th className="p-4 border-r-2 border-pure-white/20">PHONE / WEBSITE</th>
                    <th className="p-4 border-r-2 border-pure-white/20">ADDRESS</th>
                    <th className="p-4 border-r-2 border-pure-white/20">RATING</th>
                    <th className="p-4 border-r-2 border-pure-white/20">SOURCE</th>
                    <th className="p-4 border-r-2 border-pure-white/20">USER ID</th>
                    <th className="p-4 border-r-2 border-pure-white/20">STATUS</th>
                    <th className="p-4">CREATED AT</th>
                  </tr>
                </thead>
                <tbody className="font-body font-bold text-base uppercase">
                  {clientLeads.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-12 text-center text-brutal-black/40">
                        NO AUTOMATED LEADS DETECTED YET.
                      </td>
                    </tr>
                  ) : (
                    clientLeads.map((lead) => (
                      <tr key={lead.id} className="border-b-4 border-brutal-black hover:bg-acid-yellow/10 transition-colors">
                        <td className="p-4 border-r-4 border-brutal-black font-heading text-sm leading-tight">{lead.name}</td>
                        <td className="p-4 border-r-4 border-brutal-black">
                          <div className="flex flex-col gap-1">
                            <span className="text-sm">{lead.phone || 'NO PHONE'}</span>
                            {lead.website && (
                              <a href={lead.website} target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono underline flex items-center gap-1 text-blue-600">
                                VISIT SITE <ExternalLink className="w-2 h-2" />
                              </a>
                            )}
                          </div>
                        </td>
                        <td className="p-4 border-r-4 border-brutal-black">
                          <div className="text-[10px] leading-tight max-w-[200px] break-words">
                            {lead.address || 'N/A'}
                          </div>
                        </td>
                        <td className="p-4 border-r-4 border-brutal-black text-center">
                          <div className="flex items-center justify-center gap-1">
                            <span className="text-lg">{lead.rating || '0'}</span>
                            <span className="text-acid-yellow text-xl">★</span>
                          </div>
                        </td>
                        <td className="p-4 border-r-4 border-brutal-black font-mono text-[10px]">
                          {lead.source || 'N/A'}
                        </td>
                        <td className="p-4 border-r-4 border-brutal-black font-mono text-[10px] opacity-50">
                          {lead.userId || 'N/A'}
                        </td>
                        <td className="p-4 border-r-4 border-brutal-black">
                          <span className={`${getStatusColor(lead.status as any)} border-2 border-brutal-black px-2 py-1 text-[10px] whitespace-nowrap`}>
                            {lead.status || 'NEW'}
                          </span>
                        </td>
                        <td className="p-4 font-mono text-[10px] whitespace-nowrap">
                          {lead.createdAt 
                            ? (typeof lead.createdAt === 'string' 
                              ? new Date(lead.createdAt).toLocaleDateString() 
                              : lead.createdAt.toDate().toLocaleDateString())
                            : 'N/A'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Leads Table */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mb-16"
          >
            <h2 className="font-heading font-black text-3xl md:text-4xl mb-8 uppercase border-b-4 border-brutal-black pb-4 flex items-center gap-3">
              <Users className="w-8 h-8" /> YOUR LEADS
            </h2>
            <div className="bg-pure-white border-4 border-brutal-black brutal-shadow overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-brutal-black text-pure-white font-mono text-sm uppercase">
                    <th className="p-4 border-r-2 border-pure-white/20">NAME</th>
                    <th className="p-4 border-r-2 border-pure-white/20">CONTACT</th>
                    <th className="p-4 border-r-2 border-pure-white/20">DETAILS</th>
                    <th className="p-4 border-r-2 border-pure-white/20">STATUS</th>
                    <th className="p-4">DATE</th>
                  </tr>
                </thead>
                <tbody className="font-body font-bold text-base uppercase">
                  {leads.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-12 text-center text-brutal-black/40">
                        NO LEADS DETECTED YET.
                      </td>
                    </tr>
                  ) : (
                    leads.map((lead) => (
                      <tr key={lead.id} className="border-b-4 border-brutal-black hover:bg-acid-yellow/10 transition-colors">
                        <td className="p-4 border-r-4 border-brutal-black">{lead.name}</td>
                        <td className="p-4 border-r-4 border-brutal-black">
                          <div className="flex flex-col">
                            <span className="text-sm">{lead.email}</span>
                            {lead.website && (
                              <a href={lead.website} target="_blank" rel="noopener noreferrer" className="text-xs font-mono underline flex items-center gap-1 mt-1">
                                WEBSITE <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </td>
                        <td className="p-4 border-r-4 border-brutal-black">
                          <div className="text-xs space-y-1">
                            {lead.Revenue && <div>REV: {lead.Revenue}</div>}
                            {lead.Bottleneck && <div className="truncate max-w-[200px]" title={lead.Bottleneck}>BN: {lead.Bottleneck}</div>}
                          </div>
                        </td>
                        <td className="p-4 border-r-4 border-brutal-black">
                          <span className={`${getStatusColor(lead.status)} border-2 border-brutal-black px-2 py-1 text-xs`}>
                            {lead.status || 'NEW'}
                          </span>
                        </td>
                        <td className="p-4 font-mono text-xs">
                          {lead.createdAt?.toDate().toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="bg-pure-white border-4 border-brutal-black p-8 md:p-12 brutal-shadow"
            >
              <h2 className="font-heading font-black text-3xl md:text-4xl mb-8 uppercase border-b-4 border-brutal-black pb-4 flex items-center gap-3">
                <Calendar className="w-8 h-8" /> RECENT ACTIVITY
              </h2>
              <div className="space-y-6">
                {activities.length === 0 ? (
                  <p className="font-body font-bold text-lg uppercase text-brutal-black/40">NO RECENT ACTIVITY DETECTED.</p>
                ) : (
                  activities.slice(0, 5).map((activity) => (
                    <div key={activity.id} className="border-l-4 border-neon-green pl-6 py-2">
                      <p className="font-mono text-sm text-brutal-black/60 mb-1 uppercase">
                        {activity.createdAt?.toDate().toLocaleString()}
                      </p>
                      <p className="font-body font-bold text-lg uppercase">{activity.action}</p>
                    </div>
                  ))
                )}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
              className="bg-acid-yellow border-4 border-brutal-black p-8 md:p-12 brutal-shadow"
            >
              <h2 className="font-heading font-black text-3xl md:text-4xl mb-8 uppercase border-b-4 border-brutal-black pb-4 flex items-center gap-3">
                <Zap className="w-8 h-8" /> SYSTEM STATUS
              </h2>
              <div className="space-y-4 font-body font-bold text-lg uppercase">
                <div className="flex justify-between items-center border-b-2 border-brutal-black/10 pb-2">
                  <span>WHATSAPP AUTOMATION</span>
                  <span className={automation?.whatsapp === 'active' ? 'text-neon-green' : 'text-red-500'}>
                    {automation?.whatsapp?.toUpperCase() || 'INACTIVE'}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b-2 border-brutal-black/10 pb-2">
                  <span>EMAIL AUTOMATION</span>
                  <span className={automation?.email === 'active' ? 'text-neon-green' : 'text-red-500'}>
                    {automation?.email?.toUpperCase() || 'INACTIVE'}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b-2 border-brutal-black/10 pb-2">
                  <span>CHATBOT STATUS</span>
                  <span className={automation?.chatbot === 'active' ? 'text-neon-green' : 'text-red-500'}>
                    {automation?.chatbot?.toUpperCase() || 'INACTIVE'}
                  </span>
                </div>
                <div className="pt-4">
                  <div className="flex justify-between items-center text-sm font-mono opacity-60">
                    <span>DATABASE LATENCY</span>
                    <span>14MS</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
}
