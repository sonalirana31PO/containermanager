export interface Container {
  id: string;
  type: 'RKN' | 'RAP';
  origin: string;
  destination: string;
  currentLocation: string;
  lastSeen: string;
  temperature: number;
  setPoint: number;
  battery: number;
  status: 'ok' | 'warning' | 'critical';
  awb: string;
  route: string[];
  leaseStart: string;
  nextMaintenance: string;
}

export interface TemperatureReading {
  timestamp: string;
  internal: number;
  setPoint: number;
  ambient: number;
}

export interface Alert {
  id: string;
  containerId: string;
  timestamp: string;
  type: 'temperature' | 'battery' | 'sensor' | 'maintenance';
  severity: 'critical' | 'warning' | 'info';
  message: string;
}

export interface Invoice {
  id: string;
  number: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'paid' | 'overdue' | 'pending';
  lineItems: {
    containerId: string;
    route: string;
    daysRented: number;
    rate: number;
    total: number;
  }[];
}

export interface Customer {
  id: string;
  name: string;
  contractType: string;
  activeUsers: number;
  apiUsage: number;
  status: 'active' | 'inactive';
}

export interface Integration {
  id: string;
  name: string;
  logo: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSync: string;
}

export const mockContainers: Container[] = [
  {
    id: 'OC-2401',
    type: 'RKN',
    origin: 'FRA',
    destination: 'JFK',
    currentLocation: 'In Transit',
    lastSeen: '2025-11-28T10:30:00Z',
    temperature: 5.2,
    setPoint: 5.0,
    battery: 45,
    status: 'warning',
    awb: 'AWB-789456123',
    route: ['FRA', 'AMS', 'JFK'],
    leaseStart: '2025-11-25',
    nextMaintenance: '2026-02-15',
  },
  {
    id: 'OC-2402',
    type: 'RAP',
    origin: 'SIN',
    destination: 'LAX',
    currentLocation: 'Singapore',
    lastSeen: '2025-11-28T09:15:00Z',
    temperature: 22.1,
    setPoint: 22.0,
    battery: 87,
    status: 'ok',
    awb: 'AWB-456789012',
    route: ['SIN', 'HKG', 'LAX'],
    leaseStart: '2025-11-26',
    nextMaintenance: '2026-03-01',
  },
  {
    id: 'OC-2403',
    type: 'RKN',
    origin: 'LHR',
    destination: 'DXB',
    currentLocation: 'Dubai',
    lastSeen: '2025-11-28T11:45:00Z',
    temperature: 4.8,
    setPoint: 5.0,
    battery: 92,
    status: 'ok',
    awb: 'AWB-123456789',
    route: ['LHR', 'DXB'],
    leaseStart: '2025-11-27',
    nextMaintenance: '2026-01-20',
  },
  {
    id: 'OC-2404',
    type: 'RKN',
    origin: 'CDG',
    destination: 'BOS',
    currentLocation: 'In Transit',
    lastSeen: '2025-11-28T08:20:00Z',
    temperature: 8.3,
    setPoint: 5.0,
    battery: 23,
    status: 'critical',
    awb: 'AWB-987654321',
    route: ['CDG', 'LHR', 'BOS'],
    leaseStart: '2025-11-24',
    nextMaintenance: '2026-01-10',
  },
  {
    id: 'OC-2405',
    type: 'RAP',
    origin: 'NRT',
    destination: 'ORD',
    currentLocation: 'Tokyo',
    lastSeen: '2025-11-28T07:00:00Z',
    temperature: 21.5,
    setPoint: 22.0,
    battery: 78,
    status: 'ok',
    awb: 'AWB-741852963',
    route: ['NRT', 'LAX', 'ORD'],
    leaseStart: '2025-11-23',
    nextMaintenance: '2026-02-28',
  },
];

export const generateTemperatureData = (containerId: string): TemperatureReading[] => {
  const container = mockContainers.find(c => c.id === containerId);
  if (!container) return [];

  const readings: TemperatureReading[] = [];
  const now = new Date();
  
  for (let i = 48; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 30 * 60 * 1000); // 30-minute intervals
    const variation = (Math.random() - 0.5) * 1.5;
    const ambientBase = container.type === 'RKN' ? 25 : 23;
    
    readings.push({
      timestamp: timestamp.toISOString(),
      internal: container.setPoint + variation,
      setPoint: container.setPoint,
      ambient: ambientBase + (Math.random() - 0.5) * 5,
    });
  }
  
  return readings;
};

export const mockAlerts: Alert[] = [
  {
    id: 'ALT-001',
    containerId: 'OC-2404',
    timestamp: '2025-11-28T08:20:00Z',
    type: 'temperature',
    severity: 'critical',
    message: 'Temperature exceeded threshold: 8.3°C (Max: 8.0°C)',
  },
  {
    id: 'ALT-002',
    containerId: 'OC-2401',
    timestamp: '2025-11-28T10:15:00Z',
    type: 'battery',
    severity: 'warning',
    message: 'Battery level low: 45% - Charging recommended',
  },
  {
    id: 'ALT-003',
    containerId: 'OC-2404',
    timestamp: '2025-11-28T07:45:00Z',
    type: 'battery',
    severity: 'critical',
    message: 'Battery level critical: 23% - Immediate action required',
  },
];

export const mockInvoices: Invoice[] = [
  {
    id: 'INV-001',
    number: 'INV-2025-11-001',
    date: '2025-11-01',
    dueDate: '2025-11-30',
    amount: 15750.00,
    status: 'paid',
    lineItems: [
      { containerId: 'OC-2301', route: 'FRA → JFK', daysRented: 14, rate: 450, total: 6300 },
      { containerId: 'OC-2302', route: 'SIN → LAX', daysRented: 21, rate: 450, total: 9450 },
    ],
  },
  {
    id: 'INV-002',
    number: 'INV-2025-11-002',
    date: '2025-11-15',
    dueDate: '2025-12-15',
    amount: 12600.00,
    status: 'pending',
    lineItems: [
      { containerId: 'OC-2401', route: 'FRA → JFK', daysRented: 7, rate: 450, total: 3150 },
      { containerId: 'OC-2402', route: 'SIN → LAX', daysRented: 14, rate: 450, total: 6300 },
      { containerId: 'OC-2403', route: 'LHR → DXB', daysRented: 7, rate: 450, total: 3150 },
    ],
  },
];

export const mockCustomers: Customer[] = [
  {
    id: 'CUST-001',
    name: 'BioMed Pharma',
    contractType: 'Global Lease',
    activeUsers: 12,
    apiUsage: 245,
    status: 'active',
  },
  {
    id: 'CUST-002',
    name: 'MedTech Solutions',
    contractType: 'Pay-per-Use',
    activeUsers: 5,
    apiUsage: 78,
    status: 'active',
  },
  {
    id: 'CUST-003',
    name: 'PharmaLogix Inc',
    contractType: 'Regional Contract',
    activeUsers: 8,
    apiUsage: 156,
    status: 'active',
  },
];

export const mockIntegrations: Integration[] = [
  {
    id: 'INT-001',
    name: 'Databricks',
    logo: '📊',
    status: 'connected',
    lastSync: '2025-11-28T11:30:00Z',
  },
  {
    id: 'INT-002',
    name: 'Power BI',
    logo: '📈',
    status: 'connected',
    lastSync: '2025-11-28T10:00:00Z',
  },
  {
    id: 'INT-003',
    name: 'SAP ERP',
    logo: '💼',
    status: 'error',
    lastSync: '2025-11-27T15:30:00Z',
  },
];
