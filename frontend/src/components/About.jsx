import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, Star, Award, Heart, GraduationCap, Code } from 'lucide-react';
import { profileData } from '../profileData';

export default function About() {
  const [views, setViews] = useState(0);
  const [stars, setStars] = useState(0);
  const [isStarred, setIsStarred] = useState(false);
  
  const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000').replace(/\/+$/, '');

  useEffect(() => {
    // 1. Fetch current views and increment
    fetch(`${apiBaseUrl}/api/stats/views`, { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setViews(data.views))
      .catch((err) => console.log('Error views:', err));

    // 2. Fetch current stars
    fetch(`${apiBaseUrl}/api/stats/stars`)
      .then((res) => res.json())
      .then((data) => setStars(data.stars))
      .catch((err) => console.log('Error stars:', err));
  }, []);

  const handleStarClick = () => {
    if (isStarred) return; // Allow starring once per session
    
    fetch(`${apiBaseUrl}/api/stats/stars`, { method: 'POST' })
      .then((res) => res.json())
      .then((data) => {
        setStars(data.stars);
        setIsStarred(true);
      })
      .catch((err) => console.log('Error starring:', err));
  };

  const highlights = [
    {
      icon: <GraduationCap className="w-5 h-5 text-purple-500" />,
      title: "Education",
      desc: "B.Tech IT Student at MITS Gwalior (CGPA 8.0)"
    },
    {
      icon: <Code className="w-5 h-5 text-pink-500" />,
      title: "AI/ML & Analytics",
      desc: "Oracle Data Science & Cisco Python Certified"
    },
    {
      icon: <Award className="w-5 h-5 text-amber-500" />,
      title: "Hackathons",
      desc: "AI Synergy Hackathon 2026 Winner"
    },
    {
      icon: <Heart className="w-5 h-5 text-rose-500" />,
      title: "Interests",
      desc: "Open-source contribution, Web Dev, AI models"
    }
  ];

  return (
    <section id="about" className="py-24 px-6 md:px-12 relative">
      <div className="w-full max-w-5xl mx-auto z-10">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-zinc-800 dark:text-white relative">
            About Me
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mt-4 max-w-md text-sm">
            My background, aspirations, and interactive metrics.
          </p>
        </div>

        {/* Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* Bio Panel */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-1 md:col-span-7 flex flex-col justify-between"
          >
            <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-soft-out dark:shadow-soft-out-dark h-full flex flex-col justify-center border border-white/40 dark:border-white/5">
              <h3 className="font-display font-bold text-xl mb-4 text-zinc-800 dark:text-zinc-200">
                Turning Data & Logic into Intelligent Experiences
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm sm:text-base">
                {profileData.bio}
              </p>
              
              {/* Highlight list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {highlights.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="flex gap-3 items-start"
                  >
                    <div className="p-2 rounded-xl bg-white/60 dark:bg-zinc-800/40 border border-white/30 shadow-sm flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-zinc-700 dark:text-zinc-300">{item.title}</h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-0.5">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats & Interactive Panel */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-span-1 md:col-span-5 flex flex-col gap-6 justify-between"
          >
            
            {/* View Counter Card */}
            <div className="glass-panel rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-soft-out dark:shadow-soft-out-dark flex-1 border border-white/40 dark:border-white/5">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 mb-4 animate-float">
                <Eye className="w-6 h-6 text-cyan-500" />
              </div>
              <h4 className="font-semibold text-xs tracking-wider uppercase text-zinc-400 dark:text-zinc-500">
                Portfolio Views
              </h4>
              <p className="font-display font-extrabold text-3xl sm:text-4xl text-zinc-800 dark:text-zinc-100 mt-2">
                {views ? views.toLocaleString() : '...'}
              </p>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-600 mt-1">
                Real-time updates on visitor traffic
              </p>
            </div>

            {/* View Stars / Love Card */}
            <button
              onClick={handleStarClick}
              disabled={isStarred}
              className={`glass-panel rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-soft-out dark:shadow-soft-out-dark flex-1 border border-white/40 dark:border-white/5 transition-all duration-300 select-none ${
                isStarred 
                  ? 'cursor-default ring-2 ring-amber-500/30' 
                  : 'hover:scale-[1.03] active:scale-98 active:shadow-soft-in dark:active:shadow-soft-in-dark group'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-500 mb-4 ${
                isStarred 
                  ? 'bg-amber-500/20 border-amber-500/30 scale-110' 
                  : 'bg-amber-500/10 border-amber-500/20 group-hover:animate-pulse'
              }`}>
                <Star className={`w-6 h-6 transition-all duration-500 ${
                  isStarred ? 'fill-amber-500 text-amber-500' : 'text-amber-500 group-hover:scale-110'
                }`} />
              </div>
              <h4 className="font-semibold text-xs tracking-wider uppercase text-zinc-400 dark:text-zinc-500">
                Starred by Visitors
              </h4>
              <p className="font-display font-extrabold text-3xl sm:text-4xl text-zinc-800 dark:text-zinc-100 mt-2">
                {stars ? stars.toLocaleString() : '...'}
              </p>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-600 mt-1 transition-colors">
                {isStarred ? 'Thanks for the star! ✨' : 'Click to support Diya\'s work!'}
              </p>
            </button>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
