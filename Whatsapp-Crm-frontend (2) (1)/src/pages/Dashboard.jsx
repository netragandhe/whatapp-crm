import React from 'react'
import { Users, MessageSquare, CheckCircle, Clock, Plus } from 'lucide-react'
import { motion } from 'framer-motion'

const KPICard = ({ title, value, icon: Icon, color, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className="glass-card p-6 rounded-3xl border border-[#DDE8E0] relative overflow-hidden group h-full shadow-glass"
    >
        <div className="relative z-10 flex flex-col h-full">
            <div className={`p-3 rounded-2xl ${color} w-fit mb-4 shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                <Icon className="h-5 w-5" />
            </div>
            <div className="mt-auto">
                <p className="text-[10px] md:text-xs font-bold text-[#64748B] uppercase tracking-wider">{title}</p>
                <h3 className="text-xl md:text-2xl font-black text-[#26382E] mt-1 tracking-tight">{value}</h3>
            </div>
        </div>
        <div className="absolute top-0 right-0 p-4 text-[#86D9A9] opacity-15 group-hover:opacity-25 transition-opacity duration-300 pointer-events-none">
            <Icon size={72} />
        </div>
    </motion.div>
)

const Dashboard = () => {
    const kpis = [
        { title: 'Total Leads', value: '1,284', icon: Users, color: 'bg-[#DDF7E8] text-[#26382E] border border-[#86D9A9]/40' },
        { title: 'Active Chats', value: '56', icon: MessageSquare, color: 'bg-[#EDF8F0] text-emerald-800 border border-[#86D9A9]/30' },
        { title: 'Converted Leads', value: '412', icon: CheckCircle, color: 'bg-[#86D9A9]/30 text-[#26382E] border border-[#86D9A9]' },
        { title: 'Pending Follow-ups', value: '89', icon: Clock, color: 'bg-amber-50 text-amber-700 border border-amber-200' },
        { title: 'New Messages', value: '12', icon: MessageSquare, color: 'bg-[#DDF7E8] text-emerald-700 border border-[#86D9A9]/40' },
    ]

    return (
        <div className="crm-section space-y-8">
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-[#26382E] tracking-tight">Dashboard Overview</h1>
                    <p className="text-[#64748B] text-sm mt-1">Welcome back! Here's what's happening with your leads today.</p>
                </div>
                <button className="h-12 px-6 rounded-2xl bg-[#86D9A9] text-[#26382E] font-bold text-xs uppercase tracking-widest hover:bg-[#A7E8C2] transition-all flex items-center justify-center gap-2 shadow-sm w-full md:w-auto">
                    <Plus className="h-4 w-4" />
                    <span>Add New Lead</span>
                </button>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
                {kpis.map((kpi, index) => (
                    <KPICard key={index} {...kpi} index={index} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="lg:col-span-2 glass-card h-[400px] flex flex-col items-center justify-center text-[#64748B] border border-dashed border-[#DDE8E0] rounded-3xl p-6"
                >
                    <div className="bg-[#EDF8F0] p-4 rounded-2xl mb-4 border border-[#DDE8E0] text-emerald-700">
                        <Users className="h-8 w-8" />
                    </div>
                    <span className="font-bold text-lg text-[#26382E]">Activity Feed</span>
                    <p className="text-sm text-[#64748B] mt-1">Comprehensive lead activity visualization coming soon.</p>
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="glass-card h-[400px] flex flex-col items-center justify-center text-[#64748B] border border-dashed border-[#DDE8E0] rounded-3xl p-6"
                >
                    <div className="bg-[#EDF8F0] p-4 rounded-2xl mb-4 border border-[#DDE8E0] text-emerald-700">
                        <Clock className="h-8 w-8" />
                    </div>
                    <span className="font-bold text-lg text-[#26382E]">Recent Tasks</span>
                    <p className="text-sm text-center px-4 text-[#64748B] mt-1">Your daily task management panel will appear here.</p>
                </motion.div>
            </div>
        </div>
    )
}

export default Dashboard
