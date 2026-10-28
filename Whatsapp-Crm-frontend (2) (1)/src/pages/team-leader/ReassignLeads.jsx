import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    UserCheck,
    Search,
    Filter,
    Clock,
    User,
    Globe,
    RefreshCcw,
    CheckSquare,
    Square
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { useQuery } from '@tanstack/react-query'
import api from '../../services/api'
import { useTeamLeaderActions } from '../../hooks/useTeamLeaderActions'

const ReassignLeads = () => {
    const { useReassignList, reassignLead, refreshData } = useTeamLeaderActions()
    const { data: leads, isLoading } = useReassignList()

    const [searchQuery, setSearchQuery] = useState('')
    const [selectedLeads, setSelectedLeads] = useState([])
    const [bulkCounselor, setBulkCounselor] = useState('')

    // Fetch real counselors
    const { data: usersResp } = useQuery({
        queryKey: ['counselors-list'],
        queryFn: () => api.get('/users')
    })
    const usersArray = Array.isArray(usersResp?.data) ? usersResp.data : (Array.isArray(usersResp) ? usersResp : [])
    const filteredCounselors = usersArray.filter(u => {
        const roleName = typeof u.role === 'object' ? (u.role?.name || '') : (u.role || '')
        return roleName.toUpperCase() === 'COUNSELOR' && u.status === 'Active'
    })
    const COUNSELORS = filteredCounselors.map(c => c.name)

    if (isLoading) return (
        <div className="h-96 flex items-center justify-center">
            <RefreshCcw className="animate-spin text-[#86D9A9]" size={32} />
        </div>
    )

    const reassignList = leads?.data || []
    const filteredList = reassignList.filter(l =>
        (l.leadName && l.leadName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (l.counselor && l.counselor.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (l.country && l.country.toLowerCase().includes(searchQuery.toLowerCase()))
    )

    const handleSelectAll = () => {
        if (filteredList.length === 0) return;
        if (selectedLeads.length === filteredList.length) {
            setSelectedLeads([])
        } else {
            setSelectedLeads(filteredList.map(l => l.id))
        }
    }

    const handleSelectLead = (id) => {
        setSelectedLeads(prev => 
            prev.includes(id) 
                ? prev.filter(lId => lId !== id) 
                : [...prev, id]
        )
    }

    const handleSingleReassign = (leadId, newCounselor) => {
        if (!newCounselor) return
        reassignLead.mutate({ leadId, newCounselor })
    }

    const handleBulkReassign = async () => {
        if (!bulkCounselor || selectedLeads.length === 0) return
        
        try {
            await Promise.all(selectedLeads.map(id => 
                reassignLead.mutateAsync({ leadId: id, newCounselor: bulkCounselor })
            ));
            setSelectedLeads([])
            setBulkCounselor('')
        } catch (error) {
            // Handled by mutation hook
        }
    }

    return (
        <div className="space-y-8 pb-16">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-[#26382E] tracking-tight">Reassign Leads</h1>
                    <p className="text-xs sm:text-sm font-medium text-[#64748B] mt-1">Manage lead portfolio distribution and counselor load balancing.</p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => refreshData.mutate('reassignList')}
                        className="p-2.5 bg-white border border-[#DDE8E0] rounded-xl text-[#64748B] hover:text-[#26382E] hover:bg-[#DDF7E8] transition-all shadow-xs active:scale-95 flex items-center gap-2"
                        title="Refresh leads list"
                    >
                        <RefreshCcw size={15} className={refreshData.isPending ? "animate-spin" : ""} />
                    </button>
                </div>
            </div>

            {/* Bulk Action Panel */}
            <AnimatePresence>
                {selectedLeads.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        className="bg-gradient-to-r from-[#86D9A9] to-[#A7E8C2] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-glass"
                    >
                        <div className="flex items-center gap-2.5 text-[#26382E]">
                            <div className="bg-white/80 w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs text-[#26382E] shadow-2xs">
                                {selectedLeads.length}
                            </div>
                            <span className="text-xs font-bold">Leads Selected for Bulk Reassignment</span>
                        </div>
                        <div className="flex items-center gap-2.5 w-full sm:w-auto">
                            <select
                                value={bulkCounselor}
                                onChange={(e) => setBulkCounselor(e.target.value)}
                                className="flex-1 sm:w-48 bg-white border border-[#DDE8E0] text-[#26382E] rounded-xl px-3.5 py-2 text-xs font-semibold outline-none cursor-pointer focus:ring-2 focus:ring-[#26382E]"
                            >
                                <option value="" disabled className="text-[#64748B]">Select Target Counselor</option>
                                {COUNSELORS.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            <button
                                onClick={handleBulkReassign}
                                disabled={!bulkCounselor || reassignLead.isPending}
                                className="bg-[#26382E] text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-black transition-all disabled:opacity-50 flex items-center gap-1.5 whitespace-nowrap shadow-xs"
                            >
                                {reassignLead.isPending ? <RefreshCcw size={13} className="animate-spin" /> : <UserCheck size={13} />}
                                Transfer Leads
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <section className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="relative max-w-sm w-full">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" size={14} />
                        <input
                            type="text"
                            placeholder="Search by lead or current counselor..."
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
                                    <th className="px-5 py-4 w-12 text-center">
                                        <button onClick={handleSelectAll} className="text-[#64748B] hover:text-[#26382E] transition-colors">
                                            {filteredList.length > 0 && selectedLeads.length === filteredList.length ? (
                                                <CheckSquare size={17} className="text-[#2E8456]" />
                                            ) : (
                                                <Square size={17} />
                                            )}
                                        </button>
                                    </th>
                                    <th className="px-5 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Lead Profile</th>
                                    <th className="px-5 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Current Counselor</th>
                                    <th className="px-5 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Country</th>
                                    <th className="px-5 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Status / Last Activity</th>
                                    <th className="px-6 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px] text-right">Reassign To</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#DDE8E0]/60">
                                {filteredList.map((lead) => {
                                    const isSelected = selectedLeads.includes(lead.id)
                                    return (
                                        <tr key={lead.id} className={cn(
                                            "transition-colors group",
                                            isSelected ? "bg-[#DDF7E8]/40" : "hover:bg-[#F4FBF6]"
                                        )}>
                                            <td className="px-5 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                                                <button 
                                                    onClick={() => handleSelectLead(lead.id)} 
                                                    className="text-[#64748B] hover:text-[#26382E] transition-colors p-1"
                                                >
                                                    {isSelected ? (
                                                        <CheckSquare size={17} className="text-[#2E8456]" />
                                                    ) : (
                                                        <Square size={17} />
                                                    )}
                                                </button>
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className="text-xs font-bold text-[#26382E]">{lead.leadName}</span>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-lg bg-[#DDF7E8] text-[#26382E] border border-[#A7E8C2]/60 flex items-center justify-center text-[10px] font-bold">
                                                        {lead.counselor.charAt(0)}
                                                    </div>
                                                    <span className="text-xs font-semibold text-[#26382E]">{lead.counselor}</span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-1.5 text-xs font-medium text-[#64748B]">
                                                    <Globe size={12} className="text-[#86D9A9]" /> {lead.country}
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex flex-col gap-1">
                                                    <span className="w-fit px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DDF7E8] text-[#26382E] border border-[#A7E8C2]/60">
                                                        {lead.status}
                                                    </span>
                                                    <div className="flex items-center gap-1 text-[10px] text-[#64748B]">
                                                        <Clock size={10} className="text-[#86D9A9]" /> {lead.lastActivity}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-end relative">
                                                    <select
                                                        value=""
                                                        onChange={(e) => handleSingleReassign(lead.id, e.target.value)}
                                                        className="w-44 bg-white border border-[#DDE8E0] text-[#26382E] rounded-xl px-3 py-1.5 cursor-pointer text-xs font-semibold outline-none focus:ring-2 focus:ring-[#86D9A9] shadow-2xs appearance-none transition-all hover:border-[#86D9A9]"
                                                    >
                                                        <option value="" disabled>Select Counselor...</option>
                                                        {COUNSELORS.filter(c => c !== lead.counselor).map(c => (
                                                            <option key={c} value={c}>{c}</option>
                                                        ))}
                                                    </select>
                                                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#64748B]">
                                                        <UserCheck size={13} />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ReassignLeads
