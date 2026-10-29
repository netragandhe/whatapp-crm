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

  // The 6 Exact Dedicated Roles in this Kiaan CRM
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
    <div className="min-h-screen bg-[#F4FBF6] text-[#26382E] font-sans antialiased selection:bg-[#86D9A9] selection:text-[#26382E]">
      {/* ─────────────────────────────────────────────────────────────
          1. NAVIGATION BAR
      ───────────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-[#DDE8E0] transition-all shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-24 h-14 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <img src={ktLogo} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xl font-black tracking-tight text-[#26382E] leading-none">
                Kiaan <span className="text-[#2E8456]">CRM</span>
              </span>
              <span className="text-[10px] font-black tracking-widest text-[#64748B] uppercase mt-1">
                Kiaan Tech • Kiaan CRM
              </span>
            </div>
          </Link>

          {/* Center Links */}
          <div className="hidden lg:flex items-center gap-8 text-xs font-black uppercase tracking-wider text-[#64748B]">
            <a href="#portals" className="hover:text-[#26382E] transition-colors">Portals</a>
            <a href="#features" className="hover:text-[#26382E] transition-colors">Core Modules</a>
            <a href="#routing" className="hover:text-[#26382E] transition-colors">Smart Routing</a>
            <a href="#pricing" className="hover:text-[#26382E] transition-colors">Pricing Plans</a>
            <a href="#faqs" className="hover:text-[#26382E] transition-colors">FAQs</a>
          </div>

          {/* Right CTAs */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <button
                onClick={handleCtaClick}
                className="px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider bg-[#86D9A9] text-[#26382E] hover:bg-[#A7E8C2] transition-all shadow-sm flex items-center gap-2"
              >
                Open Dashboard ({role})
                <ArrowRight size={14} />
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2.5 text-xs font-black uppercase tracking-wider text-[#64748B] hover:text-[#26382E] transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider bg-[#86D9A9] text-[#26382E] hover:bg-[#A7E8C2] transition-all shadow-sm flex items-center gap-2 hover:scale-[1.02] active:scale-95"
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
      <section className="relative pt-12 pb-24 overflow-hidden bg-gradient-to-b from-[#EDF8F0] via-[#F4FBF6] to-[#EDF8F0]">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-tr from-[#86D9A9]/20 via-[#A7E8C2]/15 to-transparent blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#DDE8E0] text-[#26382E] text-[11px] font-black uppercase tracking-wider shadow-sm"
            >
              <GraduationCap className="w-4 h-4 text-[#26382E]" />
              STUDY FIRST INFO LTD. • ENTERPRISE KIAAN CRM
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#26382E] tracking-tight leading-[1.12]"
            >
              Turn Every WhatsApp Inquiry Into a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#26382E] via-[#16A34A] to-[#26382E]">
                Qualified Enrolled Client
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-3xl mx-auto font-medium"
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
                className="px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest bg-[#86D9A9] text-[#26382E] hover:bg-[#A7E8C2] transition-all shadow-sm flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                Access All 6 Portals
                <ArrowRight size={16} />
              </button>
              <a
                href="#portals"
                className="px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest bg-white/90 text-[#26382E] border border-[#DDE8E0] hover:border-[#86D9A9] hover:bg-white transition-all shadow-sm flex items-center gap-2"
              >
                <Layers size={15} className="text-[#26382E]" />
                Explore 6 Role Portals
              </a>
            </motion.div>

            {/* Trust checkmarks */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-6 pt-3 text-[11px] font-bold text-[#64748B]"
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-[#16A34A]" /> 6 Isolated RBAC Dashboards
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-[#16A34A]" /> Round-Robin Auto Lead Routing
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-[#16A34A]" /> Live WebSocket Real-Time Chat
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-[#16A34A]" /> 1-Click Call & Notes Logging
              </span>
            </motion.div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              HERO LIVE MOCKUP: STUDY FIRST INFO KIAAN CRM PREVIEW
          ───────────────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-14 relative max-w-5xl mx-auto"
          >
            {/* Top Floating Badge */}
            <div className="absolute -top-5 right-4 sm:right-10 z-20 bg-white/90 backdrop-blur-md text-[#26382E] font-black text-[10px] uppercase tracking-wider px-4 py-2 rounded-full shadow-sm flex items-center gap-2 border border-[#DDE8E0]">
              <Flame size={14} className="fill-[#16A34A] text-[#16A34A]" />
              10x Faster Inquiries to Admissions
            </div>

            {/* WhatsApp Glowing Badge */}
            <div className="absolute -top-6 left-4 sm:left-10 z-20 bg-[#86D9A9] text-[#26382E] p-3 rounded-2xl shadow-sm flex items-center gap-2 border-2 border-white">
              <MessageSquare size={18} className="fill-[#26382E]/20 text-[#26382E]" />
              <span className="text-xs font-black uppercase tracking-wider">Official WhatsApp Cloud Node Active</span>
            </div>

            {/* Main Mockup Container */}
            <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-3 sm:p-5 shadow-glass border border-[#DDE8E0] overflow-hidden">
              <div className="bg-[#F4FBF6] rounded-[2rem] overflow-hidden border border-[#DDE8E0] grid grid-cols-12 min-h-[500px]">
                
                {/* Mini Left Sidebar */}
                <div className="hidden sm:flex col-span-1 bg-[#EDF8F0] border-r border-[#DDE8E0] flex-col items-center py-6 gap-6">
                  <div className="w-9 h-9 rounded-xl bg-[#86D9A9] flex items-center justify-center text-[#26382E] shadow-sm">
                    <GraduationCap size={18} />
                  </div>
                  <div className="flex flex-col gap-4 text-[#64748B]">
                    <div className="p-2.5 rounded-xl bg-[#DDF7E8] text-[#26382E] shadow-sm border border-[#86D9A9]/40">
                      <MessageSquare size={16} />
                    </div>
                    <div className="p-2.5 hover:text-[#26382E] transition-colors">
                      <Users size={16} />
                    </div>
                    <div className="p-2.5 hover:text-[#26382E] transition-colors">
                      <Zap size={16} />
                    </div>
                    <div className="p-2.5 hover:text-[#26382E] transition-colors">
                      <BarChart3 size={16} />
                    </div>
                  </div>
                </div>

                {/* Middle Chat List (Real Study First Leads) */}
                <div className="col-span-12 sm:col-span-4 bg-white/70 backdrop-blur-md border-r border-[#DDE8E0] p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-[#DDE8E0] mb-3">
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-black uppercase tracking-wider text-[#26382E]">Live Intake Queue</span>
                        <span className="text-[9px] text-[#64748B]">Auto-Routing: Round-Robin</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-[#DDF7E8] text-[#26382E] border border-[#86D9A9]/40 text-[10px] font-bold">18 Active</span>
                    </div>

                    <div className="space-y-2">
                      <div className="p-3 rounded-2xl bg-[#EDF8F0] border border-[#86D9A9]/60 text-left shadow-sm">
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-bold text-[#26382E]">Aarav Sharma</span>
                          <span className="text-[9px] text-[#16A34A] font-bold">1m ago</span>
                        </div>
                        <p className="text-[11px] text-[#64748B] truncate mt-1">"Please share the brochure for MBA in Data Analytics."</p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-[#86D9A9] text-[#26382E] font-black text-[8px] uppercase">Score: 96 🔥</span>
                          <span className="text-[9px] text-[#64748B] font-bold">India • Intake 2026</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-2xl bg-white/80 hover:bg-[#EDF8F0]/50 border border-[#DDE8E0] text-left transition-colors">
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-bold text-[#26382E]">Priya Nair</span>
                          <span className="text-[9px] text-[#64748B]">4m ago</span>
                        </div>
                        <p className="text-[11px] text-[#64748B] truncate mt-1">"Can we schedule a 1-on-1 counseling call for UK visa?"</p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-[#DDF7E8] text-[#26382E] border border-[#DDE8E0] font-bold text-[8px] uppercase">Callback Booked</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-2xl bg-white/80 hover:bg-[#EDF8F0]/50 border border-[#DDE8E0] text-left transition-colors">
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-bold text-[#26382E]">Rohan Mehta</span>
                          <span className="text-[9px] text-[#64748B]">10m ago</span>
                        </div>
                        <p className="text-[11px] text-[#64748B] truncate mt-1">"I have submitted my application fee token receipt."</p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-[#DDF7E8] text-[#26382E] border border-[#DDE8E0] font-bold text-[8px] uppercase">Fee Paid</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-white/80 rounded-2xl border border-[#DDE8E0] text-[10px] text-[#26382E] flex items-center justify-between shadow-sm">
                    <span className="font-bold">⚡ AI Qualification Bot: Online</span>
                    <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-ping" />
                  </div>
                </div>

                {/* Right Chat Conversation View */}
                <div className="col-span-12 sm:col-span-7 bg-[#F4FBF6] p-5 flex flex-col justify-between">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#DDE8E0]">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#86D9A9] flex items-center justify-center font-bold text-[#26382E] text-xs shadow-sm">
                        AS
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-[#26382E] flex items-center gap-1.5">
                          Aarav Sharma
                          <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                        </div>
                        <span className="text-[10px] text-[#64748B]">+91 98765 43210 • Counselor: Senior Counselor Neha</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-[#DDF7E8] border border-[#86D9A9]/40 text-[#26382E] text-[10px] font-bold">
                        Stage: Qualified
                      </span>
                    </div>
                  </div>

                  {/* Message Bubbles */}
                  <div className="py-6 space-y-4 text-left">
                    {/* Student Message */}
                    <div className="flex items-start gap-2 max-w-[80%]">
                      <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-[#DDE8E0] text-[#26382E] text-xs leading-relaxed shadow-sm">
                        Hello Study First Info team! I want to apply for the Autumn 2026 MBA Intake. What are the eligibility criteria and scholarship deadlines?
                        <div className="text-[8px] text-[#64748B] text-right mt-1">11:15 AM</div>
                      </div>
                    </div>

                    {/* AI Smart Response */}
                    <div className="flex items-end justify-end gap-2 ml-auto max-w-[85%]">
                      <div className="bg-[#DDF7E8] p-3.5 rounded-2xl rounded-tr-none text-[#26382E] text-xs leading-relaxed border border-[#86D9A9]/40 shadow-sm">
                        <div className="text-[9px] font-bold text-[#16A34A] mb-1 flex items-center gap-1">
                          <Sparkles size={10} /> Auto-Smart Prospectus Dispatched
                        </div>
                        Hi Aarav! 🎓 Thank you for reaching out to Study First Info. I have shared our 2026 MBA Prospectus and Scholarship Matrix. Early applicant scholarships up to 40% close on Nov 30th. 
                        <br className="my-1"/>
                        Senior Counselor <b>Neha</b> has been assigned to your profile. Would you like a 10-minute briefing call today at 3:00 PM?
                        <div className="text-[8px] text-[#64748B] text-right mt-1">11:15 AM • Delivered ✓✓</div>
                      </div>
                    </div>

                    {/* Student Reply */}
                    <div className="flex items-start gap-2 max-w-[80%]">
                      <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-[#DDE8E0] text-[#26382E] text-xs leading-relaxed shadow-sm">
                        Yes please, 3:00 PM works great! I have my graduation marksheets ready.
                        <div className="text-[8px] text-[#64748B] text-right mt-1">11:17 AM</div>
                      </div>
                    </div>
                  </div>

                  {/* Input Simulation */}
                  <div className="pt-3 border-t border-[#DDE8E0] flex items-center gap-2">
                    <input
                      disabled
                      placeholder="Type counselor reply or trigger WhatsApp template message..."
                      className="flex-1 bg-white border border-[#DDE8E0] rounded-xl px-4 py-2.5 text-xs text-[#26382E] placeholder-[#64748B] outline-none shadow-sm"
                    />
                    <button className="p-2.5 rounded-xl bg-[#86D9A9] text-[#26382E] font-bold hover:bg-[#A7E8C2] transition-colors shadow-sm">
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
          3. STATS & GLOBAL TRUST BANNER (Soft Mint Glassmorphism)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#EDF8F0] border-y border-[#DDE8E0] text-[#26382E] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#DDE8E0] text-[#26382E] text-[10px] font-black uppercase tracking-widest shadow-sm">
              Study First Info Global Impact
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mt-3 tracking-tight text-[#26382E]">
              Enterprise Performance Proven in Daily Admissions
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-md border border-[#DDE8E0] shadow-sm">
              <div className="text-3xl sm:text-4xl font-black text-[#26382E] tracking-tight">12,500+</div>
              <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider mt-2">Active Students Handled</div>
              <p className="text-[11px] text-[#64748B] mt-1">From initial WhatsApp chat to final enrollment</p>
            </div>

            <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-md border border-[#DDE8E0] shadow-sm">
              <div className="text-3xl sm:text-4xl font-black text-[#26382E] tracking-tight">28M+</div>
              <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider mt-2">WhatsApp Messages</div>
              <p className="text-[11px] text-[#64748B] mt-1">99.98% delivery rate via official Cloud API</p>
            </div>

            <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-md border border-[#DDE8E0] shadow-sm">
              <div className="text-3xl sm:text-4xl font-black text-[#26382E] tracking-tight">98.4%</div>
              <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider mt-2">SLA Compliance</div>
              <p className="text-[11px] text-[#64748B] mt-1">Sub-15 minute response time guarantee</p>
            </div>

            <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-md border border-[#DDE8E0] shadow-sm">
              <div className="text-3xl sm:text-4xl font-black text-[#26382E] tracking-tight">50+</div>
              <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider mt-2">Countries Covered</div>
              <p className="text-[11px] text-[#64748B] mt-1">India, UK, UAE, USA, Canada, Australia cohorts</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. THE 6 DEDICATED ROLE PORTALS (CORE PROJECT ARCHITECTURE)
      ───────────────────────────────────────────────────────────── */}
      <section id="portals" className="py-24 bg-[#F4FBF6] scroll-mt-20 relative">
        <span id="roles" className="absolute -top-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="px-4 py-1.5 rounded-full bg-white/80 border border-[#DDE8E0] text-[#26382E] text-xs font-black uppercase tracking-widest shadow-sm">
              Role-Based Access Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#26382E] tracking-tight">
              6 Tailored Dashboards for Every Member of Your Organization
            </h2>
            <p className="text-[#64748B] text-sm font-medium">
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
                      ? 'bg-[#86D9A9] text-[#26382E] shadow-sm scale-105 border border-[#86D9A9]'
                      : 'bg-white/80 text-[#64748B] hover:bg-white hover:text-[#26382E] border border-[#DDE8E0]'
                  }`}
                >
                  <r.icon size={15} />
                  {r.roleKey}
                </button>
              ))}
            </div>
          </div>

          {/* Active Role Feature Display Card */}
          <div className="bg-white/85 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-12 text-[#26382E] border border-[#DDE8E0] shadow-glass relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 text-left">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3.5 rounded-2xl bg-[#DDF7E8] text-[#26382E] border border-[#86D9A9]/40 shadow-sm">
                    <activeRole.icon size={26} />
                  </div>
                  <div>
                    <span className="px-3 py-1 rounded-full bg-[#EDF8F0] text-[#26382E] text-[10px] font-black uppercase tracking-widest border border-[#DDE8E0]">
                      {activeRole.badge}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#26382E] tracking-tight mt-1">
                      {activeRole.title}
                    </h3>
                  </div>
                </div>

                <p className="text-[#64748B] text-sm font-medium leading-relaxed">
                  {activeRole.description}
                </p>

                <div className="space-y-3 pt-2">
                  {activeRole.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#DDF7E8] text-[#26382E] flex items-center justify-center shrink-0 mt-0.5 border border-[#86D9A9]/40">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className="text-xs text-[#26382E] font-medium leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => navigate('/login')}
                    className="px-6 py-3.5 rounded-full text-xs font-black uppercase tracking-wider bg-[#86D9A9] text-[#26382E] hover:bg-[#A7E8C2] transition-all shadow-sm flex items-center gap-2 hover:scale-105 active:scale-95"
                  >
                    Open {activeRole.roleKey} Portal
                    <ArrowRight size={14} />
                  </button>
                  <span className="text-xs font-bold text-[#16A34A] flex items-center gap-1.5">
                    <Zap size={14} />
                    {activeRole.metrics.secondary}
                  </span>
                </div>
              </div>

              {/* Right Mock Representation */}
              <div className="lg:col-span-5 bg-[#EDF8F0] rounded-3xl p-6 border border-[#DDE8E0] shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#DDE8E0]">
                  <span className="text-xs font-black uppercase tracking-wider text-[#26382E]">Live Workspace Status</span>
                  <span className="text-[10px] font-mono text-[#26382E] bg-white px-2 py-0.5 rounded border border-[#DDE8E0]">
                    {activeRole.path}
                  </span>
                </div>

                <div className="space-y-2.5 text-xs text-[#26382E] font-medium">
                  <div className="p-3.5 rounded-xl bg-white border border-[#DDE8E0] flex justify-between items-center shadow-sm">
                    <span className="text-[#64748B]">Primary Benchmark</span>
                    <span className="text-[#26382E] font-black text-sm">{activeRole.metrics.primary}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-[#DDE8E0] flex justify-between items-center shadow-sm">
                    <span className="text-[#64748B]">Security & RBAC Scope</span>
                    <span className="text-[#26382E] font-bold">Strict User Isolation</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-[#DDE8E0] flex justify-between items-center shadow-sm">
                    <span className="text-[#64748B]">Real-time Sockets</span>
                    <span className="text-[#16A34A] font-bold">Active ✓</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#DDE8E0] text-[11px] text-[#64748B] text-left font-medium shadow-sm">
                  <div className="text-[9px] uppercase font-black text-[#26382E] mb-1">Recent Audit Action:</div>
                  "{activeRole.sampleActivity}"
                </div>

                <div className="p-2.5 rounded-xl bg-[#DDF7E8] border border-[#86D9A9]/40 text-[10px] text-[#26382E] text-center font-bold">
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
            <span className="px-4 py-1.5 rounded-full bg-white/80 border border-[#DDE8E0] text-[#26382E] text-xs font-black uppercase tracking-widest shadow-sm">
              Built For Admissions & Sales
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#26382E] tracking-tight">
              Enterprise Features Built Right In
            </h2>
            <p className="text-[#64748B] text-sm font-medium">
              Every tool your counselors and supervisors need to manage high inquiry volumes with zero friction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {/* Module 1 */}
            <div className="p-8 rounded-3xl bg-white/80 backdrop-blur-md border border-[#DDE8E0] hover:border-[#86D9A9] hover:shadow-glass transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-[#EDF8F0] text-[#26382E] flex items-center justify-center mb-6 group-hover:bg-[#86D9A9] transition-colors border border-[#DDE8E0]">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#26382E] mb-2">Round-Robin Lead Routing</h3>
              <p className="text-xs text-[#64748B] leading-relaxed font-medium">
                Automatic equal distribution of incoming inquiries among active counselors based on <code className="bg-[#EDF8F0] px-1 py-0.5 rounded text-[#26382E]">lastAssignedAt</code> timestamps. Eliminates lead hoarding and ensures immediate engagement.
              </p>
            </div>

            {/* Module 2 */}
            <div className="p-8 rounded-3xl bg-white/80 backdrop-blur-md border border-[#DDE8E0] hover:border-[#86D9A9] hover:shadow-glass transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-[#EDF8F0] text-[#26382E] flex items-center justify-center mb-6 group-hover:bg-[#86D9A9] transition-colors border border-[#DDE8E0]">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#26382E] mb-2">1-Click Call & Notes Logging</h3>
              <p className="text-xs text-[#64748B] leading-relaxed font-medium">
                Counselors log call durations, select call outcomes (Interested, Callback Scheduled, Token Paid, Dropped), and set next follow-up dates directly in student profiles.
              </p>
            </div>

            {/* Module 3 */}
            <div className="p-8 rounded-3xl bg-white/80 backdrop-blur-md border border-[#DDE8E0] hover:border-[#86D9A9] hover:shadow-glass transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-[#EDF8F0] text-[#26382E] flex items-center justify-center mb-6 group-hover:bg-[#86D9A9] transition-colors border border-[#DDE8E0]">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#26382E] mb-2">AI Qualification Engine</h3>
              <p className="text-xs text-[#64748B] leading-relaxed font-medium">
                24/7 AI bot automatically asks qualifying questions (budget, desired intake year, program) and assigns an automated Lead Score (0–100) before human rep assignment.
              </p>
            </div>

            {/* Module 4 */}
            <div className="p-8 rounded-3xl bg-white/80 backdrop-blur-md border border-[#DDE8E0] hover:border-[#86D9A9] hover:shadow-glass transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-[#EDF8F0] text-[#26382E] flex items-center justify-center mb-6 group-hover:bg-[#86D9A9] transition-colors border border-[#DDE8E0]">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#26382E] mb-2">15-Min SLA Breach Alerts</h3>
              <p className="text-xs text-[#64748B] leading-relaxed font-medium">
                Strict response time monitoring. If an incoming WhatsApp lead is not answered within target window, automated SLA Warning flags notify Team Leaders for 1-click reassignment.
              </p>
            </div>

            {/* Module 5 */}
            <div className="p-8 rounded-3xl bg-white/80 backdrop-blur-md border border-[#DDE8E0] hover:border-[#86D9A9] hover:shadow-glass transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-[#EDF8F0] text-[#26382E] flex items-center justify-center mb-6 group-hover:bg-[#86D9A9] transition-colors border border-[#DDE8E0]">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#26382E] mb-2">Territory & Country Funnels</h3>
              <p className="text-xs text-[#64748B] leading-relaxed font-medium">
                Segment student pipelines by territory (India, UAE, UK, Canada, Australia). Track conversion velocity from initial inquiry to tuition token payment by geographic cohort.
              </p>
            </div>

            {/* Module 6 */}
            <div className="p-8 rounded-3xl bg-white/80 backdrop-blur-md border border-[#DDE8E0] hover:border-[#86D9A9] hover:shadow-glass transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-[#EDF8F0] text-[#26382E] flex items-center justify-center mb-6 group-hover:bg-[#86D9A9] transition-colors border border-[#DDE8E0]">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#26382E] mb-2">Security, RBAC & Audit Trails</h3>
              <p className="text-xs text-[#64748B] leading-relaxed font-medium">
                Every action (lead created, status changed, permissions modified, message sent) is recorded in an immutable database audit trail with CSV export and role token guards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. SMART ROUTING ENGINE SECTION
      ───────────────────────────────────────────────────────────── */}
      <section id="routing" className="py-20 bg-[#EDF8F0]/50 border-t border-[#DDE8E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
            
            <div className="space-y-6">
              <span className="px-4 py-1.5 rounded-full bg-white/80 border border-[#DDE8E0] text-[#26382E] text-xs font-black uppercase tracking-widest shadow-sm">
                Intelligent Allocation
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#26382E] tracking-tight leading-tight">
                Never Miss a Lead With Automated Round-Robin Routing
              </h2>
              <p className="text-[#64748B] text-sm font-medium leading-relaxed">
                When a student sends a WhatsApp message or registers via web forms, Kiaan CRM instantly analyzes their territory, program of interest, and counselor availability.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-2xl bg-white/80 border border-[#DDE8E0] flex items-start gap-4 shadow-sm">
                  <div className="w-8 h-8 rounded-xl bg-[#86D9A9] text-[#26382E] flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                    1
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase text-[#26382E] tracking-wider">Territory Rule Matching</h4>
                    <p className="text-xs text-[#64748B] mt-0.5">Leads from India are routed to Domestic Counselors, international inquiries to Global Teams.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/80 border border-[#DDE8E0] flex items-start gap-4 shadow-sm">
                  <div className="w-8 h-8 rounded-xl bg-[#86D9A9] text-[#26382E] flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                    2
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase text-[#26382E] tracking-wider">Round-Robin Equal Distribution</h4>
                    <p className="text-xs text-[#64748B] mt-0.5">Leads are assigned to the counselor who hasn't received an inquiry in the longest time.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/80 border border-[#DDE8E0] flex items-start gap-4 shadow-sm">
                  <div className="w-8 h-8 rounded-xl bg-[#86D9A9] text-[#26382E] flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                    3
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase text-[#26382E] tracking-wider">Automated Notification & Assignment</h4>
                    <p className="text-xs text-[#64748B] mt-0.5">Counselor gets immediate socket notification and the lead pops up on their active board.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Workflow Diagram */}
            <div className="bg-white/85 backdrop-blur-xl rounded-3xl p-6 sm:p-8 text-[#26382E] border border-[#DDE8E0] shadow-glass space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-[#DDE8E0]">
                <span className="text-xs font-black uppercase tracking-wider text-[#26382E]">Live Routing Protocol</span>
                <span className="px-3 py-1 rounded-full bg-[#DDF7E8] text-[#26382E] border border-[#86D9A9]/40 text-[10px] font-bold">Rule Engine v4.2</span>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-[#EDF8F0] border border-[#DDE8E0] flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-[#16A34A] uppercase font-black">Step 1: Incoming WhatsApp Event</div>
                    <div className="text-xs font-bold text-[#26382E] mt-0.5">+91 98765 43210 (Country: India, Program: MBA)</div>
                  </div>
                  <CheckCircle2 size={18} className="text-[#16A34A]" />
                </div>

                <div className="p-4 rounded-2xl bg-[#EDF8F0] border border-[#DDE8E0] flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-[#16A34A] uppercase font-black">Step 2: Rule Verification</div>
                    <div className="text-xs font-bold text-[#26382E] mt-0.5">Match: Rule "India MBA Admissions" ➔ Team "General"</div>
                  </div>
                  <CheckCircle2 size={18} className="text-[#16A34A]" />
                </div>

                <div className="p-4 rounded-2xl bg-[#EDF8F0] border border-[#DDE8E0] flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-[#16A34A] uppercase font-black">Step 3: Counselor Assignment</div>
                    <div className="text-xs font-bold text-[#26382E] mt-0.5">Assigned to: Neha (Active, Oldest Last Assigned)</div>
                  </div>
                  <CheckCircle2 size={18} className="text-[#16A34A]" />
                </div>

                <div className="p-4 rounded-2xl bg-[#86D9A9] text-[#26382E] font-black text-xs text-center flex items-center justify-center gap-2 shadow-sm">
                  <Zap size={14} className="fill-[#26382E]" />
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
            <div className="p-8 rounded-3xl bg-gradient-to-b from-[#EDF8F0] via-white to-white text-[#26382E] border-2 border-[#86D9A9] relative flex flex-col justify-between shadow-glass scale-105 z-10">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#86D9A9] text-[#26382E] font-black text-[9px] uppercase tracking-widest shadow-sm border border-white">
                ★ Most Popular
              </div>

              <div>
                <span className="text-xs font-black text-[#26382E] uppercase tracking-widest">Admissions Growth</span>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[#26382E]">${annualBilling ? '49' : '59'}</span>
                  <span className="text-xs font-bold text-[#64748B]">/ month</span>
                </div>
                <p className="text-xs text-[#64748B] mt-2">For growing institutions requiring multi-agent assignment & AI bots.</p>

                <div className="mt-6 pt-6 border-t border-[#DDE8E0] space-y-3 text-xs font-bold text-[#26382E]">
                  <div className="flex items-center gap-2"><Check size={14} className="text-[#16A34A]" /> 3 WhatsApp Channel Nodes</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-[#16A34A]" /> 5 Staff Member Seats</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-[#16A34A]" /> Round-Robin Auto Routing</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-[#16A34A]" /> 24/7 AI Qualification Bot</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-[#16A34A]" /> Call Logs & Follow-up Scheduler</div>
                </div>
              </div>

              <button
                onClick={handleCtaClick}
                className="w-full mt-8 py-3.5 rounded-full font-black text-xs uppercase tracking-wider bg-[#86D9A9] text-[#26382E] hover:bg-[#A7E8C2] transition-all shadow-sm"
              >
                Start 14-Day Free Trial
              </button>
            </div>

            {/* Professional Plan */}
            <div className="p-8 rounded-3xl bg-white/80 border border-[#DDE8E0] flex flex-col justify-between hover:border-[#86D9A9] transition-all shadow-sm">
              <div>
                <span className="text-xs font-black text-[#64748B] uppercase tracking-widest">Institutional Pro</span>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[#26382E]">${annualBilling ? '99' : '119'}</span>
                  <span className="text-xs font-bold text-[#64748B]">/ month</span>
                </div>
                <p className="text-xs text-[#64748B] mt-2">Multi-campus operations with manager analytics & SLA control.</p>

                <div className="mt-6 pt-6 border-t border-[#DDE8E0] space-y-3 text-xs font-bold text-[#26382E]">
                  <div className="flex items-center gap-2"><Check size={14} className="text-[#16A34A]" /> Unlimited WhatsApp Channels</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-[#16A34A]" /> 15 Agent Seats</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-[#16A34A]" /> SLA Breach Alerts & Manager Funnels</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-[#16A34A]" /> Bulk Broadcast Template Messaging</div>
                </div>
              </div>

              <button
                onClick={handleCtaClick}
                className="w-full mt-8 py-3 rounded-full font-black text-xs uppercase tracking-wider bg-[#26382E] text-white hover:bg-black transition-all shadow-sm"
              >
                Get Started
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="p-8 rounded-3xl bg-white/80 border border-[#DDE8E0] flex flex-col justify-between hover:border-[#86D9A9] transition-all shadow-sm">
              <div>
                <span className="text-xs font-black text-[#64748B] uppercase tracking-widest">Enterprise Global</span>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[#26382E]">Custom</span>
                </div>
                <p className="text-xs text-[#64748B] mt-2">Tailored deployments, custom ERP integrations & dedicated cloud node.</p>

                <div className="mt-6 pt-6 border-t border-[#DDE8E0] space-y-3 text-xs font-bold text-[#26382E]">
                  <div className="flex items-center gap-2"><Check size={14} className="text-[#16A34A]" /> Unlimited Staff Seats</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-[#16A34A]" /> Custom API Webhooks & ERP Sync</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-[#16A34A]" /> Dedicated Account Manager</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-[#16A34A]" /> 99.99% Uptime SLA Guarantee</div>
                </div>
              </div>

              <button
                onClick={handleCtaClick}
                className="w-full mt-8 py-3 rounded-full font-black text-xs uppercase tracking-wider border border-[#DDE8E0] text-[#26382E] hover:border-[#86D9A9] hover:bg-[#EDF8F0] transition-all"
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
                  "Our admission conversion rate jumped by 34% within 3 weeks of rolling out Kiaan CRM at Study First Info. Round-robin assignment ensured no student inquiry was left waiting."
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
      {/* ─────────────────────────────────────────────────────────────
          10. PRE-FOOTER CALL TO ACTION (Soft Mint Theme)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-b from-[#EDF8F0] via-[#DDF7E8] to-[#EDF8F0] text-[#26382E] text-center relative overflow-hidden border-t border-[#DDE8E0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <span className="px-4 py-1.5 rounded-full bg-white/80 border border-[#DDE8E0] text-[#26382E] text-xs font-black uppercase tracking-widest shadow-sm">
            Enterprise Deployment
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-[#26382E]">
            Ready to Streamline Admissions & Lead Operations?
          </h2>
          <p className="text-[#64748B] text-sm sm:text-base font-medium max-w-xl mx-auto">
            Experience the power of 6 unified role dashboards, round-robin routing, and automated Kiaan CRM.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={handleCtaClick}
              className="px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest bg-[#86D9A9] text-[#26382E] hover:bg-[#A7E8C2] transition-all shadow-sm flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              Access Unified Portal Gateway
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest bg-white/80 hover:bg-white border border-[#DDE8E0] text-[#26382E] transition-all shadow-sm"
            >
              Sign In With Role Credentials
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          11. FOOTER (Soft Mint Glass Theme)
      ───────────────────────────────────────────────────────────── */}
      <footer id="security" className="bg-white/80 backdrop-blur-xl border-t border-[#DDE8E0] text-[#64748B] py-16 text-xs font-medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-[#DDE8E0] text-left">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 flex items-center justify-center shrink-0">
                  <img src={ktLogo} alt="Logo" className="w-full h-full object-contain filter drop-shadow-sm" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-black tracking-tight text-[#26382E] leading-none">
                    Kiaan <span className="text-[#2E8456]">CRM</span>
                  </span>
                  <span className="text-[9px] font-bold text-[#64748B] uppercase tracking-widest mt-0.5">
                    Kiaan Tech • Kiaan CRM
                  </span>
                </div>
              </div>
              <p className="text-[#64748B] text-xs leading-relaxed">
                Enterprise Kiaan CRM platform engineered for education, course counseling, and student admissions operations worldwide.
              </p>
            </div>

            <div>
              <h4 className="text-[#26382E] font-black text-xs uppercase tracking-wider mb-4">Core Modules</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-[#26382E] transition-colors">Round-Robin Routing</a></li>
                <li><a href="#features" className="hover:text-[#26382E] transition-colors">Call & Notes Logging</a></li>
                <li><a href="#features" className="hover:text-[#26382E] transition-colors">24/7 AI Qualification</a></li>
                <li><a href="#features" className="hover:text-[#26382E] transition-colors">15-Min SLA Alerts</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[#26382E] font-black text-xs uppercase tracking-wider mb-4">6-Role Hierarchy</h4>
              <ul className="space-y-2">
                <li><Link to="/login" className="hover:text-[#26382E] transition-colors">1. Super Admin (Governance)</Link></li>
                <li><Link to="/login" className="hover:text-[#26382E] transition-colors">2. Institutional Admin (Routing)</Link></li>
                <li><Link to="/login" className="hover:text-[#26382E] transition-colors">3. Manager (Funnels & SLAs)</Link></li>
                <li><Link to="/login" className="hover:text-[#26382E] transition-colors">4. Team Leader (Supervision)</Link></li>
                <li><Link to="/login" className="hover:text-[#26382E] transition-colors">5. Sales Counselor (Pipeline)</Link></li>
                <li><Link to="/login" className="hover:text-[#26382E] transition-colors">6. Customer Support (Intake)</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[#26382E] font-black text-xs uppercase tracking-wider mb-4">Security & Architecture</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-1.5"><Shield size={12} className="text-[#16A34A]" /> Data Isolation (RBAC)</li>
                <li className="flex items-center gap-1.5"><Lock size={12} className="text-[#16A34A]" /> Immutable Audit Trail</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-[#16A34A]" /> Meta WhatsApp Cloud API</li>
                <li className="flex items-center gap-1.5"><Award size={12} className="text-[#16A34A]" /> ISO 27001 Standard</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#64748B]">
            <div>© {new Date().getFullYear()} Study First Info Ltd. • Kiaan CRM Platform. All rights reserved.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#26382E] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#26382E] transition-colors">Terms of Operations</a>
              <a href="#" className="hover:text-[#26382E] transition-colors">Security Architecture</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
