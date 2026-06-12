import React, { useState, useEffect } from 'react';
import { Lock, FileText, Mail, Trash2, LogOut, Upload, CheckCircle, AlertCircle, Calendar, ShieldCheck } from 'lucide-react';

export default function AdminPanel() {
  const [token, setToken] = useState(() => localStorage.getItem('adminToken') || '');
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('resume');
  
  // Dashboard states
  const [resumeInfo, setResumeInfo] = useState({ uploaded: false, filename: '', size: 0, uploaded_at: '' });
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState({ type: null, text: '' });
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000').replace(/\/+$/, '');

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  const fetchDashboardData = () => {
    // Fetch resume info
    fetch(`${apiBaseUrl}/api/resume/info`)
      .then((res) => res.json())
      .then((data) => setResumeInfo(data))
      .catch((err) => console.log('Error fetching resume info:', err));

    // Fetch messages
    fetch(`${apiBaseUrl}/api/admin/messages`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then((res) => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then((data) => setMessages(data))
      .catch((err) => {
        console.log('Error fetching messages:', err);
        // Token might be expired or invalid
        handleLogout();
      });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!passcode) return;

    try {
      const response = await fetch(`${apiBaseUrl}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: passcode })
      });

      const data = await response.json();
      if (response.ok && (data.success || data.status === 'success' || data.token)) {
        localStorage.setItem('adminToken', passcode);
        setToken(passcode);
        setLoginError('');
      } else {
        setLoginError('Invalid administrator passcode.');
      }
    } catch (err) {
      setLoginError('Could not connect to the backend server.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken('');
    setPasscode('');
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadResume = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    setStatus({ type: null, text: '' });

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${apiBaseUrl}/api/admin/resume`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      const data = await response.json();
      if (response.ok) {
        setStatus({ type: 'success', text: 'Resume PDF uploaded successfully!' });
        setFile(null);
        fetchDashboardData();
      } else {
        setStatus({ type: 'error', text: data.detail || 'Upload failed.' });
      }
    } catch (err) {
      setStatus({ type: 'error', text: 'Network error occurred during file upload.' });
    } finally {
      setIsUploading(false);
    }
  };

  // If not authenticated, render Login Page
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-brand-bg-light dark:bg-brand-bg-dark">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-brand-lavender/30 dark:bg-purple-900/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-brand-coral/20 dark:bg-orange-900/5 blur-[120px] pointer-events-none" />
        
        <div className="w-full max-w-md glass-panel rounded-[32px] p-8 shadow-2xl z-10 border border-white/40 dark:border-white/5 text-center">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 mx-auto mb-6">
            <Lock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className="font-display font-extrabold text-2xl text-zinc-800 dark:text-white">
            Admin Console
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-2">
            Secure sign-in for Diya Panjwani's Portfolio Administration.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-4 text-left">
            {loginError && (
              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest pl-1">
                Passcode Token
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••••••••••••••"
                className="w-full px-4 py-3 rounded-2xl bg-brand-bg-light/60 dark:bg-zinc-950/60 border border-white/40 dark:border-zinc-900 text-sm shadow-soft-in dark:shadow-soft-in-dark focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all text-center tracking-widest"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 mt-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-sm tracking-wide shadow-md hover:scale-[1.01] active:scale-98 transition-all duration-300"
            >
              Authenticate
            </button>
          </form>
          
          <div className="mt-6">
            <a href="/" className="text-xs text-purple-500 dark:text-purple-400 hover:underline">
              ← Return to Portfolio
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard layout
  return (
    <div className="min-h-screen bg-brand-bg-light dark:bg-brand-bg-dark p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200/50 dark:border-zinc-800/50 pb-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 text-purple-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-display font-extrabold text-2xl text-zinc-800 dark:text-white">
                Admin Panel
              </h1>
              <p className="text-zinc-400 dark:text-zinc-500 text-xs mt-0.5">
                Logged in as Administrator
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="px-4 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-white/50 dark:border-zinc-800 shadow-sm text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:scale-[1.02] active:scale-95 transition-all"
            >
              View Site
            </a>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-semibold flex items-center gap-1.5 hover:bg-rose-500/20 active:scale-95 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Status Bar */}
        {status.text && (
          <div className={`p-4 mb-6 rounded-2xl flex items-start gap-3 border text-xs font-semibold ${
            status.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-300'
              : 'bg-rose-500/10 border-rose-500/20 text-rose-700 dark:text-rose-300'
          }`}>
            {status.type === 'success' ? <CheckCircle className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
            <span>{status.text}</span>
          </div>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar Menu */}
          <div className="col-span-1 md:col-span-3 flex flex-col gap-2.5">
            <button
              onClick={() => { setActiveTab('resume'); setStatus({ type: null, text: '' }); }}
              className={`w-full px-4 py-3 rounded-2xl text-left text-sm font-semibold flex items-center gap-2.5 border transition-all ${
                activeTab === 'resume'
                  ? 'bg-purple-500/15 border-purple-500/25 text-purple-700 dark:text-purple-300 shadow-sm'
                  : 'bg-white/40 dark:bg-zinc-900/30 border-transparent text-zinc-500 dark:text-zinc-400 hover:bg-white/80 dark:hover:bg-zinc-900/80 hover:text-zinc-700'
              }`}
            >
              <FileText className="w-4 h-4" />
              Resume Control
            </button>
            <button
              onClick={() => { setActiveTab('messages'); setStatus({ type: null, text: '' }); }}
              className={`w-full px-4 py-3 rounded-2xl text-left text-sm font-semibold flex items-center gap-2.5 border transition-all ${
                activeTab === 'messages'
                  ? 'bg-purple-500/15 border-purple-500/25 text-purple-700 dark:text-purple-300 shadow-sm'
                  : 'bg-white/40 dark:bg-zinc-900/30 border-transparent text-zinc-500 dark:text-zinc-400 hover:bg-white/80 dark:hover:bg-zinc-900/80 hover:text-zinc-700'
              }`}
            >
              <Mail className="w-4 h-4" />
              Inbox
              {messages.length > 0 && (
                <span className="ml-auto w-5 h-5 rounded-full bg-purple-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {messages.length}
                </span>
              )}
            </button>
          </div>

          {/* Right Main Panel */}
          <div className="col-span-1 md:col-span-9 glass-panel rounded-3xl p-6 md:p-8 shadow-soft-out dark:shadow-soft-out-dark border border-white/40 dark:border-white/5">
            
            {/* TAB: Resume Control */}
            {activeTab === 'resume' && (
              <div>
                <h2 className="font-display font-extrabold text-lg text-zinc-800 dark:text-white mb-2">
                  Resume PDF Configuration
                </h2>
                <p className="text-zinc-400 dark:text-zinc-500 text-xs mb-6">
                  Upload a PDF version of your resume to make it readable in the inline PDF viewer widget.
                </p>

                {/* Status card */}
                <div className="p-5 rounded-2xl bg-zinc-50/50 dark:bg-zinc-950/30 border border-zinc-200/40 dark:border-zinc-800 flex items-center justify-between mb-8 shadow-soft-in dark:shadow-soft-in-dark">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 border border-purple-500/20">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                        {resumeInfo.uploaded ? 'Custom PDF Active' : 'Static Fallback Active'}
                      </h4>
                      <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">
                        {resumeInfo.uploaded 
                          ? `${resumeInfo.filename} (${(resumeInfo.size / 1024).toFixed(1)} KB)`
                          : 'diya_resume_preview.png (default image)'}
                      </p>
                    </div>
                  </div>
                  {resumeInfo.uploaded && (
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                      Live
                    </span>
                  )}
                </div>

                {/* Form */}
                <form onSubmit={handleUploadResume} className="space-y-4 max-w-md">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest pl-1">
                      Choose PDF File
                    </label>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      disabled={isUploading}
                      className="w-full px-4 py-3 rounded-2xl bg-brand-bg-light/60 dark:bg-zinc-950/60 border border-white/40 dark:border-zinc-900 text-xs text-zinc-500 shadow-soft-in dark:shadow-soft-in-dark file:mr-4 file:py-1.5 file:px-3.5 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-purple-500/10 file:text-purple-600 hover:file:bg-purple-500/20 cursor-pointer"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!file || isUploading}
                    className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-xs tracking-wide shadow-md flex items-center gap-2 hover:scale-[1.02] active:scale-98 transition-all disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <Upload className="w-4 h-4" />
                    {isUploading ? 'Uploading PDF...' : 'Upload PDF Resume'}
                  </button>
                </form>
              </div>
            )}

            {/* TAB: Inbox Messages */}
            {activeTab === 'messages' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-display font-extrabold text-lg text-zinc-800 dark:text-white">
                      Inbox Inquiries
                    </h2>
                    <p className="text-zinc-400 dark:text-zinc-500 text-xs mt-0.5">
                      Messages submitted via the contact form on your portfolio.
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-purple-700 dark:text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded-full shadow-sm">
                    {messages.length} Inquiries
                  </span>
                </div>

                {messages.length === 0 ? (
                  <div className="text-center py-12 bg-zinc-50/50 dark:bg-zinc-950/20 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
                    <Mail className="w-8 h-8 text-zinc-300 dark:text-zinc-700 mx-auto mb-2" />
                    <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-600">
                      No inquiries found.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg._id}
                        className="p-5 rounded-2xl bg-white/60 dark:bg-zinc-900/40 border border-zinc-200/40 dark:border-zinc-800/60 shadow-sm flex flex-col justify-between"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2 border-b border-zinc-200/30 dark:border-zinc-800/30 pb-3 mb-3">
                          <div>
                            <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200">{msg.name}</h3>
                            <a href={`mailto:${msg.email}`} className="text-xs text-purple-500 hover:underline">{msg.email}</a>
                          </div>
                          <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-semibold flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                            {new Date(msg.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-wrap">
                          {msg.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
