import React, { useState } from 'react'
import { Plus, Database, Cpu, Share2, Link, Server, RefreshCcw, Trash2, Activity, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../lib/utils'
import { useQuery } from '@tanstack/react-query'
import { useIntegrationActions } from '../hooks/useCrmMutations'
import api from '../services/api'

const IntegrationCard = React.memo(({ integration, onTest, onDelete }) => (
    <motion.tr
        layout
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="hover:bg-[#F4FBF6]/80 transition-all group border-b border-[#DDE8E0]/40 last:border-0"
    >
        <td className="px-6 md:px-10 py-7">
            <div className="flex items-center gap-4 md:gap-5">
                <div className={cn(
                    "h-12 w-12 md:h-14 md:w-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-all duration-300 border border-[#DDE8E0]",
                    integration.name === 'HubSpot' ? "bg-orange-50 text-orange-600" :
                        integration.name === 'Salesforce' ? "bg-blue-50 text-blue-600" : "bg-[#DDF7E8] text-[#26382E]"
                )}>
                    {integration.name === 'HubSpot' ? <Database size={20} /> :
                        integration.name === 'Salesforce' ? <Cpu size={20} /> : <Share2 size={20} />}
                </div>
                <div className="min-w-0 flex-1">
                    <div className="font-bold text-[#26382E] uppercase tracking-tight text-xs md:text-sm mb-0.5 truncate">{integration.name} Node</div>
                    <div className="text-[10px] text-[#64748B] font-bold flex items-center gap-2 uppercase tracking-widest truncate">
                        <Link size={12} className="text-emerald-700 shrink-0" />
                        <span className="truncate">{integration.url}</span>
                    </div>
                </div>
            </div>
        </td>
        <td className="px-6 md:px-10 py-7">
            <div className="flex items-center gap-2">
                <Server size={14} className="text-[#64748B] shrink-0" />
                <span className="text-[10px] font-bold text-[#26382E] uppercase tracking-[0.2em] whitespace-nowrap">
                    {integration.name.includes('Webhook') ? 'REST Protocol' : 'SECURE OAUTH'}
                </span>
            </div>
        </td>
        <td className="px-6 md:px-10 py-7">
            <div className="flex items-center gap-3">
                <div className={cn("h-1.5 w-1.5 rounded-full shrink-0", 
                    integration.status === 'Active' ? 'bg-[#86D9A9] shadow-[0_0_8px_rgba(134,217,169,0.8)]' : 'bg-slate-300')} />
                <span className={cn(
                    "text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-xl border transition-all whitespace-nowrap",
                    integration.status === 'Active' 
                        ? 'bg-[#DDF7E8] text-[#26382E] border-[#86D9A9]/50' 
                        : 'bg-[#EDF8F0] text-[#64748B] border-[#DDE8E0]'
                )}>
                    {integration.status === 'Active' ? 'Operational' : 'Offline'}
                </span>
            </div>
        </td>
        <td className="px-6 md:px-10 py-7 text-right">
            <div className="flex items-center justify-end gap-3 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all lg:translate-x-4 lg:group-hover:translate-x-0">
                <button
                    onClick={() => onTest(integration.id)}
                    className="h-10 w-10 flex items-center justify-center bg-white border border-[#DDE8E0] rounded-xl text-[#64748B] hover:text-[#26382E] hover:bg-[#DDF7E8] hover:border-[#86D9A9] transition-all shadow-sm active:scale-95"
                    title="Test Protocol"
                >
                    <RefreshCcw size={14} />
                </button>
                <button
                    onClick={() => onDelete(integration.id)}
                    className="h-10 w-10 flex items-center justify-center bg-white border border-[#DDE8E0] rounded-xl text-[#64748B] hover:text-rose-600 hover:border-rose-200 transition-all shadow-sm active:scale-95"
                    title="Sever Connection"
                >
                    <Trash2 size={14} />
                </button>
            </div>
        </td>
    </motion.tr>
))

const CrmIntegration = () => {
    const [showAddForm, setShowAddForm] = useState(false)
    const { addIntegration, deleteIntegration, testConnection } = useIntegrationActions()

    const { data: resp, isLoading } = useQuery({
        queryKey: ['integrations'],
        queryFn: async () => {
            const res = await api.get('/admin/integrations');
            return res.data || res;
        }
    })

    const integrations = Array.isArray(resp) ? resp : (resp?.data || [])

    return (
        <div className="space-y-10 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
                <div>
                    <div className="flex items-center gap-2 md:gap-3 mb-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#86D9A9] shadow-[0_0_10px_rgba(134,217,169,0.5)]" />
                        <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-[0.3em]">Master Records</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#26382E] tracking-tighter uppercase leading-none">Ecosystem</h1>
                    <p className="text-xs md:text-sm font-medium text-[#64748B] mt-2 max-w-xl">Centralized synchronization hub for external CRM nodes and data flow protocols.</p>
                </div>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="h-12 md:h-14 px-8 md:px-10 w-full md:w-auto bg-[#86D9A9] text-[#26382E] rounded-2xl font-bold text-[10px] md:text-[11px] uppercase tracking-[0.2em] hover:bg-[#A7E8C2] transition-all shadow-sm flex items-center justify-center gap-3 active:scale-95"
                >
                    <Plus size={16} />
                    <span>Establish Hub</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 space-y-8">
                    <div className="glass-card rounded-[2.5rem] border border-[#DDE8E0] shadow-glass overflow-hidden flex flex-col min-h-[500px]">
                        <div className="overflow-x-auto custom-scrollbar">
                            <table className="w-full text-left border-collapse min-w-[700px]">
                                <thead>
                                    <tr className="bg-[#EDF8F0]/50 border-b border-[#DDE8E0]">
                                        <th className="px-6 md:px-10 py-6 font-bold text-[#64748B] uppercase tracking-[0.2em] text-[9px] min-w-[200px]">Master Identity</th>
                                        <th className="px-6 md:px-10 py-6 font-bold text-[#64748B] uppercase tracking-[0.2em] text-[9px]">Protocol</th>
                                        <th className="px-6 md:px-10 py-6 font-bold text-[#64748B] uppercase tracking-[0.2em] text-[9px]">Sync Status</th>
                                        <th className="px-6 md:px-10 py-6 font-bold text-[#64748B] uppercase tracking-[0.2em] text-[10px] text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#DDE8E0]/40 overflow-hidden">
                                    <AnimatePresence mode='popLayout'>
                                        {integrations.map((int) => (
                                            <IntegrationCard
                                                key={int.id}
                                                integration={int}
                                                onTest={testConnection.mutate}
                                                onDelete={deleteIntegration.mutate}
                                            />
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>

                        {integrations.length === 0 && !isLoading && (
                            <div className="flex-1 flex flex-col items-center justify-center p-20 text-center">
                                <div className="h-24 w-24 bg-[#EDF8F0] rounded-[2.5rem] flex items-center justify-center mb-8 border border-[#DDE8E0] border-dashed text-[#64748B]">
                                    <Database size={32} />
                                </div>
                                <h3 className="text-[11px] font-bold text-[#64748B] uppercase tracking-[0.4em]">Zero Active Nodes</h3>
                            </div>
                        )}
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-10">
                    <div className="glass-card p-8 md:p-10 rounded-[2.5rem] text-[#26382E] border border-[#DDE8E0] shadow-glass relative overflow-hidden group">
                        <div className="relative z-10">
                            <Activity className="text-emerald-700 mb-6 group-hover:scale-105 transition-transform" size={40} />
                            <h3 className="font-black text-xl mb-4 uppercase tracking-tight text-[#26382E]">Sync Health</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center bg-[#F4FBF6] p-5 rounded-2xl border border-[#DDE8E0]">
                                    <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Uptime</span>
                                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">99.98%</span>
                                </div>
                                <div className="flex justify-between items-center bg-[#F4FBF6] p-5 rounded-2xl border border-[#DDE8E0]">
                                    <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Avg Latency</span>
                                    <span className="text-[10px] font-bold text-[#26382E] uppercase tracking-widest">42ms</span>
                                </div>
                                <div className="flex justify-between items-center bg-[#F4FBF6] p-5 rounded-2xl border border-[#DDE8E0]">
                                    <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Queue Backlog</span>
                                    <span className="text-[10px] font-bold text-[#26382E] uppercase tracking-widest">0 Payloads</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {showAddForm && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white/95 backdrop-blur-2xl rounded-[2.5rem] w-full max-w-xl overflow-hidden shadow-glass border border-[#DDE8E0] mx-auto max-h-[85vh] overflow-y-auto no-scrollbar flex flex-col">
                            <div className="p-6 md:p-8 border-b border-[#DDE8E0] bg-[#F4FBF6] flex justify-between items-center shrink-0">
                                <div>
                                    <h3 className="text-xl md:text-2xl font-bold text-[#26382E] uppercase tracking-tight">Provision CRM Node</h3>
                                    <p className="text-[9px] md:text-[10px] font-bold text-[#64748B] uppercase tracking-widest mt-1">Establishing secure data synchronization</p>
                                </div>
                                <button onClick={() => setShowAddForm(false)} className="text-[#64748B] hover:text-[#26382E] transition-colors bg-white border border-[#DDE8E0] p-2 md:p-3 rounded-xl shadow-sm"><X size={20} /></button>
                            </div>
                            <form onSubmit={(e) => { 
                                e.preventDefault(); 
                                const formData = Object.fromEntries(new FormData(e.target));
                                if (formData.type && formData.type.includes(' ')) {
                                    formData.type = formData.type.split(' ')[0];
                                }
                                addIntegration.mutate(formData); 
                                setShowAddForm(false); 
                            }} className="p-6 md:p-8 space-y-6 overflow-y-auto">
                                <div className="space-y-2">
                                    <label className="text-[9px] md:text-[10px] font-bold text-[#64748B] uppercase tracking-[0.2em] px-1">Integration Identity</label>
                                    <input name="name" required placeholder="HUBSPOT MAIN PRODUCTION" className="w-full bg-[#F4FBF6] border border-[#DDE8E0] rounded-xl md:rounded-2xl px-4 md:px-6 py-4 text-xs md:text-sm font-bold text-[#26382E] uppercase tracking-widest focus:ring-4 focus:ring-[#86D9A9]/20 focus:border-[#86D9A9] outline-none transition-all placeholder:text-[#64748B]/60" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] md:text-[10px] font-bold text-[#64748B] uppercase tracking-[0.2em] px-1">CRM Logic Provider</label>
                                    <select name="type" className="w-full bg-[#F4FBF6] border border-[#DDE8E0] rounded-xl md:rounded-2xl px-4 md:px-6 py-4 text-xs md:text-sm font-bold text-[#26382E] uppercase tracking-widest focus:ring-4 focus:ring-[#86D9A9]/20 focus:border-[#86D9A9] outline-none transition-all appearance-none">
                                        <option>HubSpot (REST OAuth)</option>
                                        <option>Salesforce (Lightning API)</option>
                                        <option>Custom Webhook (JSON)</option>
                                        <option>Pipedrive API</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] md:text-[10px] font-bold text-[#64748B] uppercase tracking-[0.2em] px-1">Master Endpoint / Client Domain</label>
                                    <div className="relative">
                                        <Link size={16} className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-[#64748B]" />
                                        <input name="url" required placeholder="https://api.hubapi.com/v1" className="w-full bg-[#F4FBF6] border border-[#DDE8E0] rounded-xl md:rounded-2xl pl-12 md:pl-14 pr-4 md:pr-6 py-4 text-xs md:text-sm font-bold text-[#26382E] uppercase tracking-widest focus:ring-4 focus:ring-[#86D9A9]/20 focus:border-[#86D9A9] outline-none transition-all placeholder:text-[#64748B]/60" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] md:text-[10px] font-bold text-[#64748B] uppercase tracking-[0.2em] px-1">Access Token / Private Key</label>
                                    <input name="key" type="password" required className="w-full bg-[#F4FBF6] border border-[#DDE8E0] rounded-xl md:rounded-2xl px-4 md:px-6 py-4 text-xs md:text-sm font-bold text-[#26382E] tracking-widest focus:ring-4 focus:ring-[#86D9A9]/20 focus:border-[#86D9A9] outline-none transition-all" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 pt-4 shrink-0">
                                    <button type="button" onClick={() => setShowAddForm(false)} className="px-6 md:px-8 py-4 rounded-xl md:rounded-2xl font-bold text-[10px] md:text-xs uppercase tracking-widest text-[#64748B] border border-[#DDE8E0] hover:bg-[#F4FBF6] transition-all">Abort Protocol</button>
                                    <button type="submit" className="px-6 md:px-8 py-4 rounded-xl md:rounded-2xl font-bold text-[10px] md:text-xs uppercase tracking-widest bg-[#86D9A9] text-[#26382E] hover:bg-[#A7E8C2] transition-all shadow-sm">Establish Link</button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default CrmIntegration
