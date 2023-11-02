import { Component, AfterViewInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AceEditorService } from 'src/app/services/editor.service';

interface RunCodeResponse {
  output: string;
  statusCode: number;
  memory: string;
  cpuTime: string;
  compilationStatus: any;
}

@Component({
  selector: 'app-ide',
  templateUrl: './ide.component.html',
  styleUrls: ['./ide.component.css'],
})
export class IdeComponent implements AfterViewInit {
  // input: string = '';
  output: any;
  loading: boolean = false;

  constructor(
    private http: HttpClient,
    private aceEditorService: AceEditorService,
    private ngZone: NgZone
  ) { }

  ngAfterViewInit(): void {
    this.aceEditorService.createEditor('ideEditor');
  }

  runCode() {
    const language = (document.getElementById('language') as HTMLSelectElement).value;

    // Get the code from the editor
    const code = this.aceEditorService.getEditor().getValue();
    const name = localStorage.getItem('name');

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
