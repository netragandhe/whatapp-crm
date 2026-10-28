import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Users,
    Target,
    CheckCircle,
    GraduationCap,
    RefreshCcw,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    Globe,
    ChevronRight,
    Filter
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { useManagerActions } from '../../hooks/useManagerActions'
import useAppStore from '../../store/useStore'

const KpiCard = ({ title, value, subText, icon: Icon, color, onRefresh }) => (
    <motion.div
        whileHover={{ y: -4 }}
        className="glass-card bg-white/85 backdrop-blur-xl p-5 rounded-3xl border border-[#DDE8E0] shadow-sm space-y-3 group"
    >
        <div className="flex items-center justify-between">
            <div className={cn("p-2.5 rounded-xl border", color)}>
                <Icon size={18} className="text-current" />
            </div>
            <button
                onClick={onRefresh}
                className="p-1.5 text-[#64748B] hover:text-[#26382E] hover:bg-[#DDF7E8] bg-[#EDF8F0] border border-[#DDE8E0] rounded-lg transition-all"
                title="Refresh metric"
            >
                <RefreshCcw size={13} />
            </button>
        </div>
        <div>
            <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">{title}</p>
            <div className="flex items-end gap-2 mt-0.5">
                <h3 className="text-2xl sm:text-3xl font-black text-[#26382E] tracking-tight">{value}</h3>
                <div className={cn(
                    "flex items-center gap-0.5 text-xs font-bold pb-1",
                    subText?.startsWith('+') ? "text-[#2E8456]" : "text-rose-600"
                )}>
                    {subText?.startsWith('+') ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {subText?.replace('+', '').replace('-', '')}
                </div>
            </div>
        </div>
    </motion.div>
)

const ManagerDashboard = () => {
    const { useDashboard, refreshData } = useManagerActions()
    const { data: dashboard, isLoading } = useDashboard()
    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate()

    if (isLoading) return (
        <div className="h-96 flex items-center justify-center">
            <RefreshCcw className="animate-spin text-[#86D9A9]" size={32} />
        </div>
    )

    const { kpis, funnelSummary, countryPerformance } = dashboard?.data || {}

    const filteredCountries = countryPerformance?.filter(c =>
        c.country.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-8 pb-16">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-[#26382E] tracking-tight">Manager Dashboard</h1>
                    <p className="text-xs sm:text-sm font-medium text-[#64748B] mt-1">Operational performance and conversion telemetry.</p>
                </div>

                <div className="flex items-center gap-2">
                    <div className="glass-card bg-white/90 border border-[#DDE8E0] rounded-xl px-3.5 py-2 flex items-center gap-2.5 shadow-xs">
                        <Filter size={13} className="text-[#86D9A9]" />
                        <span className="text-xs font-bold text-[#26382E]">Active Pipeline</span>
                        <div className="h-3.5 w-[1px] bg-[#DDE8E0]" />
                        <span className="text-[10px] font-bold text-[#2E8456] uppercase">Real-Time</span>
                    </div>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {kpis?.map((kpi, i) => (
                    <KpiCard
                        key={i}
                        {...kpi}
                        icon={
                            kpi.type === 'leads_today' ? Users :
                                kpi.type === 'qualified_today' ? Target :
                                    kpi.type === 'converted_today' ? GraduationCap :
                                        CheckCircle
                        }
                        color={
                            kpi.type === 'leads_today' ? 'bg-[#DDF7E8] text-[#26382E] border-[#A7E8C2]/60' :
                                kpi.type === 'qualified_today' ? 'bg-[#DDF7E8] text-[#2E8456] border-[#A7E8C2]/60' :
                                    kpi.type === 'converted_today' ? 'bg-[#EDF8F0] text-[#26382E] border-[#DDE8E0]' :
                                        'bg-rose-50 text-rose-600 border-rose-200'
                        }
                        onRefresh={() => refreshData.mutate('dashboard')}
                    />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Lead Funnel Summary */}
                <section className="lg:col-span-5 space-y-4">
                    <div>
                        <h2 className="text-sm font-black text-[#26382E] uppercase tracking-wider flex items-center gap-2">
                            <Target className="text-[#2E8456]" size={16} />
                            Funnel Summary
                        </h2>
                        <p className="text-[11px] font-medium text-[#64748B] mt-0.5">Aggregate stage conversion highlights</p>
                    </div>

                    <div className="glass-card bg-white/85 backdrop-blur-xl rounded-3xl border border-[#DDE8E0] shadow-sm overflow-hidden flex flex-col">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[340px]">
                                <thead>
                                    <tr className="bg-[#EDF8F0]/70 border-b border-[#DDE8E0]">
                                        <th className="px-6 py-3.5 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Stage</th>
                                        <th className="px-6 py-3.5 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Count</th>
                                        <th className="px-6 py-3.5 font-black text-[#26382E] uppercase tracking-wider text-[10px] text-right">Conv. Rate</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#DDE8E0]/60">
                                    {funnelSummary?.map((item, i) => (
                                        <tr key={i} className="hover:bg-[#F4FBF6] transition-colors cursor-pointer group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2.5">
                                                    <div className={cn(
                                                        "w-2 h-2 rounded-full",
                                                        item.stage === 'New' ? 'bg-[#86D9A9]' :
                                                            item.stage === 'Qualified' ? 'bg-[#2E8456]' :
                                                                item.stage === 'Converted' ? 'bg-[#3B82F6]' : 'bg-rose-400'
                                                    )} />
                                                    <span className="text-xs font-bold text-[#26382E]">{item.stage}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-xs font-semibold text-[#64748B]">{item.total.toLocaleString()}</span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex flex-col items-end">
                                                    <span className="text-xs font-bold text-[#2E8456]">{item.conversion}</span>
                                                    <span className="text-[10px] font-medium text-[#94A3B8]">Drop: {item.dropoff}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <button 
                            onClick={() => navigate('/manager/funnel')}
                            className="w-full py-3 bg-[#EDF8F0]/50 hover:bg-[#DDF7E8] text-[10px] font-bold text-[#26382E] uppercase tracking-wider transition-all border-t border-[#DDE8E0]"
                        >
                            Drill Down Into Funnel Logistics
                        </button>
                    </div>
                </section>

                {/* Country Performance Table */}
                <section className="lg:col-span-7 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                            <h2 className="text-sm font-black text-[#26382E] uppercase tracking-wider flex items-center gap-2">
                                <Globe className="text-[#2E8456]" size={16} />
                                Regional Performance
                            </h2>
                            <p className="text-[11px] font-medium text-[#64748B] mt-0.5">Leads and conversion metrics by territory</p>
                        </div>
                        <div className="relative">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" size={14} />
                            <input
                                type="text"
                                placeholder="Search territory..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-white border border-[#DDE8E0] rounded-xl py-2 pl-9 pr-4 text-xs font-semibold text-[#26382E] w-full sm:w-56 focus:outline-none focus:ring-2 focus:ring-[#86D9A9]"
                            />
                        </div>
                    </div>

                    <div className="glass-card bg-white/85 backdrop-blur-xl rounded-3xl border border-[#DDE8E0] shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[650px]">
                                <thead>
                                    <tr className="bg-[#EDF8F0]/70 border-b border-[#DDE8E0]">
                                        <th className="px-6 py-3.5 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Country</th>
                                        <th className="px-6 py-3.5 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Leads</th>
                                        <th className="px-6 py-3.5 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Converted</th>
                                        <th className="px-6 py-3.5 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Enrolled</th>
                                        <th className="px-6 py-3.5 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Response</th>
                                        <th className="px-6 py-3.5 font-black text-[#26382E] uppercase tracking-wider text-[10px] text-right">View</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#DDE8E0]/60">
                                    {filteredCountries?.map((c, i) => (
                                        <tr key={i} className="hover:bg-[#F4FBF6] transition-colors group">
                                            <td className="px-6 py-4">
                                                <span className="text-xs font-bold text-[#26382E]">{c.country}</span>
                                                <div className="text-[10px] text-[#64748B]">{c.teams} Active Teams</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-xs font-semibold text-[#64748B]">{c.leads}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-xs font-bold text-[#26382E]">{c.converted}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-xs font-bold text-[#2E8456]">{c.enrolled}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-1.5 w-12 bg-[#EDF8F0] rounded-full overflow-hidden">
                                                        <div className="bg-[#86D9A9] h-full w-2/3" />
                                                    </div>
                                                    <span className="text-[10px] font-semibold text-[#64748B]">{c.responseTime}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button 
                                                    onClick={() => navigate('/manager/country')}
                                                    className="w-7 h-7 rounded-xl bg-[#DDF7E8] border border-[#A7E8C2]/60 flex items-center justify-center text-[#26382E] shadow-2xs transition-all hover:bg-[#86D9A9]"
                                                >
                                                    <ChevronRight size={13} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default ManagerDashboard
