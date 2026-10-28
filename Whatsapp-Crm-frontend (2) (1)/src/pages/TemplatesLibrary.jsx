import React, { useState } from 'react'
import { Search, Plus, Trash2, Edit3, MessageSquareQuote, CheckSquare, X, RefreshCcw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../lib/utils'
import { useQuery } from '@tanstack/react-query'
import { useTemplateActions, useChatActions } from '../hooks/useCrmMutations'
import useAppStore from '../store/useStore'
import api from '../services/api'
import { toast } from '../components/ui/Toast'

const TemplatesLibrary = () => {
    const { addTemplate, deleteTemplate, updateTemplate } = useTemplateActions()
    const { sendMessage } = useChatActions()
    const { selectedLeadId, role } = useAppStore()
    const [searchTerm, setSearchTerm] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editId, setEditId] = useState(null)
    const [formData, setFormData] = useState({ name: '', channel: 'WhatsApp', text: '' })

    const { data: resp, isLoading, refetch } = useQuery({
        queryKey: ['message-templates'],
        queryFn: () => api.get('/templates')
    })

    const dataToMap = Array.isArray(resp?.data) ? resp.data : (Array.isArray(resp) ? resp : []);
    const templates = dataToMap.map(t => ({
        id: t.id,
        name: t.name,
        channel: t.category,
        preview: t.content,
        createdBy: 'Administrator',
        date: new Date(t.createdAt).toLocaleDateString()
    }))

    const filteredTemplates = templates.filter(tpl =>
        (tpl.name && tpl.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (tpl.preview && tpl.preview.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    const handleSubmitTemplate = () => {
        const payload = { 
            name: formData.name,
            content: formData.text,
            category: formData.channel
        };
        
        if (!isEditing) {
            addTemplate.mutate(payload, {
                onSuccess: () => {
                    setIsModalOpen(false)
                    setFormData({ name: '', channel: 'WhatsApp', text: '' })
                    refetch()
                }
            })
        } else {
            updateTemplate.mutate({ id: editId, ...payload }, {
                onSuccess: () => {
                    setIsModalOpen(false)
                    setFormData({ name: '', channel: 'WhatsApp', text: '' })
                    setIsEditing(false)
                    setEditId(null)
                    refetch()
                }
            })
        }
    }

    const openEditModal = (tpl) => {
        setFormData({ name: tpl.name, channel: tpl.channel, text: tpl.preview || '' })
        setEditId(tpl.id)
        setIsEditing(true)
        setIsModalOpen(true)
    }

    const openCreateModal = () => {
        setFormData({ name: '', channel: 'WhatsApp', text: '' })
        setIsEditing(false)
        setEditId(null)
        setIsModalOpen(true)
    }

    const handleUseInChat = async (tpl) => {
        let currentLeadId = selectedLeadId;

        // Fallback: If no lead is selected in the store, fetch the most recent lead from the API
        if (!currentLeadId) {
            try {
                const leadsResp = await api.get('/leads');
                const leadsData = leadsResp.data?.data || (Array.isArray(leadsResp.data) ? leadsResp.data : []);
                const firstLead = leadsData[0];
                
                if (firstLead) {
                    currentLeadId = firstLead.id;
                }
            } catch (err) {
                console.error("[Templates] Fallback lead fetch failed:", err);
            }
        }

        if (!currentLeadId) {
            toast.error("Protocol deployment failed: No active lead selected in Unified Inbox.")
            return;
        }

        sendMessage.mutate({
            leadId: currentLeadId,
            message: tpl.preview || tpl.text,
            sender: role,
            channel: tpl.channel || 'WhatsApp'
        }, {
            onSuccess: () => {
                toast.success(`Protocol "${tpl.name}" successfully injected into active workspace.`)
            }
        })
    }

    if (isLoading) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
                <div className="relative">
                    <div className="h-16 w-16 border-4 border-[#DDE8E0] border-t-[#86D9A9] rounded-full animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center font-bold text-xs text-[#26382E]">W</div>
                </div>
                <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-[0.3em] animate-pulse">Syncing Repository Data...</p>
            </div>
        )
    }

    return (
        <div className="space-y-8 md:space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
                <div>
                    <div className="flex items-center gap-2 md:gap-3 mb-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#86D9A9] shadow-[0_0_10px_rgba(134,217,169,0.5)]" />
                        <span className="text-[9px] md:text-[10px] font-bold text-emerald-700 uppercase tracking-[0.3em]">Knowledge Base</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-[#26382E] tracking-tighter uppercase">Templates</h1>
                    <p className="text-[10px] md:text-sm font-medium text-[#64748B] mt-2 max-w-xl">
                        Standardized communication nodes for omni-channel synchronization.
                    </p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="h-12 md:h-14 bg-[#86D9A9] text-[#26382E] px-6 md:px-10 rounded-xl md:rounded-2xl font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em] hover:bg-[#A7E8C2] transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2 md:gap-4 w-full md:w-auto"
                >
                    <Plus size={16} className="md:w-[18px] md:h-[18px] shrink-0" /> 
                    <span>New Prototype</span>
                </button>
            </div>

            {/* Main Content Area */}
            <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] md:rounded-[2.5rem] border border-[#DDE8E0] shadow-glass overflow-hidden flex flex-col">
                {/* Utility Bar */}
                <div className="p-6 md:p-8 border-b border-[#DDE8E0] flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 bg-[#F4FBF6]/60">
                    <div className="relative flex-1 max-w-md w-full group">
                        <Search className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B] group-focus-within:text-[#26382E] transition-colors" />
                        <input
                            type="text"
                            placeholder="Identify Template Protocol..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 md:pl-14 pr-4 md:pr-6 py-3.5 md:py-4 bg-white border border-[#DDE8E0] rounded-xl md:rounded-2xl text-[10px] md:text-xs font-bold text-[#26382E] uppercase tracking-widest focus:outline-none focus:ring-4 focus:ring-[#86D9A9]/20 focus:border-[#86D9A9] transition-all shadow-sm placeholder:text-[#64748B]/60"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto custom-scrollbar max-w-full">
                    <table className="w-full text-left border-collapse min-w-[700px] md:min-w-[800px]">
                        <thead>
                            <tr className="bg-[#EDF8F0]/50 border-b border-[#DDE8E0]">
                                <th className="px-6 md:px-8 py-5 md:py-6 font-bold text-[#64748B] text-[9px] md:text-[10px] uppercase tracking-[0.2em] min-w-[180px]">Protocol Name</th>
                                <th className="px-5 md:px-6 py-5 md:py-6 font-bold text-[#64748B] text-[9px] md:text-[10px] uppercase tracking-[0.2em] min-w-[120px]">Category</th>
                                <th className="px-5 md:px-6 py-5 md:py-6 font-bold text-[#64748B] text-[9px] md:text-[10px] uppercase tracking-[0.2em] min-w-[200px]">Content Matrix</th>
                                <th className="px-5 md:px-6 py-5 md:py-6 font-bold text-[#64748B] text-[9px] md:text-[10px] uppercase tracking-[0.2em] min-w-[120px]">Author</th>
                                <th className="px-6 md:px-8 py-5 md:py-6 text-right font-bold text-[#64748B] text-[9px] md:text-[10px] uppercase tracking-[0.2em] min-w-[150px]">Operations</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#DDE8E0]/40">
                            <AnimatePresence mode='popLayout'>
                                {filteredTemplates.map((tpl) => (
                                    <motion.tr
                                        layout
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        key={tpl.id}
                                        className="group hover:bg-[#F4FBF6]/80 transition-all"
                                    >
                                        <td className="px-6 md:px-8 py-6 md:py-8">
                                            <div className="flex items-center gap-3 md:gap-4">
                                                <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl bg-[#DDF7E8] border border-[#86D9A9]/40 flex items-center justify-center text-[#26382E] shadow-sm shrink-0">
                                                    <MessageSquareQuote size={16} className="md:w-[18px] md:h-[18px]" />
                                                </div>
                                                <span className="font-bold text-[#26382E] text-[11px] md:text-xs uppercase tracking-tight truncate">
                                                    {tpl.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-5 md:px-6 py-6 md:py-8">
                                            <span className="badge bg-[#DDF7E8] border border-[#86D9A9]/50 text-[#26382E] font-bold text-[9px] md:text-[10px] whitespace-nowrap">
                                                {tpl.channel || 'Global'}
                                            </span>
                                        </td>
                                        <td className="px-5 md:px-6 py-6 md:py-8">
                                            <div className="max-w-[200px] md:max-w-[300px]">
                                                <span className="text-[9px] md:text-[10px] font-medium text-[#64748B] italic group-hover:text-[#26382E] transition-colors line-clamp-2 md:line-clamp-none md:truncate">
                                                    "{tpl.preview || tpl.text}"
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-5 md:px-6 py-6 md:py-8">
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-[9px] md:text-[10px] font-bold text-[#26382E] uppercase tracking-tight truncate">{tpl.createdBy}</span>
                                                <span className="text-[7.5px] md:text-[8px] font-bold text-[#64748B] uppercase tracking-widest mt-0.5 whitespace-nowrap">{tpl.date}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 md:px-8 py-6 md:py-8 text-right">
                                            <div className="flex items-center justify-end gap-2 md:gap-3 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300">
                                                <button 
                                                    onClick={() => handleUseInChat(tpl)} 
                                                    className="h-8 md:h-10 px-4 md:px-6 bg-[#86D9A9] text-[#26382E] rounded-lg md:rounded-xl text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-[#A7E8C2] transition-all shadow-sm active:scale-95 shrink-0"
                                                >
                                                    Inject
                                                </button>
                                                <button 
                                                    onClick={() => openEditModal(tpl)}
                                                    className="h-8 w-8 md:h-10 md:w-10 flex items-center justify-center bg-white border border-[#DDE8E0] rounded-lg md:rounded-xl text-[#64748B] hover:text-[#26382E] hover:bg-[#DDF7E8] hover:border-[#86D9A9] transition-all active:scale-90 shrink-0"
                                                >
                                                    <Edit3 size={14} />
                                                </button>
                                                <button 
                                                    onClick={() => deleteTemplate.mutate(tpl.id, { onSuccess: () => refetch() })} 
                                                    className="h-8 w-8 md:h-10 md:w-10 flex items-center justify-center bg-white border border-[#DDE8E0] rounded-lg md:rounded-xl text-[#64748B] hover:text-rose-600 hover:border-rose-200 transition-all active:scale-90 shrink-0"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                            {filteredTemplates.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center justify-center gap-4">
                                            <div className="h-16 w-16 bg-[#EDF8F0] rounded-full flex items-center justify-center text-[#64748B]">
                                                <MessageSquareQuote size={32} />
                                            </div>
                                            <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-[0.3em]">No protocols found in active directory</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Template Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                            onClick={() => setIsModalOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-xl bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-glass border border-[#DDE8E0] flex flex-col overflow-hidden mx-2 sm:mx-auto max-h-[85vh] overflow-y-auto no-scrollbar"
                        >
                            <div className="p-6 md:p-8 border-b border-[#DDE8E0] bg-[#F4FBF6] flex justify-between items-center shrink-0">
                                <div>
                                    <div className="flex items-center gap-2 md:gap-3 mb-1">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#86D9A9] animate-pulse" />
                                        <span className="text-[8px] md:text-[9px] font-bold text-emerald-800 uppercase tracking-[0.3em]">Protocol Designer</span>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-black text-[#26382E] uppercase tracking-tighter">
                                        {isEditing ? 'Edit Prototype' : 'New Prototype'}
                                    </h2>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="h-10 w-10 md:h-12 md:w-12 flex items-center justify-center text-[#64748B] hover:text-[#26382E] transition-all rounded-xl md:rounded-2xl bg-white border border-[#DDE8E0] shadow-sm active:scale-95 shrink-0">
                                    <X size={18} className="md:w-5 md:h-5" />
                                </button>
                            </div>
                            <div className="p-6 md:p-8 space-y-6 overflow-y-auto max-h-[70vh] no-scrollbar">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[9px] md:text-[10px] font-bold text-[#64748B] uppercase tracking-[0.2em] mb-2">Template Descriptor</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Assign a unique ID..."
                                            className="w-full p-4 bg-[#F4FBF6] border border-[#DDE8E0] rounded-2xl text-[11px] md:text-xs font-bold text-[#26382E] tracking-tight focus:outline-none focus:ring-4 focus:ring-[#86D9A9]/20 focus:border-[#86D9A9] shadow-sm transition-all placeholder:text-[#64748B]/60"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[9px] md:text-[10px] font-bold text-[#64748B] uppercase tracking-[0.2em] mb-2">Operational Channel</label>
                                        <div className="grid grid-cols-2 gap-2 md:gap-3">
                                            {['WhatsApp', 'Facebook', 'Website', 'All'].map((channel) => (
                                                <button
                                                    key={channel}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, channel })}
                                                    className={cn(
                                                        "p-3 md:p-4 rounded-xl md:rounded-2xl border font-bold text-[9px] md:text-[10px] uppercase tracking-widest transition-all",
                                                        formData.channel === channel 
                                                            ? "bg-[#86D9A9] text-[#26382E] border-[#86D9A9] shadow-sm font-black" 
                                                            : "bg-white text-[#64748B] border-[#DDE8E0] hover:border-[#86D9A9] hover:bg-[#F4FBF6]"
                                                    )}
                                                >
                                                    {channel}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[9px] md:text-[10px] font-bold text-[#64748B] uppercase tracking-[0.2em] mb-2">Payload Data</label>
                                        <textarea
                                            value={formData.text}
                                            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                                            placeholder="Write the automated response vector..."
                                            rows={5}
                                            className="w-full p-5 bg-[#F4FBF6] border border-[#DDE8E0] rounded-2xl text-[11px] md:text-xs font-medium text-[#26382E] focus:outline-none focus:ring-4 focus:ring-[#86D9A9]/20 focus:border-[#86D9A9] shadow-sm resize-none transition-all placeholder:text-[#64748B]/60"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end pt-2">
                                    <button
                                        onClick={handleSubmitTemplate}
                                        disabled={(isEditing ? updateTemplate.isPending : addTemplate.isPending) || !formData.name || !formData.text}
                                        className="h-14 px-8 md:px-12 bg-[#86D9A9] text-[#26382E] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em] rounded-2xl hover:bg-[#A7E8C2] transition-all shadow-sm flex items-center justify-center gap-3 disabled:opacity-50 w-full sm:w-auto"
                                    >
                                        {(isEditing ? updateTemplate.isPending : addTemplate.isPending) ? <RefreshCcw className="animate-spin shrink-0" size={16} /> : <CheckSquare size={16} className="md:w-[18px] md:h-[18px] shrink-0" />}
                                        {isEditing ? 'Update Protocol' : 'Commit Protocol'}
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

export default TemplatesLibrary


