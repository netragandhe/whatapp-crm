import React, { useState } from 'react'
import ktLogo from '../../assets/logo.png'
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
                ? "bg-[#DDF7E8] border-2 border-[#86D9A9] text-[#26382E] shadow-sm ring-2 ring-[#86D9A9]/20 scale-[1.02]"
                : "bg-white/80 border-[#DDE8E0] hover:bg-[#EDF8F0] hover:border-[#86D9A9] text-[#64748B] hover:text-[#26382E]"
        )}
    >
        {active && (
            <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#86D9A9] text-[#26382E] flex items-center justify-center shadow-xs">
                <Check size={10} strokeWidth={4} />
            </div>
        )}

        <div className={cn(
            "p-2 rounded-xl mb-1.5 transition-all",
            active
                ? "bg-[#86D9A9] text-[#26382E] shadow-xs"
                : "bg-[#EDF8F0] text-[#64748B] border border-[#DDE8E0] group-hover:bg-white group-hover:text-[#26382E] group-hover:border-[#86D9A9]/40"
        )}>
            <Icon size={18} />
        </div>

        <span className={cn(
            "text-[11px] font-black uppercase tracking-wider leading-tight",
            active ? "text-[#26382E]" : "text-[#26382E]/90"
        )}>
            {label}
        </span>
        <span className={cn(
            "text-[9px] font-semibold mt-0.5 leading-tight truncate max-w-full",
            active ? "text-[#26382E]/80" : "text-[#64748B] group-hover:text-[#26382E]"
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
        <div className="min-h-screen bg-[#F4FBF6] text-[#26382E] font-sans antialiased selection:bg-[#86D9A9] selection:text-[#26382E] flex flex-col justify-between">
            {/* ─────────────────────────────────────────────────────────────
                1. TOP NAVIGATION
            ───────────────────────────────────────────────────────────── */}
            <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-[#DDE8E0] transition-all shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    {/* Brand Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-24 h-14 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                            <img src={ktLogo} alt="Logo" className="w-full h-full object-contain" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-black tracking-tight text-[#26382E] leading-none">
                                Kiaan <span className="text-[#2E8456]">CRM</span>
                            </span>
                            <span className="text-[10px] font-black tracking-widest text-[#64748B] uppercase mt-0.5">
                                Kiaan Tech • Kiaan CRM
                            </span>
                        </div>
                    </Link>

                    {/* Right Navigation Links */}
                    <div className="flex items-center gap-3">
                        <Link
                            to="/"
                            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#64748B] hover:text-[#26382E] transition-colors"
                        >
                            <ArrowRight className="rotate-180" size={14} />
                            Home
                        </Link>
                        <span className="hidden sm:block text-[#DDE8E0]">|</span>
                        <span className="text-xs text-[#64748B] font-medium hidden md:inline">
                            Don't have an account?
                        </span>
                        <Link
                            to="/signup"
                            className="px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider bg-[#86D9A9] text-[#26382E] hover:bg-[#A7E8C2] transition-all shadow-sm flex items-center gap-2 hover:scale-[1.02]"
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
            <main className="flex-1 relative py-10 sm:py-14 overflow-hidden bg-gradient-to-b from-[#EDF8F0] via-[#F4FBF6] to-[#EDF8F0]">
                {/* Decorative background glow */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-[#86D9A9]/20 via-[#A7E8C2]/15 to-transparent blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
                        
                        {/* ─────────────────────────────────────────────────────────
                            LEFT SHOWCASE PANEL (Soft Mint Glass Theme)
                        ───────────────────────────────────────────────────────── */}
                        <div className="hidden lg:flex lg:col-span-5 rounded-[2.5rem] bg-white/80 backdrop-blur-xl border border-[#DDE8E0] text-[#26382E] p-8 xl:p-10 flex-col justify-between shadow-glass relative overflow-hidden">
                            <div className="relative z-10 space-y-6">
                                {/* Top Pill Badge */}
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDF8F0] border border-[#DDE8E0] text-[#26382E] text-[10px] font-black uppercase tracking-widest shadow-sm">
                                    <Sparkles className="w-3 h-3 text-[#16A34A]" />
                                    #1 AI-Powered Kiaan CRM
                                </div>

                                <div className="space-y-3">
                                    <h1 className="text-3xl xl:text-4xl font-black text-[#26382E] tracking-tight leading-snug">
                                        Turn Conversations Into{' '}
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#26382E] via-[#16A34A] to-[#26382E]">
                                            Real Customers
                                        </span>
                                    </h1>
                                    <p className="text-xs xl:text-sm text-[#64748B] font-medium leading-relaxed">
                                        Access unified dashboards for Super Admin, Manager, Team Leader, Counselor, and Customer Support.
                                    </p>
                                </div>

                                {/* Mini Live Conversation Card Preview */}
                                <div className="bg-[#EDF8F0] rounded-2xl border border-[#DDE8E0] p-4 space-y-3 shadow-sm">
                                    <div className="flex items-center justify-between pb-2.5 border-b border-[#DDE8E0]">
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-full bg-[#86D9A9] flex items-center justify-center font-bold text-[#26382E] text-[10px]">
                                                AS
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-[#26382E] flex items-center gap-1">
                                                    Aditi Sharma
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                                                </div>
                                                <div className="text-[9px] text-[#64748B]">+91 98765 43210</div>
                                            </div>
                                        </div>
                                        <span className="px-2 py-0.5 rounded-full bg-[#86D9A9] text-[#26382E] text-[9px] font-black uppercase">
                                            Lead Score: 94 🔥
                                        </span>
                                    </div>

                                    <div className="space-y-2 text-[11px] leading-relaxed">
                                        <div className="bg-white p-2.5 rounded-xl rounded-tl-none text-[#26382E] border border-[#DDE8E0] shadow-sm">
                                            "Could you share the admission prospectus & scholarship details?"
                                        </div>
                                        <div className="bg-[#DDF7E8] p-2.5 rounded-xl rounded-tr-none text-[#26382E] ml-auto max-w-[90%] border border-[#86D9A9]/40 shadow-sm">
                                            <div className="text-[8px] font-bold text-[#16A34A] mb-0.5 flex items-center gap-1">
                                                <Sparkles size={8} /> Auto-Smart Prospectus Dispatched
                                            </div>
                                            "Hi Aditi! 👋 I've attached our 2026 Prospectus. Up to 40% Merit Scholarships are available."
                                        </div>
                                    </div>

                                    <div className="pt-2 border-t border-[#DDE8E0] flex items-center justify-between text-[10px] text-[#26382E]">
                                        <span className="font-bold">⚡ AI Auto-Responder: Active</span>
                                        <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-ping" />
                                    </div>
                                </div>

                                {/* Trust Metrics Grid */}
                                <div className="grid grid-cols-2 gap-3 pt-2">
                                    <div className="p-3 rounded-2xl bg-white/80 border border-[#DDE8E0] shadow-sm">
                                        <div className="text-xl font-black text-[#26382E]">12,500+</div>
                                        <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Active Agents</div>
                                    </div>
                                    <div className="p-3 rounded-2xl bg-white/80 border border-[#DDE8E0] shadow-sm">
                                        <div className="text-xl font-black text-[#26382E]">98.4%</div>
                                        <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">CSAT Satisfaction</div>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Security Trust */}
                            <div className="relative z-10 pt-6 border-t border-[#DDE8E0] flex items-center justify-between text-[10px] text-[#64748B] font-semibold">
                                <span className="flex items-center gap-1.5">
                                    <Shield size={12} className="text-[#16A34A]" /> Role-Based Access (RBAC)
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Award size={12} className="text-[#16A34A]" /> Official Cloud API
                                </span>
                            </div>
                        </div>

                        {/* ─────────────────────────────────────────────────────────
                            RIGHT FORM PANEL (Clean, Modern, Light Mint Glass Card)
                        ───────────────────────────────────────────────────────── */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="lg:col-span-7 bg-white/85 backdrop-blur-xl rounded-[2.5rem] border border-[#DDE8E0] p-6 sm:p-10 shadow-glass flex flex-col justify-between"
                        >
                            <div>
                                {/* Header */}
                                <div className="space-y-2 mb-6 text-center sm:text-left">
                                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EDF8F0] border border-[#DDE8E0] text-[#26382E] text-[10px] font-black uppercase tracking-wider">
                                        <Sparkles size={11} className="text-[#16A34A]" />
                                        Secure Authentication Portal
                                    </div>
                                    <h2 className="text-2xl sm:text-3xl font-black text-[#26382E] tracking-tight">
                                        Sign In to Your Workspace
                                    </h2>
                                    <p className="text-xs text-[#64748B] font-medium">
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
                                        <label className="text-[10px] font-black uppercase tracking-wider text-[#64748B]">
                                            Select Identity Role
                                        </label>
                                        <span className="text-[10px] font-bold text-[#16A34A]">
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
                                <div className="mb-5 p-3 rounded-2xl bg-[#EDF8F0] border border-[#DDE8E0] flex flex-wrap items-center justify-between gap-2 text-xs">
                                    <div className="flex items-center gap-2 text-[#26382E]">
                                        <CheckCircle2 size={15} className="text-[#16A34A] shrink-0" />
                                        <span className="font-medium text-[11px]">
                                            Target: <b className="text-[#26382E] font-bold">{roleHomePages[selectedRole]}</b>
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleSubmit(null, email, 'password123')}
                                        className="text-[10px] font-black text-[#26382E] bg-[#86D9A9] hover:bg-[#A7E8C2] px-3.5 py-1.5 rounded-full uppercase tracking-wider transition-all shadow-xs flex items-center gap-1 hover:scale-105 active:scale-95"
                                    >
                                        ⚡ 1-Click Fast Login
                                    </button>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* Email */}
                                    <div className="space-y-1 text-left">
                                        <label className="text-[11px] font-black uppercase tracking-wider text-[#26382E]">
                                            Work Email Address
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]" size={16} />
                                            <input
                                                type="email"
                                                name="email"
                                                autoComplete="username"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full bg-white border border-[#DDE8E0] rounded-2xl py-3 pl-11 pr-4 text-xs font-semibold text-[#26382E] placeholder:text-[#64748B] focus:border-[#86D9A9] focus:ring-4 focus:ring-[#86D9A9]/10 outline-none transition-all shadow-xs"
                                                placeholder="user@crm.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div className="space-y-1 text-left">
                                        <div className="flex items-center justify-between">
                                            <label className="text-[11px] font-black uppercase tracking-wider text-[#26382E]">
                                                Password
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => setPassword('password123')}
                                                className="text-[10px] font-bold text-[#16A34A] hover:underline"
                                            >
                                                Use demo password
                                            </button>
                                        </div>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]" size={16} />
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                autoComplete="current-password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full bg-white border border-[#DDE8E0] rounded-2xl py-3 pl-11 pr-11 text-xs font-semibold text-[#26382E] placeholder:text-[#64748B] focus:border-[#86D9A9] focus:ring-4 focus:ring-[#86D9A9]/10 outline-none transition-all tracking-wider shadow-xs"
                                                placeholder="••••••••"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#26382E] transition-colors"
                                            >
                                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Controls: Remember Me & Forgot Password */}
                                    <div className="flex items-center justify-between pt-1 text-xs">
                                        <label className="flex items-center gap-2 cursor-pointer text-[#64748B] select-none font-medium">
                                            <input
                                                type="checkbox"
                                                checked={rememberMe}
                                                onChange={(e) => setRememberMe(e.target.checked)}
                                                className="w-4 h-4 rounded text-[#86D9A9] border-[#DDE8E0] focus:ring-[#86D9A9]"
                                            />
                                            <span>Remember this device</span>
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => alert('Demo Mode: All accounts use password123')}
                                            className="text-xs font-bold text-[#64748B] hover:text-[#26382E] transition-colors"
                                        >
                                            Forgot password?
                                        </button>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full py-3.5 rounded-full font-black text-xs uppercase tracking-wider bg-[#86D9A9] text-[#26382E] hover:bg-[#A7E8C2] shadow-sm transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                    >
                                        {isLoading ? (
                                            <Loader2 className="animate-spin text-[#26382E]" size={18} />
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
                            <div className="pt-6 mt-6 border-t border-[#DDE8E0] text-center space-y-2">
                                <p className="text-xs text-[#64748B] font-medium">
                                    Don't have an account yet?{' '}
                                    <Link to="/signup" className="text-[#26382E] font-bold hover:underline transition-colors">
                                        Create an account for free
                                    </Link>
                                </p>
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDF8F0] border border-[#DDE8E0] text-[#64748B] text-[10px] font-bold">
                                    <span>Demo Credentials:</span>
                                    <code className="text-[#26382E] font-black">password123</code>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </main>

            {/* ─────────────────────────────────────────────────────────────
                3. SUBTLE FOOTER
            ───────────────────────────────────────────────────────────── */}
            <footer className="bg-white/80 backdrop-blur-xl border-t border-[#DDE8E0] py-6 text-xs text-[#64748B] text-center">
                <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div>© {new Date().getFullYear()} Kiaan CRM Platform. All rights reserved.</div>
                    <div className="flex items-center gap-6 font-medium">
                        <Link to="/" className="hover:text-[#26382E] transition-colors">Features</Link>
                        <Link to="/" className="hover:text-[#26382E] transition-colors">Pricing</Link>
                        <Link to="/signup" className="hover:text-[#26382E] transition-colors">Start Free Trial</Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default LoginPage
