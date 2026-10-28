import React, { useState } from 'react'
import { Plus, Edit2, Trash2, Filter, Search, Globe, Power, Play, PauseCircle, Users, Activity, BarChart3, ChevronRight, Hash, ArrowRightLeft, Layers } from 'lucide-react'
import { cn } from '../lib/utils'
import { useQuery } from '@tanstack/react-query'
import api from '../services/api'
import { useRoutingActions } from '../hooks/useCrmMutations'
import { motion, AnimatePresence } from 'framer-motion'

const TabButton = ({ active, label, icon: Icon, onClick }) => (
    <button
        onClick={onClick}
        className={cn(
            "flex items-center gap-2 md:gap-3 px-4 md:px-8 py-4 md:py-5 font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] transition-all border-b-2 whitespace-nowrap",
            active
                ? "text-[#26382E] border-[#86D9A9] bg-[#DDF7E8]/60 font-black"
                : "text-[#64748B] border-transparent hover:text-[#26382E] hover:bg-[#EDF8F0]/60"
        )}
    >
        <Icon size={14} strokeWidth={2.5} className="shrink-0" />
        {label}
    </button>
)

const RoutingRules = () => {
    const [view, setView] = useState('main') // 'main', 'country', 'round-robin', 'load-based'
    const [searchQuery, setSearchQuery] = useState('')
    const [showAddForm, setShowAddForm] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editRuleData, setEditRuleData] = useState(null)
    const { toggleRule, deleteRule, addRule, updateRule } = useRoutingActions()

    const { data: rulesResp, isLoading } = useQuery({
        queryKey: ['routing-rules'],
        queryFn: async () => {
            const res = await api.get('/routing');
            return res.data || res;
        }
    })

    const dataToMap = Array.isArray(rulesResp?.data) ? rulesResp.data : (Array.isArray(rulesResp) ? rulesResp : []);
    const rules = dataToMap.map(r => ({
        id: r.id,
        country: r.country,
        team: r.team,
        counselor: r.counselor || 'System Default',
        type: r.type,
        maxLoad: 50, // Mock for now
        status: r.status
    }))

    const filteredRules = rules.filter(rule =>
        (rule.country || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (rule.team || '').toLowerCase().includes(searchQuery.toLowerCase())
    )

    const openCreateModal = () => {
        setIsEditing(false)
        setEditRuleData(null)
        setShowAddForm(true)
    }

    const openEditModal = (rule) => {
        setIsEditing(true)
        setEditRuleData(rule)
        setShowAddForm(true)
    }

    const renderMainTable = () => (
        <div className="w-full overflow-x-auto no-scrollbar max-w-full">
            <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                    <tr className="bg-[#EDF8F0]/40 border-b border-[#DDE8E0]">
                        <th className="px-6 md:px-8 py-4 md:py-5 font-black text-[#64748B] uppercase tracking-widest text-[9px] min-w-[150px]">Territory</th>
                        <th className="px-6 md:px-8 py-4 md:py-5 font-black text-[#64748B] uppercase tracking-widest text-[9px] min-w-[120px]">Operation Team</th>
                        <th className="px-6 md:px-8 py-4 md:py-5 font-black text-[#64748B] uppercase tracking-widest text-[9px] min-w-[150px]">Counselor (Primary)</th>
                        <th className="px-6 md:px-8 py-4 md:py-5 font-black text-[#64748B] uppercase tracking-widest text-[9px] min-w-[120px]">Architecture</th>
                        <th className="px-6 md:px-8 py-4 md:py-5 font-black text-[#64748B] uppercase tracking-widest text-[9px]">Max Load</th>
                        <th className="px-6 md:px-8 py-4 md:py-5 font-black text-[#64748B] uppercase tracking-widest text-[9px]">State</th>
                        <th className="px-6 md:px-8 py-4 md:py-5 font-black text-[#64748B] uppercase tracking-widest text-[9px] text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#DDE8E0]">
                    {filteredRules.map((rule) => (
                        <tr key={rule.id} className="hover:bg-[#EDF8F0]/40 transition-all group">
                            <td className="px-6 md:px-8 py-4 md:py-6">
                                <div className="flex items-center gap-2 md:gap-3">
                                    <Globe size={14} className="text-[#86D9A9] shrink-0" />
                                    <span className="font-black text-[11px] md:text-xs text-[#26382E] uppercase tracking-tight truncate">{rule.country}</span>
                                </div>
                            </td>
                            <td className="px-6 md:px-8 py-4 md:py-6">
                                <span className="text-[9px] md:text-[10px] font-black text-[#64748B] uppercase tracking-widest truncate block">{rule.team}</span>
                            </td>
                            <td className="px-6 md:px-8 py-4 md:py-6">
                                <div className="flex flex-col">
                                    <span className="text-[11px] md:text-xs font-black text-[#26382E] uppercase tracking-tight truncate">{rule.counselor}</span>
                                    <span className="text-[8px] md:text-[9px] font-bold text-[#64748B] uppercase tracking-widest truncate">Active ID: #{rule.id * 123}</span>
                                </div>
                            </td>
                            <td className="px-6 md:px-8 py-4 md:py-6">
                                <span className="text-[9px] md:text-[10px] font-black text-[#26382E] bg-[#DDF7E8] px-2.5 py-1 rounded-lg border border-[#86D9A9]/30 uppercase tracking-widest shadow-sm whitespace-nowrap">
                                    {rule.type}
                                </span>
                            </td>
                            <td className="px-6 md:px-8 py-4 md:py-6">
                                <span className="text-[9px] md:text-[10px] font-black text-[#26382E] uppercase tracking-widest whitespace-nowrap">{rule.maxLoad} Leads</span>
                            </td>
                            <td className="px-6 md:px-8 py-4 md:py-6">
                                <button
                                    onClick={() => toggleRule.mutate({ id: rule.id, currentStatus: rule.status })}
                                    className={cn(
                                        "px-2.5 py-1 rounded-lg text-[8px] md:text-[9px] font-black uppercase tracking-widest border transition-all whitespace-nowrap",
                                        rule.status === 'Active' ? 'bg-[#DDF7E8] text-[#26382E] border-[#86D9A9]/40' : 'bg-[#EDF8F0] text-[#64748B] border-[#DDE8E0]'
                                    )}
                                >
                                    {rule.status}
                                </button>
                            </td>
                            <td className="px-6 md:px-8 py-4 md:py-6">
                                <div className="flex items-center justify-end gap-1.5 md:gap-2 transition-all">
                                    <button onClick={() => openEditModal(rule)} className="p-2 md:p-2.5 bg-white border border-[#DDE8E0] rounded-xl text-[#64748B] hover:text-[#26382E] hover:bg-[#DDF7E8] transition-all shadow-sm active:scale-90"><Edit2 size={14} /></button>
                                    <button onClick={() => deleteRule.mutate(rule.id)} className="p-2 md:p-2.5 bg-white border border-[#DDE8E0] rounded-xl text-[#64748B] hover:text-rose-600 hover:bg-rose-50 transition-all shadow-sm active:scale-90"><Trash2 size={14} /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

    const renderCountryMapping = () => (
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rules.map(rule => (
                <div key={rule.id} className="p-6 glass-card bg-white/80 rounded-[2rem] border border-[#DDE8E0] hover:border-[#86D9A9] transition-all">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-[#86D9A9] text-[#26382E] rounded-2xl flex items-center justify-center font-black text-sm shadow-sm">
                            {(rule.country || 'GL').substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                            <h4 className="text-xs font-black text-[#26382E] uppercase tracking-widest">{rule.country || 'Global'}</h4>
                            <p className="text-[9px] font-bold text-[#64748B] uppercase tracking-widest">Master Region</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-[#EDF8F0]/50 rounded-xl border border-[#DDE8E0]">
                            <span className="text-[9px] font-black text-[#64748B] uppercase tracking-widest">Team</span>
                            <span className="text-[10px] font-black text-[#26382E] uppercase tracking-widest">{rule.team || 'Unassigned'}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-[#EDF8F0]/50 rounded-xl border border-[#DDE8E0]">
                            <span className="text-[9px] font-black text-[#64748B] uppercase tracking-widest">Primary Counselor</span>
                            <span className="text-[10px] font-black text-[#26382E] uppercase tracking-widest">{rule.counselor}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )

    const renderRoundRobin = () => (
        <div className="p-8 space-y-6">
            <div className="bg-[#DDF7E8]/60 border border-[#86D9A9]/30 p-6 rounded-[2rem] flex items-center gap-4">
                <Layers className="text-[#26382E]" size={24} />
                <div>
                    <h4 className="text-xs font-black text-[#26382E] uppercase tracking-widest">Rotation Terminal</h4>
                    <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Drag and drop counselors to reorder the distribution sequence.</p>
                </div>
            </div>
            <div className="space-y-3">
                {['Rahul K.', 'Susan V.', 'Ahmed K.', 'Emma W.'].map((name, i) => (
                    <motion.div
                        key={name}
                        whileHover={{ x: 10 }}
                        className="flex items-center justify-between p-5 bg-white/90 border border-[#DDE8E0] rounded-2xl cursor-grab active:cursor-grabbing hover:border-[#86D9A9] transition-all shadow-sm"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-[#EDF8F0] border border-[#DDE8E0] flex items-center justify-center text-[10px] font-black text-[#26382E]">{i + 1}</div>
                            <span className="text-xs font-black text-[#26382E] uppercase tracking-tight">{name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black text-[#26382E] uppercase tracking-widest bg-[#DDF7E8] border border-[#86D9A9]/30 px-3 py-1 rounded-lg">Wait in Queue</span>
                            <ArrowRightLeft size={14} className="text-[#64748B]" />
                        </div>
                    </motion.div>
                ))}
            </div>
            <button className="w-full py-4 rounded-2xl bg-[#86D9A9] text-[#26382E] font-black text-xs uppercase tracking-widest hover:bg-[#A7E8C2] transition-all shadow-sm">Save Sequence</button>
        </div>
    )

    const renderLoadBased = () => (
        <div className="w-full overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                    <tr className="bg-[#EDF8F0]/40 border-b border-[#DDE8E0]">
                        <th className="px-8 py-5 font-black text-[#64748B] uppercase tracking-widest text-[9px]">Counselor</th>
                        <th className="px-8 py-5 font-black text-[#64748B] uppercase tracking-widest text-[9px]">Live Pressure</th>
                        <th className="px-8 py-5 font-black text-[#64748B] uppercase tracking-widest text-[9px]">Max Capacity</th>
                        <th className="px-8 py-5 font-black text-[#64748B] uppercase tracking-widest text-[9px]">Vibe Check</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#DDE8E0]">
                    {[
                        { name: 'Rahul K.', current: 42, max: 50, color: 'bg-[#86D9A9]' },
                        { name: 'Sarah J.', current: 12, max: 50, color: 'bg-[#A7E8C2]' },
                        { name: 'John D.', current: 49, max: 50, color: 'bg-amber-400' },
                    ].map(node => (
                        <tr key={node.name} className="hover:bg-[#EDF8F0]/40 transition-all group">
                            <td className="px-8 py-6">
                                <span className="font-black text-xs text-[#26382E] uppercase tracking-tight">{node.name}</span>
                            </td>
                            <td className="px-8 py-6 min-w-[200px]">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[9px] font-black text-[#64748B] uppercase">
                                        <span>Utilized</span>
                                        <span>{Math.round((node.current / node.max) * 100)}%</span>
                                    </div>
                                    <div className="w-full bg-[#EDF8F0] rounded-full h-1.5 overflow-hidden">
                                        <div className={cn("h-full transition-all duration-1000", node.color)} style={{ width: `${(node.current / node.max) * 100}%` }} />
                                    </div>
                                </div>
                            </td>
                            <td className="px-8 py-6 font-black text-xs text-[#26382E]">{node.max}</td>
                            <td className="px-8 py-6">
                                <span className={cn(
                                    "text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border",
                                    node.current > 45 ? "bg-amber-50 text-amber-600 border-amber-100" : "bg-[#DDF7E8] text-[#26382E] border-[#86D9A9]/30"
                                )}>
                                    {node.current > 45 ? 'Full Pressure' : 'Ready to Absorb'}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-12 w-full min-w-0 px-4 sm:px-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 md:gap-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-[#26382E] uppercase tracking-tight">Routing Rules</h1>
                    <p className="text-[10px] md:text-sm font-medium text-[#64748B] uppercase tracking-widest mt-1">Multi-tier distribution architecture and load balancing.</p>
                </div>
                <div className="flex w-full sm:w-auto mt-2 sm:mt-0">
                    <button
                        onClick={openCreateModal}
                        className="w-full sm:w-auto justify-center flex items-center gap-2 md:gap-3 bg-[#86D9A9] text-[#26382E] px-6 md:px-8 py-3.5 md:py-4 rounded-xl md:rounded-[1.25rem] font-black text-[10px] md:text-sm uppercase tracking-widest hover:bg-[#A7E8C2] transition-all shadow-sm active:scale-95"
                    >
                        <Plus size={18} strokeWidth={3} className="shrink-0" />
                        Add New Rule
                    </button>
                </div>
            </div>

            <div className="glass-card rounded-2xl md:rounded-[2.5rem] border border-[#DDE8E0] shadow-sm flex flex-col overflow-hidden min-h-[500px] w-full min-w-0">
                <div className="flex flex-row overflow-x-auto border-b border-[#DDE8E0] bg-[#EDF8F0]/50 no-scrollbar">
                    <TabButton active={view === 'main'} label="Main Routing" icon={Activity} onClick={() => setView('main')} />
                    <TabButton active={view === 'country'} label="Country Mapping" icon={Globe} onClick={() => setView('country')} />
                    <TabButton active={view === 'round-robin'} label="Round Robin" icon={ArrowRightLeft} onClick={() => setView('round-robin')} />
                    <TabButton active={view === 'load-based'} label="Load Based" icon={BarChart3} onClick={() => setView('load-based')} />
                </div>

                <div className="p-8 border-b border-[#DDE8E0] bg-white/50 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="relative flex-1 w-full max-w-md">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B]" />
                        <input
                            type="text"
                            placeholder="Identify specific distribution nodes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-14 pr-6 py-4 bg-[#EDF8F0]/50 border border-[#DDE8E0] rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] focus:outline-none focus:ring-2 focus:ring-[#86D9A9] focus:bg-white text-[#26382E] transition-all placeholder:text-[#64748B]"
                        />
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={view}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        {view === 'main' && renderMainTable()}
                        {view === 'country' && renderCountryMapping()}
                        {view === 'round-robin' && renderRoundRobin()}
                        {view === 'load-based' && renderLoadBased()}
                    </motion.div>
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {showAddForm && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white/95 backdrop-blur-xl rounded-2xl md:rounded-[2.5rem] border border-[#DDE8E0] w-full max-w-xl overflow-hidden shadow-2xl mx-auto max-h-[90vh] overflow-y-auto no-scrollbar flex flex-col">
                            <div className="p-5 md:p-8 border-b border-[#DDE8E0] bg-[#EDF8F0]/70 flex justify-between items-center shrink-0">
                                <div>
                                    <h3 className="text-lg md:text-xl font-black text-[#26382E] uppercase tracking-tight">
                                        {isEditing ? 'Architect Rule Update' : 'Architect New Rule'}
                                    </h3>
                                    <p className="text-[9px] md:text-[10px] font-black text-[#64748B] uppercase tracking-widest mt-1">
                                        {isEditing ? 'Updating lead distribution logic' : 'Defining lead distribution logic'}
                                    </p>
                                </div>
                            </div>
                            <div className="overflow-y-auto no-scrollbar">
                            <form onSubmit={(e) => { 
                                e.preventDefault(); 
                                const formData = Object.fromEntries(new FormData(e.target));
                                // Handle radio button for 'type'
                                if (formData.assignment) {
                                    formData.type = formData.assignment;
                                    delete formData.assignment;
                                }
                                
                                if (isEditing && editRuleData) {
                                    updateRule.mutate({ id: editRuleData.id, ...formData });
                                } else {
                                    addRule.mutate(formData);
                                }
                                setShowAddForm(false); 
                            }} className="p-5 md:p-8 space-y-5 md:space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em] px-1">Target Territory</label>
                                        <select name="country" defaultValue={editRuleData?.country || 'India'} className="w-full bg-white border border-[#DDE8E0] rounded-2xl px-5 py-4 text-xs font-black uppercase tracking-widest focus:ring-2 focus:ring-[#86D9A9] outline-none transition-all text-[#26382E]">
                                            <option>India</option>
                                            <option>USA</option>
                                            <option>UK</option>
                                            <option>UAE</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em] px-1">Operation Team</label>
                                        <select name="team" defaultValue={editRuleData?.team || 'Admissions'} className="w-full bg-white border border-[#DDE8E0] rounded-2xl px-5 py-4 text-xs font-black uppercase tracking-widest focus:ring-2 focus:ring-[#86D9A9] outline-none transition-all text-[#26382E]">
                                            <option>Admissions</option>
                                            <option>Sales</option>
                                            <option>Support</option>
                                            <option>Retention</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em] px-1">Logic Pattern</label>
                                    <div className="flex flex-col sm:grid sm:grid-cols-3 gap-3">
                                        {['Country Based', 'Round Robin', 'Load Based'].map(type => (
                                            <label key={type} className="relative cursor-pointer group w-full">
                                                <input type="radio" name="type" value={type} defaultChecked={type === (editRuleData?.type || 'Country Based')} className="peer sr-only" />
                                                <div className="p-4 rounded-xl border border-[#DDE8E0] bg-[#EDF8F0]/40 text-center peer-checked:border-[#86D9A9] peer-checked:bg-[#DDF7E8] transition-all group-hover:bg-white group-hover:shadow-sm w-full">
                                                    <span className="text-[9px] font-black text-[#64748B] uppercase tracking-widest peer-checked:text-[#26382E] leading-none">{type}</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em] px-1">Primary Counselor</label>
                                    <select name="counselor" defaultValue={editRuleData?.counselor || 'System Default'} className="w-full bg-white border border-[#DDE8E0] rounded-2xl px-5 py-4 text-xs font-black uppercase tracking-widest focus:ring-2 focus:ring-[#86D9A9] outline-none transition-all text-[#26382E]">
                                        <option>Rahul K.</option>
                                        <option>Susan V.</option>
                                        <option>Ahmed K.</option>
                                        <option>System Default</option>
                                    </select>
                                </div>
                                <div className="flex flex-col-reverse sm:grid sm:grid-cols-2 gap-3 sm:gap-4 mt-8 pt-4">
                                    <button type="button" onClick={() => setShowAddForm(false)} className="w-full px-6 py-4 rounded-2xl font-black text-[10px] md:text-sm uppercase tracking-widest text-[#64748B] border border-[#DDE8E0] bg-[#EDF8F0] hover:bg-[#DDF7E8] transition-all">Abort</button>
                                    <button type="submit" className="w-full px-6 py-4 rounded-2xl font-black text-[10px] md:text-sm uppercase tracking-widest bg-[#86D9A9] text-[#26382E] hover:bg-[#A7E8C2] transition-all shadow-sm">
                                        {isEditing ? 'Deploy Update' : 'Deploy Rule'}
                                    </button>
                                </div>
                            </form>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default RoutingRules


