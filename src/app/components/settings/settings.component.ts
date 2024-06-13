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

  cameraDirectionForm!: FormGroup;
  alertsForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.cameraDirectionForm = this.formBuilder.group({
      mainGateEast: 'Entrance',
      mainGateWest: 'Exit',
      backGateEast: 'Entrance',
      backGateWest: 'Exit',
    });

    this.alertsForm = this.formBuilder.group({
      alerts: this.formBuilder.array([])
    });

    // Initialize with one alert
    this.addAlert();
  }

  get alerts(): FormArray {
    return this.alertsForm.get('alerts') as FormArray;
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
}