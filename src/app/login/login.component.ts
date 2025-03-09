import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <h2>Login</h2>
    <input type="email" placeholder="Email" #email />
    <input type="password" placeholder="Password" #password />
    <button (click)="login(email.value, password.value)">Login</button>
  `,
  imports: [],
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  async login(email: string, password: string) {
    try {
      await this.authService.login(email, password);
      // Redirect to your main app page after successful login
    } catch (error) {
      // Handle login error (e.g., display error message)
    }
  }
}