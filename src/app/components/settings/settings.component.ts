import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { AlertContact } from 'src/app/models/alert-contact';

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
  isLoading = false;
  isSuccess = false;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private vehicleService: VehiclesService) { }

  ngOnInit(): void {
    this.calibrationForm = this.formBuilder.group({
      time: ['', Validators.required],
      vehicleCount: ['', Validators.required]
    });

    this.alertsForm = this.formBuilder.group({
      alerts: this.formBuilder.array([])
    });

    // Fetch alert contacts and populate the form
    this.vehicleService.getAlertContacts().subscribe((contacts: AlertContact[]) => {
      contacts.forEach(contact => this.addAlert(contact));
    });

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

  addAlert(contact?: AlertContact): void {
    this.alerts.push(this.createAlert(contact));
  }

  removeAlert(index: number): void {
    this.alerts.removeAt(index);
  }

  createAlert(contact?: AlertContact): FormGroup {
    return this.formBuilder.group({
      name: [contact ? contact.name : '', Validators.required],
      phoneNumber: [contact ? contact.phoneNumber : '', Validators.required],
      email: [contact ? contact.email : '', [Validators.required, Validators.email]],
      contactMethod: [contact ? (contact.contactViaText ? 'Text' : 'Email') : 'Email', Validators.required]
    });
  }

  submitCalibration() {
    if (this.calibrationForm.valid) {
      this.isLoading = true;
      this.isSuccess = false;
      this.errorMessage = '';

      const time = this.calibrationForm.value.time.split(':');
      const hour = parseInt(time[0], 10);
      const minute = parseInt(time[1], 10);
      const vehicleCount = this.calibrationForm.value.vehicleCount;

      this.vehicleService.submitCalibration(hour, minute, vehicleCount).subscribe(
        response => {
          this.isLoading = false;
          this.isSuccess = true;
          console.log('Calibration submitted successfully', response);
          // Optionally reset the form or other actions
        },
        error => {
          this.isLoading = false;
          this.errorMessage = 'Error submitting calibration. Please try again.';
          console.error('Error submitting calibration', error);
        }
      );
    }
  }

  dismissSuccessMessage() {
    this.isSuccess = false;
  }
}
