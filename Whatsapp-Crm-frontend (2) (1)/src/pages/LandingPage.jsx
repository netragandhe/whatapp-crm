import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  MessageSquare,
  Shield,
  Zap,
  CheckCircle2,
  Users,
  BarChart3,
  Send,
  PhoneCall,
  Sparkles,
  ArrowRight,
  Play,
  Star,
  Globe2,
  Clock,
  Layers,
  Check,
  ChevronRight,
  Headphones,
  Smartphone,
  Lock,
  Flame,
  Award
} from 'lucide-react'
import { motion } from 'framer-motion'
import useAppStore from '../store/useStore'

const LandingPage = () => {
  const navigate = useNavigate()
  const { isAuthenticated, role } = useAppStore()
  const [annualBilling, setAnnualBilling] = useState(true)
  const [activeTab, setActiveTab] = useState('inbox')

  const roleHomePages = {
    'Super Admin': '/super-admin',
    'Admin': '/admin',
    'Manager': '/manager',
    'Team Leader': '/team-leader',
    'Counselor': '/counselor',
    'Customer Support': '/support',
  }

  const handleCtaClick = () => {
    if (isAuthenticated) {
      navigate(roleHomePages[role] || '/super-admin')
    } else {
      navigate('/login')
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased selection:bg-emerald-500 selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          1. NAVIGATION BAR
      ───────────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-transform">
              <MessageSquare className="w-5 h-5 fill-white/20 stroke-white stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-slate-900 leading-none">
                Whats<span className="text-emerald-600">CRM</span>
              </span>
              <span className="text-[10px] font-black tracking-widest text-emerald-600 uppercase mt-0.5">
                Enterprise AI
              </span>
            </div>
          </Link>

          {/* Center Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600">
            <a href="#features" className="hover:text-emerald-600 transition-colors">Features</a>
            <a href="#overview" className="hover:text-emerald-600 transition-colors">Overview</a>
            <a href="#pricing" className="hover:text-emerald-600 transition-colors">Pricing</a>
            <a href="#testimonials" className="hover:text-emerald-600 transition-colors">Reviews</a>
            <a href="#security" className="hover:text-emerald-600 transition-colors">Security</a>
          </div>

          {/* Right CTAs */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <button
                onClick={handleCtaClick}
                className="px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20 flex items-center gap-2"
              >
                Go to Dashboard
                <ArrowRight size={14} />
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-emerald-600 transition-colors"
                >
                  Sign In
                </Link>
                <button
                  onClick={() => navigate('/login')}
                  className="px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20 flex items-center gap-2 hover:scale-[1.02]"
                >
                  Get Started Free
                  <ArrowRight size={14} />
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ─────────────────────────────────────────────────────────────
          2. HERO SECTION
      ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-12 pb-20 overflow-hidden bg-gradient-to-b from-emerald-50/40 via-white to-slate-50">
        {/* Subtle decorative background glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-emerald-400/15 via-teal-300/10 to-transparent blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/70 border border-emerald-300/60 text-emerald-800 text-[11px] font-black uppercase tracking-wider shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              #1 AI-Powered WhatsApp CRM Platform
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]"
            >
              Turn Your WhatsApp Conversations Into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500">
                Real Customers
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium"
            >
              WhatsCRM empowers your sales and counseling teams to capture high-intent leads,
              automate replies 24/7, route chats instantly, and grow your revenue effortlessly.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4 pt-2"
            >
              <button
                onClick={handleCtaClick}
                className="px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/25 flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                Start Free Trial
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-7 py-4 rounded-full font-bold text-xs uppercase tracking-widest bg-white text-slate-800 border border-slate-200 hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm flex items-center gap-2 hover:bg-emerald-50/50"
              >
                <Play size={14} className="fill-emerald-600 text-emerald-600" />
                Schedule Demo
              </button>
            </motion.div>

            {/* Trust checkmarks */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-6 pt-3 text-[11px] font-bold text-slate-500"
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-600" /> No Credit Card Required
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-600" /> 14-Day Free Access
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-600" /> 5-Min WhatsApp Setup
              </span>
            </motion.div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              HERO PREVIEW INTERFACE (Matching Mockup)
          ───────────────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-14 relative max-w-5xl mx-auto"
          >
            {/* Top Floating Badge */}
            <div className="absolute -top-5 right-4 sm:right-10 z-20 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-wider px-4 py-2 rounded-full shadow-lg flex items-center gap-2 border border-amber-300">
              <Flame size={14} className="fill-slate-950 text-slate-950" />
              10x Faster Conversion to Sales
            </div>

            {/* WhatsApp Glowing Badge */}
            <div className="absolute -top-6 left-4 sm:left-10 z-20 bg-[#25D366] text-white p-3 rounded-2xl shadow-xl shadow-[#25D366]/30 flex items-center gap-2 border-2 border-white">
              <MessageSquare size={18} className="fill-white text-white" />
              <span className="text-xs font-black uppercase tracking-wider">Official WhatsApp Cloud API</span>
            </div>

            {/* Main Mockup Container */}
            <div className="bg-white rounded-[2.5rem] p-3 sm:p-5 shadow-2xl border border-slate-200/80 overflow-hidden">
              <div className="bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-800 grid grid-cols-12 min-h-[500px]">
                
                {/* Mini Left Sidebar */}
                <div className="hidden sm:flex col-span-1 bg-[#06241D] border-r border-emerald-950/60 flex-col items-center py-6 gap-6">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white">
                    <MessageSquare size={18} />
                  </div>
                  <div className="flex flex-col gap-4 text-emerald-400/60">
                    <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400">
                      <MessageSquare size={16} />
                    </div>
                    <div className="p-2.5 hover:text-emerald-300 transition-colors">
                      <Users size={16} />
                    </div>
                    <div className="p-2.5 hover:text-emerald-300 transition-colors">
                      <Zap size={16} />
                    </div>
                    <div className="p-2.5 hover:text-emerald-300 transition-colors">
                      <BarChart3 size={16} />
                    </div>
                  </div>
                </div>

                {/* Middle Chat List */}
                <div className="col-span-12 sm:col-span-4 bg-[#0A3026] border-r border-emerald-950/50 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-emerald-900/60 mb-3">
                      <span className="text-xs font-black uppercase tracking-wider text-emerald-300">Live Active Queue</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">14 Active</span>
                    </div>

                    <div className="space-y-2">
                      <div className="p-3 rounded-2xl bg-emerald-900/40 border border-emerald-700/40 text-left">
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-bold text-white">Aditi Sharma</span>
                          <span className="text-[9px] text-emerald-400">Just now</span>
                        </div>
                        <p className="text-[11px] text-emerald-200/80 truncate mt-1">"Can you share the admission prospectus & fees?"</p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[8px] uppercase">Hot Lead</span>
                          <span className="text-[9px] text-emerald-400 font-bold">India • MBA</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-2xl bg-emerald-950/20 hover:bg-emerald-900/20 border border-emerald-900/30 text-left transition-colors">
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-bold text-slate-200">Kunal Sen</span>
                          <span className="text-[9px] text-slate-400">5m ago</span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate mt-1">"I have paid the application registration token."</p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[8px] uppercase">Payment Verified</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-2xl bg-emerald-950/20 hover:bg-emerald-900/20 border border-emerald-900/30 text-left transition-colors">
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-bold text-slate-200">Rohit Verma</span>
                          <span className="text-[9px] text-slate-400">12m ago</span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate mt-1">"Please arrange a callback with counselor."</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-950/50 rounded-2xl border border-emerald-900/40 text-[10px] text-emerald-300 flex items-center justify-between">
                    <span>⚡ AI Auto-Responder: Active</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                </div>

                {/* Right Chat Conversation View */}
                <div className="col-span-12 sm:col-span-7 bg-[#0E3D31] p-5 flex flex-col justify-between">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-emerald-800/40">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-white text-xs">
                        AS
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          Aditi Sharma
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        </div>
                        <span className="text-[10px] text-emerald-300/70">+91 98765 43210 • Counselor: Priya</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-bold">
                        Lead Score: 94/100 🔥
                      </span>
                    </div>
                  </div>

                  {/* Message Bubbles */}
                  <div className="py-6 space-y-4 text-left">
                    {/* Incoming */}
                    <div className="flex items-start gap-2 max-w-[80%]">
                      <div className="bg-[#124C3D] p-3 rounded-2xl rounded-tl-none border border-emerald-700/40 text-white text-xs leading-relaxed">
                        Hello! I saw your post regarding the Autumn 2026 Batch. Could you share the fee schedule and scholarship details?
                        <div className="text-[8px] text-emerald-300/60 text-right mt-1">10:42 AM</div>
                      </div>
                    </div>

                    {/* AI Smart Response */}
                    <div className="flex items-end justify-end gap-2 ml-auto max-w-[85%]">
                      <div className="bg-[#059669] p-3.5 rounded-2xl rounded-tr-none text-white text-xs leading-relaxed shadow-lg">
                        <div className="text-[9px] font-bold text-emerald-200 mb-1 flex items-center gap-1">
                          <Sparkles size={10} /> Auto-Smart Prospectus Dispatched
                        </div>
                        Hi Aditi! 👋 I've attached our 2026 Prospectus. Up to 40% Merit Scholarships are available for early registrations. Would you like a 10-minute briefing call with Senior Counselor Priya?
                        <div className="text-[8px] text-emerald-100 text-right mt-1">10:42 AM • Delivered ✓✓</div>
                      </div>
                    </div>

                    {/* Quick Response */}
                    <div className="flex items-start gap-2 max-w-[80%]">
                      <div className="bg-[#124C3D] p-3 rounded-2xl rounded-tl-none border border-emerald-700/40 text-white text-xs leading-relaxed">
                        Yes please! Tomorrow at 3:00 PM would be perfect.
                        <div className="text-[8px] text-emerald-300/60 text-right mt-1">10:44 AM</div>
                      </div>
                    </div>
                  </div>

                  {/* Input Simulation */}
                  <div className="pt-3 border-t border-emerald-800/40 flex items-center gap-2">
                    <input
                      disabled
                      placeholder="Type a message or trigger automated workflow..."
                      className="flex-1 bg-emerald-950/60 border border-emerald-800/40 rounded-xl px-4 py-2.5 text-xs text-white placeholder-emerald-400/40 outline-none"
                    />
                    <button className="p-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors">
                      <Send size={14} />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. STATS & GLOBAL TRUST BANNER (Deep Forest Green Theme)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#06281E] border-y border-[#0E4435] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="px-4 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/60 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
              Impact That Matters
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mt-3 tracking-tight">
              Trusted by 5,000+ Fast-Growing Organizations Worldwide
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 rounded-3xl bg-[#093529] border border-emerald-800/40 shadow-lg">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">12,500+</div>
              <div className="text-xs font-bold text-emerald-200/80 uppercase tracking-wider mt-2">Active Agents</div>
              <p className="text-[11px] text-emerald-300/60 mt-1">Driving customer conversations daily</p>
            </div>

            <div className="p-6 rounded-3xl bg-[#093529] border border-emerald-800/40 shadow-lg">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">28M+</div>
              <div className="text-xs font-bold text-emerald-200/80 uppercase tracking-wider mt-2">Messages Handled</div>
              <p className="text-[11px] text-emerald-300/60 mt-1">With 99.98% delivery rate</p>
            </div>

            <div className="p-6 rounded-3xl bg-[#093529] border border-emerald-800/40 shadow-lg">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">98.4%</div>
              <div className="text-xs font-bold text-emerald-200/80 uppercase tracking-wider mt-2">CSAT Satisfaction</div>
              <p className="text-[11px] text-emerald-300/60 mt-1">Top-rated across user reviews</p>
            </div>

            <div className="p-6 rounded-3xl bg-[#093529] border border-emerald-800/40 shadow-lg">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">50+</div>
              <div className="text-xs font-bold text-emerald-200/80 uppercase tracking-wider mt-2">Countries Covered</div>
              <p className="text-[11px] text-emerald-300/60 mt-1">Global multi-channel scale</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. 6 CORE FEATURES GRID
      ───────────────────────────────────────────────────────────── */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-widest border border-emerald-200/80">
              Powerful Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Everything Your Sales Team Needs to Win
            </h2>
            <p className="text-slate-600 text-sm font-medium">
              Eliminate disconnected spreadsheets and missed inquiries with our complete WhatsApp-first CRM.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-emerald-500/50 hover:bg-emerald-50/20 transition-all group hover:-translate-y-1 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">Unified Shared Inbox</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Multiple agents can chat with customers from one single WhatsApp number without colliding or losing context.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-emerald-500/50 hover:bg-emerald-50/20 transition-all group hover:-translate-y-1 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mb-6 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">Automated Lead Routing</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Assign incoming leads based on Round-Robin, territory, or counselor availability so no buyer waits.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-emerald-500/50 hover:bg-emerald-50/20 transition-all group hover:-translate-y-1 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">24/7 AI Qualification</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Automated qualification bot gathers budget, course preference, and timeline before handing over to human reps.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-emerald-500/50 hover:bg-emerald-50/20 transition-all group hover:-translate-y-1 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-6 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Send className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">Broadcast Campaigns</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Dispatch verified WhatsApp template messages, brochure updates, and event invitations at massive scale.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-emerald-500/50 hover:bg-emerald-50/20 transition-all group hover:-translate-y-1 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center mb-6 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">Conversion Analytics</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Real-time visibility into agent response speed, lead funnel progression, and closure success rates.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-emerald-500/50 hover:bg-emerald-50/20 transition-all group hover:-translate-y-1 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">Role-Based Security (RBAC)</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Granular permissions for Super Admin, Manager, Team Leader, Counselor, and Support with full audit trails.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. DEEP DIVE SHOWCASE (Everything You Need in One Unified CRM)
      ───────────────────────────────────────────────────────────── */}
      <section id="overview" className="py-20 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-6">
              <span className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-widest">
                Seamless Experience
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Everything You Need in One Platform, Zero Friction
              </h2>
              <p className="text-slate-600 text-sm font-medium leading-relaxed">
                WhatsCRM brings together messaging, lead profiles, notes, call tracking, and automated follow-ups into a clean interface designed for high-velocity teams.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Check size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">Multi-Agent WhatsApp Access</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Let your whole counseling staff answer from a single official number.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Check size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">Drag-and-Drop Kanban Stages</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Move prospects smoothly from New ➔ Contacted ➔ Qualified ➔ Enrolled.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Check size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">Integrated Call & Note Logs</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Save call logs, next follow-up dates, and counselor notes directly.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Phone / Chat Display */}
            <div className="relative flex justify-center">
              <div className="w-full max-w-sm rounded-[3rem] bg-[#0A261F] p-4 shadow-2xl border-4 border-slate-800 text-white relative">
                {/* Speaker Notch */}
                <div className="w-28 h-4 bg-slate-900 rounded-full mx-auto mb-4" />

                {/* Mobile Screen Header */}
                <div className="bg-[#071F19] p-3 rounded-2xl flex items-center gap-3 border border-emerald-900/60 mb-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-xs">
                    SF
                  </div>
                  <div className="text-left flex-1">
                    <div className="text-xs font-bold">Study First Admissions</div>
                    <div className="text-[10px] text-emerald-400">Online • 24/7 Verified Node</div>
                  </div>
                </div>

                {/* Mobile Chat Messages */}
                <div className="space-y-3 py-2 text-xs text-left">
                  <div className="bg-emerald-900/60 border border-emerald-700/50 p-3 rounded-2xl rounded-tl-none">
                    Hello! I want to enroll in the Global Management Program.
                  </div>
                  <div className="bg-[#059669] p-3 rounded-2xl rounded-tr-none ml-auto max-w-[85%] text-right text-white shadow-md">
                    Welcome! We have reserved your seat. Your counselor <b>Rajesh</b> will call you at 4:00 PM.
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-800/60 text-[10px] text-center text-emerald-300">
                    ✓ Lead automatically added to CRM Pipeline
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-emerald-900/60 text-center">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                    Powered by WhatsCRM Platform
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. PRICING SECTION
      ───────────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-widest border border-emerald-200">
              Transparent Investment
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Simple & Scalable Pricing Plans
            </h2>
            <p className="text-slate-600 text-sm font-medium">
              Start free for 14 days. Scale as your team and inquiry volume grow.
            </p>

            {/* Monthly / Annual Toggle */}
            <div className="flex items-center justify-center gap-3 pt-4">
              <span className={`text-xs font-bold ${!annualBilling ? 'text-slate-900' : 'text-slate-400'}`}>Monthly</span>
              <button
                onClick={() => setAnnualBilling(!annualBilling)}
                className="w-12 h-6 bg-emerald-600 rounded-full p-1 transition-colors relative"
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${annualBilling ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
              <span className={`text-xs font-bold ${annualBilling ? 'text-slate-900' : 'text-slate-400'}`}>
                Annually <span className="text-emerald-600 text-[10px] font-black uppercase ml-1">(Save 20%)</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Starter Plan */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:border-emerald-500/50 transition-all shadow-sm">
              <div>
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Starter</span>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">${annualBilling ? '19' : '24'}</span>
                  <span className="text-xs font-bold text-slate-400">/ month</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">Ideal for individual counselors and solo practitioners.</p>

                <div className="mt-6 pt-6 border-t border-slate-200/80 space-y-3 text-xs font-bold text-slate-700">
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> 1 WhatsApp Number</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> 1 Agent Seat</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> 1,000 Active Leads</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Basic Lead Stage Kanban</div>
                </div>
              </div>

              <button
                onClick={handleCtaClick}
                className="w-full mt-8 py-3 rounded-full font-black text-xs uppercase tracking-wider bg-slate-900 text-white hover:bg-black transition-all"
              >
                Get Started
              </button>
            </div>

            {/* Business Plan (Highlighted / Most Popular) */}
            <div className="p-8 rounded-3xl bg-emerald-950 text-white border-2 border-emerald-500 relative flex flex-col justify-between shadow-2xl shadow-emerald-950/30 scale-105 z-10">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-[9px] uppercase tracking-widest shadow-md">
                ★ Most Popular
              </div>

              <div>
                <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">Business</span>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">${annualBilling ? '49' : '59'}</span>
                  <span className="text-xs font-bold text-emerald-300">/ month</span>
                </div>
                <p className="text-xs text-emerald-200/80 mt-2">For growing teams requiring fast response and automations.</p>

                <div className="mt-6 pt-6 border-t border-emerald-800/80 space-y-3 text-xs font-bold text-emerald-100">
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> 3 WhatsApp Channels</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> 5 Team Member Seats</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> Round-Robin Auto Routing</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> 24/7 AI Qualification Bot</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> Full Lead Call & Notes Logs</div>
                </div>
              </div>

              <button
                onClick={handleCtaClick}
                className="w-full mt-8 py-3.5 rounded-full font-black text-xs uppercase tracking-wider bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25"
              >
                Start 14-Day Free Trial
              </button>
            </div>

            {/* Professional Plan */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:border-emerald-500/50 transition-all shadow-sm">
              <div>
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Professional</span>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">${annualBilling ? '99' : '119'}</span>
                  <span className="text-xs font-bold text-slate-400">/ month</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">High volume operations with manager analytics & SLA control.</p>

                <div className="mt-6 pt-6 border-t border-slate-200/80 space-y-3 text-xs font-bold text-slate-700">
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Unlimited WhatsApp Channels</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> 15 Agent Seats</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> SLA Alerts & Manager Funnels</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Bulk Broadcast Messaging</div>
                </div>
              </div>

              <button
                onClick={handleCtaClick}
                className="w-full mt-8 py-3 rounded-full font-black text-xs uppercase tracking-wider bg-slate-900 text-white hover:bg-black transition-all"
              >
                Get Started
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:border-emerald-500/50 transition-all shadow-sm">
              <div>
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Enterprise</span>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">Custom</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">Tailored deployments, custom ERP integrations & dedicated SLAs.</p>

                <div className="mt-6 pt-6 border-t border-slate-200/80 space-y-3 text-xs font-bold text-slate-700">
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Unlimited Team Seats</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Custom API Webhooks</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Dedicated Account Manager</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> 99.99% Uptime Guarantee</div>
                </div>
              </div>

              <button
                onClick={handleCtaClick}
                className="w-full mt-8 py-3 rounded-full font-black text-xs uppercase tracking-wider border border-slate-300 text-slate-900 hover:border-emerald-600 hover:text-emerald-600 transition-all"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. TESTIMONIALS SECTION
      ───────────────────────────────────────────────────────────── */}
      <section id="testimonials" className="py-20 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-widest">
              Success Stories
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  "Our admission conversion rate jumped by 34% within 3 weeks of rolling out WhatsCRM. Round-robin assignment ensured no student inquiry went cold."
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs">
                  VS
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900">Vikas Sharma</div>
                  <div className="text-[10px] text-slate-400">Dean of Admissions, EduCorp</div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  "The shared inbox solved our biggest bottleneck: multiple staff members trying to use Web WhatsApp on phones. Absolute game-changer for customer satisfaction."
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs">
                  NM
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900">Neha Mehta</div>
                  <div className="text-[10px] text-slate-400">Head of Operations, GlobalConnect</div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  "Super Admin controls and SLA alerts keep our team accountable. The AI qualification bot answers FAQs at midnight and saves hundreds of staff hours."
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs">
                  AP
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900">Ankit Patel</div>
                  <div className="text-[10px] text-slate-400">Director, Study First Info</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. PRE-FOOTER CALL TO ACTION
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-tr from-[#06281E] via-[#0A382B] to-[#041F17] text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <span className="px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-widest border border-emerald-400/30">
            Instant Deployment
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Ready to Turn Your WhatsApp Conversations Into Revenue?
          </h2>
          <p className="text-emerald-100/80 text-sm sm:text-base font-medium max-w-xl mx-auto">
            Join thousands of modern businesses scaling their sales with automated WhatsApp pipelines.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={handleCtaClick}
              className="px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/25 flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              Start Free 14-Day Trial
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all"
            >
              Sign In to Your Workspace
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          9. FOOTER (Dark Forest Theme)
      ───────────────────────────────────────────────────────────── */}
      <footer id="security" className="bg-[#03150F] border-t border-[#093226] text-slate-400 py-16 text-xs font-medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-emerald-950/80">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-white">
                  <MessageSquare size={16} />
                </div>
                <span className="text-lg font-black tracking-tight text-white">
                  Whats<span className="text-emerald-500">CRM</span>
                </span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Enterprise AI-driven WhatsApp CRM platform empowering sales, admissions, and support teams worldwide.
              </p>
            </div>

            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-wider mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-emerald-400 transition-colors">Shared Inbox</a></li>
                <li><a href="#features" className="hover:text-emerald-400 transition-colors">AI Qualification</a></li>
                <li><a href="#features" className="hover:text-emerald-400 transition-colors">Lead Kanban Pipelines</a></li>
                <li><a href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing Plans</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-wider mb-4">Roles & Solutions</h4>
              <ul className="space-y-2">
                <li><Link to="/login" className="hover:text-emerald-400 transition-colors">Super Admin Governance</Link></li>
                <li><Link to="/login" className="hover:text-emerald-400 transition-colors">Sales Counselor Panel</Link></li>
                <li><Link to="/login" className="hover:text-emerald-400 transition-colors">Team Leader Oversight</Link></li>
                <li><Link to="/login" className="hover:text-emerald-400 transition-colors">Manager Funnels</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-wider mb-4">Security & Trust</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-1.5"><Shield size={12} className="text-emerald-500" /> End-to-End Encryption</li>
                <li className="flex items-center gap-1.5"><Lock size={12} className="text-emerald-500" /> Role-Based Access Control</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-emerald-500" /> Meta Cloud API Compliant</li>
                <li className="flex items-center gap-1.5"><Award size={12} className="text-emerald-500" /> ISO 27001 Certified</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
            <div>© {new Date().getFullYear()} WhatsCRM Platform. All rights reserved.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Security Overview</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
