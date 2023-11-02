
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css']
})
export class SubmissionComponent {
  submissions: any[] = [];
  isModalOpen = false;
  codeView: string = '';

  constructor(private http: HttpClient) {
    this.fetchSubmissions();
  }

  fetchSubmissions() {
    this.http.get<any[]>('http://localhost:3000/api/submission').subscribe(
      (response) => {
        this.submissions = response;
      },
      (error) => {
        console.error('Error fetching submissions:', error);
      }
    );
  }

  openCodeModal(code: string) {
    this.codeView = code;
    this.isModalOpen = true;
  }

  closeCodeModal() {
    this.isModalOpen = false;
  }
}
