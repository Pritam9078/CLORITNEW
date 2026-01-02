import React, { useState } from 'react';
import CorporateBuyerLayout from './shared/CorporateBuyerLayout';
import CorporateBuyerCard from './shared/CorporateBuyerCard';
import {
    Building2,
    Mail,
    Phone,
    Globe,
    MapPin,
    Users,
    Award,
    Wallet,
    ShieldCheck,
    Edit,
    Save
} from 'lucide-react';

const CorporateBuyerProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [companyData, setCompanyData] = useState({
        name: 'Acme Corporation',
        industry: 'Technology',
        email: 'sustainability@acmecorp.com',
        phone: '+91 98765 43210',
        website: 'www.acmecorp.com',
        address: 'Tech Park, Bangalore, Karnataka 560001',
        employees: '5,000+',
        founded: '1995',
        walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
        kybStatus: 'Verified',
        sustainabilityTargets: {
            netZero: '2030',
            plasticNeutral: '2026',
            renewableEnergy: '100% by 2028'
        }
    });

    const handleSave = () => {
        setIsEditing(false);
        alert('Company profile updated successfully!');
    };

    return (
        <CorporateBuyerLayout>
            <div className="mb-10">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">
                            Company <span className="text-blue-600">Profile</span>
                        </h1>
                        <p className="text-slate-500 font-medium text-lg">
                            Manage your company information and sustainability targets
                        </p>
                    </div>
                    <button
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${isEditing
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                    >
                        {isEditing ? (
                            <>
                                <Save className="w-5 h-5" />
                                Save Changes
                            </>
                        ) : (
                            <>
                                <Edit className="w-5 h-5" />
                                Edit Profile
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Company Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Information */}
                    <CorporateBuyerCard>
                        <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
                            <Building2 className="w-6 h-6 text-blue-600" />
                            Company Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                                    Company Name
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={companyData.name}
                                        onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
                                        className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                ) : (
                                    <div className="text-lg font-bold text-slate-800">{companyData.name}</div>
                                )}
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                                    Industry
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={companyData.industry}
                                        onChange={(e) => setCompanyData({ ...companyData, industry: e.target.value })}
                                        className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                ) : (
                                    <div className="text-lg font-bold text-slate-800">{companyData.industry}</div>
                                )}
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                                    Email
                                </label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        value={companyData.email}
                                        onChange={(e) => setCompanyData({ ...companyData, email: e.target.value })}
                                        className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                ) : (
                                    <div className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-slate-400" />
                                        {companyData.email}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                                    Phone
                                </label>
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        value={companyData.phone}
                                        onChange={(e) => setCompanyData({ ...companyData, phone: e.target.value })}
                                        className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                ) : (
                                    <div className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-slate-400" />
                                        {companyData.phone}
                                    </div>
                                )}
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                                    Website
                                </label>
                                {isEditing ? (
                                    <input
                                        type="url"
                                        value={companyData.website}
                                        onChange={(e) => setCompanyData({ ...companyData, website: e.target.value })}
                                        className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                ) : (
                                    <div className="text-lg font-semibold text-blue-600 flex items-center gap-2">
                                        <Globe className="w-4 h-4" />
                                        {companyData.website}
                                    </div>
                                )}
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                                    Address
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={companyData.address}
                                        onChange={(e) => setCompanyData({ ...companyData, address: e.target.value })}
                                        className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                ) : (
                                    <div className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-slate-400" />
                                        {companyData.address}
                                    </div>
                                )}
                            </div>
                        </div>
                    </CorporateBuyerCard>

                    {/* Sustainability Targets */}
                    <CorporateBuyerCard>
                        <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
                            <Award className="w-6 h-6 text-emerald-600" />
                            Sustainability Targets
                        </h2>
                        <div className="space-y-4">
                            {Object.entries(companyData.sustainabilityTargets).map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl">
                                    <span className="font-bold text-slate-800 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                    <span className="text-emerald-600 font-bold">{value}</span>
                                </div>
                            ))}
                        </div>
                    </CorporateBuyerCard>
                </div>

                {/* Right Column - Stats & Verification */}
                <div className="space-y-6">
                    {/* Company Stats */}
                    <CorporateBuyerCard>
                        <h3 className="text-lg font-black text-slate-800 mb-4">Company Stats</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="text-xs text-slate-500 uppercase mb-1">Employees</div>
                                <div className="text-2xl font-black text-slate-800 flex items-center gap-2">
                                    <Users className="w-5 h-5 text-blue-600" />
                                    {companyData.employees}
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-slate-500 uppercase mb-1">Founded</div>
                                <div className="text-2xl font-black text-slate-800">{companyData.founded}</div>
                            </div>
                        </div>
                    </CorporateBuyerCard>

                    {/* Verification Status */}
                    <CorporateBuyerCard className="bg-emerald-50 border-emerald-200">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center">
                                <ShieldCheck className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="text-xs text-emerald-600 uppercase font-bold">KYB Status</div>
                                <div className="text-lg font-black text-emerald-700">{companyData.kybStatus}</div>
                            </div>
                        </div>
                        <p className="text-sm text-emerald-700">
                            Your company has been verified by CLORIT Protocol. All transactions are blockchain-verified.
                        </p>
                    </CorporateBuyerCard>

                    {/* Wallet Info */}
                    <CorporateBuyerCard>
                        <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
                            <Wallet className="w-5 h-5 text-blue-600" />
                            Wallet Address
                        </h3>
                        <div className="p-4 bg-slate-50 rounded-xl">
                            <div className="font-mono text-xs text-slate-600 break-all mb-2">
                                {companyData.walletAddress}
                            </div>
                            <button className="text-xs text-blue-600 font-bold hover:text-blue-700">
                                View on Etherscan →
                            </button>
                        </div>
                    </CorporateBuyerCard>
                </div>
            </div>
        </CorporateBuyerLayout>
    );
};

export default CorporateBuyerProfile;
