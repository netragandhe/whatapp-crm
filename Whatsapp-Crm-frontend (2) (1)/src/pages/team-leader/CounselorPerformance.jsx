import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Target,
    Search,
    Filter,
    Clock,
    User,
    ChevronRight,
    RefreshCcw,
    X,
    TrendingUp,
    MessageSquare,
    Users
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { useTeamLeaderActions } from '../../hooks/useTeamLeaderActions'

const CounselorPerformance = () => {
    const navigate = useNavigate()
    const { usePerformance, refreshData } = useTeamLeaderActions()
    const { data: performance, isLoading } = usePerformance()

    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCounselor, setSelectedCounselor] = useState(null)

    if (isLoading) return (
        <div className="h-96 flex items-center justify-center">
            <RefreshCcw className="animate-spin text-[#86D9A9]" size={32} />
        </div>
    )

    const leaderboard = performance?.data || []
    const filteredLeaderboard = leaderboard.filter(c => {
        const counselorName = c.counselor || '';
        return counselorName.toLowerCase().includes(searchQuery.toLowerCase());
    })

    return (
        <div className="space-y-8 pb-16">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-[#26382E] tracking-tight">Counselor Performance</h1>
                    <p className="text-xs sm:text-sm font-medium text-[#64748B] mt-1">Counselor efficiency metrics, response speed, and conversion attribution.</p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => refreshData.mutate('performance')}
                        className="p-2.5 bg-white border border-[#DDE8E0] rounded-xl text-[#64748B] hover:text-[#26382E] hover:bg-[#DDF7E8] transition-all shadow-xs active:scale-95 flex items-center gap-2"
                        title="Refresh leaderboard"
                    >
                        <RefreshCcw size={15} className={refreshData.isPending ? "animate-spin" : ""} />
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <section className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="relative max-w-sm w-full">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" size={14} />
                        <input
                            type="text"
                            placeholder="Search counselor..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-white border border-[#DDE8E0] rounded-xl py-2 pl-9 pr-4 text-xs font-semibold text-[#26382E] w-full focus:outline-none focus:ring-2 focus:ring-[#86D9A9] shadow-xs transition-all"
                        />
                    </div>
                </div>

                <div className="glass-card bg-white/85 backdrop-blur-xl border border-[#DDE8E0] rounded-3xl overflow-hidden shadow-glass">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[750px]">
                            <thead>
                                <tr className="bg-[#EDF8F0]/70 border-b border-[#DDE8E0]">
                                    <th className="px-6 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Counselor Name</th>
                                    <th className="px-6 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Total Leads</th>
                                    <th className="px-6 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Replies Sent</th>
                                    <th className="px-6 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Conversions</th>
                                    <th className="px-6 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Avg Response Time</th>
                                    <th className="px-6 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Active Conv.</th>
                                    <th className="px-6 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px] text-right">Drill Down</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#DDE8E0]/60">
                                {filteredLeaderboard.map((perf, i) => (
                                    <tr key={i} className="hover:bg-[#F4FBF6] transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                    <div className="w-9 h-9 rounded-xl bg-[#DDF7E8] border border-[#A7E8C2]/60 flex items-center justify-center font-bold text-xs text-[#26382E]">
                                                        {perf.counselor.charAt(0)}
                                                    </div>
                                                    {i === 0 && (
                                                        <div className="absolute -top-1.5 -right-1.5 bg-[#86D9A9] text-[#26382E] w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black border border-white shadow-xs">
                                                            1
                                                        </div>
                                                    )}
                                                    {i === 1 && (
                                                        <div className="absolute -top-1.5 -right-1.5 bg-[#EDF8F0] text-[#26382E] w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black border border-[#DDE8E0] shadow-xs">
                                                            2
                                                        </div>
                                                    )}
                                                    {i === 2 && (
                                                        <div className="absolute -top-1.5 -right-1.5 bg-amber-100 text-amber-800 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black border border-white shadow-xs">
                                                            3
                                                        </div>
                                                    )}
                                                </div>
                                                <span className="text-xs font-bold text-[#26382E]">{perf.counselor}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-semibold text-[#64748B]">{perf.totalLeads}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 text-[#2E8456]">
                                                <MessageSquare size={13} />
                                                <span className="text-xs font-bold">{perf.replies}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 text-[#2E8456]">
                                                <TrendingUp size={13} />
                                                <span className="text-xs font-bold">{perf.conversions}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5">
                                                <Clock size={12} className="text-[#86D9A9]" />
                                                <span className={cn(
                                                    "text-xs font-semibold",
                                                    parseInt(perf.avgResponse) > 10 ? "text-rose-600" : "text-[#26382E]"
                                                )}>{perf.avgResponse}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-semibold text-[#64748B]">{perf.activeConv}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => setSelectedCounselor(perf)}
                                                className="w-7 h-7 rounded-xl bg-[#DDF7E8] border border-[#A7E8C2]/60 inline-flex items-center justify-center text-[#26382E] shadow-2xs transition-all hover:bg-[#86D9A9]"
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

            {/* Counselor Detail Drawer */}
            <AnimatePresence>
                {selectedCounselor && (
                    <div className="fixed inset-0 z-[100] flex items-stretch justify-end">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedCounselor(null)}
                            className="absolute inset-0 bg-[#26382E]/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ x: '100%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: '100%', opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="glass-card bg-white/95 backdrop-blur-2xl w-full max-w-md relative z-10 shadow-glass-lg border-l border-[#DDE8E0] flex flex-col h-full"
                        >
                            <div className="p-6 border-b border-[#DDE8E0] flex items-start justify-between bg-[#EDF8F0]/60">
                                <div className="flex items-center gap-3.5">
                                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#86D9A9] to-[#A7E8C2] text-[#26382E] flex items-center justify-center font-black text-base shadow-sm">
                                        {selectedCounselor.counselor.charAt(0)}
                                    </div>
                                    <div className="space-y-0.5">
                                        <h3 className="text-lg font-black text-[#26382E] tracking-tight">{selectedCounselor.counselor}</h3>
                                        <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider flex items-center gap-1">
                                            <Target size={11} className="text-[#2E8456]" /> Active Counselor
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedCounselor(null)}
                                    className="p-1.5 bg-white border border-[#DDE8E0] text-[#64748B] hover:text-[#26382E] rounded-xl transition-all shadow-xs"
                                >
                                    <X size={15} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {/* SLA Performance Widget */}
                                <div className="space-y-2.5">
                                    <h4 className="text-xs font-black text-[#26382E] uppercase tracking-wider">SLA Compliance Overview</h4>
                                    <div className="glass-card bg-white/85 border border-[#DDE8E0] rounded-2xl p-4 grid grid-cols-2 gap-3.5 shadow-2xs">
                                        <div className="space-y-0.5">
                                            <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Avg Response</p>
                                            <p className={cn(
                                                "text-base font-black",
                                                parseInt(selectedCounselor.avgResponse) > 10 ? "text-rose-600" : "text-[#2E8456]"
                                            )}>{selectedCounselor.avgResponse}</p>
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Resolution Rate</p>
                                            <p className="text-base font-black text-[#26382E]">94.2%</p>
                                        </div>
                                        <div className="col-span-2 pt-2.5 border-t border-[#DDE8E0]">
                                            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider mb-1">
                                                <span className="text-[#64748B]">Target Match</span>
                                                <span className="text-[#2E8456]">85%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-[#EDF8F0] rounded-full overflow-hidden">
                                                <div className="h-full bg-[#86D9A9] w-[85%]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Mock Assigned Leads List */}
                                <div className="space-y-2.5">
                                    <h4 className="text-xs font-black text-[#26382E] uppercase tracking-wider">Recent Assigned Leads</h4>
                                    <div className="space-y-2">
                                        {[1, 2, 3].map((_, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-3 bg-white/80 rounded-xl border border-[#DDE8E0]">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="p-1.5 bg-[#EDF8F0] rounded-lg text-[#26382E]">
                                                        <User size={13} />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold text-[#26382E]">Lead #{1045 + idx}</p>
                                                        <p className="text-[10px] text-[#64748B]">Assigned 2h ago</p>
                                                    </div>
                                                </div>
                                                <span className="px-2 py-0.5 bg-[#DDF7E8] border border-[#A7E8C2] rounded-full text-[10px] font-bold text-[#26382E]">
                                                    Active
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <button 
                                        onClick={() => navigate('/team-leader/leads')}
                                        className="w-full py-2.5 text-xs font-bold text-[#2E8456] hover:underline flex items-center justify-center gap-1"
                                    >
                                        View All {selectedCounselor.totalLeads} Leads <ChevronRight size={13} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default CounselorPerformance
