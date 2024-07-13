import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  calibrationForm!: FormGroup;
  alertsForm!: FormGroup;
  timeIntervals: string[] = [];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.calibrationForm = this.formBuilder.group({
      time: ['', Validators.required],
      vehicleCount: ['', Validators.required]
    });

    this.alertsForm = this.formBuilder.group({
      alerts: this.formBuilder.array([])
    });

    // Initialize with one alert
    this.addAlert();
    this.generateTimeIntervals();
  }

  get alerts(): FormArray {
    return this.alertsForm.get('alerts') as FormArray;
  }

  generateTimeIntervals() {
    const interval = 15;
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        this.timeIntervals.push(time);
      }
    }
  }

  addAlert(): void {
    this.alerts.push(this.createAlert());
  }

  removeAlert(index: number): void {
    this.alerts.removeAt(index);
  }

  createAlert(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactMethod: ['Email', Validators.required]
    });
  }

  submitCalibration() {
    if (this.calibrationForm.valid) {
      console.log(this.calibrationForm.value);
    }
  }
}