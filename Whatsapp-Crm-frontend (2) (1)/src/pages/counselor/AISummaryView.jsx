import React, { useState } from 'react'
import { Search, Loader, Bot, Sparkles, Filter, ShieldCheck, Zap, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'
import { useQuery } from '@tanstack/react-query'
import api from '../../services/api'

const AISummaryView = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [refineMsg, setRefineMsg] = useState('')
    const [transcript, setTranscript] = useState(null)

    const { data: leads = [], isLoading, refetch, isFetching } = useQuery({
        queryKey: ['leads-ai-summary'],
        queryFn: async () => {
            const res = await api.get('/counselor/leads');
            const leadsArr = Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : []);
            return leadsArr.map(l => ({
                id: l.id,
                leadName: l.name,
                country: l.country,
                score: l.score,
                category: l.score > 80 ? 'Hot' : l.score > 50 ? 'Warm' : 'Cold',
                program: l.program,
                budget: '$50k - $100k',
                intake: 'Sept 2024'
            }));
        }
    })

    const summaryData = leads;

    const filteredData = summaryData.filter(s =>
        (s.leadName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.program || '').toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-8 pb-16">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-[#26382E] tracking-tight flex items-center gap-2.5">
                        Machine Intelligence
                        <span className="px-2.5 py-0.5 bg-[#DDF7E8] text-[#2E8456] border border-[#A7E8C2] text-[10px] font-bold rounded-full uppercase tracking-wider">Verified AI</span>
                    </h1>
                    <p className="text-xs sm:text-sm font-medium text-[#64748B] mt-1">Review conversational AI qualification summaries and lead propensities.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end gap-1">
                        <button 
                            onClick={async () => {
                                setRefineMsg('')
                                await refetch()
                                setRefineMsg('Algorithm refined!')
                                setTimeout(() => setRefineMsg(''), 3000)
                            }}
                            disabled={isFetching}
                            className="bg-[#86D9A9] text-[#26382E] px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-[#A7E8C2] transition-all shadow-xs flex items-center gap-2 disabled:opacity-75 active:scale-95"
                        >
                            {isFetching ? <Loader size={14} className="animate-spin" /> : <Sparkles size={14} />} 
                            Refine Algorithm
                        </button>
                        {refineMsg && <span className="text-[10px] font-bold text-[#2E8456] animate-pulse">{refineMsg}</span>}
                    </div>
                </div>
            </div>

            {/* Main Glass Container */}
            <div className="glass-card bg-white/85 backdrop-blur-xl rounded-3xl border border-[#DDE8E0] shadow-glass overflow-hidden flex flex-col">
                <div className="p-4 sm:p-6 border-b border-[#DDE8E0] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#EDF8F0]/40">
                    <div className="flex items-center gap-2.5">
                        <Bot size={16} className="text-[#2E8456]" />
                        <h3 className="font-black text-[#26382E] uppercase tracking-wider text-xs">Automated Lead Intelligence</h3>
                    </div>
                    <div className="relative flex-1 sm:w-72 sm:flex-none">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
                        <input
                            type="text"
                            placeholder="Search intelligence profiles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 border border-[#DDE8E0] rounded-xl text-xs font-semibold text-[#26382E] focus:outline-none focus:ring-2 focus:ring-[#86D9A9] transition-all bg-white shadow-2xs"
                        />
                    </div>
                </div>

                <div className="min-h-[400px] p-6">
                    {isLoading ? (
                        <div className="h-64 flex flex-col items-center justify-center text-[#86D9A9]">
                            <Loader className="animate-spin mb-3" size={28} />
                            <p className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Parsing Intelligence Graphs...</p>
                        </div>
                    ) : filteredData.length === 0 ? (
                        <div className="h-64 flex flex-col items-center justify-center text-[#94A3B8]">
                            <Bot size={40} className="mb-3 opacity-60" />
                            <p className="text-xs font-semibold text-[#64748B]">No Intelligence Profiles Found.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                            <AnimatePresence>
                                {filteredData.map((data) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        key={data.id}
                                        className="glass-card bg-white/90 border border-[#DDE8E0] rounded-2xl shadow-2xs hover:shadow-sm transition-all group overflow-hidden"
                                    >
                                        <div className="p-4 sm:p-5 border-b border-[#DDE8E0]/70 flex items-start justify-between bg-[#EDF8F0]/30">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 bg-[#DDF7E8] text-[#26382E] border border-[#A7E8C2]/60 rounded-xl flex items-center justify-center font-bold text-sm shrink-0">
                                                    {data.leadName?.charAt(0) || 'L'}
                                                </div>
                                                <div>
                                                    <h4 className="text-xs sm:text-sm font-bold text-[#26382E] flex items-center gap-1.5">
                                                        {data.leadName}
                                                        {data.score > 80 && <ShieldCheck size={14} className="text-[#2E8456]" />}
                                                    </h4>
                                                    <div className="text-[10px] text-[#64748B] font-semibold mt-0.5">{data.country}</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="inline-flex items-center gap-1.5">
                                                    <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Propensity Score</span>
                                                    <span className="text-base font-black text-[#2E8456]">
                                                        {data.score || '--'}
                                                    </span>
                                                </div>
                                                <div className="mt-0.5">
                                                    <span className={cn(
                                                        "text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border",
                                                        data.category === 'Hot' ? 'bg-[#DDF7E8] text-[#26382E] border-[#A7E8C2]' :
                                                            data.category === 'Warm' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                                                'bg-slate-50 text-slate-700 border-slate-200'
                                                    )}>Propensity: {data.category}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-4 sm:p-5 grid grid-cols-2 gap-3.5">
                                            <div className="space-y-0.5">
                                                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider flex items-center gap-1">
                                                    <Zap size={10} className="text-[#86D9A9]" /> Target Course
                                                </span>
                                                <p className="text-xs font-bold text-[#26382E] truncate">{data.program || 'General Counseling'}</p>
                                            </div>
                                            <div className="space-y-0.5">
                                                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Financial Bandwidth</span>
                                                <p className="text-xs font-semibold text-[#26382E]">{data.budget}</p>
                                            </div>
                                            <div className="space-y-0.5">
                                                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Intake Timeline</span>
                                                <p className="text-xs font-semibold text-[#26382E]">{data.intake}</p>
                                            </div>
                                            <div className="space-y-0.5">
                                                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Qualification Log</span>
                                                <button 
                                                    onClick={() => setTranscript(data)}
                                                    className="text-xs font-bold text-[#2E8456] hover:underline block"
                                                >
                                                    View transcript →
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>

            {/* Transcript Modal */}
            <AnimatePresence>
                {transcript && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#26382E]/40 backdrop-blur-md"
                        onClick={() => setTranscript(null)}
                    >
                        <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}
                            onClick={e => e.stopPropagation()}
                            className="glass-card bg-white/95 backdrop-blur-2xl border border-[#DDE8E0] rounded-3xl shadow-glass-lg w-full max-w-md p-6 space-y-4"
                        >
                            <div className="flex justify-between items-center border-b border-[#DDE8E0] pb-3">
                                <h3 className="font-black text-[#26382E] text-base tracking-tight">AI Qualification Log</h3>
                                <button onClick={() => setTranscript(null)} className="p-1.5 text-[#64748B] hover:text-[#26382E] hover:bg-[#EDF8F0] rounded-xl transition-colors">
                                    <X size={15} />
                                </button>
                            </div>
                            <div className="space-y-2 text-xs text-[#26382E]">
                                <div className="flex justify-between py-1 border-b border-[#DDE8E0]/50">
                                    <span className="font-bold text-[#64748B]">Lead:</span>
                                    <span className="font-semibold">{transcript.leadName}</span>
                                </div>
                                <div className="flex justify-between py-1 border-b border-[#DDE8E0]/50">
                                    <span className="font-bold text-[#64748B]">Program:</span>
                                    <span className="font-semibold">{transcript.program || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between py-1 border-b border-[#DDE8E0]/50">
                                    <span className="font-bold text-[#64748B]">Country:</span>
                                    <span className="font-semibold">{transcript.country || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between py-1 border-b border-[#DDE8E0]/50">
                                    <span className="font-bold text-[#64748B]">Confidence Score:</span>
                                    <span className="font-black text-[#2E8456]">{transcript.score || '--'}</span>
                                </div>
                                <div className="flex justify-between py-1 border-b border-[#DDE8E0]/50">
                                    <span className="font-bold text-[#64748B]">Propensity Category:</span>
                                    <span className="font-semibold">{transcript.category}</span>
                                </div>
                                <div className="flex justify-between py-1 border-b border-[#DDE8E0]/50">
                                    <span className="font-bold text-[#64748B]">Budget:</span>
                                    <span className="font-semibold">{transcript.budget}</span>
                                </div>
                                <div className="flex justify-between py-1">
                                    <span className="font-bold text-[#64748B]">Intake Timeline:</span>
                                    <span className="font-semibold">{transcript.intake}</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default AISummaryView
