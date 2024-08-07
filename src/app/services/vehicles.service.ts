import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { VehicleTrend } from '../models/vehicle-trend.model'
import { AlertContact } from '../models/alert-contact';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  private apiUrl = 'https://verakada-func-dev.azurewebsites.net/api/'

  constructor(private http:HttpClient) { }

  getVehicleTrends() : Observable<VehicleTrend> {
    return this.http.get<VehicleTrend>(this.apiUrl + 'GetVehicleCount');
  }

  submitCalibration(hour: number, minute: number, calibration: number): Observable<any> {
    const suffix = `EndOfDayCalibrationFunction/${hour}/${minute}/${calibration}`;
    return this.http.get(this.apiUrl + suffix);
  }

  deleteAlertContact(rowKey: string): Observable<any> {
    const suffix = `DeleteAlertContact/${rowKey}`;
    const headers = new HttpHeaders();
    return this.http.post(this.apiUrl + suffix, headers);
  }

  getAlertContacts() : Observable<AlertContact[]> {
    return this.http.get<AlertContact[]>(this.apiUrl + 'GetAlertContactsFunction');
  }

  addAlertContact(alertContact: AlertContact): Observable<any> {
    const url = `${this.apiUrl}/AddAlertContact`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, alertContact, { headers });
  }
}
