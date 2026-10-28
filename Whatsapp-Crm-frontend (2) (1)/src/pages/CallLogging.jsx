import React, { useState } from 'react'
import { PhoneCall, PhoneIncoming, PhoneOutgoing, Clock, Search, Loader, Plus, Calendar as CalendarIcon, FileEdit } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../lib/utils'
import { useQuery } from '@tanstack/react-query'
import { useCounselorActions } from '../hooks/useCrmMutations'
import api from '../services/api'

const CallLogging = () => {
    const { logCall } = useCounselorActions()
    const [searchTerm, setSearchTerm] = useState('')
    const [isLogModalOpen, setIsLogModalOpen] = useState(false)
    const [newCallData, setNewCallData] = useState({
        lead: '', type: 'Outgoing', duration: '', outcome: 'Interested', notes: ''
    })

    const { data: callsResp, isLoading } = useQuery({
        queryKey: ['counselor-calls'],
        queryFn: () => api.get('/counselor/calls')
    })

    const callsData = Array.isArray(callsResp?.data) ? callsResp.data : (Array.isArray(callsResp) ? callsResp : [])

    const filteredCalls = callsData.filter(c =>
        c.lead.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.notes.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleLogCall = () => {
        if (!newCallData.lead || !newCallData.duration) return;
        const submitData = {
            ...newCallData,
            date: new Date().toISOString().split('T')[0],
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'Logged',
        }
        logCall.mutate(submitData, {
            onSuccess: () => {
                setIsLogModalOpen(false)
                setNewCallData({ lead: '', type: 'Outgoing', duration: '', outcome: 'Interested', notes: '' })
            }
        })
    }

    const totalOutgoing = callsData.filter(c => c.type === 'Outgoing').length
    const totalIncoming = callsData.filter(c => c.type === 'Incoming').length

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-[#26382E] uppercase tracking-tighter">Call Activity</h1>
                    <p className="text-sm font-medium text-[#64748B] mt-1">Review communication records and log ad-hoc voice touchpoints.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsLogModalOpen(true)}
                        className="bg-[#86D9A9] text-[#26382E] px-5 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-[#A7E8C2] transition-all shadow-sm flex items-center gap-2 active:scale-95"
                    >
                        <Plus size={14} /> Log Communication
                    </button>
                </div>
            </div>

            <div className="glass-card rounded-3xl border border-[#DDE8E0] shadow-sm overflow-hidden flex flex-col">
                <div className="p-6 border-b border-[#DDE8E0] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#EDF8F0]/50">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#EDF8F0] text-[#26382E] rounded-lg font-bold text-[10px] uppercase tracking-widest border border-[#DDE8E0] shadow-sm">
                            <PhoneOutgoing size={12} className="text-[#26382E]" />
                            <span>{totalOutgoing} Outbound</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#DDF7E8] text-[#26382E] rounded-lg font-bold text-[10px] uppercase tracking-widest border border-[#86D9A9]/30 shadow-sm">
                            <PhoneIncoming size={12} className="text-[#26382E]" />
                            <span>{totalIncoming} Inbound</span>
                        </div>
                    </div>
                    <div className="relative flex-1 sm:w-80 sm:flex-none">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
                        <input
                            type="text"
                            placeholder="Search lead or notes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 border border-[#DDE8E0] rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#86D9A9] outline-none transition-all shadow-sm bg-white text-[#26382E]"
                        />
                    </div>
                </div>

                <div className="w-full overflow-x-auto no-scrollbar min-h-[400px]">
                    {isLoading ? (
                        <div className="h-64 flex flex-col items-center justify-center text-[#26382E] opacity-50">
                            <Loader className="animate-spin mb-4" size={32} />
                            <p className="text-[10px] font-black uppercase tracking-widest">Compiling Communications...</p>
                        </div>
                    ) : filteredCalls.length === 0 ? (
                        <div className="h-64 flex flex-col items-center justify-center text-gray-400 opacity-50">
                            <PhoneCall size={48} className="mb-4" />
                            <p className="text-[11px] font-black uppercase tracking-widest">No Communication Records Found.</p>
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#EDF8F0]/30 border-b border-[#DDE8E0]">
                                    <th className="px-6 py-4 text-[10px] font-black text-[#64748B] uppercase tracking-widest">Timestamp</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-[#64748B] uppercase tracking-widest">Lead Profile</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-[#64748B] uppercase tracking-widest">Direction / Duration</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-[#64748B] uppercase tracking-widest min-w-[200px]">Context Notes</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-[#64748B] uppercase tracking-widest text-right">Outcome</th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence>
                                    {filteredCalls.map((call, i) => (
                                        <motion.tr
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            key={call.id || i}
                                            className="group hover:bg-[#EDF8F0]/40 transition-colors border-b border-[#DDE8E0] last:border-0"
                                        >
                                            <td className="px-6 py-5">
                                                <div className="font-black text-[#26382E] text-xs">{call.date}</div>
                                                <div className="text-[9px] text-[#64748B] flex items-center gap-1 mt-0.5 font-bold uppercase tracking-widest">
                                                    <Clock size={10} /> {call.time}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="font-black text-[#26382E] uppercase tracking-tight text-xs">{call.lead}</div>
                                                <div className="text-[9px] text-[#64748B] font-bold uppercase tracking-widest mt-0.5">By {call.status}</div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-1.5 mb-1.5">
                                                    {call.type === 'Outgoing' ? <PhoneOutgoing size={12} className="text-[#64748B]" /> : <PhoneIncoming size={12} className="text-[#86D9A9]" />}
                                                    <span className="font-black text-[10px] uppercase tracking-widest text-[#26382E]">{call.type}</span>
                                                </div>
                                                <span className="text-[9px] px-2 py-0.5 bg-[#EDF8F0] border border-[#DDE8E0] rounded text-[#26382E] font-bold">{call.duration}</span>
                                            </td>
                                            <td className="px-6 py-5 text-[#64748B] text-[11px] font-medium leading-relaxed italic truncate max-w-[250px]">
                                                "{call.notes}"
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <span className={cn(
                                                    "px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest border shadow-sm",
                                                    call.outcome === 'Qualified' ? 'bg-[#DDF7E8] text-[#26382E] border-[#86D9A9]/30' :
                                                        call.outcome === 'Interested' ? 'bg-[#EDF8F0] text-[#26382E] border-[#DDE8E0]' :
                                                            call.outcome === 'Follow-up' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                                                'bg-[#EDF8F0] text-[#64748B] border-[#DDE8E0]'
                                                )}>
                                                    {call.outcome}
                                                </span>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Log Call Modal */}
            <AnimatePresence>
                {isLogModalOpen && (
                    <>
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                                onClick={() => setIsLogModalOpen(false)}
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="relative w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#DDE8E0] flex flex-col max-h-[90vh] overflow-hidden"
                            >
                                <div className="p-6 border-b border-[#DDE8E0] bg-[#EDF8F0]/70 flex justify-between items-center shrink-0">
                                    <h2 className="text-lg font-black text-[#26382E] uppercase tracking-tight flex items-center gap-2">
                                        <PhoneCall size={18} className="text-[#86D9A9]" /> Dispatch Log
                                    </h2>
                                </div>
                                <div className="p-6 space-y-4 overflow-y-auto custom-scrollbar">
                                    <div>
                                        <label className="block text-[10px] font-black text-[#64748B] uppercase tracking-widest mb-1.5">Lead Profile</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Alice Johnson"
                                            value={newCallData.lead}
                                            onChange={(e) => setNewCallData({ ...newCallData, lead: e.target.value })}
                                            className="w-full p-3 border border-[#DDE8E0] rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#86D9A9] shadow-sm bg-white text-[#26382E]"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-black text-[#64748B] uppercase tracking-widest mb-1.5">Direction</label>
                                            <select
                                                value={newCallData.type}
                                                onChange={(e) => setNewCallData({ ...newCallData, type: e.target.value })}
                                                className="w-full p-3 border border-[#DDE8E0] rounded-xl text-xs font-black uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-[#86D9A9] shadow-sm appearance-none bg-white text-[#26382E]"
                                            >
                                                <option>Outgoing</option>
                                                <option>Incoming</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-[#64748B] uppercase tracking-widest mb-1.5">Duration</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. 12m 30s"
                                                value={newCallData.duration}
                                                onChange={(e) => setNewCallData({ ...newCallData, duration: e.target.value })}
                                                className="w-full p-3 border border-[#DDE8E0] rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#86D9A9] shadow-sm bg-white text-[#26382E]"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-[#64748B] uppercase tracking-widest mb-1.5">Outcome Mapping</label>
                                        <select
                                            value={newCallData.outcome}
                                            onChange={(e) => setNewCallData({ ...newCallData, outcome: e.target.value })}
                                            className="w-full p-3 border border-[#DDE8E0] rounded-xl text-xs font-black uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-[#86D9A9] shadow-sm appearance-none bg-white text-[#26382E]"
                                        >
                                            <option>Interested</option>
                                            <option>Qualified</option>
                                            <option>Follow-up</option>
                                            <option>Not Interested</option>
                                            <option>No Answer</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-[#64748B] uppercase tracking-widest mb-1.5">Verbatim Notes</label>
                                        <textarea
                                            placeholder="Add conversation summary..."
                                            value={newCallData.notes}
                                            onChange={(e) => setNewCallData({ ...newCallData, notes: e.target.value })}
                                            className="w-full p-3 border border-[#DDE8E0] rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#86D9A9] shadow-sm h-24 resize-none bg-white text-[#26382E]"
                                        />
                                    </div>
                                    <div className="flex gap-3 justify-end pt-4">
                                        <button
                                            onClick={() => setIsLogModalOpen(false)}
                                            className="px-5 py-2.5 text-[10px] font-bold text-[#64748B] uppercase tracking-widest hover:bg-[#EDF8F0] rounded-xl transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleLogCall}
                                            disabled={logCall.isPending || !newCallData.lead || !newCallData.duration}
                                            className="px-5 py-2.5 bg-[#86D9A9] text-[#26382E] text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#A7E8C2] transition-all shadow-sm disabled:opacity-50 flex items-center gap-2"
                                        >
                                            {logCall.isPending ? <Loader size={14} className="animate-spin" /> : 'Commit Log'}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}

export default CallLogging


