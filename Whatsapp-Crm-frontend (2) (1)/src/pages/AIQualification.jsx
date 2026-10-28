import React from 'react'
import {
    Plus,
    GripVertical,
    Trash2,
    Settings2,
    Save,
    BrainCircuit,
    Target,
    UserCheck
} from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import api from '../services/api'

const QuestionItem = ({ question, index }) => (
    <div className="glass-card !p-5 flex gap-4 items-start group rounded-2xl border border-[#DDE8E0] shadow-glass hover:border-[#86D9A9] transition-all">
        <div className="mt-1 flex flex-col items-center gap-1 cursor-grab text-[#64748B]/60 group-hover:text-[#26382E]">
            <GripVertical size={20} />
        </div>
        <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider shrink-0 bg-[#DDF7E8] px-2.5 py-1 rounded-lg border border-[#86D9A9]/30">Step {index + 1}</span>
                <div className="flex items-center gap-1 md:gap-2 shrink-0">
                    <button className="p-1.5 text-[#64748B] hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"><Trash2 size={16} /></button>
                    <button className="p-1.5 text-[#64748B] hover:text-[#26382E] rounded-lg hover:bg-[#EDF8F0] transition-colors"><Settings2 size={16} /></button>
                </div>
            </div>
            <input
                type="text"
                defaultValue={question}
                className="w-full font-bold text-[#26382E] bg-transparent border-none focus:ring-0 p-0 text-sm tracking-tight"
            />
            <div className="flex flex-wrap gap-2">
                <span className="text-[9px] md:text-[10px] px-2.5 py-1 bg-[#EDF8F0] rounded-xl text-[#26382E] font-bold border border-[#DDE8E0] whitespace-nowrap">Text Input</span>
                <span className="text-[9px] md:text-[10px] px-2.5 py-1 bg-[#DDF7E8] text-emerald-800 rounded-xl font-bold border border-[#86D9A9]/40 whitespace-nowrap">Extracts: Program</span>
            </div>
        </div>
    </div>
)

const AIQualification = () => {
    const { data: configResp } = useQuery({
        queryKey: ['ai-config'],
        queryFn: async () => {
            const res = await api.get('/dashboard/ai-config');
            return res.data || res;
        }
    })

    const questions = configResp?.flow?.map(f => f.q) || [
        "What is your highest qualification?",
        "Which program are you interested in?",
        "When are you planning to start?",
        "Do you have a valid passport?"
    ]

    const threshold = configResp?.threshold || 65

    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-[#26382E] uppercase tracking-tight">AI Qualification Builder</h1>
                    <p className="text-[10px] md:text-xs font-bold text-[#64748B] mt-1 uppercase tracking-widest">Design the chat flow and extraction rules for automatic lead qualification.</p>
                </div>
                <div className="flex items-center gap-2 md:gap-3 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none justify-center flex items-center gap-2 bg-white/80 backdrop-blur-md border border-[#DDE8E0] text-[#26382E] px-5 py-2.5 rounded-2xl font-bold text-[10px] md:text-xs uppercase tracking-widest hover:bg-[#F4FBF6] transition-colors shadow-sm">
                        <Save size={14} className="shrink-0" />
                        <span>Save</span>
                    </button>
                    <button className="flex-1 sm:flex-none justify-center flex items-center gap-2 bg-[#86D9A9] text-[#26382E] px-5 py-2.5 rounded-2xl font-bold text-[10px] md:text-xs uppercase tracking-widest hover:bg-[#A7E8C2] transition-colors shadow-sm">
                        <Plus size={14} className="shrink-0" />
                        <span>Question</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Flow Builder */}
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-sm font-bold text-[#26382E] flex items-center gap-2">
                        <BrainCircuit size={18} className="text-emerald-700" />
                        Qualification Flow
                    </h3>
                    <div className="space-y-3">
                        {questions.map((q, i) => (
                            <QuestionItem key={i} question={q} index={i} />
                        ))}
                    </div>
                </div>

                {/* Right: Rules & Preview */}
                <div className="space-y-6">
                    <div className="glass-card p-6 rounded-3xl border border-[#DDE8E0] shadow-glass">
                        <h3 className="text-sm font-bold text-[#26382E] mb-4 flex items-center gap-2">
                            <Target size={18} className="text-emerald-700" />
                            Scoring Rules
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-[#64748B]">Minimum Score</span>
                                <span className="text-sm font-bold text-[#26382E]">{threshold}</span>
                            </div>
                            <input type="range" className="w-full accent-[#86D9A9]" value={threshold} readOnly />
                            <div className="space-y-2 pt-2">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" className="rounded text-emerald-600 focus:ring-[#86D9A9]" defaultChecked />
                                    <span className="text-sm text-[#26382E]">Auto-assign qualified leads</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" className="rounded text-emerald-600 focus:ring-[#86D9A9]" defaultChecked />
                                    <span className="text-sm text-[#26382E]">Send WhatsApp notification</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-6 rounded-3xl text-[#26382E] shadow-glass relative overflow-hidden border border-[#DDE8E0]">
                        <div className="relative z-10">
                            <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                <UserCheck size={16} className="text-emerald-700" />
                                Extraction Preview
                            </h3>
                            <div className="space-y-3">
                                {['Name', 'Email', 'Program', 'Qualification', 'Timeline'].map((field) => (
                                    <div key={field} className="flex justify-between items-center text-[10px] md:text-xs font-bold uppercase tracking-widest border-b border-[#DDE8E0]/40 pb-2">
                                        <span className="text-[#64748B]">{field}</span>
                                        <span className="text-emerald-800 bg-[#DDF7E8] px-2 py-0.5 rounded-lg border border-[#86D9A9]/30">Pending</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="absolute -bottom-6 -right-6 opacity-5 pointer-events-none text-[#86D9A9]">
                            <BrainCircuit size={160} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AIQualification
