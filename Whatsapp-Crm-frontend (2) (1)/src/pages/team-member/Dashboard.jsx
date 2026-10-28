// Team Member Dashboard
import React from 'react'
import { FaCalendarDay, FaTasks, FaUmbrellaBeach, FaComments, FaClock, FaCheckCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { cn } from '../../lib/utils'

const TeamMemberDashboard = () => {
    const navigate = useNavigate()

    const stats = [
        { label: 'Today\'s Visits', value: '5', icon: FaCalendarDay, color: 'bg-[#DDF7E8] text-[#26382E] border-[#A7E8C2]/60' },
        { label: 'Pending Tasks', value: '8', icon: FaTasks, color: 'bg-amber-50 text-amber-700 border-amber-200' },
        { label: 'Completed Today', value: '3', icon: FaCheckCircle, color: 'bg-[#DDF7E8] text-[#2E8456] border-[#A7E8C2]/60' },
        { label: 'Leave Balance', value: '12 days', icon: FaUmbrellaBeach, color: 'bg-[#EDF8F0] text-[#26382E] border-[#DDE8E0]' },
    ]

    const todayVisits = [
        { time: '09:00 - 11:00', client: 'Client A', address: '123 Main St', status: 'In Progress' },
        { time: '12:00 - 14:00', client: 'Client B', address: '456 Oak Ave', status: 'Pending' },
        { time: '15:00 - 17:00', client: 'Client C', address: '789 Pine Rd', status: 'Pending' },
    ]

    const recentActivities = [
        { action: 'Completed visit', client: 'Client D', time: '2 hours ago', type: 'success' },
        { action: 'Added notes', client: 'Client A', time: '3 hours ago', type: 'info' },
        { action: 'Reported incident', client: 'Client B', time: '1 day ago', type: 'warning' },
    ]

    const getActivityColor = (type) => {
        switch (type) {
            case 'success': return 'text-[#2E8456] bg-[#DDF7E8] border border-[#A7E8C2]/60'
            case 'info': return 'text-[#26382E] bg-[#EDF8F0] border border-[#DDE8E0]'
            case 'warning': return 'text-amber-700 bg-amber-50 border border-amber-200'
            default: return 'text-[#64748B] bg-gray-50 border border-gray-200'
        }
    }

    return (
        <div className="space-y-8 pb-16">
            <div>
                <h1 className="text-2xl sm:text-3xl font-black text-[#26382E] tracking-tight">Team Member Dashboard</h1>
                <p className="text-xs sm:text-sm font-medium text-[#64748B] mt-1">Here is your schedule and daily rota operations overview.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="glass-card bg-white/85 backdrop-blur-xl rounded-3xl border border-[#DDE8E0] p-5 shadow-sm space-y-3">
                        <div className="flex items-center justify-between">
                            <div className={cn("p-2.5 rounded-xl border", stat.color)}>
                                <stat.icon className="text-lg" />
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">{stat.label}</p>
                            <p className="text-2xl sm:text-3xl font-black text-[#26382E] tracking-tight mt-0.5">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Today's Visits */}
                <div className="glass-card bg-white/85 backdrop-blur-xl rounded-3xl border border-[#DDE8E0] p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-base font-black text-[#26382E] tracking-tight">Today's Visits</h2>
                        <button
                            onClick={() => navigate('/team-member/daily-rota')}
                            className="text-xs text-[#2E8456] hover:underline font-bold"
                        >
                            View All →
                        </button>
                    </div>
                    <div className="space-y-2.5">
                        {todayVisits.map((visit, index) => (
                            <div key={index} className="flex items-center justify-between p-3.5 bg-white/80 border border-[#DDE8E0] rounded-2xl hover:bg-[#F4FBF6] transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-[#DDF7E8] text-[#26382E] rounded-xl border border-[#A7E8C2]/60">
                                        <FaClock className="text-xs" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-xs text-[#26382E]">{visit.client}</p>
                                        <p className="text-[11px] font-medium text-[#64748B]">{visit.time}</p>
                                        <p className="text-[10px] text-[#94A3B8]">{visit.address}</p>
                                    </div>
                                </div>
                                <span className={cn(
                                    "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                                    visit.status === 'In Progress' 
                                        ? 'bg-[#DDF7E8] text-[#26382E] border-[#A7E8C2]' 
                                        : 'bg-amber-50 text-amber-700 border-amber-200'
                                )}>
                                    {visit.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activities */}
                <div className="glass-card bg-white/85 backdrop-blur-xl rounded-3xl border border-[#DDE8E0] p-6 shadow-sm">
                    <h2 className="text-base font-black text-[#26382E] tracking-tight mb-4">Recent Activities</h2>
                    <div className="space-y-2.5">
                        {recentActivities.map((activity, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 bg-white/80 border border-[#DDE8E0] rounded-2xl hover:bg-[#F4FBF6] transition-colors">
                                <div className={cn("p-2 rounded-xl text-xs", getActivityColor(activity.type))}>
                                    <FaComments />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-bold text-[#26382E]">{activity.action}</p>
                                    <p className="text-[11px] font-medium text-[#64748B]">{activity.client}</p>
                                    <p className="text-[10px] text-[#94A3B8] mt-0.5">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-card bg-white/85 backdrop-blur-xl rounded-3xl border border-[#DDE8E0] p-6 shadow-sm">
                <h2 className="text-base font-black text-[#26382E] tracking-tight mb-4">Quick Navigation</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                    <button
                        onClick={() => navigate('/team-member/daily-rota')}
                        className="p-4 bg-[#DDF7E8] text-[#26382E] border border-[#A7E8C2]/60 rounded-2xl hover:bg-[#86D9A9] transition-all text-left shadow-2xs"
                    >
                        <FaCalendarDay className="text-lg mb-2 text-[#2E8456]" />
                        <p className="font-bold text-xs">Daily Rota</p>
                    </button>
                    <button
                        onClick={() => navigate('/team-member/task-list')}
                        className="p-4 bg-[#EDF8F0] text-[#26382E] border border-[#DDE8E0] rounded-2xl hover:bg-[#DDF7E8] transition-all text-left shadow-2xs"
                    >
                        <FaTasks className="text-lg mb-2 text-[#26382E]" />
                        <p className="font-bold text-xs">My Tasks</p>
                    </button>
                    <button
                        onClick={() => navigate('/team-member/absences-holiday')}
                        className="p-4 bg-[#DDF7E8] text-[#26382E] border border-[#A7E8C2]/60 rounded-2xl hover:bg-[#86D9A9] transition-all text-left shadow-2xs"
                    >
                        <FaUmbrellaBeach className="text-lg mb-2 text-[#2E8456]" />
                        <p className="font-bold text-xs">Request Leave</p>
                    </button>
                    <button
                        onClick={() => navigate('/team-member/communication')}
                        className="p-4 bg-[#EDF8F0] text-[#26382E] border border-[#DDE8E0] rounded-2xl hover:bg-[#DDF7E8] transition-all text-left shadow-2xs"
                    >
                        <FaComments className="text-lg mb-2 text-[#26382E]" />
                        <p className="font-bold text-xs">Messages</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TeamMemberDashboard
