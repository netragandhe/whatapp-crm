import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ktLogo from '../assets/logo.png'
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
  Award,
  GraduationCap,
  Building2,
  FileText,
  UserCheck,
  Activity,
  Calendar,
  AlertTriangle,
  HelpCircle,
  ExternalLink,
  Bot,
  Filter,
  Sliders,
  Database,
  ArrowUpRight,
  CheckCircle
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import useAppStore from '../store/useStore'

const LandingPage = () => {
  const navigate = useNavigate()
  const { isAuthenticated, role } = useAppStore()
  const [annualBilling, setAnnualBilling] = useState(true)
  const [activeRoleIndex, setActiveRoleIndex] = useState(4) // Default to Counselor

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

  // The 6 Exact Dedicated Roles in this WhatsApp CRM
  const projectRoles = [
    {
      id: 'super-admin',
      roleKey: 'Super Admin',
      title: 'Super Admin Portal',
      tagline: 'System Governance & Global Infrastructure',
      badge: 'System Governance',
      icon: Shield,
      path: '/super-admin',
      description: 'Centralized oversight for managing institutions, multi-client quotas, global channel health, and full immutable audit logging.',
      metrics: { primary: '750/1000', label: 'Global Channels Used', secondary: '99.98% Uptime' },
      features: [
        'Multi-Client Entity Partitioning (EduCorp Inc, Global Connect, HealthLine)',
        'Global WhatsApp Channel Allocation & Rate Limit Controls',
        'Administrative User Provisioning & Granular Permissions Matrix',
        'Global Unassigned Lead Dispatch Queue directly to counselors',
        'System Audit Logs with immutable action history & CSV export'
      ],
      sampleActivity: 'Provisioned new regional admin for EduCorp Inc with Users & Analytics permissions'
    },
    {
      id: 'admin',
      roleKey: 'Admin',
      title: 'Institutional Admin Hub',
      tagline: 'Channel Connectivity & Automated Routing Rules',
      badge: 'Operations Hub',
      icon: Building2,
      path: '/admin',
      description: 'Connect official WhatsApp numbers via QR scan, configure territory rules, setup counselor shifts, and tune the AI qualification bot.',
      metrics: { primary: '42ms', label: 'Average Routing Latency', secondary: 'Zero Dropped Leads' },
      features: [
        'Live WhatsApp Business QR Code generator & node synchronization',
        'Conditional Routing Engine by Country (India, UK, UAE, USA) & Program (MBA, Tech)',
        'Weekly Working Hours Scheduler with automated off-hours auto-responder',
        'AI Qualification Bot tuning: prompts, confidence thresholds & qualification scoring',
        'Integrations Manager: Real-time Webhooks, Google Sheets & HubSpot export'
      ],
      sampleActivity: 'Active rule: India MBA inquiries auto-route to Alpha Squad counselor pool'
    },
    {
      id: 'manager',
      roleKey: 'Manager',
      title: 'Executive Manager Suite',
      tagline: 'Conversion Funnels & SLA Performance',
      badge: 'Analytics Suite',
      icon: BarChart3,
      path: '/manager',
      description: 'Comprehensive visibility into end-to-end conversion funnels, territory performance cohorts, counselor call recordings, and team SLA benchmarks.',
      metrics: { primary: '34.2%', label: 'Conversion Rate', secondary: 'Sub-15m Response' },
      features: [
        'Lead Funnel Progression (New ➔ Contacted ➔ Qualified ➔ Enrolled ➔ Won)',
        'Territory & Country Heatmaps (Inquiry volume & conversion rates by region)',
        'SLA Response Time Compliance & Average Resolution Tracking',
        'Counselor Call Reports with duration logs, recordings & call outcome breakdown',
        'Team Performance Overview with workload distribution heatmaps'
      ],
      sampleActivity: 'Monthly cohort report generated: Autumn 2026 MBA conversion up 34%'
    },
    {
      id: 'team-leader',
      roleKey: 'Team Leader',
      title: 'Team Leader Dashboard',
      tagline: 'Team Inbox & Live Counselor Supervision',
      badge: 'Team Supervision',
      icon: Users,
      path: '/team-leader',
      description: 'Supervise daily counselor operations, monitor shared team WhatsApp messages, reassign leads with 1 click, and catch SLA breaches instantly.',
      metrics: { primary: '14 Active', label: 'Counselors Monitored', secondary: '0 Missed Chats' },
      features: [
        'Shared Team WhatsApp Inbox with live counselor interaction monitoring',
        'Real-time Assigned Leads Pipeline across all squad counselors',
        '1-Click Bulk Lead Reassignment for rebalancing workloads',
        'Active SLA Breach Warning Alerts for neglected inquiries (15-min trigger)',
        'Daily Activity Timeline tracking calls made, notes taken, and WhatsApps sent'
      ],
      sampleActivity: 'Bulk reassigned 5 unhandled leads from off-duty staff to active counselors'
    },
    {
      id: 'counselor',
      roleKey: 'Counselor',
      title: 'Sales Counselor Workspace',
      tagline: 'Personal Leads Pipeline & Live Chats',
      badge: 'Frontline Closer',
      icon: GraduationCap,
      path: '/counselor',
      description: 'The primary workspace for counselors: an isolated personal leads Kanban board, live WhatsApp chat, instant call logging, and follow-up alerts.',
      metrics: { primary: '4x Faster', label: 'Follow-up Velocity', secondary: '96/100 Lead Score' },
      features: [
        'Personal Scoped Leads Kanban Board with 1-click stage updates',
        'Live WhatsApp Chat with verified message templates & media attachments',
        '1-Click Call Logging with outcomes: Interested, Callback, Token Paid, Dropped',
        'Private Counselor Notes & Scheduled Next Follow-up Date notifications',
        'AI Conversation Summary generator for fast student context retrieval'
      ],
      sampleActivity: 'Logged call with Aarav Sharma: MBA scholarship approved, fee token received'
    },
    {
      id: 'support',
      roleKey: 'Customer Support',
      title: 'Customer Support Desk',
      tagline: 'First-Touch Intake & Queue Dispatch',
      badge: 'Inflow Gateway',
      icon: Headphones,
      path: '/support',
      description: 'First line of contact for unassigned student inquiries. Inject manual leads via "Provision Manual Node" and dispatch instantly to available counselors.',
      metrics: { primary: '100%', label: 'Inquiries Dispatched', secondary: 'Zero Queue Delay' },
      features: [
        'Incoming First-Contact Leads Queue awaiting qualification and routing',
        'Manual Lead Injection ("Provision Manual Node") with instant territory tagging',
        'One-Click Counselor Allocation & Team Transfer',
        'AI Bot Qualification Status inspection with manual human escalation',
        'Template broadcast status verification & quick inquiry resolution'
      ],
      sampleActivity: 'Direct manual injection of walk-in candidate dispatched to Senior Counselor'
    }
  ]

  const activeRole = projectRoles[activeRoleIndex]

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased selection:bg-emerald-500 selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          1. NAVIGATION BAR
      ───────────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-24 h-14 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <img src={ktLogo} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xl font-black tracking-tight text-slate-900 leading-none">
                Whats<span className="text-emerald-600">CRM</span>
              </span>
              <span className="text-[10px] font-black tracking-widest text-emerald-700 uppercase mt-1">
                Kiaan Tech • WhatsCRM
              </span>
            </div>
          </Link>

          {/* Center Links */}
          <div className="hidden lg:flex items-center gap-8 text-xs font-black uppercase tracking-wider text-slate-600">
            <a href="#roles" className="hover:text-emerald-600 transition-colors">6-Role Architecture</a>
            <a href="#features" className="hover:text-emerald-600 transition-colors">Core Modules</a>
            <a href="#routing" className="hover:text-emerald-600 transition-colors">Smart Routing</a>
            <a href="#pricing" className="hover:text-emerald-600 transition-colors">Pricing Plans</a>
            <a href="#faqs" className="hover:text-emerald-600 transition-colors">FAQs</a>
          </div>

          {/* Right CTAs */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <button
                onClick={handleCtaClick}
                className="px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20 flex items-center gap-2"
              >
                Open Dashboard ({role})
                <ArrowRight size={14} />
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2.5 text-xs font-black uppercase tracking-wider text-slate-700 hover:text-emerald-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/25 flex items-center gap-2 hover:scale-[1.02] active:scale-95"
                >
                  Sign Up Free
                  <ArrowRight size={14} />
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ─────────────────────────────────────────────────────────────
          2. HERO SECTION
      ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-12 pb-24 overflow-hidden bg-gradient-to-b from-emerald-50/60 via-white to-slate-50">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-tr from-emerald-400/20 via-teal-300/15 to-transparent blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-[11px] font-black uppercase tracking-wider shadow-sm"
            >
              <GraduationCap className="w-4 h-4 text-emerald-700" />
              STUDY FIRST INFO LTD. • ENTERPRISE WHATSAPP CRM
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]"
            >
              Turn Every WhatsApp Inquiry Into a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600">
                Qualified Enrolled Client
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto font-medium"
            >
              Engineered specifically for admissions counseling, student recruitment, and multi-team customer sales. 
              Unify all WhatsApp Business numbers into a single collaborative workspace equipped with 
              intelligent Round-Robin auto-assignment, 24/7 AI qualification bots, call logs, and SLA breach monitors.
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
                Access All 6 Portals
                <ArrowRight size={16} />
              </button>
              <a
                href="#roles"
                className="px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest bg-white text-slate-800 border border-slate-300 hover:border-emerald-500 hover:text-emerald-700 transition-all shadow-sm flex items-center gap-2 hover:bg-emerald-50/50"
              >
                <Layers size={15} className="text-emerald-600" />
                Explore 6 Role Workspaces
              </a>
            </motion.div>

            {/* Trust checkmarks */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-6 pt-3 text-[11px] font-bold text-slate-500"
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-600" /> 6 Isolated RBAC Dashboards
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-600" /> Round-Robin Auto Lead Routing
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-600" /> Live WebSocket Real-Time Chat
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-600" /> 1-Click Call & Notes Logging
              </span>
            </motion.div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              HERO LIVE MOCKUP: STUDY FIRST INFO WHATSAPP CRM PREVIEW
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
              10x Faster Inquiries to Admissions
            </div>

            {/* WhatsApp Glowing Badge */}
            <div className="absolute -top-6 left-4 sm:left-10 z-20 bg-[#25D366] text-white p-3 rounded-2xl shadow-xl shadow-[#25D366]/30 flex items-center gap-2 border-2 border-white">
              <MessageSquare size={18} className="fill-white text-white" />
              <span className="text-xs font-black uppercase tracking-wider">Official WhatsApp Cloud Node Active</span>
            </div>

            {/* Main Mockup Container */}
            <div className="bg-white rounded-[2.5rem] p-3 sm:p-5 shadow-2xl border border-slate-200/90 overflow-hidden">
              <div className="bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-800 grid grid-cols-12 min-h-[500px]">
                
                {/* Mini Left Sidebar */}
                <div className="hidden sm:flex col-span-1 bg-[#06241D] border-r border-emerald-950/60 flex-col items-center py-6 gap-6">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                    <GraduationCap size={18} />
                  </div>
                  <div className="flex flex-col gap-4 text-emerald-400/60">
                    <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
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

                {/* Middle Chat List (Real Study First Leads) */}
                <div className="col-span-12 sm:col-span-4 bg-[#0A3026] border-r border-emerald-950/50 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-emerald-900/60 mb-3">
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-black uppercase tracking-wider text-emerald-300">Live Intake Queue</span>
                        <span className="text-[9px] text-emerald-400/70">Auto-Routing: Round-Robin</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">18 Active</span>
                    </div>

                    <div className="space-y-2">
                      <div className="p-3 rounded-2xl bg-emerald-900/50 border border-emerald-600/50 text-left">
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-bold text-white">Aarav Sharma</span>
                          <span className="text-[9px] text-emerald-400 font-bold">1m ago</span>
                        </div>
                        <p className="text-[11px] text-emerald-200/90 truncate mt-1">"Please share the brochure for MBA in Data Analytics."</p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[8px] uppercase">Score: 96 🔥</span>
                          <span className="text-[9px] text-emerald-300 font-bold">India • Intake 2026</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-2xl bg-emerald-950/30 hover:bg-emerald-900/20 border border-emerald-900/30 text-left transition-colors">
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-bold text-slate-200">Priya Nair</span>
                          <span className="text-[9px] text-slate-400">4m ago</span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate mt-1">"Can we schedule a 1-on-1 counseling call for UK visa?"</p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[8px] uppercase">Callback Booked</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-2xl bg-emerald-950/30 hover:bg-emerald-900/20 border border-emerald-900/30 text-left transition-colors">
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-bold text-slate-200">Rohan Mehta</span>
                          <span className="text-[9px] text-slate-400">10m ago</span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate mt-1">"I have submitted my application fee token receipt."</p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-[8px] uppercase">Fee Paid</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-950/60 rounded-2xl border border-emerald-900/40 text-[10px] text-emerald-300 flex items-center justify-between">
                    <span>⚡ AI Qualification Bot: Online</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                </div>

                {/* Right Chat Conversation View */}
                <div className="col-span-12 sm:col-span-7 bg-[#0E3D31] p-5 flex flex-col justify-between">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-emerald-800/40">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-white text-xs shadow-md">
                        AS
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          Aarav Sharma
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        </div>
                        <span className="text-[10px] text-emerald-300/70">+91 98765 43210 • Counselor: Senior Counselor Neha</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-bold">
                        Stage: Qualified
                      </span>
                    </div>
                  </div>

                  {/* Message Bubbles */}
                  <div className="py-6 space-y-4 text-left">
                    {/* Student Message */}
                    <div className="flex items-start gap-2 max-w-[80%]">
                      <div className="bg-[#124C3D] p-3 rounded-2xl rounded-tl-none border border-emerald-700/40 text-white text-xs leading-relaxed">
                        Hello Study First Info team! I want to apply for the Autumn 2026 MBA Intake. What are the eligibility criteria and scholarship deadlines?
                        <div className="text-[8px] text-emerald-300/60 text-right mt-1">11:15 AM</div>
                      </div>
                    </div>

                    {/* AI Smart Response */}
                    <div className="flex items-end justify-end gap-2 ml-auto max-w-[85%]">
                      <div className="bg-[#059669] p-3.5 rounded-2xl rounded-tr-none text-white text-xs leading-relaxed shadow-lg">
                        <div className="text-[9px] font-bold text-emerald-200 mb-1 flex items-center gap-1">
                          <Sparkles size={10} /> Auto-Smart Prospectus Dispatched
                        </div>
                        Hi Aarav! 🎓 Thank you for reaching out to Study First Info. I have shared our 2026 MBA Prospectus and Scholarship Matrix. Early applicant scholarships up to 40% close on Nov 30th. 
                        <br className="my-1"/>
                        Senior Counselor <b>Neha</b> has been assigned to your profile. Would you like a 10-minute briefing call today at 3:00 PM?
                        <div className="text-[8px] text-emerald-100 text-right mt-1">11:15 AM • Delivered ✓✓</div>
                      </div>
                    </div>

                    {/* Student Reply */}
                    <div className="flex items-start gap-2 max-w-[80%]">
                      <div className="bg-[#124C3D] p-3 rounded-2xl rounded-tl-none border border-emerald-700/40 text-white text-xs leading-relaxed">
                        Yes please, 3:00 PM works great! I have my graduation marksheets ready.
                        <div className="text-[8px] text-emerald-300/60 text-right mt-1">11:17 AM</div>
                      </div>
                    </div>
                  </div>

                  {/* Input Simulation */}
                  <div className="pt-3 border-t border-emerald-800/40 flex items-center gap-2">
                    <input
                      disabled
                      placeholder="Type counselor reply or trigger WhatsApp template message..."
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
              Study First Info Global Impact
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mt-3 tracking-tight">
              Enterprise Performance Proven in Daily Admissions
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 rounded-3xl bg-[#093529] border border-emerald-800/40 shadow-lg">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">12,500+</div>
              <div className="text-xs font-bold text-emerald-200/80 uppercase tracking-wider mt-2">Active Students Handled</div>
              <p className="text-[11px] text-emerald-300/60 mt-1">From initial WhatsApp chat to final enrollment</p>
            </div>

            <div className="p-6 rounded-3xl bg-[#093529] border border-emerald-800/40 shadow-lg">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">28M+</div>
              <div className="text-xs font-bold text-emerald-200/80 uppercase tracking-wider mt-2">WhatsApp Messages</div>
              <p className="text-[11px] text-emerald-300/60 mt-1">99.98% delivery rate via official Cloud API</p>
            </div>

            <div className="p-6 rounded-3xl bg-[#093529] border border-emerald-800/40 shadow-lg">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">98.4%</div>
              <div className="text-xs font-bold text-emerald-200/80 uppercase tracking-wider mt-2">SLA Compliance</div>
              <p className="text-[11px] text-emerald-300/60 mt-1">Sub-15 minute response time guarantee</p>
            </div>

            <div className="p-6 rounded-3xl bg-[#093529] border border-emerald-800/40 shadow-lg">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">50+</div>
              <div className="text-xs font-bold text-emerald-200/80 uppercase tracking-wider mt-2">Countries Covered</div>
              <p className="text-[11px] text-emerald-300/60 mt-1">India, UK, UAE, USA, Canada, Australia cohorts</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. THE 6 DEDICATED ROLE PORTALS (CORE PROJECT ARCHITECTURE)
      ───────────────────────────────────────────────────────────── */}
      <section id="roles" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-widest border border-emerald-200/80">
              Role-Based Access Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              6 Tailored Dashboards for Every Member of Your Organization
            </h2>
            <p className="text-slate-600 text-sm font-medium">
              Every staff member in Study First Info gets an optimized workspace with strict Role-Based Access Control (RBAC), 
              ensuring counselors only access their assigned leads while managers enjoy global pipeline analytics.
            </p>

            {/* Role Switcher Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
              {projectRoles.map((r, idx) => (
                <button
                  key={r.id}
                  onClick={() => setActiveRoleIndex(idx)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
                    activeRoleIndex === idx
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 scale-105'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                  }`}
                >
                  <r.icon size={15} />
                  {r.roleKey}
                </button>
              ))}
            </div>
          </div>

          {/* Active Role Feature Display Card */}
          <div className="bg-slate-900 rounded-[2.5rem] p-8 sm:p-12 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 text-left">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <activeRole.icon size={26} />
                  </div>
                  <div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase tracking-widest border border-emerald-500/30">
                      {activeRole.badge}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                      {activeRole.title}
                    </h3>
                  </div>
                </div>

                <p className="text-slate-300 text-sm font-medium leading-relaxed">
                  {activeRole.description}
                </p>

                <div className="space-y-3 pt-2">
                  {activeRole.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className="text-xs text-slate-200 font-medium leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => navigate('/login')}
                    className="px-6 py-3.5 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all shadow-lg flex items-center gap-2 hover:scale-105 active:scale-95"
                  >
                    Open {activeRole.roleKey} Portal
                    <ArrowRight size={14} />
                  </button>
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <Zap size={14} />
                    {activeRole.metrics.secondary}
                  </span>
                </div>
              </div>

              {/* Right Mock Representation */}
              <div className="lg:col-span-5 bg-[#06241D] rounded-3xl p-6 border border-emerald-800/50 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-emerald-900/60">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-300">Live Workspace Status</span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/40">
                    {activeRole.path}
                  </span>
                </div>

                <div className="space-y-2.5 text-xs text-slate-300 font-medium">
                  <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800/40 flex justify-between items-center">
                    <span className="text-slate-400">Primary Benchmark</span>
                    <span className="text-emerald-400 font-black text-sm">{activeRole.metrics.primary}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800/40 flex justify-between items-center">
                    <span className="text-slate-400">Security & RBAC Scope</span>
                    <span className="text-emerald-400 font-bold">Strict User Isolation</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800/40 flex justify-between items-center">
                    <span className="text-slate-400">Real-time Sockets</span>
                    <span className="text-emerald-400 font-bold">Port 5000 Active ✓</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-[11px] text-emerald-300 text-left font-medium">
                  <div className="text-[9px] uppercase font-black text-emerald-400 mb-1">Recent Audit Action:</div>
                  "{activeRole.sampleActivity}"
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-[10px] text-emerald-300 text-center font-bold">
                  ⚡ 1-Click Fast Role Switch Available on Login Screen
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. CORE SYSTEM MODULES (Deep Dive)
      ───────────────────────────────────────────────────────────── */}
      <section id="features" className="py-24 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-widest">
              Built For Admissions & Sales
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Enterprise Features Built Right In
            </h2>
            <p className="text-slate-600 text-sm font-medium">
              Every tool your counselors and supervisors need to manage high inquiry volumes with zero friction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {/* Module 1 */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-emerald-500/60 hover:shadow-xl transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">Round-Robin Lead Routing</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Automatic equal distribution of incoming inquiries among active counselors based on <code className="bg-slate-100 px-1 py-0.5 rounded text-emerald-700">lastAssignedAt</code> timestamps. Eliminates lead hoarding and ensures immediate engagement.
              </p>
            </div>

            {/* Module 2 */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-emerald-500/60 hover:shadow-xl transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mb-6 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">1-Click Call & Notes Logging</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Counselors log call durations, select call outcomes (Interested, Callback Scheduled, Token Paid, Dropped), and set next follow-up dates directly in student profiles.
              </p>
            </div>

            {/* Module 3 */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-emerald-500/60 hover:shadow-xl transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">AI Qualification Engine</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                24/7 AI bot automatically asks qualifying questions (budget, desired intake year, program) and assigns an automated Lead Score (0–100) before human rep assignment.
              </p>
            </div>

            {/* Module 4 */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-emerald-500/60 hover:shadow-xl transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-6 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">15-Min SLA Breach Alerts</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Strict response time monitoring. If an incoming WhatsApp lead is not answered within target window, automated SLA Warning flags notify Team Leaders for 1-click reassignment.
              </p>
            </div>

            {/* Module 5 */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-emerald-500/60 hover:shadow-xl transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center mb-6 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">Territory & Country Funnels</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Segment student pipelines by territory (India, UAE, UK, Canada, Australia). Track conversion velocity from initial inquiry to tuition token payment by geographic cohort.
              </p>
            </div>

            {/* Module 6 */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-emerald-500/60 hover:shadow-xl transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">Security, RBAC & Audit Trails</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Every action (lead created, status changed, permissions modified, message sent) is recorded in an immutable database audit trail with CSV export and role token guards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. SMART ROUTING ENGINE SECTION
      ───────────────────────────────────────────────────────────── */}
      <section id="routing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
            
            <div className="space-y-6">
              <span className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-widest">
                Intelligent Allocation
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Never Miss a Lead With Automated Round-Robin Routing
              </h2>
              <p className="text-slate-600 text-sm font-medium leading-relaxed">
                When a student sends a WhatsApp message or registers via web forms, WhatsCRM instantly analyzes their territory, program of interest, and counselor availability.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-md">
                    1
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">Territory Rule Matching</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Leads from India are routed to Domestic Counselors, international inquiries to Global Teams.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-md">
                    2
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">Round-Robin Equal Distribution</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Leads are assigned to the counselor who hasn't received an inquiry in the longest time.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-md">
                    3
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">Automated Notification & Assignment</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Counselor gets immediate socket notification and the lead pops up on their active board.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Workflow Diagram */}
            <div className="bg-[#06281E] rounded-3xl p-6 sm:p-8 text-white border border-emerald-800/60 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-emerald-800/60">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-300">Live Routing Protocol</span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">Rule Engine v4.2</span>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-[#093529] border border-emerald-700/50 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-emerald-400 uppercase font-black">Step 1: Incoming WhatsApp Event</div>
                    <div className="text-xs font-bold text-white mt-0.5">+91 98765 43210 (Country: India, Program: MBA)</div>
                  </div>
                  <CheckCircle2 size={18} className="text-emerald-400" />
                </div>

                <div className="p-4 rounded-2xl bg-[#093529] border border-emerald-700/50 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-emerald-400 uppercase font-black">Step 2: Rule Verification</div>
                    <div className="text-xs font-bold text-white mt-0.5">Match: Rule "India MBA Admissions" ➔ Team "General"</div>
                  </div>
                  <CheckCircle2 size={18} className="text-emerald-400" />
                </div>

                <div className="p-4 rounded-2xl bg-[#093529] border border-emerald-700/50 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-emerald-400 uppercase font-black">Step 3: Counselor Assignment</div>
                    <div className="text-xs font-bold text-white mt-0.5">Assigned to: Neha (Active, Oldest Last Assigned)</div>
                  </div>
                  <CheckCircle2 size={18} className="text-emerald-400" />
                </div>

                <div className="p-4 rounded-2xl bg-emerald-500 text-slate-950 font-black text-xs text-center flex items-center justify-center gap-2 shadow-lg">
                  <Zap size={14} className="fill-slate-950" />
                  Total Routing Latency: 42ms • WebSocket Push Completed
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. PRICING SECTION
      ───────────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-24 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-widest border border-emerald-200">
              Transparent Investment
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Simple & Scalable Pricing Plans
            </h2>
            <p className="text-slate-600 text-sm font-medium">
              Start free for 14 days. Scale as your counseling team and inquiry volume grow.
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            {/* Starter Plan */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 flex flex-col justify-between hover:border-emerald-500/50 transition-all shadow-sm">
              <div>
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Campus Starter</span>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">${annualBilling ? '19' : '24'}</span>
                  <span className="text-xs font-bold text-slate-400">/ month</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">Ideal for individual education counselors and single branch teams.</p>

                <div className="mt-6 pt-6 border-t border-slate-200/80 space-y-3 text-xs font-bold text-slate-700">
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> 1 WhatsApp Number Node</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> 1 Counselor Seat</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> 1,000 Active Student Leads</div>
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
                <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">Admissions Growth</span>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">${annualBilling ? '49' : '59'}</span>
                  <span className="text-xs font-bold text-emerald-300">/ month</span>
                </div>
                <p className="text-xs text-emerald-200/80 mt-2">For growing institutions requiring multi-agent assignment & AI bots.</p>

                <div className="mt-6 pt-6 border-t border-emerald-800/80 space-y-3 text-xs font-bold text-emerald-100">
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> 3 WhatsApp Channel Nodes</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> 5 Staff Member Seats</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> Round-Robin Auto Routing</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> 24/7 AI Qualification Bot</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> Call Logs & Follow-up Scheduler</div>
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
            <div className="p-8 rounded-3xl bg-white border border-slate-200 flex flex-col justify-between hover:border-emerald-500/50 transition-all shadow-sm">
              <div>
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Institutional Pro</span>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">${annualBilling ? '99' : '119'}</span>
                  <span className="text-xs font-bold text-slate-400">/ month</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">Multi-campus operations with manager analytics & SLA control.</p>

                <div className="mt-6 pt-6 border-t border-slate-200/80 space-y-3 text-xs font-bold text-slate-700">
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Unlimited WhatsApp Channels</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> 15 Agent Seats</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> SLA Breach Alerts & Manager Funnels</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Bulk Broadcast Template Messaging</div>
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
            <div className="p-8 rounded-3xl bg-white border border-slate-200 flex flex-col justify-between hover:border-emerald-500/50 transition-all shadow-sm">
              <div>
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Enterprise Global</span>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">Custom</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">Tailored deployments, custom ERP integrations & dedicated cloud node.</p>

                <div className="mt-6 pt-6 border-t border-slate-200/80 space-y-3 text-xs font-bold text-slate-700">
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Unlimited Staff Seats</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Custom API Webhooks & ERP Sync</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Dedicated Account Manager</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> 99.99% Uptime SLA Guarantee</div>
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
          8. TESTIMONIALS SECTION
      ───────────────────────────────────────────────────────────── */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-widest">
              Success Stories
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Trusted by Higher Education Admissions Leaders
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  "Our admission conversion rate jumped by 34% within 3 weeks of rolling out WhatsCRM at Study First Info. Round-robin assignment ensured no student inquiry was left waiting."
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs">
                  VS
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900">Vikas Sharma</div>
                  <div className="text-[10px] text-slate-500">Dean of Admissions, EduCorp Inc.</div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  "The shared inbox solved our biggest bottleneck: multiple staff members trying to use Web WhatsApp on phones. Full call logging and notes made handover effortless."
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs">
                  NM
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900">Neha Mehta</div>
                  <div className="text-[10px] text-slate-500">Head of Operations, GlobalConnect</div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  "Super Admin controls and SLA breach alerts keep our counseling team accountable. The AI qualification bot answers FAQs at midnight and saves hundreds of staff hours."
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs">
                  AP
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900">Ankit Patel</div>
                  <div className="text-[10px] text-slate-500">Director, Study First Info Ltd.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          9. FREQUENTLY ASKED QUESTIONS (FAQS TAILORED TO PROJECT)
      ───────────────────────────────────────────────────────────── */}
      <section id="faqs" className="py-20 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-2">
            <span className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-widest">
              Common Inquiries
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4 text-left">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <HelpCircle size={16} className="text-emerald-600" />
                How does Round-Robin lead routing work in this CRM?
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                When a new inquiry arrives via WhatsApp or is manually created by support, the backend checks active counselors in the matched team and assigns the lead to the counselor who has the oldest <code className="bg-slate-100 px-1 py-0.5 rounded text-emerald-700">lastAssignedAt</code> timestamp. This prevents lead hoarding and ensures perfectly balanced workloads.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <HelpCircle size={16} className="text-emerald-600" />
                Can counselors see other counselors' leads?
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                No. The CRM uses strict Data Scoping (RBAC middleware). Sales Counselors only have visibility over leads assigned directly to them (<code className="bg-slate-100 px-1 py-0.5 rounded text-emerald-700">assignedTo: counselor.id</code>). Team Leaders can see their whole team, while Managers and Super Admins have global visibility.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <HelpCircle size={16} className="text-emerald-600" />
                What happens when an inquiry is not responded to within 15 minutes?
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                The SLA Tracking engine flags the lead with an active SLA Warning badge. Both the Team Leader and Manager receive alerts on their SLA Alert dashboard, and Team Leaders can reassign the lead to an available counselor with a single click.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <HelpCircle size={16} className="text-emerald-600" />
                How are WhatsApp channels connected?
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                Institutional Admins can connect official WhatsApp channels directly via QR Code scan or through the Meta Cloud API integration inside the Channel Setup portal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          10. PRE-FOOTER CALL TO ACTION
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-tr from-[#06281E] via-[#0A382B] to-[#041F17] text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <span className="px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-widest border border-emerald-400/30">
            Enterprise Deployment
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Ready to Streamline Admissions & Lead Operations?
          </h2>
          <p className="text-emerald-100/80 text-sm sm:text-base font-medium max-w-xl mx-auto">
            Experience the power of 6 unified role dashboards, round-robin routing, and automated WhatsApp CRM.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={handleCtaClick}
              className="px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/25 flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              Access Unified Portal Gateway
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all"
            >
              Sign In With Role Credentials
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          11. FOOTER (Dark Forest Theme)
      ───────────────────────────────────────────────────────────── */}
      <footer id="security" className="bg-[#03150F] border-t border-[#093226] text-slate-400 py-16 text-xs font-medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-emerald-950/80 text-left">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-20 h-12 flex items-center justify-center shrink-0">
                  <img src={ktLogo} alt="Logo" className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-black tracking-tight text-white leading-none">
                    Whats<span className="text-emerald-400">CRM</span>
                  </span>
                  <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest mt-0.5">
                    Kiaan Tech • WhatsCRM
                  </span>
                </div>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Enterprise WhatsApp CRM platform engineered for education, course counseling, and student admissions operations worldwide.
              </p>
            </div>

            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-wider mb-4">Core Modules</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-emerald-400 transition-colors">Round-Robin Routing</a></li>
                <li><a href="#features" className="hover:text-emerald-400 transition-colors">Call & Notes Logging</a></li>
                <li><a href="#features" className="hover:text-emerald-400 transition-colors">24/7 AI Qualification</a></li>
                <li><a href="#features" className="hover:text-emerald-400 transition-colors">15-Min SLA Alerts</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-wider mb-4">6-Role Hierarchy</h4>
              <ul className="space-y-2">
                <li><Link to="/login" className="hover:text-emerald-400 transition-colors">1. Super Admin (Governance)</Link></li>
                <li><Link to="/login" className="hover:text-emerald-400 transition-colors">2. Institutional Admin (Routing)</Link></li>
                <li><Link to="/login" className="hover:text-emerald-400 transition-colors">3. Manager (Funnels & SLAs)</Link></li>
                <li><Link to="/login" className="hover:text-emerald-400 transition-colors">4. Team Leader (Supervision)</Link></li>
                <li><Link to="/login" className="hover:text-emerald-400 transition-colors">5. Sales Counselor (Pipeline)</Link></li>
                <li><Link to="/login" className="hover:text-emerald-400 transition-colors">6. Customer Support (Intake)</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-wider mb-4">Security & Architecture</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-1.5"><Shield size={12} className="text-emerald-500" /> Data Isolation (RBAC)</li>
                <li className="flex items-center gap-1.5"><Lock size={12} className="text-emerald-500" /> Immutable Audit Trail</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-emerald-500" /> Meta WhatsApp Cloud API</li>
                <li className="flex items-center gap-1.5"><Award size={12} className="text-emerald-500" /> ISO 27001 Standard</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
            <div>© {new Date().getFullYear()} Study First Info Ltd. • WhatsCRM Platform. All rights reserved.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Operations</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Security Architecture</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
