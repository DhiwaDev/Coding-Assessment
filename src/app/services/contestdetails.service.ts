import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { contestdetails } from '../model/contestdetails';

@Injectable({
  providedIn: 'root',
})
export class ContestdetailsService {
  private apiUrl = 'http://localhost:3000/api/contestdetails';

  constructor(private http: HttpClient) {}

  getContestdetails(): Observable<contestdetails[]> {
    // return this.http.get("/api/challenges");
    return this.http.get<contestdetails[]>(this.apiUrl);
  }
}
