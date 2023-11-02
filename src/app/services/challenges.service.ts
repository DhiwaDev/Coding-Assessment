import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { challenges } from "../model/challenges";
@Injectable({
  providedIn: "root",
})
export class ChallengesService {
  private apiUrl = "http://localhost:3000/api/challenges";

  constructor(private http: HttpClient) {}

  getChallenges(): Observable<challenges[]> {
    // return this.http.get("/api/challenges");
    return this.http.get<challenges[]>(this.apiUrl);
  }
}


