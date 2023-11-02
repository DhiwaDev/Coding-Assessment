import { Component, OnInit, NgZone } from '@angular/core';
import { QuestiondescriptionService } from 'src/app/services/question-description.services';
import { questionDescription } from 'src/app/model/questionDescription';
import { ActivatedRoute } from "@angular/router";
import { AceEditorService } from 'src/app/services/editor.service';
import { HttpClient } from '@angular/common/http';

interface RunCodeResponse {
  output: string;
  statusCode: number;
  memory: string;
  cpuTime: string;
  compilationStatus: any;
}

@Component({
  selector: 'app-question-description',
  templateUrl: './question-description.component.html',
  styleUrls: ['./question-description.component.css'],
})

export class QuestionDescriptionComponent implements OnInit {
  question_description: questionDescription[] = [];
  Id: any;
  output: any;
  loading: boolean = false;

  constructor(
    private http: HttpClient,
    private questionDescService: QuestiondescriptionService,
    private route: ActivatedRoute,
    private aceEditorService: AceEditorService,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.Id = this.route.snapshot.paramMap.get('id');
    this.questionDescService
      .getQuestionsByQuestionId(this.Id)
      .subscribe((res) => {
        // console.log(res);
        this.question_description = res;
      });

    this.aceEditorService.createEditor('questionEditor');
  }

  runCode() {

    const language = (document.getElementById('language') as HTMLSelectElement).value;

    // Get the code from the editor
    const code = this.aceEditorService.getEditor().getValue();

    this.loading = true;

    // Validate the code based on the selected language
    if (language === 'java') {
      // Check if the code contains 'class' keyword for Java
      if (code.includes('public static void main')) {

        // Make the HTTP GET request to the backend endpoint
        this.http
          .get<RunCodeResponse>('http://localhost:3000/api/runCodeJava', {
            params: { code },
          })
          .subscribe(
            (response: RunCodeResponse) => {
              // Handle the response from the backend
              // console.log(response);
              this.ngZone.run(() => {
                this.output = response.output;
                this.loading = false; // Hide the loading animation
              });
            },
            (error) => {
              this.ngZone.run(() => {
                console.error(error);
                this.loading = false; // Hide the loading animation
              });
            }
          );
      } else {
        // Show an error message for invalid Java code
        this.ngZone.run(() => {
          this.output = 'Error: Invalid Java code';
          this.loading = false;
        });
      }
    } else if (language === 'cpp') {
      if (code.includes('#include <iostream>')) {
        this.http
          .get<RunCodeResponse>('http://localhost:3000/api/runCodeCpp', {
            params: { code },
          })
          .subscribe(
            (response: RunCodeResponse) => {
              // Handle the response from the backend
              // console.log(response);
              this.ngZone.run(() => {
                this.output = response.output;
                this.loading = false; // Hide the loading animation
              });
            },
            (error) => {
              this.ngZone.run(() => {
                console.error(error);
                this.loading = false; // Hide the loading animation
              });
            }
          );
      } else {
        this.ngZone.run(() => {
          this.output = 'Error: Invalid C++ code';
          this.loading = false;
        });
      }
    } else if (language === 'c') {
      if (code.includes('#include<stdio.h>')) {
        this.http
          .get<RunCodeResponse>('http://localhost:3000/api/runCodeC', {
            params: { code },
          })
          .subscribe(
            (response: RunCodeResponse) => {
              // Handle the response from the backend
              // console.log(response);
              this.ngZone.run(() => {
                this.output = response.output;
                this.loading = false; // Hide the loading animation
              });
            },
            (error) => {
              this.ngZone.run(() => {
                console.error(error);
                this.loading = false; // Hide the loading animation
              });
            }
          );
      } else {
        this.ngZone.run(() => {
          this.output = 'Error: Invalid C code';
          this.loading = false;
        });
      }
    } else {
      // Show an error message for unsupported language
      this.output = 'Error: Unsupported language';
    }
  }
}
