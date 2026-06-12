import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Code, ArrowUpRight, BarChart3, ShieldCheck, Cpu, Database, X } from 'lucide-react';
import { profileData } from '../profileData';

// Helper to render decorative visual mockup for projects
const getProjectVisual = (id) => {
  switch (id) {
    case 'universal-analyser':
      return (
        <div className="w-full h-44 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 dark:from-indigo-500/10 dark:to-purple-500/10 flex items-center justify-center border border-indigo-500/10 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent" />
          <BarChart3 className="w-12 h-12 text-indigo-500 dark:text-indigo-400 drop-shadow" />
          <div className="absolute bottom-3 left-3 bg-white/70 dark:bg-zinc-800/70 border border-white/20 backdrop-blur-sm rounded-lg px-2.5 py-1 text-[10px] font-semibold text-indigo-700 dark:text-indigo-300">
            📊 Interactive EDA
          </div>
        </div>
      );
    case 'exam-system':
      return (
        <div className="w-full h-44 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 dark:from-emerald-500/10 dark:to-teal-500/10 flex items-center justify-center border border-emerald-500/10 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent" />
          <ShieldCheck className="w-12 h-12 text-emerald-500 dark:text-emerald-400 drop-shadow" />
          <div className="absolute bottom-3 left-3 bg-white/70 dark:bg-zinc-800/70 border border-white/20 backdrop-blur-sm rounded-lg px-2.5 py-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">
            🔒 RBAC Exam Portal
          </div>
        </div>
      );
    case 'anti-scam-chatbot':
      return (
        <div className="w-full h-44 rounded-2xl bg-gradient-to-br from-rose-500/20 to-pink-500/20 dark:from-rose-500/10 dark:to-pink-500/10 flex items-center justify-center border border-rose-500/10 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-500/10 via-transparent to-transparent" />
          <Cpu className="w-12 h-12 text-rose-500 dark:text-rose-400 drop-shadow" />
          <div className="absolute bottom-3 left-3 bg-white/70 dark:bg-zinc-800/70 border border-white/20 backdrop-blur-sm rounded-lg px-2.5 py-1 text-[10px] font-semibold text-rose-700 dark:text-rose-300">
            🤖 NLP Anti-Scam
          </div>
        </div>
      );
    case 'ecommerce-sales':
      return (
        <div className="w-full h-44 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 dark:from-amber-500/10 dark:to-orange-500/10 flex items-center justify-center border border-amber-500/10 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
          <Database className="w-12 h-12 text-amber-500 dark:text-amber-400 drop-shadow" />
          <div className="absolute bottom-3 left-3 bg-white/70 dark:bg-zinc-800/70 border border-white/20 backdrop-blur-sm rounded-lg px-2.5 py-1 text-[10px] font-semibold text-amber-700 dark:text-amber-300">
            📈 Power BI Sales
          </div>
        </div>
      );
    default:
      return (
        <div className="w-full h-44 rounded-2xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
          <Code className="w-12 h-12 text-zinc-400" />
        </div>
      );
  }
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-24 px-6 md:px-12 relative">
      <div className="w-full max-w-5xl mx-auto z-10">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-zinc-800 dark:text-white relative">
            Featured Projects
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mt-4 max-w-md text-sm">
            Interactive case studies detailing systems, intelligence, and dashboards.
          </p>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {profileData.projects.map((proj) => (
            <motion.div
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-panel rounded-[32px] p-5 border border-white/40 dark:border-white/5 shadow-soft-out dark:shadow-soft-out-dark cursor-pointer group hover:scale-[1.01] hover:border-purple-400/20 active:scale-[0.99] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Mockup Area */}
                {getProjectVisual(proj.id)}

                {/* Info */}
                <div className="flex items-center justify-between mt-5">
                  <span className="text-[10px] font-bold text-purple-700 dark:text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {proj.tag}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/70 dark:bg-zinc-800/80 border border-white/20 shadow-sm flex items-center justify-center text-zinc-600 dark:text-zinc-400 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-display font-bold text-lg text-zinc-800 dark:text-zinc-100 mt-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {proj.title}
                </h3>

                <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2 line-clamp-2 leading-relaxed">
                  {proj.summary}
                </p>
              </div>

              {/* Footer: Stack Items */}
              <div className="flex flex-wrap gap-1.5 mt-5 border-t border-zinc-200/30 dark:border-zinc-800/30 pt-4">
                {proj.stack.map((s) => (
                  <span
                    key={s}
                    className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 bg-white/40 dark:bg-zinc-900/40 px-2 py-0.5 rounded-lg border border-white/30 dark:border-zinc-800/20"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Case Study Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="w-full max-w-3xl glass-panel rounded-3xl overflow-hidden shadow-2xl relative flex flex-col z-10 border border-white/30 dark:border-zinc-800"
            >
              {/* Decorative top bar */}
              <div className="h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500" />
              
              {/* Header */}
              <div className="px-6 py-5 border-b border-zinc-200/50 dark:border-zinc-800/50 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-purple-700 dark:text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {selectedProject.tag}
                  </span>
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-zinc-800 dark:text-white mt-2">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-zinc-200/80 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 active:scale-95 transition-all flex-shrink-0"
                >
                  <X className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
                </button>
              </div>

              {/* Content body */}
              <div className="p-6 overflow-y-auto flex-1 max-h-[60vh] space-y-6">
                
                {/* Description */}
                <div>
                  <h4 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">
                    Overview & Case Study
                  </h4>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed whitespace-pre-line">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Metrics Grid */}
                <div>
                  <h4 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-3">
                    Project Metrics & Focus
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    {selectedProject.metrics.map((metric) => (
                      <div key={metric.label} className="p-4 rounded-2xl bg-white/40 dark:bg-zinc-900/30 border border-white/30 dark:border-zinc-800/30 shadow-soft-in dark:shadow-soft-in-dark text-center">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                          {metric.label}
                        </div>
                        <div className="text-sm font-extrabold text-purple-700 dark:text-purple-300 mt-1.5 leading-none">
                          {metric.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack used */}
                <div>
                  <h4 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2.5">
                    Technologies Implemented
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.stack.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/80 dark:bg-zinc-900/50 border border-white/60 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 select-none shadow-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-zinc-200/50 dark:border-zinc-800/50 flex items-center justify-end bg-white/30 dark:bg-black/30 backdrop-blur-sm">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold flex items-center gap-2 hover:scale-[1.03] active:scale-95 transition-all shadow-md"
                >
                  <Github className="w-4 h-4" />
                  View Repository
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
