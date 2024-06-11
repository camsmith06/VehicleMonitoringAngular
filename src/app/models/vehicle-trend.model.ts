import { TrendData } from './trend-data.model';

export interface VehicleTrend {
  vehiclesIn: number;
  vehiclesOut: number;
  mainGateTrendData: TrendData;
  backGateTrendData: TrendData;
}