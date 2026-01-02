import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Calendar, Download } from 'lucide-react';

const ImpactReports: React.FC = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#0f172a' }}>Impact Reports</h1>
                <p style={{ color: '#64748b' }}>Comprehensive visualization of environmental and community impact milestones.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                {[
                    { label: 'CO2 Sequestered', value: '12,450 Tons', icon: <TrendingUp size={20} />, color: '#10b981' },
                    { label: 'Trees Planted', value: '45,000+', icon: <BarChart3 size={20} />, color: '#3b82f6' },
                    { label: 'Communities Impacted', value: '12', icon: <Calendar size={20} />, color: '#8b5cf6' }
                ].map((stat, i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                            <div style={{ color: stat.color }}>{stat.icon}</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <CardTitle>Recent Impact Milestones</CardTitle>
                        <button style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            background: '#f1f5f9',
                            border: 'none',
                            fontSize: '0.875rem',
                            cursor: 'pointer'
                        }}>
                            <Download size={16} /> Export Report
                        </button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div style={{ color: '#64748b', textAlign: 'center', padding: '4rem' }}>
                        <BarChart3 size={48} style={{ margin: '0 auto 1rem', opacity: 0.2 }} />
                        <p>No detailed reports available for the current period.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ImpactReports;
