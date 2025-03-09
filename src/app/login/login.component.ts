import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FirebaseError } from 'firebase/app';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <h2>Login</h2>
    <input type="email" placeholder="Email" #email />
    <input type="password" placeholder="Password" #password />
    <button (click)="login(email.value, password.value)">Login</button>
    <p *ngIf="errorMessage">{{ errorMessage }}</p>
  `,
  imports: [CommonModule], // Add CommonModule to imports
})
export class LoginComponent {
  errorMessage: string | null = null;
  constructor(private authService: AuthService, private router: Router) {}

  async login(email: string, password: string) {
    this.errorMessage = null;
    try {
      await this.authService.login(email, password);
      // Redirect to your main app page after successful login
    } catch (error) {
      if (error instanceof FirebaseError) {
        this.errorMessage = error.message; //Display error message)
      }    }
  }
}