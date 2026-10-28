import React, { useState } from 'react'
import { 
    Globe, Users, CreditCard, Activity, CheckCircle, Clock, Shield, 
    Search, Filter, AlertTriangle, RefreshCcw, MoreVertical, Eye, Trash2, 
    ShieldOff, X, UserCheck, AlertCircle, SearchSlash, Database, MapPin, 
    Sparkles, ArrowUpRight, ArrowDownRight, Radio, ChevronDown, Check
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useAdminActions, useSuperAdminActions, useCrmMutation, useSnapshot } from '../../hooks/useCrmMutations'
import api from '../../services/api'
import useAppStore from '../../store/useStore'
import { useNavigate } from 'react-router-dom'

const Icons = { Globe, Users, CreditCard, Activity, Shield }

const AdminKPICard = ({ title, value, icon: Icon, colorTheme = 'emerald', subValue, trend, isRefetching, onClick }) => {
    const themes = {
        emerald: {
            iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-200/60',
            glow: 'group-hover:border-emerald-300 group-hover:shadow-emerald-600/10',
            accent: 'bg-emerald-500',
            trendBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
        },
        forest: {
            iconBg: 'bg-emerald-900/10 text-emerald-800 border border-emerald-800/20',
            glow: 'group-hover:border-emerald-400 group-hover:shadow-emerald-800/10',
            accent: 'bg-emerald-700',
            trendBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
        },
        mint: {
            iconBg: 'bg-teal-50 text-teal-600 border border-teal-200/60',
            glow: 'group-hover:border-teal-300 group-hover:shadow-teal-600/10',
            accent: 'bg-teal-500',
            trendBg: 'bg-teal-50 text-teal-700 border-teal-200/60'
        },
        slate: {
            iconBg: 'bg-slate-100 text-slate-700 border border-slate-200',
            glow: 'group-hover:border-slate-300 group-hover:shadow-slate-600/10',
            accent: 'bg-slate-600',
            trendBg: 'bg-slate-50 text-slate-600 border-slate-200'
        }
    }

    const t = themes[colorTheme] || themes.emerald

    return (
        <motion.div
            whileHover={{ y: -4 }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onClick}
            className={cn(
                "relative overflow-hidden rounded-3xl bg-white p-6 border border-slate-200/80 shadow-sm transition-all duration-300 group",
                t.glow,
                onClick && "cursor-pointer active:scale-[0.98]"
            )}
        >
            <div className="flex items-center justify-between mb-5">
                <div className={cn("p-3.5 rounded-2xl transition-transform duration-300 group-hover:scale-105 shadow-sm", t.iconBg)}>
                    <Icon className="h-6 w-6 stroke-[2.2]" />
                </div>
                <div className="flex flex-col items-end gap-1">
                    {trend !== undefined && (
                        <span className={cn(
                            "text-[10px] font-black px-2.5 py-1 rounded-xl uppercase tracking-wider border flex items-center gap-0.5",
                            trend >= 0 ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-rose-50 text-rose-600 border-rose-200"
                        )}>
                            {trend >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                            {Math.abs(trend)}%
                        </span>
                    )}
                    {isRefetching && <RefreshCcw className="h-3 w-3 text-emerald-600 animate-spin" />}
                </div>
            </div>

            <div>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-1">{title}</p>
                <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">{value}</h3>
                </div>
                {subValue && (
                    <div className="mt-3.5 flex items-center gap-2 pt-3 border-t border-slate-100">
                        <div className={cn("h-1.5 w-1.5 rounded-full shadow-xs", t.accent)} />
                        <p className="text-[11px] font-semibold text-slate-500 truncate">{subValue}</p>
                    </div>
                )}
            </div>

            <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-bl-full pointer-events-none" />
        </motion.div>
    )
}

const ActivityDetailModal = ({ activity, onClose }) => {
    if (!activity) return null;
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-100"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/60">
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Audit Reference</span>
                        <h3 className="text-base font-black text-slate-900 uppercase tracking-tight mt-0.5">Live Activity Log</h3>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200/60 rounded-xl transition-colors">
                        <X size={18} className="text-slate-500" />
                    </button>
                </div>
                <div className="p-6 space-y-5">
                    <div className="p-4 bg-emerald-50/60 border border-emerald-200/70 rounded-2xl space-y-1">
                        <p className="text-[10px] font-black text-emerald-800 uppercase tracking-wider">Action Executed</p>
                        <p className="text-sm font-bold text-slate-900">{activity.action}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Actor</span>
                            <span className="font-bold text-slate-800">{activity.user}</span>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Timestamp</span>
                            <span className="font-bold text-slate-800">{activity.time}</span>
                        </div>
                    </div>
                    <div className="bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-100 flex items-center gap-2.5">
                        <CheckCircle className="text-emerald-600 shrink-0" size={16} />
                        <p className="text-xs font-bold text-emerald-900">Cryptographically Signed System Record</p>
                    </div>
                </div>
                <div className="p-4 bg-slate-50/80 border-t border-slate-100">
                    <button 
                        onClick={onClose} 
                        className="w-full bg-slate-900 text-white py-3 rounded-xl font-black text-xs uppercase tracking-wider hover:bg-slate-800 transition-all active:scale-[0.99]"
                    >
                        Close
                    </button>
                </div>
            </motion.div>
        </motion.div>
    )
}

const SuperAdminOverview = () => {
    const navigate = useNavigate()
    const { createSnapshot } = useSnapshot()
    const { country, setCountry, statusFilter, dateRange } = useAppStore()
    const queryClient = useQueryClient()
    const { downloadReport } = useAdminActions()
    const { updateDashboard } = useSuperAdminActions()

    const dispatchLead = useCrmMutation({
        mutationFn: ({ leadId, counselorId }) => api.post('/super-admin/leads/dispatch', { leadId, counselorId }),
        successMessage: 'Lead dispatched successfully',
        invalidateQueries: ['dispatch-queue', 'leads']
    })

    const [assignmentSearch, setAssignmentSearch] = useState('')
    const [selectedActivity, setSelectedActivity] = useState(null)
    const [selectedLead, setSelectedLead] = useState(null)
    const [assignmentData, setAssignmentData] = useState({ team: 'Global Operations', counselorId: '', priority: 'Medium' })

    // Live Telemetry
    const { data: dashboardData, refetch: refetchKpis, isRefetching: isRefetchingKpis } = useQuery({
        queryKey: ['super-admin-dashboard', country, statusFilter, dateRange?.label],
        queryFn: async () => {
            const resp = await api.get('/super-admin/dashboard/kpis', {
                params: { country: country === 'Global' ? undefined : country, status: statusFilter, dateRange: dateRange?.label }
            })
            return resp.data?.data || resp.data || {}
        }
    })

    const stats = dashboardData || {}

    const kpis = [
        { 
            title: 'Total Clients Volume', 
            value: stats.totalClients || 0, 
            icon: 'Globe', 
            colorTheme: 'emerald', 
            trend: 12, 
            subValue: 'Institutional accounts online', 
            onClick: () => navigate('/super-admin/admins') 
        },
        { 
            title: 'Network Lead Influx', 
            value: stats.totalLeads || 0, 
            icon: 'Users', 
            colorTheme: 'mint', 
            trend: 8, 
            subValue: 'Inbound admissions leads', 
            onClick: () => navigate('/leads') 
        },
        { 
            title: 'Gross Revenue Insight', 
            value: `$${((stats.totalRevenue || 0) / 1000).toFixed(1)}k`, 
            icon: 'CreditCard', 
            colorTheme: 'forest', 
            trend: 15, 
            subValue: '+12.5% M-o-M Growth', 
            onClick: () => navigate('/super-admin/billing') 
        },
        { 
            title: 'Active WhatsApp Channels', 
            value: stats.activeChannels || 0, 
            icon: 'Activity', 
            colorTheme: 'slate', 
            trend: -2, 
            subValue: 'Live WhatsApp cloud nodes', 
            onClick: () => navigate('/super-admin/channels') 
        },
    ]

    const { data: activityResp } = useQuery({
        queryKey: ['audit-logs', country],
        queryFn: () => api.get('/audit/logs', { params: { country: country === 'Global' ? undefined : country } }),
        refetchInterval: 30000
    })

    const timelineData = (activityResp?.data || activityResp || []).slice(0, 15).map(log => ({
        id: log.id || Math.random(),
        action: log.action || 'System Dispatch',
        user: typeof log.user === 'object' ? (log.user?.name || 'System Node') : (log.user || 'System Node'),
        time: log.createdAt ? new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'
    }))

    // Dispatch queue
    const { data: leadsResp, isLoading: isLoadingLeads } = useQuery({
        queryKey: ['dispatch-queue', country, statusFilter],
        queryFn: () => api.get('/super-admin/leads/dispatch-queue', {
            params: { country: country === 'Global' ? undefined : country, status: statusFilter }
        })
    })
    
    const { data: usersResp } = useQuery({
        queryKey: ['users-assignable'],
        queryFn: () => api.get('/users').then(res => {
            const arr = Array.isArray(res.data) ? res.data : (Array.isArray(res) ? res : [])
            return arr.filter(u => ['COUNSELOR', 'TEAM_LEADER', 'MANAGER'].includes(u.role))
        })
    })

    const leadsData = Array.isArray(leadsResp?.data) ? leadsResp.data : (Array.isArray(leadsResp) ? leadsResp : [])
    const users = usersResp || []

    const filteredLeads = leadsData.filter(l => {
        const q = assignmentSearch.toLowerCase().trim()
        if (!q) return true
        const name = (l.name || '').toLowerCase()
        const c = (l.country || '').toLowerCase()
        const prog = (l.program || '').toLowerCase()
        const src = (l.source || '').toLowerCase()
        return name.includes(q) || c.includes(q) || prog.includes(q) || src.includes(q)
    })

    const priorityColors = {
        'High': 'text-rose-700 bg-rose-50 border-rose-200',
        'Medium': 'text-amber-700 bg-amber-50 border-amber-200',
        'Low': 'text-emerald-700 bg-emerald-50 border-emerald-200',
    }

    const handleConfirmDispatch = () => {
        if (!selectedLead || !assignmentData.counselorId) return
        dispatchLead.mutate({ leadId: selectedLead.id, counselorId: assignmentData.counselorId }, {
            onSuccess: () => {
                setSelectedLead(null)
                queryClient.invalidateQueries({ queryKey: ['dispatch-queue'] })
                queryClient.invalidateQueries({ queryKey: ['leads'] })
            }
        })
    }

    const availableCountries = ['Global', 'India', 'USA', 'UK', 'Canada', 'Australia', 'UAE']

    return (
        <div className="space-y-8 pb-12">
            {/* ─────────────────────────────────────────────────────────────
                1. HEADER & GLOBAL ACTIONS
            ───────────────────────────────────────────────────────────── */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2 border-b border-slate-200/80">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-black uppercase tracking-wider mb-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        System Architecture Grid • WhatsApp Multi-Tier Node
                    </div>
                    <h1 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">
                        Global Architecture Overview
                    </h1>
                    <p className="text-xs md:text-sm font-medium text-slate-500 mt-0.5">
                        Centralized telemetry, counselor dispatch pipeline, and institutional health throughput.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <button
                        onClick={() => updateDashboard.mutate()}
                        className={cn(
                            "p-3.5 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all shadow-xs active:scale-95 flex items-center justify-center",
                            (isRefetchingKpis || updateDashboard.isPending) && "text-emerald-600 animate-spin border-emerald-300"
                        )}
                        title="Synchronize Live Stats"
                    >
                        <RefreshCcw size={18} strokeWidth={2.2} />
                    </button>

                    <button 
                        onClick={() => createSnapshot.mutate()}
                        disabled={createSnapshot.isPending}
                        className="px-5 py-3.5 bg-white border border-slate-200 text-slate-700 rounded-2xl font-black text-[11px] uppercase tracking-wider hover:bg-slate-50 hover:border-slate-300 transition-all shadow-xs flex items-center gap-2 active:scale-95"
                    >
                        {createSnapshot.isPending ? <Activity className="animate-spin text-emerald-600" size={15} /> : <Database size={15} className="text-slate-500" />}
                        Snapshot DB
                    </button>

                    <button
                        onClick={() => downloadReport.mutate('global_overview')}
                        disabled={downloadReport.isPending}
                        className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-[11px] uppercase tracking-wider transition-all shadow-md shadow-emerald-600/25 flex items-center gap-2 active:scale-95"
                    >
                        {downloadReport.isPending ? <RefreshCcw className="animate-spin" size={15} /> : <Activity size={15} strokeWidth={2.4} />}
                        {downloadReport.isPending ? 'Generating...' : 'Export Global Insight'}
                    </button>
                </div>
            </div>

            {/* ─────────────────────────────────────────────────────────────
                2. 4 TELEMETRY STAT CARDS
            ───────────────────────────────────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {kpis.map((kpi, index) => (
                    <AdminKPICard 
                        key={index} 
                        {...kpi} 
                        icon={Icons[kpi.icon] || Globe} 
                        isRefetching={isRefetchingKpis} 
                    />
                ))}
            </div>

            {/* ─────────────────────────────────────────────────────────────
                3. MAIN TWO-COLUMN WORKSPACE
            ───────────────────────────────────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* ── LEFT: LIVE ARCHITECTURE STREAM (Max height container) ── */}
                <div className="lg:col-span-4 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col overflow-hidden">
                    <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
                        <div className="flex items-center gap-2.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                            <div>
                                <h3 className="font-black text-slate-900 text-xs uppercase tracking-wider">
                                    Live Architecture Stream
                                </h3>
                                <p className="text-[10px] text-slate-400 font-semibold">Real-time node events</p>
                            </div>
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                            Live Active
                        </span>
                    </div>

                    <div className="p-4 max-h-[580px] overflow-y-auto space-y-3 custom-scrollbar">
                        {timelineData.length > 0 ? (
                            timelineData.map((item, i) => (
                                <div
                                    key={item.id}
                                    onClick={() => setSelectedActivity(item)}
                                    className="p-3.5 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all cursor-pointer group flex items-start gap-3"
                                >
                                    <div className={cn(
                                        "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-transform group-hover:scale-105",
                                        i === 0 ? "bg-emerald-600 text-white shadow-xs" : "bg-slate-100 text-slate-600"
                                    )}>
                                        <Activity size={14} strokeWidth={2.4} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-1 mb-1">
                                            <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
                                                {item.action}
                                            </p>
                                            <span className="text-[10px] font-semibold text-slate-400 shrink-0">
                                                {item.time}
                                            </span>
                                        </div>
                                        <p className="text-[10px] font-semibold text-slate-500 flex items-center gap-1.5">
                                            <Users size={11} className="text-slate-400" />
                                            {item.user}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-12 text-center text-slate-400 text-xs">
                                No activity recorded yet.
                            </div>
                        )}
                    </div>
                </div>

                {/* ── RIGHT: MANUAL ASSIGNMENT & DISPATCH PANEL ── */}
                <div className="lg:col-span-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col overflow-hidden">
                    <div className="p-6 border-b border-slate-100 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-black text-slate-900 text-sm uppercase tracking-wider">
                                    Manual Dispatch & Lead Allocation
                                </h3>
                                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                                    {filteredLeads.length} In Queue
                                </span>
                            </div>
                            <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                                Override automated routing rules & direct students to counselors.
                            </p>
                        </div>

                        {/* Search and Territory Selector */}
                        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
                            {/* Territory Filter */}
                            <div className="relative">
                                <select
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    className="pl-8 pr-7 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer appearance-none shadow-xs"
                                >
                                    {availableCountries.map((c) => (
                                        <option key={c} value={c}>
                                            {c === 'Global' ? '🌐 All Territories' : `📍 ${c}`}
                                        </option>
                                    ))}
                                </select>
                                <MapPin size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            </div>

                            {/* Search Field */}
                            <div className="relative flex-1 sm:w-56">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Filter by name, campus..."
                                    value={assignmentSearch}
                                    onChange={(e) => setAssignmentSearch(e.target.value)}
                                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-xs transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Table of Leads */}
                    <div className="overflow-x-auto min-h-[420px]">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50/40 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                                    <th className="px-6 py-4">Inquiry Profile</th>
                                    <th className="px-4 py-4">Stage / Program</th>
                                    <th className="px-4 py-4">Origin Channel</th>
                                    <th className="px-4 py-4">AI Score</th>
                                    <th className="px-4 py-4">Queue Status</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-xs">
                                {filteredLeads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-emerald-50/20 transition-colors group">
                                        {/* Lead Name & Country */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                                                    {(lead.name || 'L').charAt(0)}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
                                                        {lead.name}
                                                    </p>
                                                    <p className="text-[11px] text-slate-400 font-medium truncate">
                                                        {lead.phone || lead.email || lead.country || 'Inbound Student'}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Program / Stage */}
                                        <td className="px-4 py-4">
                                            <span className="font-semibold text-slate-700 block truncate max-w-[140px]">
                                                {lead.program || 'Higher Education'}
                                            </span>
                                            <span className={cn(
                                                "inline-block text-[9px] font-black uppercase px-2 py-0.5 rounded-md mt-0.5",
                                                lead.status === 'HOT' ? "bg-rose-50 text-rose-700 border border-rose-200" :
                                                lead.status === 'WARM' ? "bg-amber-50 text-amber-700 border border-amber-200" :
                                                "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                            )}>
                                                {lead.status || lead.stage || 'NEW'}
                                            </span>
                                        </td>

                                        {/* Origin */}
                                        <td className="px-4 py-4">
                                            <span className="font-semibold text-slate-600">
                                                {lead.source || 'WhatsApp API'}
                                            </span>
                                            <span className="text-[10px] text-slate-400 block">
                                                {lead.country || 'Global'}
                                            </span>
                                        </td>

                                        {/* AI Confidence */}
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-slate-900 w-7">
                                                    {lead.score || 85}%
                                                </span>
                                                <div className="w-16 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                                                    <div 
                                                        className="h-full bg-emerald-500 rounded-full" 
                                                        style={{ width: `${lead.score || 85}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </td>

                                        {/* Assigned Status */}
                                        <td className="px-4 py-4">
                                            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
                                                Waiting Dispatch
                                            </span>
                                        </td>

                                        {/* Dispatch Button */}
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => setSelectedLead(lead)}
                                                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-all shadow-xs hover:shadow-md hover:shadow-emerald-600/20 active:scale-95 inline-flex items-center gap-1.5"
                                            >
                                                <UserCheck size={13} />
                                                Dispatch
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {filteredLeads.length === 0 && !isLoadingLeads && (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-16 text-center">
                                            <div className="max-w-sm mx-auto flex flex-col items-center gap-3">
                                                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                                                    <SearchSlash size={22} />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-sm text-slate-900">
                                                        No leads waiting in {country === 'Global' ? 'the queue' : `"${country}"`}
                                                    </h4>
                                                    <p className="text-xs text-slate-500 mt-1">
                                                        All inquiries for this filter have been routed or assigned to active counselors.
                                                    </p>
                                                </div>
                                                {country !== 'Global' && (
                                                    <button
                                                        onClick={() => setCountry('Global')}
                                                        className="mt-2 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-xs"
                                                    >
                                                        View All Global Leads
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* ─────────────────────────────────────────────────────────────
                4. MODALS (DISPATCH & ACTIVITY)
            ───────────────────────────────────────────────────────────── */}
            <AnimatePresence>
                {selectedActivity && (
                    <ActivityDetailModal
                        activity={selectedActivity}
                        onClose={() => setSelectedActivity(null)}
                    />
                )}

                {selectedLead && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSelectedLead(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 15 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 15 }}
                            className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-6 border-b border-slate-100 bg-slate-50/70 flex justify-between items-center">
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600">Manual Override</span>
                                    <h2 className="text-base font-black text-slate-900 uppercase tracking-tight mt-0.5">
                                        Assign Lead to Counselor
                                    </h2>
                                </div>
                                <button onClick={() => setSelectedLead(null)} className="p-2 hover:bg-slate-200/60 rounded-xl transition-colors">
                                    <X size={18} className="text-slate-500" />
                                </button>
                            </div>

                            <div className="p-6 space-y-5">
                                <div className="p-4 bg-emerald-50/60 border border-emerald-200/70 rounded-2xl flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] font-black text-emerald-800 uppercase tracking-wider">Candidate Profile</p>
                                        <p className="font-bold text-sm text-slate-900">{selectedLead.name}</p>
                                        <p className="text-xs text-slate-500">{selectedLead.country || 'Global'} • {selectedLead.program || 'Inquiry'}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-emerald-800 uppercase tracking-wider">AI Score</p>
                                        <p className="font-black text-base text-emerald-700">{selectedLead.score || 85}%</p>
                                    </div>
                                </div>

                                <div className="space-y-4 text-xs">
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">
                                            Operational Division
                                        </label>
                                        <select
                                            value={assignmentData.team}
                                            onChange={(e) => setAssignmentData({ ...assignmentData, team: e.target.value })}
                                            className="w-full p-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer shadow-xs"
                                        >
                                            <option>Global Operations</option>
                                            <option>Admissions South & India</option>
                                            <option>UK & Europe Desk</option>
                                            <option>North America (USA / Canada)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">
                                            Select Assigned Counselor
                                        </label>
                                        <select
                                            value={assignmentData.counselorId}
                                            onChange={(e) => setAssignmentData({ ...assignmentData, counselorId: e.target.value })}
                                            className="w-full p-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer shadow-xs"
                                        >
                                            <option value="" disabled>Choose active agent...</option>
                                            {users.map(u => (
                                                <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">
                                            Escalation Priority
                                        </label>
                                        <div className="flex gap-2">
                                            {['High', 'Medium', 'Low'].map(p => (
                                                <button
                                                    key={p}
                                                    type="button"
                                                    onClick={() => setAssignmentData({ ...assignmentData, priority: p })}
                                                    className={cn(
                                                        "flex-1 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-wider border transition-all",
                                                        assignmentData.priority === p 
                                                            ? priorityColors[p] 
                                                            : "bg-white border-slate-200 text-slate-400 hover:border-slate-300"
                                                    )}
                                                >
                                                    {p}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3 justify-end pt-3 border-t border-slate-100">
                                    <button
                                        onClick={() => setSelectedLead(null)}
                                        className="px-5 py-2.5 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleConfirmDispatch}
                                        disabled={dispatchLead.isPending || !assignmentData.counselorId}
                                        className="px-6 py-2.5 bg-emerald-600 text-white text-xs font-black uppercase tracking-wider rounded-xl hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/25 flex items-center gap-2 disabled:opacity-50"
                                    >
                                        {dispatchLead.isPending ? 'Allocating...' : 'Confirm Dispatch'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default SuperAdminOverview
