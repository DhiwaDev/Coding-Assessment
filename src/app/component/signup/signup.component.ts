import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  
  activeTab: string = 'register';

  showRegisterForm(): void {
    this.activeTab = 'register';
  }

  showLoginForm(): void {
    this.activeTab = 'login';
  }

  redirectToLogin() {
    this.activeTab = 'login'; // Set the active tab to 'login' to display the login component
  }

}
