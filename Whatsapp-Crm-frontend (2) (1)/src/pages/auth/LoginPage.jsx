import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ShieldCheck,
    Mail,
    Lock,
    ArrowRight,
    Building2,
    Globe,
    Users,
    Headphones,
    BrainCircuit,
    Zap,
    Loader2,
    MessageSquare,
    Sparkles,
    CheckCircle2,
    Check,
    Eye,
    EyeOff,
    Flame,
    Shield,
    Award
} from 'lucide-react'
import { cn } from '../../lib/utils'
import api from '../../services/api'
import useAppStore, { ROLE_MAP } from '../../store/useStore'
import { useNavigate, Link } from 'react-router-dom'

const roleHomePages = {
    'Super Admin': '/super-admin',
    'Admin': '/admin',
    'Manager': '/manager',
    'Team Leader': '/team-leader',
    'Counselor': '/counselor',
    'Customer Support': '/support',
}

const RoleCard = ({ role, label, dashboardName, icon: Icon, active, onClick }) => (
    <button
        type="button"
        onClick={onClick}
        className={cn(
            "relative flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all duration-200 group overflow-hidden",
            active
                ? "bg-emerald-50/90 border-2 border-emerald-600 text-emerald-950 shadow-md shadow-emerald-600/10 ring-2 ring-emerald-500/20 scale-[1.02]"
                : "bg-slate-50/80 border-slate-200/90 hover:bg-emerald-50/40 hover:border-emerald-300 text-slate-700 hover:text-emerald-800"
        )}
    >
        {active && (
            <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                <Check size={10} strokeWidth={4} />
            </div>
        )}

        <div className={cn(
            "p-2 rounded-xl mb-1.5 transition-all",
            active
                ? "bg-emerald-600 text-white shadow-xs"
                : "bg-white text-slate-600 border border-slate-200 group-hover:bg-emerald-100/70 group-hover:text-emerald-700 group-hover:border-emerald-200"
        )}>
            <Icon size={18} />
        </div>

        <span className={cn(
            "text-[11px] font-black uppercase tracking-wider leading-tight",
            active ? "text-emerald-950" : "text-slate-800"
        )}>
            {label}
        </span>
        <span className={cn(
            "text-[9px] font-semibold mt-0.5 leading-tight truncate max-w-full",
            active ? "text-emerald-700" : "text-slate-400 group-hover:text-emerald-600"
        )}>
            {dashboardName}
        </span>
    </button>
)

const LoginPage = () => {
    const { login } = useAppStore()
    const navigate = useNavigate()
    const [selectedRole, setSelectedRole] = useState('Super Admin')
    const [email, setEmail] = useState('super.admin@crm.com')
    const [password, setPassword] = useState('password123')
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const roles = [
        { 
            id: 'Super Admin', 
            label: 'Super Admin', 
            dashboardName: 'System Governance',
            icon: ShieldCheck, 
            email: 'super.admin@crm.com' 
        },
        { 
            id: 'Admin', 
            label: 'Admin', 
            dashboardName: 'Channel & Routing',
            icon: Building2, 
            email: 'admin@edu-corp.com' 
        },
        { 
            id: 'Manager', 
            label: 'Manager', 
            dashboardName: 'Funnels & SLAs',
            icon: Globe, 
            email: 'manager@analytics.crm' 
        },
        { 
            id: 'Team Leader', 
            label: 'Team Leader', 
            dashboardName: 'Team Inbox & Leads',
            icon: BrainCircuit, 
            email: 'leader@teams.crm' 
        },
        { 
            id: 'Counselor', 
            label: 'Counselor', 
            dashboardName: 'Sales & Chats',
            icon: Users, 
            email: 'counselor@sales.crm' 
        },
        { 
            id: 'Customer Support', 
            label: 'Support', 
            dashboardName: 'Queue & Intake',
            icon: Headphones, 
            email: 'support@help.crm' 
        },
    ]

    const handleRoleSelect = (role) => {
        setSelectedRole(role.id)
        setEmail(role.email)
        setPassword('password123')
        setError('')
    }

    const handleSubmit = async (e, customEmail = null, customPassword = null) => {
        if (e && e.preventDefault) e.preventDefault()
        setIsLoading(true)
        setError('')
        try {
            const loginEmail = (customEmail || email || 'super.admin@crm.com').trim().toLowerCase()
            const loginPassword = customPassword || password || 'password123'

            const response = await api.post('/auth/login', { 
                email: loginEmail, 
                password: loginPassword 
            })

            if (response && response.success) {
                const { token, refreshToken, user } = response.data || response
                
                // Save JWT tokens for future requests
                localStorage.setItem('token', token)
                if (refreshToken) localStorage.setItem('refreshToken', refreshToken)
                
                // Save FULL user object and role
                localStorage.setItem('user', JSON.stringify(user))
                
                // Map backend role enum to frontend display role
                const frontendRole = ROLE_MAP[user.role] || user.role
                localStorage.setItem('role', frontendRole)

                // Update Zustand store
                login(frontendRole, user)

                const homePath = roleHomePages[frontendRole] || '/super-admin'
                navigate(homePath, { replace: true })
            } else {
                setError(response?.message || 'Login failed. Please verify credentials.')
            }
        } catch (err) {
            console.error('[Login Error]', err)
            const msg = err.response?.data?.message || err.message || 'Login failed. Please verify credentials.'
            setError(msg)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased selection:bg-emerald-500 selection:text-white flex flex-col justify-between">
            {/* ─────────────────────────────────────────────────────────────
                1. TOP NAVIGATION (Matches LandingPage header)
            ───────────────────────────────────────────────────────────── */}
            <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    {/* Brand Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-16 h-11 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <img src="/logo.png?v=5" alt="Logo" className="w-full h-full object-contain filter drop-shadow-sm" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-black tracking-tight text-slate-900 leading-none">
                                Whats<span className="text-emerald-600">CRM</span>
                            </span>
                            <span className="text-[10px] font-black tracking-widest text-emerald-700 uppercase mt-0.5">
                                Kiaan Tech • WhatsCRM
                            </span>
                        </div>
                    </Link>

                    {/* Right Navigation Links */}
                    <div className="flex items-center gap-3">
                        <Link
                            to="/"
                            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-600 hover:text-emerald-600 transition-colors"
                        >
                            <ArrowRight className="rotate-180" size={14} />
                            Home
                        </Link>
                        <span className="hidden sm:block text-slate-300">|</span>
                        <span className="text-xs text-slate-500 font-medium hidden md:inline">
                            Don't have an account?
                        </span>
                        <Link
                            to="/signup"
                            className="px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20 flex items-center gap-2 hover:scale-[1.02]"
                        >
                            Sign Up Free
                            <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </header>

            {/* ─────────────────────────────────────────────────────────────
                2. MAIN SPLIT-SCREEN AUTHENTICATION LAYOUT
            ───────────────────────────────────────────────────────────── */}
            <main className="flex-1 relative py-10 sm:py-14 overflow-hidden bg-gradient-to-b from-emerald-50/40 via-white to-slate-50">
                {/* Decorative background glow (Identical to LandingPage hero glow) */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-emerald-400/15 via-teal-300/10 to-transparent blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
                        
                        {/* ─────────────────────────────────────────────────────────
                            LEFT SHOWCASE PANEL (Deep Forest Green Theme)
                        ───────────────────────────────────────────────────────── */}
                        <div className="hidden lg:flex lg:col-span-5 rounded-[2.5rem] bg-[#06281E] border border-[#0E4435] text-white p-8 xl:p-10 flex-col justify-between shadow-2xl relative overflow-hidden">
                            {/* Subtle radial dot grid */}
                            <div className="absolute inset-0 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none" />

                            <div className="relative z-10 space-y-6">
                                {/* Top Pill Badge */}
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/60 border border-emerald-700/60 text-emerald-300 text-[10px] font-black uppercase tracking-widest shadow-sm">
                                    <Sparkles className="w-3 h-3 text-emerald-400" />
                                    #1 AI-Powered WhatsApp CRM
                                </div>

                                <div className="space-y-3">
                                    <h1 className="text-3xl xl:text-4xl font-black text-white tracking-tight leading-snug">
                                        Turn Conversations Into{' '}
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-300">
                                            Real Customers
                                        </span>
                                    </h1>
                                    <p className="text-xs xl:text-sm text-emerald-100/70 font-medium leading-relaxed">
                                        Access unified dashboards for Super Admin, Manager, Team Leader, Counselor, and Customer Support.
                                    </p>
                                </div>

                                {/* Mini Live Conversation Card Preview (Matching LandingPage Hero Mockup) */}
                                <div className="bg-[#0A3026] rounded-2xl border border-emerald-800/60 p-4 space-y-3 shadow-lg">
                                    <div className="flex items-center justify-between pb-2.5 border-b border-emerald-900/70">
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-slate-950 text-[10px]">
                                                AS
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-white flex items-center gap-1">
                                                    Aditi Sharma
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                                </div>
                                                <div className="text-[9px] text-emerald-400/70">+91 98765 43210</div>
                                            </div>
                                        </div>
                                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-black uppercase">
                                            Lead Score: 94 🔥
                                        </span>
                                    </div>

                                    <div className="space-y-2 text-[11px] leading-relaxed">
                                        <div className="bg-[#124C3D] p-2.5 rounded-xl rounded-tl-none text-emerald-100 border border-emerald-700/40">
                                            "Could you share the admission prospectus & scholarship details?"
                                        </div>
                                        <div className="bg-[#059669] p-2.5 rounded-xl rounded-tr-none text-white ml-auto max-w-[90%] shadow-md">
                                            <div className="text-[8px] font-bold text-emerald-200 mb-0.5 flex items-center gap-1">
                                                <Sparkles size={8} /> Auto-Smart Prospectus Dispatched
                                            </div>
                                            "Hi Aditi! 👋 I've attached our 2026 Prospectus. Up to 40% Merit Scholarships are available."
                                        </div>
                                    </div>

                                    <div className="pt-2 border-t border-emerald-900/70 flex items-center justify-between text-[10px] text-emerald-300">
                                        <span>⚡ AI Auto-Responder: Active</span>
                                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                                    </div>
                                </div>

                                {/* Trust Metrics Grid */}
                                <div className="grid grid-cols-2 gap-3 pt-2">
                                    <div className="p-3 rounded-2xl bg-[#093529] border border-emerald-800/40">
                                        <div className="text-xl font-black text-emerald-400">12,500+</div>
                                        <div className="text-[10px] font-bold text-emerald-200/80 uppercase tracking-wider">Active Agents</div>
                                    </div>
                                    <div className="p-3 rounded-2xl bg-[#093529] border border-emerald-800/40">
                                        <div className="text-xl font-black text-emerald-400">98.4%</div>
                                        <div className="text-[10px] font-bold text-emerald-200/80 uppercase tracking-wider">CSAT Satisfaction</div>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Security Trust */}
                            <div className="relative z-10 pt-6 border-t border-emerald-900/60 flex items-center justify-between text-[10px] text-emerald-300/70 font-semibold">
                                <span className="flex items-center gap-1.5">
                                    <Shield size={12} className="text-emerald-400" /> Role-Based Access (RBAC)
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Award size={12} className="text-emerald-400" /> Official Cloud API
                                </span>
                            </div>
                        </div>

                        {/* ─────────────────────────────────────────────────────────
                            RIGHT FORM PANEL (Clean, Modern, Light Theme Card)
                        ───────────────────────────────────────────────────────── */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="lg:col-span-7 bg-white rounded-[2.5rem] border border-slate-200/80 p-6 sm:p-10 shadow-xl shadow-slate-200/40 flex flex-col justify-between"
                        >
                            <div>
                                {/* Header */}
                                <div className="space-y-2 mb-6 text-center sm:text-left">
                                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[10px] font-black uppercase tracking-wider">
                                        <Sparkles size={11} className="text-emerald-600" />
                                        Secure Authentication Portal
                                    </div>
                                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                                        Sign In to Your Workspace
                                    </h2>
                                    <p className="text-xs text-slate-500 font-medium">
                                        Select your role to load demo credentials, or enter your work email and password.
                                    </p>
                                </div>

                                {/* Error Banner */}
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mb-5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-xs"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
                                        <span>{error}</span>
                                    </motion.div>
                                )}

                                {/* Role Selector Grid: All 6 Dashboards */}
                                <div className="space-y-2.5 mb-5">
                                    <div className="flex items-center justify-between">
                                        <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                                            Select Identity Role
                                        </label>
                                        <span className="text-[10px] font-bold text-emerald-600">
                                            Auto-loads demo account
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
                                        {roles.map(role => (
                                            <RoleCard
                                                key={role.id}
                                                role={role.id}
                                                label={role.label}
                                                dashboardName={role.dashboardName}
                                                icon={role.icon}
                                                active={selectedRole === role.id}
                                                onClick={() => handleRoleSelect(role)}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Active Destination & 1-Click Fast Login Banner */}
                                <div className="mb-5 p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                                    <div className="flex items-center gap-2 text-emerald-900">
                                        <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                                        <span className="font-medium text-[11px]">
                                            Target: <b className="text-emerald-700">{roleHomePages[selectedRole]}</b>
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleSubmit(null, email, 'password123')}
                                        className="text-[10px] font-black text-white bg-emerald-600 hover:bg-emerald-700 px-3.5 py-1.5 rounded-full uppercase tracking-wider transition-all shadow-xs flex items-center gap-1 hover:scale-105 active:scale-95"
                                    >
                                        ⚡ 1-Click Fast Login
                                    </button>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* Email */}
                                    <div className="space-y-1 text-left">
                                        <label className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                                            Work Email Address
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={16} />
                                            <input
                                                type="email"
                                                name="email"
                                                autoComplete="username"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-11 pr-4 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                                                placeholder="user@crm.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div className="space-y-1 text-left">
                                        <div className="flex items-center justify-between">
                                            <label className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                                                Password
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => setPassword('password123')}
                                                className="text-[10px] font-bold text-emerald-600 hover:underline"
                                            >
                                                Use demo password
                                            </button>
                                        </div>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={16} />
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                autoComplete="current-password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-11 pr-11 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all tracking-wider"
                                                placeholder="••••••••"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                            >
                                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Controls: Remember Me & Forgot Password */}
                                    <div className="flex items-center justify-between pt-1 text-xs">
                                        <label className="flex items-center gap-2 cursor-pointer text-slate-600 select-none font-medium">
                                            <input
                                                type="checkbox"
                                                checked={rememberMe}
                                                onChange={(e) => setRememberMe(e.target.checked)}
                                                className="w-4 h-4 rounded text-emerald-600 border-slate-300 focus:ring-emerald-500"
                                            />
                                            <span>Remember this device</span>
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => alert('Demo Mode: All accounts use password123')}
                                            className="text-xs font-bold text-slate-600 hover:text-emerald-600 transition-colors"
                                        >
                                            Forgot password?
                                        </button>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full py-3.5 rounded-full font-black text-xs uppercase tracking-wider bg-emerald-600 text-white hover:bg-emerald-700 shadow-xl shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                    >
                                        {isLoading ? (
                                            <Loader2 className="animate-spin text-white" size={18} />
                                        ) : (
                                            <>
                                                <span>Launch {selectedRole} Dashboard</span>
                                                <ArrowRight size={16} strokeWidth={2.5} />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>

                            {/* Footer Links & Info */}
                            <div className="pt-6 mt-6 border-t border-slate-100 text-center space-y-2">
                                <p className="text-xs text-slate-600 font-medium">
                                    Don't have an account yet?{' '}
                                    <Link to="/signup" className="text-emerald-600 hover:text-emerald-700 font-bold hover:underline transition-colors">
                                        Create an account for free
                                    </Link>
                                </p>
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold">
                                    <span>Demo Credentials:</span>
                                    <code className="text-emerald-700 font-black">password123</code>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </main>

            {/* ─────────────────────────────────────────────────────────────
                3. SUBTLE FOOTER (Matching LandingPage footer styling)
            ───────────────────────────────────────────────────────────── */}
            <footer className="bg-white border-t border-slate-100 py-6 text-xs text-slate-500 text-center">
                <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div>© {new Date().getFullYear()} WhatsCRM Platform. All rights reserved.</div>
                    <div className="flex items-center gap-6 font-medium">
                        <Link to="/" className="hover:text-emerald-600 transition-colors">Features</Link>
                        <Link to="/" className="hover:text-emerald-600 transition-colors">Pricing</Link>
                        <Link to="/signup" className="hover:text-emerald-600 transition-colors">Start Free Trial</Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default LoginPage
