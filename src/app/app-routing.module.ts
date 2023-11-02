import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChallengesComponent } from './component/challenges/challenges.component';
import { HomeComponent } from './component/home/home.component';
import { QuestionsComponent } from './component/questions/questions.component';
import { QuestionDescriptionComponent } from './component/question-description/question-description.component';
import { IdeComponent } from './component/ide/ide.component';
import { LeaderboardComponent } from './component/leaderboard/leaderboard.component';
import { ContestdetailsComponent } from './component/contestDetails/contestdetails.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { DiscussionComponent } from './component/discussion/discussion.component';
import { SubmissionComponent } from './component/submission/submission.component';
import { ContestlistComponent } from './component/contestList/contestlist.component';
import { AuthGuard } from './auth/auth-guard.service';


const routes: Routes = [

  { path: 'challenges', component: ChallengesComponent },
  { path: 'home', component: HomeComponent },

  { path: 'challenges', component: ChallengesComponent },
  { path: 'challenges/questions/:id', component: QuestionsComponent },
  { path: 'challenges/questions/:id/:difficulty', component: QuestionsComponent },

  { path: 'questions/question-description/:id', component: QuestionDescriptionComponent },

  { path: 'ide', component: IdeComponent },

  { path: 'leaderboard', component: LeaderboardComponent },

  { path: 'contestdetails', component: ContestdetailsComponent },
  { path: 'contestdetails/contestlist/:id', component: ContestlistComponent },

  { path: 'register', component: RegisterComponent },

  { path: 'login', component: LoginComponent },

  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },

  { path: 'discussion', component: DiscussionComponent },

  { path: 'submission', component: SubmissionComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
