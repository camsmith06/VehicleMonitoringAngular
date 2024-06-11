import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {

  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  navigateToHistory() {
    this.router.navigate(['/history']);
  }

  navigateToSettings() {
    this.router.navigate(['/settings']);
  }
}
