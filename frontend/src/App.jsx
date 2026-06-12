import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Leadership from './components/Leadership';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';

function App() {
  const isAdmin = window.location.pathname === '/admin';

  // Always apply dark class on mount for a consistent dark theme
  useEffect(() => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  if (isAdmin) {
    return <AdminPanel />;
  }

  return (
    <div className="relative min-h-screen selection:bg-purple-500/30 bg-brand-bg-light dark:bg-brand-bg-dark transition-colors duration-500 overflow-x-hidden">
      {/* Mesh gradients for premium glassmorphism background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 dark:bg-purple-900/15 blur-[120px] animate-float" style={{ animationDuration: '25s' }} />
        <div className="absolute top-[30%] right-[-10%] w-[60%] h-[60%] rounded-full bg-pink-500/10 dark:bg-pink-900/10 blur-[130px] animate-float" style={{ animationDuration: '30s', animationDelay: '2s' }} />
        <div className="absolute bottom-[-10%] left-[20%] w-[55%] h-[55%] rounded-full bg-blue-500/10 dark:bg-indigo-950/15 blur-[120px] animate-float" style={{ animationDuration: '28s', animationDelay: '4s' }} />
      </div>

      {/* Dynamic interactive header navbar */}
      <Navbar />

      {/* Main Sections */}
      <main className="relative z-10">
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Education />
        <Achievements />
        <Leadership />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-zinc-200/50 dark:border-zinc-800/50 text-center text-xs text-zinc-400 dark:text-zinc-500 bg-white/20 dark:bg-black/20 backdrop-blur-md">
        <p>© {new Date().getFullYear()} Diya Panjwani. All rights reserved.</p>
        <p className="mt-1.5 text-[10px] text-zinc-300 dark:text-zinc-600">Built with FastAPI, React & Tailwind CSS.</p>
      </footer>
    </div>
  );
}

export default App;
