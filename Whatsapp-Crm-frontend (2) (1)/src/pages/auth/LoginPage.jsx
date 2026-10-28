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
    Activity,
    Headphones,
    BrainCircuit,
    Zap,
    Loader2,
    MessageSquare,
    Sparkles,
    CheckCircle2,
    Check
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

const RoleButton = ({ role, label, dashboardName, icon: Icon, active, onClick }) => (
    <button
        type="button"
        onClick={onClick}
        className={cn(
            "relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border transition-all duration-300 group overflow-hidden text-center",
            active
                ? "bg-gradient-to-b from-emerald-600 to-emerald-700 border-emerald-400 text-white shadow-xl shadow-emerald-950/50 scale-[1.03]"
                : "bg-[#07241C]/80 border-emerald-900/60 hover:bg-[#0B3327] hover:border-emerald-700/60 text-emerald-200/70 hover:text-white"
        )}
    >
        {active && (
            <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-white text-emerald-700 flex items-center justify-center shadow-sm">
                <Check size={10} strokeWidth={4} />
            </div>
        )}

        <div className={cn(
            "p-2.5 sm:p-3 rounded-xl mb-2 transition-all",
            active ? "bg-white/20 text-white shadow-inner" : "bg-emerald-950/80 text-emerald-400 group-hover:bg-emerald-900/80 group-hover:text-emerald-300"
        )}>
            <Icon size={20} />
        </div>

        <span className="text-[11px] font-black uppercase tracking-wider leading-tight text-white">
            {label}
        </span>
        <span className={cn(
            "text-[9px] font-semibold mt-1 transition-colors leading-tight",
            active ? "text-emerald-100" : "text-emerald-400/60 group-hover:text-emerald-300/80"
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
                const { token, refreshToken, user } = response.data || response;
                
                // Save JWT tokens for future requests
                localStorage.setItem('token', token)
                if (refreshToken) localStorage.setItem('refreshToken', refreshToken)
                
                // Save FULL user object and role
                localStorage.setItem('user', JSON.stringify(user))
                
                // Map backend role enum (e.g. 'SUPER_ADMIN') to frontend display role
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
        <div className="min-h-screen bg-[#051F18] bg-gradient-to-b from-[#031510] via-[#06281E] to-[#0A3327] text-white flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden font-sans selection:bg-emerald-500 selection:text-white">
            
            {/* Background Mesh Grid and Glowing Blobs */}
            <div className="absolute inset-0 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/15 blur-[140px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-teal-400/15 blur-[140px] rounded-full pointer-events-none" />

            {/* Top Navigation Bar: Back to Landing Page */}
            <div className="absolute top-5 left-5 sm:top-8 sm:left-8 z-30">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#083025]/80 hover:bg-[#0E4435] text-emerald-300 hover:text-white border border-emerald-700/50 text-xs font-black uppercase tracking-wider transition-all backdrop-blur-md shadow-lg shadow-black/20"
                >
                    <ArrowRight className="rotate-180" size={14} />
                    Back to WhatsCRM Home
                </Link>
            </div>

            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10 pt-16 sm:pt-14 lg:pt-0">
                
                {/* Left Side: Brand Overview & Dashboard Matrix */}
                <div className="hidden lg:block lg:col-span-5 space-y-8 text-left">
                    <div className="space-y-4">
                        <Link to="/" className="inline-flex items-center gap-3 group">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center text-white shadow-xl shadow-emerald-500/25 group-hover:scale-105 transition-transform">
                                <MessageSquare className="w-6 h-6 fill-white/20 stroke-white stroke-[2.2]" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-black tracking-tight text-white leading-none">
                                    Whats<span className="text-emerald-400">CRM</span>
                                </span>
                                <span className="text-[10px] font-black tracking-widest text-emerald-400 uppercase mt-1">
                                    Study First Info Ltd.
                                </span>
                            </div>
                        </Link>

                        <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-tight mt-6">
                            Unified <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">Role Access</span>
                        </h1>
                        <p className="text-emerald-100/70 text-sm font-medium leading-relaxed max-w-md">
                            Seamlessly access all 6 dedicated dashboards. Each role is equipped with custom tools, permission scope, and live WhatsApp routing.
                        </p>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#093529]/80 border border-emerald-800/50">
                            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                                <Zap size={16} />
                            </div>
                            <div>
                                <div className="text-xs font-black uppercase tracking-wider text-white">Live Socket Synchronization</div>
                                <div className="text-[11px] text-emerald-300/70">Real-time incoming chat queue and lead stage alerts</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#093529]/80 border border-emerald-800/50">
                            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                                <ShieldCheck size={16} />
                            </div>
                            <div>
                                <div className="text-xs font-black uppercase tracking-wider text-white">Strict Role Guard (RBAC)</div>
                                <div className="text-[11px] text-emerald-300/70">Isolated data scopes for Super Admin, Manager & Counselor</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#093529]/80 border border-emerald-800/50">
                            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                                <Sparkles size={16} />
                            </div>
                            <div>
                                <div className="text-xs font-black uppercase tracking-wider text-white">AI Automation Bot Active</div>
                                <div className="text-[11px] text-emerald-300/70">24/7 lead qualification and auto-response dispatch</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Identity Selection & Login Form */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="lg:col-span-7 bg-[#072B21]/95 backdrop-blur-2xl border border-emerald-700/40 p-6 sm:p-10 rounded-[2.5rem] shadow-2xl space-y-6"
                >
                    <div className="space-y-1.5 text-center sm:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/60 text-emerald-300 text-[10px] font-black uppercase tracking-widest mb-1">
                            <Sparkles size={12} /> Multi-Dashboard Portal
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Establish Dashboard Session</h2>
                        <p className="text-xs font-bold text-emerald-300/60 uppercase tracking-widest">
                            Select an identity below to load pre-configured dashboard credentials
                        </p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-500/15 border border-red-500/40 p-3.5 rounded-2xl text-red-300 text-xs font-bold text-center"
                        >
                            {error}
                        </motion.div>
                    )}

                    {/* Role Selector Grid: All 6 Dashboards */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-emerald-400 uppercase tracking-widest px-1">
                            Target Dashboard & Role Identity
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                            {roles.map(role => (
                                <RoleButton
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

                    {/* Active Target Banner */}
                    <div className="p-3 bg-emerald-950/80 rounded-2xl border border-emerald-800/60 text-xs flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-emerald-300">
                            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                            <span>Destination: <b>{roleHomePages[selectedRole]}</b></span>
                        </div>
                        <button
                            type="button"
                            onClick={() => handleSubmit(null, email, 'password123')}
                            className="text-[10px] font-black text-slate-950 bg-emerald-400 hover:bg-emerald-300 px-3 py-1.5 rounded-lg uppercase tracking-wider transition-all shadow-sm flex items-center gap-1 hover:scale-105 active:scale-95"
                        >
                            ⚡ 1-Click Fast Login
                        </button>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                        <div className="space-y-3">
                            <div className="space-y-1 text-left">
                                <label className="text-[10px] font-black text-emerald-400 uppercase tracking-widest px-1">
                                    Identity Email Address
                                </label>
                                <div className="relative group">
                                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-500 group-focus-within:text-emerald-300 transition-colors" size={16} />
                                    <input
                                        type="email"
                                        name="email"
                                        autoComplete="username"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-[#041E17] border border-emerald-800/60 rounded-2xl py-3.5 pl-14 pr-5 text-xs font-bold text-white tracking-wider focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-400 outline-none transition-all placeholder:text-emerald-700/60"
                                        placeholder="user@crm.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1 text-left">
                                <label className="text-[10px] font-black text-emerald-400 uppercase tracking-widest px-1">
                                    Passcode
                                </label>
                                <div className="relative group">
                                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-500 group-focus-within:text-emerald-300 transition-colors" size={16} />
                                    <input
                                        type="password"
                                        name="password"
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-[#041E17] border border-emerald-800/60 rounded-2xl py-3.5 pl-14 pr-5 text-xs font-bold text-white tracking-widest focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-400 outline-none transition-all"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/25 group disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-98"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin text-slate-950" size={18} />
                            ) : (
                                <>
                                    <span>Launch {selectedRole} Dashboard</span>
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} strokeWidth={3} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="pt-2 border-t border-emerald-900/60 text-center">
                        <p className="text-[10px] font-bold text-emerald-400/60 uppercase tracking-wider">
                            Demo Mode: All accounts use shared password <code className="text-emerald-300 bg-emerald-950 px-1.5 py-0.5 rounded">password123</code>
                        </p>
                    </div>
                </motion.div>

            </div>
        </div>
    )
}

export default LoginPage
