import React from 'react'
import { motion } from 'framer-motion'
import {
    Users,
    MessageSquare,
    AlertTriangle,
    RefreshCcw,
    TrendingUp,
    Clock,
    ChevronRight,
    UserCheck,
    FileText
} from 'lucide-react'
import { cn } from '../lib/utils'
import { useTeamLeaderActions } from '../hooks/useTeamLeaderActions'
import { useNavigate } from 'react-router-dom'

const KpiCard = ({ title, value, subText, icon: Icon, color, onRefresh }) => (
    <motion.div
        whileHover={{ y: -4 }}
        className="glass-card bg-white/85 backdrop-blur-xl p-5 rounded-3xl border border-[#DDE8E0] shadow-sm space-y-3 group relative overflow-hidden"
    >
        <div className="flex items-center justify-between relative z-10">
            <div className={cn("p-2.5 rounded-xl border", color)}>
                <Icon size={18} className="text-current" />
            </div>
            {onRefresh && (
                <button
                    onClick={onRefresh}
                    className="p-1.5 text-[#64748B] hover:text-[#26382E] hover:bg-[#DDF7E8] bg-[#EDF8F0] border border-[#DDE8E0] rounded-lg transition-all"
                    title="Refresh metric"
                >
                    <RefreshCcw size={13} />
                </button>
            )}
        </div>
        <div className="space-y-0.5 relative z-10">
            <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">{title}</p>
            <div className="flex items-end gap-2.5">
                <h3 className="text-2xl sm:text-3xl font-black text-[#26382E] tracking-tight">{value}</h3>
                {subText && (
                    <span className="text-xs font-bold text-[#2E8456] mb-1 flex items-center gap-0.5">
                        <TrendingUp size={11} /> {subText}
                    </span>
                )}
            </div>
        </div>
    </motion.div>
)

const QuickActionCard = ({ title, description, icon: Icon, onClick, color }) => (
    <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="glass-card bg-white/85 backdrop-blur-xl p-4 sm:p-5 rounded-2xl border border-[#DDE8E0] shadow-xs text-left flex items-start gap-3.5 hover:border-[#86D9A9] transition-all group"
    >
        <div className={cn("p-2.5 rounded-xl shrink-0 border mt-0.5", color)}>
            <Icon size={18} className="text-current" />
        </div>
        <div className="min-w-0 pr-2">
            <h4 className="text-xs sm:text-sm font-black text-[#26382E] tracking-tight">{title}</h4>
            <p className="text-[11px] font-medium text-[#64748B] mt-0.5 leading-relaxed">{description}</p>
        </div>
        <div className="ml-auto mt-1 text-[#94A3B8] group-hover:text-[#26382E] transition-colors shrink-0">
            <ChevronRight size={14} />
        </div>
    </motion.button>
)

const TeamLeaderDashboard = () => {
    const { useDashboard, refreshData } = useTeamLeaderActions()
    const { data: dashboard, isLoading } = useDashboard()
    const navigate = useNavigate()

    if (isLoading) return (
        <div className="h-96 flex items-center justify-center">
            <RefreshCcw className="animate-spin text-[#86D9A9]" size={32} />
        </div>
    )

    const stats = dashboard?.data || { teamLeads: '0', pendingReplies: '0', slaBreaches: '0' }

    return (
        <div className="space-y-8 pb-16">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-[#26382E] tracking-tight">Team Control Center</h1>
                    <p className="text-xs sm:text-sm font-medium text-[#64748B] mt-1">Live counselor queue telemetry and allocation controls.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => refreshData.mutate('dashboard')}
                        className="bg-[#86D9A9] text-[#26382E] px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-[#A7E8C2] transition-all flex items-center gap-2 shadow-xs active:scale-95"
                    >
                        <RefreshCcw size={14} className={refreshData.isPending ? "animate-spin shrink-0" : "shrink-0"} />
                        Sync Data
                    </button>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <KpiCard
                    title="My Team Leads"
                    value={stats.teamLeads}
                    icon={Users}
                    color="bg-[#DDF7E8] text-[#26382E] border-[#A7E8C2]/60"
                    onRefresh={() => refreshData.mutate('dashboard')}
                />
                <KpiCard
                    title="Pending Replies"
                    value={stats.pendingReplies}
                    icon={MessageSquare}
                    color="bg-amber-50 text-amber-700 border-amber-200"
                    onRefresh={() => refreshData.mutate('dashboard')}
                />
                <KpiCard
                    title="SLA Breaches"
                    value={stats.slaBreaches}
                    icon={AlertTriangle}
                    color="bg-rose-50 text-rose-600 border-rose-200"
                    onRefresh={() => refreshData.mutate('dashboard')}
                />
            </div>

            {/* Quick Actions Grid */}
            <div className="space-y-3.5">
                <h3 className="text-xs font-black text-[#26382E] uppercase tracking-wider pl-1">Command Modules</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <QuickActionCard
                        title="Inbox Monitor"
                        description="View all active counselor conversations and send reminder pings."
                        icon={MessageSquare}
                        color="bg-[#DDF7E8] text-[#26382E] border-[#A7E8C2]/60"
                        onClick={() => navigate('/team-leader/inbox')}
                    />
                    <QuickActionCard
                        title="Assigned Leads"
                        description="Manage team portfolio, update stages, and add internal notes."
                        icon={Users}
                        color="bg-[#EDF8F0] text-[#2E8456] border-[#DDE8E0]"
                        onClick={() => navigate('/team-leader/leads')}
                    />
                    <QuickActionCard
                        title="Counselor Performance"
                        description="Track individual counselor metrics, conversions, and SLA averages."
                        icon={TrendingUp}
                        color="bg-[#DDF7E8] text-[#26382E] border-[#A7E8C2]/60"
                        onClick={() => navigate('/team-leader/performance')}
                    />
                    <QuickActionCard
                        title="Reassign Leads"
                        description="Perform single or bulk lead transfers between counselors."
                        icon={UserCheck}
                        color="bg-[#EDF8F0] text-[#26382E] border-[#DDE8E0]"
                        onClick={() => navigate('/team-leader/reassign')}
                    />
                    <QuickActionCard
                        title="SLA Alerts"
                        description="Respond to delayed responses and force emergency transfers."
                        icon={AlertTriangle}
                        color="bg-rose-50 text-rose-600 border-rose-200"
                        onClick={() => navigate('/team-leader/sla')}
                    />
                    <QuickActionCard
                        title="Activity Logs"
                        description="Audit team actions and add global protocol records."
                        icon={FileText}
                        color="bg-slate-50 text-slate-700 border-slate-200"
                        onClick={() => navigate('/team-leader/logs')}
                    />
                </div>
            </div>

            {/* Team Activity Feed (Compact) */}
            <div className="glass-card bg-white/85 backdrop-blur-xl rounded-3xl border border-[#DDE8E0] shadow-sm p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                    <div>
                        <h3 className="text-base font-black text-[#26382E] tracking-tight">Live Operations Feed</h3>
                        <p className="text-xs font-medium text-[#64748B] mt-0.5">Real-time team activity telemetry</p>
                    </div>
                    <button
                        onClick={() => navigate('/team-leader/logs')}
                        className="text-xs font-bold text-[#2E8456] hover:underline flex items-center gap-1 w-fit"
                    >
                        View Full Ledger <ChevronRight size={13} className="shrink-0" />
                    </button>
                </div>

                <div className="space-y-4">
                    {[
                        { time: '10 Mins Ago', event: 'Lead Reassigned', detail: 'Maria G. transferred from Mike to Jane.' },
                        { time: '1 Hr Ago', event: 'SLA Warning Triggered', detail: 'Ahmed A. waiting for response (45m).' },
                        { time: '2 Hrs Ago', event: 'Status Updated', detail: 'Rahul marked John D. as Qualified.' }
                    ].map((act, i) => (
                        <div key={i} className="flex gap-3 items-start relative before:absolute before:inset-y-[18px] before:left-[10px] before:w-px before:bg-[#DDE8E0] last:before:hidden">
                            <div className="w-5 h-5 rounded-full bg-[#DDF7E8] border border-[#A7E8C2] shadow-2xs flex items-center justify-center shrink-0 z-10 text-[#2E8456] mt-0.5">
                                <Clock size={10} />
                            </div>
                            <div className="space-y-0.5 pb-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h4 className="text-xs font-bold text-[#26382E]">{act.event}</h4>
                                    <span className="text-[10px] font-semibold text-[#64748B] bg-[#EDF8F0] px-2 py-0.5 rounded-full">{act.time}</span>
                                </div>
                                <p className="text-xs text-[#64748B]">{act.detail}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TeamLeaderDashboard
