
import React from 'react';
import { UserRole, User } from '../types';
import { getHealthAssistantResponse } from '../services/geminiService';
import { BrainCircuit, Sparkles, TrendingUp, Users, Calendar, Activity, Bed, DollarSign, ShieldAlert } from 'lucide-react';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [aiTip, setAiTip] = React.useState<string>("Analyzing operational data...");
  const [isLoadingAi, setIsLoadingAi] = React.useState(false);

  React.useEffect(() => {
    const fetchAiTip = async () => {
      setIsLoadingAi(true);
      const tip = await getHealthAssistantResponse(
        `Provide a high-level MIS report highlight for a ${user.role} in a large tertiary hospital. Focus on operational excellence, NABH compliance, or revenue leakage prevention.`,
        user.role
      );
      setAiTip(tip || "Maintain strict audit trails for all clinical procedures.");
      setIsLoadingAi(false);
    };
    fetchAiTip();
  }, [user.role]);

  const stats = [
    { label: 'Bed Occupancy', value: '84%', icon: <Bed size={18}/>, trend: '+2.4%', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Daily Revenue', value: '₹42,500', icon: <DollarSign size={18}/>, trend: '+15%', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Patient Footfall', value: '312', icon: <Users size={18}/>, trend: '-3.1%', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'NABH Audit Compliance', value: '98.2%', icon: <ShieldAlert size={18}/>, trend: '+0.5%', color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color}`}>
                {stat.icon}
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-2xl font-black text-slate-800 tracking-tight">{stat.value}</p>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-500/30 rounded-xl backdrop-blur-md">
                  <BrainCircuit size={24} className="text-indigo-200" />
                </div>
                <h3 className="text-sm font-bold tracking-[0.2em] text-indigo-200 uppercase">AI-Powered MIS Intelligence</h3>
              </div>
              
              {isLoadingAi ? (
                <div className="space-y-3">
                  <div className="h-4 bg-white/10 rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-white/10 rounded w-1/2 animate-pulse"></div>
                </div>
              ) : (
                <div className="flex gap-4">
                  <Sparkles size={32} className="text-amber-400 shrink-0 mt-1" />
                  <p className="text-lg md:text-xl font-medium leading-relaxed italic opacity-90">
                    "{aiTip}"
                  </p>
                </div>
              )}
              
              <div className="mt-8 flex gap-3">
                <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-sm font-bold rounded-xl transition-all shadow-lg shadow-indigo-900/50">
                  Generate Full Report
                </button>
                <button className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-sm font-bold rounded-xl backdrop-blur-sm transition-all">
                  View Data Source
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Activity size={18} className="text-indigo-600" />
              Real-Time Unit Activity
            </h3>
            <div className="space-y-6">
              {[
                { label: 'Emergency Response', status: 'CRITICAL', value: 88, color: 'bg-red-500' },
                { label: 'Operation Theater Utilization', status: 'HIGH', value: 72, color: 'bg-amber-500' },
                { label: 'Outpatient Throughput', status: 'OPTIMAL', value: 94, color: 'bg-emerald-500' },
                { label: 'Radiology Backlog', status: 'LOW', value: 12, color: 'bg-blue-500' },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-xs font-bold text-slate-700">{item.label}</span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded ${
                      item.status === 'CRITICAL' ? 'bg-red-100 text-red-600' : 
                      item.status === 'HIGH' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                    }`}>{item.status}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full transition-all duration-1000`} style={{ width: `${item.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-4">Patient Demographics</h3>
            <div className="aspect-square flex items-center justify-center relative">
              <div className="w-40 h-40 rounded-full border-[12px] border-slate-100 border-t-indigo-500 border-r-blue-400 border-b-emerald-400 animate-spin-slow"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-slate-800">42%</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">IPD Patients</span>
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">OPD Appointments</span>
                <span className="font-bold">58%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Emergency Visits</span>
                <span className="font-bold">12%</span>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-6">
            <h3 className="text-xs font-black text-indigo-900 uppercase tracking-widest mb-4">Quick Governance</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-white rounded-xl border border-indigo-100 text-xs font-bold text-indigo-600 hover:shadow-md transition-shadow">
                Initiate Quality Audit
              </button>
              <button className="w-full text-left p-3 bg-white rounded-xl border border-indigo-100 text-xs font-bold text-indigo-600 hover:shadow-md transition-shadow">
                View Staff Attendance
              </button>
              <button className="w-full text-left p-3 bg-white rounded-xl border border-indigo-100 text-xs font-bold text-indigo-600 hover:shadow-md transition-shadow">
                Escalation Logs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
