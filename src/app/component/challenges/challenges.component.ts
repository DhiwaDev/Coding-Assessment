import { Component, OnInit } from '@angular/core';
import { ChallengesService } from '../../services/challenges.service';
import { challenges } from 'src/app/model/challenges';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.css'],
})
export class ChallengesComponent implements OnInit {
  name: string | null = null;
  challenges: challenges[] = [];

  constructor(private challengesService: ChallengesService) {}

  ngOnInit(): void {
    this.getChallenges();
    this.name = localStorage.getItem('name');
  }

  getChallenges(): void {
    this.challengesService
      .getChallenges()
      .subscribe((challenges) => (this.challenges = challenges));
  }
}
