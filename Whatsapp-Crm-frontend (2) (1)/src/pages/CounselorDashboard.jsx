import React, { useState } from 'react'
import { Users, Flame, Calendar, Search, Filter, MessageSquare, MoreVertical, FileEdit, ExternalLink, Activity, Target, RefreshCcw, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../lib/utils'
import { useQuery } from '@tanstack/react-query'
import { useCounselorActions } from '../hooks/useCrmMutations'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'
import useAppStore from '../store/useStore'

const QuickStat = ({ title, value, icon: Icon, color, onClick }) => (
    <motion.div
        whileHover={{ y: -4, shadow: '0 10px 25px -5px rgba(134, 217, 169, 0.2)' }}
        className="glass-card p-6 rounded-2xl border border-[#DDE8E0] shadow-sm flex items-center justify-between group relative overflow-hidden shrink-0"
    >
        <div className="absolute -right-6 -top-6 text-[#86D9A9]/10 pointer-events-none transition-transform group-hover:scale-110 group-hover:rotate-12">
            <Icon size={120} />
        </div>
        <div className="flex items-center gap-4 relative z-10">
            <div className={cn("p-3 rounded-xl shadow-sm transition-transform group-hover:scale-110", color)}>
                <Icon className="h-6 w-6" />
            </div>
            <div>
                <p className="text-[10px] font-black text-[#64748B] uppercase tracking-widest">{title}</p>
                <h3 className="text-3xl font-black text-[#26382E] mt-1">{value}</h3>
            </div>
        </div>
        <button
            onClick={onClick}
            className="p-1.5 text-gray-400 hover:text-[#26382E] hover:bg-[#DDF7E8] rounded-lg transition-colors relative z-10 h-max self-start"
            title="Refresh Data"
        >
            <RefreshCcw size={14} />
        </button>
    </motion.div>
)

const CounselorDashboard = () => {
    const navigate = useNavigate()
    const { updateStage, addNote } = useCounselorActions()
    const [searchTerm, setSearchTerm] = useState('')
    const { setSelectedLeadId } = useAppStore()
    const [noteModalOpen, setNoteModalOpen] = useState(null)
    const [noteText, setNoteText] = useState('')

    // Fetch Stats
    const { data: dashboardResp, refetch: refetchDash, isLoading: loadingDash } = useQuery({
        queryKey: ['counselor-dashboard'],
        queryFn: async () => {
            const res = await api.get('/dashboard/counselor');
            return res.data;
        }
    })
    const dashboardData = dashboardResp?.data || {};

    // Fetch Leads
    const { data: myLeadsResp, refetch: refetchLeads, isLoading: loadingLeads } = useQuery({
        queryKey: ['counselor-leads'],
        queryFn: async () => {
            const res = await api.get('/counselor/leads');
            return res.data || res;
        }
    })

    const leadsData = Array.isArray(myLeadsResp?.data) ? myLeadsResp.data : (Array.isArray(myLeadsResp) ? myLeadsResp : []);
    const filteredLeads = leadsData.filter(l =>
        (l.name && l.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (l.program && l.program.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (l.country && l.country.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    const handleSaveNote = () => {
        if (!noteText.trim()) return;
        addNote.mutate({ leadId: noteModalOpen.id, text: noteText }, {
            onSuccess: () => {
                setNoteModalOpen(null);
                setNoteText('');
            }
        });
    }

    const openChat = (id) => {
        setSelectedLeadId(id);
        navigate('/inbox');
    }

    if (loadingDash || loadingLeads) return (
        <div className="h-96 flex items-center justify-center">
            <RefreshCcw className="animate-spin text-[#26382E]" size={32} />
        </div>
    )

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-[#26382E] uppercase tracking-tighter">My Workspace</h1>
                    <p className="text-sm font-medium text-[#64748B] mt-1">Manage your pipeline, engage leads, and track performance.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => navigate('/analytics')}
                        className="glass-card bg-white/80 border text-[#26382E] border-[#DDE8E0] px-5 py-2.5 rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-[#DDF7E8] transition-all shadow-sm flex items-center gap-2"
                    >
                        <Filter size={14} /> Global Filters
                    </button>
                    <button 
                        onClick={() => navigate('/counselor/calls')}
                        className="bg-[#86D9A9] text-[#26382E] px-5 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-[#A7E8C2] transition-all shadow-sm active:scale-95 flex items-center gap-2"
                    >
                        <Calendar size={14} /> Schedule Follow-up
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <QuickStat
                    title="Assigned Leads"
                    value={dashboardData?.assignedLeads || 0}
                    icon={Users}
                    color="bg-[#DDF7E8] text-[#26382E]"
                    onClick={() => refetchDash()}
                />
                <QuickStat
                    title="Hot Leads"
                    value={dashboardData?.hotLeads || 0}
                    icon={Flame}
                    color="bg-rose-50 text-rose-600"
                    onClick={() => refetchDash()}
                />
                <QuickStat
                    title="Action Pendings"
                    value={dashboardData?.followUps || 0}
                    icon={Target}
                    color="bg-[#EDF8F0] text-[#26382E]"
                    onClick={() => refetchDash()}
                />
            </div>

            <div className="glass-card rounded-3xl border border-[#DDE8E0] shadow-sm overflow-hidden flex flex-col">
                <div className="p-6 border-b border-[#DDE8E0] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#EDF8F0]/50">
                    <div className="flex items-center gap-4">
                        <h3 className="font-black text-[#26382E] uppercase tracking-widest text-xs">My Active Portfolio</h3>
                        <div className="h-5 w-px bg-[#DDE8E0] hidden sm:block" />
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-[#86D9A9] animate-pulse" />
                            <span className="text-[10px] font-black text-[#64748B] uppercase tracking-widest">Live Sync</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative flex-1 sm:w-72">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
                            <input
                                type="text"
                                placeholder="Search leads by name, country or program..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 border border-[#DDE8E0] rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#86D9A9] outline-none transition-all shadow-sm bg-white text-[#26382E]"
                            />
                        </div>
                        <button onClick={() => refetchLeads()} className="p-2 border border-[#DDE8E0] rounded-xl hover:bg-[#DDF7E8] transition-all text-[#64748B] hover:text-[#26382E] shadow-sm">
                            <RefreshCcw size={16} className={loadingLeads ? "animate-spin" : ""} />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto min-h-[400px]">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#EDF8F0]/30 border-b border-[#DDE8E0]">
                                <th className="px-6 py-4 font-black text-[#64748B] uppercase tracking-widest text-[9px]">Lead Profile</th>
                                <th className="px-6 py-4 font-black text-[#64748B] uppercase tracking-widest text-[9px]">Program Interest</th>
                                <th className="px-6 py-4 font-black text-[#64748B] uppercase tracking-widest text-[9px]">Source</th>
                                <th className="px-6 py-4 font-black text-[#64748B] uppercase tracking-widest text-[9px]">AI Score</th>
                                <th className="px-6 py-4 font-black text-[#64748B] uppercase tracking-widest text-[9px]">Lifecycle Stage</th>
                                <th className="px-6 py-4 font-black text-[#64748B] uppercase tracking-widest text-[9px]">Last Comms</th>
                                <th className="px-6 py-4 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#DDE8E0]">
                            <AnimatePresence mode='popLayout'>
                                {filteredLeads.map((lead) => (
                                    <motion.tr
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        key={lead.id}
                                        className="group hover:bg-[#EDF8F0]/40 transition-colors"
                                    >
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 bg-[#DDF7E8] text-[#26382E] rounded-2xl flex items-center justify-center font-black text-sm border border-[#86D9A9]/40 shadow-sm shrink-0">
                                                    {lead.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-black text-[#26382E] group-hover:text-[#26382E] transition-colors uppercase tracking-tight text-xs flex items-center gap-1.5">
                                                        {lead.name}
                                                    </div>
                                                    <div className="text-[10px] text-[#64748B] font-bold uppercase tracking-wider">{lead.country}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="text-[#26382E] font-black text-[11px] uppercase tracking-tight">{lead.program}</span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="text-[10px] font-bold text-[#26382E] uppercase tracking-widest bg-[#EDF8F0] border border-[#DDE8E0] px-2 py-1 rounded inline-block">
                                                {lead.source}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            {lead.score ? (
                                                <div className="flex items-center gap-3 w-24">
                                                    <div className="flex-1 bg-gray-100 h-1.5 rounded-full overflow-hidden shadow-inner flex shrink-0">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${lead.score}%` }}
                                                            transition={{ duration: 1, ease: "easeOut" }}
                                                            className={cn(
                                                                "h-full",
                                                                lead.score > 80 ? 'bg-[#86D9A9]' :
                                                                    lead.score > 50 ? 'bg-[#A7E8C2]' :
                                                                        'bg-amber-400'
                                                            )}
                                                        />
                                                    </div>
                                                    <span className="text-[10px] font-black text-[#26382E]">{lead.score}</span>
                                                </div>
                                            ) : (
                                                <span className="text-[10px] text-[#64748B] font-bold uppercase italic tracking-widest animate-pulse">Analyzing</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-5">
                                            <select
                                                value={lead.stage}
                                                onChange={(e) => updateStage.mutate({ leadId: lead.id, stage: e.target.value })}
                                                className={cn(
                                                    "px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border appearance-none outline-none cursor-pointer transition-all focus:ring-2 focus:ring-offset-1 focus:ring-[#86D9A9]",
                                                    lead.stage === 'Qualified' ? 'bg-[#DDF7E8] text-[#26382E] border-[#86D9A9]/40' :
                                                        lead.stage === 'Converted' ? 'bg-[#86D9A9] text-[#26382E] border-[#86D9A9]' :
                                                            lead.stage === 'New' ? 'bg-[#EDF8F0] text-[#26382E] border-[#DDE8E0]' :
                                                                lead.stage === 'Lost' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                                                                    'bg-amber-50 text-amber-700 border-amber-200'
                                                )}
                                            >
                                                <option>New</option>
                                                <option>Contacted</option>
                                                <option>Pending</option>
                                                <option>Qualified</option>
                                                <option>Converted</option>
                                                <option>Lost</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-1.5 text-[#64748B] text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                                                <Activity size={12} className="text-[#86D9A9]" />
                                                {lead.lastActivity}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2 transition-opacity">
                                                <button
                                                    onClick={() => openChat(lead.id)}
                                                    className="w-8 h-8 flex items-center justify-center border border-[#86D9A9]/40 rounded-xl text-[#26382E] bg-[#DDF7E8] hover:bg-[#86D9A9]/50 transition-all shadow-sm shrink-0"
                                                    title="Open in Unified Inbox"
                                                >
                                                    <MessageSquare size={16} />
                                                </button>
                                                <button
                                                    onClick={() => setNoteModalOpen(lead)}
                                                    className="w-8 h-8 flex items-center justify-center border border-[#DDE8E0] rounded-xl text-[#64748B] hover:text-[#26382E] hover:bg-[#EDF8F0] transition-all shadow-sm bg-white shrink-0"
                                                    title="Add Note"
                                                >
                                                    <FileEdit size={16} />
                                                </button>
                                                <button 
                                                    onClick={() => navigate('/leads')}
                                                    className="w-8 h-8 flex items-center justify-center border border-[#DDE8E0] rounded-xl text-[#64748B] hover:text-[#26382E] hover:bg-[#EDF8F0] transition-all shadow-sm bg-white shrink-0" 
                                                    title="View Profile"
                                                >
                                                    <ExternalLink size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                            {filteredLeads.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center justify-center opacity-50">
                                            <Search size={48} className="text-gray-300 mb-4" />
                                            <p className="text-[#64748B] uppercase tracking-widest font-black text-xs">No leads in current pipeline.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Note Modal */}
            <AnimatePresence>
                {noteModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
                            onClick={(e) => {
                                if (e.target === e.currentTarget) setNoteModalOpen(null);
                            }}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-[#DDE8E0] flex flex-col max-h-[90vh]"
                            >
                                <div className="p-6 border-b border-[#DDE8E0] bg-[#EDF8F0]/70 shrink-0">
                                <h2 className="text-lg font-black text-[#26382E] uppercase tracking-tight">Add Operational Note</h2>
                                <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mt-1">Lead: {noteModalOpen.name}</p>
                            </div>
                            <div className="p-6 overflow-y-auto custom-scrollbar">
                                <textarea
                                    className="w-full h-32 p-4 border border-[#DDE8E0] rounded-xl resize-none focus:ring-2 focus:ring-[#86D9A9] outline-none transition-all shadow-sm text-sm bg-white text-[#26382E]"
                                    placeholder="Enter internal progression notes here..."
                                    value={noteText}
                                    onChange={(e) => setNoteText(e.target.value)}
                                />
                                <div className="flex gap-3 justify-end mt-6">
                                    <button
                                        onClick={() => setNoteModalOpen(null)}
                                        className="px-5 py-2.5 text-xs font-bold text-[#64748B] uppercase tracking-widest hover:bg-[#EDF8F0] rounded-xl transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSaveNote}
                                        disabled={addNote.isPending || !noteText.trim()}
                                        className="px-5 py-2.5 bg-[#86D9A9] text-[#26382E] text-xs font-black uppercase tracking-widest rounded-xl hover:bg-[#A7E8C2] transition-all shadow-sm disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {addNote.isPending ? <RefreshCcw size={14} className="animate-spin" /> : 'Save Note'}
                                    </button>
                                </div>
                            </div>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}

export default CounselorDashboard


