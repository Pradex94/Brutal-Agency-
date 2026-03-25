import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pageTransition, fadeUp } from '../utils/animations';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { 
  collection, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { 
  Users, 
  Trash2, 
  CheckCircle, 
  Clock, 
  XCircle, 
  ExternalLink,
  ShieldAlert,
  Loader2,
  Activity
} from 'lucide-react';
import { Navigate } from 'react-router-dom';

const ADMIN_EMAIL = "pradexbisla1994@gmail.com";

interface Lead {
  id: string;
  name: string;
  email: string;
  website?: string;
  Revenue?: string;
  Bottleneck?: string;
  createdAt: Timestamp;
  status: 'new' | 'contacted' | 'closed';
}

export default function AdminCRM() {
  const { user, loading: authLoading } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    if (user?.email === ADMIN_EMAIL) {
      fetchLeads();
    }
  }, [user]);

  const fetchLeads = async () => {
    setLoading(true);
    const path = 'leads';
    try {
      const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const leadsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        status: doc.data().status || 'new' // Default to new if status is missing
      })) as Lead[];
      setLeads(leadsData);
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (leadId: string, newStatus: Lead['status']) => {
    setActionLoading(leadId);
    const path = `leads/${leadId}`;
    try {
      const leadRef = doc(db, 'leads', leadId);
      await updateDoc(leadRef, { status: newStatus });
      setLeads(prev => prev.map(lead => 
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      ));
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    } finally {
      setActionLoading(null);
    }
  };

  const deleteLead = async (leadId: string) => {
    if (!window.confirm('ARE YOU SURE YOU WANT TO DELETE THIS LEAD? THIS ACTION IS PERMANENT.')) return;
    
    setActionLoading(leadId);
    const path = `leads/${leadId}`;
    try {
      await deleteDoc(doc(db, 'leads', leadId));
      setLeads(prev => prev.filter(lead => lead.id !== leadId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    } finally {
      setActionLoading(null);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pure-white">
        <Loader2 className="w-12 h-12 animate-spin text-brutal-black" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.email !== ADMIN_EMAIL) {
    return (
      <motion.div 
        variants={pageTransition}
        initial="initial"
        animate="animate"
        className="min-h-screen flex flex-col items-center justify-center bg-pure-white p-8 text-center"
      >
        <ShieldAlert className="w-24 h-24 text-red-500 mb-8" strokeWidth={3} />
        <h1 className="font-heading font-black text-5xl md:text-7xl uppercase mb-4">ACCESS DENIED</h1>
        <p className="font-body font-bold text-xl uppercase max-w-md">YOU DO NOT HAVE PERMISSION TO VIEW THIS AREA. CONTACT THE SYSTEM ADMINISTRATOR.</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      key="admin-crm-page"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen flex flex-col bg-pure-white"
    >
      <Navbar />
      
      <main className="flex-grow py-24 md:py-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <Users className="w-10 h-10 md:w-12 md:h-12" strokeWidth={3} />
              <h1 className="font-heading font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter uppercase leading-none">
                ADMIN CRM
              </h1>
            </div>
            <div className="bg-neon-green text-brutal-black p-6 md:p-8 border-4 border-brutal-black brutal-shadow inline-block">
              <p className="font-body font-bold text-xl md:text-2xl uppercase">
                MANAGING <span className="font-black">{leads.length}</span> ACTIVE LEADS
              </p>
            </div>
          </motion.div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <Loader2 className="w-12 h-12 animate-spin text-brutal-black" />
              <p className="font-mono font-bold uppercase tracking-widest">FETCHING DATA FROM THE VOID...</p>
            </div>
          ) : (
            <div className="bg-pure-white border-4 border-brutal-black brutal-shadow overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-brutal-black text-pure-white font-mono text-sm uppercase">
                    <th className="p-6 border-r-2 border-pure-white/20">NAME</th>
                    <th className="p-6 border-r-2 border-pure-white/20">CONTACT</th>
                    <th className="p-6 border-r-2 border-pure-white/20">BRAND DETAILS</th>
                    <th className="p-6 border-r-2 border-pure-white/20">STATUS</th>
                    <th className="p-6">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="font-body font-bold text-lg uppercase">
                  {leads.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-20 text-center text-brutal-black/40">
                        NO LEADS DETECTED IN THE SYSTEM.
                      </td>
                    </tr>
                  ) : (
                    leads.map((lead) => (
                      <tr key={lead.id} className="border-b-4 border-brutal-black hover:bg-acid-yellow/10 transition-colors">
                        <td className="p-6 border-r-4 border-brutal-black align-top">
                          <div className="font-heading font-black text-2xl mb-1">{lead.name}</div>
                          <div className="font-mono text-xs opacity-60">ID: {lead.id}</div>
                          <div className="font-mono text-xs mt-4 opacity-80">
                            {lead.createdAt?.toDate().toLocaleString()}
                          </div>
                        </td>
                        <td className="p-6 border-r-4 border-brutal-black align-top">
                          <a href={`mailto:${lead.email}`} className="hover:text-neon-green underline underline-offset-4 block mb-2">
                            {lead.email}
                          </a>
                        </td>
                        <td className="p-6 border-r-4 border-brutal-black align-top space-y-4">
                          {lead.website && (
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs bg-brutal-black text-pure-white px-2 py-1">URL</span>
                              <a href={lead.website} target="_blank" rel="noopener noreferrer" className="hover:text-neon-green flex items-center gap-1">
                                {lead.website.replace(/^https?:\/\//, '')} <ExternalLink className="w-4 h-4" />
                              </a>
                            </div>
                          )}
                          {lead.Revenue && (
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs bg-acid-yellow border-2 border-brutal-black px-2 py-1">REVENUE</span>
                              <span>{lead.Revenue}</span>
                            </div>
                          )}
                          {lead.Bottleneck && (
                            <div className="mt-4">
                              <span className="font-mono text-xs opacity-60 block mb-1">BOTTLENECK</span>
                              <p className="text-sm normal-case leading-relaxed bg-brutal-white p-3 border-2 border-brutal-black">
                                {lead.Bottleneck}
                              </p>
                            </div>
                          )}
                        </td>
                        <td className="p-6 border-r-4 border-brutal-black align-top">
                          <div className="flex flex-col gap-3">
                            <select 
                              value={lead.status}
                              onChange={(e) => updateStatus(lead.id, e.target.value as Lead['status'])}
                              disabled={actionLoading === lead.id}
                              className={`
                                border-4 border-brutal-black p-3 font-heading font-bold text-sm brutal-shadow-sm focus:outline-none focus:bg-neon-green transition-all
                                ${lead.status === 'new' ? 'bg-acid-yellow' : ''}
                                ${lead.status === 'contacted' ? 'bg-neon-green' : ''}
                                ${lead.status === 'closed' ? 'bg-pure-white opacity-60' : ''}
                              `}
                            >
                              <option value="new">NEW</option>
                              <option value="contacted">CONTACTED</option>
                              <option value="closed">CLOSED</option>
                            </select>
                            
                            <div className="flex items-center gap-2 text-xs font-mono">
                              {lead.status === 'new' && <Clock className="w-4 h-4 text-orange-500" />}
                              {lead.status === 'contacted' && <Activity className="w-4 h-4 text-blue-500" />}
                              {lead.status === 'closed' && <CheckCircle className="w-4 h-4 text-neon-green" />}
                              <span className="opacity-60">{lead.status.toUpperCase()}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-6 align-top">
                          <button 
                            onClick={() => deleteLead(lead.id)}
                            disabled={actionLoading === lead.id}
                            className="bg-red-500 text-pure-white p-4 border-4 border-brutal-black brutal-shadow-sm hover:bg-brutal-black hover:text-red-500 transition-all disabled:opacity-50"
                            title="DELETE LEAD"
                          >
                            {actionLoading === lead.id ? (
                              <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                              <Trash2 className="w-6 h-6" strokeWidth={3} />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </motion.div>
  );
}
