
import React, { useState } from 'react';
import { InventoryItem, Bed, PatientRecord, InsuranceClaim, Prescription, User, UserRole, LabTest } from '../types';
import { 
  Package, Plus, Search, FileText, CheckCircle, Clock, 
  AlertCircle, Calendar, Bed as BedIcon, User as UserIcon, 
  History, ShieldCheck, Pill, UserPlus, Filter, MoreHorizontal, 
  Mail, Shield, BarChart3, TrendingUp, Zap, TestTube2, ArrowUpRight,
  Stethoscope, Activity, X, DollarSign, CreditCard, ArrowDownRight,
  Truck, Save, UserCheck, MoveRight, MessageSquare, Send, Timer, Heart,
  Users
} from 'lucide-react';

// --- Reusable Modal Component ---
const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20 animate-in zoom-in-95 duration-200">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400">
            <X size={20} />
          </button>
        </div>
        <div className="p-8 overflow-y-auto max-h-[80vh]">{children}</div>
      </div>
    </div>
  );
};

// --- Analytics Module ---
export const AnalyticsModule: React.FC = () => {
  const metrics = [
    { title: 'Gross Revenue (MTD)', value: '₹12.4L', trend: '+8.2%', status: 'Optimal', icon: <DollarSign size={14}/> },
    { title: 'Operating Expenses', value: '₹4.8L', trend: '+1.5%', status: 'Stable', icon: <ArrowDownRight size={14}/> },
    { title: 'Avg Wait Time', value: '18 min', trend: '-12%', status: 'Optimal', icon: <Timer size={14}/> },
    { title: 'Bed Turnaround', value: '1.4h', trend: '+0.2h', status: 'Stable', icon: <Activity size={14}/> },
    { title: 'Pharmacy Fill Rate', value: '96.5%', trend: '+2.1%', status: 'Optimal', icon: <Pill size={14}/> },
    { title: 'IPD Discharge Rate', value: '92%', trend: '-1.4%', status: 'Warning', icon: <ArrowUpRight size={14}/> },
    { title: 'Clinical Errors', value: '0.01%', trend: '0.00', status: 'Safe', icon: <ShieldCheck size={14}/> },
    { title: 'Net Profit Margin', value: '28.4%', trend: '+4.2%', status: 'Optimal', icon: <TrendingUp size={14}/> },
  ];

  const revenueData = [120, 150, 140, 180, 210, 190, 240];
  const expenseData = [80, 90, 85, 110, 120, 115, 130];
  const deptPerformance = [
    { name: 'Cardiology', value: 85, color: '#4f46e5' },
    { name: 'Surgery', value: 72, color: '#10b981' },
    { name: 'Emergency', value: 94, color: '#ef4444' },
    { name: 'OPD', value: 64, color: '#f59e0b' },
    { name: 'Radiology', value: 78, color: '#06b6d4' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{m.title}</p>
              <div className="p-1.5 bg-slate-50 text-slate-400 rounded-lg">{m.icon}</div>
            </div>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-black text-slate-800 tracking-tighter">{m.value}</h3>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                m.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
              }`}>{m.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Expenditure Trend */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                <BarChart3 size={18} className="text-indigo-600" /> Revenue Flow Trend
              </h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Daily comparison (Past 7 Days)</p>
            </div>
            <div className="flex gap-4">
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-indigo-600 rounded-sm"></div>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Revenue</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-rose-400 rounded-sm"></div>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Expenses</span>
               </div>
            </div>
          </div>
          <div className="h-64 w-full relative">
            <svg viewBox="0 0 700 200" className="w-full h-full">
               <polyline fill="none" stroke="#e2e8f0" strokeWidth="1" points="0,50 700,50 0,100 700,100 0,150 700,150" />
               <polyline fill="none" stroke="#4f46e5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" 
                 points={revenueData.map((d, i) => `${(i / (revenueData.length - 1)) * 700},${200 - d}`).join(' ')} />
               <polyline fill="none" stroke="#fb7185" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" 
                 points={expenseData.map((d, i) => `${(i / (expenseData.length - 1)) * 700},${200 - d}`).join(' ')} />
               {revenueData.map((d, i) => (
                  <circle key={`r-${i}`} cx={(i / (revenueData.length - 1)) * 700} cy={200 - d} r="5" fill="#4f46e5" stroke="white" strokeWidth="2" />
               ))}
            </svg>
            <div className="flex justify-between mt-4 text-[9px] font-black text-slate-400 uppercase">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
        </div>

        {/* Department Performance Bar Chart */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
           <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2 mb-8">
            {/* Added missing Users icon from lucide-react */}
            <Users size={18} className="text-emerald-600" /> Dept Throughput Index
          </h3>
          <div className="space-y-6">
            {deptPerformance.map((dept, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{dept.name}</span>
                  <span className="text-xs font-black text-slate-900">{dept.value}% Efficiency</span>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${dept.value}%`, backgroundColor: dept.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Detailed Reports */}
        <div className="bg-slate-900 p-10 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden relative">
          <div className="relative z-10 max-w-sm">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="text-indigo-400" />
              <h3 className="text-indigo-300 text-xs font-black uppercase tracking-widest">Growth Projection</h3>
            </div>
            
            <button className="mt-8 px-8 py-3 bg-white text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-transform">Download Strategic Deck</button>
          </div>
          
          <div className="relative z-10 bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 text-center w-full md:w-auto">
            <p className="text-[10px] font-black uppercase text-indigo-300 tracking-widest mb-4">Patient Trust Score</p>
            <div className="relative w-40 h-20 overflow-hidden mx-auto">
              <div className="absolute w-40 h-40 border-[12px] border-emerald-500 rounded-full border-b-transparent"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-2 text-3xl font-black">9.4</div>
            </div>
            <p className="text-[9px] font-bold text-slate-400 uppercase mt-4">Industry Avg: 8.2</p>
          </div>
          <Activity size={300} className="absolute -right-20 -bottom-20 text-white/5 rotate-12" />
        </div>
      </div>
    </div>
  );
};

// --- Lab Module ---
export const LabModule: React.FC = () => {
  const [tests, setTests] = useState<LabTest[]>([
    { id: 'L-101', patientId: 'P-8827', testName: 'Complete Blood Count', requestedBy: 'Dr. Sarah', status: 'In Progress', date: '2023-11-20' },
    { id: 'L-102', patientId: 'P-1102', testName: 'Lipid Profile', requestedBy: 'Dr. Mark', status: 'Pending', date: '2023-11-20' },
    { id: 'L-103', patientId: 'P-4402', testName: 'Renal Function Test', requestedBy: 'Dr. Emily', status: 'Completed', result: 'Creatinine: 1.1 mg/dL', date: '2023-11-19' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newTest: LabTest = {
      id: `L-${Math.floor(100 + Math.random() * 900)}`,
      patientId: formData.get('patientId') as string,
      testName: formData.get('testName') as string,
      requestedBy: 'Dr. Current User',
      status: 'Pending',
      date: new Date().toISOString().split('T')[0]
    };
    setTests([newTest, ...tests]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-white p-4 rounded-3xl border border-slate-200">
        <div className="flex items-center gap-3 px-2">
          <TestTube2 size={24} className="text-indigo-600" />
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-800">Diagnostics Registry</h3>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase shadow-lg shadow-indigo-100">
          <Plus size={14} /> New Test Order
        </button>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] uppercase font-black tracking-widest text-slate-400">
            <tr>
              <th className="px-8 py-5">Order ID</th>
              <th className="px-6 py-5">Patient</th>
              <th className="px-6 py-5">Test Description</th>
              <th className="px-6 py-5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tests.map(test => (
              <tr key={test.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-8 py-5 text-sm font-bold text-slate-800">{test.id}</td>
                <td className="px-6 py-5 text-sm text-slate-500 font-medium">{test.patientId}</td>
                <td className="px-6 py-5 text-sm text-slate-600 font-semibold">{test.testName}</td>
                <td className="px-6 py-5">
                  <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-tight ${
                    test.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' : 
                    test.status === 'In Progress' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'
                  }`}>{test.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Order Diagnostic Test">
        <form className="space-y-4" onSubmit={handleAddTest}>
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2 px-1">Patient Case ID</label>
            <input name="patientId" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm outline-none" placeholder="e.g. P-8827" required />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2 px-1">Test Profile</label>
            <select name="testName" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm outline-none cursor-pointer">
              <option>Complete Blood Count (CBC)</option>
              <option>Lipid Profile</option>
              <option>Liver Function Test (LFT)</option>
              <option>Renal Function Test (RFT)</option>
              <option>Blood Glucose (F/PP)</option>
            </select>
          </div>
          <button type="submit" className="w-full py-4 bg-indigo-600 text-white font-black uppercase tracking-widest rounded-2xl text-xs shadow-xl shadow-indigo-100">Process Order</button>
        </form>
      </Modal>
    </div>
  );
};

// --- Emergency Module ---
export const EmergencyModule: React.FC = () => {
  const [cases, setCases] = useState([
    { id: 'E-001', name: 'Unknown Male', condition: 'Cardiac Arrest', triage: 'Red', arrival: '2 mins ago', doctor: null },
    { id: 'E-002', name: 'Sarah Miller', condition: 'Acute Trauma', triage: 'Red', arrival: '12 mins ago', doctor: 'Dr. Aris' },
    { id: 'E-003', name: 'Robert Fox', condition: 'High Fever', triage: 'Yellow', arrival: '45 mins ago', doctor: null },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTriage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newCase = {
      id: `E-${Math.floor(100 + Math.random() * 900)}`,
      name: formData.get('name') as string,
      condition: formData.get('condition') as string,
      triage: formData.get('triage') as string,
      arrival: 'Just now',
      doctor: null
    };
    setCases([newCase, ...cases]);
    setIsModalOpen(false);
  };

  const assignMD = (id: string) => {
    setCases(cases.map(c => c.id === id ? { ...c, doctor: 'Dr. Assigned' } : c));
  };

  const transferCase = (id: string) => {
    setCases(cases.filter(c => c.id !== id));
    alert(`Case ${id} transferred to IPD Ward.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-3xl border border-slate-200">
        <div className="flex items-center gap-3 px-2">
          <Zap size={24} className="text-red-500 animate-pulse" />
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-800">Emergency Triage Queue</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase">4 Active • High Resource Stress</p>
          </div>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase shadow-lg shadow-red-100">
          <Activity size={14} /> New Triage
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {cases.map(item => (
            <div key={item.id} className={`bg-white p-6 rounded-[2rem] border transition-all flex items-center justify-between group ${
              item.triage === 'Red' ? 'border-red-100 bg-red-50/30' : 'border-slate-200'
            }`}>
              <div className="flex items-center gap-5">
                <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-black text-white shadow-lg ${
                  item.triage === 'Red' ? 'bg-red-500 shadow-red-200' : 'bg-amber-400 shadow-amber-200'
                }`}>
                  <span className="text-xs">{item.triage.charAt(0)}</span>
                  <span className="text-[8px] uppercase tracking-tighter opacity-70">Level</span>
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <p className="font-black text-slate-800">{item.name}</p>
                    <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-black text-slate-500 uppercase">{item.id}</span>
                  </div>
                  <p className={`text-xs font-bold ${item.triage === 'Red' ? 'text-red-600' : 'text-amber-600'}`}>{item.condition}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-1">Arrival: {item.arrival} • MD: {item.doctor || 'Unassigned'}</p>
                </div>
              </div>

              <div className="flex gap-2">
                {!item.doctor && (
                  <button 
                    onClick={() => assignMD(item.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100"
                  >
                    <UserCheck size={14} /> Assign MD
                  </button>
                )}
                <button 
                  onClick={() => transferCase(item.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase hover:bg-slate-50 transition-all"
                >
                  <MoveRight size={14} /> Transfer
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Zap size={140} />
          </div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300 mb-6">On-Call Directory</h4>
          <div className="space-y-4">
            {[
              { role: 'Trauma Lead', name: 'Dr. Aris (Cardio)', status: 'Active' },
              { role: 'Triage Nurse', name: 'Elena Gilbert', status: 'Available' },
              { role: 'ER Tech', name: 'Silas V.', status: 'On Break' },
            ].map((staff, i) => (
              <div key={i} className="flex justify-between items-center text-xs">
                <div>
                  <p className="font-black text-indigo-100">{staff.name}</p>
                  <p className="text-[9px] text-slate-400 uppercase tracking-widest">{staff.role}</p>
                </div>
                <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                  staff.status === 'Active' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-slate-800 text-slate-500'
                }`}>{staff.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Admit Emergency Triage">
        <form className="space-y-4" onSubmit={handleTriage}>
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2 px-1">Patient Identity</label>
            <input name="name" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm outline-none" placeholder="e.g. Unknown Male / Jane Doe" required />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2 px-1">Primary Condition</label>
            <input name="condition" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm outline-none" placeholder="e.g. Suspected Stroke" required />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2 px-1">Urgency Level</label>
            <div className="grid grid-cols-3 gap-2">
              <label className="cursor-pointer">
                <input type="radio" name="triage" value="Red" className="peer hidden" defaultChecked />
                <div className="py-2 text-center rounded-xl bg-slate-50 border-2 border-transparent peer-checked:border-red-500 peer-checked:bg-red-50 text-[10px] font-black uppercase text-slate-400 peer-checked:text-red-600 transition-all">Red</div>
              </label>
              <label className="cursor-pointer">
                <input type="radio" name="triage" value="Yellow" className="peer hidden" />
                <div className="py-2 text-center rounded-xl bg-slate-50 border-2 border-transparent peer-checked:border-amber-500 peer-checked:bg-amber-50 text-[10px] font-black uppercase text-slate-400 peer-checked:text-amber-600 transition-all">Yellow</div>
              </label>
              <label className="cursor-pointer">
                <input type="radio" name="triage" value="Green" className="peer hidden" />
                <div className="py-2 text-center rounded-xl bg-slate-50 border-2 border-transparent peer-checked:border-emerald-500 peer-checked:bg-emerald-50 text-[10px] font-black uppercase text-slate-400 peer-checked:text-emerald-600 transition-all">Green</div>
              </label>
            </div>
          </div>
          <button type="submit" className="w-full py-4 bg-red-600 text-white font-black uppercase tracking-widest rounded-2xl text-xs shadow-xl shadow-red-100">Admit to ER</button>
        </form>
      </Modal>
    </div>
  );
};

// --- EMR Module ---
export const EMRModule: React.FC<{ user?: User }> = ({ user }) => {
  const [comments, setComments] = useState([
    { id: 1, author: 'Dr. Sarah Kendrick', role: 'Doctor', text: 'Patient showing improvement after medication adjustment.', time: '2h ago' },
    { id: 2, author: 'User Patient', role: 'Patient', text: 'Still feeling slight dizziness in the morning.', time: '1h ago' }
  ]);
  const [newComment, setNewComment] = useState('');

  const vitalsHistory = [72, 75, 80, 78, 85, 82, 79]; // Heart Rate history

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const authorName = user?.name || 'Anonymous';
    const authorRole = user?.role || 'User';
    setComments([...comments, {
      id: Date.now(),
      author: authorName,
      role: authorRole,
      text: newComment,
      time: 'Just now'
    }]);
    setNewComment('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400"><UserIcon size={32} /></div>
            <div>
              <h3 className="text-xl font-black text-slate-800">Johnathan Smith</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Case ID: P-8827-X</p>
            </div>
          </div>
          <div className="flex gap-4">
             <div className="text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Blood Group</p>
                <p className="text-lg font-black text-red-500">O+</p>
             </div>
             <div className="w-px h-10 bg-slate-100"></div>
             <div className="text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Age</p>
                <p className="text-lg font-black text-slate-800">42Y</p>
             </div>
          </div>
        </div>

        {/* Clinical Charts */}
        <div className="mb-10">
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Activity size={16} className="text-indigo-600" /> Heart Rate Trend (BPM)
          </h4>
          <div className="bg-slate-50 rounded-3xl p-6 h-48 relative overflow-hidden border border-slate-100">
            <svg viewBox="0 0 700 150" className="w-full h-full">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path 
                d={`M 0 150 L 0 ${150 - vitalsHistory[0] * 1.5} ${vitalsHistory.map((val, i) => `L ${(i / (vitalsHistory.length - 1)) * 700} ${150 - val * 1.5}`).join(' ')} L 700 150 Z`} 
                fill="url(#chartGradient)"
              />
              <path 
                d={`M 0 ${150 - vitalsHistory[0] * 1.5} ${vitalsHistory.map((val, i) => `L ${(i / (vitalsHistory.length - 1)) * 700} ${150 - val * 1.5}`).join(' ')}`} 
                fill="none" stroke="#4f46e5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" 
              />
              {vitalsHistory.map((val, i) => (
                <circle 
                  key={i} 
                  cx={(i / (vitalsHistory.length - 1)) * 700} 
                  cy={150 - val * 1.5} 
                  r="4" 
                  fill="white" 
                  stroke="#4f46e5" 
                  strokeWidth="2" 
                />
              ))}
            </svg>
            <div className="absolute bottom-4 left-6 right-6 flex justify-between text-[8px] font-black text-slate-400 uppercase tracking-widest">
              <span>08:00 AM</span>
              <span>12:00 PM</span>
              <span>04:00 PM</span>
              <span>08:00 PM</span>
              <span>Current</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {['BP: 120/80', 'Temp: 98.6°F', 'Pulse: 72 bpm'].map((vital, i) => (
            <div key={i} className="flex flex-col items-center p-5 bg-white rounded-3xl border border-slate-100 shadow-sm transition-transform hover:scale-105">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{vital.split(': ')[0]}</span>
              <span className="text-xl font-black text-indigo-600 tracking-tight">{vital.split(': ')[1]}</span>
            </div>
          ))}
        </div>

        {/* Comments Section */}
        <div className="space-y-6">
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <MessageSquare size={16} className="text-indigo-600" /> Clinical Notes & Feedback
          </h4>
          
          <div className="space-y-4">
            {comments.map(c => (
              <div key={c.id} className={`flex gap-4 ${c.role === 'Patient' ? 'flex-row-reverse text-right' : ''}`}>
                <div className="w-8 h-8 rounded-full bg-slate-100 shrink-0 flex items-center justify-center text-[10px] font-black text-slate-500">
                  {c.author.charAt(0)}
                </div>
                <div className={`max-w-[80%] p-4 rounded-3xl ${c.role === 'Patient' ? 'bg-indigo-50 border border-indigo-100' : 'bg-slate-50 border border-slate-100'}`}>
                   <div className={`flex items-center gap-2 mb-1 ${c.role === 'Patient' ? 'flex-row-reverse' : ''}`}>
                      <span className="text-[10px] font-black text-slate-800">{c.author}</span>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter ${c.role === 'Patient' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                        {c.role}
                      </span>
                   </div>
                   <p className="text-sm text-slate-600 leading-relaxed font-medium">{c.text}</p>
                   <p className="text-[9px] text-slate-400 font-bold uppercase mt-2">{c.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative mt-8">
            <textarea 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Type your clinical observation or clinical question..."
              className="w-full bg-slate-50 border border-slate-200 rounded-3xl px-6 py-4 pr-16 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all resize-none h-24"
            />
            <button 
              onClick={handleAddComment}
              className="absolute bottom-4 right-4 p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-100 hover:scale-105 active:scale-95 transition-all"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Users Module ---
export const UsersModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'staff' | 'patients'>('staff');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [staff] = useState([
    { id: 'S-001', name: 'Dr. Aris Thorne', role: 'Doctor', dept: 'Cardiology', email: 'aris.t@mediflow.com' },
    { id: 'S-002', name: 'Elena Gilbert', role: 'Nurse', dept: 'Emergency', email: 'elena.g@mediflow.com' },
    { id: 'S-003', name: 'Mark Stevenson', role: 'Administrator', dept: 'Operations', email: 'mark.s@mediflow.com' },
    { id: 'S-004', name: 'Dr. Sarah Kendrick', role: 'Doctor', dept: 'Pediatrics', email: 'sarah.k@mediflow.com' },
    { id: 'S-005', name: 'Silas Vane', role: 'Lab Technician', dept: 'Diagnostics', email: 'silas.v@mediflow.com' },
  ]);

  const [patients] = useState([
    { id: 'P-101', name: 'Johnathan Smith', age: 42, gender: 'Male', contact: '+1 (555) 0102', case: 'P-8827-X' },
    { id: 'P-102', name: 'Amelia Pond', age: 29, gender: 'Female', contact: '+1 (555) 9921', case: 'P-1102-A' },
    { id: 'P-103', name: 'Robert Fox', age: 64, gender: 'Male', contact: '+1 (555) 4412', case: 'P-4402-B' },
    { id: 'P-104', name: 'Martha Jones', age: 31, gender: 'Female', contact: '+1 (555) 7732', case: 'P-9901-Z' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
          <button 
            onClick={() => setActiveTab('staff')} 
            className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              activeTab === 'staff' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Staff Directory
          </button>
          <button 
            onClick={() => setActiveTab('patients')} 
            className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              activeTab === 'patients' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Patient Registry
          </button>
        </div>
        <div className="flex gap-2">
          <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50">
            <Filter size={18} />
          </button>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase shadow-lg shadow-indigo-100 hover:scale-105 active:scale-95 transition-all">
            <UserPlus size={16} /> Add Identity
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-100 text-[10px] uppercase font-black tracking-widest text-slate-400">
            {activeTab === 'staff' ? (
              <tr>
                <th className="px-8 py-5">Full Name</th>
                <th className="px-6 py-5">Role & Identity</th>
                <th className="px-6 py-5">Department</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5"></th>
              </tr>
            ) : (
              <tr>
                <th className="px-8 py-5">Patient Name</th>
                <th className="px-6 py-5">Case ID</th>
                <th className="px-6 py-5">Demographics</th>
                <th className="px-6 py-5">Contact</th>
                <th className="px-6 py-5"></th>
              </tr>
            )}
          </thead>
          <tbody className="divide-y divide-slate-100">
            {activeTab === 'staff' ? staff.map(person => (
              <tr key={person.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-400 text-xs">
                      {person.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-800">{person.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold">{person.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-tight ${
                    person.role === 'Doctor' ? 'bg-indigo-100 text-indigo-700' : 
                    person.role === 'Nurse' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                  }`}>{person.role}</span>
                  <p className="text-[9px] text-slate-400 font-bold mt-1 uppercase">{person.id}</p>
                </td>
                <td className="px-6 py-5 text-sm text-slate-600 font-bold">{person.dept}</td>
                <td className="px-6 py-5">
                  <span className="flex items-center gap-1.5 text-[9px] font-black text-emerald-600 uppercase">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> Active
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                   <button className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                      <MoreHorizontal size={18} />
                   </button>
                </td>
              </tr>
            )) : patients.map(p => (
              <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-5">
                   <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center font-black text-indigo-300 text-xs">
                      {p.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-800">{p.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{p.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                   <span className="text-xs font-mono font-black text-indigo-600">{p.case}</span>
                </td>
                <td className="px-6 py-5 text-sm text-slate-500 font-medium">
                  {p.age}Y • {p.gender}
                </td>
                <td className="px-6 py-5 text-sm text-slate-600 font-bold">{p.contact}</td>
                <td className="px-6 py-5 text-right">
                   <button className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                      <MoreHorizontal size={18} />
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Register System Identity">
        <form className="space-y-5" onSubmit={e => { e.preventDefault(); setIsModalOpen(false); }}>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Identity Full Name</label>
            <input className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none" placeholder="e.g. John Doe" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1">
               <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Role Permission</label>
               <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm outline-none cursor-pointer">
                 {Object.values(UserRole).map(role => <option key={role} value={role}>{role}</option>)}
               </select>
             </div>
             <div className="space-y-1">
               <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Primary Dept</label>
               <input className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm outline-none" placeholder="e.g. ICU" required />
             </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Corporate Email</label>
            <input className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none" type="email" placeholder="user@mediflow-his.com" required />
          </div>
          <button type="submit" className="w-full py-5 bg-indigo-600 text-white font-black uppercase tracking-widest rounded-[1.5rem] text-xs shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all mt-4">Generate Digital Credential</button>
        </form>
      </Modal>
    </div>
  );
};

// --- IPD Module ---
export const IPDModule: React.FC = () => {
  const [beds, setBeds] = useState<Bed[]>([
    { id: 'A101', ward: 'Ward A', type: 'General', status: 'Occupied', patientId: 'P-9901' },
    { id: 'A102', ward: 'Ward A', type: 'General', status: 'Available' },
    { id: 'I001', ward: 'ICU', type: 'ICU', status: 'Occupied', patientId: 'P-4402' },
    { id: 'I002', ward: 'ICU', type: 'ICU', status: 'Available' },
    { id: 'P201', ward: 'Private', type: 'Private', status: 'Available' },
  ]);

  const toggleBedStatus = (bedId: string) => {
    setBeds(beds.map(b => {
      if (b.id === bedId) {
        const nextStatus: any = b.status === 'Available' ? 'Occupied' : 'Available';
        return { ...b, status: nextStatus };
      }
      return b;
    }));
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
      {beds.map(bed => (
        <button 
          key={bed.id} 
          onClick={() => toggleBedStatus(bed.id)}
          className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 group ${
            bed.status === 'Occupied' ? 'border-red-100 bg-red-50 text-red-600' : 'border-emerald-100 bg-emerald-50 text-emerald-600'
          }`}
        >
          <BedIcon size={32} className="group-hover:scale-110 transition-transform" />
          <span className="text-xs font-black">{bed.id}</span>
          <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 bg-white/50 rounded-full">{bed.status}</span>
        </button>
      ))}
    </div>
  );
};

// --- Pharmacy Module ---
export const PharmacyModule: React.FC = () => {
  const [queue, setQueue] = useState<Prescription[]>([
    { id: 'RX-01', patientId: 'P-8827', medication: 'Metformin 500mg', dosage: '1 Tab', frequency: 'Twice daily', status: 'Pending' },
    { id: 'RX-02', patientId: 'P-1102', medication: 'Amoxicillin 250mg', dosage: '1 Cap', frequency: 'Thrice daily', status: 'Pending' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispense = (id: string) => {
    setQueue(queue.map(q => q.id === id ? { ...q, status: 'Dispensed' } : q));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-white p-4 rounded-3xl border border-slate-200">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-800">Dispensing Queue</h3>
        <button onClick={() => setIsModalOpen(true)} className="p-2 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-100 hover:scale-105 transition-transform">
          <Plus size={18} />
        </button>
      </div>
      <div className="grid gap-3">
        {queue.map(rx => (
          <div key={rx.id} className="bg-white p-5 rounded-3xl border border-slate-200 flex items-center justify-between group">
            <div>
              <p className="text-sm font-bold text-slate-800">{rx.medication}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Patient: {rx.patientId} • {rx.frequency}</p>
            </div>
            {rx.status === 'Pending' ? (
              <button onClick={() => dispense(rx.id)} className="px-4 py-2 bg-emerald-100 text-emerald-600 rounded-xl text-[10px] font-black uppercase hover:bg-emerald-600 hover:text-white transition-all">Dispense</button>
            ) : (
              <span className="px-4 py-2 bg-slate-100 text-slate-400 rounded-xl text-[10px] font-black uppercase italic">Dispensed</span>
            )}
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add to Dispensing Queue">
        <form className="space-y-4" onSubmit={e => { e.preventDefault(); setIsModalOpen(false); }}>
          <input className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm outline-none" placeholder="Patient Case ID" required />
          <input className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm outline-none" placeholder="Medication Name" required />
          <button type="submit" className="w-full py-4 bg-indigo-600 text-white font-black uppercase tracking-widest rounded-2xl text-xs">Queue Medication</button>
        </form>
      </Modal>
    </div>
  );
};

// --- Insurance Module ---
export const InsuranceModule: React.FC = () => {
  const [claims, setClaims] = useState<InsuranceClaim[]>([
    { id: 'C-909', patientId: 'P-112', provider: 'BlueCross Health', amountRequested: 12500, status: 'Submitted', policyNumber: 'PL-77281' },
    { id: 'C-910', patientId: 'P-004', provider: 'Star Insurance', amountRequested: 4800, status: 'Submitted', policyNumber: 'ST-99211' },
  ]);
  const [selectedClaim, setSelectedClaim] = useState<InsuranceClaim | null>(null);

  const updateStatus = (id: string, newStatus: any) => {
    setClaims(claims.map(c => c.id === id ? { ...c, status: newStatus } : c));
    setSelectedClaim(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {claims.map(claim => (
        <div key={claim.id} onClick={() => setSelectedClaim(claim)} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm cursor-pointer hover:border-indigo-400 transition-all">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{claim.provider}</p>
              <h4 className="font-bold text-slate-800">Claim #{claim.id}</h4>
            </div>
            <span className="px-2 py-1 rounded bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-widest border border-blue-100">{claim.status}</span>
          </div>
          <p className="text-xs text-slate-500">Amount: <span className="font-black text-slate-800">₹{claim.amountRequested.toLocaleString()}</span></p>
        </div>
      ))}

      <Modal isOpen={!!selectedClaim} onClose={() => setSelectedClaim(null)} title="Insurance Details">
        {selectedClaim && (
          <div className="space-y-6">
            <div className="bg-slate-50 p-6 rounded-3xl space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Policy Number</span>
                <span className="font-black text-slate-800">{selectedClaim.policyNumber}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Patient Case</span>
                <span className="font-black text-slate-800">{selectedClaim.patientId}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => updateStatus(selectedClaim.id, 'Approved')} className="flex-1 py-4 bg-emerald-600 text-white font-black uppercase tracking-widest rounded-2xl text-[10px] shadow-lg shadow-emerald-100">Approve Claim</button>
              <button onClick={() => updateStatus(selectedClaim.id, 'Rejected')} className="flex-1 py-4 bg-red-50 text-red-600 font-black uppercase tracking-widest rounded-2xl text-[10px]">Reject Claim</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

// --- Inventory Module ---
export const InventoryModule: React.FC = () => {
  const [items] = useState<InventoryItem[]>([
    { id: '1', name: 'Paracetamol 500mg', quantity: 1200, minThreshold: 500, category: 'Medicine' },
    { id: '2', name: 'Surgical Gloves (Size 7)', quantity: 240, minThreshold: 300, category: 'Consumable' },
    { id: '3', name: 'Oxygen Concentrator (5L)', quantity: 8, minThreshold: 3, category: 'Equipment' },
    { id: '4', name: 'Amoxicillin 250mg', quantity: 850, minThreshold: 200, category: 'Medicine' },
    { id: '5', name: 'Insulin Glargine Pen', quantity: 45, minThreshold: 50, category: 'Medicine' },
    { id: '6', name: 'Face Masks (Box of 50)', quantity: 120, minThreshold: 100, category: 'Consumable' },
    { id: '7', name: 'Syringes (5ml)', quantity: 1500, minThreshold: 500, category: 'Consumable' },
    { id: '8', name: 'Defibrillator Unit', quantity: 3, minThreshold: 2, category: 'Equipment' },
    { id: '9', name: 'Patient Monitor B40', quantity: 12, minThreshold: 5, category: 'Equipment' },
    { id: '10', name: 'IV Cannula (G18)', quantity: 320, minThreshold: 150, category: 'Consumable' },
    { id: '11', name: 'Metformin 1000mg', quantity: 600, minThreshold: 300, category: 'Medicine' },
    { id: '12', name: 'Wheelchairs (Standard)', quantity: 15, minThreshold: 5, category: 'Equipment' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-100">
             <Package size={22} />
          </div>
          <div>
            <h2 className="font-black text-slate-800 uppercase text-sm tracking-widest">Global Asset Ledger</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">12 Categories • Real-time Monitoring</p>
          </div>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase shadow-lg shadow-indigo-100 hover:scale-105 active:scale-95 transition-all">
          <Truck size={14} /> Raise Procurement
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-[10px] font-black uppercase text-slate-400 bg-slate-50/50">
            <tr>
              <th className="px-10 py-5">Asset Description</th>
              <th className="px-6 py-5">Category</th>
              <th className="px-6 py-5">Current Stock</th>
              <th className="px-6 py-5">System Alert</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map(item => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-10 py-5">
                   <p className="text-sm font-black text-slate-700">{item.name}</p>
                   <p className="text-[9px] text-slate-400 font-bold uppercase">UID: ASSET-{item.id.padStart(3, '0')}</p>
                </td>
                <td className="px-6 py-5">
                   <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[9px] font-black uppercase tracking-tighter">{item.category}</span>
                </td>
                <td className="px-6 py-5">
                   <p className="text-sm font-mono font-black text-slate-800">{item.quantity.toLocaleString()}</p>
                   <p className="text-[9px] text-slate-400 font-bold uppercase">Threshold: {item.minThreshold}</p>
                </td>
                <td className="px-6 py-5">
                  {item.quantity < item.minThreshold ? (
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-600 rounded-full text-[9px] font-black uppercase animate-pulse border border-red-200">
                      <AlertCircle size={10} /> Urgent Restock
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-[9px] font-black uppercase border border-emerald-200">
                      <CheckCircle size={10} /> Normal Range
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Procurement Requisition">
        <form className="space-y-4" onSubmit={e => { e.preventDefault(); setIsModalOpen(false); }}>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Item Specifications</label>
            <input className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm outline-none" placeholder="e.g. Sterile Syringes 10ml" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1">
               <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Unit Count</label>
               <input className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm outline-none font-bold" type="number" placeholder="Count" required />
             </div>
             <div className="space-y-1">
               <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Priority</label>
               <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm outline-none cursor-pointer">
                 <option>Standard</option>
                 <option>High Priority</option>
                 <option>Urgent / Critical</option>
               </select>
             </div>
          </div>
          <button type="submit" className="w-full py-5 bg-indigo-600 text-white font-black uppercase tracking-widest rounded-2xl text-xs shadow-xl shadow-indigo-100 mt-4">Dispatch to Procurement Dept</button>
        </form>
      </Modal>
    </div>
  );
};

// --- Appointments Module ---
export const AppointmentsModule: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white rounded-[2rem] border border-slate-200 p-12 text-center shadow-sm">
      <Calendar size={64} className="mx-auto text-indigo-100 mb-6" />
      <h3 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Patient Registry & Intake</h3>
      <p className="text-slate-500 text-sm mt-3 mb-8 max-w-sm mx-auto">Standardized digital intake process for OPD and direct hospital referrals.</p>
      <button onClick={() => setIsModalOpen(true)} className="px-10 py-4 bg-indigo-600 text-white rounded-[1.5rem] font-black text-xs uppercase shadow-2xl shadow-indigo-200 hover:scale-105 transition-all">
        Register New Patient
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Clinical Intake Registry">
        <form className="space-y-4" onSubmit={e => { e.preventDefault(); setIsModalOpen(false); }}>
          <div className="grid grid-cols-2 gap-4">
            <input className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm outline-none" placeholder="First Name" required />
            <input className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm outline-none" placeholder="Last Name" required />
          </div>
          <input className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm outline-none" placeholder="Aadhar / National ID Number" required />
          <div className="grid grid-cols-2 gap-4">
            <input className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm outline-none" type="number" placeholder="Age" required />
            <select className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm outline-none"><option>Male</option><option>Female</option><option>Other</option></select>
          </div>
          <button type="submit" className="w-full py-4 bg-indigo-600 text-white font-black uppercase tracking-widest rounded-2xl text-xs shadow-xl shadow-indigo-100">Complete Registration</button>
        </form>
      </Modal>
    </div>
  );
};

// --- Billing Module ---
const SERVICE_PRICES: Record<string, number> = {
  'Standard OPD Consultation': 850,
  'Laboratory Services': 2500,
  'Emergency Admissions': 8500,
  'Surgical Procedures': 45000,
};

export const BillingModule: React.FC = () => {
  const [invoices, setInvoices] = useState([
    { id: 'INV-001', patient: 'Johnathan Smith', amount: 12500.50, status: 'Paid', type: 'OPD Consult' },
    { id: 'INV-002', patient: 'Amelia Pond', amount: 84000.00, status: 'Pending', type: 'IPD Surgery' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Standard OPD Consultation');
  const [calculatedAmount, setCalculatedAmount] = useState(SERVICE_PRICES['Standard OPD Consultation']);

  const handleServiceChange = (service: string) => {
    setSelectedService(service);
    setCalculatedAmount(SERVICE_PRICES[service] || 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-black text-slate-800 uppercase text-xs tracking-widest flex items-center gap-2">
          <CreditCard size={18} className="text-indigo-600" /> Financial Dashboard
        </h2>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase shadow-lg shadow-indigo-100">
          <Plus size={14} /> Create New Bill
        </button>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-100">
            <tr>
              <th className="px-8 py-5">Invoice ID</th>
              <th className="px-6 py-5">Patient</th>
              <th className="px-6 py-5">Amount</th>
              <th className="px-6 py-5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {invoices.map(inv => (
              <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-8 py-5 text-sm font-bold text-slate-800">{inv.id}</td>
                <td className="px-6 py-5 text-sm text-slate-600 font-medium">{inv.patient}</td>
                <td className="px-6 py-5 text-sm font-black text-slate-800">₹{inv.amount.toLocaleString()}</td>
                <td className="px-6 py-5">
                  <span className={`px-2 py-1 rounded text-[9px] font-black uppercase ${
                    inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>{inv.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Generate Digital Invoice">
        <form className="space-y-6" onSubmit={e => { e.preventDefault(); setIsModalOpen(false); }}>
          <div className="space-y-2">
             <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block px-1">Patient Details</label>
             <input className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm outline-none" placeholder="Patient Case ID (e.g. P-8827)" required />
          </div>

          <div className="space-y-2">
             <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block px-1">Select Hospital Service</label>
             <select 
               className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm outline-none cursor-pointer"
               value={selectedService}
               onChange={(e) => handleServiceChange(e.target.value)}
             >
               {Object.keys(SERVICE_PRICES).map(service => <option key={service} value={service}>{service}</option>)}
             </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block px-1">Total Amount Due (Automated)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-600 font-black text-xl">₹</span>
              <input 
                className="w-full bg-indigo-50 border border-indigo-100 rounded-2xl pl-10 pr-5 py-4 text-xl outline-none font-black text-indigo-900" 
                value={calculatedAmount.toLocaleString()} 
                readOnly
              />
            </div>
            <p className="text-[9px] text-slate-400 font-bold uppercase mt-1 px-1 italic">* Billing rates are governed by NABH standard tariffs.</p>
          </div>

          <button type="submit" className="w-full py-4 bg-indigo-600 text-white font-black uppercase tracking-widest rounded-2xl text-xs shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">Commit Invoice & Print</button>
        </form>
      </Modal>
    </div>
  );
};
