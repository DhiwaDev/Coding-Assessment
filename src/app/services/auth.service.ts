import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;

  constructor() { }

  login() {
    // Perform login logic and set isLoggedIn to true if login is successful
    this.isLoggedIn = true;
  }

  logout() {
    // Perform logout logic and set isLoggedIn to false
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
