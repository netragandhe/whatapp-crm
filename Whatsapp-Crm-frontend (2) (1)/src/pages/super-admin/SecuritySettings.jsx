import React, { useState, useEffect } from 'react'
import { Shield, Lock, Key, Smartphone, Globe, Eye, Save, RotateCcw, ShieldAlert, History, UserCheck, Server, Monitor, MapPin, Hash, LogOut, Loader2, ShieldCheck, Timer } from 'lucide-react'
import { cn } from '../../lib/utils'
import { useQuery } from '@tanstack/react-query'
import { useSecurityActions } from '../../hooks/useCrmMutations'
import api from '../../services/api'
import { motion, AnimatePresence } from 'framer-motion'

const SecurityCard = ({ title, description, icon: Icon, children }) => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card bg-white/85 backdrop-blur-xl rounded-3xl border border-[#DDE8E0] shadow-glass overflow-hidden flex flex-col">
        <div className="p-6 border-b border-[#DDE8E0] bg-[#EDF8F0]/50 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
                <div className="p-3 bg-white rounded-2xl shadow-sm border border-[#DDE8E0] text-[#26382E]">
                    <Icon size={20} className="text-[#2E8456]" />
                </div>
                <div>
                    <h3 className="text-base font-black text-[#26382E] tracking-tight">{title}</h3>
                    <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mt-0.5">{description}</p>
                </div>
            </div>
        </div>
        <div className="p-6 space-y-6">
            {children}
        </div>
    </motion.div>
)

const Toggle = ({ enabled, onChange, label, sublabel }) => (
    <div className="flex items-center justify-between group">
        <div>
            <div className="text-xs font-bold text-[#26382E]">{label}</div>
            <div className="text-[10px] font-medium text-[#64748B] mt-0.5">{sublabel}</div>
        </div>
        <button
            onClick={() => onChange(!enabled)}
            className={cn(
                "relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-200 focus:outline-none",
                enabled ? "bg-[#86D9A9]" : "bg-gray-200"
            )}
        >
            <span className={cn(
                "inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 shadow-sm",
                enabled ? "translate-x-7" : "translate-x-1"
            )} />
        </button>
    </div>
)

const SecuritySettings = () => {
    const { updateSettings, logoutSession } = useSecurityActions()

    const { data: settingsData, isLoading: settingsLoading } = useQuery({
        queryKey: ['security-settings'],
        queryFn: () => api.get('/admin/security/settings').then(res => res.data || res)
    })

    const { data: sessions = [], isLoading: sessionsLoading } = useQuery({
        queryKey: ['active-sessions'],
        queryFn: () => api.get('/admin/security/sessions').then(res => Array.isArray(res.data) ? res.data : (Array.isArray(res) ? res : []))
    })

    const [localSettings, setLocalSettings] = useState(null)
    const [passwordForm, setPasswordForm] = useState({
        current: '',
        new: '',
        confirm: ''
    })

    const handlePasswordChange = (e) => {
        e.preventDefault();
        if (passwordForm.new !== passwordForm.confirm) {
            alert("Sequences do not match.");
            return;
        }
        alert("Personal security password sequence updated.");
        setPasswordForm({ current: '', new: '', confirm: '' });
    }

    useEffect(() => {
        if (settingsData) setLocalSettings(settingsData)
    }, [settingsData])

    if (settingsLoading || !localSettings) return (
        <div className="p-20 text-center flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin text-[#86D9A9]" size={32} />
            <div className="font-bold text-[#64748B] uppercase tracking-wider text-xs">Calibrating Security Parameters...</div>
        </div>
    )

    const handleSave = () => {
        updateSettings.mutate(localSettings)
    }

    return (
        <div className="space-y-8 pb-16">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-[#26382E] tracking-tight">Security & Governance</h1>
                    <p className="text-xs sm:text-sm font-medium text-[#64748B] mt-1">Real-time policy enforcement and administrator session governance.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setLocalSettings(settingsData)}
                        className="p-2.5 bg-white border border-[#DDE8E0] rounded-xl text-[#64748B] hover:text-[#26382E] hover:bg-[#DDF7E8] active:scale-95 transition-all shadow-sm"
                        title="Reset settings"
                    >
                        <RotateCcw size={16} />
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={updateSettings.isPending}
                        className="bg-[#86D9A9] text-[#26382E] px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-[#A7E8C2] shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                    >
                        <Save size={15} /> {updateSettings.isPending ? 'Syncing...' : 'Save Changes'}
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <SecurityCard
                    title="Login Security"
                    description="Access verification and session integrity"
                    icon={ShieldCheck}
                >
                    <Toggle
                        label="Force 2FA"
                        sublabel="Mandatory multi-factor authentication for all administrators"
                        enabled={localSettings.force2FA}
                        onChange={(val) => setLocalSettings({ ...localSettings, force2FA: val })}
                    />
                    <div className="h-[1px] bg-[#DDE8E0]/70" />
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider flex items-center gap-1.5">
                            <History size={12} className="text-[#86D9A9]" /> Session Inactivity Timeout
                        </label>
                        <select
                            value={localSettings.sessionTimeout}
                            onChange={(e) => setLocalSettings({ ...localSettings, sessionTimeout: e.target.value })}
                            className="w-full px-4 py-2.5 bg-white border border-[#DDE8E0] rounded-xl text-xs font-semibold text-[#26382E] focus:outline-none focus:ring-2 focus:ring-[#86D9A9] transition-all cursor-pointer"
                        >
                            <option>15 mins</option>
                            <option>30 mins</option>
                            <option>60 mins</option>
                            <option>4 hours</option>
                        </select>
                    </div>
                </SecurityCard>

                <SecurityCard
                    title="Change Password Sequence"
                    description="Rotate your personal encryption credentials"
                    icon={Key}
                >
                    <form onSubmit={handlePasswordChange} className="space-y-3.5">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider flex items-center gap-1.5">
                                <Lock size={12} className="text-[#86D9A9]" /> Current Password
                            </label>
                            <input
                                type="password"
                                required
                                value={passwordForm.current}
                                onChange={e => setPasswordForm({ ...passwordForm, current: e.target.value })}
                                className="w-full px-4 py-2.5 bg-white border border-[#DDE8E0] rounded-xl text-xs font-medium text-[#26382E] focus:outline-none focus:ring-2 focus:ring-[#86D9A9] transition-all"
                                placeholder={"••••••••"}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider flex items-center gap-1.5">
                                <Key size={12} className="text-[#86D9A9]" /> New Password
                            </label>
                            <input
                                type="password"
                                required
                                value={passwordForm.new}
                                onChange={e => setPasswordForm({ ...passwordForm, new: e.target.value })}
                                className="w-full px-4 py-2.5 bg-white border border-[#DDE8E0] rounded-xl text-xs font-medium text-[#26382E] focus:outline-none focus:ring-2 focus:ring-[#86D9A9] transition-all"
                                placeholder={"••••••••"}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider flex items-center gap-1.5">
                                <ShieldCheck size={12} className="text-[#86D9A9]" /> Confirm Password
                            </label>
                            <input
                                type="password"
                                required
                                value={passwordForm.confirm}
                                onChange={e => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                                className="w-full px-4 py-2.5 bg-white border border-[#DDE8E0] rounded-xl text-xs font-medium text-[#26382E] focus:outline-none focus:ring-2 focus:ring-[#86D9A9] transition-all"
                                placeholder={"••••••••"}
                            />
                        </div>
                        <button type="submit" className="w-full py-2.5 mt-2 bg-[#DDF7E8] text-[#26382E] border border-[#A7E8C2]/60 rounded-xl text-xs font-bold hover:bg-[#86D9A9] transition-all shadow-sm">
                            Apply Password Update
                        </button>
                    </form>
                </SecurityCard>

                <div className="xl:col-span-2">
                    <SecurityCard
                        title="Active Sessions"
                        description="Real-time telemetry of authorized system connections"
                        icon={Monitor}
                    >
                        <div className="overflow-x-auto -mx-6">
                            <table className="w-full text-left border-collapse min-w-[700px]">
                                <thead>
                                    <tr className="bg-[#EDF8F0]/70 border-b border-[#DDE8E0]">
                                        <th className="px-6 py-3.5 text-[10px] font-black text-[#26382E] uppercase tracking-wider">User Identity</th>
                                        <th className="px-6 py-3.5 text-[10px] font-black text-[#26382E] uppercase tracking-wider">Device / OS</th>
                                        <th className="px-6 py-3.5 text-[10px] font-black text-[#26382E] uppercase tracking-wider">Location / IP</th>
                                        <th className="px-6 py-3.5 text-[10px] font-black text-[#26382E] uppercase tracking-wider">Login Time</th>
                                        <th className="px-6 py-3.5 text-right text-[10px] font-black text-[#26382E] uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#DDE8E0]/60">
                                    <AnimatePresence mode='popLayout'>
                                        {sessions.map((session) => (
                                            <motion.tr
                                                layout
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                key={session.id}
                                                className="group hover:bg-[#F4FBF6] transition-colors"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-8 w-8 bg-[#DDF7E8] text-[#26382E] border border-[#A7E8C2]/60 rounded-xl flex items-center justify-center font-black text-xs shadow-sm">
                                                            {session.user?.charAt(0) || 'U'}
                                                        </div>
                                                        <div className="font-bold text-xs text-[#26382E]">{session.user}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-xs font-medium text-[#64748B] flex items-center gap-1.5">
                                                        <Monitor size={13} className="text-[#86D9A9]" /> {session.device}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="space-y-0.5">
                                                        <div className="text-xs font-semibold text-[#26382E] flex items-center gap-1.5">
                                                            <MapPin size={13} className="text-[#2E8456]" /> {session.location}
                                                        </div>
                                                        <div className="text-[10px] font-mono text-[#64748B] pl-5">{session.ip}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-xs font-semibold text-[#2E8456] flex items-center gap-1.5">
                                                        <History size={13} /> {session.loginTime}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => logoutSession.mutate(session.id)}
                                                        disabled={logoutSession.isPending}
                                                        className="p-2 bg-rose-50 hover:bg-rose-500 rounded-xl border border-rose-100 text-rose-600 hover:text-white transition-all shadow-sm active:scale-95 disabled:opacity-50"
                                                        title="Revoke Session"
                                                    >
                                                        <LogOut size={14} className={logoutSession.isPending ? "animate-pulse" : ""} />
                                                    </button>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>
                    </SecurityCard>
                </div>
            </div>
        </div>
    )
}

export default SecuritySettings
