import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChallengesComponent } from './component/challenges/challenges.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { HomeComponent } from './component/home/home.component';
import { QuestionsComponent } from './component/questions/questions.component';
import { QuestionsService } from './services/questions.services';
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
import { LogoutComponent } from './component/logout/logout.component';
// import { DemoComponent } from './demo/demo.component';

@NgModule({
  declarations: [
    AppComponent,
    ChallengesComponent,
    NavBarComponent,
    HomeComponent,
    QuestionsComponent,
    QuestionDescriptionComponent,
    IdeComponent,
    LeaderboardComponent,
    ContestdetailsComponent,
    RegisterComponent,
    LoginComponent,
    SignupComponent,
    DiscussionComponent,
    SubmissionComponent,
    ContestlistComponent,
    LogoutComponent,
    // DemoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
  ],
  providers: [QuestionsService],

  bootstrap: [AppComponent],
})
export class AppModule {}
