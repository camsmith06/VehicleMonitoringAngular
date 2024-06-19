import { Component, OnInit } from '@angular/core';
import { TrendData } from 'src/app/models/trend-data.model';
import { Trend } from 'src/app/models/trend.model';
import { VehicleTrend } from 'src/app/models/vehicle-trend.model';
import { VehiclesService } from 'src/app/services/vehicles.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  chartTitle = 'Test Chart Title';

  startOfDayCount: number = 0;
  vehiclesIn: number = 0;
  vehiclesOut: number = 0;
  latestDataTime: string = '';

  mainGateLineChartData: { name: string, series: { name: string, value: number }[] }[] = [];
  backGateLineChartData: { name: string, series: { name: string, value: number }[] }[] = [];

  loading: boolean = true;

  constructor(private vehiclesService: VehiclesService) {}

  ngOnInit(): void {
    this.vehiclesService.getVehicleTrends().subscribe((data: VehicleTrend) => {
      this.startOfDayCount = data.startOfDayCount
      this.vehiclesIn = data.vehiclesIn;
      this.vehiclesOut = data.vehiclesOut;
      this.setChartData(data.mainGateTrendData, data.backGateTrendData);
      this.setLatestDataTime(data.mainGateTrendData);
      this.loading = false; // Set loading to false once data is loaded
    }, (error) => {
      console.error('Error fetching vehicle trends', error);
      this.loading = false;
    });
  }

  private setChartData(mainGateData: TrendData, backGateData: TrendData): void {
    this.mainGateLineChartData = [
      {
        name: 'In Trends',
        series: this.convertTrendsToSeries(mainGateData.inTrends)
      },
      {
        name: 'Out Trends',
        series: this.convertTrendsToSeries(mainGateData.outTrends)
      }
    ];

    this.backGateLineChartData = [
      {
        name: 'In Trends',
        series: this.convertTrendsToSeries(backGateData.inTrends)
      },
      {
        name: 'Out Trends',
        series: this.convertTrendsToSeries(backGateData.outTrends)
      }
    ];
  }

  private setLatestDataTime(mainGateData: TrendData): void {
    const endDates = mainGateData.inTrends.map(trend => new Date(trend.end).getTime());
    const latestTime = new Date(Math.max(...endDates));
    this.latestDataTime = this.formatTime(latestTime.toISOString());
  }
  
  private convertTrendsToSeries(trends: Trend[]): { name: string, value: number }[] {
    return trends.map(trend => ({
      name: this.formatTime(trend.start) + ' to ' + this.formatTime(trend.end),
      value: trend.count
    }));
  }

  private formatTime(dateTime: string): string {
    const date = new Date(dateTime);
    return `${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}`;
  }

  public formatXAxisTick(label: string): string {
    return label.split(' to ')[0];
  }
}