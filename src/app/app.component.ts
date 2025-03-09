import { Component, OnInit } from '@angular/core';
import { TestService } from './test.service';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { AuthService } from './auth.service'; // Import AuthService
import { Router } from '@angular/router'; //Import Router
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';
import { TestComponent } from "./test/test.component";

interface TestDataItem {
  message: string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <a routerLink="/login" *ngIf="!(user$ | async)">Login</a>
    <a routerLink="/signup" *ngIf="!(user$ | async)">Signup</a>
    <button (click)="logout()" *ngIf="(user$ | async)">Logout</button>
    <router-outlet></router-outlet>
    <button (click)="addTestData()">Add Test Data</button>
    <app-test></app-test>
    <ul>
      <li *ngFor="let item of testData">{{ item.message }}</li>
    </ul>
  `,
  imports: [RouterOutlet, RouterLink, CommonModule, TestComponent], // Add CommonModule to imports
})
export class AppComponent implements OnInit {
  title = 'my-kanban-app';
  testData: TestDataItem[] = [];
  user$: Observable<User | null>; // Add user$ observable

  constructor(
    private testService: TestService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.user$ = this.authService.user$; //Initialize user$
  }

  ngOnInit() {
    this.testService.getTestData().subscribe((data) => {
      this.testData = data;
    });
  }

  addTestData() {
    this.testService.addTestData();
  }

  async logout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']); // Redirect to login after logout
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}
