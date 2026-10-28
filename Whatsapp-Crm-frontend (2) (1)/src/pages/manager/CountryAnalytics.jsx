import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Globe,
    ChevronRight,
    Search,
    Filter,
    Activity,
    Users,
    Target,
    CheckCircle,
    XCircle,
    RefreshCcw,
    Layout
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { useManagerActions } from '../../hooks/useManagerActions'

const MetricMiniCard = ({ label, value, color }) => (
    <div className="bg-white/90 border border-[#DDE8E0] p-4 rounded-2xl shadow-sm space-y-1">
        <p className="text-[8px] font-black text-[#64748B] uppercase tracking-widest leading-none">{label}</p>
        <p className={cn("text-lg font-black leading-none", color)}>{value}</p>
    </div>
)

const CountryAnalytics = () => {
    const { useCountryAnalytics, exportCsv, refreshData } = useManagerActions()
    const { data: analytics, isLoading } = useCountryAnalytics()
    const [searchCountry, setSearchCountry] = useState('')
    const [selectedCountry, setSelectedCountry] = useState(null)

    if (isLoading) return (
        <div className="h-96 flex items-center justify-center">
            <RefreshCcw className="animate-spin text-[#86D9A9]" size={32} />
        </div>
    )

    const analyticsData = analytics?.data || []
    const filteredAnalytics = analyticsData.filter(c =>
        c.country.toLowerCase().includes(searchCountry.toLowerCase())
    )

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-[#26382E] uppercase tracking-tighter">Country <span className="text-[#26382E]">Analytics</span></h1>
                    <p className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em]">Global territory distribution and regional conversion benchmarks</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="glass-card bg-white/80 border border-[#DDE8E0] rounded-xl px-4 py-2.5 flex items-center gap-3 shadow-sm">
                        <Filter size={14} className="text-[#64748B]" />
                        <span className="text-[10px] font-black text-[#26382E] uppercase tracking-widest">Territory Cluster</span>
                        <div className="h-4 w-[1px] bg-[#DDE8E0]" />
                        <span className="text-[9px] font-bold text-[#26382E] uppercase">Interactive Filters</span>
                    </div>
                    <button
                        onClick={() => refreshData.mutate('country')}
                        className="p-2.5 border border-[#DDE8E0] rounded-xl text-[#26382E] bg-white/80 hover:bg-[#DDF7E8] transition-all shadow-sm active:scale-95"
                    >
                        <RefreshCcw size={16} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Main Table */}
                <section className={cn(
                    "space-y-6 transition-all duration-500",
                    selectedCountry ? "lg:col-span-12 xl:col-span-7" : "lg:col-span-12"
                )}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="relative group flex-1 max-w-sm">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] group-focus-within:text-[#86D9A9] transition-colors" size={14} />
                            <input
                                type="text"
                                placeholder="IDENTIFY COUNTRY..."
                                value={searchCountry}
                                onChange={(e) => setSearchCountry(e.target.value)}
                                className="bg-white border border-[#DDE8E0] rounded-xl py-3 pl-11 pr-4 text-[10px] font-black uppercase tracking-widest w-full text-[#26382E] focus:ring-2 focus:ring-[#86D9A9]/20 focus:border-[#86D9A9] outline-none shadow-inner"
                            />
                        </div>
                    </div>

                    <div className="glass-card bg-white/80 rounded-[2.5rem] border border-[#DDE8E0] shadow-sm overflow-hidden overflow-x-auto no-scrollbar">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                                <tr className="bg-[#EDF8F0]/50">
                                    <th className="px-8 py-5 font-black text-[#64748B] uppercase tracking-widest text-[9px]">Country Identity</th>
                                    <th className="px-8 py-5 font-black text-[#64748B] uppercase tracking-widest text-[9px]">Total Leads</th>
                                    <th className="px-8 py-5 font-black text-[#64748B] uppercase tracking-widest text-[9px]">Qualified</th>
                                    <th className="px-8 py-5 font-black text-[#64748B] uppercase tracking-widest text-[9px]">Converted</th>
                                    <th className="px-8 py-5 font-black text-[#64748B] uppercase tracking-widest text-[9px]">Lost</th>
                                    <th className="px-8 py-5 font-black text-[#64748B] uppercase tracking-widest text-[9px]">Conversion %</th>
                                    <th className="px-4 py-5 font-black text-[#64748B] uppercase tracking-widest text-[9px] text-right">View</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#DDE8E0]/60">
                                {filteredAnalytics.map((c, i) => (
                                    <tr
                                        key={i}
                                        onClick={() => setSelectedCountry(c)}
                                        className={cn(
                                            "transition-all cursor-pointer group",
                                            selectedCountry?.country === c.country ? "bg-[#DDF7E8]/50" : "hover:bg-[#F4FBF6]/60"
                                        )}
                                    >
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <Globe size={16} className="text-[#86D9A9] group-hover:scale-110 transition-transform" />
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-black text-[#26382E] uppercase tracking-tight">{c.country}</span>
                                                    <span className="text-[8px] font-bold text-[#64748B] uppercase mt-0.5">Top Team: {c.topTeam}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-[11px] font-black text-[#26382E]">{c.total.toLocaleString()}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-[11px] font-black text-emerald-700">{c.qualified.toLocaleString()}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-[11px] font-black text-teal-700">{c.converted.toLocaleString()}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-[11px] font-black text-rose-600">{c.lost.toLocaleString()}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <div className="h-1.5 w-12 bg-[#EDF8F0] border border-[#DDE8E0] rounded-full overflow-hidden">
                                                    <div className="bg-[#86D9A9] h-full" style={{ width: c.conversion }} />
                                                </div>
                                                <span className="text-[10px] font-black text-[#26382E] italic">{c.conversion}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-6 text-right">
                                            <div className="w-8 h-8 shrink-0 rounded-full bg-[#EDF8F0] border border-[#DDE8E0] flex items-center justify-center text-[#26382E] shadow-sm transition-all hover:bg-[#DDF7E8] hover:scale-110">
                                                <ChevronRight size={14} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Country Detail Section (Appears when row clicked) */}
                <AnimatePresence>
                    {selectedCountry && (
                        <motion.section
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="lg:col-span-12 xl:col-span-5 space-y-6"
                        >
                            <div className="glass-card bg-gradient-to-br from-[#EDF8F0] to-[#DDF7E8] rounded-[2.5rem] p-8 text-[#26382E] relative overflow-hidden shadow-sm border border-[#DDE8E0]">
                                {/* Decor */}
                                <Globe className="absolute -right-8 -top-8 text-[#86D9A9]/10" size={240} strokeWidth={1} />

                                <div className="relative z-10 space-y-8">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <h2 className="text-2xl font-black uppercase tracking-tighter text-[#26382E]">{selectedCountry.country}</h2>
                                            <p className="text-[9px] font-black text-[#64748B] uppercase tracking-[0.2em]">Detailed Territory Protocol Breakdown</p>
                                        </div>
                                        <button
                                            onClick={() => setSelectedCountry(null)}
                                            className="p-2 bg-white/80 hover:bg-white text-[#26382E] border border-[#DDE8E0] rounded-xl transition-all shadow-sm"
                                        >
                                            <XCircle size={18} />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <MetricMiniCard label="Territory Conversion" value={selectedCountry.conversion} color="text-[#26382E]" />
                                        <MetricMiniCard label="Qualified Rank" value="#04 Global" color="text-emerald-700" />
                                    </div>

                                    <div className="space-y-6 pb-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#64748B]">Performance Snapshot</span>
                                            <div className="h-[1px] flex-1 bg-[#DDE8E0] mx-4" />
                                            <Activity size={14} className="text-[#86D9A9]" />
                                        </div>

                                        <div className="space-y-4">
                                            {[
                                                { label: 'Avg Counselor SLA', val: '2.4 mins', icon: Target },
                                                { label: 'Peak Traffic Time', val: '14:00 - 18:00', icon: Layout },
                                                { label: 'Top Team Density', val: '12 Agents', icon: Users },
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-center justify-between p-4 bg-white/80 rounded-2xl border border-[#DDE8E0] hover:bg-white transition-all group shadow-sm">
                                                    <div className="flex items-center gap-3">
                                                        <item.icon size={16} className="text-[#86D9A9] group-hover:scale-110 transition-transform" />
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-[#26382E]">{item.label}</span>
                                                    </div>
                                                    <span className="text-xs font-black italic text-[#26382E]">{item.val}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => exportCsv.mutate('territory')}
                                        disabled={exportCsv.isPending}
                                        className="w-full bg-[#86D9A9] text-[#26382E] py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-[#A7E8C2] transition-all shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {exportCsv.isPending ? <RefreshCcw size={14} className="animate-spin" /> : null}
                                        Extract Territory Dataset
                                    </button>
                                </div>
                            </div>
                        </motion.section>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default CountryAnalytics


