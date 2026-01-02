import React, { useState } from 'react';
import NGOLayout from './shared/NGOLayout';
import NGOCard from './shared/NGOCard';
import {
    Search,
    Filter,
    ArrowUpRight,
    TrendingUp,
    Leaf,
    Shield,
    Globe,
    ShoppingCart,
    Heart,
    DollarSign,
    Tag
} from 'lucide-react';

const NGOMarketplace = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', 'Blue Carbon', 'Reforestation', 'Credit Packs', 'Services'];

    const marketplaceItems = [
        {
            id: 1,
            title: "Mangrove Restoration Phase 2",
            ngo: "Sundarbans Foundation",
            price: 25,
            currency: "CCT",
            type: "Blue Carbon",
            impact: "500t CO2 Offset",
            verified: true,
            imageFromCategory: true
        },
        {
            id: 2,
            title: "Coastal Seedlings Pack",
            ngo: "Green Earth Initiative",
            price: 150,
            currency: "USDT",
            type: "Reforestation",
            impact: "1000 Saplings",
            verified: true,
            imageFromCategory: true
        },
        {
            id: 3,
            title: "Premium Carbon Credits Batch #42",
            ngo: "Carbon Exchange",
            price: 12.50,
            currency: "CCT",
            type: "Credit Packs",
            impact: "Verified NCCR",
            verified: true,
            imageFromCategory: true
        }
    ];

    return (
        <NGOLayout>
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">NGO <span className="text-cyan-600">Marketplace</span></h1>
                <p className="text-slate-500 font-medium text-lg">Trade credits, fund projects, and access conservation resources.</p>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search projects, credits, or services..."
                        className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-slate-800 font-bold focus:border-cyan-500 outline-none shadow-sm transition-all"
                    />
                </div>

                {/* Filters */}
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-4 rounded-2xl font-bold whitespace-nowrap transition-all ${activeCategory === cat
                                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-200'
                                    : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-200'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                    <button className="px-4 py-4 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-cyan-600 transition-colors">
                        <Filter className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Featured Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-200">
                    <div className="flex items-center gap-3 mb-2 opacity-80">
                        <TrendingUp className="w-5 h-5" />
                        <span className="font-bold text-sm uppercase tracking-wide">Market Volume</span>
                    </div>
                    <div className="text-3xl font-black mb-1">$2.4M</div>
                    <div className="text-xs font-medium bg-white/20 inline-block px-2 py-1 rounded-lg">+12.5% this week</div>
                </div>
                <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-cyan-200">
                    <div className="flex items-center gap-3 mb-2 opacity-80">
                        <Leaf className="w-5 h-5" />
                        <span className="font-bold text-sm uppercase tracking-wide">Active Listings</span>
                    </div>
                    <div className="text-3xl font-black mb-1">1,240</div>
                    <div className="text-xs font-medium bg-white/20 inline-block px-2 py-1 rounded-lg">85 New today</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-3xl p-6 text-slate-800 shadow-xl shadow-slate-100">
                    <div className="flex items-center gap-3 mb-2 text-slate-400">
                        <DollarSign className="w-5 h-5" />
                        <span className="font-bold text-sm uppercase tracking-wide">Avg Price / Ton</span>
                    </div>
                    <div className="text-3xl font-black mb-1 text-slate-800">$12.85</div>
                    <div className="text-xs font-bold text-emerald-500 inline-flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3" /> +2.4%
                    </div>
                </div>
            </div>

            {/* Listings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {marketplaceItems.map((item) => (
                    <NGOCard key={item.id} className="group p-0 overflow-hidden hover:scale-[1.02] transition-transform duration-300">
                        <div className="h-48 bg-slate-100 relative">
                            {/* Decorative Background Pattern */}
                            <div className={`absolute inset-0 opacity-10 ${item.type === 'Blue Carbon' ? 'bg-blue-500' :
                                    item.type === 'Reforestation' ? 'bg-emerald-500' : 'bg-amber-500'
                                }`}></div>

                            <div className="absolute inset-0 flex items-center justify-center">
                                {item.type === 'Blue Carbon' && <Globe className="w-16 h-16 text-blue-300/50" />}
                                {item.type === 'Reforestation' && <Leaf className="w-16 h-16 text-emerald-300/50" />}
                                {item.type === 'Credit Packs' && <Tag className="w-16 h-16 text-amber-300/50" />}
                            </div>

                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wide shadow-sm flex items-center gap-1.5 text-slate-700">
                                {item.verified && <Shield className="w-3 h-3 text-cyan-500" />} Verified
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg ${item.type === 'Blue Carbon' ? 'bg-blue-50 text-blue-600' :
                                        item.type === 'Reforestation' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                                    }`}>
                                    {item.type}
                                </span>
                            </div>

                            <h3 className="text-lg font-black text-slate-800 mb-1 group-hover:text-cyan-700 transition-colors">{item.title}</h3>
                            <p className="text-sm font-medium text-slate-400 mb-4">{item.ngo}</p>

                            <div className="flex items-center gap-3 mb-6 text-xs font-bold text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                <span className="flex items-center gap-1"><Leaf className="w-3 h-3 text-emerald-500" /> {item.impact}</span>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                <div>
                                    <span className="text-xl font-black text-slate-800">{item.price}</span>
                                    <span className="text-xs font-bold text-slate-400 ml-1">{item.currency}</span>
                                </div>
                                <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-cyan-600 transition-all shadow-lg shadow-slate-200 hover:shadow-cyan-200">
                                    <ShoppingCart className="w-3.5 h-3.5" /> Buy Now
                                </button>
                            </div>
                        </div>
                    </NGOCard>
                ))}
            </div>
        </NGOLayout>
    );
};

export default NGOMarketplace;
