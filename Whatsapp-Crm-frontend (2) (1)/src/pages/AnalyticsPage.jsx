import React from 'react'
import { 
    BarChart3, 
    PieChart, 
    TrendingUp, 
    Activity, 
    Download, 
    ArrowUpRight, 
    RefreshCcw 
} from 'lucide-react'
import { cn } from '../lib/utils'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import api from '../services/api'
import useAppStore from '../store/useStore'

const StatCard = ({ title, value, change, icon: Icon, color, onClick }) => (
    <div onClick={onClick} className={cn("glass-card p-6 rounded-3xl border border-[#DDE8E0] shadow-glass group hover:border-[#86D9A9] transition-all", onClick && "cursor-pointer active:scale-95")}>
        <div className="flex items-start justify-between">
            <div className={cn("p-3 rounded-2xl transition-transform group-hover:scale-105 border", color)}>
                <Icon size={20} />
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-[#EDF8F0] px-2.5 py-1 rounded-xl border border-[#DDE8E0]">
                <ArrowUpRight size={10} />
                {change}
            </div>
        </div>
        <div className="mt-6">
            <h3 className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">{title}</h3>
            <p className="text-2xl font-black text-[#26382E] mt-1 tracking-tight tabular-nums">{value}</p>
        </div>
    </div>
)

const AnalyticsPage = () => {
    const navigate = useNavigate()
    const { country, statusFilter, teamMember, dateRange } = useAppStore()

    const { data: analytics, refetch, isFetching } = useQuery({
        queryKey: ['system-analytics', country, statusFilter, teamMember, dateRange?.label],
        queryFn: () => api.get('/analytics/summary', {
            params: {
                country,
                status: statusFilter,
                operator: teamMember,
                dateLabel: dateRange?.label
            }
        }).then(res => res.data)
    })

    const handleExport = async () => {
        try {
            const response = await api.get('/analytics/export', { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'crm-intelligence-metadata.json');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Export failed:', error);
        }
    };

    const leadsByCountry = analytics?.leadsByCountry || []

    const totalLeads = leadsByCountry.reduce((acc, curr) => acc + (curr['Total Leads Generated'] || 0), 0)
    const totalQualified = leadsByCountry.reduce((acc, curr) => acc + (curr['Qualified Pipelines'] || 0), 0)
    const avgVelocity = "2.4s"

    return (
        <div className="space-y-8 md:space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-[#26382E] uppercase tracking-tight flex items-center gap-2 md:gap-3">
                        <Activity className="text-emerald-700 shrink-0" size={28} />
                        Systems <span className="text-[#86D9A9]">Intelligence</span>
                    </h1>
                    <p className="text-[9px] md:text-[10px] font-bold text-[#64748B] uppercase tracking-[0.2em] mt-1">Advanced Vector Analysis and Conversion Matrix Lifecycle</p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-3">
                    <button 
                        onClick={handleExport}
                        className="w-full sm:w-auto justify-center bg-white/80 backdrop-blur-md border border-[#DDE8E0] text-[#26382E] px-4 md:px-6 py-3 rounded-2xl font-bold text-[9px] md:text-[10px] uppercase tracking-widest hover:border-[#86D9A9] hover:bg-[#F4FBF6] transition-all shadow-sm flex items-center gap-2"
                    >
                        <Download size={14} className="shrink-0" /> Export MetaData
                    </button>

                    <button 
                        onClick={() => refetch()}
                        disabled={isFetching}
                        className="w-full sm:w-auto justify-center bg-[#86D9A9] text-[#26382E] px-6 md:px-8 py-3 rounded-2xl font-bold text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-[#A7E8C2] transition-all shadow-sm active:scale-95 disabled:opacity-50 flex items-center gap-2"
                    >
                        <RefreshCcw size={14} className={isFetching ? "animate-spin shrink-0" : "shrink-0"} />
                        Pulse Refresh
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <StatCard 
                    title="Conversion Velocity" 
                    value={avgVelocity} 
                    change="+14%" 
                    icon={TrendingUp} 
                    color="bg-[#DDF7E8] text-[#26382E] border-[#86D9A9]/40" 
                    onClick={() => navigate('/manager/conversion')}
                />
                <StatCard 
                    title="Qualification Depth" 
                    value={totalQualified.toLocaleString()} 
                    change="+5.2%" 
                    icon={BarChart3} 
                    color="bg-[#EDF8F0] text-emerald-800 border-[#86D9A9]/30" 
                    onClick={() => navigate('/manager/funnel')}
                />
                <StatCard 
                    title="Inbound Pressure" 
                    value={`${totalLeads.toLocaleString()}`} 
                    change="+22%" 
                    icon={Activity} 
                    color="bg-[#86D9A9]/30 text-[#26382E] border-[#86D9A9]" 
                    onClick={() => navigate('/leads')}
                />
                <StatCard 
                    title="Matrix Accuracy" 
                    value="99.4%" 
                    change="+0.8%" 
                    icon={PieChart} 
                    color="bg-[#DDF7E8] text-emerald-800 border-[#86D9A9]/40" 
                />
            </div>

            {/* Main Visualizer Area */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-8">
                    <div className="glass-card min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden rounded-[2rem] border border-[#DDE8E0] shadow-glass p-8">
                        <div className="text-center space-y-4">
                            <div className="p-6 bg-[#DDF7E8] text-[#26382E] rounded-full border border-[#86D9A9]/40 shadow-sm inline-block">
                                <Activity size={40} className="text-emerald-700" />
                            </div>
                            <h2 className="text-sm font-black text-[#26382E] uppercase tracking-[0.3em]">Live Intelligence Feed</h2>
                            <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest max-w-sm mx-auto leading-relaxed">
                                {isFetching ? "Synchronizing system vectors..." : "System is calculating vector offsets across global territorial clusters..."}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-4 md:space-y-6">
                    <h3 className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest pl-1">Matrix Observables</h3>
                    {analytics?.leadsBySource?.slice(0, 4).map((item, i) => (
                        <div key={i} className="glass-card !p-5 md:!p-6 flex items-center justify-between gap-3 rounded-2xl border border-[#DDE8E0] hover:border-[#86D9A9] transition-all shadow-glass">
                            <div className="min-w-0">
                                <h4 className="text-[8px] md:text-[9px] font-bold text-[#64748B] uppercase tracking-widest truncate">{item['Ingress Channel'] || 'Generic Channel'}</h4>
                                <p className="text-xs md:text-sm font-black text-[#26382E] mt-1 uppercase tracking-tight truncate">{item['Total Leads']?.toLocaleString()} Units</p>
                            </div>
                            <div 
                                onClick={() => navigate('/super-admin/channels')}
                                className="px-3 py-1.5 bg-[#DDF7E8] text-emerald-800 rounded-xl text-[8px] md:text-[9px] font-bold uppercase tracking-widest border border-[#86D9A9]/40 hover:bg-[#A7E8C2] transition-all shrink-0 cursor-pointer active:scale-95"
                            >
                                {item['Successful Conversions'] > 0 ? 'Optimal' : 'Active'}
                            </div>
                        </div>
                    ))}
                    {!analytics?.leadsBySource?.length && (
                        <div className="text-center py-10 text-[#64748B] text-[10px] font-bold uppercase tracking-widest">No matrix data available</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AnalyticsPage
