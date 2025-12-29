
import React, { useState } from 'react';
import { User, UserRole } from './types';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import { 
  InventoryModule, 
  AppointmentsModule, 
  BillingModule, 
  IPDModule, 
  EMRModule, 
  PharmacyModule, 
  InsuranceModule,
  UsersModule,
  AnalyticsModule,
  LabModule,
  EmergencyModule
} from './components/Modules';
import { Hospital, ShieldCheck, Stethoscope, UserCircle, Activity, Zap, TestTube2 } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeModule, setActiveModule] = useState('Dashboard');

  const handleLogin = (role: UserRole) => {
    setUser({
      id: Math.random().toString(36).substr(2, 9),
      name: `User ${role}`,
      role: role,
      email: `${role.toLowerCase().replace(' ', '')}@mediflow-his.com`
    });
    setActiveModule('Dashboard');
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-pulse"></div>
        
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-[2rem] shadow-2xl overflow-hidden relative z-10 border border-white/20">
          <div className="p-12 flex flex-col justify-center items-center text-center bg-slate-50 border-r border-slate-100">
            <div className="w-24 h-24 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white mb-8 shadow-2xl shadow-indigo-200 rotate-3">
              <Hospital size={48} />
            </div>
            <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">MediFlow <span className="text-indigo-600">HIS</span></h1>
            <p className="text-slate-500 mb-8 max-w-xs mx-auto text-sm leading-relaxed">
              Unified Hospital Information System for clinical, administrative, and financial excellence.
            </p>
            
          </div>
          
          <div className="p-12 bg-white flex flex-col justify-center">
            <div className="mb-8">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">Access Portal</h2>
              <p className="text-slate-400 text-sm mt-1">Select your administrative or clinical role</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { role: UserRole.ADMINISTRATOR, icon: <Activity className="text-red-500" /> },
                { role: UserRole.DOCTOR, icon: <Stethoscope className="text-indigo-500" /> },
                { role: UserRole.NURSE, icon: <Zap className="text-emerald-500" /> },
                { role: UserRole.RECEPTIONIST, icon: <UserCircle className="text-amber-500" /> },
                { role: UserRole.LAB_TECHNICIAN, icon: <TestTube2 className="text-purple-500" /> },
                { role: UserRole.PATIENT, icon: <UserCircle className="text-blue-500" /> },
              ].map((item) => (
                <button
                  key={item.role}
                  onClick={() => handleLogin(item.role)}
                  className="p-5 border border-slate-200 rounded-2xl text-left hover:border-indigo-400 hover:bg-indigo-50 transition-all group relative overflow-hidden active:scale-95"
                >
                  <div className="mb-2 p-2.5 bg-white rounded-xl inline-block shadow-sm group-hover:bg-indigo-100 transition-colors">
                    {item.icon}
                  </div>
                  <p className="text-[10px] font-black text-slate-800 uppercase tracking-tighter">{item.role}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderModule = () => {
    switch (activeModule) {
      case 'Dashboard':
        return <Dashboard user={user} />;
      case 'Users':
        return <UsersModule />;
      case 'OPD':
        return <AppointmentsModule />;
      case 'IPD':
        return <IPDModule />;
      case 'EMR':
        return <EMRModule user={user} />;
      case 'Pharmacy':
        return <PharmacyModule />;
      case 'Insurance':
        return <InsuranceModule />;
      case 'Inventory':
        return <InventoryModule />;
      case 'Billing':
        return <BillingModule />;
      case 'Analytics':
        return <AnalyticsModule />;
      case 'Lab':
        return <LabModule />;
      case 'Emergency':
        return <EmergencyModule />;
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-400 bg-white border border-dashed border-slate-200 rounded-[2rem]">
            <Hospital size={48} className="mb-4 opacity-5 animate-pulse" />
            <p className="font-black text-xs uppercase tracking-widest">{activeModule} Module Pending Implementation</p>
            <p className="text-[10px] mt-2 italic opacity-60">System clinical governance validation required</p>
          </div>
        );
    }
  };

  return (
    <Layout 
      user={user} 
      onLogout={handleLogout} 
      activeModule={activeModule} 
      setActiveModule={setActiveModule}
    >
      {renderModule()}
    </Layout>
  );
};

export default App;
