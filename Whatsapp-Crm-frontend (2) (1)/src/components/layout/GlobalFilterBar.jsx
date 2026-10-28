import React, { useState } from 'react'
import { Calendar, MapPin, Users, Tag, ChevronDown, Filter } from 'lucide-react'
import useAppStore from '../../store/useStore'
import { cn } from '../../lib/utils'
import { useNavigate } from 'react-router-dom'
import { useQueryClient, useQuery } from '@tanstack/react-query'
import { RefreshCcw } from 'lucide-react'
import api from '../../services/api'

const FilterItem = ({ label, value, icon: Icon, options, onChange }) => (
    <div className="relative flex items-center gap-3 px-3 md:px-4 py-2.5 bg-white/80 backdrop-blur-md border border-[#DDE8E0] rounded-2xl cursor-pointer hover:bg-white hover:border-[#86D9A9] hover:shadow-sm transition-all group shrink-0 min-w-0">
        <div className="p-1.5 bg-[#EDF8F0] rounded-xl border border-[#DDE8E0]/60 group-hover:border-[#86D9A9]/50 transition-colors">
            <Icon className="h-3.5 w-3.5 text-[#26382E]/70 group-hover:text-[#26382E] transition-colors" />
        </div>
        <div className="flex flex-col min-w-0">
            <span className="text-[8px] md:text-[9px] font-bold text-[#64748B] uppercase tracking-[0.15em] leading-none mb-1">{label}</span>
            <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-[#26382E] uppercase tracking-tight truncate">{value}</span>
                <ChevronDown size={10} className="text-[#64748B] group-hover:text-[#26382E] transition-colors" />
            </div>
        </div>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        >
            {options.map((opt, i) => (
                <option key={i} value={opt}>{opt}</option>
            ))}
        </select>
    </div>
)

const GlobalFilterBar = () => {
    const navigate = useNavigate()
    const {
        country, setCountry,
        statusFilter, setStatusFilter,
        teamMember, setTeamMember,
        dateRange, setDateRange
    } = useAppStore()

    const [localCountry, setLocalCountry] = useState(country)
    const [localStatus, setLocalStatus] = useState(statusFilter)
    const [localTeamMember, setLocalTeamMember] = useState(teamMember || 'All Operators')
    const [localDateRange, setLocalDateRange] = useState(dateRange?.label || 'Last 7 Days')
    const [isFiltering, setIsFiltering] = useState(false)

    const queryClient = useQueryClient()

    // Fetch real countries from DB
    const { data: leadsResp } = useQuery({
        queryKey: ['filter-countries'],
        queryFn: () => api.get('/leads'),
        staleTime: 5 * 60 * 1000
    })
    const leadsArr = Array.isArray(leadsResp?.data) ? leadsResp.data : (Array.isArray(leadsResp) ? leadsResp : [])
    const dbCountries = ['Global', ...new Set(leadsArr.map(l => l.country).filter(Boolean))].sort()

    // Fetch real operators (users) from DB
    const { data: usersResp } = useQuery({
        queryKey: ['filter-operators'],
        queryFn: () => api.get('/users'),
        staleTime: 5 * 60 * 1000
    })
    const usersArr = Array.isArray(usersResp?.data) ? usersResp.data : (Array.isArray(usersResp) ? usersResp : [])
    const dbOperators = ['All Operators', ...usersArr.map(u => u.name).filter(Boolean)]

    const handleApplyFilters = () => {
        setIsFiltering(true)
        setCountry(localCountry)
        setStatusFilter(localStatus)
        setTeamMember(localTeamMember === 'All Operators' ? '' : localTeamMember)
        setDateRange({ label: localDateRange, from: null, to: null })
        queryClient.invalidateQueries()
        setTimeout(() => setIsFiltering(false), 500)
    }

    const leadStateOptions = [
        'All Stages', 'New', 'Qualified', 'Converted', 'Enrolled', 'Lost',
        'Hot Priority', 'Warm Inbound', 'Cold Prospect'
    ]

    return (
        <div className="flex flex-col gap-4 py-4 w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <FilterItem
                    label="Chronology"
                    value={localDateRange}
                    icon={Calendar}
                    options={['Today', 'Last 7 Days', 'Last 30 Days', 'This Month', 'All Records']}
                    onChange={setLocalDateRange}
                />
                <FilterItem
                    label="Territory"
                    value={localCountry}
                    icon={MapPin}
                    options={dbCountries.length > 1 ? dbCountries : ['Global', 'India', 'USA', 'UK', 'UAE', 'Canada']}
                    onChange={setLocalCountry}
                />
                <FilterItem
                    label="Lead State"
                    value={localStatus}
                    icon={Tag}
                    options={leadStateOptions}
                    onChange={setLocalStatus}
                />
                <FilterItem
                    label="Operator"
                    value={localTeamMember}
                    icon={Users}
                    options={dbOperators.length > 1 ? dbOperators : ['All Operators']}
                    onChange={setLocalTeamMember}
                />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-2 border-t border-[#DDE8E0]/60 pt-4">
                <button
                    onClick={() => navigate('/analytics')}
                    className="flex w-full sm:w-auto justify-center items-center gap-2 text-[#64748B] hover:text-[#26382E] bg-white/70 hover:bg-white border border-[#DDE8E0] px-4 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 group shadow-sm"
                >
                    <Filter size={14} className="group-hover:rotate-180 transition-transform duration-500 text-[#26382E]/70" />
                    <span>Advanced Matrix</span>
                </button>
                <button
                    onClick={handleApplyFilters}
                    disabled={isFiltering}
                    className="w-full sm:w-auto bg-[#86D9A9] text-[#26382E] px-8 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#A7E8C2] transition-all shadow-sm active:scale-95 border border-[#86D9A9] focus:outline-none flex items-center justify-center gap-2 disabled:opacity-75"
                >
                    {isFiltering ? <RefreshCcw size={14} className="animate-spin" /> : 'Apply Scopes'}
                </button>
            </div>
        </div>
    )
}

export default GlobalFilterBar
