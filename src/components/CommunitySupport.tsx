import React, { useState } from 'react';
import {
  MessageCircle,
  Users,
  Phone,
  Mail,
  FileText,
  Star,
  Clock,
  CheckCircle2,
  AlertCircle,
  Send,
  Search,
  Filter,
  MapPin,
  Calendar,
  User,
  Headphones,
  BookOpen,
  Video,
  PlusCircle,
  ChevronRight,
  LifeBuoy,
  MessageSquare,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  Download,
  Shield,
  Zap,
  ArrowRight,
  PlayCircle
} from 'lucide-react';

import CommunityLayout from './shared/CommunityLayout';
import CommunityCard from './shared/CommunityCard';

// ---------------------------
// Interfaces
// ---------------------------
interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  category: 'technical' | 'documentation' | 'training' | 'payment' | 'general';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  createdDate: string;
  lastUpdate: string;
}

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'document' | 'guide';
  duration?: string;
  tag?: string;
}

const CommunitySupport: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'help' | 'tickets' | 'resources'>('help');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'technical', title: 'Technical Help', description: 'Platform issues & integration', icon: Headphones, color: 'text-blue-500', bg: 'bg-blue-50/50' },
    { id: 'payment', title: 'Credits & Rewards', description: 'CLB earnings & redemptions', icon: Zap, color: 'text-emerald-500', bg: 'bg-emerald-50/50' },
    { id: 'training', title: 'Skills & Academy', description: 'Practical plantation guides', icon: BookOpen, color: 'text-amber-500', bg: 'bg-amber-50/50' },
    { id: 'general', title: 'Community Hub', description: 'General questions & feedback', icon: Users, color: 'text-purple-500', bg: 'bg-purple-50/50' },
  ];

  const tickets: SupportTicket[] = [
    {
      id: 'TCK-001',
      subject: 'Drone survey upload failure',
      description: 'The system times out when uploading large orthomosaic files (above 500MB).',
      category: 'technical',
      priority: 'high',
      status: 'in_progress',
      createdDate: '2025-10-15',
      lastUpdate: '2025-10-18',
    },
    {
      id: 'TCK-002',
      subject: 'Inconsistent credit valuation',
      description: 'Requested verification for Sector B but credits showing as pending for 10 days.',
      category: 'payment',
      priority: 'urgent',
      status: 'open',
      createdDate: '2025-10-16',
      lastUpdate: '2025-10-18',
    }
  ];

  const resources: Resource[] = [
    { id: 'r1', title: 'Mangrove Planting Masterclass', description: 'Comprehensive guide on species-specific techniques for coastal zones.', type: 'video', duration: '18 min', tag: 'Must Watch' },
    { id: 'r2', title: 'Credit Redemption Protocol', description: 'Official documentation for transforming CLB to local grants.', type: 'document', tag: 'Essential' },
    { id: 'r3', title: 'AI Field Kit Guide', description: 'How to use our specialized AI tools for soil analysis.', type: 'guide' },
  ];

  return (
    <CommunityLayout>
      {/* Page Header (Hero Section) */}
      <div className="relative mb-16 rounded-[3rem] bg-slate-900 p-8 md:p-16 text-white overflow-hidden shadow-2xl">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -mr-40 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[80px] -ml-20 -mb-20" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
            <LifeBuoy className="w-4 h-4 text-emerald-400" />
            Empowerment Support Center
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-8">
            How can we <span className="text-emerald-400 italic">assist</span> you?
          </h1>

          {/* Enhanced Search Bar */}
          <div className="w-full relative group">
            <div className="absolute inset-0 bg-emerald-400/20 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-500 group-focus-within:text-emerald-400 transition-colors z-20" />
            <input
              type="text"
              placeholder="Search documentation, FAQS, or track your tickets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-18 py-6 pl-16 pr-8 bg-white/10 backdrop-blur-2xl border-2 border-white/10 rounded-3xl font-bold text-white placeholder:text-slate-500 focus:border-emerald-400 transition-all outline-none relative z-10"
            />
          </div>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="max-w-6xl mx-auto">
        <div className="flex bg-white/50 backdrop-blur-md p-2 rounded-3xl mb-12 w-fit mx-auto border border-slate-100 shadow-sm">
          <button
            onClick={() => setActiveTab('help')}
            className={`flex items-center gap-2 px-8 py-4 rounded-2xl text-xs font-black transition-all tracking-widest ${activeTab === 'help'
              ? 'bg-slate-900 text-white shadow-xl'
              : 'text-slate-400 hover:bg-slate-50'
              }`}
          >
            🚑 OVERVIEW
          </button>
          <button
            onClick={() => setActiveTab('tickets')}
            className={`flex items-center gap-2 px-8 py-4 rounded-2xl text-xs font-black transition-all tracking-widest ${activeTab === 'tickets'
              ? 'bg-slate-900 text-white shadow-xl'
              : 'text-slate-400 hover:bg-slate-50'
              }`}
          >
            📋 MY TICKETS
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`flex items-center gap-2 px-8 py-4 rounded-2xl text-xs font-black transition-all tracking-widest ${activeTab === 'resources'
              ? 'bg-slate-900 text-white shadow-xl'
              : 'text-slate-400 hover:bg-slate-50'
              }`}
          >
            📚 ACADEMY
          </button>
        </div>

        {activeTab === 'help' && (
          <div className="animate-in fade-in slide-in-from-bottom-5 duration-700 space-y-16">

            {/* CATEGORIES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {categories.map((cat) => (
                <button key={cat.id} className="group relative bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-100/50 transition-all duration-300 text-left overflow-hidden">
                  <div className={`absolute top-0 right-0 w-24 h-24 ${cat.bg} rounded-full blur-2xl -mr-12 -mt-12 opacity-0 group-hover:opacity-100 transition-opacity`} />

                  <div className={`w-14 h-14 ${cat.bg} ${cat.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform relative z-10 shadow-sm`}>
                    <cat.icon className="w-7 h-7" />
                  </div>

                  <h4 className="text-sm font-black text-slate-800 tracking-tight mb-2 uppercase group-hover:text-emerald-600 transition-colors">{cat.title}</h4>
                  <p className="text-xs font-bold text-slate-400 leading-relaxed mb-6 italic opacity-80 group-hover:opacity-100 transition-opacity">
                    {cat.description}
                  </p>

                  <span className="inline-flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase tracking-widest translate-x-0 group-hover:translate-x-2 transition-transform">
                    REACH OUT <ArrowRight className="w-3 h-3" />
                  </span>
                </button>
              ))}
            </div>

            {/* AI ASSISTANT PROMO */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-500 rounded-[3rem] p-10 md:p-16 text-white relative shadow-2xl overflow-hidden group">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -mr-40 -mt-20 group-hover:scale-110 transition-transform duration-[3s]" />

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                <div className="w-32 h-32 md:w-48 md:h-48 bg-white/20 backdrop-blur-xl rounded-[3rem] border border-white/30 flex items-center justify-center relative overflow-hidden flex-shrink-0 animate-pulse">
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-400/40 to-transparent" />
                  <Zap className="w-16 h-16 md:w-24 md:h-24 text-white" />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                    Beta Access Available
                  </div>
                  <h3 className="text-3xl md:text-5xl font-black tracking-tighter mb-6 leading-none">
                    Meet the AI <span className="italic">Eco-Assistant</span>
                  </h3>
                  <p className="text-emerald-50 text-lg font-medium leading-relaxed max-w-xl opacity-90 mb-10">
                    Get instant morphological analysis of your site data, credit projections, and expert planting advice through our integrated Gemini-powered AI.
                  </p>
                  <button className="h-16 px-10 bg-white text-emerald-600 rounded-[2rem] font-black text-sm tracking-[0.2em] shadow-xl shadow-emerald-900/10 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                    LAUNCH AI ASSISTANT <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* FAQS PREVIEW */}
            <div className="px-4">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-2xl font-black text-slate-800 tracking-tight uppercase italic underline decoration-emerald-500/30 underline-offset-8 decoration-4">Persistent Questions</h3>
                <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-emerald-500 transition-colors">View Knowledge Base</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  'How is the carbon sequestration calculated?',
                  'Can I register multiple non-contiguous land parcels?',
                  'What documents are needed for NGO verification?',
                  'How long does a manual audit take?'
                ].map((q, i) => (
                  <div key={i} className="group p-6 bg-white border border-slate-100 rounded-[2rem] hover:border-emerald-100 transition-all flex items-start gap-4">
                    <div className="w-8 h-8 rounded-xl bg-slate-50 group-hover:bg-emerald-50 text-slate-400 group-hover:text-emerald-500 flex items-center justify-center flex-shrink-0 font-black text-sm transition-colors">
                      ?
                    </div>
                    <div className="flex-1">
                      <h5 className="font-black text-slate-800 tracking-tight text-sm mb-2 group-hover:text-emerald-600 transition-colors">{q}</h5>
                      <p className="text-xs text-slate-400 font-bold italic line-clamp-1 opacity-60">View detailed answer and resolution steps...</p>
                    </div>
                    <ChevronDown className="w-5 h-5 text-slate-200 group-hover:text-emerald-500 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tickets' && (
          <div className="animate-in fade-in slide-in-from-bottom-5 duration-700 space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4">
              <div>
                <h3 className="text-3xl font-black text-slate-800 tracking-tight uppercase italic underline decoration-emerald-500/30 underline-offset-8 decoration-4 mb-2">Ongoing Support</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Monitoring active resolutions</p>
              </div>
              <button className="h-16 px-10 bg-slate-900 text-white rounded-[2rem] font-black text-sm tracking-[0.2em] shadow-xl shadow-slate-200 hover:bg-emerald-500 transition-all active:scale-95 flex items-center gap-3">
                <PlusCircle className="w-5 h-5" /> NEW TICKET
              </button>
            </div>

            <div className="space-y-6">
              {tickets.map(ticket => (
                <div key={ticket.id} className="group relative bg-white rounded-[3rem] p-8 border border-slate-100 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-100/50 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm ${ticket.priority === 'urgent' ? 'bg-red-500 text-white' :
                            ticket.priority === 'high' ? 'bg-amber-400 text-slate-900' :
                              'bg-blue-500 text-white'
                          }`}>
                          {ticket.priority} PRIORITY
                        </span>
                        <span className="px-4 py-1.5 bg-slate-100 text-slate-500 rounded-full text-[9px] font-black uppercase tracking-widest">
                          ID: {ticket.id}
                        </span>
                      </div>

                      <h4 className="text-2xl font-black text-slate-800 tracking-tight mb-3 group-hover:text-emerald-600 transition-colors uppercase">
                        {ticket.subject}
                      </h4>
                      <p className="text-slate-500 font-medium leading-relaxed italic mb-6 text-sm opacity-80">
                        "{ticket.description}"
                      </p>

                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-slate-400">
                          <Calendar className="w-4 h-4" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Created: {ticket.createdDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-500">
                          <Clock className="w-4 h-4" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Modified: {ticket.lastUpdate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-8 md:border-l border-slate-50 md:pl-12">
                      <div className="text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Resolution Status</p>
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-xs ${ticket.status === 'in_progress' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                            ticket.status === 'open' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                              'bg-slate-50 text-slate-400'
                          }`}>
                          <div className={`w-2 h-2 rounded-full ${ticket.status === 'in_progress' ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
                          {ticket.status.replace('_', ' ').toUpperCase()}
                        </div>
                      </div>

                      <button className="w-16 h-16 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center hover:bg-emerald-500 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-slate-200">
                        <ChevronRight className="w-8 h-8" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="animate-in fade-in slide-in-from-bottom-5 duration-700 space-y-16">

            {/* FEATURED TUTORIAL (ENHANCED) */}
            <div className="relative h-[480px] rounded-[4rem] overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10" />
              <img
                src="https://images.unsplash.com/photo-1544654803-b69140b285a1?q=80&w=1470&auto=format&fit=crop"
                alt="Mangrove Planting"
                className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-110 transition-transform duration-[4s]"
              />

              <div className="relative z-20 h-full p-12 flex flex-col justify-end">
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="bg-emerald-500 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">New Module</span>
                  <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest border border-white/20">Intermediate</span>
                </div>

                <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 max-w-4xl leading-tight">
                  Maximizing <span className="text-emerald-400">Biological</span> Carbon Sink Density
                </h3>

                <div className="flex flex-col md:flex-row md:items-center gap-8">
                  <p className="text-slate-300 text-lg font-medium leading-relaxed max-w-xl">
                    Master the advanced spatial arrangements and mixed-species planting patterns derived from recent satellite telemetry data.
                  </p>
                  <button className="h-20 px-12 bg-white text-slate-900 rounded-[2.5rem] font-black text-sm tracking-[0.2em] hover:bg-emerald-400 hover:scale-105 active:scale-95 transition-all shadow-2xl shrink-0 flex items-center gap-4">
                    <PlayCircle className="w-8 h-8 text-emerald-600" /> START CLASS
                  </button>
                </div>
              </div>
            </div>

            {/* RESOURCE GALLERY */}
            <div>
              <div className="flex items-center justify-between mb-10 px-4">
                <h3 className="text-2xl font-black text-slate-800 tracking-tight uppercase italic underline decoration-emerald-500/30 underline-offset-8 decoration-4">Library Assets</h3>
                <div className="flex gap-2">
                  <button className="w-12 h-12 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-emerald-600 transition-colors shadow-sm"><Filter className="w-5 h-5" /></button>
                  <button className="w-12 h-12 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-emerald-600 transition-colors shadow-sm"><Search className="w-5 h-5" /></button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {resources.map(res => (
                  <div key={res.id} className="group bg-white rounded-[3rem] p-8 border border-slate-100 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-100/50 transition-all duration-300 flex flex-col h-full">
                    <div className="relative w-full aspect-video rounded-[2rem] bg-slate-100 mb-8 overflow-hidden">
                      <div className={`absolute inset-0 flex items-center justify-center ${res.type === 'video' ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'
                        }`}>
                        {res.type === 'video' ? <Video className="w-10 h-10 group-hover:scale-125 transition-transform" /> : <FileText className="w-10 h-10 group-hover:scale-125 transition-transform" />}
                      </div>
                      {res.tag && (
                        <div className="absolute top-4 left-4 px-3 py-1 bg-slate-900 text-white text-[8px] font-black uppercase tracking-widest rounded-full z-10 shadow-lg">
                          {res.tag}
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <h4 className="text-xl font-black text-slate-800 tracking-tight mb-3 group-hover:text-emerald-600 transition-colors uppercase leading-none">
                        {res.title}
                      </h4>
                      <p className="text-slate-500 text-xs font-bold leading-relaxed mb-8 italic opacity-70">
                        "{res.description}"
                      </p>
                    </div>

                    <div className="pt-6 border-t border-slate-50 flex items-center justify-between mt-auto">
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest group-hover:text-emerald-600 transition-colors italic">
                        {res.duration || res.type.toUpperCase()}
                      </span>
                      <button className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all shadow-sm">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* QUICK CONTACT FLOATING (STUCK TO BOTTOM RIGHT) */}
      <div className="fixed bottom-10 right-10 z-[100] group">
        <div className="absolute bottom-full right-0 mb-6 flex flex-col items-end gap-3 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
          <button className="pointer-events-auto h-14 pl-6 pr-6 bg-white text-slate-900 rounded-2xl font-black text-xs tracking-widest shadow-2xl border border-slate-100 flex items-center gap-3 hover:bg-emerald-500 hover:text-white transition-all active:scale-95">
            <Phone className="w-4 h-4" /> CALL SUPPORT
          </button>
          <button className="pointer-events-auto h-14 pl-6 pr-6 bg-white text-slate-900 rounded-2xl font-black text-xs tracking-widest shadow-2xl border border-slate-100 flex items-center gap-3 hover:bg-emerald-500 hover:text-white transition-all active:scale-95">
            <Mail className="w-4 h-4" /> EMAIL HELPDESK
          </button>
        </div>
        <button className="w-20 h-20 bg-slate-900 text-white rounded-[2rem] shadow-2xl flex items-center justify-center hover:bg-emerald-500 hover:rotate-[360deg] transition-all duration-500 group-hover:shadow-emerald-200">
          <MessageCircle className="w-8 h-8" />
        </button>
      </div>
    </CommunityLayout>
  );
};

export default CommunitySupport;
