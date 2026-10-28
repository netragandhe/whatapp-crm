// Service User - Dashboard Page
import React from 'react'
import { FaFileAlt, FaPills, FaStickyNote, FaHeartbeat, FaCalendarCheck, FaBell } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

const Dashboard = () => {
    const stats = [
        { icon: FaFileAlt, label: 'Pending Forms', value: '1', color: 'bg-amber-50 text-amber-700 border-amber-200', link: '/service-user/forms' },
        { icon: FaPills, label: 'Active Medications', value: '2', color: 'bg-[#DDF7E8] text-[#2E8456] border-[#A7E8C2]/60', link: '/service-user/medication' },
        { icon: FaCalendarCheck, label: 'Upcoming Visits', value: '3', color: 'bg-[#DDF7E8] text-[#26382E] border-[#A7E8C2]/60', link: '/service-user/dashboard' },
        { icon: FaBell, label: 'New Messages', value: '2', color: 'bg-[#EDF8F0] text-[#26382E] border-[#DDE8E0]', link: '/service-user/communication' },
    ]

    const upcomingVisits = [
        { date: '2024-02-13', time: '09:00', staff: 'Nurse John', service: 'Morning Care' },
        { date: '2024-02-13', time: '21:00', staff: 'Carer Sarah', service: 'Evening Medication' },
        { date: '2024-02-14', time: '10:00', staff: 'Nurse John', service: 'Personal Care' },
    ]

    const recentNotes = [
        { date: '2024-02-12', staff: 'Nurse John', note: 'Morning visit completed successfully' },
        { date: '2024-02-11', staff: 'Carer Sarah', note: 'Evening medication administered' },
        { date: '2024-02-10', staff: 'Care Coordinator', note: 'Care plan reviewed and updated' },
    ]

    return (
        <div className="space-y-8 pb-16">
            {/* Welcome Section */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-black text-[#26382E] tracking-tight">Service User Portal</h1>
                <p className="text-xs sm:text-sm font-medium text-[#64748B] mt-1">Here is an overview of your active care schedule and communications.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {stats.map((stat, index) => (
                    <Link
                        key={index}
                        to={stat.link}
                        className="glass-card bg-white/85 backdrop-blur-xl rounded-3xl border border-[#DDE8E0] p-5 shadow-sm block hover:shadow-md transition-all group"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-0.5">{stat.label}</p>
                                <p className="text-2xl sm:text-3xl font-black text-[#26382E] tracking-tight">{stat.value}</p>
                            </div>
                            <div className={cn("p-3 rounded-2xl border", stat.color)}>
                                <stat.icon className="text-xl" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upcoming Visits */}
                <div className="glass-card bg-white/85 backdrop-blur-xl rounded-3xl border border-[#DDE8E0] p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-base font-black text-[#26382E] tracking-tight">Upcoming Visits</h2>
                        <FaCalendarCheck className="text-[#2E8456] text-lg" />
                    </div>
                    <div className="space-y-2.5">
                        {upcomingVisits.map((visit, index) => (
                            <div key={index} className="bg-white/80 border border-[#DDE8E0] p-3.5 rounded-2xl hover:bg-[#F4FBF6] transition-colors">
                                <div className="flex justify-between items-start mb-1">
                                    <div>
                                        <p className="font-bold text-xs text-[#26382E]">{visit.service}</p>
                                        <p className="text-[11px] text-[#64748B]">by {visit.staff}</p>
                                    </div>
                                    <span className="px-2.5 py-0.5 bg-[#DDF7E8] text-[#26382E] border border-[#A7E8C2] rounded-full text-[10px] font-bold">
                                        {visit.time}
                                    </span>
                                </div>
                                <p className="text-[10px] text-[#94A3B8]">{visit.date}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Care Notes */}
                <div className="glass-card bg-white/85 backdrop-blur-xl rounded-3xl border border-[#DDE8E0] p-6 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-base font-black text-[#26382E] tracking-tight">Recent Care Notes</h2>
                            <FaStickyNote className="text-[#2E8456] text-lg" />
                        </div>
                        <div className="space-y-2.5">
                            {recentNotes.map((note, index) => (
                                <div key={index} className="bg-white/80 border border-[#DDE8E0] p-3.5 rounded-2xl hover:bg-[#F4FBF6] transition-colors">
                                    <div className="flex justify-between items-start mb-1">
                                        <p className="text-xs font-bold text-[#26382E]">{note.staff}</p>
                                        <p className="text-[10px] text-[#94A3B8]">{note.date}</p>
                                    </div>
                                    <p className="text-xs text-[#64748B]">{note.note}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Link
                        to="/service-user/notes"
                        className="mt-4 block text-center px-4 py-2.5 bg-[#86D9A9] text-[#26382E] rounded-xl hover:bg-[#A7E8C2] font-bold text-xs transition-colors shadow-2xs"
                    >
                        View All Notes
                    </Link>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-card bg-white/85 backdrop-blur-xl rounded-3xl border border-[#DDE8E0] p-6 shadow-sm">
                <h2 className="text-base font-black text-[#26382E] tracking-tight mb-4">Quick Navigation</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    <Link
                        to="/service-user/medication"
                        className="flex items-center gap-3 p-4 bg-[#DDF7E8] text-[#26382E] border border-[#A7E8C2]/60 rounded-2xl hover:bg-[#86D9A9] transition-all shadow-2xs"
                    >
                        <FaPills className="text-xl text-[#2E8456]" />
                        <div>
                            <p className="font-bold text-xs">View Medications</p>
                            <p className="text-[10px] text-[#64748B]">Check medication schedule</p>
                        </div>
                    </Link>
                    <Link
                        to="/service-user/care-program"
                        className="flex items-center gap-3 p-4 bg-[#EDF8F0] text-[#26382E] border border-[#DDE8E0] rounded-2xl hover:bg-[#DDF7E8] transition-all shadow-2xs"
                    >
                        <FaHeartbeat className="text-xl text-[#26382E]" />
                        <div>
                            <p className="font-bold text-xs">Care Program</p>
                            <p className="text-[10px] text-[#64748B]">View personalized plan</p>
                        </div>
                    </Link>
                    <Link
                        to="/service-user/communication"
                        className="flex items-center gap-3 p-4 bg-[#DDF7E8] text-[#26382E] border border-[#A7E8C2]/60 rounded-2xl hover:bg-[#86D9A9] transition-all shadow-2xs"
                    >
                        <FaBell className="text-xl text-[#2E8456]" />
                        <div>
                            <p className="font-bold text-xs">Messages</p>
                            <p className="text-[10px] text-[#64748B]">Contact care team</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
