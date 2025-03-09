import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FirebaseError } from 'firebase/app';

@Component({
  selector: 'app-signup',
  standalone: true,
  template: `
    <h2>Signup</h2>
    <input type="email" placeholder="Email" #email />
    <input type="password" placeholder="Password" #password />
    <button (click)="signup(email.value, password.value)">Signup</button>
    <p *ngIf="errorMessage">{{ errorMessage }}</p>
  `,
  imports: [CommonModule], // Add CommonModule to imports
})
export class SignupComponent {
  errorMessage: string | null = null;
  constructor(private authService: AuthService, private router: Router) {}

  async signup(email: string, password: string) {
    try {
      await this.authService.signup(email, password);
      // Redirect to your main app page after successful signup
    } catch (error) {
      if (error instanceof FirebaseError) {
        this.errorMessage = error.message; //Display error message)
      }
    }
  }
}