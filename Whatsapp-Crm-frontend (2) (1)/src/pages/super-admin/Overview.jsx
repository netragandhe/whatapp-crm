import React, { useState } from 'react'
import { Globe, Users, CreditCard, Activity, CheckCircle, Clock, Shield, Search, Filter, AlertTriangle, RefreshCcw, MoreVertical, Eye, Trash2, ShieldOff, X, UserCheck, AlertCircle, SearchSlash, Database } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useAdminActions, useSuperAdminActions, useCrmMutation, useSnapshot } from '../../hooks/useCrmMutations'
import api from '../../services/api'
import useAppStore from '../../store/useStore'
import { useNavigate } from 'react-router-dom'

const Icons = { Globe, Users, CreditCard, Activity, Shield }

const AdminKPICard = ({ title, value, icon: Icon, color, subValue, trend, isRefetching, onClick }) => (
    <motion.div
        whileHover={{ y: -5, scale: (onClick ? 1.05 : 1.02) }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={onClick}
        className={cn(
            "glass-card bg-white/80 border border-[#DDE8E0] p-6 rounded-3xl relative overflow-hidden group shadow-sm hover:shadow-md transition-all",
            onClick && "cursor-pointer active:scale-95"
        )}
    >
        <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
                <div className={cn(
                    "p-4 rounded-2xl transition-all duration-500 group-hover:rotate-[10deg] shadow-sm",
                    color.replace('bg-', 'bg-gradient-to-br from-').replace('text-', 'bg-opacity-20 text-')
                )}>
                    <Icon className="h-6 w-6" />
                </div>
                <div className="flex flex-col items-end gap-1">
                    {trend && (
                        <span className={cn(
                            "text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-wider shadow-sm",
                            trend > 0 ? "bg-[#DDF7E8] text-[#26382E] border border-[#A7E8C2]" : "bg-rose-500/10 text-rose-600 border border-rose-100"
                        )}>
                            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
                        </span>
                    )}
                    {isRefetching && <RefreshCcw className="h-3 w-3 text-[#86D9A9] animate-spin" />}
                </div>
            </div>
            <div>
                <p className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.25em] mb-1">{title}</p>
                <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl font-black text-[#26382E] tracking-tighter">{value}</h3>
                    {subValue && !subValue.includes('|') && (
                        <span className="text-[10px] font-black text-[#64748B] uppercase tracking-widest">Global</span>
                    )}
                </div>
                {subValue && (
                    <div className="mt-4 flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#86D9A9]" />
                        <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">{subValue}</p>
                    </div>
                )}
            </div>
        </div>
        
        {/* Decorative background circle */}
        <div className={cn(
            "absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-[0.03] group-hover:scale-150 transition-transform duration-1000",
            color.split(' ')[0]
        )} />
    </motion.div>
)


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
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="glass-card bg-white/95 rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl mx-2 sm:mx-auto max-h-[85vh] overflow-y-auto no-scrollbar border border-[#DDE8E0]"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-8 border-b border-[#DDE8E0] flex justify-between items-center bg-[#EDF8F0]/80">
                    <div>
                        <h3 className="text-xl font-black text-[#26382E] uppercase tracking-tight">Activity Log Detail</h3>
                        <p className="text-[10px] font-black text-[#64748B] uppercase tracking-widest mt-1">Audit Reference: #EXT-{Math.floor(Math.random() * 90000)}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-[#DDF7E8] rounded-xl transition-colors shadow-sm text-[#64748B]">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <p className="text-[9px] font-black text-[#64748B] uppercase tracking-widest">Action Executed</p>
                            <p className="text-sm font-black text-[#26382E]">{activity.action}</p>
                        </div>
                        <div className="space-y-1 text-right">
                            <p className="text-[9px] font-black text-[#64748B] uppercase tracking-widest">Time Index</p>
                            <p className="text-sm font-black text-[#26382E]">{activity.time}</p>
                        </div>
                    </div>
                    <div className="h-px bg-[#DDE8E0]" />
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-[#64748B] uppercase tracking-widest">Actor Identity</span>
                            <span className="text-xs font-black text-[#26382E]">{activity.user}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-[#64748B] uppercase tracking-widest">Authority Role</span>
                            <span className="text-xs font-black text-[#26382E] uppercase tracking-widest bg-[#EDF8F0] border border-[#DDE8E0] px-2 py-1 rounded">{activity.role}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-[#64748B] uppercase tracking-widest">System Module</span>
                            <span className="text-xs font-black text-[#64748B]">{activity.module}</span>
                        </div>
                    </div>
                    <div className="bg-[#DDF7E8] p-4 rounded-2xl border border-[#A7E8C2] flex items-center gap-3">
                        <CheckCircle className="text-[#86D9A9]" size={18} />
                        <p className="text-xs font-black text-[#26382E] uppercase tracking-widest">Integrity Verified</p>
                    </div>
                </div>
                <div className="p-6 bg-[#EDF8F0]/60 border-t border-[#DDE8E0]">
                    <button onClick={onClose} className="w-full bg-[#86D9A9] text-[#26382E] py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#A7E8C2] transition-all shadow-sm">Close Instance</button>
                </div>
            </motion.div>
        </motion.div>
    )
}

const SuperAdminOverview = () => {
    const navigate = useNavigate()
    const { createSnapshot } = useSnapshot()
    const { country, statusFilter, dateRange } = useAppStore()
    const queryClient = useQueryClient()
    const { downloadReport } = useAdminActions()
    const { toggleClientChannelStatus, deleteClientChannel, updateDashboard } = useSuperAdminActions()

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
    const { data: dashboardData, refetch: refetchKpis, isRefetching: isRefetchingKpis, isLoading: isLoadingKpis } = useQuery({
        queryKey: ['super-admin-dashboard', country, statusFilter, dateRange?.label],
        queryFn: async () => {
            const resp = await api.get('/super-admin/dashboard/kpis', {
                params: { country, status: statusFilter, dateRange: dateRange?.label }
            })
            return resp.data?.data || {}
        }
    })

    const stats = dashboardData || {}

    const kpis = [
        { title: 'Total Clients Volume', value: stats.totalClients || 0, icon: 'Globe', color: 'bg-[#86D9A9] text-[#26382E]', trend: 12, subValue: 'Active global nodes', onClick: () => navigate('/super-admin/admins') },
        { title: 'Network Lead Influx', value: stats.totalLeads || 0, icon: 'Users', color: 'bg-emerald-600 text-emerald-600', trend: 8, subValue: 'Total recorded leads', onClick: () => navigate('/leads') },
        { title: 'Gross Revenue Insight', value: `$${((stats.totalRevenue || 0) / 1000).toFixed(1)}k`, icon: 'CreditCard', color: 'bg-[#A7E8C2] text-[#26382E]', trend: 15, subValue: '+12.5% Growth', onClick: () => navigate('/super-admin/billing') },
        { title: 'Active Channels', value: stats.activeChannels || 0, icon: 'Activity', color: 'bg-amber-600 text-amber-600', trend: -2, subValue: 'Operational links', onClick: () => navigate('/super-admin/channels') },
    ]

    const { data: activityResp } = useQuery({
        queryKey: ['audit-logs', country],
        queryFn: () => api.get('/audit/logs', { params: { country } }),
        refetchInterval: 30000
    })
    const timelineData = (activityResp?.data || []).map(log => ({
        id: log.id,
        action: log.action,
        user: log.user || 'System Node',
        time: log.createdAt ? new Date(log.createdAt).toLocaleTimeString() : 'Recent'
    }))

    const { data: leadsResp, isLoading: isLoadingLeads } = useQuery({
        queryKey: ['dispatch-queue', country, statusFilter],
        queryFn: () => api.get('/super-admin/leads/dispatch-queue', {
            params: { country, status: statusFilter }
        })
    })
    
    const { data: usersResp } = useQuery({
        queryKey: ['users-assignable'],
        queryFn: () => api.get('/users').then(res => res.data.filter(u => ['COUNSELOR', 'TEAM_LEADER', 'MANAGER'].includes(u.role)))
    })

    const leadsData = leadsResp?.data || []
    const users = usersResp || []


    const filteredLeads = leadsData.filter(l =>
        l.name.toLowerCase().includes(assignmentSearch.toLowerCase()) ||
        l.country.toLowerCase().includes(assignmentSearch.toLowerCase())
    )

    const priorityColors = {
        'High': 'text-rose-600 bg-rose-50 border-rose-100',
        'Medium': 'text-amber-600 bg-amber-50 border-amber-100',
        'Low': 'text-[#26382E] bg-[#DDF7E8] border-[#A7E8C2]',
    }

    const handleConfirmDispatch = () => {
        if (!selectedLead || !assignmentData.counselorId) return;
        dispatchLead.mutate({ leadId: selectedLead.id, counselorId: assignmentData.counselorId }, {
            onSuccess: () => {
                setSelectedLead(null)
                queryClient.invalidateQueries({ queryKey: ['dispatch-queue'] })
                queryClient.invalidateQueries({ queryKey: ['leads'] })
            }
        })
    }


    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-[#26382E] uppercase tracking-tight">Global Architecture Overview</h1>
                    <p className="text-xs md:text-sm font-medium text-[#64748B]">Centralized monitoring of tenant health and throughput.</p>
                </div>
                <div className="flex flex-col items-end sm:flex-row sm:items-center justify-end gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                    <div className="flex gap-3 justify-end w-full sm:w-auto">
                        <button
                            onClick={() => updateDashboard.mutate()}
                            className={cn(
                                "p-4 bg-white/80 border border-[#DDE8E0] rounded-2xl text-[#64748B] hover:text-[#26382E] hover:bg-[#EDF8F0] transition-all shadow-sm active:scale-90 flex items-center justify-center",
                                (isRefetchingKpis || updateDashboard.isPending) && "text-[#86D9A9] animate-spin"
                            )}
                            title="Synchronize Global Stats"
                        >
                            <RefreshCcw size={20} strokeWidth={2.5} />
                        </button>
                        <button 
                            onClick={() => createSnapshot.mutate()}
                            disabled={createSnapshot.isPending}
                            className="bg-white/80 border border-[#DDE8E0] text-[#26382E] px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#EDF8F0] transition-all shadow-sm flex items-center justify-center gap-2"
                        >
                            {createSnapshot.isPending ? <Activity className="animate-spin text-[#86D9A9]" size={14} /> : <Database size={14} className="text-[#86D9A9]" />}
                            Snapshot DB
                        </button>
                    </div>
                    <button
                        onClick={() => downloadReport.mutate('global_overview')}
                        disabled={downloadReport.isPending}
                        className="w-full sm:w-auto px-6 sm:px-8 py-4 bg-[#86D9A9] text-[#26382E] rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-widest hover:bg-[#A7E8C2] transition-all shadow-sm flex items-center justify-center gap-3 active:scale-95"
                    >
                        {downloadReport.isPending ? <RefreshCcw className="animate-spin" size={16} /> : <Activity size={16} strokeWidth={2.5} />}
                        {downloadReport.isPending ? 'Processing...' : 'Export Global Insight'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpis.map((kpi, index) => (
                    <AdminKPICard key={index} {...kpi} icon={Icons[kpi.icon] || Globe} isRefetching={isRefetchingKpis} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Timeline Column */}
                <div className="lg:col-span-4 glass-card bg-white/80 border border-[#DDE8E0] shadow-sm rounded-3xl !p-0 flex flex-col overflow-hidden">
                    <div className="px-4 md:px-8 py-6 border-b border-[#DDE8E0] flex items-center justify-between bg-[#EDF8F0]/80">
                        <h3 className="font-black text-[#26382E] text-xs uppercase tracking-[0.2em]">Live Architecture Stream</h3>
                        <div className="h-2 w-2 rounded-full bg-[#86D9A9] animate-ping" />
                    </div>
                    <div className="flex-1 p-4 md:p-8">
                        <div className="relative space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-[#DDE8E0]">
                            <AnimatePresence mode='popLayout'>
                                {timelineData.map((item, i) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        key={item.id}
                                        onClick={() => setSelectedActivity(item)}
                                        className="relative pl-10 cursor-pointer group"
                                    >
                                        <div className={cn(
                                            "absolute left-0 top-2 h-6 w-6 rounded-full border-[3px] border-white shadow-md flex items-center justify-center z-10 transition-all group-hover:scale-125 duration-300",
                                            i === 0 ? 'bg-[#86D9A9]' : 'bg-[#DDE8E0]'
                                        )}>
                                            <div className={cn("h-1.5 w-1.5 rounded-full", i === 0 ? "bg-[#26382E] animate-pulse" : "bg-white")} />
                                        </div>
                                        <div className="p-5 rounded-2xl hover:bg-[#F4FBF6] transition-all border border-transparent hover:border-[#DDE8E0] group-hover:translate-x-1 duration-300 shadow-sm">
                                            <div className="flex items-center justify-between mb-2">
                                                <p className="text-xs font-black text-[#26382E] group-hover:text-[#26382E] transition-colors uppercase tracking-tight">{item.action}</p>
                                                <span className="text-[9px] text-[#64748B] font-black uppercase bg-white/80 px-2 py-0.5 rounded-lg border border-[#DDE8E0] shadow-sm">{item.time}</span>
                                            </div>
                                            <p className="text-[10px] text-[#64748B] font-bold uppercase tracking-widest flex items-center gap-2">
                                                <Users size={10} className="text-[#86D9A9]" />
                                                {typeof item.user === 'object' ? item.user.name : item.user}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Manual Assignment Panel */}
                <div className="lg:col-span-8 glass-card bg-white/80 border border-[#DDE8E0] shadow-sm rounded-3xl !p-0 flex flex-col overflow-hidden">
                    <div className="p-4 md:p-8 border-b border-[#DDE8E0] flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-[#EDF8F0]/80">
                        <div>
                            <h3 className="font-black text-[#26382E] text-xs md:text-[14px] uppercase tracking-tight">Manual Assignment Panel</h3>
                            <p className="text-[9px] md:text-[10px] font-medium text-[#64748B] mt-1 uppercase tracking-widest">Override routing rules and manually dispatch leads.</p>
                        </div>
                        <div className="relative w-full sm:w-auto">
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]" />
                            <input
                                type="text"
                                placeholder="Find leads..."
                                value={assignmentSearch}
                                onChange={(e) => setAssignmentSearch(e.target.value)}
                                className="pl-12 pr-6 py-3 bg-white/80 border border-[#DDE8E0] rounded-2xl text-xs font-black uppercase tracking-widest focus:ring-2 focus:ring-[#86D9A9]/30 outline-none w-full sm:w-64 transition-all text-[#26382E] placeholder:text-[#64748B]/60"
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto min-h-[400px]">
                        <table className="w-full min-w-[800px] text-left border-collapse">
                            <thead>
                                <tr className="bg-[#EDF8F0]/60 border-b border-[#DDE8E0]">
                                    <th className="px-4 md:px-8 py-5 font-black text-[#64748B] uppercase tracking-widest text-[9px] w-[25%]">Lead Profile</th>
                                    <th className="px-4 py-5 font-black text-[#64748B] uppercase tracking-widest text-[9px]">Current Status</th>
                                    <th className="px-4 py-5 font-black text-[#64748B] uppercase tracking-widest text-[9px]">Origin Source</th>
                                    <th className="px-4 py-5 font-black text-[#64748B] uppercase tracking-widest text-[9px] w-[20%]">AI Confidence</th>
                                    <th className="px-4 py-5 font-black text-[#64748B] uppercase tracking-widest text-[9px]">Target Deployment</th>
                                    <th className="px-8 py-5 text-right w-[15%]"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#DDE8E0]">
                                <AnimatePresence mode="popLayout">
                                    {filteredLeads.map((lead) => (
                                        <motion.tr
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            key={lead.id}
                                            className="hover:bg-[#F4FBF6] transition-all group"
                                        >
                                            <td className="px-4 md:px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-10 w-10 bg-[#DDF7E8] text-[#26382E] rounded-xl flex items-center justify-center font-black text-xs border border-[#A7E8C2] shrink-0">
                                                        {lead.name.charAt(0)}
                                                    </div>
                                                    <div className="flex flex-col gap-1 min-w-0">
                                                        <div className="font-black text-xs text-[#26382E] group-hover:text-[#86D9A9] transition-colors uppercase tracking-tight truncate">
                                                            {lead.name}
                                                        </div>
                                                        <div className="text-[9px] text-[#64748B] font-bold uppercase tracking-widest truncate">{lead.country}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-6">
                                                <span className={cn(
                                                    "text-[9px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-lg border",
                                                    lead.status === 'HOT' ? "bg-rose-50 text-rose-600 border-rose-100" :
                                                        lead.status === 'WARM' ? "bg-amber-50 text-amber-600 border-amber-100" :
                                                            "bg-[#DDF7E8] text-[#26382E] border-[#A7E8C2]"
                                                )}>
                                                    {lead.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-6">
                                                <span className="text-[10px] font-bold text-[#64748B] whitespace-nowrap">{lead.source}</span>
                                            </td>
                                            <td className="px-4 py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="font-black text-[11px] text-[#26382E] w-8">{lead.score}%</div>
                                                    <div className="flex-1 bg-[#EDF8F0] h-1.5 rounded-full overflow-hidden w-16">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${lead.score}%` }}
                                                            className={cn("h-full", lead.score > 80 ? 'bg-[#86D9A9]' : 'bg-amber-500')}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-6">
                                                <span className={cn(
                                                    "text-[9px] font-black uppercase tracking-widest whitespace-nowrap",
                                                    lead.assignedTo === 'PENDING' ? "text-amber-500 animate-pulse" : "text-[#26382E]"
                                                )}>
                                                    {lead.assignedTo}
                                                </span>
                                            </td>
                                            <td className="px-4 md:px-8 py-6 text-right">
                                                <button
                                                    onClick={() => setSelectedLead(lead)}
                                                    className="px-5 py-2.5 bg-[#EDF8F0] border border-[#DDE8E0] text-[#26382E] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#86D9A9] transition-all shadow-sm flex items-center gap-2 ml-auto shrink-0"
                                                >
                                                    <UserCheck size={14} /> Dispatch
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                                {filteredLeads.length === 0 && !isLoadingLeads && (
                                    <tr>
                                        <td colSpan={6} className="px-8 py-24 text-center">
                                            <div className="flex flex-col items-center justify-center opacity-40">
                                                <SearchSlash size={48} className="text-[#64748B] mb-4" />
                                                <p className="text-[#64748B] uppercase tracking-widest font-black text-xs">No leads requiring assignment.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modals */}
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
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="glass-card bg-white/95 rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl border border-[#DDE8E0] flex flex-col mx-2 sm:mx-auto max-h-[85vh] overflow-y-auto no-scrollbar"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-6 border-b border-[#DDE8E0] bg-[#EDF8F0]/80 flex justify-between items-center shrink-0">
                                <h2 className="text-lg font-black text-[#26382E] uppercase tracking-tight flex items-center gap-2">
                                    <AlertCircle size={18} className="text-[#86D9A9]" /> Force Direct Assignment
                                </h2>
                            </div>
                            <div className="p-6 space-y-5">
                                <div className="p-4 bg-[#F4FBF6] border border-[#DDE8E0] rounded-2xl flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] font-black text-[#64748B] uppercase tracking-widest mb-1">Target Identity</p>
                                        <p className="font-bold text-sm text-[#26382E]">{selectedLead.name}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-[#64748B] uppercase tracking-widest mb-1">Confidence</p>
                                        <p className="font-bold text-sm text-[#26382E]">{selectedLead.score || 0}%</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-[10px] font-black text-[#64748B] uppercase tracking-widest mb-1.5">Operational Division</label>
                                        <select
                                            value={assignmentData.team}
                                            onChange={(e) => setAssignmentData({ ...assignmentData, team: e.target.value })}
                                            className="w-full p-3 border border-[#DDE8E0] rounded-xl text-xs font-black uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-[#86D9A9]/30 shadow-sm appearance-none bg-white text-[#26382E]"
                                        >
                                            <option>Global Operations</option>
                                            <option>Admissions South</option>
                                            <option>Europe Direct</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-[#64748B] uppercase tracking-widest mb-1.5">Counselor Designation</label>
                                        <select
                                            value={assignmentData.counselorId}
                                            onChange={(e) => setAssignmentData({ ...assignmentData, counselorId: e.target.value })}
                                            className="w-full p-3 border border-[#DDE8E0] rounded-xl text-xs font-black uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-[#86D9A9]/30 shadow-sm appearance-none bg-white text-[#26382E]"
                                        >
                                            <option value="" disabled>Select Custodian...</option>
                                            {users.map(u => (
                                                <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-black text-[#64748B] uppercase tracking-widest mb-1.5">Escalation Priority</label>
                                        <div className="flex gap-2">
                                            {['High', 'Medium', 'Low'].map(p => (
                                                <button
                                                    key={p}
                                                    onClick={() => setAssignmentData({ ...assignmentData, priority: p })}
                                                    className={cn(
                                                        "flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all",
                                                        assignmentData.priority === p ? priorityColors[p] : "bg-white border-[#DDE8E0] text-[#64748B] hover:border-[#86D9A9]"
                                                    )}
                                                >
                                                    {p}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-3 justify-end pt-4">
                                    <button
                                        onClick={() => setSelectedLead(null)}
                                        className="px-5 py-2.5 text-[10px] font-bold text-[#64748B] uppercase tracking-widest hover:bg-[#EDF8F0] rounded-xl transition-colors"
                                    >
                                        Abort
                                    </button>
                                    <button
                                        onClick={handleConfirmDispatch}
                                        disabled={dispatchLead.isPending}
                                        className="px-5 py-2.5 bg-[#86D9A9] text-[#26382E] text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#A7E8C2] transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
                                    >
                                        Execute Transfer
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




