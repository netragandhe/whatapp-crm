import React from 'react'
import { Filter, Search, ChevronDown, CheckCircle, TrendingUp, Inbox, Target, Zap, RefreshCcw, BarChart3, Users2, Timer } from 'lucide-react'
import { cn } from '../../lib/utils'
import { useQuery } from '@tanstack/react-query'
import api from '../../services/api'
import { motion } from 'framer-motion'
import useAppStore from '../../store/useStore'

const SummaryTable = ({ title, icon: Icon, color, headers, data, isLoading }) => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card bg-white/85 backdrop-blur-xl rounded-3xl border border-[#DDE8E0] shadow-glass flex flex-col overflow-hidden">
        <div className="p-5 md:p-6 border-b border-[#DDE8E0] bg-[#EDF8F0]/50 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
                <div className={cn("p-2.5 rounded-2xl border shadow-sm", color)}>
                    <Icon size={18} />
                </div>
                <div>
                    <h3 className="font-black text-[#26382E] text-sm tracking-tight">{title}</h3>
                    <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mt-0.5">Global Cluster Analytics</p>
                </div>
            </div>
            {isLoading && <RefreshCcw size={14} className="text-[#86D9A9] animate-spin" />}
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs min-w-[500px]">
                <thead>
                    <tr className="bg-[#EDF8F0]/70 border-b border-[#DDE8E0]">
                        {headers.map((h, i) => (
                            <th key={i} className="px-6 py-3.5 font-black text-[#26382E] uppercase tracking-wider text-[10px]">{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#DDE8E0]/60">
                    {isLoading ? (
                        Array.from({ length: 3 }).map((_, i) => (
                            <tr key={i} className="animate-pulse">
                                {headers.map((_, j) => (
                                    <td key={j} className="px-6 py-5">
                                        <div className="h-4 bg-[#EDF8F0] rounded-lg w-full" />
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        data.map((row, i) => (
                            <tr key={i} className="hover:bg-[#F4FBF6] transition-colors group">
                                {Object.values(row).map((val, j) => (
                                    <td key={j} className={cn("px-6 py-4.5 transition-colors", j === 0 ? "font-bold text-[#26382E] group-hover:text-[#2E8456]" : "text-[#64748B] font-semibold")}>
                                        {j === 0 ? val : (
                                            <span className="tabular-nums">{val}</span>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    </motion.div>
)

const SystemAnalytics = () => {
    const { country, statusFilter, teamMember, dateRange } = useAppStore()

    const { data: analytics, isLoading, refetch, isFetching } = useQuery({
        queryKey: ['system-analytics', country, statusFilter, teamMember, dateRange?.label],
        queryFn: () => api.get('/analytics/summary', {
            params: {
                country,
                status: statusFilter,
                operator: teamMember,
                dateLabel: dateRange?.label
            }
        }).then(res => res.data)
    })

    return (
        <div className="space-y-8 pb-16">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-[#26382E] tracking-tight">Analytical Command</h1>
                    <p className="text-xs sm:text-sm font-medium text-[#64748B] mt-1">Decentralized performance metrics and global resource summaries.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => refetch()}
                        disabled={isFetching}
                        className="px-4 py-2.5 bg-white border border-[#DDE8E0] rounded-xl text-[#26382E] hover:bg-[#DDF7E8] active:scale-95 transition-all shadow-sm flex items-center gap-2 disabled:opacity-50 text-xs font-bold"
                    >
                        <RefreshCcw size={14} className={isFetching ? "animate-spin text-[#2E8456]" : "text-[#64748B]"} />
                        <span>Refresh Signal</span>
                    </button>
                    <div className="bg-[#DDF7E8] px-4 py-2 rounded-2xl flex items-center gap-3 border border-[#A7E8C2]/60 shadow-sm">
                        <div className="p-1.5 bg-[#86D9A9] text-[#26382E] rounded-xl">
                            <TrendingUp size={15} />
                        </div>
                        <div>
                            <span className="text-xs font-black text-[#26382E] block">System Growth</span>
                            <span className="text-[10px] font-bold text-[#2E8456]">+18.4% Efficiency</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tables Grid */}
            <div className="space-y-6">
                <SummaryTable
                    title="Leads By Country"
                    icon={Target}
                    color="bg-[#DDF7E8] text-[#26382E] border-[#A7E8C2]/60"
                    headers={['Country Zone', 'Total Leads Generated', 'Qualified Pipelines']}
                    data={analytics?.leadsByCountry || []}
                    isLoading={isLoading}
                />

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <SummaryTable
                        title="Leads By Source"
                        icon={Inbox}
                        color="bg-[#DDF7E8] text-[#2E8456] border-[#A7E8C2]/60"
                        headers={['Ingress Channel', 'Total Leads', 'Successful Conversions']}
                        data={analytics?.leadsBySource || []}
                        isLoading={isLoading}
                    />
                    <SummaryTable
                        title="Active System Users"
                        icon={Users2}
                        color="bg-amber-50 text-amber-700 border-amber-200"
                        headers={['Operational Tier', 'Allocated Seats', 'Online Today']}
                        data={analytics?.activeUsers || []}
                        isLoading={isLoading}
                    />
                </div>
            </div>

            {/* Telemetry Glass Footer Card */}
            <div className="p-6 md:p-8 bg-gradient-to-r from-[#EDF8F0] via-white/90 to-[#EDF8F0] border border-[#DDE8E0] rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-glass">
                <div className="flex items-center gap-4">
                    <div className="p-3.5 bg-[#86D9A9]/20 text-[#26382E] border border-[#86D9A9]/40 rounded-2xl">
                        <BarChart3 size={22} className="text-[#26382E]" />
                    </div>
                    <div>
                        <h4 className="text-[#26382E] font-black text-sm tracking-tight">Live Telemetry Synchronized</h4>
                        <p className="text-[#64748B] text-xs font-medium mt-0.5">Real-time signal feed streaming across all active operational clusters</p>
                    </div>
                </div>
                <div className="flex items-center gap-8">
                    <div className="text-center">
                        <div className="text-[#26382E] font-black text-xl tracking-tight">520.1k</div>
                        <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mt-0.5">Total Hits</div>
                    </div>
                    <div className="h-8 w-[1px] bg-[#DDE8E0]" />
                    <div className="text-center">
                        <div className="text-[#2E8456] font-black text-xl tracking-tight">99.98%</div>
                        <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mt-0.5">Uptime SLA</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SystemAnalytics
