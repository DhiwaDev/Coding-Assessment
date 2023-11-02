import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { questionDescription } from "../model/questionDescription";

@Injectable({
  providedIn: "root",
})
export class QuestiondescriptionService {
  private apiUrl = "http://localhost:3000/api/question-description/";

  constructor(private http: HttpClient) {}

  getQuestionsByQuestionId(
    questionId: number
  ): Observable<questionDescription[]> {
    return this.http.get<questionDescription[]>(
      `${this.apiUrl}` + `${questionId}`
    );
  }
}
