import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="p-3 border-4 border-brutal-black dark:border-neon-green bg-pure-white dark:bg-brutal-black brutal-shadow-sm hover:bg-neon-green dark:hover:bg-neon-green transition-all"
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? (
        <Moon className="w-6 h-6 text-brutal-black" strokeWidth={3} />
      ) : (
        <Sun className="w-6 h-6 text-neon-green dark:text-white" strokeWidth={3} />
      )}
    </motion.button>
  );
}
