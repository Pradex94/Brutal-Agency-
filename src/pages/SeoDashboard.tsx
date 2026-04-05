import React, { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { fetchLatestSeoReport } from '../services/seoService';
import { fadeUp, pageTransition } from '../utils/animations';
import { 
  Zap, 
  TrendingDown, 
  Globe, 
  Search, 
  Smartphone, 
  Monitor, 
  CheckCircle2, 
  AlertCircle, 
  LogOut, 
  BarChart3, 
  Layers, 
  Eye, 
  Target,
  ArrowUpRight,
  RefreshCw,
  Download,
  AlertTriangle
} from 'lucide-react';

export default function SeoDashboard() {
  const navigate = useNavigate();
  const { user, isPaid: authPaid, loading: authLoading } = useAuth();
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [auditWebsite, setAuditWebsite] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);

  const loadReport = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const latestReport = await fetchLatestSeoReport(user.uid);
      setReport(latestReport);
    } catch (err) {
      console.error('Failed to fetch SEO report:', err);
      setError('FAILED TO LOAD SEO REPORT. PLEASE TRY AGAIN.');
    } finally {
      setLoading(false);
    }
  };

  const handleRunAudit = async () => {
    if (!auditWebsite) {
      setError('PLEASE ENTER A WEBSITE URL.');
      return;
    }
    setIsAuditing(true);
    setError(null);
    try {
      const response = await fetch('/api/audit-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: user?.displayName || 'USER',
          email: user?.email || '',
          website: auditWebsite,
          userId: user?.uid
        })
      });

      if (!response.ok) throw new Error('AUDIT FAILED. TRY AGAIN.');
      
      // Wait a bit for n8n to process and save to Firestore
      setTimeout(() => {
        loadReport();
        setIsAuditing(false);
        setAuditWebsite('');
      }, 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'AUDIT FAILED.');
      setIsAuditing(false);
    }
  };

  useEffect(() => {
    if (!authLoading && user) {
      loadReport();
    }
  }, [user, authLoading]);

  const handleLogout = () => {
    localStorage.removeItem('isPaid');
    localStorage.removeItem('selectedPlan');
    navigate('/payment');
  };

  const handleRefresh = () => {
    loadReport();
  };

  const handleDownload = () => {
    if (!report) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", `seo_report_${report.website}_${new Date().toISOString()}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  if (authLoading || (loading && !report)) {
    return (
      <div className="min-h-screen bg-pure-white flex items-center justify-center">
        <div className="font-heading font-black text-4xl animate-pulse uppercase">LOADING...</div>
      </div>
    );
  }

  if (!authPaid) {
    return <Navigate to="/payment" replace />;
  }

  if (!report && !loading) {
    return (
      <div className="min-h-screen bg-pure-white flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-8">
          <div className="bg-pure-white border-4 border-brutal-black p-12 brutal-shadow text-center max-w-xl">
            <Search className="w-20 h-20 mx-auto mb-6 text-acid-yellow" />
            <h2 className="font-heading font-black text-4xl mb-4 uppercase tracking-tighter">NO SEO REPORT FOUND</h2>
            <p className="font-body font-bold text-xl mb-8 uppercase">ENTER YOUR WEBSITE TO GENERATE YOUR PREMIUM DASHBOARD.</p>
            
            <div className="flex flex-col gap-4 max-w-md mx-auto">
              <input 
                type="url"
                value={auditWebsite}
                onChange={(e) => setAuditWebsite(e.target.value)}
                placeholder="HTTPS://YOURBRAND.COM"
                className="border-4 border-brutal-black p-4 font-body font-bold text-xl focus:outline-none focus:bg-acid-yellow transition-all brutal-shadow-sm"
              />
              <button 
                onClick={handleRunAudit}
                disabled={isAuditing}
                className="bg-neon-green border-4 border-brutal-black px-8 py-4 font-heading font-black text-2xl brutal-shadow hover:bg-brutal-black hover:text-neon-green transition-all uppercase disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAuditing ? 'AUDITING...' : 'RUN AUDIT NOW'}
              </button>
              {error && <p className="text-red-500 font-bold uppercase mt-2">{error}</p>}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const audit = report?.audit || {};
  const onPage = report?.on_page || {};
  const pageSpeed = report?.pagespeed || {};
  const indexation = report?.indexation || {};
  const recommendations = report?.recommendations || [];
  const issues = [...(audit.weaknesses || []), ...(audit.warnings || [])];

  return (
    <motion.div 
      key="seo-dashboard"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-pure-white flex flex-col"
    >
      <Navbar />
      
      {/* Dashboard Header */}
      <header className="bg-brutal-black text-pure-white py-16 px-4 md:px-8 border-b-8 border-neon-green relative overflow-hidden">
        <div className="grid-bg absolute inset-0 opacity-20"></div>
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-neon-green text-brutal-black px-4 py-1 font-heading font-black text-xl uppercase brutal-shadow-sm">PREMIUM DASHBOARD</div>
              <div className="bg-acid-yellow text-brutal-black px-4 py-1 font-heading font-black text-xl uppercase brutal-shadow-sm">{report.website}</div>
            </div>
            <h1 className="font-heading font-black text-6xl md:text-8xl tracking-tighter leading-none uppercase">
              SEO <span className="text-neon-green">COMMAND</span> CENTER
            </h1>
          </div>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={async () => {
                if (!report?.website) return;
                setIsAuditing(true);
                try {
                  await fetch('/api/audit-webhook', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      name: user?.displayName || 'USER',
                      email: user?.email || '',
                      website: report.website,
                      userId: user?.uid
                    })
                  });
                  // Wait for processing
                  setTimeout(loadReport, 5000);
                } catch (err) {
                  console.error('Audit failed:', err);
                } finally {
                  setIsAuditing(false);
                }
              }}
              disabled={isAuditing}
              className="bg-neon-green text-brutal-black border-4 border-brutal-black px-6 py-3 font-heading font-black text-xl uppercase brutal-shadow hover:bg-pure-white transition-all flex items-center gap-3 disabled:opacity-50"
            >
              {isAuditing ? 'AUDITING...' : 'NEW AUDIT'} <Zap className={`w-6 h-6 ${isAuditing ? 'animate-pulse' : ''}`} />
            </button>
            <button 
              onClick={handleRefresh}
              className="bg-acid-yellow text-brutal-black border-4 border-brutal-black px-6 py-3 font-heading font-black text-xl uppercase brutal-shadow hover:bg-pure-white transition-all flex items-center gap-3"
            >
              REFRESH <RefreshCw className={`w-6 h-6 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button 
              onClick={handleDownload}
              className="bg-neon-green text-brutal-black border-4 border-brutal-black px-6 py-3 font-heading font-black text-xl uppercase brutal-shadow hover:bg-pure-white transition-all flex items-center gap-3"
            >
              DOWNLOAD <Download className="w-6 h-6" />
            </button>
            <button 
              onClick={handleLogout}
              className="bg-pure-white text-brutal-black border-4 border-brutal-black px-6 py-3 font-heading font-black text-xl uppercase brutal-shadow hover:bg-red-500 hover:text-pure-white transition-all flex items-center gap-3"
            >
              LOGOUT <LogOut className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow py-16 px-4 md:px-8 bg-acid-yellow/5">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* TABLE 1: SUMMARY */}
          <section className="bg-pure-white border-4 border-brutal-black p-10 brutal-shadow">
            <div className="flex items-center gap-4 mb-8 border-b-4 border-brutal-black pb-4">
              <BarChart3 className="w-10 h-10" />
              <h2 className="font-heading font-black text-4xl uppercase tracking-tighter">SUMMARY</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-brutal-black text-pure-white">
                    <th className="border-4 border-brutal-black p-4 text-left font-heading font-black uppercase">METRIC</th>
                    <th className="border-4 border-brutal-black p-4 text-left font-heading font-black uppercase">VALUE</th>
                  </tr>
                </thead>
                <tbody className="bg-pure-white">
                  <tr>
                    <td className="border-4 border-brutal-black p-4 font-body font-black uppercase">SEO SCORE</td>
                    <td className="border-4 border-brutal-black p-4 font-body font-bold text-neon-green text-2xl">{audit.overall_seo_score || 0}/100</td>
                  </tr>
                  <tr>
                    <td className="border-4 border-brutal-black p-4 font-body font-black uppercase">GRADE</td>
                    <td className="border-4 border-brutal-black p-4 font-body font-bold text-acid-yellow text-2xl">{audit.seo_grade || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td className="border-4 border-brutal-black p-4 font-body font-black uppercase">LOST REVENUE</td>
                    <td className="border-4 border-brutal-black p-4 font-body font-bold text-red-500 text-2xl">₹{audit.lost_revenue?.toLocaleString() || 0}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* TABLE 2: ON-PAGE SEO */}
          <section className="bg-pure-white border-4 border-brutal-black p-10 brutal-shadow">
            <div className="flex items-center gap-4 mb-8 border-b-4 border-brutal-black pb-4">
              <Layers className="w-10 h-10" />
              <h2 className="font-heading font-black text-4xl uppercase tracking-tighter">ON-PAGE SEO</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-brutal-black text-pure-white">
                    <th className="border-4 border-brutal-black p-4 text-left font-heading font-black uppercase">ELEMENT</th>
                    <th className="border-4 border-brutal-black p-4 text-left font-heading font-black uppercase">VALUE</th>
                    <th className="border-4 border-brutal-black p-4 text-left font-heading font-black uppercase">STATUS</th>
                  </tr>
                </thead>
                <tbody className="bg-pure-white">
                  {[
                    { label: "PAGE TITLE", val: onPage.title || 'MISSING', status: onPage.title ? 'PASS' : 'FAIL' },
                    { label: "META DESCRIPTION", val: onPage.meta_description || 'MISSING', status: onPage.meta_description ? 'PASS' : 'FAIL' },
                    { label: "H1 COUNT", val: onPage.h1_count || 0, status: (onPage.h1_count === 1) ? 'PASS' : 'WARN' },
                    { label: "H2 COUNT", val: onPage.h2_count || 0, status: (onPage.h2_count > 0) ? 'PASS' : 'WARN' },
                    { label: "IMAGES TOTAL", val: onPage.images_total || 0, status: 'INFO' },
                    { label: "IMAGES MISSING ALT", val: onPage.images_missing_alt || 0, status: (onPage.images_missing_alt === 0) ? 'PASS' : 'FAIL' },
                    { label: "SSL ENCRYPTION", val: onPage.ssl ? 'ACTIVE' : 'INACTIVE', status: onPage.ssl ? 'PASS' : 'FAIL' },
                    { label: "STRUCTURED DATA", val: onPage.structured_data ? 'FOUND' : 'NOT FOUND', status: onPage.structured_data ? 'PASS' : 'WARN' }
                  ].map((item, i) => (
                    <tr key={i}>
                      <td className="border-4 border-brutal-black p-4 font-body font-black uppercase">{item.label}</td>
                      <td className="border-4 border-brutal-black p-4 font-body font-bold truncate max-w-xs">{item.val}</td>
                      <td className="border-4 border-brutal-black p-4 font-body font-black">
                        <span className={`px-2 py-1 border-2 border-brutal-black ${
                          item.status === 'PASS' ? 'bg-neon-green' : 
                          item.status === 'FAIL' ? 'bg-red-500 text-pure-white' : 
                          item.status === 'WARN' ? 'bg-acid-yellow' : 'bg-brutal-black/10'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* TABLE 3: PAGESPEED */}
          <section className="bg-pure-white border-4 border-brutal-black p-10 brutal-shadow">
            <div className="flex items-center gap-4 mb-8 border-b-4 border-brutal-black pb-4">
              <Zap className="w-10 h-10" />
              <h2 className="font-heading font-black text-4xl uppercase tracking-tighter">PAGESPEED PERFORMANCE</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-brutal-black text-pure-white">
                    <th className="border-4 border-brutal-black p-4 text-left font-heading font-black uppercase">DEVICE</th>
                    <th className="border-4 border-brutal-black p-4 text-left font-heading font-black uppercase">PERFORMANCE</th>
                    <th className="border-4 border-brutal-black p-4 text-left font-heading font-black uppercase">SEO SCORE</th>
                  </tr>
                </thead>
                <tbody className="bg-pure-white">
                  <tr>
                    <td className="border-4 border-brutal-black p-4 font-body font-black uppercase flex items-center gap-2">
                      <Smartphone className="w-5 h-5" /> MOBILE
                    </td>
                    <td className={`border-4 border-brutal-black p-4 font-body font-black text-2xl ${pageSpeed.mobile_performance < 50 ? 'text-red-500' : 'text-neon-green'}`}>
                      {pageSpeed.mobile_performance || 0}/100
                    </td>
                    <td className="border-4 border-brutal-black p-4 font-body font-black text-2xl">
                      {pageSpeed.mobile_seo || 0}/100
                    </td>
                  </tr>
                  <tr>
                    <td className="border-4 border-brutal-black p-4 font-body font-black uppercase flex items-center gap-2">
                      <Monitor className="w-5 h-5" /> DESKTOP
                    </td>
                    <td className={`border-4 border-brutal-black p-4 font-body font-black text-2xl ${pageSpeed.desktop_performance < 50 ? 'text-red-500' : 'text-neon-green'}`}>
                      {pageSpeed.desktop_performance || 0}/100
                    </td>
                    <td className="border-4 border-brutal-black p-4 font-body font-black text-2xl">
                      {pageSpeed.desktop_seo || 0}/100
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* TABLE 4: INDEXATION */}
          <section className="bg-pure-white border-4 border-brutal-black p-10 brutal-shadow">
            <div className="flex items-center gap-4 mb-8 border-b-4 border-brutal-black pb-4">
              <Globe className="w-10 h-10" />
              <h2 className="font-heading font-black text-4xl uppercase tracking-tighter">INDEXATION</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-brutal-black text-pure-white">
                    <th className="border-4 border-brutal-black p-4 text-left font-heading font-black uppercase">METRIC</th>
                    <th className="border-4 border-brutal-black p-4 text-left font-heading font-black uppercase">VALUE</th>
                  </tr>
                </thead>
                <tbody className="bg-pure-white">
                  <tr>
                    <td className="border-4 border-brutal-black p-4 font-body font-black uppercase">TOTAL INDEXED PAGES</td>
                    <td className="border-4 border-brutal-black p-4 font-body font-bold text-2xl">{indexation.total_indexed_pages || 0}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* TABLE 5: ISSUES */}
          <section className="bg-pure-white border-4 border-brutal-black p-10 brutal-shadow">
            <div className="flex items-center gap-4 mb-8 border-b-4 border-brutal-black pb-4">
              <AlertTriangle className="w-10 h-10 text-red-500" />
              <h2 className="font-heading font-black text-4xl uppercase tracking-tighter">IDENTIFIED ISSUES</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-brutal-black text-pure-white">
                    <th className="border-4 border-brutal-black p-4 text-left font-heading font-black uppercase">TYPE</th>
                    <th className="border-4 border-brutal-black p-4 text-left font-heading font-black uppercase">DESCRIPTION</th>
                  </tr>
                </thead>
                <tbody className="bg-pure-white">
                  {(audit.weaknesses || []).map((w: string, i: number) => (
                    <tr key={`w-${i}`}>
                      <td className="border-4 border-brutal-black p-4 font-body font-black text-red-500 uppercase">WEAKNESS</td>
                      <td className="border-4 border-brutal-black p-4 font-body font-bold uppercase">{w}</td>
                    </tr>
                  ))}
                  {(audit.warnings || []).map((w: string, i: number) => (
                    <tr key={`warn-${i}`}>
                      <td className="border-4 border-brutal-black p-4 font-body font-black text-acid-yellow uppercase">WARNING</td>
                      <td className="border-4 border-brutal-black p-4 font-body font-bold uppercase">{w}</td>
                    </tr>
                  ))}
                  {issues.length === 0 && (
                    <tr>
                      <td colSpan={2} className="border-4 border-brutal-black p-12 text-center font-body font-bold uppercase opacity-40">NO CRITICAL ISSUES DETECTED.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* TABLE 6: RECOMMENDATIONS */}
          <section className="bg-pure-white border-4 border-brutal-black p-10 brutal-shadow">
            <div className="flex items-center gap-4 mb-8 border-b-4 border-brutal-black pb-4">
              <Target className="w-10 h-10" />
              <h2 className="font-heading font-black text-4xl uppercase tracking-tighter">RECOMMENDATIONS</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-brutal-black text-pure-white">
                    <th className="border-4 border-brutal-black p-4 text-left font-heading font-black uppercase">PRIORITY</th>
                    <th className="border-4 border-brutal-black p-4 text-left font-heading font-black uppercase">ACTION</th>
                    <th className="border-4 border-brutal-black p-4 text-left font-heading font-black uppercase">IMPACT</th>
                  </tr>
                </thead>
                <tbody className="bg-pure-white">
                  {recommendations.map((rec: any, i: number) => (
                    <tr key={i}>
                      <td className="border-4 border-brutal-black p-4 font-body font-black">
                        <span className={`px-2 py-1 border-2 border-brutal-black ${
                          rec.priority === 'CRITICAL' ? 'bg-red-500 text-pure-white' : 
                          rec.priority === 'HIGH' ? 'bg-acid-yellow' : 
                          rec.priority === 'MEDIUM' ? 'bg-neon-green' : 'bg-brutal-black/10'
                        }`}>
                          {rec.priority}
                        </span>
                      </td>
                      <td className="border-4 border-brutal-black p-4 font-body font-bold uppercase">{rec.action}</td>
                      <td className="border-4 border-brutal-black p-4 font-body font-black uppercase">{rec.impact}</td>
                    </tr>
                  ))}
                  {recommendations.length === 0 && (
                    <tr>
                      <td colSpan={3} className="border-4 border-brutal-black p-12 text-center font-body font-bold uppercase opacity-40">NO RECOMMENDATIONS AVAILABLE.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </main>
      
      <Footer />
    </motion.div>
  );
}
