import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      for (const item of navItems) {
        const el = document.querySelector(item.href);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.href.replace('#', ''));
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth',
      });
      setActiveSection(href.replace('#', ''));
    }
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="glass-panel active-pill-glow backdrop-blur-md rounded-full shadow-soft-out dark:shadow-soft-out-dark w-full max-w-5xl h-16 flex items-center justify-between px-6 transition-all duration-300">
        {/* Logo */}
        <a 
          href="#home" 
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-2 font-display font-extrabold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 hover:scale-105 transition-transform"
        >
          🌸 DP
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1 relative bg-white/20 dark:bg-black/20 rounded-full p-1 border border-white/10">
          {navItems.map((item) => {
            const itemKey = item.href.replace('#', '');
            const isActive = activeSection === itemKey;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative px-4 py-1.5 rounded-full text-sm font-medium tracking-wide transition-colors duration-300 z-10 ${
                  isActive 
                    ? 'text-purple-700 dark:text-purple-200' 
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-white/70 dark:bg-zinc-800/80 rounded-full shadow-sm -z-10 border border-white/20 dark:border-white/5"
                    layoutId="activePill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Mobile Toggle & Menu */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white/50 dark:bg-zinc-900/50 border border-white/30 dark:border-zinc-800 shadow-sm text-brand-text-light dark:text-brand-text-dark"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-4 right-4 glass-panel rounded-3xl shadow-lg p-6 flex flex-col gap-4 border border-white/30 dark:border-zinc-800 md:hidden z-40"
          >
            {navItems.map((item) => {
              const itemKey = item.href.replace('#', '');
              const isActive = activeSection === itemKey;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-4 py-3 rounded-2xl text-base font-semibold transition-all ${
                    isActive 
                      ? 'bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20' 
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-white/20 dark:hover:bg-zinc-800/40'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
