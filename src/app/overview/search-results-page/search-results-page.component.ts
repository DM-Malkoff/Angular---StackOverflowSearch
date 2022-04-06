import {Component, OnDestroy, OnInit} from '@angular/core';
import {StackExchangeService} from "../../shared/services/se-api.service";
import {Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-search-results-page',
  templateUrl: './search-results-page.component.html',
  styleUrls: ['./search-results-page.component.css']
})

export class SearchResultsPageComponent implements OnInit, OnDestroy {
  private subsQuery: Subscription
  private subsApiObject: Subscription
  private subsAuthor: Subscription
  private subsTag: Subscription
  public apiTags$ = new Subject();
  public apiAuthors$ = new Subject();

  sentQuery = '';
  searchQuery = '';
  paramQuery = '';
  questionLink:any;
  apiTags:any;

  getApiTagObject: any;
  apiLoaded = false;
  apiItems: any;
  isItems = false;
  queryError = false;
  getApiUrlSearch: any;
  getApiUrlAuthor: any;
  getApiUrlTag: any;
  authorData: any;
  tagData: any;
  authorId = ''
  tagName = ''
  authorName = ''
  isTagItems = false
  isAuthorItems = false
  authorClicked = false
  tagClicked = false
  questionId=''

  constructor(
    private stackExchangeService: StackExchangeService,
  ) {
    this.subsQuery = this.stackExchangeService.apiSearchQuery$.subscribe((sentQuery: string) => {
      this.sentQuery = sentQuery;
    });
    this.subsApiObject = this.stackExchangeService.apiUrlSearch$.subscribe((getApiUrlSearch: any) => {
      this.getApiUrlSearch = getApiUrlSearch
      this.isItems = this.stackExchangeService.isItems
      this.queryError = this.stackExchangeService.queryError
      this.getApiUrlSearch.subscribe((apiObject: object) => {
        this.apiItems = apiObject;
        this.apiLoaded = true;
        console.log(this.apiItems)
        if (this.apiItems.items.length > 0) {
          this.isItems = true
          this.apiItems.items.forEach(function (value: any) {
            value.title = value.title.replaceAll("&#39;", "\'").replaceAll("&amp;", "&").replaceAll("&quot;","\"")
            value.link = value.title.replace(/[^a-zA-Z ]/g, "")
            value.link = value.link.replaceAll(" ","-").toLowerCase( )
            //value.title = value.title.replaceAll("&amp;", "&")
            //console.log(value.title);
          });

        } else {
          this.queryError = true;
        }
        //console.log("222", this.apiLoaded)
      })
    });
    this.subsTag = this.stackExchangeService.apiTagSearch$.subscribe((getApiUrlTag: any) => {
      this.getApiUrlTag = getApiUrlTag;
      this.getApiUrlTag.subscribe((tagQuestionsObject: object) => {
        this.tagData = tagQuestionsObject;
        console.log("Tag object: ", this.tagData)
        this.isTagItems = true
      })
    });
    this.subsAuthor = this.stackExchangeService.apiAuthorSearch$.subscribe((getApiUrlAuthor: any) => {
      this.getApiUrlAuthor = getApiUrlAuthor;
      this.getApiUrlAuthor.subscribe((authorObject: object) => {
        this.authorData = authorObject;
        console.log("Author object: ", this.authorData)
        this.isAuthorItems = true
      })
    });

  }

  passAuthorData(userData: string, userName: string): void {
    this.authorClicked = true
    this.authorId = userData
    this.authorName = userName
    console.log("From Parent", this.authorId)
    this.stackExchangeService.getAuthorQuestions(this.authorId).subscribe((apiAuthors)=>{
      this.apiAuthors$.next(apiAuthors)
    })
  }

  passTagData(tagName: string): void {
    this.tagName = tagName
    console.log("Tag from Parent", this.tagName)
    this.stackExchangeService.getTagQuestions(this.tagName).subscribe((apiTags) => {
      this.apiTags$.next(apiTags)
    })
  }
  passQuestionId(questionId:string): void{
    this.questionId = questionId
    this.stackExchangeService.getAnswers(this.questionId)
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subsQuery.unsubscribe()
    this.subsApiObject.unsubscribe()
    this.subsAuthor.unsubscribe()
    this.subsTag.unsubscribe()
  }
}

