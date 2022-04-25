import {Component, OnDestroy, OnInit} from '@angular/core';
import {StackExchangeService} from "../../shared/services/se-api.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {Title} from "@angular/platform-browser";
import {SortService} from "../../shared/services/sort.service";
import {CleaningCodeService} from "../../shared/services/cleaning-code.service";

@Component({
  selector: 'app-question-info-page',
  templateUrl: './question-info-page.component.html',
  styleUrls: ['./question-info-page.component.css'],

})

export class QuestionInfoPageComponent implements OnInit, OnDestroy {
  private subsAnswers!: Subscription
  private subQuestion: Subscription
  private subsUrlAnswers: Subscription
  private subQuestionInfo!: Subscription

  isAnswerItems = false
  getApiUrlAnswers: any
  answersData: any
  answersDataLength = ''
  QuestionInfo: any
  questionData: any
  questionTitle = ''
  viewCount = ''
  questionBody = ''
  questionTags: any
  questionAuthorImg = ''
  questionAuthorName = ''
  questionUserId = ''
  questionAuthorReputation = ''
  questionUserDate = 0
  tagClicked = false
  tagName = ''
  authorName = ''
  authorId = ''
  selectedItem = ''
  paramQuery = ''
  sortParam = 'votes'
  sortType = 'Desc'
  sortAnswers = this.sortService.sortAnswers

  constructor(
    public stackExchangeService: StackExchangeService,
    public sortService: SortService,
    public cleaningCodeService: CleaningCodeService,
    private activatedRoute: ActivatedRoute,
    private _location: Location,
    private title: Title,
    private router: Router
  ) {
    this.subQuestion = this.stackExchangeService.apiQuestionSearch$.subscribe(
      (questionInfoObject: any) => {
        this.QuestionInfo = questionInfoObject;
        this.subQuestionInfo = this.QuestionInfo.subscribe(
          (questionData: any) => {
            this.questionData = questionData
            if (this.questionData.items) {
              this.questionTitle = this.cleaningCodeService.cleanCode(questionData.items[0].title)
              this.title.setTitle(this.questionTitle)
              this.viewCount = questionData.items[0].view_count
              this.questionBody = questionData.items[0].body
              this.questionTags = questionData.items[0].tags
              this.questionUserDate = questionData.items[0].creation_date * 1000
              this.questionAuthorImg = questionData.items[0].owner.profile_image
              this.questionAuthorName = questionData.items[0].owner.display_name
              this.questionUserId = questionData.items[0].owner.user_id
              this.questionAuthorReputation = questionData.items[0].owner.reputation
            }
          }
        )
      }
    )
    this.subsUrlAnswers = this.stackExchangeService.apiAnswersSearch$.subscribe(
      (getApiUrlAnswers: any) => {

        this.getApiUrlAnswers = getApiUrlAnswers;
        this.subsAnswers = this.getApiUrlAnswers.subscribe(
          (answersObject: any) => {
            console.log("answersObject: ", answersObject)
            this.answersData = answersObject;
            if (this.answersData.has_more === true) {
              this.answersDataLength = '30+'
            } else {
              this.answersDataLength = this.answersData.items.length
            }
            if (this.answersData.items.length > 0) {
              this.isAnswerItems = true
            }
          }
        )
      }
    )

  }

  ngOnInit(): void {
    this.paramQuery = this.activatedRoute.snapshot.paramMap.get("questionId") ?? ''
    this.sortParam = (this.activatedRoute.snapshot.queryParamMap.get('sort') === null) ?
      'votes' : this.activatedRoute.snapshot.queryParamMap.get('sort') ?? ''
    alert("On page " + this.sortParam)
    this.sortType = (this.activatedRoute.snapshot.queryParamMap.get('type') === null) ?
      'desc' : this.sortType = this.activatedRoute.snapshot.queryParamMap.get('type') ?? ''
    if (this.paramQuery) {
      this.stackExchangeService.getQuestionInfo(this.paramQuery)
      this.stackExchangeService.getAnswers(this.paramQuery, this.sortParam, this.sortType)
    }
  }

  returnToSearch() {
    let searchQuery: string = localStorage.getItem('searchQuery') ?? '';
    localStorage.removeItem('searchQuery')
    this.router.navigateByUrl(`/search/q/${searchQuery}`)
  }

  sendTagData(tagName: string): void {
    this.subsUrlAnswers.unsubscribe()
    this.tagName = tagName
    this.stackExchangeService.passTagData(this.tagName)
  }

  sendAuthorData(userData: string, userName: string): void {
    this.authorId = userData
    this.authorName = userName
    this.stackExchangeService.passAuthorData(this.authorId)
  }

  onSortChange(obj: any) {
    let optionSort = obj.value;
    alert("In change time " + obj.value)
    let selectedSort = this.sortAnswers.find(item => item.sortName === optionSort)
    let url: string = document.location.pathname
    this.router.navigate([url], {
      queryParams: {sort: selectedSort?.sortName, type: selectedSort?.sortType},
      queryParamsHandling: null
    })
    this.stackExchangeService.getAnswers(this.paramQuery, this.sortParam, this.sortType)
    this.ngOnInit();
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
