import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import { profileData } from '../profileData';

export default function Education() {
  return (
    <section id="education" className="py-24 px-6 md:px-12 relative">
      <div className="w-full max-w-5xl mx-auto z-10">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-zinc-800 dark:text-white relative">
            Education Journey
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mt-4 max-w-md text-sm">
            Academics, school milestones, and core curriculum study.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l border-zinc-200/60 dark:border-zinc-800/60 ml-4 md:ml-32 pl-6 md:pl-12 space-y-12">
          {profileData.education.map((edu, idx) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[31px] md:-left-[55px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-zinc-900 border-2 border-purple-500 shadow-sm flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping" />
              </div>

              {/* Date Left Side (Desktop Only) */}
              <div className="hidden md:block absolute -left-[220px] top-1 w-40 text-right">
                <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 flex items-center justify-end gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-purple-500" />
                  {edu.period}
                </span>
              </div>

              {/* Card content */}
              <div className="glass-panel rounded-[24px] p-6 border border-white/40 dark:border-white/5 shadow-soft-out dark:shadow-soft-out-dark max-w-3xl hover:scale-[1.01] transition-transform duration-300">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display font-extrabold text-base sm:text-lg text-zinc-800 dark:text-white">
                    {edu.degree}
                  </h3>
                  {/* Mobile Period */}
                  <span className="md:hidden text-xs font-semibold text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-purple-500" />
                    {edu.period}
                  </span>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                  <span className="flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-pink-500" />
                    {edu.institution}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                    {edu.location}
                  </span>
                </div>

                {/* Academic details badge */}
                <div className="mt-4 inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-purple-500/10 text-purple-700 dark:text-purple-300 text-xs font-semibold border border-purple-500/20 shadow-sm">
                  <Award className="w-3.5 h-3.5 text-purple-500" />
                  {edu.details}
                </div>

                {/* Coursework tags */}
                <div className="mt-5 pt-4 border-t border-zinc-200/30 dark:border-zinc-800/30">
                  <h4 className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2.5">
                    Core Coursework & Studies
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {edu.coursework.map((course) => (
                      <span
                        key={course}
                        className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 bg-white/40 dark:bg-zinc-900/40 px-2 py-0.5 rounded-lg border border-white/30 dark:border-zinc-800/20"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
