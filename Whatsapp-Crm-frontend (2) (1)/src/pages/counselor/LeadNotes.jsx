import React, { useState } from 'react'
import { FileEdit, Search, Filter, Calendar, Trash2, Edit2, Loader, RefreshCcw, UserCircle2, MessageSquare } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'
import { useQuery } from '@tanstack/react-query'
import { useCounselorActions } from '../../hooks/useCrmMutations'
import api from '../../services/api'
import useAppStore from '../../store/useStore'
import { useNavigate } from 'react-router-dom'

const LeadNotes = () => {
    const navigate = useNavigate()
    const { country, statusFilter } = useAppStore()
    const { updateNote, deleteNote, addNote } = useCounselorActions()
    const [searchTerm, setSearchTerm] = useState('')
    const [editingNote, setEditingNote] = useState(null)
    const [isAddingNote, setIsAddingNote] = useState(false)
    const [noteText, setNoteText] = useState('')
    const [newNoteLead, setNewNoteLead] = useState('')

    const { data: notesResp, isLoading, refetch } = useQuery({
        queryKey: ['counselor-notes', country, statusFilter],
        queryFn: async () => {
            const res = await api.get('/counselor/notes', {
                params: { country, status: statusFilter }
            });
            return res.data || res;
        }
    })

    const notesData = Array.isArray(notesResp?.data) ? notesResp.data.map(n => ({
        id: n.id,
        leadName: n.leadName,
        text: n.text,
        date: new Date(n.createdAt).toLocaleDateString(),
        createdBy: n.authorName
    })) : []

    const filteredNotes = notesData.filter(n =>
        n.leadName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.text.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleEditNote = (note) => {
        setEditingNote(note.id)
        setNoteText(note.text)
    }

    const handleSaveNote = () => {
        if (!noteText.trim()) return;
        updateNote.mutate({ id: editingNote, text: noteText }, {
            onSuccess: () => {
                setEditingNote(null);
                setNoteText('');
            }
        });
    }

    const handleAddNote = () => {
        if (!noteText.trim() || !newNoteLead.trim()) return;
        addNote.mutate({ 
            leadId: newNoteLead, 
            text: noteText,
            country: country !== 'Global' ? country : undefined,
            stage: statusFilter !== 'All Stages' ? statusFilter : undefined
        }, {
            onSuccess: () => {
                setIsAddingNote(false);
                setNoteText('');
                setNewNoteLead('');
            }
        });
    }

    return (
        <div className="space-y-8 pb-16">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-[#26382E] tracking-tight">Lead Notes</h1>
                    <p className="text-xs sm:text-sm font-medium text-[#64748B] mt-1">Review operational and qualitative notes collected during counselor engagements.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => setIsAddingNote(true)}
                        className="bg-[#86D9A9] text-[#26382E] px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-[#A7E8C2] transition-all shadow-xs flex items-center gap-2"
                    >
                        <FileEdit size={14} /> Add Note
                    </button>
                </div>
            </div>

            {/* Main Glass Directory Card */}
            <div className="glass-card bg-white/85 backdrop-blur-xl rounded-3xl border border-[#DDE8E0] shadow-glass overflow-hidden flex flex-col">
                <div className="p-4 sm:p-6 border-b border-[#DDE8E0] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#EDF8F0]/40">
                    <div className="flex items-center gap-3">
                        <h3 className="font-black text-[#26382E] uppercase tracking-wider text-xs">Note Directory</h3>
                        <div className="h-4 w-px bg-[#DDE8E0] hidden sm:block" />
                        <span className="text-[10px] font-bold text-[#26382E] bg-[#DDF7E8] border border-[#A7E8C2]/60 px-2.5 py-0.5 rounded-full">
                            {notesData.length} Total Notes
                        </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <div className="relative flex-1 sm:w-72">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
                            <input
                                id="search-notes-input"
                                type="text"
                                placeholder="Search by lead or keywords..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 border border-[#DDE8E0] rounded-xl text-xs font-semibold text-[#26382E] focus:outline-none focus:ring-2 focus:ring-[#86D9A9] transition-all bg-white shadow-2xs"
                            />
                        </div>
                        <button onClick={() => refetch()} className="p-2 border border-[#DDE8E0] rounded-xl hover:bg-[#DDF7E8] transition-all text-[#64748B] hover:text-[#26382E] shadow-2xs bg-white">
                            <RefreshCcw size={15} className={isLoading ? "animate-spin" : ""} />
                        </button>
                    </div>
                </div>

                <div className="min-h-[400px] p-6">
                    {isLoading ? (
                        <div className="h-64 flex flex-col items-center justify-center text-[#86D9A9]">
                            <Loader className="animate-spin mb-3" size={28} />
                            <p className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Loading notes database...</p>
                        </div>
                    ) : filteredNotes.length === 0 ? (
                        <div className="h-64 flex flex-col items-center justify-center text-[#94A3B8]">
                            <FileEdit size={40} className="mb-3 opacity-60" />
                            <p className="text-xs font-semibold text-[#64748B]">No notes matching criteria.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            <AnimatePresence>
                                {filteredNotes.map((note) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        key={note.id}
                                        className="glass-card bg-white/90 border border-[#DDE8E0] rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-sm transition-all group relative flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="h-8 w-8 rounded-xl bg-[#DDF7E8] text-[#26382E] border border-[#A7E8C2]/60 flex items-center justify-center font-bold text-xs shrink-0">
                                                        {note.leadName.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xs font-bold text-[#26382E]">{note.leadName}</h4>
                                                        <span className="text-[10px] text-[#64748B] flex items-center gap-1 mt-0.5">
                                                            <Calendar size={10} className="text-[#86D9A9]" /> {note.date || 'Today'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex gap-1">
                                                    <button onClick={() => handleEditNote(note)} className="p-1.5 text-[#64748B] hover:text-[#26382E] hover:bg-[#DDF7E8] rounded-lg transition-colors">
                                                        <Edit2 size={13} />
                                                    </button>
                                                    <button 
                                                        onClick={() => navigate('/inbox')}
                                                        className="p-1.5 text-[#64748B] hover:text-[#2E8456] hover:bg-[#DDF7E8] rounded-lg transition-colors"
                                                        title="View Chat"
                                                    >
                                                        <MessageSquare size={13} />
                                                    </button>
                                                    <button onClick={() => deleteNote.mutate(note.id)} className="p-1.5 text-[#64748B] hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                                                        <Trash2 size={13} />
                                                    </button>
                                                </div>
                                            </div>
                                            <p className="text-xs font-medium text-[#26382E] leading-relaxed line-clamp-4">
                                                {note.text}
                                            </p>
                                        </div>
                                        <div className="mt-4 pt-3 border-t border-[#DDE8E0]/60 flex items-center gap-1.5">
                                            <UserCircle2 size={13} className="text-[#86D9A9]" />
                                            <span className="text-[10px] font-semibold text-[#64748B]">
                                                By {note.createdBy || 'Counselor'}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>

            {/* Edit Note Modal */}
            <AnimatePresence>
                {editingNote && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#26382E]/40 backdrop-blur-md"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) setEditingNote(null);
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="w-full max-w-md glass-card bg-white/95 backdrop-blur-2xl rounded-3xl shadow-glass-lg overflow-hidden border border-[#DDE8E0] flex flex-col max-h-[90vh]"
                        >
                            <div className="p-6 border-b border-[#DDE8E0] bg-[#EDF8F0]/60 shrink-0">
                                <h2 className="text-base font-black text-[#26382E] tracking-tight">Modify Note Entry</h2>
                            </div>
                            <div className="p-6 overflow-y-auto space-y-4">
                                <textarea
                                    className="w-full h-32 p-3.5 border border-[#DDE8E0] rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#86D9A9] text-xs font-medium text-[#26382E]"
                                    value={noteText}
                                    onChange={(e) => setNoteText(e.target.value)}
                                />
                                <div className="flex gap-2.5 justify-end">
                                    <button
                                        onClick={() => setEditingNote(null)}
                                        className="px-4 py-2 text-xs font-bold text-[#64748B] hover:text-[#26382E] border border-[#DDE8E0] rounded-xl transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSaveNote}
                                        disabled={updateNote.isPending || !noteText.trim()}
                                        className="px-5 py-2 bg-[#86D9A9] text-[#26382E] text-xs font-bold rounded-xl hover:bg-[#A7E8C2] transition-all shadow-xs disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {updateNote.isPending ? <RefreshCcw size={14} className="animate-spin" /> : 'Save Note'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* Add Note Modal */}
                {isAddingNote && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#26382E]/40 backdrop-blur-md"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) setIsAddingNote(false);
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="w-full max-w-md glass-card bg-white/95 backdrop-blur-2xl rounded-3xl shadow-glass-lg overflow-hidden border border-[#DDE8E0] flex flex-col max-h-[90vh]"
                        >
                            <div className="p-6 border-b border-[#DDE8E0] bg-[#EDF8F0]/60 shrink-0">
                                <h2 className="text-base font-black text-[#26382E] tracking-tight">Create Lead Note</h2>
                            </div>
                            <div className="p-6 overflow-y-auto space-y-3.5">
                                <div className="space-y-1">
                                    <label className="block text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Target Lead</label>
                                    <input
                                        type="text"
                                        placeholder="Enter lead name (e.g. Alice Smith)"
                                        value={newNoteLead}
                                        onChange={(e) => setNewNoteLead(e.target.value)}
                                        className="w-full p-2.5 border border-[#DDE8E0] rounded-xl text-xs font-medium text-[#26382E] focus:outline-none focus:ring-2 focus:ring-[#86D9A9]"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Note Content</label>
                                    <textarea
                                        className="w-full h-32 p-3.5 border border-[#DDE8E0] rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#86D9A9] text-xs font-medium text-[#26382E]"
                                        placeholder="Record lead insights, conversation highlights, or follow-up notes..."
                                        value={noteText}
                                        onChange={(e) => setNoteText(e.target.value)}
                                    />
                                </div>
                                <div className="flex gap-2.5 justify-end pt-2">
                                    <button
                                        onClick={() => setIsAddingNote(false)}
                                        className="px-4 py-2 text-xs font-bold text-[#64748B] hover:text-[#26382E] border border-[#DDE8E0] rounded-xl transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleAddNote}
                                        disabled={addNote.isPending || !noteText.trim() || !newNoteLead.trim()}
                                        className="px-5 py-2 bg-[#86D9A9] text-[#26382E] text-xs font-bold rounded-xl hover:bg-[#A7E8C2] transition-all shadow-xs disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {addNote.isPending ? <RefreshCcw size={14} className="animate-spin" /> : 'Commit Entry'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default LeadNotes
