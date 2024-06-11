import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { VehicleTrend } from '../models/vehicle-trend.model'

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  private apiUrl = 'https://verakada-func-dev.azurewebsites.net/api/GetVehicleCount'

  constructor(private http:HttpClient) { }

  getVehicleTrends() : Observable<VehicleTrend> {
    return this.http.get<VehicleTrend>(this.apiUrl);
  }
}
