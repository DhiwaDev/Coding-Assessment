import { Component, OnInit } from '@angular/core';
import { ContestlistService } from 'src/app/services/contestlist.services';
import { contestlist } from 'src/app/model/contestlist';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-contestlist',
  templateUrl: './contestlist.component.html',
  styleUrls: ['./contestlist.component.css']
})
export class ContestlistComponent implements OnInit {
  contestlists: contestlist[] = [];
  Id: any;

  constructor(
    private contestlistService: ContestlistService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.Id = this.route.snapshot.paramMap.get('id');
    this.contestlistService
      .getContestByContestlistId(this.Id)
      .subscribe((res) => {
        this.contestlists = res;
      });
  }
}

