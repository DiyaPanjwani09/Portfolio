import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileText, Mail, Github, Linkedin, MapPin, Phone, MessageSquare, X } from 'lucide-react';
import { profileData } from '../profileData';

// Custom typing hook/component
const TypingTagline = ({ taglines }) => {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = taglines[idx];
    let speed = isDeleting ? 40 : 100;

    if (!isDeleting && text === fullText) {
      speed = 1800; // Pause at full text
    } else if (isDeleting && text === '') {
      speed = 400; // Pause at empty
    }

    const timer = setTimeout(() => {
      if (isDeleting) {
        setText(fullText.substring(0, text.length - 1));
      } else {
        setText(fullText.substring(0, text.length + 1));
      }

      if (!isDeleting && text === fullText) {
        setIsDeleting(true);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setIdx((prev) => (prev + 1) % taglines.length);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, idx, taglines]);

  return (
    <span className="text-purple-600 dark:text-purple-400 font-extrabold border-r-2 border-purple-600 dark:border-purple-400 pr-1 animate-pulse">
      {text}
    </span>
  );
};

export default function Hero() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  useEffect(() => {
    // Check if a PDF resume is uploaded in the backend
    fetch(`${apiBaseUrl}/api/resume/info`)
      .then((res) => res.json())
      .then((data) => {
        if (data.uploaded) {
          setResumeUploaded(true);
        }
      })
      .catch(() => setResumeUploaded(false));
  }, []);

  const handleContactClick = (e) => {
    e.preventDefault();
    const target = document.querySelector('#contact');
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  const handleDownloadResume = () => {
    if (resumeUploaded) {
      window.open(`${apiBaseUrl}/api/resume/download`, '_blank');
    } else {
      // Fallback: download the static preview image
      const link = document.createElement('a');
      link.href = '/diya_resume_preview.png';
      link.download = 'Diya_Panjwani_Resume.png';
      link.click();
    }
  };

  return (
    <section 
      id="home" 
      className="min-h-screen pt-28 pb-16 flex flex-col items-center justify-center px-6 md:px-12 relative overflow-hidden"
    >
      {/* Background soft gradients */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-brand-lavender/30 dark:bg-purple-900/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-brand-coral/20 dark:bg-orange-900/5 blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-12 items-center z-10">
        
        {/* Intro Text */}
        <div className="col-span-1 md:col-span-7 flex flex-col justify-center text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center md:justify-start gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-purple-700 dark:text-purple-300 bg-purple-500/10 dark:bg-purple-500/5 border border-purple-500/20 w-fit self-center md:self-start mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Available for Internships & Projects
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-none text-zinc-800 dark:text-white"
          >
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500">{profileData.fullName}</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl sm:text-2xl mt-4 text-zinc-600 dark:text-zinc-300 font-medium"
          >
            I am an <TypingTagline taglines={profileData.taglines} />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-base sm:text-lg text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed"
          >
            {profileData.bio}
          </motion.p>

          {/* Quick contact list */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-6 text-sm text-zinc-500 dark:text-zinc-400"
          >
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-purple-500" />
              <span>{profileData.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-pink-500" />
              <span>{profileData.email}</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-5 mt-10"
          >
            {/* CTA 1: View Resume */}
            <button
              onClick={() => setIsResumeOpen(true)}
              className="px-6 py-3.5 rounded-2xl font-semibold text-sm tracking-wide bg-brand-bg-light dark:bg-zinc-900 border border-white/80 dark:border-white/5 shadow-soft-out dark:shadow-soft-out-dark text-purple-700 dark:text-purple-300 flex items-center gap-2 hover:scale-[1.03] active:scale-95 transition-all duration-300 active:shadow-soft-in dark:active:shadow-soft-in-dark"
            >
              <FileText className="w-4 h-4" />
              View Resume
            </button>

            {/* CTA 2: Download Resume */}
            <button
              onClick={handleDownloadResume}
              className="px-6 py-3.5 rounded-2xl font-semibold text-sm tracking-wide bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md flex items-center gap-2 hover:scale-[1.03] active:scale-95 transition-all duration-300"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </button>

            {/* CTA 3: Get in touch */}
            <button
              onClick={handleContactClick}
              className="px-6 py-3.5 rounded-2xl font-semibold text-sm tracking-wide text-zinc-600 dark:text-zinc-300 bg-brand-bg-light dark:bg-zinc-900 border border-white/80 dark:border-white/5 shadow-soft-out dark:shadow-soft-out-dark flex items-center gap-2 hover:scale-[1.03] active:scale-95 transition-all duration-300"
            >
              <Mail className="w-4 h-4" />
              Get in touch
            </button>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center justify-center md:justify-start gap-4 mt-8"
          >
            <a
              href={profileData.github}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-brand-bg-light dark:bg-zinc-900 border border-white/60 dark:border-zinc-800 shadow-soft-out dark:shadow-soft-out-dark text-zinc-600 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-brand-bg-light dark:bg-zinc-900 border border-white/60 dark:border-zinc-800 shadow-soft-out dark:shadow-soft-out-dark text-zinc-600 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </motion.div>
        </div>

        {/* Photo with Glass Frame */}
        <div className="col-span-1 md:col-span-5 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80"
          >
            {/* Tactile floating background rings */}
            <div className="absolute -inset-4 rounded-full border border-purple-500/10 dark:border-purple-400/5 animate-spin" style={{ animationDuration: '40s' }} />
            <div className="absolute -inset-8 rounded-full border border-dashed border-pink-500/10 dark:border-pink-400/5 animate-spin" style={{ animationDuration: '60s', animationDirection: 'reverse' }} />

            {/* Main glass frame */}
            <div className="absolute inset-0 rounded-[40px] glass-panel active-pill-glow shadow-soft-out dark:shadow-soft-out-dark p-4 flex items-center justify-center">
              <div className="w-full h-full rounded-[28px] overflow-hidden bg-purple-500/10 relative">
                <img
                  src="/diya_photo.png"
                  alt={profileData.fullName}
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
              </div>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Resume Preview Modal */}
      <AnimatePresence>
        {isResumeOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsResumeOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="w-full max-w-4xl h-[85vh] glass-panel rounded-3xl overflow-hidden shadow-2xl relative flex flex-col z-10 border border-white/30 dark:border-zinc-800"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-zinc-200/50 dark:border-zinc-800/50 flex items-center justify-between bg-white/30 dark:bg-black/30 backdrop-blur-sm">
                <h3 className="font-display font-bold text-lg text-zinc-800 dark:text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-500" />
                  Resume Preview
                </h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleDownloadResume}
                    className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-300 hover:bg-purple-500/20 active:scale-95 transition-all text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button
                    onClick={() => setIsResumeOpen(false)}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-zinc-200/80 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 active:scale-95 transition-all"
                  >
                    <X className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
                  </button>
                </div>
              </div>

              {/* PDF Container */}
              <div className="flex-1 bg-zinc-100 dark:bg-zinc-950 overflow-y-auto flex justify-center p-4">
                {resumeUploaded ? (
                  <iframe
                    src={`${apiBaseUrl}/api/resume/download`}
                    className="w-full h-full rounded-2xl border-0 bg-white"
                    title="Resume PDF"
                  />
                ) : (
                  <div className="flex flex-col items-center max-w-2xl w-full">
                    <div className="mb-4 text-center text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-500/15 border border-amber-500/20 px-3 py-1.5 rounded-full">
                      Showing resume image preview. Upload your PDF in the Admin Panel to enable inline PDF viewer.
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg border overflow-hidden p-2 select-none">
                      <img
                        src="/diya_resume_preview.png"
                        alt="Diya Panjwani Resume Preview"
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
