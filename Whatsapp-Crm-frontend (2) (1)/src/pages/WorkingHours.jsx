import React, { useState } from 'react'
import { Clock, Calendar, ShieldCheck, ToggleLeft, ToggleRight, Save, Sparkles, Coffee, Moon, Sun } from 'lucide-react'
import { cn } from '../lib/utils'
import { useShiftActions, useAdminActions } from '../hooks/useCrmMutations'
import { useQuery } from '@tanstack/react-query'
import api from '../services/api'
import { motion, AnimatePresence } from 'framer-motion'

const DayRow = React.forwardRef(({ day, active, start, end, onToggle, onStartChange, onEndChange }, ref) => (
    <motion.div
        ref={ref}
        layout
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 glass-card bg-white/80 border border-[#DDE8E0] rounded-[1.5rem] shadow-sm hover:shadow-md transition-all group gap-4 sm:gap-0"
    >
        <div className="flex items-center gap-4 w-48">
            <div className={cn(
                "h-3 w-3 rounded-full transition-all duration-500",
                active ? "bg-[#86D9A9] shadow-[0_0_12px_rgba(134,217,169,0.6)] scale-110" : "bg-gray-200"
            )}></div>
            <span className={cn("font-black uppercase tracking-widest text-xs transition-colors", active ? "text-[#26382E]" : "text-gray-400")}>{day}</span>
        </div>

        <div className="flex items-center gap-4 sm:gap-8 w-full sm:w-auto">
            <div className={cn(
                "flex items-center gap-3 border px-4 py-2.5 rounded-xl transition-all flex-1 sm:flex-none",
                active ? "bg-[#F4FBF6] border-[#DDE8E0] focus-within:ring-2 focus-within:ring-[#86D9A9]/30 focus-within:bg-white" : "bg-[#F4FBF6]/50 border-gray-100 opacity-40"
            )}>
                <Sun size={14} className={active ? "text-amber-500" : "text-gray-300"} />
                <input
                    type="time"
                    value={start}
                    onChange={(e) => onStartChange(e.target.value)}
                    disabled={!active}
                    className="bg-transparent text-xs font-black uppercase tracking-tighter focus:outline-none disabled:cursor-not-allowed w-full text-[#26382E]"
                />
            </div>
            <span className="text-[#64748B] font-bold hidden sm:block">—</span>
            <div className={cn(
                "flex items-center gap-3 border px-4 py-2.5 rounded-xl transition-all flex-1 sm:flex-none",
                active ? "bg-[#F4FBF6] border-[#DDE8E0] focus-within:ring-2 focus-within:ring-[#86D9A9]/30 focus-within:bg-white" : "bg-[#F4FBF6]/50 border-gray-100 opacity-40"
            )}>
                <Moon size={14} className={active ? "text-[#86D9A9]" : "text-gray-300"} />
                <input
                    type="time"
                    value={end}
                    onChange={(e) => onEndChange(e.target.value)}
                    disabled={!active}
                    className="bg-transparent text-xs font-black uppercase tracking-tighter focus:outline-none disabled:cursor-not-allowed w-full text-[#26382E]"
                />
            </div>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto justify-end border-t border-[#DDE8E0] sm:border-t-0 pt-4 sm:pt-0">
            <div className="flex items-center gap-4 px-4 py-2 bg-[#F4FBF6] border border-[#DDE8E0] rounded-2xl group-hover:border-[#86D9A9] transition-colors">
                <span className="text-[9px] font-black text-[#64748B] uppercase tracking-widest whitespace-nowrap">Service Active</span>
                <button
                    onClick={onToggle}
                    className={cn("transition-all active:scale-90", active ? "text-[#86D9A9]" : "text-gray-300")}
                >
                    {active ? <ToggleRight size={32} strokeWidth={1.5} /> : <ToggleLeft size={32} strokeWidth={1.5} />}
                </button>
            </div>
        </div>
    </motion.div>
))

const WorkingHours = () => {
    const [days, setDays] = useState([
        { id: 1, day: 'Monday', active: true, start: '09:00', end: '18:00' },
        { id: 2, day: 'Tuesday', active: true, start: '09:00', end: '18:00' },
        { id: 3, day: 'Wednesday', active: true, start: '09:00', end: '18:00' },
        { id: 4, day: 'Thursday', active: true, start: '09:00', end: '18:00' },
        { id: 5, day: 'Friday', active: true, start: '09:00', end: '18:00' },
        { id: 6, day: 'Saturday', active: false, start: '10:00', end: '14:00' },
        { id: 7, day: 'Sunday', active: false, start: '00:00', end: '00:00' },
    ])

    const { saveHours } = useShiftActions()
    const { executeAction } = useAdminActions()

    const { data: serverHours } = useQuery({
        queryKey: ['working-hours'],
        queryFn: () => api.get('/admin/working-hours')
    })

    React.useEffect(() => {
        const hoursArr = Array.isArray(serverHours?.data) ? serverHours.data : (Array.isArray(serverHours) ? serverHours : null)
        if (hoursArr && hoursArr.length > 0) {
            setDays(hoursArr)
        }
    }, [serverHours])

    const handleToggle = (id) => {
        setDays(days.map(d => d.id === id ? { ...d, active: !d.active } : d))
    }

    const handleTimeChange = (id, type, value) => {
        setDays(days.map(d => d.id === id ? { ...d, [type]: value } : d))
    }

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-[#26382E] uppercase tracking-tight flex items-center gap-3">
                        <Clock className="text-[#86D9A9]" size={28} />
                        Operational Windows
                    </h1>
                    <p className="text-sm font-medium text-[#64748B]">Establish global service availability and automated lead redistribution parameters.</p>
                </div>
                <button
                    onClick={() => saveHours.mutate(days)}
                    className="flex items-center gap-3 bg-[#86D9A9] text-[#26382E] px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#A7E8C2] transition-all shadow-sm active:scale-95"
                >
                    <Save size={18} strokeWidth={2.5} />
                    <span>Sync Configuration</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-4">
                    <div className="flex items-center gap-3 mb-2 px-2">
                        <Sparkles size={16} className="text-[#86D9A9]" />
                        <h3 className="text-xs font-black text-[#64748B] uppercase tracking-widest">Active Shift Architecture</h3>
                    </div>
                    <AnimatePresence mode='popLayout'>
                        {days.map((d) => (
                            <DayRow
                                key={d.id}
                                {...d}
                                onToggle={() => handleToggle(d.id)}
                                onStartChange={(val) => handleTimeChange(d.id, 'start', val)}
                                onEndChange={(val) => handleTimeChange(d.id, 'end', val)}
                            />
                        ))}
                    </AnimatePresence>
                </div>

                <div className="lg:col-span-4 space-y-8">
                    <div className="glass-card bg-gradient-to-br from-[#EDF8F0] to-[#DDF7E8] p-8 rounded-[2.5rem] text-[#26382E] shadow-sm relative overflow-hidden group border border-[#DDE8E0]">
                        <div className="relative z-10">
                            <ShieldCheck className="text-[#86D9A9] mb-6 group-hover:scale-110 transition-transform" size={40} />
                            <h3 className="font-black text-lg mb-3 uppercase tracking-tight text-[#26382E]">Overflow Intelligence</h3>
                            <p className="text-[10px] text-[#64748B] mb-8 leading-relaxed font-bold uppercase tracking-widest">Leads received outside active windows are automatically staged for the next operational cycle.</p>
                            <button 
                                onClick={() => executeAction.mutate('CONFIGURE_GLOBAL_QUEUE')}
                                className="w-full bg-white/80 hover:bg-white border border-[#DDE8E0] text-[#26382E] py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all shadow-sm"
                            >
                                Configure Global Queue
                            </button>
                        </div>
                        <div className="absolute -bottom-10 -right-10 opacity-10 text-[#86D9A9] group-hover:rotate-12 transition-transform duration-1000">
                            <Calendar size={180} />
                        </div>
                    </div>

                    <div className="glass-card bg-white/80 p-8 rounded-[2.5rem] border border-[#DDE8E0] shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-center gap-3 mb-6">
                            <Coffee className="text-amber-500" size={20} />
                            <h3 className="font-black text-[#26382E] text-xs uppercase tracking-widest">Holiday Mode</h3>
                        </div>
                        <p className="text-[10px] text-[#64748B] mb-6 font-bold uppercase tracking-widest opacity-70">Instantly suspend all autonomous assignments across global territories.</p>
                        <button 
                            onClick={() => executeAction.mutate('DEPLOY_HOLIDAY_PROTOCOL')}
                            className="w-full border border-[#DDE8E0] bg-[#F4FBF6] hover:bg-white py-4 rounded-2xl text-[9px] font-black text-[#26382E] uppercase tracking-widest transition-all shadow-sm"
                        >
                            Deploy Holiday Protocol
                        </button>
                    </div>

                    <div className="bg-[#EDF8F0] p-8 rounded-[2.5rem] border border-[#DDE8E0] flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black text-[#26382E] uppercase tracking-widest">System Timezone</span>
                            <span className="text-[10px] font-black text-[#26382E] uppercase tracking-widest">UTC +5:30</span>
                        </div>
                        <div className="h-px bg-[#DDE8E0] w-full" />
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black text-[#26382E] uppercase tracking-widest">Server Status</span>
                            <div className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-[#86D9A9] animate-pulse" />
                                <span className="text-[10px] font-black text-[#26382E] uppercase tracking-widest">Operational</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkingHours


