import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StackExchangeService {

  constructor(private httpClient:HttpClient) {

  }
  apiUrlSearch:any
  apiAuthorSearch:any
  apiTagSearch:any
  apiAnswersSearch:any
  isItems = false
  queryError = false
  site = 'stackoverflow'
  apiUrl = 'https://api.stackexchange.com/2.3/search/advanced?q='
  apiAuthorUrl = 'https://api.stackexchange.com/2.3/users/'
  apiTagUrl = 'https://api.stackexchange.com/2.3/tags/'
  apiAnswersUrl='https://api.stackexchange.com/2.3/questions/'

  public apiSearchQuery$ = new Subject<string>();
  public apiUrlSearch$ = new Subject();
  public apiAuthorSearch$ = new Subject();
  public apiTagSearch$ = new Subject();
  public apiAnswersSearch$ = new Subject();

  getSearchResult(searchQuery: string) {
    this.apiUrlSearch = this.httpClient.get(`${this.apiUrl}${searchQuery}&site=${this.site}`)
    this.apiSearchQuery$.next(searchQuery);
    this.apiUrlSearch$.next(this.apiUrlSearch);
  }
  getAuthorQuestions(authorId: string){
    return this.httpClient.get(`${this.apiAuthorUrl}${authorId}/questions?order=desc&sort=activity&site=${this.site}`)
  }
  getTagQuestions(tagName: string){
    return this.httpClient.get(`${this.apiTagUrl}${tagName}/faq?site=${this.site}`)
  }
  getAnswers(questionId:string){
    this.apiAnswersSearch = this.httpClient.get(`${this.apiAnswersUrl}${questionId}/answers?order=desc&sort=activity&site=${this.site}`)
    this.apiAnswersSearch$.next(this.apiAnswersSearch)
    console.log("111",`${this.apiAnswersUrl}${questionId}/answers?order=desc&sort=activity&site=${this.site}`)
  }
}
