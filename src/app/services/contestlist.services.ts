import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { contestlist } from '../model/contestlist';

@Injectable({
  providedIn: 'root',
})
export class ContestlistService {
  private apiUrl = 'http://localhost:3000/api/contestlist/';

  constructor(private http: HttpClient) {}

  getContestByContestlistId(contestId: number): Observable<contestlist[]> {
    return this.http.get<contestlist[]>(`${this.apiUrl}` + `${contestId}`);
  }
}
