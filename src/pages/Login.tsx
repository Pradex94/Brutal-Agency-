import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loginWithEmail, signInWithGoogle } from '../lib/firebaseAuth';
import PageLayout from '../components/PageLayout';
import { fadeUp, buttonInteraction } from '../utils/animations';
import { LogIn, Mail, Lock, Chrome } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await loginWithEmail(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to login with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout title="LOGIN">
      <div className="max-w-md mx-auto py-12">
        <motion.div 
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="bg-pure-white border-8 border-brutal-black p-8 brutal-shadow space-y-8"
        >
          <div className="text-center space-y-2">
            <h2 className="font-heading font-black text-4xl uppercase tracking-tighter">WELCOME BACK</h2>
            <p className="font-mono font-bold text-sm uppercase opacity-60">ENTER YOUR CREDENTIALS TO DOMINATE</p>
          </div>

          {error && (
            <div className="bg-acid-yellow border-4 border-brutal-black p-4 font-mono font-bold text-sm uppercase">
              ERROR: {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="font-heading font-black text-xl uppercase block">EMAIL</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 opacity-40" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-pure-white border-4 border-brutal-black p-4 pl-14 font-mono font-bold focus:bg-neon-green transition-colors outline-none"
                  placeholder="YOU@EXAMPLE.COM"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-heading font-black text-xl uppercase block">PASSWORD</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 opacity-40" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-pure-white border-4 border-brutal-black p-4 pl-14 font-mono font-bold focus:bg-neon-green transition-colors outline-none"
                  placeholder="********"
                />
              </div>
            </div>

            <motion.button 
              variants={buttonInteraction}
              whileHover="hover"
              whileTap="tap"
              disabled={loading}
              className="w-full bg-brutal-black text-pure-white border-4 border-brutal-black py-4 font-heading font-black text-2xl uppercase brutal-shadow-sm hover:bg-neon-green hover:text-brutal-black transition-all flex items-center justify-center gap-3"
            >
              {loading ? 'PROCESSING...' : (
                <>
                  LOGIN <LogIn className="w-6 h-6" />
                </>
              )}
            </motion.button>
          </form>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-4 border-brutal-black opacity-20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-pure-white font-mono font-black uppercase">OR</span>
            </div>
          </div>

          <motion.button 
            variants={buttonInteraction}
            whileHover="hover"
            whileTap="tap"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-pure-white text-brutal-black border-4 border-brutal-black py-4 font-heading font-black text-xl uppercase brutal-shadow-sm hover:bg-acid-yellow transition-all flex items-center justify-center gap-3"
          >
            <Chrome className="w-6 h-6" /> CONTINUE WITH GOOGLE
          </motion.button>

          <p className="text-center font-mono font-bold text-sm uppercase">
            NEW TO THE REVOLUTION? <Link to="/signup" className="text-neon-green hover:underline decoration-4 underline-offset-4">SIGN UP HERE</Link>
          </p>
        </motion.div>
      </div>
    </PageLayout>
  );
}
