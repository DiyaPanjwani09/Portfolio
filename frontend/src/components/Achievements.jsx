import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, CheckCircle, Lightbulb } from 'lucide-react';
import { profileData } from '../profileData';

const getAchievementIcon = (title) => {
  const t = title.toLowerCase();
  if (t.includes('winner') || t.includes('hackathon')) {
    return <Trophy className="w-5 h-5 text-amber-500" />;
  } else if (t.includes('certified') || t.includes('certification')) {
    return <Award className="w-5 h-5 text-indigo-500" />;
  } else {
    return <CheckCircle className="w-5 h-5 text-purple-500" />;
  }
};

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 px-6 md:px-12 bg-white/5 dark:bg-black/5 relative">
      <div className="w-full max-w-5xl mx-auto z-10">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-zinc-800 dark:text-white relative">
            Achievements & Certifications
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mt-4 max-w-md text-sm">
            Milestones, hackathon wins, and professional standard accomplishments.
          </p>
        </div>

        {/* List Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profileData.achievements.map((ach, idx) => (
            <motion.div
              key={ach.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="glass-panel rounded-3xl p-5 border border-white/40 dark:border-white/5 shadow-soft-out dark:shadow-soft-out-dark hover:scale-[1.01] transition-transform flex gap-4 items-start"
            >
              {/* Icon Container */}
              <div className="w-10 h-10 rounded-2xl bg-white/80 dark:bg-zinc-800/80 border border-white/20 shadow-sm flex items-center justify-center flex-shrink-0">
                {getAchievementIcon(ach.title + ' ' + ach.subtitle)}
              </div>

              {/* Text */}
              <div>
                <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest bg-purple-500/10 px-2 py-0.5 rounded-full">
                  {ach.subtitle}
                </span>
                <h3 className="font-display font-bold text-base text-zinc-800 dark:text-zinc-200 mt-2">
                  {ach.title}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                  {ach.details}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
