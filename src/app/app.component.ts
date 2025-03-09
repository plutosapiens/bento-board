import { Component, OnInit } from '@angular/core';
import { TestService } from './test.service';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <a routerLink="/login">Login</a>
    <a routerLink="/signup">Signup</a>
    <router-outlet></router-outlet>
    <button (click)="addTestData()">Add Test Data</button>
    <ul>
      <li *ngFor="let item of testData">{{ item.message }}</li>
    </ul>
  `,
  imports: [RouterOutlet, RouterLink, CommonModule], // Add CommonModule to imports
})
export class AppComponent implements OnInit {
  title = 'my-kanban-app';
  testData: any[] = [];

  constructor(private testService: TestService) {}

  ngOnInit() {
    this.testService.getTestData().subscribe((data) => {
      this.testData = data;
    });
  }

  addTestData() {
    this.testService.addTestData();
  }
}