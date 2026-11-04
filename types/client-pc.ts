export type ServiceStepId = 'recibido' | 'diagnostico' | 'optimizacion' | 'stress-test' | 'listo';

export interface ServiceStep {
  id: ServiceStepId;
  label: string;
  description: string;
  completed: boolean;
  active: boolean;
  timestamp?: string;
}

export interface MetricComparison {
  label: string;
  before: string | number;
  after: string | number;
  unit: string;
  improvement: string;
  isGood: boolean;
}

export interface HardwareSpecs {
  cpu: string;
  gpu: string;
  ram: string;
  storage: string;
  motherboard: string;
  cooling: string;
}

export interface MaintenanceRecord {
  lastThermalPasteChange: string;
  pasteBrand: string;
  thermalPadsReplaced: boolean;
  fanHealthStatus: 'Optimo' | 'Requiere Limpieza' | 'Ruidoso';
  nextRecommendedServiceDate: string;
}

export interface ClientServiceTicket {
  ticketId: string;
  clientName: string;
  clientEmail: string;
  currentStep: ServiceStepId;
  progressPercent: number;
  technicianName: string;
  technicianContact: string;
  intakeDate: string;
  estimatedCompletion: string;
  specs: HardwareSpecs;
  metrics: MetricComparison[];
  maintenance: MaintenanceRecord;
  diagnosticsReport: string;
  futureRecommendations: string[];
}
