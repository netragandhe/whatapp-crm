import React, { useState } from 'react'
import { Search, Filter, Shield, Calendar, Clock, Monitor, Globe, User, Download, X, ListFilter, ChevronLeft, ChevronRight, Hash, Terminal, ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuditActions } from '../../hooks/useCrmMutations'
import { useQuery } from '@tanstack/react-query'
import api from '../../services/api'

const AuditDetailModal = ({ log, isOpen, onClose }) => {
    if (!isOpen || !log) return null;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#26382E]/40 backdrop-blur-md">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="glass-card bg-white/95 border border-[#DDE8E0] rounded-[2rem] w-full max-w-2xl overflow-hidden shadow-glass-lg mx-2 sm:mx-auto max-h-[85vh] overflow-y-auto">
                <div className="p-6 md:p-8 border-b border-[#DDE8E0] flex justify-between items-center bg-[#EDF8F0]/60">
                    <div className="flex items-center gap-3.5">
                        <div className="p-3 bg-[#DDF7E8] text-[#26382E] rounded-2xl border border-[#A7E8C2]/60 shadow-sm">
                            <Shield size={22} className="stroke-[2.2]" />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-[#26382E] tracking-tight">Audit Log Detail</h3>
                            <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mt-0.5">Event Trace #{log.id || 'EVT-VERIFIED'}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white text-[#64748B] hover:text-[#26382E] rounded-xl transition-colors border border-transparent hover:border-[#DDE8E0]">
                        <X size={18} />
                    </button>
                </div>

                <div className="p-6 md:p-8 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] font-black text-[#64748B] uppercase tracking-wider block mb-2">Subject Identity</label>
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 bg-gradient-to-tr from-[#86D9A9] to-[#A7E8C2] text-[#26382E] rounded-xl flex items-center justify-center font-black text-sm uppercase shadow-sm">
                                        {log.user?.charAt(0) || 'S'}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="font-black text-xs text-[#26382E] uppercase truncate">{log.user}</div>
                                        <div className="text-[10px] text-[#2E8456] font-bold uppercase tracking-wider mt-0.5">{log.role}</div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-[#64748B] uppercase tracking-wider block mb-1">Module Cluster</label>
                                <div className="font-bold text-xs text-[#26382E] uppercase">{log.module} Protocol</div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] font-black text-[#64748B] uppercase tracking-wider block mb-1">Execution Sync</label>
                                <div className="flex items-center gap-2 text-xs font-semibold text-[#26382E]">
                                    <Calendar size={14} className="text-[#86D9A9]" /> {log.time.split(' ')[0]}
                                </div>
                                <div className="flex items-center gap-2 text-xs font-semibold text-[#64748B] mt-1">
                                    <Clock size={14} className="text-[#86D9A9]" /> {log.time.split(' ')[1] || ''}
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-[#64748B] uppercase tracking-wider block mb-1">Execution Status</label>
                                <span className={cn(
                                    "inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                                    log.status === 'Success' 
                                        ? 'bg-[#DDF7E8] text-[#26382E] border-[#A7E8C2]' 
                                        : 'bg-rose-50 text-rose-600 border-rose-200'
                                )}>
                                    {log.status || 'Success'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-black text-[#64748B] uppercase tracking-wider block mb-2">Operation Details</label>
                        <div className="p-4 bg-[#F4FBF6] border border-[#DDE8E0] rounded-2xl font-medium text-xs text-[#26382E] leading-relaxed">
                            {log.action}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-[#EDF8F0]/50 rounded-2xl border border-[#DDE8E0]">
                            <label className="text-[9px] font-black text-[#64748B] uppercase tracking-wider block mb-1">Network Entry</label>
                            <div className="flex items-center gap-2 text-xs font-bold text-[#26382E]">
                                <Globe size={13} className="text-[#86D9A9]" /> {log.ip}
                            </div>
                        </div>
                        <div className="p-4 bg-[#EDF8F0]/50 rounded-2xl border border-[#DDE8E0]">
                            <label className="text-[9px] font-black text-[#64748B] uppercase tracking-wider block mb-1">Device Blueprint</label>
                            <div className="flex items-center gap-2 text-xs font-medium text-[#64748B] truncate">
                                <Monitor size={13} className="text-[#86D9A9]" /> {log.device}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-5 bg-[#EDF8F0]/60 border-t border-[#DDE8E0] text-center">
                    <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider flex items-center justify-center gap-2">
                        <Shield size={12} className="text-[#2E8456]" /> Immutable cryptographic audit log verified
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
};

const AuditLogs = () => {
    const { exportLogs } = useAuditActions();
    const [searchTerm, setSearchTerm] = useState('');
    const [moduleFilter, setModuleFilter] = useState('All Modules');
    const [userFilter, setUserFilter] = useState('All Users');
    const [dateFilter, setDateFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedLog, setSelectedLog] = useState(null);

    const { data: logs = [], isLoading } = useQuery({
        queryKey: ['audit-logs'],
        queryFn: async () => {
            const res = await api.get('/audit/logs');
            const logsData = res.data || [];
            return logsData.map(log => ({
                id: log.id,
                time: log.createdAt ? new Date(log.createdAt).toLocaleString() : 'Recent',
                user: log.user || 'System',
                role: typeof log.role === 'object' ? (log.role?.name || 'Automated') : (log.role || 'Automated'),
                action: log.action,
                module: log.module,
                ip: log.ip || '0.0.0.0',
                device: log.device || 'Unrecognized',
                status: log.status
            }));
        }
    });

    const logsSource = Array.isArray(logs) ? logs : [];
    const filteredLogs = logsSource.filter(log => {
        const matchesSearch = log.action?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.user?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.ip?.includes(searchTerm);
        const matchesModule = moduleFilter === 'All Modules' || log.module === moduleFilter;
        const matchesUser = userFilter === 'All Users' || log.user === userFilter;
        const matchesDate = !dateFilter || log.time?.startsWith(dateFilter);
        return matchesSearch && matchesModule && matchesUser && matchesDate;
    });

    const itemsPerPage = 6;
    const paginatedLogs = filteredLogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);

    return (
        <div className="space-y-8 pb-16">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-[#26382E] tracking-tight">System Audit Logs</h1>
                    <p className="text-xs sm:text-sm font-medium text-[#64748B] mt-1">Real-time security telemetry and immutable event traces.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <button
                        onClick={() => exportLogs.mutate({ moduleFilter, userFilter, searchTerm })}
                        disabled={exportLogs.isPending}
                        className="bg-[#86D9A9] text-[#26382E] px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-[#A7E8C2] flex items-center gap-2 shadow-sm transition-all active:scale-95 disabled:opacity-50"
                    >
                        <Download size={15} className={exportLogs.isPending ? "animate-bounce" : ""} />
                        Extract CSV
                    </button>
                    <div className="px-4 py-2 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-2.5">
                        <div className="p-1 bg-rose-100 text-rose-600 rounded-lg">
                            <Shield size={14} />
                        </div>
                        <div>
                            <span className="text-xs font-black text-rose-600">3 Blocked</span>
                            <span className="text-[9px] font-bold text-rose-400 block -mt-0.5">Today</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Glass Table Card */}
            <div className="glass-card bg-white/85 backdrop-blur-xl border border-[#DDE8E0] rounded-3xl overflow-hidden shadow-glass min-h-[550px] flex flex-col">
                {/* Filter Toolbar */}
                <div className="p-4 md:p-6 border-b border-[#DDE8E0] flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#EDF8F0]/40">
                    <div className="flex flex-wrap items-center gap-3 flex-1">
                        <div className="relative w-full max-w-sm">
                            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
                            <input
                                type="text"
                                placeholder="Search action, user, or IP..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2.5 bg-white border border-[#DDE8E0] rounded-xl text-xs font-semibold text-[#26382E] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#86D9A9] w-full transition-all"
                            />
                        </div>
                        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
                            <input
                                type="date"
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                                className="px-3.5 py-2.5 bg-white border border-[#DDE8E0] rounded-xl text-xs font-semibold text-[#26382E] focus:outline-none focus:ring-2 focus:ring-[#86D9A9] cursor-pointer"
                            />
                            <div className="relative">
                                <select
                                    value={userFilter}
                                    onChange={(e) => setUserFilter(e.target.value)}
                                    className="px-4 py-2.5 pr-8 bg-white border border-[#DDE8E0] rounded-xl text-xs font-bold text-[#26382E] focus:outline-none focus:ring-2 focus:ring-[#86D9A9] cursor-pointer appearance-none"
                                >
                                    <option>All Users</option>
                                    <option>System</option>
                                    <option>Super_Admin</option>
                                </select>
                                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
                            </div>
                            <div className="relative">
                                <select
                                    value={moduleFilter}
                                    onChange={(e) => setModuleFilter(e.target.value)}
                                    className="px-4 py-2.5 pr-8 bg-white border border-[#DDE8E0] rounded-xl text-xs font-bold text-[#26382E] focus:outline-none focus:ring-2 focus:ring-[#86D9A9] cursor-pointer appearance-none"
                                >
                                    <option>All Modules</option>
                                    <option>Inbox</option>
                                    <option>Billing</option>
                                    <option>Auth</option>
                                    <option>Channels</option>
                                </select>
                                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:flex items-center gap-3 border-l border-[#DDE8E0] pl-5">
                        <div className="text-right">
                            <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">Telemetry</span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="text-xs font-black text-[#26382E]">Active</span>
                                <div className="h-2 w-2 rounded-full bg-[#86D9A9] animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto flex-1">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className="bg-[#EDF8F0]/70 border-b border-[#DDE8E0]">
                                <th className="px-6 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Timestamp</th>
                                <th className="px-6 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Identity</th>
                                <th className="px-6 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Action Detail</th>
                                <th className="px-6 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Module</th>
                                <th className="px-6 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px]">Network IP</th>
                                <th className="px-6 py-4 font-black text-[#26382E] uppercase tracking-wider text-[10px] text-right">Inspect</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#DDE8E0]/60">
                            <AnimatePresence mode='popLayout'>
                                {paginatedLogs.length > 0 ? (
                                    paginatedLogs.map((log, i) => (
                                        <motion.tr
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0, scale: 0.98 }}
                                            key={log.id || i}
                                            onClick={() => setSelectedLog(log)}
                                            className="group hover:bg-[#F4FBF6] transition-colors cursor-pointer"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 whitespace-nowrap">
                                                    <Calendar size={13} className="text-[#86D9A9]" />
                                                    <span className="font-bold text-xs text-[#26382E]">{log.time.split(' ')[0]}</span>
                                                    <span className="text-[10px] text-[#64748B] font-medium">{log.time.split(' ')[1] || ''}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="h-8 w-8 bg-[#DDF7E8] text-[#26382E] border border-[#A7E8C2]/60 rounded-xl flex items-center justify-center font-black text-xs shrink-0">
                                                        {log.user?.charAt(0) || 'S'}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <div className="font-bold text-xs text-[#26382E] truncate">{log.user}</div>
                                                        <div className="text-[10px] text-[#2E8456] font-bold uppercase tracking-wider">{log.role}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-[#26382E] text-xs max-w-sm truncate bg-white/70 border border-[#DDE8E0] px-3 py-1.5 rounded-xl">
                                                    {log.action}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#DDF7E8]/70 border border-[#A7E8C2]/50 text-[#26382E] rounded-lg text-[10px] font-bold uppercase tracking-wide">
                                                    <Hash size={10} className="text-[#2E8456]" />
                                                    {log.module}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-xs font-mono font-bold text-[#64748B]">
                                                    {log.ip}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedLog(log);
                                                    }}
                                                    className="p-1.5 hover:bg-[#DDF7E8] text-[#64748B] hover:text-[#26382E] rounded-xl transition-colors"
                                                >
                                                    <Monitor size={15} />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="py-12 text-center text-xs font-medium text-[#64748B]">
                                            No audit logs matched your search or filters.
                                        </td>
                                    </tr>
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 md:p-6 border-t border-[#DDE8E0] bg-[#EDF8F0]/40 flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
                    <div className="text-xs font-medium text-[#64748B]">
                        Showing <span className="font-bold text-[#26382E]">{filteredLogs.length}</span> security events
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => p - 1)}
                            className="p-2 bg-white border border-[#DDE8E0] rounded-xl text-[#26382E] hover:bg-[#DDF7E8] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <div className="px-3.5 py-1.5 bg-white border border-[#DDE8E0] rounded-xl text-xs font-bold text-[#26382E] shadow-sm">
                            {currentPage} / {totalPages || 1}
                        </div>
                        <button
                            disabled={currentPage === totalPages || totalPages === 0}
                            onClick={() => setCurrentPage(p => p + 1)}
                            className="p-2 bg-white border border-[#DDE8E0] rounded-xl text-[#26382E] hover:bg-[#DDF7E8] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {selectedLog && (
                    <AuditDetailModal log={selectedLog} isOpen={!!selectedLog} onClose={() => setSelectedLog(null)} />
                )}
            </AnimatePresence>
        </div>
    );
};

export default AuditLogs;
