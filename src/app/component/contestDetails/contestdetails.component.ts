import { Component, OnInit } from '@angular/core';
import { contestdetails } from 'src/app/model/contestdetails';
import { ContestdetailsService } from 'src/app/services/contestdetails.service';

@Component({
  selector: 'app-contestdetails',
  templateUrl: './contestdetails.component.html',
  styleUrls: ['./contestdetails.component.css'],
})
export class ContestdetailsComponent implements OnInit {
  contestdetails: contestdetails[] = [];

    constructor(private contestdetailsService: ContestdetailsService) {}

    ngOnInit(): void {
      this.getContestdetails();
    }

    getContestdetails(): void {
      this.contestdetailsService
        .getContestdetails()
        .subscribe((contestdetails) => (this.contestdetails = contestdetails));
    }
}

