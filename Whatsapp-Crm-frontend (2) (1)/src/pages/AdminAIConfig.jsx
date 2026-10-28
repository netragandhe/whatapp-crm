import React, { useState } from 'react'
import {
    Plus,
    GripVertical,
    Trash2,
    Settings2,
    Save,
    BrainCircuit,
    Target,
    UserCheck,
    ChevronRight,
    ToggleRight,
    Sparkles,
    Activity,
    Database,
    Cpu,
    CheckCircle2,
    ArrowRight,
    Zap,
    Scale,
    Edit2,
    RefreshCcw,
    MessageSquare
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../lib/utils'
import { useAiActions } from '../hooks/useCrmMutations'
import api from '../services/api'
import { useQuery } from '@tanstack/react-query'
import { toast } from '../components/ui/Toast'

const PipelineStage = ({ label, icon: Icon, active, completed, onClick }) => (
    <div onClick={onClick} className={cn("flex items-center gap-3 shrink-0 py-2", onClick && "cursor-pointer")}>
        <div className={cn(
            "relative flex flex-col items-center justify-center gap-2 p-3.5 md:p-4 rounded-2xl border transition-all w-[125px] md:w-[150px] h-[85px] md:h-[105px]",
            active ? "bg-[#86D9A9] border-[#86D9A9] shadow-sm text-[#26382E] scale-105 z-10 font-bold" :
                completed ? "bg-[#DDF7E8] border-[#A7E8C2] text-[#2E8456]" : "bg-white/80 border-[#DDE8E0] text-[#64748B] hover:bg-white"
        )}>
            {completed && !active && (
                <div className="absolute top-2 right-2 bg-white rounded-full p-0.5 shadow-xs">
                    <CheckCircle2 size={12} className="text-[#2E8456]" strokeWidth={3} />
                </div>
            )}
            <div className={cn(
                "w-8 h-8 rounded-xl flex items-center justify-center transition-all",
                active ? "bg-white text-[#26382E] shadow-xs" : completed ? "bg-white text-[#2E8456] shadow-xs" : "bg-[#EDF8F0] text-[#64748B]"
            )}>
                <Icon size={16} strokeWidth={2.2} />
            </div>
            <span className={cn(
                "text-[10px] font-bold text-center leading-tight truncate px-1",
                active ? "text-[#26382E]" : completed ? "text-[#2E8456]" : "text-[#64748B]"
            )}>
                {label}
            </span>
        </div>
        {!label.includes('CRM') && (
            <ArrowRight size={14} strokeWidth={2.5} className={cn(
                "shrink-0",
                active ? "text-[#86D9A9]" : completed ? "text-[#A7E8C2]" : "text-[#DDE8E0]"
            )} />
        )}
    </div>
)

const QuestionItem = React.forwardRef(({ question, index, tag, onDelete, onChange, onTagChange }, ref) => (
    <motion.div
        ref={ref}
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="glass-card bg-white/90 border border-[#DDE8E0] rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row gap-4 items-start group shadow-sm hover:shadow-md transition-all"
    >
        <div className="mt-1 flex flex-col items-center gap-1 cursor-grab text-[#CBD5E1] group-hover:text-[#86D9A9]">
            <GripVertical size={20} />
        </div>
        <div className="flex-1 space-y-3 w-full min-w-0">
            <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#DDF7E8] text-[#26382E] flex items-center justify-center text-[10px] font-black border border-[#A7E8C2]/60 shadow-xs shrink-0">
                        {index + 1}
                    </span>
                    <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider whitespace-nowrap">Logic Step</span>
                </div>
                <button
                    onClick={onDelete}
                    className="p-1.5 text-[#94A3B8] hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                >
                    <Trash2 size={16} />
                </button>
            </div>
            <input
                type="text"
                value={question}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Enter qualification prompt sequence..."
                className="w-full font-bold text-[#26382E] bg-transparent border-none focus:ring-0 p-0 text-sm md:text-base placeholder:text-[#CBD5E1]"
            />
            <div className="flex gap-2">
                <div className="flex items-center gap-2 px-2.5 py-1 bg-[#EDF8F0] text-[#26382E] rounded-lg border border-[#DDE8E0]">
                    <Database size={11} className="text-[#2E8456]" />
                    <input
                        type="text"
                        value={tag}
                        onChange={(e) => onTagChange(e.target.value)}
                        placeholder="DATA_KEY..."
                        className="bg-transparent border-none focus:ring-0 p-0 text-[10px] font-mono font-bold uppercase tracking-wider w-24 text-[#26382E]"
                    />
                </div>
            </div>
        </div>
    </motion.div>
))

const AdminAIConfig = () => {
    const { publishFlow } = useAiActions()
    
    // Fetch AI Config
    const { data: configResp, isLoading } = useQuery({
        queryKey: ['ai-config'],
        queryFn: async () => {
            const res = await api.get('/dashboard/ai-config');
            return res.data || res;
        }
    })

    const [flow, setFlow] = useState([])
    const [threshold, setThreshold] = useState(70)
    const [rules, setRules] = useState([])
    const [scoringRules, setScoringRules] = useState([])
    const [activeStage, setActiveStage] = useState('Qualification')
    const [hasHydrated, setHasHydrated] = useState(false)
    
    React.useEffect(() => {
        if (!configResp || hasHydrated) return
        
        const config = configResp?.data || configResp
        if (config && Object.keys(config).length > 0) {
            if (config.flow) setFlow(config.flow)
            if (config.threshold) setThreshold(config.threshold)
            if (config.rules) setRules(config.rules)
            if (config.scoringRules) setScoringRules(config.scoringRules)
            setHasHydrated(true)
        }
    }, [configResp, hasHydrated])

    const handleDelete = (id) => setFlow(flow.filter(f => f.id !== id))
    const handleAdd = () => setFlow([...flow, { id: Date.now(), q: "", t: "NEW_KEY" }])
    const handleUpdate = (id, val) => setFlow(flow.map(f => f.id === id ? { ...f, q: val } : f))
    const handleTagUpdate = (id, val) => setFlow(flow.map(f => f.id === id ? { ...f, t: val } : f))

    const handleToggleRule = (id) => {
        setRules(rules.map(r => r.id === id ? { ...r, active: !r.active } : r))
    }

    const handleAddScoringRule = () => {
        setScoringRules([...scoringRules, { id: Date.now(), desc: 'New Constraint Rule', score: 10 }])
    }

    const handleDeleteScoringRule = (id) => {
        setScoringRules(scoringRules.filter(r => r.id !== id))
    }

    return (
        <div className="space-y-8 pb-16">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-[#26382E] tracking-tight flex items-center gap-2.5">
                        <Cpu className="text-[#2E8456] shrink-0" size={26} />
                        Intelligence Orchestration
                    </h1>
                    <p className="text-xs sm:text-sm font-medium text-[#64748B] mt-1">Configure NLP flow architectures and autonomous extraction parameters.</p>
                </div>
                <div>
                    <button
                        onClick={async () => {
                            try {
                                setHasHydrated(false)
                                await publishFlow.mutateAsync({ 
                                    flow, 
                                    threshold: parseInt(threshold), 
                                    rules, 
                                    scoringRules 
                                })
                            } catch (error) {
                                // Handled by mutation hook
                            }
                        }}
                        disabled={publishFlow.isPending}
                        className="bg-[#86D9A9] text-[#26382E] px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-[#A7E8C2] shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                    >
                        {publishFlow.isPending ? <RefreshCcw className="animate-spin shrink-0" size={15} /> : <Save size={15} className="shrink-0" />}
                        {publishFlow.isPending ? "Deploying..." : "Deploy Global Protocol"}
                    </button>
                </div>
            </div>

            {/* Pipeline Stages Stepper */}
            <div className="glass-card bg-white/85 backdrop-blur-xl border border-[#DDE8E0] rounded-2xl p-3 md:p-4 overflow-x-auto shadow-sm">
                <div className="flex items-center gap-3 min-w-max">
                    <PipelineStage label="Init Response" icon={MessageSquare} completed={activeStage !== 'Init Response'} active={activeStage === 'Init Response'} onClick={() => setActiveStage('Init Response')} />
                    <PipelineStage label="Intent Sync" icon={BrainCircuit} completed={activeStage !== 'Intent Sync'} active={activeStage === 'Intent Sync'} onClick={() => setActiveStage('Intent Sync')} />
                    <PipelineStage label="Qualification" icon={Zap} completed={activeStage !== 'Qualification'} active={activeStage === 'Qualification'} onClick={() => setActiveStage('Qualification')} />
                    <PipelineStage label="CRM Master Sync" icon={Database} completed={activeStage !== 'CRM Master Sync'} active={activeStage === 'CRM Master Sync'} onClick={() => setActiveStage('CRM Master Sync')} />
                </div>
            </div>

            {/* Main Configuration Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Stream & Scoring Rules */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Logic Node Stream */}
                    <section className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div>
                                <h3 className="text-sm font-black text-[#26382E] uppercase tracking-wider flex items-center gap-2">
                                    <Activity className="text-[#2E8456]" size={16} />
                                    Logic Node Stream
                                </h3>
                                <p className="text-[11px] font-medium text-[#64748B] mt-0.5">Managing {flow.length} active extraction steps</p>
                            </div>
                            <button
                                onClick={handleAdd}
                                className="bg-white text-[#26382E] text-xs font-bold flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-[#DDE8E0] hover:bg-[#DDF7E8] transition-all shadow-xs"
                            >
                                <Plus size={14} /> Inject Logic Step
                            </button>
                        </div>

                        <div className="space-y-3">
                            <AnimatePresence mode='popLayout'>
                                {flow.map((item, i) => (
                                    <QuestionItem
                                        key={item.id}
                                        question={item.q}
                                        tag={item.t}
                                        index={i}
                                        onDelete={() => handleDelete(item.id)}
                                        onChange={(val) => handleUpdate(item.id, val)}
                                        onTagChange={(val) => handleTagUpdate(item.id, val)}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    </section>

                    {/* Lead Scoring Matrix */}
                    <section className="space-y-4">
                        <div>
                            <h3 className="text-sm font-black text-[#26382E] uppercase tracking-wider flex items-center gap-2">
                                <Scale className="text-[#2E8456]" size={16} />
                                Lead Scoring Matrix
                            </h3>
                            <p className="text-[11px] font-medium text-[#64748B] mt-0.5">Scoring weights for automated lead prioritization</p>
                        </div>
                        <div className="glass-card bg-white/85 backdrop-blur-xl border border-[#DDE8E0] rounded-2xl overflow-hidden shadow-sm flex flex-col">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[500px]">
                                    <thead>
                                        <tr className="bg-[#EDF8F0]/70 border-b border-[#DDE8E0]">
                                            <th className="px-6 py-3.5 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Constraint / Rule Identity</th>
                                            <th className="px-6 py-3.5 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Impact Points</th>
                                            <th className="px-6 py-3.5 font-black text-[#26382E] uppercase tracking-wider text-[10px] text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#DDE8E0]/60">
                                        {scoringRules.map(rule => (
                                            <tr key={rule.id} className="hover:bg-[#F4FBF6] transition-colors group">
                                                <td className="px-6 py-4">
                                                    <span className="text-xs font-bold text-[#26382E]">{rule.desc}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={cn(
                                                        "text-[10px] font-bold px-2.5 py-1 rounded-full border",
                                                        rule.score > 0 ? "bg-[#DDF7E8] text-[#26382E] border-[#A7E8C2]" : "bg-rose-50 text-rose-600 border-rose-100"
                                                    )}>
                                                        {rule.score > 0 ? `+${rule.score}` : rule.score}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button 
                                                        onClick={() => handleDeleteScoringRule(rule.id)}
                                                        className="p-1.5 bg-white border border-[#DDE8E0] rounded-lg text-[#94A3B8] hover:text-rose-600 transition-colors shadow-xs"
                                                    >
                                                        <Trash2 size={13} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <button 
                                onClick={handleAddScoringRule}
                                className="w-full py-3 bg-[#EDF8F0]/50 hover:bg-[#DDF7E8] text-[10px] font-bold text-[#26382E] uppercase tracking-wider transition-all border-t border-[#DDE8E0] flex items-center justify-center gap-1.5"
                            >
                                <Plus size={12} /> Append Scoring Constraint
                            </button>
                        </div>
                    </section>
                </div>

                {/* Right Precision Parameters & Protocol Guard */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Precision Parameters Card */}
                    <div className="glass-card bg-white/85 backdrop-blur-xl border border-[#DDE8E0] rounded-3xl p-6 shadow-sm">
                        <h3 className="text-xs font-black text-[#26382E] uppercase tracking-wider border-b border-[#DDE8E0] pb-3 mb-6">
                            Precision Parameters
                        </h3>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-xs font-bold text-[#64748B] mb-2">
                                    <span>Confidence Floor</span>
                                    <span className="text-[#26382E] bg-[#DDF7E8] px-2.5 py-0.5 rounded-full border border-[#A7E8C2] font-black">{threshold}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={threshold}
                                    onChange={(e) => setThreshold(e.target.value)}
                                    className="w-full accent-[#86D9A9] h-2 bg-[#EDF8F0] rounded-full appearance-none cursor-pointer"
                                />
                                <p className="text-[10px] font-medium text-[#64748B] mt-2 leading-relaxed">Minimum vector threshold for autonomous pipeline routing</p>
                            </div>

                            <div className="space-y-3 pt-4 border-t border-[#DDE8E0]">
                                {rules.map((rule) => (
                                    <button
                                        key={rule.id}
                                        onClick={() => handleToggleRule(rule.id)}
                                        className={cn(
                                            "w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all text-left",
                                            rule.active
                                                ? "bg-[#DDF7E8] border-[#A7E8C2] text-[#26382E] shadow-xs"
                                                : "bg-white border-[#DDE8E0] hover:border-[#86D9A9] text-[#64748B]"
                                        )}
                                    >
                                        <div className="flex-1 pr-2">
                                            <div className="text-xs font-bold text-[#26382E] mb-0.5">
                                                {rule.label}
                                            </div>
                                            <div className="text-[10px] font-medium text-[#64748B]">
                                                {rule.desc}
                                            </div>
                                        </div>
                                        <div className={cn(
                                            "w-9 h-5 rounded-full relative transition-colors shrink-0",
                                            rule.active ? "bg-[#86D9A9]" : "bg-gray-200"
                                        )}>
                                            <div className={cn(
                                                "w-3.5 h-3.5 rounded-full absolute top-0.5 transition-all shadow-xs",
                                                rule.active ? "bg-white left-5" : "bg-white left-1"
                                            )} />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Protocol Guard Card */}
                    <div className="bg-gradient-to-br from-[#EDF8F0] via-white/95 to-[#DDF7E8] border border-[#A7E8C2]/60 p-6 rounded-3xl shadow-glass relative overflow-hidden">
                        <div className="relative z-10 space-y-4">
                            <h3 className="text-xs font-black text-[#26382E] flex items-center gap-2 uppercase tracking-wider">
                                <Sparkles size={16} className="text-[#2E8456]" />
                                AI Protocol Safeguards
                            </h3>
                            <div className="space-y-2">
                                {['Zero-shot Classifier', 'Context Window v4', 'Lead Sentiment Analysis'].map((f) => (
                                    <div key={f} className="flex justify-between items-center bg-white/80 p-3 rounded-xl border border-[#DDE8E0] shadow-2xs">
                                        <span className="text-xs font-bold text-[#26382E]">{f}</span>
                                        <CheckCircle2 size={14} className="text-[#2E8456]" />
                                    </div>
                                ))}
                            </div>
                            <div className="pt-4 border-t border-[#DDE8E0]">
                                <p className="text-center text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Engine: Enterprise Core AI v7.4</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminAIConfig
