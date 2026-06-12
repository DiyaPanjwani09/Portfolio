import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, MessageSquare, AlertCircle, CheckCircle } from 'lucide-react';
import { profileData } from '../profileData';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: null, text: '' });
  const [isLoading, setIsLoading] = useState(false);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', text: 'All fields are required.' });
      return;
    }

    setIsLoading(true);
    setStatus({ type: null, text: '' });

    try {
      const response = await fetch(`${apiBaseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus({
          type: 'success',
          text: 'Thank you! Your message has been sent successfully.',
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({
          type: 'error',
          text: data.detail || 'Failed to send message. Please try again.',
        });
      }
    } catch (err) {
      setStatus({
        type: 'error',
        text: 'Network error. Please make sure the backend server is running.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 bg-white/10 dark:bg-black/5 relative">
      <div className="w-full max-w-5xl mx-auto z-10">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-zinc-800 dark:text-white relative">
            Get In Touch
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mt-4 max-w-md text-sm">
            Contact me for internships, collaboration on data analysis or AI/ML projects!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-stretch">
          
          {/* Left: Contact Info */}
          <div className="col-span-1 md:col-span-5 flex flex-col justify-between">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-soft-out dark:shadow-soft-out-dark h-full flex flex-col justify-between border border-white/40 dark:border-white/5">
              
              <div className="space-y-6">
                <h3 className="font-display font-bold text-lg text-zinc-800 dark:text-zinc-200">
                  Connect Directly
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                  Have an internship opening or a project concept? Fill out the form or use any of the direct channels below.
                </p>

                {/* Details List */}
                <div className="space-y-4 pt-4">
                  <a
                    href={`mailto:${profileData.email}`}
                    className="flex items-center gap-4 group p-2.5 rounded-2xl hover:bg-white/40 dark:hover:bg-zinc-800/40 border border-transparent hover:border-white/10 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 shadow-soft-out dark:shadow-soft-out-dark flex items-center justify-center text-zinc-500 dark:text-zinc-400 group-hover:text-purple-500 transition-colors flex-shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Email</h4>
                      <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mt-0.5 group-hover:underline">{profileData.email}</p>
                    </div>
                  </a>

                  <a
                    href={`tel:${profileData.phone}`}
                    className="flex items-center gap-4 group p-2.5 rounded-2xl hover:bg-white/40 dark:hover:bg-zinc-800/40 border border-transparent hover:border-white/10 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 shadow-soft-out dark:shadow-soft-out-dark flex items-center justify-center text-zinc-500 dark:text-zinc-400 group-hover:text-purple-500 transition-colors flex-shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Phone</h4>
                      <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mt-0.5 group-hover:underline">{profileData.phone}</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-2.5 rounded-2xl">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 shadow-soft-out dark:shadow-soft-out-dark flex items-center justify-center text-zinc-500 dark:text-zinc-400 flex-shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Location</h4>
                      <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mt-0.5">{profileData.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="border-t border-zinc-200/30 dark:border-zinc-800/30 pt-6 mt-8 flex gap-4">
                <a
                  href={profileData.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-white/60 dark:border-zinc-800 shadow-soft-out dark:shadow-soft-out-dark flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-purple-500 transition-all duration-300 hover:scale-105"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={profileData.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-white/60 dark:border-zinc-800 shadow-soft-out dark:shadow-soft-out-dark flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-purple-500 transition-all duration-300 hover:scale-105"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>

            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="col-span-1 md:col-span-7">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-soft-out dark:shadow-soft-out-dark border border-white/40 dark:border-white/5">
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Status Bar */}
                {status.text && (
                  <div className={`p-4 rounded-2xl flex items-start gap-3 border text-xs font-medium ${
                    status.type === 'success'
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                      : 'bg-rose-500/10 border-rose-500/20 text-rose-700 dark:text-rose-300'
                  }`}>
                    {status.type === 'success' ? <CheckCircle className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
                    <span>{status.text}</span>
                  </div>
                )}

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest pl-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    disabled={isLoading}
                    className="w-full px-4 py-3 rounded-2xl bg-brand-bg-light/60 dark:bg-zinc-950/60 border border-white/40 dark:border-zinc-900 text-sm shadow-soft-in dark:shadow-soft-in-dark focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest pl-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    disabled={isLoading}
                    className="w-full px-4 py-3 rounded-2xl bg-brand-bg-light/60 dark:bg-zinc-950/60 border border-white/40 dark:border-zinc-900 text-sm shadow-soft-in dark:shadow-soft-in-dark focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest pl-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Describe your inquiry..."
                    disabled={isLoading}
                    className="w-full px-4 py-3 rounded-2xl bg-brand-bg-light/60 dark:bg-zinc-950/60 border border-white/40 dark:border-zinc-900 text-sm shadow-soft-in dark:shadow-soft-in-dark focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-sm tracking-wide shadow-md flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-98 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
                >
                  <Send className="w-4 h-4" />
                  {isLoading ? 'Sending Message...' : 'Send Message'}
                </button>

              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
