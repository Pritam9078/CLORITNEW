import React, { useState } from 'react';
import NGOLayout from './shared/NGOLayout';
import NGOCard from './shared/NGOCard';
import {
    Bell,
    Shield,
    Smartphone,
    Mail,
    Lock,
    Globe,
    ChevronRight,
    Download,
    Trash2,
    Database,
    CreditCard
} from 'lucide-react';

const NGOSettings = () => {
    const [notifications, setNotifications] = useState({ email: true, push: true, weekly: false });
    const [security, setSecurity] = useState({ twoFactor: true, publicProfile: true });

    const Toggle = ({ active, onChange }: { active: boolean; onChange: () => void }) => (
        <button
            onClick={onChange}
            className={`w-12 h-7 rounded-full transition-colors relative flex items-center px-1 ${active ? 'bg-cyan-600' : 'bg-slate-200'}`}
        >
            <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${active ? 'translate-x-5' : 'translate-x-0'}`} />
        </button>
    );

    return (
        <NGOLayout>
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">Settings</h1>
                <p className="text-slate-500 font-medium text-lg">System preferences and security controls.</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
                {/* Notifications */}
                <NGOCard>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                            <Bell className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-slate-800">Notifications</h2>
                            <p className="text-slate-400 font-medium text-sm">Manage how you receive updates</p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between pb-6 border-b border-slate-50 last:border-0 last:pb-0">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-700">Email Alerts</p>
                                    <p className="text-xs text-slate-400">Project milestones & verification updates</p>
                                </div>
                            </div>
                            <Toggle active={notifications.email} onChange={() => setNotifications({ ...notifications, email: !notifications.email })} />
                        </div>
                        <div className="flex items-center justify-between pb-6 border-b border-slate-50 last:border-0 last:pb-0">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                                    <Smartphone className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-700">Push Notifications</p>
                                    <p className="text-xs text-slate-400">Real-time alerts for marketplace activity</p>
                                </div>
                            </div>
                            <Toggle active={notifications.push} onChange={() => setNotifications({ ...notifications, push: !notifications.push })} />
                        </div>
                    </div>
                </NGOCard>

                {/* Security & Access */}
                <NGOCard>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                            <Shield className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-slate-800">Security & Access</h2>
                            <p className="text-slate-400 font-medium text-sm">Protect your organization's account</p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between pb-6 border-b border-slate-50">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                                    <Lock className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-700">Two-Factor Authentication</p>
                                    <p className="text-xs text-slate-400">Add an extra layer of security</p>
                                </div>
                            </div>
                            <Toggle active={security.twoFactor} onChange={() => setSecurity({ ...security, twoFactor: !security.twoFactor })} />
                        </div>

                        <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-cyan-600 transition-colors">
                                    <CreditCard className="w-4 h-4" />
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-slate-800">Wallet Permissions</p>
                                    <p className="text-xs text-slate-400">Manage connected wallet allowances</p>
                                </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-cyan-600 transition-colors" />
                        </button>
                    </div>
                </NGOCard>

                {/* Data & API */}
                <NGOCard>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-violet-50 text-violet-600 rounded-xl flex items-center justify-center">
                            <Database className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-slate-800">Data Management</h2>
                            <p className="text-slate-400 font-medium text-sm">Exports and API keys</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl hover:border-cyan-200 hover:shadow-sm transition-all text-left group">
                            <div>
                                <p className="font-bold text-slate-800 group-hover:text-cyan-700">Export All Data</p>
                                <p className="text-xs text-slate-400">CSV/PDF formats</p>
                            </div>
                            <Download className="w-5 h-5 text-slate-300 group-hover:text-cyan-600" />
                        </button>
                        <button className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl hover:border-red-200 hover:bg-red-50/30 transition-all text-left group">
                            <div>
                                <p className="font-bold text-slate-800 group-hover:text-red-600">Delete Account</p>
                                <p className="text-xs text-slate-400">Permanently remove data</p>
                            </div>
                            <Trash2 className="w-5 h-5 text-slate-300 group-hover:text-red-500" />
                        </button>
                    </div>
                </NGOCard>
            </div>
        </NGOLayout>
    );
};

export default NGOSettings;
