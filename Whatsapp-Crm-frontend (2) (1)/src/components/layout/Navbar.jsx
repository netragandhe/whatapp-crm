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
        "border-b border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 h-20 fixed top-0 right-0 z-40 transition-all duration-500",
        "left-0 md:left-64",
        sidebarCollapsed ? "md:left-20" : "md:left-64"
      )}
    >
      <div className="flex items-center md:hidden">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <div className="flex-1 px-2 md:px-4">
        <h2 className="text-base md:text-lg font-bold text-slate-800">Dashboard</h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Notification Icon & Dropdown */}
        <div className="relative" ref={notificationRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="h-10 w-10 flex items-center justify-center text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-all relative"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-2.5 right-2.5 h-2.5 w-2.5 bg-rose-500 rounded-full border-2 border-white ring-2 ring-rose-500/20 animate-pulse"></span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="fixed sm:absolute right-4 sm:right-0 top-20 sm:top-auto mt-3 w-[calc(100vw-32px)] sm:w-80 bg-white border border-slate-100 rounded-2xl shadow-2xl z-50 overflow-hidden"
              >
                <div className="p-4 flex items-center justify-between border-b border-slate-100 bg-slate-50/50">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-800">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        {unreadCount} New
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button 
                      onClick={markAllAsRead}
                      className="text-xs text-emerald-700 hover:underline font-semibold flex items-center gap-1"
                    >
                      <Check size={12} /> Mark read
                    </button>
                  )}
                </div>

                <div className="max-h-64 overflow-y-auto divide-y divide-slate-50 animate-fade-in">
                  {notifications.length > 0 ? (
                    notifications.map(notif => (
                      <div 
                        key={notif.id} 
                        className={cn(
                          "p-4 hover:bg-slate-50/50 transition-colors flex gap-3 relative cursor-pointer",
                          notif.unread ? "bg-emerald-50/30" : ""
                        )}
                        onClick={() => {
                          setNotifications(notifications.map(n => n.id === notif.id ? { ...n, unread: false } : n))
                        }}
                      >
                        {notif.unread && (
                          <span className="absolute left-2.5 top-5 h-2 w-2 bg-emerald-500 rounded-full"></span>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-xs text-slate-800 truncate">{notif.title}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{notif.message}</p>
                          <span className="text-[9px] text-slate-400 mt-1 block">{notif.time}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-10 text-center flex flex-col items-center justify-center text-slate-400 gap-2">
                      <BellOff size={24} className="text-slate-300" />
                      <span className="text-xs font-medium">All caught up!</span>
                    </div>
                  )}
                </div>

                {notifications.length > 0 && (
                  <div className="p-3 text-center border-t border-slate-100 bg-slate-50/20">
                    <button 
                      onClick={clearNotifications}
                      className="text-[11px] text-rose-500 font-bold hover:underline"
                    >
                      Clear All Notifications
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="h-10 w-px bg-slate-200 mx-1 hidden sm:block" />

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button 
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3 hover:bg-slate-50 p-1.5 rounded-xl transition-all text-left"
          >
            <div className="text-right hidden sm:block">
              <h3 className="text-xs font-bold text-slate-900 leading-tight">
                {user?.name || (typeof role === 'object' ? role?.name : role) || 'User'}
              </h3>
              <p className="text-[10px] text-slate-400 leading-none mt-0.5">Online</p>
            </div>
            <div className="h-10 w-10 bg-[#0a3d62] rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-[0_4px_12px_rgba(10,61,98,0.2)] relative group transition-transform">
              {user?.name?.[0]?.toUpperCase() || role?.[0]?.toUpperCase() || 'U'}
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-emerald-500 rounded-full border-2 border-white ring-2 ring-emerald-500/20"></span>
            </div>
            <ChevronDown size={14} className={cn("text-slate-400 transition-transform", showProfile ? "rotate-180" : "")} />
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="fixed sm:absolute right-4 sm:right-0 top-20 sm:top-auto mt-3 w-[calc(100vw-32px)] sm:w-64 bg-white border border-slate-100 rounded-2xl shadow-2xl z-50 overflow-hidden divide-y divide-slate-50"
              >
                {/* User Info Header */}
                <div className="p-4 flex items-center gap-3 bg-slate-50/50">
                  <div className="h-10 w-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md shadow-emerald-600/20">
                    {user?.name?.[0]?.toUpperCase() || role?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs text-slate-800 truncate">
                      {user?.name || 'Administrator'}
                    </h4>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">
                      {user?.email || 'admin@studyfirstinfo.com'}
                    </p>
                    <span className="inline-block text-[8px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md mt-1 border border-emerald-200/60">
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
                    className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-emerald-50/60 hover:text-emerald-800 rounded-xl transition-all"
                  >
                    <Settings size={16} className="text-slate-400" />
                    <span>Security & Profile</span>
                  </button>
                </div>

                <div className="p-2">
                  <button 
                    onClick={() => {
                      setShowProfile(false)
                      logout()
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                  >
                    <LogOut size={16} className="text-rose-400" />
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
