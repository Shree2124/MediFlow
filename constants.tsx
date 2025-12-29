
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Stethoscope, 
  ClipboardList, 
  TestTube2, 
  Calendar, 
  CreditCard, 
  Package, 
  BarChart3, 
  UserCircle,
  Bed,
  Pill,
  ShieldCheck,
  Zap,
  History
} from 'lucide-react';
import { UserRole } from './types';

export const ROLE_ICONS: Record<UserRole, React.ReactNode> = {
  [UserRole.ADMINISTRATOR]: <UserCircle size={20} />,
  [UserRole.DOCTOR]: <Stethoscope size={20} />,
  [UserRole.NURSE]: <ClipboardList size={20} />,
  [UserRole.PATIENT]: <Users size={20} />,
  [UserRole.RECEPTIONIST]: <Users size={20} />,
  [UserRole.LAB_TECHNICIAN]: <TestTube2 size={20} />,
};

export const MODULE_ICONS = {
  Dashboard: <LayoutDashboard size={20} />,
  Users: <Users size={20} />,
  OPD: <Calendar size={20} />,
  IPD: <Bed size={20} />,
  Emergency: <Zap size={20} />,
  Pharmacy: <Pill size={20} />,
  EMR: <History size={20} />,
  Lab: <TestTube2 size={20} />,
  Billing: <CreditCard size={20} />,
  Insurance: <ShieldCheck size={20} />,
  Inventory: <Package size={20} />,
  Analytics: <BarChart3 size={20} />,
};
