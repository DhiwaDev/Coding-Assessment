
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formData: { email: string; password: string } = { email: '', password: '' };
  loginError: string = '';
  hashService: any;

  constructor(private router: Router, private loginService: LoginService) {}

  loginUser() {
    const { email, password } = this.formData;

    this.loginService.loginUser(email, password).subscribe(
      (response: any) => {

        console.log(email)
        console.log(response['name'])
        // Authentication successful
        alert('Login successfull');

        localStorage.setItem('name',response.name);
        // localStorage.setItem('email', response.email);
        this.router.navigate(['/home']); // Replace '/dashboard' with the desired route
      },
      (error) => {
        // Authentication failed
        this.loginError = 'Invalid email or password'; // Show an error message on the login form
        alert('Invalid email or password');
        console.error('Login error:', error);
      }
    );
  }
}
