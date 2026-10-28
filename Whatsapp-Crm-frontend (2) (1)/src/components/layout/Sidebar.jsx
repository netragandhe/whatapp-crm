import React, { useEffect } from 'react'
import ktLogo from '../../assets/logo.png'
import {
  LayoutDashboard,
  Inbox,
  Users,
  BrainCircuit,
  Phone,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Target,
  Users2,
  Globe,
  Clock,
  PieChart,
  BarChart,
  AlertTriangle,
  FileText,
  UserCheck,
  FileEdit,
  Layers,
  Sparkles,
  PhoneCall,
  UserPlus,
  Zap,
  MessageSquareQuote,
  RefreshCcw,
  ShieldCheck,
  X,
  Headphones,
  TrendingUp,
  Activity,
  Calendar,
  Link2,
  Building2,
  CreditCard,
  ScrollText,
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import useAppStore from '../../store/useStore'
import { cn } from '../../lib/utils'
import { useQuery } from '@tanstack/react-query'
import api from '../../services/api'

const IconMap = {
  LayoutDashboard,
  Inbox,
  Users,
  BrainCircuit,
  Phone,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Target,
  Users2,
  Globe,
  Clock,
  PieChart,
  BarChart,
  AlertTriangle,
  FileText,
  UserCheck,
  FileEdit,
  Layers,
  Sparkles,
  PhoneCall,
  UserPlus,
  Zap,
  MessageSquareQuote,
  RefreshCcw,
  ShieldCheck,
  X,
  Headphones,
  TrendingUp,
  Activity,
  Calendar,
  Link2,
  Building2,
  CreditCard,
  ScrollText,
}

const SidebarItem = ({ icon: Icon, label, path, collapsed, onClick }) => {
  const location = useLocation()
  const isActive = location.pathname === path

  return (
    <Link
      to={path}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 group no-underline relative",
        isActive
          ? "bg-[#DDF7E8] text-[#26382E] font-bold shadow-xs border border-[#A7E8C2]/60"
          : "text-[#64748B] hover:bg-white/80 hover:text-[#26382E]"
      )}
    >
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-[#86D9A9]" />
      )}
      <Icon className={cn("h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110", isActive ? "text-[#2E8456]" : "text-[#64748B] group-hover:text-[#26382E]")} />
      {!collapsed && <span className="text-xs truncate">{label}</span>}
    </Link>
  )
}

const Sidebar = () => {
  const {
    sidebarCollapsed,
    setSidebarCollapsed,
    role,
    mobileMenuOpen,
    setMobileMenuOpen
  } = useAppStore()

  const location = useLocation()

  // Fetch menus dynamically
  const roleName = typeof role === 'object' ? (role?.name || 'Guest') : (role || 'Guest')
  const dashboardId = roleName.toLowerCase().replace(' ', '-')

  const { data: menuResp } = useQuery({
    queryKey: ['sidebar-menus', dashboardId],
    queryFn: () => api.get(`/system/menus/${dashboardId}`),
    enabled: !!dashboardId
  })

  // Get menus for current role
  const menuItems = menuResp?.data || []

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname, setMobileMenuOpen])

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={cn(
            "fixed inset-0 bg-[#26382E]/30 z-[60] md:hidden backdrop-blur-xs transition-all duration-500 ease-in-out",
            mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileMenuOpen(false)}
      />

      <aside
        className={cn(
          "fixed left-0 top-0 h-screen bg-[#EDF8F0]/90 backdrop-blur-2xl text-[#26382E] border-r border-[#DDE8E0] transition-all duration-500 ease-in-out z-[70] flex flex-col shadow-glass",
          sidebarCollapsed ? "md:w-20" : "w-64",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className={cn(
          "flex items-center justify-between border-b border-[#DDE8E0] relative bg-white/40 transition-all duration-500",
          (!sidebarCollapsed || mobileMenuOpen) ? "h-20 px-4" : "h-20 px-2 justify-center"
        )}>
          {(!sidebarCollapsed || mobileMenuOpen) && (
            <Link to="/" className="flex items-center gap-2.5 min-w-0 w-full justify-start">
              <div className="h-14 w-24 flex items-center justify-center shrink-0">
                <img src={ktLogo} alt="Logo" className="h-full w-full object-contain" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-black text-base text-[#26382E] tracking-tight leading-none truncate">
                  Whats<span className="text-[#2E8456]">CRM</span>
                </span>
                <span className="text-[11px] font-semibold text-[#64748B] tracking-wider truncate mt-0.5">
                  Kiaan Tech
                </span>
              </div>
            </Link>
          )}

          {sidebarCollapsed && !mobileMenuOpen && (
            <Link to="/" className="h-12 w-16 flex items-center justify-center mx-auto hover:scale-105 transition-transform cursor-pointer">
              <img src={ktLogo} alt="Logo" className="h-full w-full object-contain" />
            </Link>
          )}

          <button
            className="md:hidden absolute top-3 right-3 p-1.5 text-[#64748B] hover:text-[#26382E] transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={18} />
          </button>

          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden md:flex absolute -right-3 top-7 h-6 w-6 bg-[#86D9A9] border border-[#DDE8E0] rounded-full items-center justify-center text-[#26382E] hover:bg-[#A7E8C2] transition-all hover:scale-110 z-50 shadow-sm"
          >
            {sidebarCollapsed ? <ChevronRight size={13} strokeWidth={3} /> : <ChevronLeft size={13} strokeWidth={3} />}
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.path}
              {...item}
              icon={IconMap[item.icon] || LayoutDashboard}
              collapsed={sidebarCollapsed && !mobileMenuOpen}
              onClick={() => mobileMenuOpen && setMobileMenuOpen(false)}
            />
          ))}
        </nav>

        <div className="p-3.5 border-t border-[#DDE8E0] space-y-3 bg-white/30">
          {(!sidebarCollapsed || mobileMenuOpen) && (
            <div className="bg-white/80 p-3 rounded-2xl border border-[#DDE8E0] shadow-glass-sm backdrop-blur-sm">
              <p className="text-[9px] text-[#64748B] font-black mb-1.5 uppercase tracking-wider">Quota Usage</p>
              <div className="w-full bg-[#EDF8F0] rounded-full h-1.5 mb-2 overflow-hidden border border-[#DDE8E0]">
                <div className="bg-[#86D9A9] h-1.5 rounded-full w-3/4 transition-all duration-1000 ease-out shadow-xs"></div>
              </div>
              <div className="flex justify-between items-center text-[10px] font-semibold">
                <span className="text-[#26382E]">75% Used</span>
                <span className="text-[#64748B]">750 / 1,000</span>
              </div>
            </div>
          )}

          <button
            onClick={() => useAppStore.getState().logout()}
            className={cn(
              "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all duration-200 group text-rose-600 hover:bg-rose-50/80 font-bold text-xs uppercase tracking-wider",
              sidebarCollapsed && !mobileMenuOpen ? "justify-center" : ""
            )}
          >
            <Zap className="h-4 w-4 shrink-0 text-rose-500" />
            {(!sidebarCollapsed || mobileMenuOpen) && <span>Logout Session</span>}
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar