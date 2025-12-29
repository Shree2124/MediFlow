
import React from 'react';
import { UserRole, User } from '../types';
import { ROLE_ICONS, MODULE_ICONS } from '../constants';
import { LogOut, Bell, Search, Menu, X, LayoutDashboard } from 'lucide-react';

interface LayoutProps {
  user: User;
  onLogout: () => void;
  children: React.ReactNode;
  activeModule: string;
  setActiveModule: (module: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ user, onLogout, children, activeModule, setActiveModule }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const getModulesByRole = (role: UserRole) => {
    const base = ['Dashboard'];
    switch (role) {
      case UserRole.ADMINISTRATOR:
        return [...base, 'Users', 'Inventory', 'Analytics', 'Insurance', 'Billing'];
      case UserRole.DOCTOR:
        return [...base, 'OPD', 'IPD', 'EMR', 'Pharmacy', 'Lab', 'Emergency'];
      case UserRole.NURSE:
        return [...base, 'IPD', 'Emergency', 'Pharmacy', 'Lab', 'EMR'];
      case UserRole.RECEPTIONIST:
        return [...base, 'OPD', 'Emergency', 'Billing', 'Insurance'];
      case UserRole.LAB_TECHNICIAN:
        return [...base, 'Lab', 'EMR'];
      case UserRole.PATIENT:
        return [...base, 'OPD', 'EMR', 'Billing', 'Pharmacy'];
      default:
        return base;
    }
  };

  const modules = getModulesByRole(user.role);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out bg-white border-r border-slate-200 flex flex-col shrink-0`}>
        <div className="p-4 flex items-center justify-between border-b border-slate-100 h-16">
          {isSidebarOpen ? (
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl overflow-hidden whitespace-nowrap">
              <div className="min-w-[32px] w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">H</div>
              <span>MediFlow HIS</span>
            </div>
          ) : (
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white mx-auto">H</div>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-slate-100 rounded text-slate-500">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 mt-4 px-2 space-y-1 overflow-y-auto scrollbar-thin">
          {modules.map((mod) => (
            <button
              key={mod}
              onClick={() => setActiveModule(mod)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                activeModule === mod 
                  ? 'bg-indigo-50 text-indigo-600 font-medium' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className={activeModule === mod ? 'text-indigo-600' : 'text-slate-400'}>
                {(MODULE_ICONS as any)[mod] || <LayoutDashboard size={20}/>}
              </span>
              {isSidebarOpen && <span className="text-sm">{mod}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200 bg-slate-50/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
              {user.name.charAt(0)}
            </div>
            {isSidebarOpen && (
              <div className="overflow-hidden">
                <p className="text-xs font-bold truncate text-slate-900">{user.name}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-tight">{user.role}</p>
              </div>
            )}
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
          >
            <LogOut size={18} />
            {isSidebarOpen && <span>Exit System</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-20 shadow-sm">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold text-slate-800">{activeModule}</h2>
            <div className="h-4 w-px bg-slate-200"></div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Server Status: Live
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Global Search (Records, IDs)..." 
                className="w-64 pl-10 pr-4 py-1.5 bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 rounded-full text-xs transition-all"
              />
            </div>
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 scroll-smooth bg-slate-50">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
