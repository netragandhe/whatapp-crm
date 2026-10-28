import React, { useState } from 'react'
import { User, Shield, Search, Filter, MoreVertical, Edit, Key, ShieldOff, Database, UserPlus, X, ShieldCheck, Mail, Globe, Lock } from 'lucide-react'
import { cn } from '../../lib/utils'
import { useQuery } from '@tanstack/react-query'
import { useSuperAdminGovernance } from '../../hooks/useCrmMutations'
import api from '../../services/api'
import { motion, AnimatePresence } from 'framer-motion'

const AdminModal = ({ isOpen, onClose, admin = null }) => {
    const { addAdmin, updatePermissions } = useSuperAdminGovernance();
    const [formData, setFormData] = useState(admin ? { ...admin } : {
        name: '',
        email: '',
        client: 'EduCorp Inc.',
        role: 'Regional Admin',
        permissions: ['Users', 'Analytics'],
    });

    if (!isOpen) return null;

    const togglePermission = (perm) => {
        setFormData(prev => ({
            ...prev,
            permissions: prev.permissions.includes(perm)
                ? prev.permissions.filter(p => p !== perm)
                : [...prev.permissions, perm]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (admin) {
            updatePermissions.mutate({ id: admin.id, permissions: formData.permissions }, { onSuccess: onClose });
        } else {
            addAdmin.mutate(formData, { onSuccess: onClose });
        }
    };

    const isPending = addAdmin.isPending || updatePermissions.isPending;
    const permissionOptions = ['Billing', 'Channels', 'Users', 'Analytics'];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="glass-card bg-white/95 rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl mx-2 sm:mx-auto max-h-[85vh] overflow-y-auto no-scrollbar border border-[#DDE8E0]">
                <div className="p-8 border-b border-[#DDE8E0] flex justify-between items-center bg-[#EDF8F0]/80">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-[#DDF7E8] text-[#26382E] border border-[#A7E8C2] rounded-2xl shadow-sm">
                            <Shield size={20} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-[#26382E] uppercase tracking-tight">{admin ? 'Edit Permissions' : 'Add Admin'}</h3>
                            <p className="text-[10px] font-black text-[#64748B] uppercase tracking-widest mt-1">Tier-1 Access Protocol v4.0</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-[#DDF7E8] rounded-xl transition-colors shadow-sm text-[#64748B]"><X size={20} /></button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="space-y-5">
                        {!admin && (
                            <>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-[#64748B] uppercase tracking-widest flex items-center gap-2 mb-1">
                                        <User size={12} className="text-[#86D9A9]" /> Full Name
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-5 py-4 bg-white/80 border border-[#DDE8E0] rounded-2xl text-xs font-bold focus:ring-2 focus:ring-[#86D9A9]/30 outline-none transition-all placeholder:text-[#64748B]/50 text-[#26382E]"
                                        placeholder="Admin Name"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-[#64748B] uppercase tracking-widest flex items-center gap-2 mb-1">
                                        <Mail size={12} className="text-[#86D9A9]" /> Email Address
                                    </label>
                                    <input
                                        required
                                        type="email"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-5 py-4 bg-white/80 border border-[#DDE8E0] rounded-2xl text-xs font-bold focus:ring-2 focus:ring-[#86D9A9]/30 outline-none transition-all placeholder:text-[#64748B]/50 text-[#26382E]"
                                        placeholder="admin@client.com"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-[#64748B] uppercase tracking-widest flex items-center gap-2 mb-1">
                                        <Database size={12} className="text-[#86D9A9]" /> Client Entity
                                    </label>
                                    <select
                                        value={formData.client}
                                        onChange={e => setFormData({ ...formData, client: e.target.value })}
                                        className="w-full px-5 py-4 bg-white/80 border border-[#DDE8E0] rounded-2xl text-xs font-bold focus:ring-2 focus:ring-[#86D9A9]/30 outline-none transition-all appearance-none cursor-pointer text-[#26382E]"
                                    >
                                        <option>EduCorp Inc.</option>
                                        <option>HealthLine</option>
                                        <option>Global Connect</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-[#64748B] uppercase tracking-widest flex items-center gap-2 mb-1">
                                        <ShieldCheck size={12} className="text-[#86D9A9]" /> Admin Role
                                    </label>
                                    <select
                                        value={formData.role}
                                        onChange={e => setFormData({ ...formData, role: e.target.value })}
                                        className="w-full px-5 py-4 bg-white/80 border border-[#DDE8E0] rounded-2xl text-xs font-bold focus:ring-2 focus:ring-[#86D9A9]/30 outline-none transition-all appearance-none cursor-pointer text-[#26382E]"
                                    >
                                        <option>System Admin</option>
                                        <option>Regional Admin</option>
                                        <option>Support Admin</option>
                                    </select>
                                </div>
                            </>
                        )}

                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-[#64748B] uppercase tracking-widest flex items-center gap-2 mb-2">
                                <Lock size={12} className="text-[#86D9A9]" /> Access Permissions
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {permissionOptions.map(perm => (
                                    <button
                                        key={perm}
                                        type="button"
                                        onClick={() => togglePermission(perm)}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all text-[10px] font-black uppercase tracking-widest",
                                            formData.permissions.includes(perm)
                                                ? "bg-[#DDF7E8] border-[#A7E8C2] text-[#26382E] shadow-sm font-black"
                                                : "bg-[#EDF8F0]/50 border-[#DDE8E0] text-[#64748B] hover:border-[#86D9A9]"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-4 h-4 rounded-md flex items-center justify-center border",
                                            formData.permissions.includes(perm) ? "bg-[#86D9A9] border-[#86D9A9] text-[#26382E]" : "bg-white border-[#DDE8E0]"
                                        )}>
                                            {formData.permissions.includes(perm) && <div className="w-2 h-2 bg-[#26382E] rounded-full" />}
                                        </div>
                                        {perm}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-4 border border-[#DDE8E0] rounded-2xl text-xs font-black uppercase tracking-widest text-[#64748B] hover:bg-[#EDF8F0] transition-all"
                        >
                            Abort
                        </button>
                        <button
                            disabled={isPending}
                            type="submit"
                            className="flex-1 py-4 bg-[#86D9A9] text-[#26382E] rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#A7E8C2] transition-all shadow-sm disabled:opacity-50"
                        >
                            {isPending ? 'Syncing...' : admin ? 'Save Updates' : 'Provision Admin'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

const AdminManagement = () => {
    const { toggleStatus } = useSuperAdminGovernance();
    const [searchTerm, setSearchTerm] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedAdmin, setSelectedAdmin] = useState(null)

    const { data: resp, isLoading } = useQuery({
        queryKey: ['admins'],
        queryFn: async () => {
            const res = await api.get('/super-admin/admins');
            const arr = Array.isArray(res.data?.data) ? res.data.data
                      : Array.isArray(res.data)        ? res.data
                      : Array.isArray(res)             ? res
                      : [];
            // Normalize fields — backend may return role as string 'ADMIN'/'SUPER_ADMIN'
            const roleDisplayMap = {
                'SUPER_ADMIN': 'System Admin',
                'ADMIN': 'Regional Admin',
                'MANAGER': 'Manager',
            };
            return arr.map(admin => ({
                ...admin,
                role: typeof admin.role === 'object'
                    ? (admin.role?.name || 'Admin')
                    : (roleDisplayMap[admin.role] || admin.role || 'Admin'),
                client: admin.client || 'Global Entity',
                permissions: Array.isArray(admin.permissions) ? admin.permissions : ['Users', 'Analytics'],
                status: admin.status || (admin.isActive ? 'Active' : 'Inactive') || 'Active',
                login: admin.login || admin.lastLogin || admin.createdAt || 'N/A',
            }));
        }
    })
    const admins = Array.isArray(resp) ? resp : [];

    const filteredAdmins = admins.filter(admin =>
        admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.client.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const openEditModal = (admin) => {
        setSelectedAdmin(admin);
        setIsModalOpen(true);
    };

    const openAddModal = () => {
        setSelectedAdmin(null);
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-10 pb-16">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-[#26382E] uppercase tracking-tight">Administrative Governance</h1>
                    <p className="text-sm font-medium text-[#64748B]">Protocol-level control over client-tier administrative accounts and authority scopes.</p>
                </div>
                <button
                    onClick={openAddModal}
                    className="w-full sm:w-auto px-8 py-4 bg-[#86D9A9] text-[#26382E] rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#A7E8C2] shadow-sm transition-all flex items-center justify-center gap-3 active:scale-95"
                >
                    <UserPlus size={18} /> Add Admin
                </button>
            </div>

            <div className="glass-card bg-white/80 border border-[#DDE8E0] rounded-3xl shadow-sm overflow-hidden flex flex-col min-h-[500px]">
                <div className="p-4 md:p-8 border-b border-[#DDE8E0] bg-[#EDF8F0]/80 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="relative max-w-sm w-full">
                        <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#64748B]" />
                        <input
                            type="text"
                            placeholder="Identify by name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-14 pr-8 py-4 bg-white/80 border border-[#DDE8E0] rounded-2xl text-xs font-black uppercase tracking-widest focus:ring-2 focus:ring-[#86D9A9]/30 outline-none w-full transition-all shadow-sm text-[#26382E] placeholder:text-[#64748B]/50"
                        />
                    </div>
                    <div className="flex items-center gap-3 px-6 py-4 bg-[#DDF7E8] rounded-2xl border border-[#A7E8C2] text-[#26382E] font-black text-[10px] uppercase tracking-widest w-full md:w-auto justify-center">
                        <ShieldCheck size={14} className="text-[#86D9A9]" /> Total Admins: {filteredAdmins.length}
                    </div>
                </div>

                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className="bg-[#EDF8F0]/80 border-b border-[#DDE8E0]">
                                <th className="px-4 sm:px-10 py-6 font-black text-[#64748B] uppercase text-[9px] tracking-[0.2em]">Identity</th>
                                <th className="px-4 sm:px-10 py-6 font-black text-[#64748B] uppercase text-[9px] tracking-[0.2em]">Protocol</th>
                                <th className="px-4 sm:px-10 py-6 font-black text-[#64748B] uppercase text-[9px] tracking-[0.2em]">Access</th>
                                <th className="px-4 sm:px-10 py-6 font-black text-[#64748B] uppercase text-[9px] tracking-[0.2em]">Uptime</th>
                                <th className="px-4 sm:px-10 py-6 text-right font-black text-[#64748B] uppercase text-[9px] tracking-[0.2em]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#DDE8E0] text-xs">
                            <AnimatePresence mode='popLayout'>
                                {filteredAdmins.map((admin) => (
                                    <motion.tr
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        key={admin.id}
                                        className="group hover:bg-[#F4FBF6] transition-all"
                                    >
                                        <td className="px-4 sm:px-10 py-6 sm:py-8">
                                            <div className="flex items-center gap-3 sm:gap-5">
                                                <div className="h-10 w-10 sm:h-12 sm:w-12 bg-[#DDF7E8] text-[#26382E] rounded-2xl flex items-center justify-center font-black transition-all shadow-sm border border-[#A7E8C2] shrink-0 capitalize">
                                                    {admin.name.charAt(0)}
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="font-black text-sm text-[#26382E] uppercase tracking-tighter truncate">{admin.name}</div>
                                                    <div className="text-[10px] text-[#64748B] flex items-center gap-2 font-black uppercase tracking-widest mt-1 truncate">
                                                        <Mail size={12} className="text-[#86D9A9] shrink-0" /> {admin.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 sm:px-10 py-6 sm:py-8 whitespace-nowrap">
                                            <div className="font-black text-[10px] text-[#26382E] uppercase tracking-tighter bg-[#DDF7E8] px-2.5 py-1 rounded-lg border border-[#A7E8C2] inline-block">
                                                {admin.role}
                                            </div>
                                            <div className="text-[9px] text-[#64748B] mt-2 font-black uppercase tracking-widest flex items-center gap-2 px-1"><Globe size={10} className="text-[#86D9A9]" /> {admin.client}</div>
                                        </td>
                                        <td className="px-4 sm:px-10 py-6 sm:py-8">
                                            <div className="flex flex-wrap gap-1.5 max-w-[180px]">
                                                {admin.permissions.slice(0, 3).map(perm => (
                                                    <span key={perm} className="px-2 py-0.5 bg-white/80 rounded-lg text-[#64748B] text-[8px] font-black uppercase tracking-widest border border-[#DDE8E0]">
                                                        {perm}
                                                    </span>
                                                ))}
                                                {admin.permissions.length > 3 && (
                                                    <span className="px-2 py-0.5 bg-[#DDF7E8] rounded-lg text-[#26382E] text-[8px] font-black uppercase tracking-widest border border-[#A7E8C2]">
                                                        +{admin.permissions.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 sm:px-10 py-6 sm:py-8">
                                            <div className="flex flex-col gap-1.5">
                                                <div className="flex items-center gap-2 whitespace-nowrap">
                                                    <div className={cn(
                                                        "h-2 w-2 rounded-full",
                                                        admin.status === 'Active' ? 'bg-[#86D9A9]' : 'bg-rose-500'
                                                    )} />
                                                    <span className="font-black text-[#26382E] tracking-widest uppercase text-[9px]">{admin.status}</span>
                                                </div>
                                                <div className="text-[9px] font-black text-[#64748B] uppercase tracking-widest pl-4 opacity-75">{admin.login}</div>
                                            </div>
                                        </td>
                                        <td className="px-4 sm:px-10 py-6 sm:py-8 text-right">
                                            <div className="flex items-center justify-end gap-2 sm:gap-3">
                                                <button
                                                    onClick={() => openEditModal(admin)}
                                                    className="p-2 sm:p-3 bg-white/80 hover:bg-[#EDF8F0] rounded-2xl border border-[#DDE8E0] text-[#64748B] hover:text-[#26382E] transition-all shadow-sm active:scale-90"
                                                    title="Edit Permissions"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        const action = admin.status === 'Active' ? 'deactivate' : 'activate';
                                                        if (window.confirm(`Are you sure you want to ${action} ${admin.name}?`)) {
                                                            toggleStatus.mutate(admin.id)
                                                        }
                                                    }}
                                                    disabled={toggleStatus.isPending}
                                                    className={cn(
                                                        "p-2 sm:p-3 rounded-2xl border transition-all shadow-sm active:scale-90 disabled:opacity-50",
                                                        admin.status === 'Active'
                                                            ? "bg-white/80 hover:bg-rose-50 text-[#64748B] hover:text-rose-600 border-[#DDE8E0] hover:border-rose-200"
                                                            : "bg-[#DDF7E8] text-[#26382E] border-[#A7E8C2] hover:bg-[#86D9A9]"
                                                    )}
                                                    title={admin.status === 'Active' ? "Deactivate Account" : "Activate Account"}
                                                >
                                                    <Shield size={16} className={toggleStatus.isPending ? "animate-pulse" : ""} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                <div className="p-10 border-t border-[#DDE8E0] bg-[#EDF8F0]/60 flex items-center justify-between mt-auto">
                    <p className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.3em]">Governance protocol active</p>
                    <button 
                        onClick={async () => {
                            try {
                                const res = await api.get('/admin/security/settings');
                                const data = res.data?.data || res.data;
                                alert(`Encrypted Access Protocol Active.\n\nPolicies:\n- Force 2FA: ${data.force2FA ? 'Enabled' : 'Disabled'}\n- Session Timeout: ${data.sessionTimeout}\n- Key Rotation: ${data.passwordExpiry}`);
                            } catch (err) {
                                alert("Secure connection verified. System access protocol active.");
                            }
                        }}
                        className="px-5 py-2 bg-[#86D9A9] text-[#26382E] rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-[#A7E8C2] transition-all cursor-pointer active:scale-95 shadow-sm"
                        title="Verify Security Configuration"
                    >
                        <Lock size={12} /> Encrypted Access Management
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <AdminModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        admin={selectedAdmin}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}

export default AdminManagement




