import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainRoutingModule } from "./main.routing.module";
import { XHRBackend, RequestOptions } from '@angular/http';

import { MainComponent } from "./main.component";
import { ForgotPassword } from "../login/forgot.password";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { ComplaintComponent } from "../complaint/complaint.component";
import { CircularComponent } from "../circular/circular.component";
import { AddCircular } from "../circular/add/add";
import { HomeworkComponent } from "../homework/homework.component";
import { CurrentHomework } from "../homework/current/homework";
import { PassedHomework } from "../homework/passed/homework";
import { HomeworkAddComponent } from "../homework/add/add";
import { AccountComponent } from "../account/account.component";
import { AddEmployeeComponent } from "../addEmployee/addEmployee.component";
import { AddStudentComponent } from "../addStudent/addStudent.component";
import { NewStudentComponent } from "../addStudent/newStudent/newStudent.component";
import { ExistingStudentComponent } from "../addStudent/existingStudent/existingStudent.component";
import { AppreciationComponent } from "../appreciation/appreciation.component";
import { ForMeComponent } from "../appreciation/for-me/forme";
import { ByMeComponent } from "../appreciation/by-me/byme";
import { AddAppreciation } from "../appreciation/add/add";
import { PollComponent } from "../poll/poll.component";
import { ClosedPollComponent } from "../poll/closed/poll";
import { CurrentPollComponent } from "../poll/current/poll";
import { AddPollComponent } from "../poll/add/add";
import { MessageComponent } from "../message/message.component";
import { EventComponent } from "../event/event.component";
import { SurveyComponent } from "../survey/survey.component";
import { CurrentSurveyComponent } from "../survey/current/survey";
import { ClosedSurveyComponent } from "../survey/closed/survey";
import { AddSurveyComponent } from "../survey/add/add";
import { StudentRatingComponent } from "../studentRating/studentRating.component";
import { ViewSurveyComponent } from "../survey/view/survey";
import { SuggestionComponent } from "../suggestion/suggestion.component";
import { SuggestionForMe } from "../suggestion/for-me/forme";
import { SuggestionForStudent } from "../suggestion/for-student/forstudent";
import { SuggestionAddComponent } from "../suggestion/add/add";
import { GoogleChart } from '../../customComponent/chart.directive';
import { CustomLoader} from '../../customComponent/loader.component';
import { CalendarComponent } from "../../angular2-fullcalendar/src/calendar/calendar";


import { LoggedInGuard } from "../login/login.gaurd";
import { Configuration } from "../../providers/app.constant";
import { CommonService } from "../../providers/common.service";
import { CustomHttpService } from "../../providers/default.header.service";
import { AuthService } from "../../providers/auth.service";
import { ComplaintService } from "../../providers/complaint.service";
import { ChartService } from "../../providers/chart.service";
import { HomeworkService } from "../../providers/homework.service";
import { CircularService } from "../../providers/circular.service";
import { ValidationService } from "../../providers/formValidation.service";
import { AdminService } from "../../providers/admin.service";
import { AppreciationService } from "../../providers/appreciation.service";
import { PollService } from "../../providers/poll.service";
import { EventService } from "../../providers/event.service";
import { SuggestionService } from "../../providers/suggestion.service";
import { StudentRatingService } from "../../providers/studentRating.service";
import { SurveyService } from "../../providers/survey.service";
import { MessageService } from "../../providers/message.service";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ErrorComponent } from "../error/error.component";
import { Error404Component } from "../error/error404";

const rootRouterConfig:Routes = [
  { path: '', component: MainComponent,
  children:[
    { path: 'forgot-password', component: ForgotPassword },
    { path: 'dashboard', component: DashboardComponent, canActivate: [LoggedInGuard] },
    { path: 'complaint', component: ComplaintComponent, canActivate: [LoggedInGuard] },
    { path: 'complaint/status/:statusId', component: ComplaintComponent, canActivate: [LoggedInGuard] },
    { path: 'complaint/category-status/category/:categoryId', component: ComplaintComponent, canActivate: [LoggedInGuard] },
    { path: 'complaint/category-status/:categoryId/:statusId', component: ComplaintComponent, canActivate: [LoggedInGuard] },
    { path: 'circular', component: CircularComponent, canActivate: [LoggedInGuard] },
    { path: 'add-circular', component: AddCircular, canActivate: [LoggedInGuard] },
    {
      path: 'homework', component: HomeworkComponent, canActivate: [LoggedInGuard],
      children: [
        { path: 'current-homework', component: CurrentHomework, canActivate: [LoggedInGuard] },
        { path: 'passed-homework', component: PassedHomework, canActivate: [LoggedInGuard] }
      ]
    },
    { path: 'homework-add', component: HomeworkAddComponent, canActivate: [LoggedInGuard] },
    { path: 'account', component: AccountComponent },
    { path: 'add-employee', component: AddEmployeeComponent, canActivate: [LoggedInGuard] },
    {
      path: 'add-student', component: AddStudentComponent, canActivate: [LoggedInGuard],
      children: [
        { path: 'new-student', component: NewStudentComponent, canActivate: [LoggedInGuard] },
        { path: 'existing-student', component: ExistingStudentComponent, canActivate: [LoggedInGuard] },

      ]
    },
    {
      path: 'appreciation', component: AppreciationComponent, canActivate: [LoggedInGuard],
      children: [
        { path: 'for-me', component: ForMeComponent, canActivate: [LoggedInGuard] },
        { path: 'for-student', component: ByMeComponent, canActivate: [LoggedInGuard] }
      ]
    },
    { path: 'add-appreciation', component: AddAppreciation, canActivate: [LoggedInGuard] },
    {
      path: 'poll', component: PollComponent, canActivate: [LoggedInGuard],
      children: [
        { path: 'current-poll', component: CurrentPollComponent, canActivate: [LoggedInGuard] },
        { path: 'closed-poll', component: ClosedPollComponent, canActivate: [LoggedInGuard] }
      ]
    },
    { path: 'add-poll', component: AddPollComponent, canActivate: [LoggedInGuard] },
    { path: 'conversation', component: MessageComponent, canActivate: [LoggedInGuard], },
    { path: 'event', component: EventComponent, canActivate: [LoggedInGuard] },
    {
      path: 'survey', component: SurveyComponent, canActivate: [LoggedInGuard],
      children: [
        {
          path: 'current-survey', component: CurrentSurveyComponent, canActivate: [LoggedInGuard],
        },
        { path: 'closed-survey', component: ClosedSurveyComponent, canActivate: [LoggedInGuard] },

      ]
    },
    { path: 'add-survey', component: AddSurveyComponent, canActivate: [LoggedInGuard] },
    {
      path: 'poll', component: PollComponent, canActivate: [LoggedInGuard],
      children: [
        { path: 'current-poll', component: CurrentPollComponent, canActivate: [LoggedInGuard] },
        { path: 'closed-poll', component: ClosedPollComponent, canActivate: [LoggedInGuard] }
      ]
    },
    { path: 'add-poll', component: AddPollComponent, canActivate: [LoggedInGuard] },
    { path: 'add-employee', component: AddEmployeeComponent, canActivate: [LoggedInGuard] },
    { path: 'student-profile', component: StudentRatingComponent, canActivate: [LoggedInGuard] },
    { path: 'view-survey/:id', component: ViewSurveyComponent, canActivate: [LoggedInGuard] },
    {
      path: 'suggestion', component: SuggestionComponent,
      children: [
        { path: 'for-me', component: SuggestionForMe, canActivate: [LoggedInGuard] },
        { path: 'for-student', component: SuggestionForStudent, canActivate: [LoggedInGuard] }
      ]
    },
    { path: 'suggestion-add', component: SuggestionAddComponent, canActivate: [LoggedInGuard] },
  ]
    
  },
  { path: 'error', component: ErrorComponent, canActivate: [LoggedInGuard] },
  { path: 'error404', component: Error404Component, canActivate: [LoggedInGuard] },
  { path: '**', redirectTo: '/error404', canActivate: [LoggedInGuard] },
];


@NgModule({
imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule.forChild(rootRouterConfig),
  ],
  declarations: [
    MainComponent,
    ForgotPassword,
    DashboardComponent,
    ComplaintComponent,
    CircularComponent,
    AddCircular,
    HomeworkComponent,
    HomeworkAddComponent,
    CurrentHomework,
    PassedHomework,
    GoogleChart,
    CustomLoader,
    AccountComponent,
    AppreciationComponent,
    ForMeComponent,
    ByMeComponent,
    AddEmployeeComponent,
    AddAppreciation,
    PollComponent,
    AddPollComponent,
    CurrentPollComponent,
    ClosedPollComponent,
    CalendarComponent,
    EventComponent,
    SurveyComponent,
    AddSurveyComponent,
    CurrentSurveyComponent,
    ClosedSurveyComponent,
    PollComponent,
    AddPollComponent,
    CurrentPollComponent,
    ClosedPollComponent,
    StudentRatingComponent,
    ViewSurveyComponent,
    SuggestionComponent,
    SuggestionForMe,
    SuggestionForStudent,
    SuggestionAddComponent,
    MessageComponent,
    ErrorComponent,
    Error404Component,
    AddStudentComponent,
    NewStudentComponent,
    ExistingStudentComponent,
    ],
  providers: [
    LoggedInGuard,
    Configuration,
    CommonService,
    CustomHttpService,
    AuthService,
    ComplaintService,
    ChartService,
    HomeworkService,
    CircularService,
    ValidationService,
    AdminService,
    AppreciationService,
    PollService,
    EventService,
    PollService,
    StudentRatingService,
    SurveyService,
    SuggestionService,
    MessageService,
    {
      provide: CustomHttpService,
      useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) => {
        return new CustomHttpService(backend, defaultOptions);
      },
      deps: [XHRBackend, RequestOptions]
    }
   ],
})
export class MainModule{ }