import React, { useState, useEffect, useRef } from 'react'
import { Bell, Menu, ChevronDown, LogOut, Settings, BellOff, Check } from 'lucide-react'
import useAppStore from '../../store/useStore'
import { cn } from '../../lib/utils'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const { role, user, logout, sidebarCollapsed, setMobileMenuOpen } = useAppStore()
  const navigate = useNavigate()

  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Lead Routed', message: 'Lead "Rajesh Sharma" was assigned to your queue.', time: '5m ago', unread: true },
    { id: 2, title: 'Node Online', message: 'WhatsApp API channel node connected successfully.', time: '1h ago', unread: false },
    { id: 3, title: 'SLA Warning', message: 'Lead "Kunal Sen" is close to breaching SLA response window.', time: '2h ago', unread: true },
  ])

  const unreadCount = notifications.filter(n => n.unread).length

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })))
  }

  const clearNotifications = () => {
    setNotifications([])
  }

  const notificationRef = useRef(null)
  const profileRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header
      className={cn(
        "border-b border-[#DDE8E0] bg-white/70 backdrop-blur-xl flex items-center justify-between px-4 sm:px-6 h-20 fixed top-0 right-0 z-40 transition-all duration-500 shadow-glass-sm",
        "left-0 md:left-64",
        sidebarCollapsed ? "md:left-20" : "md:left-64"
      )}
    >
      <div className="flex items-center md:hidden">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 -ml-2 text-[#64748B] hover:bg-[#DDF7E8] rounded-xl transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 px-2 md:px-4">
        <div className="flex items-center gap-2">
          <span className="text-sm md:text-base font-black text-[#26382E] tracking-tight">Kiaan CRM Workspace</span>
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-[#DDF7E8] text-[#26382E] text-[10px] font-black uppercase tracking-wider border border-[#A7E8C2]/60">
            {typeof role === 'object' ? role?.name : role}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notification Icon & Dropdown */}
        <div className="relative" ref={notificationRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="h-10 w-10 flex items-center justify-center text-[#64748B] hover:text-[#26382E] hover:bg-[#DDF7E8]/70 rounded-xl transition-all relative border border-transparent hover:border-[#DDE8E0]"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-rose-500 rounded-full border border-white animate-pulse"></span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="fixed sm:absolute right-4 sm:right-0 top-20 sm:top-auto mt-2 w-[calc(100vw-32px)] sm:w-80 bg-white/95 backdrop-blur-2xl border border-[#DDE8E0] rounded-2xl shadow-glass-lg z-50 overflow-hidden"
              >
                <div className="p-4 flex items-center justify-between border-b border-[#DDE8E0] bg-[#EDF8F0]/60">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-[#26382E] uppercase tracking-wider">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="bg-[#86D9A9] text-[#26382E] text-[10px] font-black px-2 py-0.5 rounded-full">
                        {unreadCount} New
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button 
                      onClick={markAllAsRead}
                      className="text-[11px] text-[#2E8456] hover:underline font-bold flex items-center gap-1"
                    >
                      <Check size={12} /> Mark read
                    </button>
                  )}
                </div>

                <div className="max-h-64 overflow-y-auto divide-y divide-[#EDF8F0]">
                  {notifications.length > 0 ? (
                    notifications.map(notif => (
                      <div 
                        key={notif.id} 
                        className={cn(
                          "p-3.5 hover:bg-[#F4FBF6] transition-colors flex gap-3 relative cursor-pointer",
                          notif.unread ? "bg-[#DDF7E8]/20" : ""
                        )}
                        onClick={() => {
                          setNotifications(notifications.map(n => n.id === notif.id ? { ...n, unread: false } : n))
                        }}
                      >
                        {notif.unread && (
                          <span className="absolute left-2.5 top-4 h-1.5 w-1.5 bg-[#86D9A9] rounded-full"></span>
                        )}
                        <div className="flex-1 min-w-0 pl-2">
                          <p className="font-bold text-xs text-[#26382E] truncate">{notif.title}</p>
                          <p className="text-[11px] text-[#64748B] mt-0.5 leading-relaxed">{notif.message}</p>
                          <span className="text-[9px] text-[#94A3B8] mt-1 block">{notif.time}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-10 text-center flex flex-col items-center justify-center text-[#64748B] gap-2">
                      <BellOff size={22} className="text-[#94A3B8]" />
                      <span className="text-xs font-medium">All caught up!</span>
                    </div>
                  )}
                </div>

                {notifications.length > 0 && (
                  <div className="p-2.5 text-center border-t border-[#DDE8E0] bg-[#EDF8F0]/40">
                    <button 
                      onClick={clearNotifications}
                      className="text-[11px] text-rose-600 font-bold hover:underline"
                    >
                      Clear All Notifications
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="h-8 w-px bg-[#DDE8E0] mx-0.5 hidden sm:block" />

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button 
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2.5 hover:bg-[#DDF7E8]/60 p-1.5 rounded-2xl transition-all text-left border border-transparent hover:border-[#DDE8E0]"
          >
            <div className="text-right hidden sm:block">
              <h3 className="text-xs font-black text-[#26382E] leading-tight">
                {user?.name || (typeof role === 'object' ? role?.name : role) || 'User'}
              </h3>
              <p className="text-[9px] font-bold text-[#64748B] uppercase tracking-wider mt-0.5">Online</p>
            </div>
            <div className="h-9 w-9 bg-gradient-to-tr from-[#86D9A9] to-[#A7E8C2] rounded-xl flex items-center justify-center text-[#26382E] font-black text-xs shadow-xs relative shrink-0">
              {user?.name?.[0]?.toUpperCase() || role?.[0]?.toUpperCase() || 'U'}
              <span className="absolute bottom-0 right-0 h-2 w-2 bg-[#16A34A] rounded-full border-2 border-white"></span>
            </div>
            <ChevronDown size={12} className={cn("text-[#64748B] transition-transform", showProfile ? "rotate-180" : "")} />
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="fixed sm:absolute right-4 sm:right-0 top-20 sm:top-auto mt-2 w-[calc(100vw-32px)] sm:w-64 bg-white/95 backdrop-blur-2xl border border-[#DDE8E0] rounded-2xl shadow-glass-lg z-50 overflow-hidden divide-y divide-[#EDF8F0]"
              >
                {/* User Info Header */}
                <div className="p-4 flex items-center gap-3 bg-[#EDF8F0]/60">
                  <div className="h-9 w-9 bg-gradient-to-tr from-[#86D9A9] to-[#A7E8C2] rounded-xl flex items-center justify-center text-[#26382E] font-black text-xs shadow-sm">
                    {user?.name?.[0]?.toUpperCase() || role?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs text-[#26382E] truncate">
                      {user?.name || 'Administrator'}
                    </h4>
                    <p className="text-[10px] text-[#64748B] truncate mt-0.5">
                      {user?.email || 'admin@studyfirstinfo.com'}
                    </p>
                    <span className="inline-block text-[8px] font-black uppercase tracking-wider text-[#26382E] bg-[#DDF7E8] border border-[#A7E8C2]/60 px-2 py-0.5 rounded-full mt-1">
                      {typeof role === 'object' ? role?.name : role}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-2 space-y-1">
                  <button 
                    onClick={() => {
                      setShowProfile(false)
                      const targetPath = role === 'Super Admin' ? '/super-admin/security' : '/settings'
                      navigate(targetPath)
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-[#26382E] hover:bg-[#DDF7E8]/60 rounded-xl transition-all"
                  >
                    <Settings size={14} className="text-[#64748B]" />
                    <span>Security & Profile</span>
                  </button>
                </div>

                <div className="p-2">
                  <button 
                    onClick={() => {
                      setShowProfile(false)
                      logout()
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                  >
                    <LogOut size={14} className="text-rose-500" />
                    <span>Logout Session</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}

export default Navbar
