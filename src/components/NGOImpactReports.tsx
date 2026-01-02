import React from 'react';
import NGOLayout from './shared/NGOLayout';
import NGOCard from './shared/NGOCard';
import {
    FileText,
    Download,
    TrendingUp,
    Calendar,
    ArrowUpRight,
    PieChart,
    BarChart3
} from 'lucide-react';

const NGOImpactReports = () => {
    const reports = [
        { id: 1, title: 'Annual Impact Report 2024', date: 'Dec 15, 2024', size: '2.4 MB', type: 'Annual' },
        { id: 2, title: 'Q3 Progress Report', date: 'Oct 01, 2024', size: '1.8 MB', type: 'Quarterly' },
        { id: 3, title: 'Mangrove Restoration Audit', date: 'Aug 20, 2024', size: '5.2 MB', type: 'Audit' },
    ];

    return (
        <NGOLayout>
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">Impact <span className="text-cyan-600">Reports</span></h1>
                <p className="text-slate-500 font-medium text-lg">Track, visualize, and export your conservation data.</p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <NGOCard className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white border-none shadow-cyan-200">
                    <div className="flex items-center gap-3 mb-2 opacity-80">
                        <FileText className="w-5 h-5" />
                        <span className="font-bold text-sm uppercase tracking-wide">Reports Generated</span>
                    </div>
                    <div className="text-3xl font-black mb-1">24</div>
                    <div className="text-xs font-medium bg-white/20 inline-block px-2 py-1 rounded-lg">All time</div>
                </NGOCard>
                <NGOCard>
                    <div className="flex items-center gap-3 mb-2 text-slate-400">
                        <TrendingUp className="w-5 h-5" />
                        <span className="font-bold text-sm uppercase tracking-wide">Data Accuracy</span>
                    </div>
                    <div className="text-3xl font-black mb-1 text-slate-800">98.5%</div>
                    <div className="text-xs font-bold text-emerald-500 inline-flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3" /> Validated
                    </div>
                </NGOCard>
                <NGOCard>
                    <div className="flex items-center gap-3 mb-2 text-slate-400">
                        <Calendar className="w-5 h-5" />
                        <span className="font-bold text-sm uppercase tracking-wide">Next Submission</span>
                    </div>
                    <div className="text-3xl font-black mb-1 text-slate-800">14 Days</div>
                    <div className="text-xs font-bold text-amber-500 inline-flex items-center gap-1">
                        Due Jan 15
                    </div>
                </NGOCard>
            </div>

            {/* Reports List */}
            <NGOCard>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-black text-slate-800">Report Archive</h2>
                    <button className="text-sm font-bold text-cyan-600 hover:text-cyan-700 transition-colors">View All</button>
                </div>
                <div className="space-y-4">
                    {reports.map((report) => (
                        <div key={report.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-cyan-200 transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-cyan-600 shadow-sm border border-slate-100 group-hover:bg-cyan-50 transition-colors">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800 group-hover:text-cyan-700 transition-colors">{report.title}</h3>
                                    <div className="flex items-center gap-3 text-xs font-medium text-slate-400 mt-1">
                                        <span className="bg-white px-2 py-0.5 rounded border border-slate-200">{report.type}</span>
                                        <span>•</span>
                                        <span>{report.date}</span>
                                        <span>•</span>
                                        <span>{report.size}</span>
                                    </div>
                                </div>
                            </div>
                            <button className="p-3 rounded-xl bg-white text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 transition-all border border-slate-200 hover:border-cyan-200 shadow-sm">
                                <Download className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
            </NGOCard>
        </NGOLayout>
    );
};

export default NGOImpactReports;
