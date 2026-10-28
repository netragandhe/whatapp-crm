import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
    Target,
    Download,
    Clock,
    Filter,
    ChevronRight,
    ArrowRight,
    Users,
    RefreshCcw,
    CheckCircle
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { useManagerActions } from '../../hooks/useManagerActions'

const LeadFunnel = () => {
    const navigate = useNavigate()
    const { useFunnel, exportCsv, refreshData } = useManagerActions()
    const { data: funnel, isLoading } = useFunnel()
    const exportFunnel = exportCsv
    const refreshFunnel = refreshData

    if (isLoading) return (
        <div className="h-96 flex items-center justify-center">
            <RefreshCcw className="animate-spin text-[#86D9A9]" size={32} />
        </div>
    )

    const funnelData = funnel?.data || []

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-[#26382E] uppercase tracking-tighter">Lead <span className="text-[#26382E]">Funnel</span> Reports</h1>
                    <p className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em]">High-precision conversion monitoring and stage lifecycle analytics</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="glass-card bg-white/80 border border-[#DDE8E0] rounded-xl px-4 py-2.5 flex items-center gap-3 shadow-sm">
                        <Filter size={14} className="text-[#64748B]" />
                        <span className="text-[10px] font-black text-[#26382E] uppercase tracking-widest">Date / Country Filters</span>
                        <div className="h-4 w-[1px] bg-[#DDE8E0]" />
                        <span className="text-[9px] font-bold text-[#26382E] uppercase">Interactive Filter Suite</span>
                    </div>
                    <button
                        onClick={() => exportFunnel.mutate('funnel')}
                        disabled={exportFunnel.isPending}
                        className="bg-[#86D9A9] text-[#26382E] px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#A7E8C2] transition-all flex items-center gap-2 shadow-sm border border-[#86D9A9]"
                    >
                        {exportFunnel.isPending ? <RefreshCcw className="animate-spin" size={14} /> : <Download size={14} />}
                        Export CSV
                    </button>
                    <button
                        onClick={() => refreshFunnel.mutate('funnel')}
                        className="p-2.5 border border-[#DDE8E0] rounded-xl text-[#26382E] bg-white/80 hover:bg-[#DDF7E8] transition-all shadow-sm active:scale-95"
                    >
                        <RefreshCcw size={16} />
                    </button>
                </div>
            </div>

            {/* Funnel Layout (Simplified Table-Only per requirements) */}
            <section className="space-y-6">
                <div className="glass-card bg-white/80 rounded-[2.5rem] border border-[#DDE8E0] shadow-sm overflow-hidden overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-[#EDF8F0]/50">
                                <th className="px-8 py-6 font-black text-[#64748B] uppercase tracking-widest text-[9px]">Pipeline Stage</th>
                                <th className="px-8 py-6 font-black text-[#64748B] uppercase tracking-widest text-[9px]">Leads Count</th>
                                <th className="px-8 py-6 font-black text-[#64748B] uppercase tracking-widest text-[9px]">Stage Efficiency</th>
                                <th className="px-8 py-6 font-black text-[#64748B] uppercase tracking-widest text-[9px]">Assigned Cluster</th>
                                <th className="px-8 py-6 font-black text-[#64748B] uppercase tracking-widest text-[9px]">Avg Stage Velocity</th>
                                <th className="px-8 py-6 font-black text-[#64748B] uppercase tracking-widest text-[9px] text-right">Drill-Down</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#DDE8E0]/60">
                            {funnelData.map((stage, i) => (
                                <tr key={i} className="hover:bg-[#F4FBF6]/60 transition-all group">
                                    <td className="px-8 py-8">
                                        <div className="flex items-center gap-4">
                                            <div className={cn(
                                                "h-10 w-10 rounded-2xl flex items-center justify-center shadow-sm border",
                                                stage.stage === 'New' ? "bg-[#EDF8F0] text-[#26382E] border-[#DDE8E0]" :
                                                    stage.stage === 'Qualified' ? "bg-[#DDF7E8] text-[#26382E] border-[#86D9A9]" :
                                                        stage.stage === 'Converted' ? "bg-emerald-50 text-emerald-800 border-emerald-200" :
                                                            "bg-rose-50 text-rose-700 border-rose-200"
                                            )}>
                                                {stage.stage === 'New' ? <Users size={18} /> :
                                                    stage.stage === 'Qualified' ? <Target size={18} /> :
                                                        stage.stage === 'Converted' ? <ArrowRight size={18} /> :
                                                            <CheckCircle size={18} />}
                                            </div>
                                            <div className="space-y-1">
                                                <span className="text-xs font-black text-[#26382E] uppercase tracking-tight">{stage.stage}</span>
                                                <div className="flex items-center gap-1.5">
                                                    <div className="h-1.5 w-16 bg-[#EDF8F0] border border-[#DDE8E0] rounded-full overflow-hidden">
                                                        <div className="bg-[#86D9A9] h-full w-2/3" />
                                                    </div>
                                                    <span className="text-[8px] font-bold text-[#64748B]">STAGE {i + 1}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-8">
                                        <span className="text-sm font-black text-[#26382E] tracking-tight">{stage.count.toLocaleString()}</span>
                                    </td>
                                    <td className="px-8 py-8">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black text-[#26382E] italic">{stage.prevStagePct}</span>
                                            <span className="text-[9px] font-bold text-[#64748B] uppercase mt-0.5">From Previous</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-8">
                                        <span className="px-3 py-1 bg-[#EDF8F0] text-[#26382E] border border-[#DDE8E0] rounded-lg text-[9px] font-black uppercase tracking-widest">
                                            {stage.team}
                                        </span>
                                    </td>
                                    <td className="px-8 py-8">
                                        <div className="flex items-center gap-2">
                                            <Clock size={14} className="text-[#86D9A9]" />
                                            <span className="text-[11px] font-black text-[#26382E] uppercase italic">{stage.avgTime}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-8 text-right">
                                        <button 
                                            onClick={() => navigate('/admin/ai-config')}
                                            className="px-5 py-2.5 bg-white border border-[#DDE8E0] rounded-xl text-[9px] font-black uppercase tracking-widest text-[#26382E] hover:bg-[#DDF7E8] hover:border-[#86D9A9] transition-all shadow-sm active:scale-90"
                                        >
                                            Protocol View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="glass-card bg-gradient-to-br from-[#EDF8F0] to-[#DDF7E8] rounded-[2rem] border border-[#DDE8E0] p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                    <div className="space-y-2">
                        <h4 className="text-sm font-black text-[#26382E] uppercase tracking-tight">Autonomous Funnel Optimization</h4>
                        <p className="text-[10px] font-bold text-[#64748B] max-w-lg uppercase leading-relaxed">System has detected a 4.2% drop-off in the CONVERTED stage. Recommend increasing follow-up frequency for the Indian Admissions Team.</p>
                    </div>
                    <button 
                        onClick={() => refreshFunnel.mutate('optimization')}
                        className="px-6 py-3 bg-[#86D9A9] text-[#26382E] rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-sm hover:bg-[#A7E8C2] transition-all flex items-center gap-2 border border-[#86D9A9]"
                    >
                        Apply System Optimizations <ArrowRight size={14} />
                    </button>
                </div>
            </section>
        </div>
    )
}

export default LeadFunnel


