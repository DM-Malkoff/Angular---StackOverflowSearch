import {Component, OnDestroy, OnInit} from '@angular/core';
import {StackExchangeService} from "../../shared/services/se-api.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-question-info-page',
  templateUrl: './question-info-page.component.html',
  styleUrls: ['./question-info-page.component.css']
})

export class QuestionInfoPageComponent implements OnInit, OnDestroy {
  private subsAnswers!:Subscription

  isAnswerItems=false
  getApiUrlAnswers:any
  AnswersData:any
  her='her'

  constructor(
    public stackExchangeService: StackExchangeService
  ) {
    this.her="her2"
    console.log("Privet", this.stackExchangeService.apiAnswersSearch$)
    this.subsAnswers = this.stackExchangeService.apiAnswersSearch$.subscribe((getApiUrlAnswers: any) => {
      this.her="her3"
      this.getApiUrlAnswers = getApiUrlAnswers;
      this.getApiUrlAnswers.subscribe((AnswersObject: any) => {
        this.AnswersData = AnswersObject;
        console.log("Answers object: ", this.AnswersData)
        if (this.AnswersData.items.length > 0) {
          this.isAnswerItems = true
          console.log(this.isAnswerItems)
        }
      })
    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void{

  }
}
