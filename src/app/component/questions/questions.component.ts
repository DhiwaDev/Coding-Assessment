import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
// import { HttpClient } from '@angular/common/http';
import { QuestionsService } from "src/app/services/questions.services";
import { questions } from "src/app/model/questions";

@Component({
  selector: "app-questions",
  templateUrl: "./questions.component.html",
  styleUrls: ["./questions.component.css"],
})
export class QuestionsComponent implements OnInit {
  questions: questions[] = [];
  Id: number | undefined;
  selectedDifficulty: string = "all";

  constructor(
    private questionsService: QuestionsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get("id");
    this.Id = idParam ? parseInt(idParam, 10) : undefined;
    this.filterQuestionsByDifficulty();
  }

  filterQuestionsByDifficulty() {
    if (this.Id && this.selectedDifficulty === "all") {
      this.questionsService
        .getQuestionsByChallengeId(this.Id)
        .subscribe((res) => {
          this.questions = res;
        });
    } else if (this.Id && this.selectedDifficulty !== "all") {
      this.questionsService
        .getQuestionsByDifficulty(this.Id, this.selectedDifficulty)
        .subscribe((res) => {
          console.log(res)
          this.questions = res;
        });
    }
  }
}
