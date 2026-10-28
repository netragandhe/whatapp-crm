import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Search, ShieldCheck, Bot, FileText, MessageSquare, X, ChevronRight, RefreshCcw } from 'lucide-react'
import { cn } from '../../lib/utils'
import api from '../../services/api'
import { useSupportActions } from '../../hooks/useCrmMutations'

const AiStatus = () => {
    const { convertLead } = useSupportActions()
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedLead, setSelectedLead] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 8

    const { data: resp, isLoading } = useQuery({
        queryKey: ['support-ai-status'],
        queryFn: () => api.get('/support/ai-status')
    })

    const aiData = Array.isArray(resp) ? resp : (resp?.data || [])

    const filteredData = aiData.filter(l =>
        (l.name && l.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (l.program && l.program.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    // Pagination Logic
    const totalPages = Math.ceil(filteredData.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

    const handleRowClick = (lead) => {
        setSelectedLead(lead)
    }

    return (
        <div className="space-y-6 max-w-7xl w-full min-w-0 mx-auto px-4 sm:px-0 py-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 flex-wrap">
                <div className="min-w-0">
                    <h1 className="text-2xl font-black text-[#26382E] uppercase tracking-tight flex items-center gap-2 flex-wrap">
                        <Sparkles className="text-[#86D9A9]" /> AI Qualification Status
                    </h1>
                    <p className="text-sm font-medium text-[#64748B] mt-1">Review automated triage results and AI intelligence summaries.</p>
                </div>
            </div>

            <div className="glass-card rounded-3xl border border-[#DDE8E0] shadow-sm flex flex-col overflow-hidden w-full min-w-0">
                <div className="px-4 sm:px-6 py-5 border-b border-[#DDE8E0] flex items-center justify-between gap-4 bg-[#EDF8F0]/50 flex-wrap">
                    <div className="relative flex-1 max-w-md">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
                        <input
                            type="text"
                            placeholder="Search by profile or program intent..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value)
                                setCurrentPage(1)
                            }}
                            className="w-full pl-9 pr-4 py-2 border border-[#DDE8E0] rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#86D9A9] bg-white text-[#26382E] transition-shadow shadow-sm"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto no-scrollbar min-h-[400px] w-full max-w-full">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className="bg-[#EDF8F0]/30 border-b border-[#DDE8E0]">
                                <th className="px-6 py-4 font-black text-[#64748B] uppercase tracking-widest text-[9px]">Identity Profile</th>
                                <th className="px-4 py-4 font-black text-[#64748B] uppercase tracking-widest text-[9px]">Confidence Index</th>
                                <th className="px-4 py-4 font-black text-[#64748B] uppercase tracking-widest text-[9px]">Intent Priority</th>
                                <th className="px-4 py-4 font-black text-[#64748B] uppercase tracking-widest text-[9px]">Engine Status</th>
                                <th className="px-4 py-4 font-black text-[#64748B] uppercase tracking-widest text-[9px]">Target Program</th>
                                <th className="px-4 py-4 font-black text-[#64748B] uppercase tracking-widest text-[9px]">Est. Budget</th>
                                <th className="px-6 py-4 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#DDE8E0]">
                            <AnimatePresence mode="wait">
                                {paginatedData.map((lead) => (
                                    <motion.tr
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        key={lead.id}
                                        onClick={() => handleRowClick(lead)}
                                        className="group hover:bg-[#EDF8F0]/40 transition-colors cursor-pointer"
                                    >
                                        <td className="px-6 py-5">
                                            <div className="font-black text-[#26382E] uppercase tracking-tight text-xs flex items-center gap-1.5 group-hover:text-[#26382E] transition-colors">
                                                {lead.name}
                                            </div>
                                            <div className="text-[9px] text-[#64748B] font-bold uppercase tracking-widest mt-0.5">UID-{lead.id}</div>
                                        </td>
                                        <td className="px-4 py-5">
                                            <div className="flex items-center gap-2">
                                                <div className="font-black text-xs text-[#26382E] w-6">{lead.score}%</div>
                                                <div className="flex-1 bg-gray-100 h-1.5 rounded-full overflow-hidden w-16">
                                                    <div className={cn("h-full", lead.score > 80 ? 'bg-[#86D9A9]' : 'bg-amber-400')} style={{ width: `${lead.score}%` }} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-5">
                                            <span className={cn(
                                                "text-[9px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-lg border",
                                                lead.category === 'Hot' ? "bg-rose-50 text-rose-600 border-rose-100" :
                                                    lead.category === 'Warm' ? "bg-amber-50 text-amber-600 border-amber-100" :
                                                        "bg-[#EDF8F0] text-[#26382E] border-[#DDE8E0]"
                                            )}>
                                                {lead.category}
                                            </span>
                                        </td>
                                        <td className="px-4 py-5">
                                            <span className="text-[9px] font-bold text-[#64748B] uppercase tracking-widest flex items-center gap-1.5">
                                                {lead.status === 'Processing' ? <Sparkles size={10} className="text-[#86D9A9] animate-pulse" /> : <ShieldCheck size={10} className="text-[#86D9A9]" />}
                                                {lead.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-5">
                                            <span className="text-[10px] font-bold text-[#26382E] truncate max-w-[150px] inline-block">{lead.program}</span>
                                        </td>
                                        <td className="px-4 py-5">
                                            <span className="text-[10px] font-bold text-[#64748B]">{lead.budget}</span>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleRowClick(lead)
                                                }}
                                                className="text-[9px] font-black uppercase tracking-widest text-[#26382E] hover:text-[#1b2720] transition-colors shrink-0"
                                            >
                                                Analyze Data
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                            {paginatedData.length === 0 && !isLoading && (
                                <tr>
                                    <td colSpan={7} className="px-6 py-24 text-center">
                                        <div className="flex flex-col items-center justify-center opacity-40">
                                            <Bot size={48} className="text-gray-400 mb-4" />
                                            <p className="text-[#64748B] uppercase tracking-widest font-black text-xs">Intelligence Logs Empty.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Table Footer with Pagination */}
                {totalPages > 1 && (
                    <div className="px-6 py-4 border-t border-[#DDE8E0] bg-[#EDF8F0]/30 flex items-center justify-between">
                        <p className="text-[10px] font-black text-[#64748B] uppercase tracking-widest">
                            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} entries
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="p-2 rounded-xl border border-[#DDE8E0] bg-white text-[#64748B] hover:text-[#26382E] hover:bg-[#DDF7E8] disabled:opacity-30 transition-all active:scale-90"
                            >
                                <ChevronRight size={16} className="rotate-180" />
                            </button>
                            <div className="flex items-center gap-1">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={cn(
                                            "w-8 h-8 rounded-xl text-[10px] font-black transition-all",
                                            currentPage === i + 1 
                                                ? "bg-[#86D9A9] text-[#26382E] shadow-sm" 
                                                : "bg-white border border-[#DDE8E0] text-[#64748B] hover:bg-[#DDF7E8] hover:text-[#26382E]"
                                        )}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-xl border border-[#DDE8E0] bg-white text-[#64748B] hover:text-[#26382E] hover:bg-[#DDF7E8] disabled:opacity-30 transition-all active:scale-90"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* AI Detail Drawer/Modal */}
            <AnimatePresence>
                {selectedLead && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm"
                            onClick={() => setSelectedLead(null)}
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 h-full w-full max-w-full sm:max-w-md bg-white/95 backdrop-blur-xl border-l border-[#DDE8E0] shadow-2xl z-[70] flex flex-col"
                        >
                            <div className="p-6 border-b border-[#DDE8E0] flex items-center justify-between bg-[#EDF8F0]/70">
                                <div>
                                    <h2 className="text-lg font-black text-[#26382E] uppercase tracking-tight flex items-center gap-2">
                                        <Bot size={18} className="text-[#86D9A9]" /> Intelligence Dossier
                                    </h2>
                                    <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mt-1">Target: {selectedLead.name}</p>
                                </div>
                                <button onClick={() => setSelectedLead(null)} className="p-2 text-[#64748B] hover:text-[#26382E] transition-colors rounded-xl bg-white border border-[#DDE8E0]">
                                    <X size={16} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                                {/* Summary Card */}
                                <div className="p-5 bg-gradient-to-br from-[#DDF7E8]/60 to-[#EDF8F0]/80 border border-[#86D9A9]/30 rounded-2xl shadow-sm relative overflow-hidden">
                                    <Sparkles className="absolute -right-4 -bottom-4 text-[#86D9A9]/20 h-24 w-24" />
                                    <div className="relative z-10">
                                        <h3 className="text-[10px] font-black uppercase tracking-widest text-[#26382E] mb-2">Automated Synthesis</h3>
                                        <p className="text-xs font-medium text-[#26382E] leading-relaxed">
                                            Lead demonstrates extremely high intent for the <strong>{selectedLead.program}</strong> program starting <strong>{selectedLead.intake}</strong>. Budget alignment is confirmed at <strong>{selectedLead.budget}</strong>. Recommended for immediate human dispatch to close enrollment.
                                        </p>
                                    </div>
                                </div>

                                {/* Extracted Parameters */}
                                <div>
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[#26382E] border-b border-[#DDE8E0] pb-2 mb-4 flex items-center gap-2">
                                        <FileText size={12} className="text-[#64748B]" /> Extracted Parameters
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center bg-[#EDF8F0]/40 p-4 rounded-xl border border-[#DDE8E0]">
                                            <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Confidence Score</span>
                                            <span className="text-xs font-black text-[#26382E]">{selectedLead.score}%</span>
                                        </div>
                                        <div className="flex justify-between items-center bg-[#EDF8F0]/40 p-4 rounded-xl border border-[#DDE8E0]">
                                            <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Intent Priority</span>
                                            <span className={cn(
                                                "text-[9px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-lg border",
                                                selectedLead.category === 'Hot' ? "bg-rose-50 text-rose-600 border-rose-100" :
                                                    selectedLead.category === 'Warm' ? "bg-amber-50 text-amber-600 border-amber-100" :
                                                        "bg-[#EDF8F0] text-[#26382E] border-[#DDE8E0]"
                                            )}>{selectedLead.category}</span>
                                        </div>
                                        <div className="flex justify-between items-center bg-[#EDF8F0]/40 p-4 rounded-xl border border-[#DDE8E0]">
                                            <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Target Program</span>
                                            <span className="text-[10px] font-bold text-[#26382E]">{selectedLead.program}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Raw Transcript Snippet */}
                                <div>
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[#26382E] border-b border-[#DDE8E0] pb-2 mb-4 flex items-center gap-2">
                                        <MessageSquare size={12} className="text-[#64748B]" /> NLP Transcript Snippets
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="bg-[#EDF8F0]/50 p-4 rounded-xl rounded-tl-none border border-[#DDE8E0] w-[90%]">
                                            <p className="text-[11px] font-medium text-[#26382E] leading-relaxed">"I am looking to enroll in the MBA program this Fall. I have the funds ready."</p>
                                        </div>
                                        <div className="bg-[#DDF7E8] p-4 rounded-xl rounded-tr-none border border-[#86D9A9]/30 w-[90%] ml-auto text-right">
                                            <p className="text-[11px] font-medium text-[#26382E] leading-relaxed">"Excellent. Could you confirm your estimated tuition budget?"</p>
                                        </div>
                                        <div className="bg-[#EDF8F0]/50 p-4 rounded-xl rounded-tl-none border border-[#DDE8E0] w-[90%]">
                                            <p className="text-[11px] font-medium text-[#26382E] leading-relaxed">"Around {selectedLead.budget} is what I am expecting to spend."</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 border-t border-[#DDE8E0] bg-[#EDF8F0]/70 flex gap-3 mt-auto">
                                <button 
                                    onClick={() => {
                                        convertLead.mutate(selectedLead.id, {
                                            onSuccess: () => setSelectedLead(null)
                                        })
                                    }}
                                    disabled={convertLead.isPending}
                                    className="flex-1 py-4 bg-[#86D9A9] text-[#26382E] text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-[#A7E8C2] transition-all shadow-sm flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.98]"
                                >
                                    {convertLead.isPending ? <RefreshCcw size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
                                    <span>Promote to CRM Ecosystem</span>
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}

export default AiStatus



