import {Component, OnDestroy, OnInit} from '@angular/core';
import {StackExchangeService} from "../../shared/services/se-api.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-question-info-page',
  templateUrl: './question-info-page.component.html',
  styleUrls: ['./question-info-page.component.css']
})

export class QuestionInfoPageComponent implements OnInit, OnDestroy {
  private subsAnswers!: Subscription
  private subQuestion: Subscription
  private subsUrlAnswers: Subscription
  private subQuestionInfo!: Subscription
  public sanitizer!: DomSanitizer

  isAnswerItems = false
  getApiUrlAnswers: any
  answersData: any
  answersDataLength = ''
  QuestionInfo: any
  questionData: any
  questionTitle = ''
  viewCount = ''
  questionBody=''
  questionTags:any
  questionAuthorImg = ''
  questionAuthorName = ''
  questionAuthorReputation = ''

  constructor(
    public stackExchangeService: StackExchangeService,
    private activatedRoute: ActivatedRoute,
    private _location: Location
  ) {
    this.subQuestion = this.stackExchangeService.apiQuestionSearch$.subscribe(
      (questionInfoObject: any) => {
        this.QuestionInfo = questionInfoObject;
        this.subQuestionInfo = this.QuestionInfo.subscribe(
          (questionData: any) => {
            this.questionData = questionData
            if (this.questionData.items) {
              this.questionTitle = questionData.items[0].title.replaceAll("&#39;", "\'").replaceAll("&amp;", "&").replaceAll("&quot;","\"")
              this.viewCount = questionData.items[0].view_count
              this.questionBody = questionData.items[0].body
              this.questionTags = questionData.items[0].tags
              this.questionAuthorImg = questionData.items[0].owner.profile_image
              this.questionAuthorName = questionData.items[0].owner.display_name
              this.questionAuthorReputation = questionData.items[0].owner.reputation
            }
          }
        )
      }
    )
    this.subsUrlAnswers = this.stackExchangeService.apiAnswersSearch$.subscribe((getApiUrlAnswers: any) => {
      this.getApiUrlAnswers = getApiUrlAnswers;
      this.subsAnswers = this.getApiUrlAnswers.subscribe((answersObject: any) => {
        this.answersData = answersObject;
        if (this.answersData.has_more === true) {
          this.answersDataLength = '30+'
        } else {
          this.answersDataLength = this.answersData.items.length
        }
        console.log("Answers object: ", this.answersData)
        if (this.answersData.items.length > 0) {
          this.isAnswerItems = true
        }
      })
    });

  }

  ngOnInit(): void {
    let paramQuery = this.activatedRoute.snapshot.paramMap.get("questionId")
    if (paramQuery) {
      this.stackExchangeService.getQuestionInfo(paramQuery)
      this.stackExchangeService.getAnswers(paramQuery)
    }
  }
  returnBack(){
    this._location.back()
  }

  ngOnDestroy(): void {
    if (this.subsUrlAnswers) {
      this.subsUrlAnswers.unsubscribe()
    }
    if (this.subsAnswers) {
      this.subsAnswers.unsubscribe()
    }
    if (this.subQuestion) {
      this.subQuestion.unsubscribe()
    }
    if (this.subQuestionInfo) {
      this.subQuestionInfo.unsubscribe()
    }
  }
}
