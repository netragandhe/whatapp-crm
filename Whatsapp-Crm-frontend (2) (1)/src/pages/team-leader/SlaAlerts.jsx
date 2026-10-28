import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    AlertTriangle,
    Search,
    Filter,
    Clock,
    User,
    RefreshCcw,
    BellRing,
    ChevronRight,
    UserCheck,
    MessageSquare
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { useTeamLeaderActions } from '../../hooks/useTeamLeaderActions'

const SlaAlerts = () => {
    const navigate = useNavigate()
    const { useSlaAlerts, sendReminder, reassignLead, refreshData, usePerformance } = useTeamLeaderActions()
    const { data: alerts, isLoading } = useSlaAlerts()
    const { data: performanceData } = usePerformance()

    const [searchQuery, setSearchQuery] = useState('')
    const [reassignModalOpen, setReassignModalOpen] = useState(false)
    const [selectedAlert, setSelectedAlert] = useState(null)
    const [newCounselor, setNewCounselor] = useState('')

    if (isLoading) return (
        <div className="h-96 flex items-center justify-center">
            <RefreshCcw className="animate-spin text-[#86D9A9]" size={32} />
        </div>
    )

    const slaAlerts = alerts?.data || []
    const filteredAlerts = slaAlerts.filter(a => {
        const leadName = a.leadName || a.lead || 'Unknown Lead'
        const counselor = a.counselor || 'Unassigned'
        
        return leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            counselor.toLowerCase().includes(searchQuery.toLowerCase())
    })

    const getDisplayLead = (alert) => alert.leadName || alert.lead || 'Unknown Lead'
    const getDisplayCounselor = (alert) => alert.counselor || 'Unassigned'
    
    // Extract available counselors from performance data
    const activeCounselors = performanceData?.data ? performanceData.data.map(p => p.counselor) : []

    const handleReassign = () => {
        if (!newCounselor || !selectedAlert) return
        reassignLead.mutate({ leadId: selectedAlert.leadId, newCounselor })
        setReassignModalOpen(false)
        setSelectedAlert(null)
        setNewCounselor('')
    }

    return (
        <div className="space-y-8 pb-16">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-[#26382E] tracking-tight">SLA Breach Alerts</h1>
                    <p className="text-xs sm:text-sm font-medium text-[#64748B] mt-1">Real-time Service Level Agreement breach monitoring and intervention queue.</p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => refreshData.mutate('slaAlerts')}
                        className="p-2.5 bg-white border border-[#DDE8E0] rounded-xl text-[#64748B] hover:text-[#26382E] hover:bg-[#DDF7E8] transition-all shadow-xs active:scale-95 flex items-center gap-2"
                        title="Refresh alerts"
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
                            placeholder="Search incidents by lead or counselor..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-white border border-[#DDE8E0] rounded-xl py-2 pl-9 pr-4 text-xs font-semibold text-[#26382E] w-full focus:outline-none focus:ring-2 focus:ring-[#86D9A9] shadow-xs transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 px-3.5 py-1.5 rounded-xl text-xs font-bold text-rose-600 shadow-2xs whitespace-nowrap">
                        <AlertTriangle size={14} />
                        {slaAlerts.filter(a => a.status === 'Breached').length} Active Breaches
                    </div>
                </div>

                <div className="glass-card bg-white/85 backdrop-blur-xl border border-[#DDE8E0] rounded-3xl overflow-hidden shadow-glass">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[750px]">
                            <thead>
                                <tr className="bg-[#EDF8F0]/70 border-b border-[#DDE8E0]">
                                    <th className="px-6 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px]">SLA Status</th>
                                    <th className="px-6 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Lead Profile</th>
                                    <th className="px-6 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Responsible Counselor</th>
                                    <th className="px-6 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Response Delay</th>
                                    <th className="px-6 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Threshold Limit</th>
                                    <th className="px-6 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px] text-right">Intervention</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#DDE8E0]/60">
                                {filteredAlerts.map((alert) => (
                                    <tr key={alert.id} className={cn(
                                        "transition-colors group",
                                        alert.status === 'Breached' ? "bg-rose-50/20 hover:bg-rose-50/40" : "hover:bg-[#F4FBF6]"
                                    )}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {alert.status === 'Breached' ? (
                                                    <span className="inline-flex items-center gap-1.5 text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200 text-[10px] font-bold uppercase tracking-wider">
                                                        <AlertTriangle size={12} className="animate-pulse" />
                                                        Breached
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 text-[10px] font-bold uppercase tracking-wider">
                                                        <Clock size={12} />
                                                        Warning
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-xs text-[#26382E]">{getDisplayLead(alert)}</div>
                                            <div className="text-[10px] text-[#64748B] mt-0.5">
                                                Breach Time: {alert.breachTime}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-lg bg-[#DDF7E8] text-[#26382E] border border-[#A7E8C2]/60 flex items-center justify-center text-[10px] font-bold">
                                                    {getDisplayCounselor(alert).charAt(0)}
                                                </div>
                                                <span className="text-xs font-semibold text-[#26382E]">{getDisplayCounselor(alert)}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={cn(
                                                "text-xs font-bold",
                                                alert.status === 'Breached' ? "text-rose-600" : "text-amber-600"
                                            )}>{alert.delay} mins</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-medium text-[#64748B]">{alert.limit} mins limit</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <button
                                                    onClick={() => sendReminder.mutate(getDisplayCounselor(alert))}
                                                    className={cn(
                                                        "px-2.5 py-1.5 rounded-xl transition-colors border shadow-2xs flex items-center gap-1.5 text-xs font-bold",
                                                        alert.status === 'Breached' ? "bg-rose-50 text-rose-600 hover:bg-rose-100 border-rose-200" : "bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200"
                                                    )}
                                                    title="Send Urgent Reminder"
                                                >
                                                    <BellRing size={13} className={alert.status === 'Breached' ? "animate-bounce" : ""} />
                                                    Ping
                                                </button>
                                                <button
                                                    onClick={() => navigate('/team-leader/inbox')}
                                                    className="p-1.5 border border-[#DDE8E0] rounded-xl text-[#64748B] hover:text-[#26382E] hover:bg-[#DDF7E8] transition-all shadow-2xs bg-white"
                                                    title="View Conversation"
                                                >
                                                    <MessageSquare size={14} />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setSelectedAlert(alert)
                                                        setReassignModalOpen(true)
                                                    }}
                                                    className="w-7 h-7 rounded-xl bg-[#DDF7E8] border border-[#A7E8C2]/60 flex items-center justify-center text-[#26382E] shadow-2xs transition-all hover:bg-[#86D9A9]"
                                                    title="Reassign to another counselor"
                                                >
                                                    <ChevronRight size={13} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Quick Reassign Modal for SLA Breaches */}
            <AnimatePresence>
                {reassignModalOpen && selectedAlert && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => {
                                setReassignModalOpen(false)
                                setSelectedAlert(null)
                                setNewCounselor('')
                            }}
                            className="absolute inset-0 bg-[#26382E]/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="glass-card bg-white/95 backdrop-blur-2xl border border-[#DDE8E0] rounded-3xl w-full max-w-sm relative z-10 shadow-glass-lg p-6 space-y-4 text-center mx-2 sm:mx-auto max-h-[85vh] overflow-y-auto"
                        >
                            <div className="mx-auto w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center">
                                <AlertTriangle size={20} />
                            </div>

                            <div className="space-y-1">
                                <h3 className="text-base font-black text-[#26382E] tracking-tight">Emergency Reassign</h3>
                                <p className="text-xs font-medium text-[#64748B] leading-relaxed">
                                    SLA breached for <span className="font-bold text-[#26382E]">{getDisplayLead(selectedAlert)}</span>.<br /> Currently with {getDisplayCounselor(selectedAlert)}.
                                </p>
                            </div>

                            <div className="pt-3 border-t border-[#DDE8E0] text-left space-y-1.5">
                                <label className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">New Counselor Assignment</label>
                                <select
                                    value={newCounselor}
                                    onChange={(e) => setNewCounselor(e.target.value)}
                                    className="w-full bg-white border border-[#DDE8E0] text-[#26382E] rounded-xl px-3.5 py-2 text-xs font-semibold outline-none focus:ring-2 focus:ring-[#86D9A9] cursor-pointer"
                                >
                                    <option value="" disabled>Select available counselor...</option>
                                    {activeCounselors
                                        .filter(c => c !== getDisplayCounselor(selectedAlert))
                                        .map(c => <option key={c} value={c}>{c}</option>)}
                                    {activeCounselors.length === 0 && (
                                        <option disabled>Loading database counselors...</option>
                                    )}
                                </select>
                            </div>

                            <div className="flex gap-2.5 pt-3">
                                <button
                                    onClick={() => {
                                        setReassignModalOpen(false)
                                        setSelectedAlert(null)
                                        setNewCounselor('')
                                    }}
                                    className="flex-1 py-2 text-xs font-bold text-[#64748B] hover:text-[#26382E] border border-[#DDE8E0] rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleReassign}
                                    disabled={!newCounselor || reassignLead.isPending}
                                    className="flex-[2] bg-[#86D9A9] text-[#26382E] hover:bg-[#A7E8C2] py-2 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs disabled:opacity-50"
                                >
                                    {reassignLead.isPending ? (
                                        <RefreshCcw size={14} className="animate-spin" />
                                    ) : (
                                        <>Transfer & Alert</>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default SlaAlerts
