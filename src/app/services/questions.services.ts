import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { questions } from "../model/questions";

@Injectable({
  providedIn: "root",
})
export class QuestionsService {
  private apiUrl = "http://localhost:3000/api/questions/";

  constructor(private http: HttpClient) {}

  getQuestionsByChallengeId(challengeId: number): Observable<questions[]> {
    return this.http.get<questions[]>(`${this.apiUrl}` + `${challengeId}`);
  }

  getQuestionsByDifficulty(challengeId: number, challengeDiff: string): Observable<questions[]>{
    return this.http.get<questions[]>(`${this.apiUrl}` + `${challengeId}` + `${challengeDiff}`);
  }
}

