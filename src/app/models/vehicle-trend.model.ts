import { TrendData } from './trend-data.model';

export interface VehicleTrend {
  startOfDayCount: number;
  vehiclesIn: number;
  vehiclesOut: number;
  mainGateTrendData: TrendData;
  backGateTrendData: TrendData;
}