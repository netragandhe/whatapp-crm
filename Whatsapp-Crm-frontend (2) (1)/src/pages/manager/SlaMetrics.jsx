import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Clock,
    AlertTriangle,
    CheckCircle2,
    Filter,
    Search,
    ChevronRight,
    Activity,
    ShieldCheck,
    RefreshCcw,
    MousePointer2
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '../../lib/utils'
import { useManagerActions } from '../../hooks/useManagerActions'

const SlaMetrics = () => {
    const navigate = useNavigate()
    const { useSlaMetrics, refreshData } = useManagerActions()
    const { data: sla, isLoading } = useSlaMetrics()
    const [searchTeam, setSearchTeam] = useState('')
    const [selectedTeam, setSelectedTeam] = useState(null)

    if (isLoading) return (
        <div className="h-96 flex items-center justify-center">
            <RefreshCcw className="animate-spin text-[#86D9A9]" size={32} />
        </div>
    )

    const slaData = sla?.data || []
    const filteredSla = slaData.filter(t =>
        t.team.toLowerCase().includes(searchTeam.toLowerCase())
    )

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-2xl sm:text-3xl font-black text-[#26382E] uppercase tracking-tighter">SLA <span className="text-[#26382E]">Metrics</span></h1>
                    <p className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em] leading-relaxed">Team-level response integrity and compliance orchestration</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="glass-card bg-white/80 border border-[#DDE8E0] rounded-xl px-4 py-2.5 flex items-center gap-3 shadow-sm w-full sm:w-auto overflow-x-auto no-scrollbar">
                        <Filter size={14} className="text-[#64748B] shrink-0" />
                        <span className="text-[10px] font-black text-[#26382E] uppercase tracking-widest shrink-0">Team / Time Range</span>
                        <div className="h-4 w-[1px] bg-[#DDE8E0] shrink-0" />
                        <span className="text-[9px] font-bold text-[#26382E] uppercase shrink-0">Interactive SLA Suite</span>
                    </div>
                    <button
                        onClick={() => refreshData.mutate('sla')}
                        className="p-2.5 border border-[#DDE8E0] rounded-xl text-[#26382E] bg-white/80 hover:bg-[#DDF7E8] transition-all shadow-sm active:scale-95 shrink-0"
                    >
                        <RefreshCcw size={16} />
                    </button>
                </div>
            </div>

            {/* SLA Table */}
            <section className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="relative group flex-1 max-w-sm">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] group-focus-within:text-[#86D9A9] transition-colors" size={14} />
                        <input
                            type="text"
                            placeholder="SEARCH TEAM CLUSTER..."
                            value={searchTeam}
                            onChange={(e) => setSearchTeam(e.target.value)}
                            className="bg-white border border-[#DDE8E0] rounded-xl py-3 pl-11 pr-4 text-[10px] font-black uppercase tracking-widest w-full text-[#26382E] focus:ring-2 focus:ring-[#86D9A9]/20 focus:border-[#86D9A9] outline-none shadow-inner"
                        />
                    </div>
                </div>

                <div className="glass-card bg-white/80 rounded-[1.5rem] sm:rounded-[2.5rem] border border-[#DDE8E0] shadow-sm overflow-hidden block w-full relative">
                    <div className="overflow-x-auto w-full no-scrollbar pb-2">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-[#EDF8F0]/50">
                                <th className="px-8 py-5 font-black text-[#64748B] uppercase tracking-widest text-[9px]">Operational Team</th>
                                <th className="px-8 py-5 font-black text-[#64748B] uppercase tracking-widest text-[9px]">Avg 1st Response</th>
                                <th className="px-8 py-5 font-black text-[#64748B] uppercase tracking-widest text-[9px]">Resolution Time</th>
                                <th className="px-8 py-5 font-black text-[#64748B] uppercase tracking-widest text-[9px]">SLA Breaches</th>
                                <th className="px-8 py-5 font-black text-[#64748B] uppercase tracking-widest text-[9px]">Compliance Rate</th>
                                <th className="px-8 py-5 font-black text-[#64748B] uppercase tracking-widest text-[9px] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#DDE8E0]/60">
                            {filteredSla.map((team, i) => (
                                <tr key={i} className="hover:bg-[#F4FBF6]/60 transition-all group">
                                    <td className="px-8 py-7">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-xl bg-[#DDF7E8] text-[#26382E] border border-[#86D9A9] flex items-center justify-center font-black text-[10px]">
                                                {team.team.charAt(0)}
                                            </div>
                                            <span className="text-xs font-black text-[#26382E] uppercase tracking-tight">{team.team}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-7">
                                        <div className="flex items-center gap-2">
                                            <Clock size={14} className="text-[#86D9A9]" />
                                            <span className="text-[11px] font-black text-[#26382E] italic tracking-tight">{team.avgFirstResponse}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-7">
                                        <span className="text-[11px] font-black text-[#26382E] italic tracking-tight">{team.avgResolution}</span>
                                    </td>
                                    <td className="px-8 py-7">
                                        <div className="flex items-center gap-3">
                                            <span className={cn(
                                                "text-[10px] font-black px-2 py-0.5 rounded-md border",
                                                team.breaches > 10 ? "bg-rose-50 text-rose-600 border-rose-100" : "bg-[#EDF8F0] text-[#26382E] border-[#DDE8E0]"
                                            )}>
                                                {team.breaches} Breaches
                                            </span>
                                            {team.breaches > 10 && <AlertTriangle size={14} className="text-rose-500 animate-pulse" />}
                                        </div>
                                    </td>
                                    <td className="px-8 py-7">
                                        <div className="flex items-center gap-3">
                                            <div className="h-1.5 w-24 bg-[#EDF8F0] border border-[#DDE8E0] rounded-full overflow-hidden shadow-inner">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: team.compliance }}
                                                    className={cn(
                                                        "h-full rounded-full transition-all duration-1000",
                                                        parseFloat(team.compliance) > 95 ? "bg-[#86D9A9]" : "bg-amber-500"
                                                    )}
                                                />
                                            </div>
                                            <span className="text-[10px] font-black text-[#26382E]">{team.compliance}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-7 text-right">
                                        <button 
                                            onClick={() => navigate('/team-leader/logs')}
                                            className="px-5 py-2.5 bg-white border border-[#DDE8E0] rounded-xl text-[9px] font-black uppercase tracking-widest text-[#26382E] hover:bg-[#DDF7E8] hover:border-[#86D9A9] transition-all shadow-sm active:scale-90 flex items-center gap-2 ml-auto group-hover:scale-105 shrink-0 whitespace-nowrap"
                                        >
                                            Logs <ChevronRight size={12} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                </div>

                {/* Insight Card */}
                <div className="glass-card bg-gradient-to-br from-[#EDF8F0] to-[#DDF7E8] rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-10 text-[#26382E] flex flex-col items-center text-center space-y-4 sm:space-y-6 relative overflow-hidden border border-[#DDE8E0] shadow-sm">
                    <ShieldCheck className="absolute -left-10 -top-10 text-[#86D9A9]/10" size={200} />
                    <div className="relative z-10 space-y-2">
                        <div className="flex items-center justify-center gap-2 text-emerald-800">
                            <CheckCircle2 size={16} />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed">Global SLA Health: Stable</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-black uppercase tracking-tighter max-w-xl leading-snug text-[#26382E]">
                            "Compliance has increased by <span className="text-emerald-700">2.8%</span> since the implementation of AI-driven lead routing."
                        </h3>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SlaMetrics


