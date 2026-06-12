import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Terminal, Globe, BarChart3, Database, Wrench, BrainCircuit } from 'lucide-react';
import { profileData } from '../profileData';

const getCategoryIcon = (category) => {
  switch (category.toLowerCase()) {
    case 'languages':
      return <Terminal className="w-5 h-5 text-indigo-500" />;
    case 'web dev':
      return <Globe className="w-5 h-5 text-sky-500" />;
    case 'data analytics':
      return <BarChart3 className="w-5 h-5 text-emerald-500" />;
    case 'libraries':
      return <Database className="w-5 h-5 text-purple-500" />;
    case 'tools':
      return <Wrench className="w-5 h-5 text-rose-500" />;
    case 'ai tools':
      return <BrainCircuit className="w-5 h-5 text-amber-500" />;
    default:
      return <Sparkles className="w-5 h-5 text-pink-500" />;
  }
};

export default function TechStack() {
  return (
    <section id="stack" className="py-24 px-6 md:px-12 bg-white/10 dark:bg-black/5 relative">
      <div className="w-full max-w-5xl mx-auto z-10">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-zinc-800 dark:text-white relative">
            Technical Stack
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mt-4 max-w-md text-sm">
            Technologies, frameworks, and analytics tools I work with daily.
          </p>
        </div>

        {/* Stack Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-stretch">
          {profileData.skills.map((skillGroup, idx) => {
            const isAI = skillGroup.highlight;
            
            return (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`glass-panel rounded-3xl p-6 shadow-soft-out dark:shadow-soft-out-dark border transition-all duration-300 ${
                  isAI 
                    ? 'ring-2 ring-amber-400/40 bg-gradient-to-br from-amber-500/5 to-pink-500/5 dark:from-amber-500/10 dark:to-pink-500/5 border-amber-400/30' 
                    : 'border-white/40 dark:border-white/5 hover:scale-[1.02]'
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-xl bg-white/80 dark:bg-zinc-800/80 border border-white/20 shadow-sm flex items-center justify-center ${
                      isAI ? 'animate-pulse' : ''
                    }`}>
                      {getCategoryIcon(skillGroup.category)}
                    </div>
                    <h3 className="font-display font-bold text-sm text-zinc-800 dark:text-zinc-200">
                      {skillGroup.category}
                    </h3>
                  </div>
                  {isAI && (
                    <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 fill-amber-500" />
                      Highlighted
                    </span>
                  )}
                </div>

                {/* Items */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {skillGroup.items.map((item) => (
                    <span
                      key={item}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide border shadow-sm transition-all duration-200 select-none ${
                        isAI 
                          ? 'bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-300 hover:bg-amber-500/20' 
                          : 'bg-white/80 dark:bg-zinc-900/50 border-white/50 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-800'
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
