import React, { useState } from 'react'
import { MessageSquare, UserPlus, Zap, Filter, Search, MoreVertical, CheckCircle, UserCheck, ChevronDown, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../lib/utils'
import { useQuery } from '@tanstack/react-query'
import { useLeadActions } from '../hooks/useCrmMutations'
import api from '../services/api'
import useAppStore from '../store/useStore'

const AssignmentModal = ({ lead, onClose, onAssign, isPending }) => {
    const [team, setTeam] = useState('Team South East Asia')
    const [counselor, setCounselor] = useState('Rahul Sharma')

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-[100] flex items-center justify-center p-4 backdrop-blur-md"
        >
            <motion.div
                initial={{ scale: 0.95, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                className="bg-white/95 backdrop-blur-xl rounded-2xl md:rounded-3xl w-full max-w-md shadow-2xl p-6 md:p-8 border border-[#DDE8E0] mx-auto max-h-[85vh] overflow-y-auto no-scrollbar flex flex-col"
            >
                <div className="flex items-center justify-between mb-6 md:mb-8 shrink-0">
                    <div>
                        <h3 className="text-xl font-black text-[#26382E] uppercase tracking-tight">Lead Assignment</h3>
                        <p className="text-xs font-bold text-[#64748B] uppercase tracking-widest mt-1">Manual Redistribution</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-[#EDF8F0] rounded-xl text-[#64748B] transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="mb-6 md:mb-8 p-4 md:p-5 bg-[#DDF7E8]/50 border border-[#86D9A9]/30 rounded-2xl flex items-center gap-3 md:gap-4 shrink-0">
                    <div className="h-10 w-10 md:h-12 md:w-12 bg-[#86D9A9] text-[#26382E] rounded-xl md:rounded-2xl flex items-center justify-center font-black text-base md:text-lg shadow-sm shrink-0">
                        {lead?.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                        <p className="font-black text-[#26382E] uppercase tracking-tight truncate">{lead?.name}</p>
                        <p className="text-[9px] md:text-[10px] text-[#26382E] font-black uppercase tracking-widest truncate">{lead?.country} • {lead?.source}</p>
                    </div>
                </div>

                <div className="space-y-4 md:space-y-6 overflow-y-auto">
                    <div>
                        <label className="text-[10px] font-black text-[#64748B] uppercase tracking-widest block mb-2">Target Region/Team</label>
                        <select
                            value={team}
                            onChange={(e) => setTeam(e.target.value)}
                            className="w-full p-3.5 bg-white border border-[#DDE8E0] rounded-xl text-xs font-black uppercase tracking-widest text-[#26382E] focus:ring-2 focus:ring-[#86D9A9] outline-none appearance-none transition-all"
                        >
                            <option>Team South East Asia</option>
                            <option>Global Direct Team</option>
                            <option>Middle East Division</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-[#64748B] uppercase tracking-widest block mb-2">Select Active Counselor</label>
                        <select
                            value={counselor}
                            onChange={(e) => setCounselor(e.target.value)}
                            className="w-full p-3.5 bg-white border border-[#DDE8E0] rounded-xl text-xs font-black uppercase tracking-widest text-[#26382E] focus:ring-2 focus:ring-[#86D9A9] outline-none appearance-none transition-all"
                        >
                            <option>Rahul Sharma (Available)</option>
                            <option>Priya Singh (Busy)</option>
                            <option>Amit Kumar (Away)</option>
                            <option>Neha Gupta (Available)</option>
                        </select>
                    </div>
                </div>

                <div className="mt-8 flex gap-3 md:gap-4 shrink-0">
                    <button onClick={onClose} className="flex-1 px-3 md:px-4 py-3 md:py-3.5 bg-white border border-[#DDE8E0] text-[#64748B] rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-[#EDF8F0] transition-all">
                        Cancel
                    </button>
                    <button
                        onClick={() => onAssign(lead.id, counselor)}
                        disabled={isPending}
                        className="flex-1 px-3 md:px-4 py-3 md:py-3.5 bg-[#86D9A9] text-[#26382E] rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-[#A7E8C2] shadow-sm transition-all disabled:opacity-50"
                    >
                        {isPending ? 'Assigning...' : 'Confirm'}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    )
}

const CustomerSupportDashboard = () => {
    const [selectedLead, setSelectedLead] = useState(null)
    const { assignLead } = useLeadActions()

    // Fetch Stats
    const { data: dashboardResp } = useQuery({
        queryKey: ['support-dashboard'],
        queryFn: async () => {
            const resp = await api.get('/dashboard/support')
            return resp.data
        }
    })
    const stats = dashboardResp?.data || {}

    const kpis = [
        { title: 'Inbound Inquiries', value: stats.newMessages || 0, icon: MessageSquare, color: 'bg-[#DDF7E8] text-[#26382E]' },
        { title: 'Triage Queue', value: stats.openTickets || 0, icon: UserPlus, color: 'bg-amber-50 text-amber-600' },
        { title: 'AI Conversational', value: stats.assignedChats || 0, icon: Zap, color: 'bg-[#EDF8F0] text-[#26382E]' },
    ]

    // Fetch Queue
    const { data: queueResp, isLoading: loadingQueue } = useQuery({
        queryKey: ['support-queue'],
        queryFn: () => api.get('/leads', { params: { stage: 'New' } }).then(res => res.data)
    })
    const newLeads = queueResp?.data || []

    // Fetch AI Status
    const { data: aiResp, isLoading: loadingAi } = useQuery({
        queryKey: ['support-ai-status'],
        queryFn: () => api.get('/leads', { params: { stage: 'Qualified' } }).then(res => res.data)
    })
    const aiStatus = (aiResp?.data || []).map(l => ({
        ...l,
        status: l.stage,
        budget: 'Not Specified', // Placeholder for AI extracted budget
        intake: '2024/25' // Placeholder
    }))

    const handleAssign = (leadId, counselor) => {
        assignLead.mutate({ leadId, counselorId: counselor.split(' ')[0] }, {
            onSuccess: () => setSelectedLead(null)
        })
    }

    return (
        <div className="space-y-8">
            <AnimatePresence>
                {selectedLead && (
                    <AssignmentModal
                        lead={selectedLead}
                        isPending={assignLead.isPending}
                        onClose={() => setSelectedLead(null)}
                        onAssign={handleAssign}
                    />
                )}
            </AnimatePresence>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-[#26382E] uppercase tracking-tight">Lead Triage & Support</h1>
                    <p className="text-[10px] md:text-xs font-medium text-[#64748B] mt-1">Real-time management of new incoming leads and AI qualification status.</p>
                </div>
                <div className="flex items-center gap-2 md:gap-3 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none justify-center glass-card bg-white/80 border border-[#DDE8E0] px-4 md:px-5 py-2 md:py-2.5 rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest text-[#26382E] shadow-sm hover:bg-[#DDF7E8] transition-all flex items-center gap-2">
                        <Filter size={14} className="text-[#26382E]" /> Filter
                    </button>
                    <button className="flex-1 sm:flex-none justify-center bg-[#86D9A9] text-[#26382E] px-4 md:px-5 py-2 md:py-2.5 rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-[#A7E8C2] shadow-sm transition-all active:scale-95">
                        Process All
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {kpis.map((kpi, index) => (
                    <div key={index} className="glass-card bg-white/80 p-5 md:p-6 rounded-[2rem] md:rounded-3xl border border-[#DDE8E0] shadow-sm flex items-center justify-between hover:shadow-md transition-shadow group">
                        <div className="min-w-0 pr-4">
                            <p className="text-[9px] md:text-[10px] font-black text-[#64748B] uppercase tracking-widest truncate">{kpi.title}</p>
                            <h3 className="text-xl md:text-2xl font-black text-[#26382E] mt-1 uppercase tracking-tight truncate">{kpi.value}</h3>
                        </div>
                        <div className={cn("p-3 md:p-4 rounded-xl md:rounded-2xl shadow-inner group-hover:scale-110 transition-transform shrink-0", kpi.color)}>
                            <kpi.icon className="w-5 h-5 md:w-[22px] md:h-[22px]" strokeWidth={2.5} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* New Leads Queue */}
                <div className="lg:col-span-2 glass-card rounded-2xl md:rounded-3xl border border-[#DDE8E0] shadow-sm overflow-hidden flex flex-col min-w-0">
                    <div className="px-5 md:px-6 py-4 md:py-5 border-b border-[#DDE8E0] flex items-center justify-between bg-[#EDF8F0]/50">
                        <h3 className="font-black text-[#26382E] text-[9px] md:text-[10px] uppercase tracking-widest">New Leads Arrival Queue</h3>
                        <span className="bg-[#DDF7E8] text-[#26382E] px-2 md:px-3 py-1 rounded-lg text-[8px] md:text-[9px] font-black uppercase tracking-widest border border-[#86D9A9]/30 whitespace-nowrap ml-2">12 UNASSIGNED</span>
                    </div>
                    <div className="overflow-x-auto w-full max-w-full no-scrollbar">
                        <table className="w-full text-left border-collapse min-w-[700px]">
                            <thead>
                                <tr className="bg-[#EDF8F0]/30 border-b border-[#DDE8E0]">
                                    <th className="px-4 md:px-6 py-4 font-black text-[#64748B] uppercase tracking-widest text-[9px] min-w-[150px]">Lead Profile</th>
                                    <th className="px-4 md:px-6 py-4 font-black text-[#64748B] uppercase tracking-widest text-[9px] min-w-[150px]">Channel / ID</th>
                                    <th className="px-4 md:px-6 py-4 font-black text-[#64748B] uppercase tracking-widest text-[9px] min-w-[150px]">AI Qualification</th>
                                    <th className="px-4 md:px-6 py-4 text-right"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#DDE8E0]">
                                {newLeads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-[#EDF8F0]/40 transition-colors group cursor-default">
                                        <td className="px-4 md:px-6 py-4 md:py-5">
                                            <div className="font-black text-[#26382E] uppercase tracking-tight group-hover:text-[#26382E] transition-colors text-[11px] md:text-xs truncate">{lead.name}</div>
                                            <div className="text-[9px] md:text-[10px] text-[#64748B] font-black uppercase tracking-widest mt-0.5 truncate">{lead.country}</div>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 md:py-5">
                                            <div className="font-bold text-[#26382E] text-[11px] md:text-xs tracking-tight truncate">{lead.phone}</div>
                                            <div className="text-[8px] md:text-[9px] text-[#26382E] font-black uppercase tracking-widest mt-0.5 truncate bg-[#EDF8F0] border border-[#DDE8E0] px-2 py-0.5 rounded inline-block">{lead.source}</div>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 md:py-5">
                                            {lead.score ? (
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 md:w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden shadow-inner shrink-0">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${lead.score}%` }}
                                                            className="bg-[#86D9A9] h-full"
                                                        />
                                                    </div>
                                                    <span className="font-black text-[#26382E] text-[9px] md:text-[10px]">{lead.score}%</span>
                                                </div>
                                            ) : (
                                                <span className="text-[9px] md:text-[10px] text-[#64748B] font-black uppercase tracking-widest italic animate-pulse">Syncing...</span>
                                            )}
                                        </td>
                                        <td className="px-4 md:px-6 py-4 md:py-5 text-right w-[120px]">
                                            <button
                                                onClick={() => setSelectedLead(lead)}
                                                className="px-3 md:px-4 py-2 bg-[#86D9A9] text-[#26382E] rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-[#A7E8C2] transition-all shadow-sm flex items-center justify-center gap-2 w-full md:w-auto ml-auto"
                                            >
                                                <UserCheck size={14} className="shrink-0" /> <span className="hidden md:inline">Assign</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* AI Qualification Status */}
                <div className="glass-card rounded-2xl md:rounded-3xl border border-[#DDE8E0] shadow-sm flex flex-col overflow-hidden min-w-0">
                    <div className="px-5 md:px-6 py-4 md:py-5 border-b border-[#DDE8E0] bg-[#EDF8F0]/50">
                        <h3 className="font-black text-[#26382E] text-[9px] md:text-[10px] uppercase tracking-widest">Active AI Sessions</h3>
                    </div>
                    <div className="p-4 md:p-6 space-y-4 md:space-y-5">
                        {aiStatus.map((status) => (
                            <motion.div
                                key={status.id}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="p-4 md:p-5 bg-white/80 rounded-xl md:rounded-2xl border border-[#DDE8E0] space-y-4 hover:border-[#86D9A9] transition-all cursor-default group/card"
                            >
                                <div className="flex justify-between items-start">
                                    <h4 className="font-black text-[#26382E] uppercase tracking-tight text-xs group-hover/card:text-[#26382E] transition-colors">{status.name}</h4>
                                    <span className={cn(
                                        "text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest border shadow-sm",
                                        status.status === 'Qualified' ? 'bg-[#DDF7E8] text-[#26382E] border-[#86D9A9]/30' : 'bg-[#EDF8F0] text-[#26382E] border-[#DDE8E0]'
                                    )}>{status.status}</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[9px] font-black uppercase tracking-widest">
                                    <div>
                                        <p className="text-[#64748B] mb-1">Target</p>
                                        <p className="text-[#26382E] group-hover/card:translate-x-1 transition-transform">{status.program}</p>
                                    </div>
                                    <div>
                                        <p className="text-[#64748B] mb-1">Est. Budget</p>
                                        <p className="text-[#26382E] group-hover/card:translate-x-1 transition-transform">{status.budget}</p>
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-[#64748B] mb-1.5">
                                        <span>Confidence Score</span>
                                        <span>{status.score}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-[#EDF8F0] rounded-full overflow-hidden">
                                        <div className="bg-[#86D9A9] h-full transition-all duration-1000" style={{ width: `${status.score}%` }} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                        <button className="w-full py-4 text-xs font-black uppercase tracking-widest text-[#26382E] bg-[#EDF8F0] hover:bg-[#DDF7E8] border border-[#DDE8E0] rounded-2xl transition-all shadow-sm">
                            View Deep Analytics
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerSupportDashboard


