import React, { useState } from 'react'
import { MessageSquare, UserPlus, Zap, Filter, Search, UserCheck, RefreshCcw, MoreVertical, LayoutGrid, CheckSquare, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'
import { useQuery } from '@tanstack/react-query'
import { useSupportActions } from '../../hooks/useCrmMutations'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'
import { toast } from '../../components/ui/Toast'

const QuickStat = ({ title, value, icon: Icon, color, onClick }) => (
    <motion.div
        whileHover={{ y: -4, shadow: '0 10px 25px -5px rgba(134, 217, 169, 0.2)' }}
        className="glass-card p-6 rounded-2xl border border-[#DDE8E0] shadow-sm flex items-center justify-between group relative overflow-hidden"
    >
        <div className="absolute -right-6 -top-6 text-[#86D9A9]/10 pointer-events-none transition-transform group-hover:scale-110 group-hover:rotate-12">
            <Icon size={120} />
        </div>
        <div className="flex items-center gap-4 relative z-10">
            <div className={cn("p-4 rounded-xl shadow-sm transition-transform group-hover:scale-110", color)}>
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

const SupportDashboard = () => {
    const navigate = useNavigate()
    const { bulkAssign, assignLead, createLead, convertLead } = useSupportActions()
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedLeads, setSelectedLeads] = useState([])
    const [assignmentModalOpen, setAssignmentModalOpen] = useState(false)
    const [isManualModalOpen, setIsManualModalOpen] = useState(false)
    const [assignmentData, setAssignmentData] = useState({ team: 'Global Direct Team', counselorId: '', priority: 'Medium' })
    const [newLeadData, setNewLeadData] = useState({ name: '', phone: '', type: 'MBA' })

    // Fetch Counselors for assignment
    const { data: counselorsResp } = useQuery({
        queryKey: ['counselors-list'],
        queryFn: () => api.get('/users')
    })
    const usersArr = Array.isArray(counselorsResp?.data) ? counselorsResp.data : (Array.isArray(counselorsResp) ? counselorsResp : [])
    const counselors = usersArr.filter(u => u.role === 'COUNSELOR' || u.role === 'Counselor')

    // Fetch Real Data
    const { data: dashboardData, refetch: refetchDash } = useQuery({
        queryKey: ['support-dashboard'],
        queryFn: () => api.get('/support/dashboard')
    })

    const { data: queueResp, refetch: refetchQueue, isLoading } = useQuery({
        queryKey: ['support-queue'],
        queryFn: () => api.get('/support/leads/queue')
    })

    const queueData = Array.isArray(queueResp?.data) ? queueResp.data : (Array.isArray(queueResp) ? queueResp : [])
    const kpis = dashboardData?.data || { newMessages: 0, unassignedLeads: 0, aiActiveChats: 0 }

    const filteredQueue = queueData.filter(l =>
        (l.name && l.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (l.country && l.country.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (l.source && l.source.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    const toggleSelect = (id) => {
        setSelectedLeads(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
    }

    const toggleSelectAll = () => {
        if (selectedLeads.length === filteredQueue.length) {
            setSelectedLeads([])
        } else {
            setSelectedLeads(filteredQueue.map(l => l.id))
        }
    }

    const handleBulkAssign = () => {
        if (selectedLeads.length === 0) return;
        bulkAssign.mutate({ leadIds: selectedLeads, ...assignmentData }, {
            onSuccess: () => {
                setAssignmentModalOpen(false)
                setSelectedLeads([])
            }
        })
    }

    const handleSingleAssign = (lead) => {
        setSelectedLeads([lead.id])
        setAssignmentModalOpen(true)
    }

    const handleCreateLead = () => {
        if (!newLeadData.name || !newLeadData.phone) {
            toast.error("Name and Phone are required");
            return;
        }
        createLead.mutate(newLeadData, {
            onSuccess: () => {
                setIsManualModalOpen(false);
                setNewLeadData({ name: '', phone: '', type: 'MBA' });
                refetchQueue();
            }
        });
    }

    const handleConfirmAssignment = () => {
        if (!assignmentData.counselorId) {
            toast.error("Please select a counselor");
            return;
        }
        bulkAssign.mutate({ 
            leadIds: selectedLeads, 
            counselorId: parseInt(assignmentData.counselorId) 
        }, {
            onSuccess: () => {
                setAssignmentModalOpen(false);
                setSelectedLeads([]);
                refetchQueue();
            }
        });
    }

    const convertToCrm = (lead) => {
        convertLead.mutate(lead.id);
    }

    return (
        <div className="space-y-8 max-w-7xl w-full min-w-0 mx-auto px-4 sm:px-0 py-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 flex-wrap">
                <div className="min-w-0">
                    <h1 className="text-2xl font-black text-[#26382E] uppercase tracking-tight">New Leads Queue</h1>
                    <p className="text-sm font-medium text-[#64748B] mt-1">Manage unassigned leads and orchestrate routing protocols.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <button 
                        onClick={() => setIsManualModalOpen(true)}
                        className="bg-[#86D9A9] text-[#26382E] px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#A7E8C2] shadow-sm active:scale-95 transition-all flex items-center gap-2"
                    >
                        <UserPlus size={16} /> Provision Manual Node
                    </button>
                    <button 
                        onClick={() => navigate('/analytics')}
                        className="glass-card bg-white/80 border border-[#DDE8E0] px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest text-[#26382E] shadow-sm hover:bg-[#DDF7E8] transition-all flex items-center gap-2"
                    >
                        <Filter size={16} className="text-[#26382E]" /> Filter Queue
                    </button>
                    {selectedLeads.length > 0 && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={() => setAssignmentModalOpen(true)}
                            className="bg-[#26382E] text-white px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#1b2720] shadow-md transition-all flex items-center gap-2"
                        >
                            <UserCheck size={16} className="text-[#86D9A9]" /> Bulk Assign ({selectedLeads.length})
                        </motion.button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <QuickStat
                    title="New Messages"
                    value={kpis.newMessages}
                    icon={MessageSquare}
                    color="bg-[#DDF7E8] text-[#26382E]"
                    onClick={() => refetchDash()}
                />
                <QuickStat
                    title="Unassigned Leads"
                    value={kpis.unassignedLeads}
                    icon={UserPlus}
                    color="bg-amber-50 text-amber-600"
                    onClick={() => refetchDash()}
                />
                <QuickStat
                    title="AI Active Chats"
                    value={kpis.aiActiveChats}
                    icon={Zap}
                    color="bg-[#EDF8F0] text-[#26382E]"
                    onClick={() => refetchDash()}
                />
            </div>

            <div className="glass-card rounded-3xl border border-[#DDE8E0] shadow-sm flex flex-col overflow-hidden w-full min-w-0">
                <div className="px-4 sm:px-6 py-5 border-b border-[#DDE8E0] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#EDF8F0]/50 flex-wrap">
                    <div className="flex items-center gap-4 flex-wrap">
                        <h3 className="font-black text-[#26382E] text-xs uppercase tracking-widest">Inbound Triage</h3>
                        <div className="h-5 w-px bg-[#DDE8E0] hidden sm:block" />
                        <span className="bg-[#DDF7E8] text-[#26382E] px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border border-[#86D9A9]/30 flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#86D9A9] animate-ping" /> Live Polling
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative flex-1 sm:w-72">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
                            <input
                                type="text"
                                placeholder="Search by name, source or country..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 border border-[#DDE8E0] rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#86D9A9] bg-white/90 text-[#26382E] transition-all shadow-sm"
                            />
                        </div>
                        <button onClick={() => refetchQueue()} className="p-2 border border-[#DDE8E0] rounded-xl hover:bg-[#DDF7E8] transition-all text-[#64748B] hover:text-[#26382E] shadow-sm shrink-0">
                            <RefreshCcw size={16} className={isLoading ? "animate-spin" : ""} />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto no-scrollbar min-h-[300px] w-full max-w-full">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className="bg-[#EDF8F0]/30 border-b border-[#DDE8E0]">
                                <th className="pl-6 pr-2 py-4 w-10">
                                    <button onClick={toggleSelectAll} className="p-1 rounded text-[#64748B] hover:text-[#26382E] transition-colors">
                                        <CheckSquare size={16} className={selectedLeads.length === filteredQueue.length && filteredQueue.length > 0 ? "text-[#26382E]" : ""} />
                                    </button>
                                </th>
                                <th className="px-4 py-4 font-black text-[#64748B] uppercase tracking-widest text-[9px]">Lead Profile</th>
                                <th className="px-4 py-4 font-black text-[#64748B] uppercase tracking-widest text-[9px]">Source</th>
                                <th className="px-4 py-4 font-black text-[#64748B] uppercase tracking-widest text-[9px]">Received Time</th>
                                <th className="px-4 py-4 font-black text-[#64748B] uppercase tracking-widest text-[9px]">AI Score</th>
                                <th className="px-4 py-4 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#DDE8E0]">
                            <AnimatePresence>
                                {filteredQueue.map((lead) => (
                                    <motion.tr
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        key={lead.id}
                                        className={cn(
                                            "group transition-colors",
                                            selectedLeads.includes(lead.id) ? "bg-[#DDF7E8]/40" : "hover:bg-[#EDF8F0]/40"
                                        )}
                                    >
                                        <td className="pl-6 pr-2 py-5">
                                            <button onClick={() => toggleSelect(lead.id)} className="p-1 rounded text-[#64748B] hover:text-[#26382E] transition-colors">
                                                <CheckSquare size={16} className={selectedLeads.includes(lead.id) ? "text-[#26382E]" : ""} />
                                            </button>
                                        </td>
                                        <td className="px-4 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 bg-[#DDF7E8] text-[#26382E] rounded-xl flex items-center justify-center font-black text-xs border border-[#86D9A9]/40 shadow-sm shrink-0">
                                                    {lead.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-black text-[#26382E] uppercase tracking-tight text-xs flex items-center gap-1.5 group-hover:text-[#26382E] transition-colors cursor-pointer">
                                                        {lead.name}
                                                    </div>
                                                    <div className="text-[9px] text-[#64748B] font-bold uppercase tracking-widest mt-0.5">{lead.country}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-5">
                                            <span className="text-[9px] font-bold text-[#26382E] uppercase tracking-widest bg-[#EDF8F0] border border-[#DDE8E0] px-2.5 py-1 rounded-md inline-block">
                                                {lead.source}
                                            </span>
                                        </td>
                                        <td className="px-4 py-5">
                                            <span className="text-[10px] font-black text-[#26382E] uppercase tracking-tight">{lead.receivedTime}</span>
                                        </td>
                                        <td className="px-4 py-5">
                                            {lead.score ? (
                                                <div className="flex items-center gap-2 w-20">
                                                    <div className="flex-1 bg-gray-100 h-1.5 rounded-full overflow-hidden shadow-inner flex shrink-0">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${lead.score}%` }}
                                                            className={cn("h-full", lead.score > 80 ? 'bg-[#86D9A9]' : 'bg-amber-400')}
                                                        />
                                                    </div>
                                                    <span className="text-[9px] font-black text-[#26382E]">{lead.score}</span>
                                                </div>
                                            ) : (
                                                <span className="text-[9px] text-[#64748B] font-bold uppercase tracking-widest italic flex items-center gap-1"><Sparkles size={10} className="text-[#86D9A9]" /> Active</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2 transition-opacity">
                                                <button onClick={() => handleSingleAssign(lead)} className="px-3 py-1.5 bg-[#86D9A9] text-[#26382E] rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-[#A7E8C2] transition-all shadow-sm flex items-center gap-1.5">
                                                    <UserCheck size={12} /> Assign
                                                </button>
                                                <button onClick={() => convertToCrm(lead)} className="px-3 py-1.5 border border-[#86D9A9] bg-[#DDF7E8] rounded-lg text-[#26382E] hover:bg-[#86D9A9]/50 transition-all shadow-sm uppercase text-[9px] font-black tracking-widest inline-flex items-center gap-1">
                                                    Convert
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                            {filteredQueue.length === 0 && !isLoading && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center justify-center opacity-50">
                                            <LayoutGrid size={48} className="text-gray-300 mb-4" />
                                            <p className="text-[#64748B] uppercase tracking-widest font-black text-xs">Queue is clear.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Assignment Modal */}
            <AnimatePresence>
                {assignmentModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                            onClick={() => setAssignmentModalOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#DDE8E0] flex flex-col max-h-[90vh] overflow-hidden"
                        >
                            <div className="p-6 border-b border-[#DDE8E0] bg-[#EDF8F0]/70 flex justify-between items-center shrink-0">
                                <h2 className="text-lg font-black text-[#26382E] uppercase tracking-tight flex items-center gap-2">
                                    <UserCheck size={18} className="text-[#86D9A9]" /> Lead Redistribution
                                </h2>
                            </div>
                            <div className="p-6 space-y-5 overflow-y-auto custom-scrollbar">
                                <div className="p-4 bg-[#DDF7E8]/50 border border-[#86D9A9]/30 rounded-2xl">
                                    <p className="text-[10px] font-black text-[#26382E] uppercase tracking-widest mb-1">Target Selection</p>
                                    <p className="font-bold text-sm text-[#26382E]">{selectedLeads.length} Lead(s) Selected for Assignment</p>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-[10px] font-black text-[#64748B] uppercase tracking-widest mb-1.5">Target Division</label>
                                        <select
                                            value={assignmentData.team}
                                            onChange={(e) => setAssignmentData({ ...assignmentData, team: e.target.value })}
                                            className="w-full p-3 border border-[#DDE8E0] rounded-xl text-xs font-black uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-[#86D9A9] shadow-sm appearance-none bg-white text-[#26382E]"
                                        >
                                            <option>Global Direct Team</option>
                                            <option>South East Asia Division</option>
                                            <option>Europe Operations</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-[#64748B] uppercase tracking-widest mb-1.5">Active Counselor</label>
                                        <select
                                            value={assignmentData.counselorId}
                                            onChange={(e) => setAssignmentData({ ...assignmentData, counselorId: e.target.value })}
                                            className="w-full p-3 border border-[#DDE8E0] rounded-xl text-xs font-black uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-[#86D9A9] shadow-sm appearance-none bg-white text-[#26382E]"
                                        >
                                            <option value="">Select Counselor...</option>
                                            {counselors.map(c => (
                                                <option key={c.id} value={c.id}>{c.name} ({c.status})</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="flex gap-3 justify-end pt-4">
                                    <button
                                        onClick={() => setAssignmentModalOpen(false)}
                                        className="px-5 py-2.5 text-[10px] font-bold text-[#64748B] uppercase tracking-widest hover:bg-[#EDF8F0] rounded-xl transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleConfirmAssignment}
                                        disabled={bulkAssign.isPending}
                                        className="px-5 py-2.5 bg-[#86D9A9] text-[#26382E] text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#A7E8C2] transition-all shadow-sm disabled:opacity-50 flex items-center gap-2"
                                    >
                                        Confirm Transfer
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Manual Lead Modal */}
            <AnimatePresence>
                {isManualModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                            onClick={() => setIsManualModalOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#DDE8E0] flex flex-col mx-2 sm:mx-auto max-h-[85vh] overflow-y-auto no-scrollbar"
                        >
                            <div className="p-6 border-b border-[#DDE8E0] bg-[#EDF8F0]/70 flex justify-between items-center">
                                <h2 className="text-lg font-black text-[#26382E] uppercase tracking-tight flex items-center gap-2">
                                    <UserPlus size={18} className="text-[#86D9A9]" /> Provision Manual Lead
                                </h2>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-[10px] font-black text-[#64748B] uppercase tracking-widest mb-1.5">Lead Full Name</label>
                                    <input
                                        type="text"
                                        value={newLeadData.name}
                                        onChange={(e) => setNewLeadData({ ...newLeadData, name: e.target.value })}
                                        className="w-full p-3 border border-[#DDE8E0] rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#86D9A9] outline-none text-[#26382E]"
                                        placeholder="Enter lead name..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-[#64748B] uppercase tracking-widest mb-1.5">Phone Number</label>
                                    <input
                                        type="text"
                                        value={newLeadData.phone}
                                        onChange={(e) => setNewLeadData({ ...newLeadData, phone: e.target.value })}
                                        className="w-full p-3 border border-[#DDE8E0] rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#86D9A9] outline-none text-[#26382E]"
                                        placeholder="+91 XXXXX XXXXX"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-[#64748B] uppercase tracking-widest mb-1.5">Program Stream</label>
                                    <select
                                        value={newLeadData.type}
                                        onChange={(e) => setNewLeadData({ ...newLeadData, type: e.target.value })}
                                        className="w-full p-3 border border-[#DDE8E0] rounded-xl text-xs font-black uppercase tracking-widest appearance-none bg-white outline-none text-[#26382E]"
                                    >
                                        <option>MBA</option>
                                        <option>B.Tech</option>
                                        <option>Medical</option>
                                        <option>Commerce</option>
                                    </select>
                                </div>
                                <div className="flex gap-3 justify-end pt-4">
                                    <button
                                        onClick={() => setIsManualModalOpen(false)}
                                        className="px-5 py-2.5 text-[10px] font-bold text-[#64748B] uppercase tracking-widest hover:bg-[#EDF8F0] rounded-xl transition-colors"
                                    >
                                        Discard
                                    </button>
                                    <button
                                        onClick={handleCreateLead}
                                        disabled={createLead.isPending}
                                        className="px-5 py-2.5 bg-[#86D9A9] text-[#26382E] text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#A7E8C2] shadow-sm disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {createLead.isPending ? 'Processing...' : 'Provision Node'}
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

export default SupportDashboard



