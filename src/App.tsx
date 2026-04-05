/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import AuditResults from './pages/AuditResults';
import Payment from './pages/Payment';
import SeoDashboard from './pages/SeoDashboard';
import About from './pages/About';
import Services from './pages/Services';
import Work from './pages/Work';
import Brands from './pages/Brands';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import FAQ from './pages/FAQ';
import Dashboard from './pages/Dashboard';
import AdminCRM from './pages/AdminCRM';
import { ProtectedRoute } from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<AuditResults />} />
          <Route path="/payment" element={<Payment />} />
          <Route 
            path="/seo" 
            element={
              <ProtectedRoute>
                <SeoDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/work" element={<Work />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsConditions />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/admin" element={<AdminCRM />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AnimatePresence>
    </AuthProvider>
  );
}
