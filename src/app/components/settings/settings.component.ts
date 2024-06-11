import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit{
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
      name: 'Glynn Gordon',
      phoneNumber: '07825123456',
      email: 'glynn@tellivue.com',
      contactMethod: 'Email',
    });
  }
}