import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../../providers/survey.service';
import { Router } from '@angular/router';
import { LoaderStop } from '../../../providers/loaderstop.service';
declare let $: any;

@Component({
  selector: 'current-survey',
  templateUrl: './survey.html',
  styleUrls: ['./survey.css'],
})

export class CurrentSurveyComponent implements OnInit {
  public currentPage: number = 1;
  public surveys: any[];
  public selectedSurvey: any;
  public emptySurveys: boolean = false;
  public noMore: boolean = false;
  public loader: boolean = false;

  constructor(public ss: SurveyService, public ls : LoaderStop, public router: Router) { 
ls.setLoader(false);
  }

  ngOnInit() {
    this.getSurveys();
  }

  public getSurveys() {
    this.loader = true;
    this.ss.getSurveys(this.currentPage).subscribe(res => {
      if (res.status == 204) {
        this.emptySurveys = true;
        this.loader = false;
        return;
      }
      this.surveys = res;
      if (this.surveys.length < 12) this.noMore = true;
      else this.noMore = false;
      this.loader = false;
    },
      err => {
        this.loader = false;
        this.router.navigate(['/error']);
      })
  }

  // public previousSurvey() {
  //   delete this.surveys;
  //   this.currentPage -= 1;
  //   this.getSurveys();
  // }

  public nextSurvey() {
    // delete this.surveys;
    this.currentPage += 1;
    this.getSurveys();
  }

}