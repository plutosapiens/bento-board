import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  template: `
    <h2>Signup</h2>
    <input type="email" placeholder="Email" #email />
    <input type="password" placeholder="Password" #password />
    <button (click)="signup(email.value, password.value)">Signup</button>
  `,
  imports: [],
})
export class SignupComponent {
  constructor(private authService: AuthService) {}

  async signup(email: string, password: string) {
    try {
      await this.authService.signup(email, password);
      // Redirect to your main app page after successful signup
    } catch (error) {
      // Handle signup error (e.g., display error message)
    }
  }
}