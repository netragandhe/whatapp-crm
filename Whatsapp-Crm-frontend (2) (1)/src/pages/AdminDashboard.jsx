import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Phone, Facebook, MousePointer2, ArrowUpRight, TrendingUp, RefreshCcw, Shield, Clock, Power, BrainCircuit } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '../lib/utils'
import { useQuery } from '@tanstack/react-query'
import { useAiActions, useAdminActions } from '../hooks/useCrmMutations'
import api from '../services/api'
import useAppStore from '../store/useStore'

const AdminKPICard = ({ title, value, icon: Icon, subValue, color, isRefetching, onClick }) => (
    <motion.div
        onClick={onClick}
        whileHover={{ y: -4, scale: 1.01 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn("glass-card p-6 md:p-8 rounded-[2rem] border border-[#DDE8E0] shadow-glass relative overflow-hidden group", onClick && "cursor-pointer")}
    >
        <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
                <div className={cn(
                    "p-4 rounded-2xl transition-all duration-300 group-hover:scale-105 shadow-sm",
                    color
                )}>
                    <Icon className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-2">
                    {isRefetching && <RefreshCcw size={12} className="text-emerald-700 animate-spin" />}
                    <span className="text-[10px] font-bold px-3 py-1.5 rounded-xl uppercase tracking-wider bg-[#EDF8F0] text-emerald-800 border border-[#DDE8E0]">
                        <TrendingUp size={10} className="inline mr-1" />
                        12%
                    </span>
                </div>
            </div>
            <div>
                <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-[0.25em] mb-1">{title}</p>
                <div className="flex items-baseline gap-2">
                    <h3 className="text-4xl font-black text-[#26382E] tracking-tight">{value}</h3>
                    {subValue && <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">{subValue}</span>}
                </div>
                <div className="mt-4 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#86D9A9] shadow-[0_0_8px_rgba(134,217,169,0.8)]" />
                    <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">Active Node</p>
                </div>
            </div>
        </div>
        
        {/* Decorative background watermark */}
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none text-[#86D9A9]">
            <Icon size={120} />
        </div>
    </motion.div>
)

const AdminDashboard = () => {
    const navigate = useNavigate()
    const { publishFlow } = useAiActions()
    const { executeAction } = useAdminActions()

    const { country, statusFilter, dateRange, searchTerm } = useAppStore()
    const { data: resp, isLoading, refetch, isRefetching } = useQuery({
        queryKey: ['admin-dashboard', country, statusFilter, dateRange, searchTerm],
        queryFn: async () => {
            const res = await api.get('/dashboard/admin', {
                params: { country, status: statusFilter, dateRange: dateRange.label, search: searchTerm }
            });
            return res.data || res;
        }
    })

    const dashboard = resp || {
        connectedWhatsapp: 0,
        facebookPages: 0,
        websiteLeads: 0,
        routingPreview: [],
        aiStatus: { enabled: false, lastUpdated: 'N/A' }
    }

    if (isLoading) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
                <div className="relative">
                    <div className="h-16 w-16 border-4 border-[#DDE8E0] border-t-[#86D9A9] rounded-full animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center font-bold text-xs text-[#26382E]">W</div>
                </div>
                <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-[0.3em] animate-pulse">Initializing Terminal...</p>
            </div>
        )
    }

    const kpis = [
        { title: 'Global WhatsApp Nodes', value: dashboard.connectedWhatsapp, subValue: 'Active', icon: Phone, color: 'bg-[#DDF7E8] text-[#26382E] border border-[#86D9A9]/40', onClick: () => navigate('/admin/channels') },
        { title: 'Social Distribution', value: dashboard.facebookPages, subValue: 'Connected', icon: Facebook, color: 'bg-[#EDF8F0] text-emerald-800 border border-[#86D9A9]/30', onClick: () => navigate('/admin/channels') },
        { title: 'Network Lead Influx', value: dashboard.websiteLeads, subValue: 'Total', icon: MousePointer2, color: 'bg-[#86D9A9]/30 text-[#26382E] border border-[#86D9A9]', onClick: () => navigate('/leads') },
    ]

    return (
        <div className="space-y-10 pb-20 max-w-7xl w-full min-w-0 mx-auto px-4 sm:px-0">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#86D9A9] shadow-[0_0_10px_rgba(134,217,169,0.5)]" />
                        <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-[0.3em]">Master Operations</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-[#26382E] tracking-tighter uppercase">Admin Console</h1>
                    <p className="text-sm font-medium text-[#64748B] mt-2 max-w-xl">Centralized node management and autonomous routing architecture synchronization.</p>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto mt-4 md:mt-0">
                    <button
                        onClick={() => refetch()}
                        disabled={isRefetching}
                        className="h-12 md:h-14 w-full sm:w-14 bg-white/80 backdrop-blur-md border border-[#DDE8E0] rounded-xl md:rounded-2xl flex items-center justify-center text-[#64748B] hover:text-[#26382E] hover:border-[#86D9A9] transition-all active:scale-95 group shrink-0 shadow-sm"
                    >
                        <RefreshCcw size={18} className={cn("transition-transform duration-700", isRefetching ? "animate-spin text-emerald-700" : "group-hover:rotate-180")} />
                        <span className="sm:hidden ml-2 text-[10px] font-bold uppercase tracking-widest">Refresh</span>
                    </button>
                    <button 
                        onClick={() => executeAction.mutate('deploy_master_command')}
                        disabled={executeAction.isPending}
                        className="h-12 md:h-14 bg-[#86D9A9] text-[#26382E] px-6 md:px-10 rounded-xl md:rounded-2xl font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em] hover:bg-[#A7E8C2] transition-all shadow-sm active:scale-95 flex items-center justify-center gap-3 md:gap-4 flex-1"
                    >
                        {executeAction.isPending && executeAction.variables === 'deploy_master_command' ? (
                            <RefreshCcw size={16} className="animate-spin" />
                        ) : (
                            <ArrowUpRight className="h-4 w-4" />
                        )}
                        <span>{executeAction.isPending && executeAction.variables === 'deploy_master_command' ? 'Deploying...' : 'Deploy Command'}</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {kpis.map((kpi, index) => (
                    <AdminKPICard key={index} {...kpi} isRefetching={isRefetching} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Routing Preview Table */}
                <div className="lg:col-span-8 bg-white/80 backdrop-blur-xl rounded-[2rem] border border-[#DDE8E0] shadow-glass overflow-hidden flex flex-col w-full min-w-0">
                    <div className="p-6 md:p-8 border-b border-[#DDE8E0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#F4FBF6]/60">
                        <div className="flex items-center gap-3 md:gap-4">
                            <div className="h-8 w-8 md:h-10 md:w-10 bg-white rounded-xl border border-[#DDE8E0] shadow-sm flex items-center justify-center text-emerald-700 shrink-0">
                                <Shield size={18} />
                            </div>
                            <div>
                                <h3 className="font-bold text-[#26382E] text-[10px] md:text-xs uppercase tracking-[0.2em] leading-tight">Matrix Distribution</h3>
                                <p className="text-[9px] md:text-[10px] font-bold text-[#64748B] mt-0.5 uppercase tracking-widest leading-none">Autonomous assignment protocol</p>
                            </div>
                        </div>
                        <span className="badge bg-[#DDF7E8] border border-[#86D9A9]/50 text-[#26382E] font-bold self-start sm:self-auto shrink-0 px-3 py-1 rounded-full text-[9px] tracking-widest uppercase">LIVE FEED</span>
                    </div>
                    <div className="overflow-x-auto custom-scrollbar w-full max-w-full">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                                <tr className="bg-[#EDF8F0]/50 text-[#64748B]">
                                    <th className="px-6 md:px-8 py-4 md:py-5 min-w-[150px] text-[10px] uppercase tracking-widest font-bold">Territory</th>
                                    <th className="px-6 md:px-8 py-4 md:py-5 min-w-[150px] text-[10px] uppercase tracking-widest font-bold">Core Target</th>
                                    <th className="px-6 md:px-8 py-4 md:py-5 min-w-[120px] text-[10px] uppercase tracking-widest font-bold">Mechanism</th>
                                    <th className="px-6 md:px-8 py-4 md:py-5 text-[10px] uppercase tracking-widest font-bold">State</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#DDE8E0]/40">
                                {dashboard.routingPreview.map((rule, idx) => (
                                    <tr key={idx} className="hover:bg-[#F4FBF6]/80 transition-all group">
                                        <td className="px-6 md:px-8 py-6 md:py-8">
                                            <div className="flex items-center gap-3 md:gap-4">
                                                <div className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-[#86D9A9] shadow-inner shrink-0" />
                                                <span className="font-bold text-[10px] md:text-xs text-[#26382E] uppercase tracking-tight leading-none truncate max-w-[100px] sm:max-w-none">{rule.country}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 md:px-8 py-6 md:py-8">
                                            <div className="flex flex-col gap-1 min-w-[100px]">
                                                <span className="text-[10px] md:text-[11px] font-bold text-[#26382E] uppercase tracking-tight leading-none truncate">{rule.team}</span>
                                                <span className="text-[8px] md:text-[9px] font-bold text-[#64748B] uppercase tracking-widest leading-none truncate">{rule.counselor}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 md:px-8 py-6 md:py-8">
                                            <span className="text-[8px] md:text-[9px] font-bold text-[#26382E] uppercase tracking-widest bg-[#DDF7E8] px-2 md:px-3 py-1 md:py-1.5 rounded-full border border-[#86D9A9]/50 whitespace-nowrap">
                                                {rule.type}
                                            </span>
                                        </td>
                                        <td className="px-6 md:px-8 py-6 md:py-8">
                                            <div className="flex items-center gap-2 md:gap-3">
                                                <div className={cn("h-1.5 w-1.5 md:h-2 md:w-2 rounded-full shrink-0", rule.status === 'Active' ? 'bg-[#86D9A9] shadow-[0_0_8px_rgba(134,217,169,0.8)]' : 'bg-slate-300')} />
                                                <span className={cn("text-[8px] md:text-[9px] font-bold uppercase tracking-widest leading-none whitespace-nowrap", rule.status === 'Active' ? 'text-emerald-700' : 'text-[#64748B]')}>
                                                    {rule.status}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* AI Bot Status Card */}
                <div className="lg:col-span-4 space-y-8">
                    <motion.div
                        className="bg-white/85 backdrop-blur-xl rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 text-[#26382E] relative overflow-hidden shadow-glass border border-[#DDE8E0]"
                    >
                        <div className="relative z-10">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 md:mb-12 gap-6">
                                <div className="h-12 w-12 md:h-14 md:w-14 bg-[#DDF7E8] rounded-2xl border border-[#86D9A9]/40 flex items-center justify-center shrink-0 text-emerald-800">
                                    <BrainCircuit size={28} />
                                </div>
                                <div className="flex flex-col items-start sm:items-end gap-2 w-full sm:w-auto">
                                    <div className="flex items-center gap-2 md:gap-3">
                                        <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] text-[#64748B]">System Pulse</span>
                                        <div className={cn("h-2 w-2 rounded-full", dashboard.aiStatus.enabled ? "bg-[#86D9A9] shadow-[0_0_10px_rgba(134,217,169,0.8)] animate-pulse" : "bg-rose-400")} />
                                    </div>
                                    <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.1em] text-emerald-700">{dashboard.aiStatus.enabled ? 'NEURAL ACTIVE' : 'SYSTEM IDLE'}</span>
                                </div>
                            </div>

                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight mb-2 md:mb-3 leading-tight text-[#26382E]">Artificial<br />Intelligence</h3>
                            <p className="text-[9px] md:text-[10px] font-bold text-[#64748B] leading-relaxed mb-8 md:mb-10 uppercase tracking-[0.2em] max-w-[200px] sm:max-w-none">Autonomous lead validation and qualification layer v4.2</p>

                            <div className="p-4 md:p-6 bg-[#F4FBF6] rounded-2xl border border-[#DDE8E0] mb-6 md:mb-8">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-emerald-700 border border-[#DDE8E0] shadow-sm">
                                            <Power size={16} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold uppercase tracking-widest text-[#26382E]">Master Override</span>
                                            <span className="text-[9px] font-bold text-[#64748B] uppercase tracking-widest leading-none mt-1">Core AI Control</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => publishFlow.mutate({ enabled: !dashboard.aiStatus.enabled })}
                                        className={cn(
                                            "relative inline-flex h-7 w-14 items-center rounded-full transition-all duration-300 ease-in-out border border-[#DDE8E0]",
                                            dashboard.aiStatus.enabled ? "bg-[#86D9A9]" : "bg-slate-200"
                                        )}
                                    >
                                        <motion.span 
                                            animate={{ x: dashboard.aiStatus.enabled ? 30 : 4 }}
                                            className="inline-block h-5 w-5 rounded-full bg-white shadow-md" 
                                        />
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-[10px] text-[#64748B] font-bold uppercase tracking-[0.15em]">
                                <Clock size={12} className="text-[#64748B]" />
                                <span>Last Synchronization: {dashboard.aiStatus.lastUpdated}</span>
                            </div>
                        </div>
                        <div className="absolute -top-10 -right-10 p-20 opacity-10 pointer-events-none text-[#86D9A9]">
                            <RefreshCcw size={240} className="animate-[spin_40s_linear_infinite]" />
                        </div>
                    </motion.div>

                    <div className="glass-card !p-8 md:!p-10 rounded-[2rem] border border-[#DDE8E0] shadow-glass">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="h-2 w-2 rounded-full bg-[#86D9A9]" />
                            <h4 className="font-bold text-[#26382E] text-[11px] uppercase tracking-[0.25em]">Maintenance Matrices</h4>
                        </div>
                        <div className="space-y-4">
                            {[
                                { id: 'cache', label: 'Force Cache Sync', icon: TrendingUp },
                                { id: 'logs', label: 'Export Operations Log', icon: MousePointer2 },
                                { id: 'health', label: 'Diagnostic Routine', icon: Shield }
                            ].map((action) => (
                                <button
                                    key={action.id}
                                    onClick={() => executeAction.mutate(action.id)}
                                    disabled={executeAction.isPending}
                                    className="w-full flex items-center justify-between p-5 bg-[#F4FBF6] rounded-2xl border border-[#DDE8E0] hover:border-[#86D9A9] hover:bg-white hover:shadow-sm transition-all group"
                                >
                                    <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest group-hover:text-[#26382E] transition-colors">
                                        {executeAction.isPending && executeAction.variables === action.id ? 'Routine Active...' : action.label}
                                    </span>
                                    {executeAction.isPending && executeAction.variables === action.id ? (
                                        <RefreshCcw size={14} className="animate-spin text-emerald-700" />
                                    ) : (
                                        <ArrowUpRight size={14} className="text-[#64748B] group-hover:text-[#26382E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
