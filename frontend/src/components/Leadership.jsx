import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Users, Award, Shield } from 'lucide-react';
import { profileData } from '../profileData';

const getLeadershipIcon = (idx) => {
  return idx % 2 === 0 
    ? <Users className="w-5 h-5 text-indigo-500" />
    : <Compass className="w-5 h-5 text-pink-500" />;
};

export default function Leadership() {
  return (
    <section id="leadership" className="py-24 px-6 md:px-12 relative">
      <div className="w-full max-w-5xl mx-auto z-10">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-zinc-800 dark:text-white relative">
            Leadership & Activities
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mt-4 max-w-md text-sm">
            Campus engagement, coordination roles, and marketing leadership.
          </p>
        </div>

        {/* Leadership Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {profileData.leadership.map((lead, idx) => (
            <motion.div
              key={lead.role}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel rounded-[28px] p-6 border border-white/40 dark:border-white/5 shadow-soft-out dark:shadow-soft-out-dark hover:scale-[1.01] transition-transform duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/80 dark:bg-zinc-800/80 border border-white/20 shadow-sm flex items-center justify-center">
                    {getLeadershipIcon(idx)}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                      {lead.organization}
                    </span>
                    <h3 className="font-display font-bold text-base text-zinc-800 dark:text-zinc-200 mt-0.5">
                      {lead.role}
                    </h3>
                  </div>
                </div>

                {/* Details */}
                <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-5 leading-relaxed">
                  {lead.details}
                </p>
              </div>

              {/* Decorative Tag */}
              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-purple-700 dark:text-purple-300">
                <Shield className="w-3.5 h-3.5 text-purple-500" />
                <span>Active Coordinator</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
