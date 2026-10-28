import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Target,
    ArrowUpRight,
    Filter,
    Search,
    ChevronDown,
    Layers,
    UserCheck,
    CheckCircle,
    TrendingUp,
    RefreshCcw
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { useManagerActions } from '../../hooks/useManagerActions'

const ConversionTracking = () => {
    const { useConversionTracking, refreshData } = useManagerActions()
    const { data: conversion, isLoading } = useConversionTracking()
    const [searchTeam, setSearchTeam] = useState('')

    if (isLoading) return (
        <div className="h-96 flex items-center justify-center">
            <RefreshCcw className="animate-spin text-[#86D9A9]" size={32} />
        </div>
    )

    const conversionData = conversion?.data || []
    const filteredConversion = conversionData.filter(t =>
        t.team.toLowerCase().includes(searchTeam.toLowerCase())
    )

    return (
        <div className="space-y-8 pb-16">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-[#26382E] tracking-tight">Conversion Tracking</h1>
                    <p className="text-xs sm:text-sm font-medium text-[#64748B] mt-1">Team-level conversion performance and outcome attribution.</p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => refreshData.mutate('conversion')}
                        className="p-2.5 bg-white border border-[#DDE8E0] rounded-xl text-[#64748B] hover:text-[#26382E] hover:bg-[#DDF7E8] transition-all shadow-xs"
                        title="Refresh metrics"
                    >
                        <RefreshCcw size={15} />
                    </button>
                </div>
            </div>

            {/* Conversion Table Section */}
            <section className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" size={14} />
                        <input
                            type="text"
                            placeholder="Filter by team cluster..."
                            value={searchTeam}
                            onChange={(e) => setSearchTeam(e.target.value)}
                            className="bg-white border border-[#DDE8E0] rounded-xl py-2 pl-9 pr-4 text-xs font-semibold text-[#26382E] w-full focus:outline-none focus:ring-2 focus:ring-[#86D9A9]"
                        />
                    </div>
                </div>

                <div className="glass-card bg-white/85 backdrop-blur-xl border border-[#DDE8E0] rounded-3xl overflow-hidden shadow-glass">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[700px]">
                            <thead>
                                <tr className="bg-[#EDF8F0]/70 border-b border-[#DDE8E0]">
                                    <th className="px-6 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Operational Team</th>
                                    <th className="px-6 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Leads Assigned</th>
                                    <th className="px-6 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Qualified</th>
                                    <th className="px-6 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Converted</th>
                                    <th className="px-6 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Enrolled</th>
                                    <th className="px-6 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px] text-right">Conversion Rate</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#DDE8E0]/60">
                                {filteredConversion.map((team, i) => (
                                    <tr key={i} className="hover:bg-[#F4FBF6] transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2.5">
                                                <div className="p-1.5 bg-[#DDF7E8] text-[#26382E] rounded-lg border border-[#A7E8C2]/60">
                                                    <Layers size={13} />
                                                </div>
                                                <span className="text-xs font-bold text-[#26382E]">{team.team}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-semibold text-[#64748B]">{team.assigned.toLocaleString()}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-semibold text-[#26382E]">{team.qualified.toLocaleString()}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-semibold text-[#26382E]">{team.converted.toLocaleString()}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-bold text-[#2E8456]">{team.enrolled.toLocaleString()}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2.5">
                                                <div className="h-1.5 w-16 bg-[#EDF8F0] rounded-full overflow-hidden">
                                                    <div className="bg-[#86D9A9] h-full w-3/4" />
                                                </div>
                                                <span className="text-xs font-black text-[#26382E]">{team.conversion}</span>
                                                <ArrowUpRight size={13} className="text-[#2E8456]" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Bottom Metric Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-2">
                    {[
                        { label: 'Top Converting Team', val: 'Admissions South', icon: Target },
                        { label: 'Highest Enrollment', val: 'Admissions South', icon: CheckCircle },
                        { label: 'Month Over Month', val: '+12.4% Increase', icon: TrendingUp },
                    ].map((stat, i) => (
                        <div key={i} className="glass-card bg-white/85 backdrop-blur-xl p-5 rounded-3xl border border-[#DDE8E0] shadow-sm flex items-center gap-3.5">
                            <div className="p-3 rounded-2xl bg-[#DDF7E8] text-[#26382E] border border-[#A7E8C2]/60">
                                <stat.icon size={18} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">{stat.label}</p>
                                <p className="text-xs font-black text-[#26382E] mt-0.5">{stat.val}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default ConversionTracking
