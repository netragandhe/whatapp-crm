import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    FileText,
    Search,
    Filter,
    Clock,
    User,
    RefreshCcw,
    Plus,
    X,
    MessageSquare,
    CheckCircle
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { useTeamLeaderActions } from '../../hooks/useTeamLeaderActions'

const ActivityLogs = () => {
    const { useActivityLogs, addTeamNote, refreshData } = useTeamLeaderActions()
    const { data: logs, isLoading } = useActivityLogs()

    const [searchQuery, setSearchQuery] = useState('')
    const [noteModalOpen, setNoteModalOpen] = useState(false)
    const [noteText, setNoteText] = useState('')
    const [noteLead, setNoteLead] = useState('')

    if (isLoading) return (
        <div className="h-96 flex items-center justify-center">
            <RefreshCcw className="animate-spin text-[#86D9A9]" size={32} />
        </div>
    )

    const activityLogs = logs?.data || []
    const filteredLogs = activityLogs.filter(log => {
        const user = typeof log.user === 'string' ? log.user : (log.user?.name || 'Unknown')
        const action = log.action || ''
        const lead = log.lead || 'General'
        const note = log.note || log.details || ''

        return user.toLowerCase().includes(searchQuery.toLowerCase()) ||
            action.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lead.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.toLowerCase().includes(searchQuery.toLowerCase())
    })

    const getDisplayUser = (log) => typeof log.user === 'string' ? log.user : (log.user?.name || 'Unknown')
    const getDisplayDate = (log) => log.date || (log.timestamp ? new Date(log.timestamp).toLocaleString() : 'Recent')

    const handleSaveNote = () => {
        if (!noteText.trim()) return
        addTeamNote.mutate({
            lead: noteLead || 'General Team Note',
            note: noteText
        })
        setNoteModalOpen(false)
        setNoteText('')
        setNoteLead('')
    }

    return (
        <div className="space-y-8 pb-12">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-[#26382E] uppercase tracking-tighter">Activity <span className="text-[#26382E]">Logs</span></h1>
                    <p className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em]">Comprehensive team action history and notes</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="glass-card bg-white/80 border border-[#DDE8E0] rounded-xl px-4 py-2.5 flex items-center gap-3 shadow-sm hidden sm:flex">
                        <Filter size={14} className="text-[#64748B]" />
                        <span className="text-[10px] font-black text-[#26382E] uppercase tracking-widest">Sort: Newest First</span>
                    </div>
                    <button
                        onClick={() => {
                            if (typeof refreshData.mutate === 'function') {
                                refreshData.mutate('activityLogs')
                            }
                        }}
                        className="p-2.5 border border-[#DDE8E0] rounded-xl text-[#26382E] bg-white/80 hover:bg-[#DDF7E8] transition-all shadow-sm active:scale-95 flex items-center gap-2"
                    >
                        <RefreshCcw size={16} className={refreshData?.isPending ? "animate-spin" : ""} />
                    </button>
                    <button
                        onClick={() => setNoteModalOpen(true)}
                        className="bg-[#86D9A9] text-[#26382E] px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#A7E8C2] transition-all flex items-center gap-2 shadow-sm border border-[#86D9A9]"
                    >
                        <Plus size={14} />
                        Add Log Entry
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <section className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="relative group max-w-md w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] group-focus-within:text-[#86D9A9] transition-colors" size={14} />
                        <input
                            type="text"
                            placeholder="SEARCH USERS, ACTIONS, LEADS, OR CONTENT..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-white border border-[#DDE8E0] rounded-xl py-3 pl-11 pr-4 text-[10px] font-black uppercase tracking-widest w-full text-[#26382E] focus:ring-2 focus:ring-[#86D9A9]/20 focus:border-[#86D9A9] outline-none shadow-sm transition-all"
                        />
                    </div>
                </div>

                <div className="glass-card bg-white/80 rounded-[2.5rem] border border-[#DDE8E0] shadow-sm overflow-hidden overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className="bg-[#EDF8F0]/50">
                                <th className="px-8 py-5 font-black text-[#64748B] uppercase tracking-widest text-[9px]">Timestamp</th>
                                <th className="px-8 py-5 font-black text-[#64748B] uppercase tracking-widest text-[9px]">User Identity</th>
                                <th className="px-8 py-5 font-black text-[#64748B] uppercase tracking-widest text-[9px]">Event Action</th>
                                <th className="px-8 py-5 font-black text-[#64748B] uppercase tracking-widest text-[9px]">Target Lead</th>
                                <th className="px-8 py-5 font-black text-[#64748B] uppercase tracking-widest text-[9px] w-1/3">Context / Notes</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#DDE8E0]/60">
                            {filteredLogs.map((log, i) => (
                                <tr key={log.id} className="hover:bg-[#F4FBF6]/60 transition-all group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#64748B] uppercase">
                                            <Clock size={12} className="text-[#86D9A9]" />
                                            {getDisplayDate(log)}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            {getDisplayUser(log) === 'Team Leader' ? (
                                                <div className="w-6 h-6 rounded-md bg-[#DDF7E8] border border-[#86D9A9] flex items-center justify-center text-[8px] font-black text-[#26382E]">
                                                    TL
                                                </div>
                                            ) : (
                                                <div className="w-6 h-6 rounded-md bg-[#EDF8F0] border border-[#DDE8E0] flex items-center justify-center text-[8px] font-black text-[#26382E]">
                                                    {getDisplayUser(log).charAt(0)}
                                                </div>
                                            )}
                                            <span className="text-[10px] font-black text-[#26382E] uppercase">{getDisplayUser(log)}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={cn(
                                            "w-fit px-2.5 py-1 rounded text-[9px] font-black uppercase tracking-widest border",
                                            log.action === 'Added Note' ? "bg-[#DDF7E8] text-[#26382E] border-[#86D9A9]" :
                                                log.action === 'Status Update' ? "bg-emerald-50 text-emerald-800 border-emerald-200" :
                                                    "bg-[#EDF8F0] text-[#26382E] border-[#DDE8E0]"
                                        )}>
                                            {log.action}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-[10px] font-black text-[#64748B] uppercase tracking-tight">{log.lead}</span>
                                    </td>
                                    <td className="px-8 py-6 max-w-md">
                                        <div className="flex gap-2 items-start text-[#26382E]">
                                            <MessageSquare size={14} className="mt-0.5 text-[#86D9A9] shrink-0" />
                                            <p className="text-[11px] leading-relaxed">{log.note || log.details}</p>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Add Entry Modal */}
            <AnimatePresence>
                {noteModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => {
                                setNoteModalOpen(false)
                                setNoteText('')
                                setNoteLead('')
                            }}
                            className="absolute inset-0 bg-black/40 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="glass-card bg-white/95 rounded-[2rem] w-full max-w-lg relative z-10 shadow-2xl p-8 space-y-6 mx-2 sm:mx-auto max-h-[85vh] overflow-y-auto no-scrollbar border border-[#DDE8E0]"
                        >
                            <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                    <h3 className="text-xl font-black text-[#26382E] uppercase tracking-tighter">Add Activity Log</h3>
                                    <p className="text-[9px] font-black text-[#64748B] uppercase tracking-widest">
                                        Create a formal record in the team history
                                    </p>
                                </div>
                                <button
                                    onClick={() => {
                                        setNoteModalOpen(false)
                                        setNoteText('')
                                        setNoteLead('')
                                    }}
                                    className="p-2 bg-[#EDF8F0] text-[#64748B] hover:text-rose-500 rounded-xl transition-all"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-[#64748B] uppercase tracking-widest">Target Context (Optional)</label>
                                    <input
                                        type="text"
                                        value={noteLead}
                                        onChange={(e) => setNoteLead(e.target.value)}
                                        placeholder="E.G., GENERAL, POLICY, OR SPECIFIC LEAD NAME"
                                        className="w-full bg-[#F4FBF6] border border-[#DDE8E0] px-4 py-3 rounded-xl text-xs font-bold text-[#26382E] uppercase focus:ring-2 focus:ring-[#86D9A9]/20 outline-none transition-all placeholder:text-[#64748B]/40"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-[#64748B] uppercase tracking-widest">Log Details</label>
                                    <textarea
                                        rows={4}
                                        value={noteText}
                                        onChange={(e) => setNoteText(e.target.value)}
                                        placeholder="ENTER RECORD DETAILS HERE..."
                                        className="w-full bg-[#F4FBF6] border border-[#DDE8E0] rounded-xl p-4 text-xs font-bold text-[#26382E] focus:ring-2 focus:ring-[#86D9A9]/20 outline-none resize-none transition-all placeholder:text-[#64748B]/40"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleSaveNote}
                                disabled={!noteText.trim() || addTeamNote.isPending}
                                className="w-full bg-[#86D9A9] text-[#26382E] py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#A7E8C2] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm border border-[#86D9A9]"
                            >
                                {addTeamNote.isPending ? (
                                    <RefreshCcw className="animate-spin" size={16} />
                                ) : (
                                    <>
                                        <CheckCircle size={16} /> Commit to Ledger
                                    </>
                                )}
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default ActivityLogs


