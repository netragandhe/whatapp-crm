import React, { useMemo, useState } from 'react'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel
} from '@tanstack/react-table'
import {
    MoreVertical,
    Filter,
    Download,
    Plus,
    Search,
    ChevronLeft,
    ChevronRight,
    ArrowUpDown,
    Trash2,
    UserPlus,
    CheckCircle2,
    XCircle,
    RefreshCcw
} from 'lucide-react'
import { cn } from '../lib/utils'
import { useQuery } from '@tanstack/react-query'
import { useLeadActions } from '../hooks/useCrmMutations'
import { motion, AnimatePresence } from 'framer-motion'
import api from '../services/api'
import useAppStore from '../store/useStore'

const Leads = () => {
    const { updateStage, deleteLead, exportLeads, addLead, assignLead } = useLeadActions()
    const [sorting, setSorting] = useState([])
    const [globalFilter, setGlobalFilter] = useState('')
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)
    const [selectedLead, setSelectedLead] = useState(null)



    const { country, statusFilter, dateRange, searchTerm } = useAppStore()
    const { data: resp, isLoading } = useQuery({
        queryKey: ['leads', country, statusFilter, dateRange, searchTerm],
        queryFn: () => api.get('/leads', {
            params: { country, status: statusFilter, dateRange: dateRange.label, search: searchTerm }
        })
    })

    const { data: usersResp } = useQuery({
        queryKey: ['users-assignable'],
        queryFn: () => api.get('/users').then(res => res.data.filter(u => ['COUNSELOR', 'TEAM_LEADER', 'MANAGER'].includes(u.role)))
    })

    const leads = Array.isArray(resp?.data) ? resp.data : (Array.isArray(resp) ? resp : [])
    const users = usersResp || []

    console.log('[Leads Debug] Raw response:', resp);
    console.log('[Leads Debug] Processed leads:', leads);


    const columns = useMemo(() => [
        {
            accessorKey: 'name',
            header: ({ column }) => (
                <div
                    className="flex items-center gap-2 cursor-pointer hover:text-emerald-700 transition-colors uppercase tracking-[0.1em]"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Lead Identity
                    <ArrowUpDown className="h-3 w-3" />
                </div>
            ),
            cell: ({ row }) => (
                <div className="flex items-center gap-4">
                    <div className="h-11 w-11 rounded-[14px] bg-[#DDF7E8] border border-[#86D9A9]/40 flex items-center justify-center font-bold text-[11px] text-[#26382E] shadow-sm group-hover:scale-105 group-hover:bg-[#A7E8C2] transition-all duration-300">
                        {row.original.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                        <div className="font-bold text-[#26382E] text-xs uppercase tracking-tight leading-none mb-1">{row.original.name}</div>
                        <div className="text-[10px] text-[#64748B] font-bold uppercase tracking-widest">{row.original.email}</div>
                    </div>
                </div>
            )
        },
        {
            accessorKey: 'country',
            header: () => <span className="uppercase tracking-[0.1em]">Territory</span>,
            cell: ({ getValue }) => (
                <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#86D9A9]" />
                    <span className="text-[11px] font-bold text-[#26382E] uppercase tracking-tight">{getValue()}</span>
                </div>
            )
        },
        {
            accessorKey: 'status',
            header: () => <span className="uppercase tracking-[0.1em]">State</span>,
            cell: ({ row }) => {
                const statusConfig = {
                    'New': 'bg-[#DDF7E8] border-[#86D9A9]/50 text-[#26382E]',
                    'Contacted': 'bg-amber-50 border-amber-200 text-amber-700',
                    'Qualified': 'bg-[#A7E8C2]/40 border-[#86D9A9] text-[#26382E]',
                    'Converted': 'bg-[#86D9A9] text-[#26382E] border-[#86D9A9] font-bold shadow-sm',
                    'Lost': 'bg-rose-50 border-rose-200 text-rose-600',
                    'Active': 'bg-[#DDF7E8] border-[#86D9A9]/50 text-[#26382E]',
                    'Pending': 'bg-amber-50 border-amber-200 text-amber-700'
                }
                const statusStr = row.original.stage || row.original.status || 'New'
                return (
                    <span className={cn(
                        "badge border shrink-0 font-bold text-[9px] uppercase tracking-wider px-3 py-1.5 rounded-full", 
                        statusConfig[statusStr] || 'bg-[#EDF8F0] border-[#DDE8E0] text-[#64748B]'
                    )}>
                        {statusStr}
                    </span>
                )
            }
        },
        {
            accessorKey: 'source',
            header: () => <span className="uppercase tracking-[0.1em]">Origin</span>,
            cell: ({ getValue }) => (
                <span className="text-[9px] font-bold text-[#64748B] uppercase tracking-[0.15em]">{getValue()}</span>
            )
        },
        {
            accessorKey: 'handlerName',
            header: () => <span className="uppercase tracking-[0.1em]">Custodian</span>,
            cell: ({ getValue }) => {
                const name = getValue() || 'Unassigned';
                return (
                    <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-[#DDF7E8] border border-[#86D9A9]/40 flex items-center justify-center text-[8px] font-bold text-[#26382E] uppercase">
                            {name.charAt(0)}
                        </div>
                        <span className="text-[10px] font-bold text-[#26382E] uppercase tracking-tight">{name}</span>
                    </div>
                )
            }
        },
        {
            accessorKey: 'createdAt',
            header: () => <span className="uppercase tracking-[0.1em]">Recorded</span>,
            cell: ({ getValue }) => (
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#26382E] uppercase tracking-tight">{getValue()}</span>
                    <span className="text-[8px] font-bold text-[#64748B] uppercase tracking-widest mt-0.5">System Stamp</span>
                </div>
            )
        },
        {
            id: 'actions',
            cell: ({ row }) => (
                <div className="flex items-center justify-end gap-2 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300">
                    <button
                        onClick={() => updateStage.mutate({ id: row.original.id, stage: 'Converted' })}
                        disabled={updateStage.isPending}
                        className="h-8 w-8 flex items-center justify-center bg-white border border-[#DDE8E0] rounded-xl text-[#64748B] hover:text-[#26382E] hover:bg-[#DDF7E8] hover:border-[#86D9A9] transition-all active:scale-90"
                        title="Mark as Converted"
                    >
                        <CheckCircle2 size={14} />
                    </button>
                    <button
                        onClick={() => {
                            if (window.confirm(`Are you sure you want to delete lead ${row.original.name}?`)) {
                                deleteLead.mutate(row.original.id)
                            }
                        }}
                        disabled={deleteLead.isPending}
                        className="h-8 w-8 flex items-center justify-center bg-white border border-[#DDE8E0] rounded-xl text-[#64748B] hover:text-rose-500 hover:border-rose-100 hover:shadow-lg hover:shadow-rose-500/10 transition-all active:scale-90"
                        title="Delete Lead"
                    >
                        <Trash2 size={14} className={deleteLead.isPending ? "animate-pulse" : ""} />
                    </button>
                     <button 
                        onClick={() => {
                            setSelectedLead(row.original)
                            setIsAssignModalOpen(true)
                        }}
                        className="h-8 w-8 flex items-center justify-center bg-[#86D9A9] rounded-xl text-[#26382E] hover:bg-[#A7E8C2] transition-all active:scale-90 shadow-sm" 
                        title="Assign Lead"
                    >
                        <UserPlus size={14} />
                    </button>

                </div>
            )
        }
    ], [updateStage.isPending, deleteLead.isPending])

    const table = useReactTable({
        data: leads,
        columns,
        state: { sorting, globalFilter },
        initialState: { pagination: { pageSize: 50 } },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    })

    if (isLoading) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
                <div className="relative">
                    <div className="h-16 w-16 border-4 border-[#DDE8E0] border-t-[#86D9A9] rounded-full animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center font-bold text-xs text-[#26382E]">W</div>
                </div>
                <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-[0.3em] animate-pulse">Scanning Neural Network...</p>
            </div>
        )
    }

    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
                <div className="space-y-1">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#86D9A9] shadow-[0_0_10px_rgba(134,217,169,0.5)]" />
                        <span className="text-[9px] md:text-[10px] font-bold text-emerald-700 uppercase tracking-[0.3em]">Live Lead Feed</span>
                    </div>
                    <h1 className="text-3xl font-black text-[#26382E] tracking-tighter uppercase leading-none">Intelligence</h1>
                    <p className="text-[10px] md:text-sm font-medium text-[#64748B] mt-2 max-w-xl">
                        Total <span className="text-[#26382E] font-bold">{leads.length}</span> nodes identified.
                    </p>
                </div>
                <div className="flex items-center gap-3 md:gap-4">
                    <button 
                        onClick={() => exportLeads.mutate()}
                        disabled={exportLeads.isPending}
                        className="h-12 md:h-14 flex-1 md:flex-none flex items-center justify-center gap-2 md:gap-4 bg-white/80 backdrop-blur-md border border-[#DDE8E0] text-[#26382E] px-4 md:px-8 rounded-2xl font-bold text-[9px] md:text-[10px] uppercase tracking-[0.1em] md:tracking-[0.2em] hover:bg-[#F4FBF6] transition-all active:scale-95 shadow-sm"
                    >
                        <Download className="h-4 w-4 text-[#64748B]" />
                        <span>Export</span>
                    </button>
                    <button 
                        onClick={() => setIsAddModalOpen(true)}
                        className="h-12 md:h-14 flex-1 md:flex-none flex items-center justify-center gap-2 md:gap-4 bg-[#86D9A9] text-[#26382E] px-4 md:px-10 rounded-2xl font-bold text-[9px] md:text-[10px] uppercase tracking-[0.1em] md:tracking-[0.2em] hover:bg-[#A7E8C2] transition-all shadow-sm active:scale-95"
                    >
                        <Plus className="h-4 w-4" />
                        <span>Add Node</span>
                    </button>
                </div>
            </div>

            {/* Main Table Container */}
            <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-[#DDE8E0] shadow-glass overflow-hidden flex flex-col">
                {/* Search & Utility Bar */}
                <div className="p-4 md:p-8 border-b border-[#DDE8E0] flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#F4FBF6]/60">
                    <div className="relative flex-1 max-w-md group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B] group-focus-within:text-[#26382E] transition-colors" />
                        <input
                            type="text"
                            placeholder="Universal Node Search..."
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            className="w-full pl-14 pr-6 py-4 bg-white border border-[#DDE8E0] rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#86D9A9]/20 focus:border-[#86D9A9] text-xs font-bold text-[#26382E] placeholder:text-[#64748B]/60 uppercase tracking-widest transition-all shadow-sm"
                        />
                    </div>
                    <div className="flex items-center gap-6">
                        <button className="flex items-center gap-3 text-[#64748B] hover:text-[#26382E] font-bold text-[9px] uppercase tracking-[0.2em] transition-all group">
                            <Filter className="h-4 w-4 text-[#64748B] group-hover:text-[#26382E] transition-colors" />
                            <span>Neural Filters</span>
                        </button>
                    </div>
                </div>

                {/* Table with Horizontal Scrollbox */}
                <div className="overflow-x-auto w-full custom-scrollbar">
                    <table className="w-full text-left border-collapse min-w-[1000px] md:min-w-full">
                        <thead>
                            <tr className="bg-[#EDF8F0]/50">
                                {table.getHeaderGroups().map(headerGroup => (
                                    <React.Fragment key={headerGroup.id}>
                                        {headerGroup.headers.map(header => (
                                            <th
                                                key={header.id}
                                                className="px-2 md:px-8 py-4 md:py-6 font-bold text-[#64748B] text-[9px] md:text-[10px] uppercase tracking-[0.2em] border-b border-[#DDE8E0]"
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </th>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#DDE8E0]/40">
                            <AnimatePresence mode='popLayout'>
                                {table.getRowModel().rows.map((row, index) => (
                                    <motion.tr
                                        layout
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95, x: -20 }}
                                        transition={{ 
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 40,
                                            delay: index * 0.02 
                                        }}
                                        key={row.id}
                                        className="group hover:bg-[#F4FBF6]/80 transition-all"
                                    >
                                        {row.getVisibleCells().map(cell => (
                                            <td key={cell.id} className="px-2 md:px-8 py-4 md:py-8 transition-all">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                            {table.getRowModel().rows.length === 0 && (
                                <tr>
                                    <td colSpan={columns.length} className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center justify-center gap-4">
                                            <div className="h-16 w-16 bg-[#EDF8F0] rounded-full flex items-center justify-center text-[#64748B]">
                                                <Search size={32} />
                                            </div>
                                            <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-[0.3em]">No nodes found in current coordinate space</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 md:p-8 border-t border-[#DDE8E0] flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#F4FBF6]/60">
                    <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-[#86D9A9] animate-pulse" />
                        <span className="text-[9px] font-bold text-[#64748B] uppercase tracking-[0.25em]">
                            System Matrix: {table.getFilteredRowModel().rows.length} Nodes Processed
                        </span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <button
                            disabled={!table.getCanPreviousPage()}
                            onClick={() => table.previousPage()}
                            className="h-12 w-12 flex items-center justify-center border border-[#DDE8E0] rounded-2xl bg-white hover:bg-[#EDF8F0] disabled:opacity-30 transition-all text-[#64748B] hover:text-[#26382E] disabled:cursor-not-allowed active:scale-90"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        
                        <div className="flex items-center gap-2">
                            {[...Array(table.getPageCount())].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => table.setPageIndex(i)}
                                    className={cn(
                                        "w-10 h-10 rounded-xl text-[10px] font-bold transition-all border uppercase tracking-tighter",
                                        table.getState().pagination.pageIndex === i
                                            ? "bg-[#86D9A9] text-[#26382E] border-[#86D9A9] shadow-sm active:scale-90"
                                            : "bg-white text-[#64748B] border-[#DDE8E0] hover:border-[#86D9A9] hover:text-[#26382E]"
                                    )}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>

                        <button
                            disabled={!table.getCanNextPage()}
                            onClick={() => table.nextPage()}
                            className="h-12 w-12 flex items-center justify-center border border-[#DDE8E0] rounded-2xl bg-white hover:bg-[#EDF8F0] disabled:opacity-30 transition-all text-[#64748B] hover:text-[#26382E] disabled:cursor-not-allowed active:scale-90"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Add Lead Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white/95 backdrop-blur-2xl rounded-[2.5rem] w-full max-w-xl overflow-hidden shadow-glass border border-[#DDE8E0] mx-2 sm:mx-auto max-h-[85vh] overflow-y-auto no-scrollbar"
                        >
                            <div className="p-8 border-b border-[#DDE8E0] flex justify-between items-center bg-[#F4FBF6]">
                                <div>
                                    <h3 className="text-xl font-bold text-[#26382E] uppercase tracking-tight">Provision Manual Node</h3>
                                    <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mt-1">Direct lead injection into operations</p>
                                </div>
                                <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-white rounded-xl transition-all border border-transparent hover:border-[#DDE8E0]">
                                    <XCircle size={20} className="text-[#64748B]" />
                                </button>
                            </div>
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                const formData = Object.fromEntries(new FormData(e.target))
                                addLead.mutate(formData, {
                                    onSuccess: () => setIsAddModalOpen(false)
                                })
                            }} className="p-8 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-[#64748B] uppercase tracking-[0.2em] px-1">Lead Identity</label>
                                        <input name="name" required placeholder="Full Name" className="w-full bg-[#F4FBF6] border border-[#DDE8E0] rounded-2xl px-5 py-4 text-xs font-bold text-[#26382E] uppercase tracking-widest focus:ring-4 focus:ring-[#86D9A9]/20 focus:border-[#86D9A9] outline-none transition-all shadow-sm" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-[#64748B] uppercase tracking-[0.2em] px-1">Channel Address</label>
                                        <input name="email" type="email" required placeholder="email@address.com" className="w-full bg-[#F4FBF6] border border-[#DDE8E0] rounded-2xl px-5 py-4 text-xs font-bold text-[#26382E] uppercase tracking-widest focus:ring-4 focus:ring-[#86D9A9]/20 focus:border-[#86D9A9] outline-none transition-all shadow-sm" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-[#64748B] uppercase tracking-[0.2em] px-1">Territory</label>
                                        <input 
                                            name="country" 
                                            required 
                                            placeholder="Country" 
                                            defaultValue={country !== 'Global' ? country : ''}
                                            className="w-full bg-[#F4FBF6] border border-[#DDE8E0] rounded-2xl px-5 py-4 text-xs font-bold text-[#26382E] uppercase tracking-widest focus:ring-4 focus:ring-[#86D9A9]/20 focus:border-[#86D9A9] outline-none transition-all shadow-sm" 
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-[#64748B] uppercase tracking-[0.2em] px-1">Lead Stage</label>
                                        <select 
                                            name="stage" 
                                            defaultValue={statusFilter !== 'All Stages' ? statusFilter : 'New'}
                                            className="w-full bg-[#F4FBF6] border border-[#DDE8E0] rounded-2xl px-5 py-4 text-xs font-bold text-[#26382E] uppercase tracking-widest focus:ring-4 focus:ring-[#86D9A9]/20 focus:border-[#86D9A9] outline-none transition-all shadow-sm appearance-none"
                                        >
                                            {['New', 'Contacted', 'Qualified', 'Converted', 'Lost'].map(s => (
                                                <option key={s} value={s}>{s}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-[#64748B] uppercase tracking-[0.2em] px-1">Operational Team</label>
                                        <input name="team" defaultValue="General" className="w-full bg-[#F4FBF6] border border-[#DDE8E0] rounded-2xl px-5 py-4 text-xs font-bold text-[#26382E] uppercase tracking-widest focus:ring-4 focus:ring-[#86D9A9]/20 focus:border-[#86D9A9] outline-none transition-all shadow-sm" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-[#64748B] uppercase tracking-[0.2em] px-1">Priority</label>
                                        <select 
                                            name="priority" 
                                            defaultValue="Medium"
                                            className="w-full bg-[#F4FBF6] border border-[#DDE8E0] rounded-2xl px-5 py-4 text-xs font-bold text-[#26382E] uppercase tracking-widest focus:ring-4 focus:ring-[#86D9A9]/20 focus:border-[#86D9A9] outline-none transition-all shadow-sm appearance-none"
                                        >
                                            <option value="Low">Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="High">High</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                                    <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-6 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest text-[#64748B] hover:bg-[#F4FBF6] transition-all">Abort</button>
                                    <button 
                                        type="submit" 
                                        disabled={addLead.isPending}
                                        className="px-6 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest bg-[#86D9A9] text-[#26382E] hover:bg-[#A7E8C2] transition-all shadow-sm flex items-center justify-center gap-2"
                                    >
                                        {addLead.isPending && <RefreshCcw size={14} className="animate-spin" />}
                                        Establish Node
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}

                {/* Assign Lead Modal */}
                {isAssignModalOpen && selectedLead && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white/95 backdrop-blur-2xl rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-glass border border-[#DDE8E0] mx-2 sm:mx-auto max-h-[85vh] overflow-y-auto no-scrollbar"
                        >
                            <div className="p-8 border-b border-[#DDE8E0] bg-[#F4FBF6] flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-bold text-[#26382E] uppercase tracking-tight">Custodian Assignment</h3>
                                    <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mt-1">Manual node distribution</p>
                                </div>
                                <button onClick={() => setIsAssignModalOpen(false)} className="p-2 hover:bg-white rounded-xl transition-all">
                                    <XCircle size={20} className="text-[#64748B]" />
                                </button>
                            </div>
                            <div className="p-8 space-y-6">
                                <div className="p-4 bg-[#DDF7E8] border border-[#86D9A9]/40 rounded-2xl">
                                    <div className="text-[8px] font-bold text-emerald-800 uppercase tracking-widest mb-1">Target Node</div>
                                    <div className="text-sm font-bold text-[#26382E] uppercase tracking-tight">{selectedLead.name}</div>
                                </div>
                                
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-[#64748B] uppercase tracking-[0.2em] px-1">Select Custodian</label>
                                    <select 
                                        className="w-full bg-[#F4FBF6] border border-[#DDE8E0] rounded-2xl px-5 py-4 text-xs font-bold text-[#26382E] uppercase tracking-widest focus:ring-4 focus:ring-[#86D9A9]/20 focus:border-[#86D9A9] outline-none transition-all shadow-sm"
                                        onChange={(e) => {
                                            if (e.target.value) {
                                                assignLead.mutate({ leadId: selectedLead.id, userId: e.target.value }, {
                                                    onSuccess: () => setIsAssignModalOpen(false)
                                                })
                                            }
                                        }}
                                        defaultValue=""
                                    >
                                        <option value="" disabled>Select User...</option>
                                        {users.map(u => (
                                            <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex justify-center pt-4">
                                    <button onClick={() => setIsAssignModalOpen(false)} className="px-6 py-2 rounded-xl text-[10px] font-bold text-[#64748B] uppercase tracking-widest hover:text-[#26382E] transition-all">
                                        Abort Operations
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

export default Leads



