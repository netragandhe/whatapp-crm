import React, { useState } from 'react'
import { MessageSquare, Globe, Search, Filter, MoreVertical, CheckCircle, XCircle, Trash2, Power, AlertCircle, Plus, Eye, X, ChevronRight, Activity, Smartphone, Inbox, Save, ExternalLink } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'
import { useQuery } from '@tanstack/react-query'
import { useChannelActions } from '../../hooks/useCrmMutations'
import api from '../../services/api'

const AddChannelModal = ({ isOpen, onClose, onAdd, isPending }) => {
    const [formData, setFormData] = useState({ client: '', type: 'WhatsApp', detail: '', country: 'India' });

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="glass-card bg-white/95 rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl mx-2 sm:mx-auto max-h-[85vh] overflow-y-auto no-scrollbar border border-[#DDE8E0]"
            >
                <div className="p-8 border-b border-[#DDE8E0] flex justify-between items-center bg-[#EDF8F0]/80">
                    <div>
                        <h3 className="text-xl font-black text-[#26382E] uppercase tracking-tight">Provision New Channel</h3>
                        <p className="text-[10px] font-black text-[#64748B] uppercase tracking-widest mt-1">Registering protocol node on global cluster</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-[#DDF7E8] rounded-xl transition-colors shadow-sm text-[#64748B]">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-8 space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.15em] ml-1">Client Identity</label>
                            <input
                                type="text"
                                value={formData.client}
                                onChange={e => setFormData({ ...formData, client: e.target.value })}
                                placeholder="e.g., EduCorp Global"
                                className="w-full px-6 py-4 bg-white/80 border border-[#DDE8E0] focus:ring-2 focus:ring-[#86D9A9]/30 rounded-2xl text-sm font-bold outline-none transition-all placeholder:text-[#64748B]/50 text-[#26382E]"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.15em] ml-1">Protocol Type</label>
                                <select
                                    className="w-full px-6 py-4 bg-white/80 border border-[#DDE8E0] focus:ring-2 focus:ring-[#86D9A9]/30 rounded-2xl text-sm font-bold outline-none transition-all appearance-none cursor-pointer text-[#26382E]"
                                    value={formData.type}
                                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                                >
                                    <option>WhatsApp</option>
                                    <option>Facebook</option>
                                    <option>Website</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.15em] ml-1">Deployment Zone</label>
                                <select
                                    className="w-full px-6 py-4 bg-white/80 border border-[#DDE8E0] focus:ring-2 focus:ring-[#86D9A9]/30 rounded-2xl text-sm font-bold outline-none transition-all appearance-none cursor-pointer text-[#26382E]"
                                    value={formData.country}
                                    onChange={e => setFormData({ ...formData, country: e.target.value })}
                                >
                                    <option>India</option>
                                    <option>USA</option>
                                    <option>UAE</option>
                                    <option>UK</option>
                                </select>
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.15em] ml-1">Routing Address / Phone</label>
                            <div className="relative">
                                <Smartphone size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-[#64748B]" />
                                <input
                                    type="text"
                                    value={formData.detail}
                                    onChange={e => setFormData({ ...formData, detail: e.target.value })}
                                    placeholder="+1 (555) 000-0000"
                                    className="w-full pl-14 pr-6 py-4 bg-white/80 border border-[#DDE8E0] focus:ring-2 focus:ring-[#86D9A9]/30 rounded-2xl text-sm font-bold outline-none transition-all placeholder:text-[#64748B]/50 text-[#26382E]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-8 bg-[#EDF8F0]/60 border-t border-[#DDE8E0] flex gap-3">
                    <button onClick={onClose} disabled={isPending} className="flex-1 px-8 py-4 text-xs font-black uppercase tracking-widest text-[#64748B] hover:bg-[#EDF8F0] rounded-2xl transition-all border border-[#DDE8E0] disabled:opacity-50">Abort</button>
                    <button
                        onClick={() => onAdd(formData)}
                        disabled={isPending || !formData.client || !formData.detail}
                        className="flex-[2] bg-[#86D9A9] text-[#26382E] py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#A7E8C2] transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending ? <Activity size={16} className="animate-spin" /> : <Save size={16} />}
                        {isPending ? 'Deploying...' : 'Deploy Node'}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

const ChannelDetailModal = ({ channel, onClose }) => {
    const navigate = useNavigate();
    if (!channel) return null;
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="glass-card bg-white/95 rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl mx-2 sm:mx-auto max-h-[85vh] overflow-y-auto no-scrollbar border border-[#DDE8E0]"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-8 border-b border-[#DDE8E0] flex justify-between items-center bg-[#EDF8F0]/80">
                    <div className="flex items-center gap-4">
                        <div className={cn(
                            "p-4 rounded-2xl border",
                            channel.type === 'WhatsApp' ? 'bg-[#DDF7E8] text-[#26382E] border-[#A7E8C2]' :
                                channel.type === 'Facebook' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-gray-50 text-gray-600 border-gray-200'
                        )}>
                            {channel.type === 'WhatsApp' ? <MessageSquare size={24} /> : <Globe size={24} />}
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-[#26382E] uppercase tracking-tight">{channel.client}</h3>
                            <p className="text-[10px] font-black text-[#64748B] uppercase tracking-widest mt-1">Node Protocol: {channel.type}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-[#DDF7E8] rounded-xl transition-colors shadow-sm text-[#64748B]">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                    <div className="space-y-8">
                        <div>
                            <p className="text-[9px] font-black text-[#64748B] uppercase tracking-[0.2em] mb-3">Telemetry Data</p>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-[#64748B]">Global Uptime</span>
                                    <span className="text-xs font-black text-emerald-600">{channel?.config?.uptime || "99.98%"}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-[#64748B]">Avg Latency</span>
                                    <span className="text-xs font-black text-[#26382E]">{channel?.config?.latency || "142ms"}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-[#64748B]">Daily Throughput</span>
                                    <span className="text-xs font-black text-[#26382E]">{channel?.config?.throughput || "12.4k"} Messages</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 bg-[#F4FBF6] rounded-3xl border border-[#DDE8E0]">
                            <p className="text-[9px] font-black text-[#86D9A9] uppercase tracking-[0.2em] mb-2">Operational Note</p>
                            <p className="text-xs font-bold text-[#26382E] leading-relaxed italic">"{channel?.config?.note || `Optimal performance detected. Regional servers in ${channel.country} are scaling dynamically.`}"</p>
                        </div>
                    </div>
                    <div className="space-y-8">
                        <div>
                            <p className="text-[9px] font-black text-[#64748B] uppercase tracking-[0.2em] mb-3">Configuration</p>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-[#64748B]">Routing Zone</span>
                                    <span className="text-xs font-black text-[#26382E]">{channel.country}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-[#64748B]">Endpoint</span>
                                    <span className="text-xs font-black text-[#26382E] line-clamp-1">{channel.detail}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-[#64748B]">Sync Frequency</span>
                                    <span className="text-xs font-black text-[#26382E] uppercase">Real-time</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <button onClick={() => { onClose(); navigate('/super-admin/analytics'); }} className="w-full p-4 bg-[#86D9A9] text-[#26382E] rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#A7E8C2] transition-all shadow-sm">
                                <Activity size={14} /> Open Stream
                            </button>
                            <button onClick={() => { onClose(); navigate('/super-admin/inbox'); }} className="w-full p-4 bg-white/80 border border-[#DDE8E0] text-[#26382E] rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#EDF8F0] transition-all shadow-sm">
                                <Inbox size={14} /> View Inbox
                            </button>
                        </div>
                    </div>
                </div>
                <div className="px-10 py-8 bg-[#EDF8F0]/60 border-t border-[#DDE8E0] flex justify-between items-center">
                    <p className="text-[9px] font-black text-[#64748B] uppercase tracking-widest">Instance GUID: {Math.random().toString(36).substring(7).toUpperCase()}</p>
                    <button onClick={onClose} className="px-8 py-3 bg-white/80 border border-[#DDE8E0] rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#EDF8F0] transition-all text-[#64748B]">Close detail</button>
                </div>
            </motion.div>
        </motion.div>
    )
}

const ChannelsControl = () => {
    const { toggleStatus, deleteChannel, addChannel } = useChannelActions()
    const [searchTerm, setSearchTerm] = useState('')
    const [filterType, setFilterType] = useState('All')
    const [filterCountry, setFilterCountry] = useState('All')

    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [selectedChannel, setSelectedChannel] = useState(null)
    const [confirmDelete, setConfirmDelete] = useState(null)

    const { data: channels = [], isLoading, refetch } = useQuery({
        queryKey: ['channels'],
        queryFn: async () => {
            const res = await api.get('/channels');
            const dataToMap = Array.isArray(res.data?.data) ? res.data.data : (Array.isArray(res.data) ? res.data : []);
            return dataToMap.map(ch => ({
                id: ch.id,
                client: ch.name || 'Unknown',
                type: ch.type || 'WhatsApp',
                detail: ch.config?.detail || 'No detail',
                country: ch.config?.country || 'Universal',
                status: ch.status || 'Active',
                config: ch.config || {},
                lastActivity: ch.lastActivity ? new Date(ch.lastActivity).toLocaleString() : 'Never'
            }));
        }
    })

    const filteredChannels = channels.filter(ch => {
        const matchesType = filterType === 'All' || ch.type === filterType
        const matchesCountry = filterCountry === 'All' || ch.country === filterCountry
        const matchesSearch = ch.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ch.detail.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesType && matchesCountry && matchesSearch
    })

    const [isSaving, setIsSaving] = useState(false)

    const handleAddChannel = async (data) => {
        // Transform UI data to backend schema
        const payload = {
            name: data.client,
            type: data.type,
            number: data.detail,
            country: data.country,
            config: {
                detail: data.detail,
                country: data.country
            }
        };
        
        setIsSaving(true);
        try {
            await api.post('/channels', payload);
            setIsAddModalOpen(false);
            refetch();
            alert('Channel created successfully! Data has been saved to the database.');
        } catch (error) {
            console.error(error);
            alert(`Connection or server error: ${error.response?.data?.message || error.message}`);
        } finally {
            setIsSaving(false);
        }
    }

    const handleDelete = (id) => {
        deleteChannel.mutate(id, {
            onSuccess: () => setConfirmDelete(null)
        })
    }

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-[#26382E] uppercase tracking-tight">Channel Infrastructure</h1>
                    <p className="text-xs md:text-sm font-medium text-[#64748B]">Provisioning communication protocol nodes.</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="w-full sm:w-auto bg-[#86D9A9] text-[#26382E] px-6 md:px-8 py-3.5 md:py-4 rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-[#A7E8C2] transition-all shadow-sm flex items-center justify-center gap-3 active:scale-95"
                >
                    <Plus size={18} strokeWidth={2.5} />
                    <span>Provision Node</span>
                </button>
            </div>

            <div className="glass-card bg-white/80 rounded-3xl border border-[#DDE8E0] shadow-sm overflow-hidden flex flex-col">
                <div className="p-4 md:p-8 border-b border-[#DDE8E0] flex flex-col lg:flex-row lg:items-center justify-between gap-4 md:gap-6 bg-[#EDF8F0]/80">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-1 w-full lg:w-auto">
                        <div className="relative w-full lg:max-w-sm">
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]" />
                            <input
                                type="text"
                                placeholder="Locate node identity..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-12 pr-6 py-3.5 bg-white/80 border border-[#DDE8E0] rounded-2xl text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-[#86D9A9]/30 outline-none w-full transition-all text-[#26382E] placeholder:text-[#64748B]/50"
                            />
                        </div>
                        <div className="h-4 w-px bg-[#DDE8E0] hidden sm:block" />
                        <div className="flex items-center gap-2 px-1 justify-between sm:justify-start">
                            <span className="text-[10px] font-black text-[#64748B] uppercase tracking-widest whitespace-nowrap">Zone:</span>
                            <div className="relative">
                                <select
                                    value={filterCountry}
                                    onChange={e => setFilterCountry(e.target.value)}
                                    className="bg-white/80 border border-[#DDE8E0] rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-[#86D9A9]/30 transition-all text-[#26382E] appearance-none cursor-pointer pr-8"
                                >
                                    <option>All</option>
                                    <option>India</option>
                                    <option>USA</option>
                                    <option>UAE</option>
                                    <option>UK</option>
                                </select>
                                <ChevronRight size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] rotate-90 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center lg:justify-end gap-2 overflow-x-auto no-scrollbar py-1 w-full lg:w-auto">
                        <div className="flex bg-white/80 border border-[#DDE8E0] p-1.5 rounded-2xl shadow-sm min-w-fit">
                            {['All', 'WhatsApp', 'Facebook', 'Website'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setFilterType(type)}
                                    className={cn(
                                        "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                                        filterType === type ? "bg-[#86D9A9] text-[#26382E] shadow-sm font-black" : "text-[#64748B] hover:text-[#26382E]"
                                    )}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-4 md:p-8 bg-[#F4FBF6]/40 relative min-h-[400px]">
                    {isLoading && (
                        <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] z-10 flex items-center justify-center">
                            <div className="flex flex-col items-center gap-4">
                                <div className="p-4 bg-white/80 rounded-3xl shadow-sm border border-[#DDE8E0]">
                                    <Activity size={32} className="text-[#86D9A9] animate-spin" />
                                </div>
                                <p className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em] animate-pulse">Synchronizing Nodes...</p>
                            </div>
                        </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                        <AnimatePresence mode="popLayout">
                            {filteredChannels.map((ch) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    key={ch.id}
                                    className="glass-card bg-white/90 rounded-3xl border border-[#DDE8E0] p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                                    onClick={() => setSelectedChannel(ch)}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "p-3 rounded-2xl transition-transform group-hover:scale-110 duration-500 border",
                                                ch.type === 'WhatsApp' ? 'bg-[#DDF7E8] text-[#26382E] border-[#A7E8C2]' :
                                                    ch.type === 'Facebook' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-[#EDF8F0] text-[#26382E] border-[#DDE8E0]'
                                            )}>
                                                {ch.type === 'WhatsApp' ? <MessageSquare size={20} /> :
                                                    ch.type === 'Facebook' ? <Globe size={20} /> : <Activity size={20} />}
                                            </div>
                                            <div>
                                                <h3 className="font-black text-sm text-[#26382E] uppercase tracking-tight group-hover:text-[#86D9A9] transition-colors">{ch.client}</h3>
                                                <p className="text-[10px] font-black text-[#64748B] uppercase tracking-widest mt-0.5">{ch.type} Protocol</p>
                                            </div>
                                        </div>
                                        <div className={cn(
                                            "h-2.5 w-2.5 rounded-full mt-2",
                                            ch.status === 'Active' ? 'bg-[#86D9A9]' : 'bg-gray-300'
                                        )} title={ch.status} />
                                    </div>

                                    <div className="bg-[#F4FBF6] rounded-2xl p-4 mt-2 space-y-3 border border-[#DDE8E0]">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[9px] font-black text-[#64748B] uppercase tracking-widest">Endpoint</span>
                                            <span className="text-[10px] font-black text-[#26382E] uppercase tracking-tight">{ch.detail}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[9px] font-black text-[#64748B] uppercase tracking-widest">Zone</span>
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-sm">
                                                    {ch.country === 'India' ? '🇮🇳' : ch.country === 'USA' ? '🇺🇸' : ch.country === 'UAE' ? '🇦🇪' : '🇬🇧'}
                                                </span>
                                                <span className="text-[10px] font-black text-[#26382E] uppercase tracking-widest">{ch.country}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[9px] font-black text-[#64748B] uppercase tracking-widest">Uptime</span>
                                            <span className="text-[10px] font-black text-[#26382E] uppercase tracking-tight">{ch.lastActivity}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mt-2 pt-4 border-t border-[#DDE8E0]">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setSelectedChannel(ch); }}
                                            className="flex-1 py-3 bg-white/80 border border-[#DDE8E0] rounded-xl text-[9px] font-black uppercase tracking-widest text-[#26382E] hover:bg-[#EDF8F0] transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                                        >
                                            <Eye size={12} strokeWidth={2.5} /> Status
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleStatus.mutate({ id: ch.id, currentStatus: ch.status });
                                            }}
                                            disabled={toggleStatus.isPending}
                                            className={cn(
                                                "flex-[1.5] py-3 bg-white/80 border border-[#DDE8E0] rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95",
                                                ch.status === 'Active' ? 'text-amber-600 hover:bg-amber-50' : 'text-[#26382E] bg-[#DDF7E8] hover:bg-[#A7E8C2]'
                                            )}
                                        >
                                            <Power size={12} className={toggleStatus.isPending ? "animate-pulse" : ""} strokeWidth={2.5} />
                                            {ch.status === 'Active' ? 'Disconnect' : 'Connect'}
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setConfirmDelete(ch);
                                            }}
                                            className="w-10 py-3 bg-white/80 border border-[#DDE8E0] rounded-xl text-[#64748B] hover:text-rose-600 hover:border-rose-200 transition-all flex items-center justify-center shadow-sm active:scale-95 shrink-0"
                                            title="Delete Channel"
                                        >
                                            <Trash2 size={12} strokeWidth={2.5} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                    {filteredChannels.length === 0 && !isLoading && (
                        <div className="py-20 text-center">
                            <div className="glass-card bg-white/80 rounded-3xl p-10 max-w-sm mx-auto shadow-sm border border-[#DDE8E0] mx-2 sm:mx-auto">
                                <Globe className="mx-auto text-[#64748B]/40 mb-6" size={48} strokeWidth={1} />
                                <h4 className="text-sm font-black text-[#26382E] uppercase tracking-tight mb-2">Protocol Isolation</h4>
                                <p className="text-[10px] font-black text-[#64748B] uppercase tracking-widest mb-8">No communication nodes located in this sector.</p>
                                <button 
                                    onClick={() => refetch()}
                                    className="w-full py-3 bg-[#EDF8F0] text-[#26382E] rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#DDF7E8] transition-all border border-[#DDE8E0] flex items-center justify-center gap-2"
                                >
                                    <ExternalLink size={12} /> Force Infrastructure Sync
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modals */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <AddChannelModal
                        isOpen={isAddModalOpen}
                        onClose={() => setIsAddModalOpen(false)}
                        onAdd={handleAddChannel}
                        isPending={isSaving}
                    />
                )}
                {selectedChannel && (
                    <ChannelDetailModal
                        channel={selectedChannel}
                        onClose={() => setSelectedChannel(null)}
                    />
                )}
                {confirmDelete && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="glass-card bg-white/95 rounded-[2.5rem] w-full max-w-sm overflow-hidden shadow-2xl p-8 text-center mx-2 sm:mx-auto max-h-[85vh] overflow-y-auto no-scrollbar border border-[#DDE8E0]"
                        >
                            <div className="bg-rose-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <AlertCircle className="text-rose-500" size={32} />
                            </div>
                            <h3 className="text-xl font-black text-[#26382E] uppercase tracking-tight mb-2">Confirm Termination?</h3>
                            <p className="text-xs font-medium text-[#64748B] leading-relaxed uppercase tracking-widest mb-8 text-center px-4">You are about to disconnect the {confirmDelete.type} protocol node for <span className="text-rose-600 font-black">{confirmDelete.client}</span>. This is irreversible.</p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setConfirmDelete(null)}
                                    className="flex-1 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-[#64748B] hover:bg-[#EDF8F0] transition-all border border-[#DDE8E0]"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDelete(confirmDelete.id)}
                                    className="flex-1 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest bg-rose-600 text-white hover:bg-rose-700 transition-all shadow-sm"
                                >
                                    Terminate
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default ChannelsControl



