
export enum UserRole {
  ADMINISTRATOR = 'Administrator',
  DOCTOR = 'Doctor',
  NURSE = 'Nurse',
  PATIENT = 'Patient',
  RECEPTIONIST = 'Receptionist',
  LAB_TECHNICIAN = 'Lab Technician'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
}

export interface Bed {
  id: string;
  ward: string;
  type: 'General' | 'ICU' | 'Semi-Private' | 'Private';
  status: 'Available' | 'Occupied' | 'Under Maintenance' | 'Reserved';
  patientId?: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  medication: string;
  dosage: string;
  frequency: string;
  status: 'Pending' | 'Dispensed' | 'Cancelled';
}

export interface InsuranceClaim {
  id: string;
  patientId: string;
  provider: string;
  amountRequested: number;
  status: 'Draft' | 'Submitted' | 'Approved' | 'Rejected';
  policyNumber: string;
}

export interface PatientRecord {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  admissionDate?: string;
  dischargeDate?: string;
  vitals: {
    bp: string;
    temp: string;
    heartRate: string;
    spo2: string;
  };
  diagnosis: string[];
  history: string[];
}

export interface LabTest {
  id: string;
  patientId: string;
  testName: string;
  requestedBy: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  result?: string;
  date: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  minThreshold: number;
  category: 'Medicine' | 'Consumable' | 'Equipment';
}
