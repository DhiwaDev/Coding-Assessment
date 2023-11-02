import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/api/login';

  constructor(private http: HttpClient) {}

  loginUser(email: string, password: string) {
    // Make an API call to your backend server to validate the user credentials
    // Example:
    return this.http.post(this.apiUrl, { email, password });
  }
}
