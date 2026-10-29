import React, { useState } from 'react'
import { Phone, Facebook, MousePointer2, Plus, Filter, Globe, Calendar, Clock, Link2, Trash2, Shield, Power, Copy, CheckCircle, Smartphone, Code } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'
import { useQuery } from '@tanstack/react-query'
import api from '../../services/api'
import { useChannelActions } from '../../hooks/useCrmMutations'

const TabButton = ({ active, label, icon: Icon, onClick }) => (
    <button
        onClick={onClick}
        className={cn(
            "flex items-center gap-2.5 px-6 py-3 font-bold text-xs uppercase tracking-wider transition-all rounded-xl border",
            active
                ? "text-[#26382E] border-[#A7E8C2] bg-[#DDF7E8] shadow-xs"
                : "text-[#64748B] border-transparent hover:text-[#26382E] hover:bg-[#EDF8F0]/70"
        )}
    >
        <Icon size={15} />
        {label}
    </button>
)

const GenerateScriptModal = ({ widget, onClose }) => {
    const [copied, setCopied] = useState(false)
    const scriptCode = `<!-- Kiaan CRM Widget -->\n<script src="https://cdn.whatsappcrm.io/widget.js?id=${widget?.id * 734}"></script>\n<script>\n  window.CrmWidget.init({ domain: "${widget?.domain}" });\n</script>`

    const handleCopy = () => {
        navigator.clipboard.writeText(scriptCode)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#26382E]/40 backdrop-blur-md">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="glass-card bg-white/95 border border-[#DDE8E0] rounded-3xl w-full max-w-xl overflow-hidden shadow-glass-lg mx-2 sm:mx-auto max-h-[85vh] overflow-y-auto">
                <div className="p-6 md:p-8 border-b border-[#DDE8E0] flex justify-between items-center bg-[#EDF8F0]/60">
                    <div>
                        <h3 className="text-lg font-black text-[#26382E] tracking-tight">Deployment Script</h3>
                        <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mt-0.5">Widget ID: #WID-{widget?.id * 921}</p>
                    </div>
                </div>
                <div className="p-6 md:p-8 space-y-5">
                    <p className="text-xs font-medium text-[#64748B] leading-relaxed">Copy the following snippet and paste it before the closing <code className="bg-[#EDF8F0] px-1.5 py-0.5 rounded text-[#26382E] font-mono text-[11px]">&lt;/body&gt;</code> tag of your website.</p>
                    <div className="relative">
                        <pre className="bg-[#26382E] text-[#86D9A9] p-5 rounded-2xl text-xs font-mono leading-relaxed overflow-x-auto border border-[#DDE8E0]">
                            {scriptCode}
                        </pre>
                        <button onClick={handleCopy} className="absolute right-3.5 top-3.5 p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/10 text-white">
                            {copied ? <CheckCircle size={14} className="text-[#86D9A9]" /> : <Copy size={14} />}
                        </button>
                    </div>
                    <div className="bg-[#DDF7E8] p-3.5 rounded-2xl border border-[#A7E8C2]/60 flex items-center gap-2.5">
                        <Code className="text-[#2E8456]" size={16} />
                        <p className="text-xs font-bold text-[#26382E]">Security: Verified SSL/TLS HTTPS Protocol Required</p>
                    </div>
                </div>
                <div className="p-5 bg-[#EDF8F0]/60 border-t border-[#DDE8E0]">
                    <button onClick={onClose} className="w-full bg-[#86D9A9] text-[#26382E] py-2.5 rounded-xl font-bold text-xs hover:bg-[#A7E8C2] transition-all shadow-xs">Close</button>
                </div>
            </motion.div>
        </motion.div>
    )
}

const ChannelSetup = () => {
    const [activeTab, setActiveTab] = useState('whatsapp')
    const [showAddForm, setShowAddForm] = useState(false)
    const [scriptWidget, setScriptWidget] = useState(null)
    const { toggleStatus, deleteChannel, addChannel } = useChannelActions()

    const { data: channels = [], isLoading } = useQuery({
        queryKey: ['channels', activeTab],
        queryFn: async () => {
            const typeMap = {
                'whatsapp': 'WhatsApp',
                'facebook': 'Facebook',
                'website': 'Website'
            };
            const response = await api.get('/channels', { params: { type: typeMap[activeTab] } });
            return response.data || response;
        }
    })

    return (
        <div className="space-y-8 pb-16">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-[#26382E] tracking-tight">Channel Setup</h1>
                    <p className="text-xs sm:text-sm font-medium text-[#64748B] mt-1">Provision and manage multi-channel communication gateways.</p>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                    <TabButton active={activeTab === 'whatsapp'} label="WhatsApp" icon={Phone} onClick={() => setActiveTab('whatsapp')} />
                    <TabButton active={activeTab === 'facebook'} label="Facebook" icon={Facebook} onClick={() => setActiveTab('facebook')} />
                    <TabButton active={activeTab === 'website'} label="Website Widget" icon={MousePointer2} onClick={() => setActiveTab('website')} />
                </div>
            </div>

            {/* Table Container Card */}
            <div className="glass-card bg-white/85 backdrop-blur-xl border border-[#DDE8E0] rounded-3xl overflow-hidden shadow-glass min-h-[500px]">
                <div className="p-4 sm:p-6 border-b border-[#DDE8E0] bg-[#EDF8F0]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="font-black text-[#26382E] text-sm uppercase tracking-wider">{activeTab} Node Gateways</h3>
                        <p className="text-xs font-medium text-[#64748B] mt-0.5">Active instances for {activeTab}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2.5">
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-[#86D9A9] text-[#26382E] rounded-xl text-xs font-bold hover:bg-[#A7E8C2] transition-all shadow-xs"
                        >
                            <Plus size={15} />
                            Add Channel
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[750px]">
                        <thead>
                            <tr className="bg-[#EDF8F0]/70 border-b border-[#DDE8E0]">
                                {activeTab === 'whatsapp' && (
                                    <>
                                        <th className="px-6 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Identity / Number</th>
                                        <th className="px-6 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Territory</th>
                                        <th className="px-6 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Provision Date</th>
                                        <th className="px-6 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Telemetry</th>
                                        <th className="px-6 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px]">State</th>
                                    </>
                                )}
                                {activeTab === 'facebook' && (
                                    <>
                                        <th className="px-6 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Page Identity</th>
                                        <th className="px-6 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Page ID</th>
                                        <th className="px-6 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Territory</th>
                                        <th className="px-6 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Provision Date</th>
                                        <th className="px-6 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px]">State</th>
                                    </>
                                )}
                                {activeTab === 'website' && (
                                    <>
                                        <th className="px-6 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Asset Name</th>
                                        <th className="px-6 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Domain Node</th>
                                        <th className="px-6 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Territory</th>
                                        <th className="px-6 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Throughput</th>
                                        <th className="px-6 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px]">State</th>
                                    </>
                                )}
                                <th className="px-6 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#DDE8E0]/60">
                            {(channels.data || channels).map((channel) => (
                                <tr key={channel.id} className="hover:bg-[#F4FBF6] transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-0.5">
                                            <div className="font-bold text-xs text-[#26382E]">{channel.number || channel.name}</div>
                                            <div className="text-[10px] text-[#64748B]">{channel.client || channel.domain}</div>
                                        </div>
                                    </td>
                                    {activeTab === 'facebook' && <td className="px-6 py-4 font-mono text-xs text-[#64748B]">{channel.pageId}</td>}
                                    {activeTab === 'website' && <td className="px-6 py-4 font-mono text-xs text-[#2E8456] font-bold">{channel.domain}</td>}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5">
                                            <Globe size={13} className="text-[#86D9A9]" />
                                            <span className="text-xs font-semibold text-[#26382E]">{channel.country}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs font-medium text-[#64748B]">{channel.date || `${channel.leadsToday} Leads Today`}</span>
                                    </td>
                                    {activeTab === 'whatsapp' && (
                                        <td className="px-6 py-4">
                                            {channel.lastSeen ? <span className="text-[10px] font-bold text-[#2E8456]">Pulsed: {channel.lastSeen}</span> : <span className="text-[#94A3B8]">-</span>}
                                        </td>
                                    )}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className={cn("h-2 w-2 rounded-full", (channel.status === 'Connected' || channel.status === 'Active') ? 'bg-[#22C55E]' : 'bg-rose-500')} />
                                            <span className={cn(
                                                "text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border",
                                                (channel.status === 'Connected' || channel.status === 'Active') ? 'bg-[#DDF7E8] text-[#26382E] border-[#A7E8C2]' : 'bg-rose-50 text-rose-600 border-rose-200'
                                            )}>
                                                {channel.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-1.5">
                                            {activeTab === 'website' && (
                                                <button onClick={() => setScriptWidget(channel)} className="p-2 bg-white border border-[#DDE8E0] rounded-xl text-[#64748B] hover:text-[#26382E] hover:bg-[#DDF7E8] transition-all shadow-xs" title="Generate Script">
                                                    <Code size={14} />
                                                </button>
                                            )}
                                            {(activeTab === 'whatsapp' || activeTab === 'facebook') && (
                                                <button
                                                    onClick={() => toggleStatus.mutate({ id: channel.id, currentStatus: channel.status })}
                                                    className={cn(
                                                        "p-2 bg-white border border-[#DDE8E0] rounded-xl transition-all shadow-xs",
                                                        (channel.status === 'Connected' || channel.status === 'Active') ? "text-rose-500 hover:bg-rose-50" : "text-[#2E8456] hover:bg-[#DDF7E8]"
                                                    )}
                                                    title={(channel.status === 'Connected' || channel.status === 'Active') ? 'Disconnect Node' : 'Initialize Connection'}
                                                >
                                                    <Power size={14} />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => deleteChannel.mutate(channel.id)}
                                                className="p-2 bg-white border border-[#DDE8E0] rounded-xl text-[#64748B] hover:text-rose-600 hover:bg-rose-50 transition-all shadow-xs"
                                                title="Delete Instance"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modals */}
            <AnimatePresence>
                {showAddForm && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#26382E]/40 backdrop-blur-md">
                        <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="glass-card bg-white/95 border border-[#DDE8E0] rounded-3xl w-full max-w-md overflow-hidden shadow-glass-lg mx-2 sm:mx-auto max-h-[85vh] overflow-y-auto">
                            <div className="p-6 border-b border-[#DDE8E0] bg-[#EDF8F0]/60 flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-black text-[#26382E] tracking-tight">Provision Gateway Node</h3>
                                    <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mt-0.5">Establishing new {activeTab} connector</p>
                                </div>
                            </div>
                            <form onSubmit={(e) => { 
                                e.preventDefault(); 
                                const formData = Object.fromEntries(new FormData(e.target));
                                const typeMap = {
                                    'whatsapp': 'WhatsApp',
                                    'facebook': 'Facebook',
                                    'website': 'Website'
                                };
                                addChannel.mutate({ ...formData, type: typeMap[activeTab] }); 
                                setShowAddForm(false); 
                            }} className="p-6 space-y-4">
                                <div className="space-y-3">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Number / Handle</label>
                                        <input name="number" required placeholder="+91 XXXX XXXX" className="w-full bg-white border border-[#DDE8E0] rounded-xl px-4 py-2.5 text-xs font-semibold text-[#26382E] focus:outline-none focus:ring-2 focus:ring-[#86D9A9] transition-all" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Territory</label>
                                        <select name="country" className="w-full bg-white border border-[#DDE8E0] rounded-xl px-4 py-2.5 text-xs font-semibold text-[#26382E] focus:outline-none focus:ring-2 focus:ring-[#86D9A9] transition-all">
                                            <option>India</option>
                                            <option>USA</option>
                                            <option>UK</option>
                                            <option>UAE</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Webhook Endpoint</label>
                                        <div className="relative">
                                            <Link2 className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" size={14} />
                                            <input name="webhook" required placeholder="https://api.domain.io/v1/hook" className="w-full bg-white border border-[#DDE8E0] rounded-xl pl-9 pr-4 py-2.5 text-xs font-semibold text-[#26382E] focus:outline-none focus:ring-2 focus:ring-[#86D9A9] transition-all" />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3 pt-3">
                                    <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2.5 rounded-xl font-bold text-xs text-[#64748B] hover:bg-[#EDF8F0] transition-colors border border-[#DDE8E0]">Cancel</button>
                                    <button type="submit" className="px-4 py-2.5 rounded-xl font-bold text-xs bg-[#86D9A9] text-[#26382E] hover:bg-[#A7E8C2] transition-colors shadow-xs">Initialize Node</button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
                {scriptWidget && (
                    <GenerateScriptModal widget={scriptWidget} onClose={() => setScriptWidget(null)} />
                )}
            </AnimatePresence>
        </div>
    )
}

export default ChannelSetup
