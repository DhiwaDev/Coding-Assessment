import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  @Output() registrationComplete: EventEmitter<void> = new EventEmitter<void>();
  formData: any = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  constructor(
    private registerService: RegisterService,
    private router: Router
  ) {}

  registerUser() {
    if (this.formData.password !== this.formData.confirmPassword) {
      alert('Password and Confirm Password do not match');
      return;
    }

    this.registerService.registerUser(this.formData).subscribe(
      (response) => {
        alert('Registration successful');
        console.log('Registration successful');
        this.registrationComplete.emit();
        // this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Registration failed', error);
      }
    );
  }
}
