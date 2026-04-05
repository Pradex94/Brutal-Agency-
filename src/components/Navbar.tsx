import React, { useState, useEffect } from 'react';
import { Menu, X, LogOut, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { buttonInteraction, EXPO_OUT } from '../utils/animations';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logoutUser } from '../lib/firebaseAuth';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isPaid } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const ADMIN_EMAIL = "pradexbisla1994@gmail.com";

  const menuItems = [
    { name: 'WORK', path: '/work' },
    { name: 'SERVICES', path: '/services' },
    { name: 'ABOUT', path: '/about' },
    { name: 'BRANDS', path: '/brands' },
  ];

  if (isPaid) {
    menuItems.unshift({ name: 'SEO', path: '/seo' });
  }

  const handleHireUs = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/#contact');
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/');
    } catch (error) {
      console.error("Logout failed", error);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <nav className="sticky top-0 z-50 bg-pure-white border-b-4 border-brutal-black px-4 md:px-8 py-4 flex justify-between items-center">
      <Link to="/">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, rotate: -2 }}
          transition={{ duration: 0.4, ease: EXPO_OUT }}
          className="font-heading font-black text-2xl md:text-3xl tracking-tighter z-50 relative cursor-pointer"
        >
          BRUTAL.AGENCY
        </motion.div>
      </Link>
      
      {/* Desktop Menu */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EXPO_OUT }}
        className="hidden md:flex items-center gap-8 lg:gap-12 font-heading font-bold text-lg"
      >
        {user?.email === ADMIN_EMAIL && (
          <Link 
            to="/admin" 
            className="relative group px-2 py-1 text-neon-green"
          >
            <span className="relative z-10">ADMIN</span>
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-brutal-black group-hover:w-full group-hover:h-full group-hover:bg-brutal-black transition-all -z-0"></span>
          </Link>
        )}
        {user && (
          <Link 
            to="/dashboard" 
            className="relative group px-2 py-1"
          >
            <span className="relative z-10">DASHBOARD</span>
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-brutal-black group-hover:w-full group-hover:h-full group-hover:bg-neon-green transition-all -z-0"></span>
          </Link>
        )}
        {menuItems.map((item) => (
          <Link 
            key={item.name}
            to={item.path} 
            className="relative group px-2 py-1"
          >
            <span className="relative z-10">{item.name}</span>
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-brutal-black group-hover:w-full group-hover:h-full group-hover:bg-neon-green transition-all -z-0"></span>
          </Link>
        ))}
      </motion.div>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 font-mono font-bold text-sm uppercase bg-acid-yellow border-2 border-brutal-black px-3 py-1">
              <UserIcon className="w-4 h-4" />
              {user.email?.split('@')[0]}
            </div>
            <motion.button 
              variants={buttonInteraction}
              whileHover="hover"
              whileTap="tap"
              onClick={handleLogout}
              className="bg-pure-white border-4 border-brutal-black px-6 py-2 font-heading font-bold text-lg brutal-shadow brutal-shadow-active hover:bg-neon-green transition-all flex items-center gap-2"
            >
              LOGOUT <LogOut className="w-5 h-5" />
            </motion.button>
          </div>
        ) : (
          <Link to="/login" className="hidden md:block">
            <motion.button 
              variants={buttonInteraction}
              whileHover="hover"
              whileTap="tap"
              className="bg-pure-white border-4 border-brutal-black px-8 py-2.5 font-heading font-bold text-xl brutal-shadow brutal-shadow-active hover:bg-neon-green transition-all"
            >
              LOGIN
            </motion.button>
          </Link>
        )}
        
        <motion.button 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          variants={buttonInteraction}
          whileHover="hover"
          whileTap="tap"
          onClick={handleHireUs}
          className="hidden md:inline-flex items-center justify-center bg-pure-white border-4 border-brutal-black px-8 py-2.5 font-heading font-bold text-xl brutal-shadow brutal-shadow-active hover:bg-neon-green transition-all"
        >
          HIRE US
        </motion.button>
        
        {/* Mobile Toggle */}
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden font-heading font-bold text-xl border-4 border-brutal-black p-2 bg-neon-green brutal-shadow-sm z-50 relative"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: EXPO_OUT }}
            className="absolute top-full left-0 w-full bg-pure-white border-b-4 border-brutal-black flex flex-col font-heading font-bold text-2xl md:hidden overflow-hidden"
          >
            {user?.email === ADMIN_EMAIL && (
              <Link 
                to="/admin" 
                className="p-6 border-b-4 border-brutal-black bg-neon-green hover:pl-8 transition-all"
                onClick={() => setIsOpen(false)}
              >
                ADMIN CRM
              </Link>
            )}
            {user && (
              <Link 
                to="/dashboard" 
                className="p-6 border-b-4 border-brutal-black hover:bg-neon-green hover:pl-8 transition-all"
                onClick={() => setIsOpen(false)}
              >
                DASHBOARD
              </Link>
            )}
            {menuItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path} 
                className="p-6 border-b-4 border-brutal-black hover:bg-neon-green hover:pl-8 transition-all"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {user ? (
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2 font-mono font-bold text-lg uppercase bg-acid-yellow border-4 border-brutal-black p-4">
                  <UserIcon className="w-6 h-6" />
                  {user.email}
                </div>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-center bg-pure-white border-4 border-brutal-black py-4 brutal-shadow-sm hover:bg-neon-green transition-colors font-heading font-bold"
                >
                  LOGOUT
                </button>
              </div>
            ) : (
              <div className="p-6">
                <Link 
                  to="/login"
                  className="block w-full text-center bg-pure-white border-4 border-brutal-black py-4 brutal-shadow-sm hover:bg-neon-green transition-colors font-heading font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  LOGIN
                </Link>
              </div>
            )}

            <div className="p-6 bg-acid-yellow">
              <button 
                onClick={handleHireUs}
                className="block w-full text-center bg-pure-white border-4 border-brutal-black py-4 brutal-shadow-sm hover:bg-neon-green transition-colors font-heading font-bold"
              >
                HIRE US
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
