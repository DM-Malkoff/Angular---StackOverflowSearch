import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StackExchangeService {

  constructor(private httpClient: HttpClient) {

  }

  apiUrlSearch: any
  apiAnswersSearch: any
  apiQuestionSearch: any
  getApiError = false
  isItems = false
  queryError = false
  searchQueryStore = ''
  clearQueryParams = false
  tagName = ''
  authorId = ''

  site = 'stackoverflow'
  apiUrl = 'https://api.stackexchange.com/2.3/search/advanced'
  apiAuthorUrl = 'https://api.stackexchange.com/2.3/users/'
  apiTagUrl = 'https://api.stackexchange.com/2.3/tags/'
  apiAnswersUrl = 'https://api.stackexchange.com/2.3/questions/'
  getApiErrorMessage = 'Oooops, server not response, please try later';

  public apiSearchQuery$ = new Subject<string>()
  public apiUrlSearch$ = new Subject()
  public apiAuthorSearch$ = new Subject()
  public apiTagSearch$ = new Subject()
  public apiAnswersSearch$ = new Subject()
  public apiQuestionSearch$ = new Subject()
  public apiTags$ = new Subject()
  public apiAuthor$ = new Subject()
  public getApiError$ = new Subject()

  getSearchResult(searchQuery: string, sort: string, sortType: string) {
    this.searchQueryStore = searchQuery
    this.apiUrlSearch = this.httpClient.get(`${this.apiUrl}?order=${sortType}&sort=${sort}&q=${searchQuery}&site=${this.site}`)
    //console.log("URL:  ", `${this.apiUrl}?order=${sortType}&sort=${sort}&q=${searchQuery}&site=${this.site}`)
    this.apiSearchQuery$.next(searchQuery);
    this.apiUrlSearch$.next(this.apiUrlSearch);
    localStorage.setItem('searchQuery', this.searchQueryStore)
  }

  getAuthorQuestions(authorId: string) {
    return this.httpClient.get(`${this.apiAuthorUrl}${authorId}/questions?order=desc&sort=activity&site=${this.site}`)
  }

  getTagQuestions(tagName: string) {
    return this.httpClient.get(`${this.apiTagUrl}${tagName}/faq?site=${this.site}`)
  }

  getQuestionInfo(questionId: string) {
    this.apiQuestionSearch = this.httpClient.get(`${this.apiAnswersUrl}${questionId}?site=stackoverflow&filter=withbody`)
    this.apiQuestionSearch$.next(this.apiQuestionSearch)
  }

  getAnswers(questionId: string, sort: string, sortType: string) {
    this.apiAnswersSearch = this.httpClient.get(`${this.apiAnswersUrl}${questionId}/answers?order=${sortType}&sort=${sort}&site=${this.site}&filter=withbody`)
    this.apiAnswersSearch$.next(this.apiAnswersSearch)
    console.log("urlApi: ", `${this.apiAnswersUrl}${questionId}/answers?order=${sortType}&sort=${sort}&site=${this.site}&filter=withbody`)
  }

  passTagData(tagName: string): void {
    this.tagName = tagName
    this.getTagQuestions(this.tagName).subscribe((apiTags) => {
        this.apiTags$.next(apiTags)
      },
      (error: any) => {
        this.getApiError$.next(true);
      }
    )
  }

  passAuthorData(authorId: string): void {
    this.authorId = authorId
    this.getAuthorQuestions(this.authorId).subscribe((apiAuthor) => {
        this.apiAuthor$.next(apiAuthor)
      },
      (error: any) => {
        this.getApiError$.next(true);
      }
    )
  }
}
