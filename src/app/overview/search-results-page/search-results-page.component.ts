import {Component, OnDestroy, OnInit} from '@angular/core';
import {StackExchangeService} from "../../shared/services/se-api.service";
import {Subscription} from "rxjs";
import {SortService} from "../../shared/services/sort.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {CleaningCodeService} from "../../shared/services/cleaning-code.service";
import {LoaderService} from "../../shared/services/loader/loader.service";

@Component({
  selector: 'app-search-results-page',
  templateUrl: './search-results-page.component.html',
  styleUrls: ['./search-results-page.component.css'],
})

export class SearchResultsPageComponent implements OnInit, OnDestroy {
  private subsQuery: Subscription
  private subsApiObject: Subscription
  private subsAuthor: Subscription
  private subsTag: Subscription


  sentQuery = '';
  searchQuery = '';
  paramQuery = '';
  apiTags: any;

  getApiTagObject: any;
  apiErrorMessage = '';
  getApiError = false;
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
  tagClicked = false
  questionId = ''
  apiLength = ''
  selectedItem = 'activity'
  sortParam = 'activity'
  sortType = 'desc'
  searchUrl = ''
  isSorted = false
  sortQuestions = this.sortService.sortQuestions

  constructor(
    private stackExchangeService: StackExchangeService,
    private sortService: SortService,
    private cleaningCodeService: CleaningCodeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private title: Title,
    public loaderService: LoaderService
  ) {
    this.subsQuery = this.stackExchangeService.apiSearchQuery$.subscribe(
      (response: string) => {
        this.sentQuery = response;
        this.title.setTitle(`Posts containing "${this.sentQuery}" - Stack Overflow`)
        if (stackExchangeService.clearQueryParams) {
          this.selectedItem = 'activity'
          stackExchangeService.clearQueryParams = false
        }
      });
    this.subsApiObject = this.stackExchangeService.apiUrlSearch$.subscribe(
      (getApiUrlSearch: any) => {
        this.getApiUrlSearch = getApiUrlSearch
        this.isItems = this.stackExchangeService.isItems
        this.queryError = this.stackExchangeService.queryError
        this.getApiUrlSearch.subscribe(
          (apiObject: object) => {
            this.apiItems = apiObject;
            this.apiLoaded = true;
            this.apiItems.items.forEach((item: any) => {
                item.owner.display_name = cleaningCodeService.cleanCode(item.owner.display_name)
              }
            )
            this.apiLength = this.apiItems.items.length
            if (this.apiItems.has_more) {
              this.apiLength = '30+'
            }
            if (this.apiItems.items.length > 0) {
              this.isItems = true
              this.apiItems.items.forEach(function (value: any) {
                value.title = cleaningCodeService.cleanCode(value.title)
                value.link = value.title.replace(/[^a-zA-Z ]/g, "")
                value.link = value.link.replaceAll(" ", "-").toLowerCase()
              });
            } else {
              this.queryError = true;
            }
          },
          (error: any) => {
            this.getApiError = true;
            this.apiErrorMessage = stackExchangeService.getApiErrorMessage
          }
        )
      }
    );
    this.subsTag = this.stackExchangeService.apiTagSearch$.subscribe((getApiUrlTag: any) => {
      this.getApiUrlTag = getApiUrlTag;
      this.getApiUrlTag.subscribe((tagQuestionsObject: object) => {
        this.tagData = tagQuestionsObject;
        this.isTagItems = true
      })
    });
    this.subsAuthor = this.stackExchangeService.apiAuthorSearch$.subscribe((getApiUrlAuthor: any) => {
      this.getApiUrlAuthor = getApiUrlAuthor;
      this.getApiUrlAuthor.subscribe((authorObject: object) => {
        this.authorData = authorObject;
        this.isAuthorItems = true
      })
    });
    this.paramQuery = this.activatedRoute.snapshot.paramMap.get("searchQuery") ?? ''
  }

  sendAuthorData(userData: string, userName: string): void {
    this.authorId = userData
    this.authorName = userName
    this.stackExchangeService.passAuthorData(this.authorId)
  }

  sendTagData(tagName: string): void {
    this.tagName = tagName
    this.stackExchangeService.passTagData(this.tagName)
  }

  ngOnInit(): void {

    this.searchUrl = `/search/q/${this.paramQuery}`
    this.sortParam = (this.activatedRoute.snapshot.queryParamMap.get('sort') === null) ?
      'activity' : this.activatedRoute.snapshot.queryParamMap.get('sort') ?? ''
    this.sortType = (this.activatedRoute.snapshot.queryParamMap.get('type') === null) ?
      'desc' : this.sortType = this.activatedRoute.snapshot.queryParamMap.get('type') ?? ''
    this.autoLoad()//выводим результат если введен напрямую в адреснной строке или вернулись на пред.страницы
  }

  autoLoad() {
    if (this.isSorted) {
      this.stackExchangeService.getSearchResult(this.paramQuery, this.sortParam, this.sortType)
    } else {
      this.router.navigate([this.searchUrl], {
        queryParams: {sort: this.sortParam, type: this.sortType}
      }).then(() => {
        this.stackExchangeService.getSearchResult(this.paramQuery, this.sortParam, this.sortType)
      })
    }
  }

  onSortChange(obj: any) {
    this.isSorted = true
    let optionSort = obj.value;
    let selectedSort = this.sortQuestions.find(item => item.sortName === optionSort)
    this.router.navigate([this.searchUrl], {
      queryParams: {sort: selectedSort?.sortName, type: selectedSort?.sortType},
    }).then(() => {
      this.ngOnInit()
    })
  }

  ngOnDestroy(): void {
    if (this.subsQuery) {
      this.subsQuery.unsubscribe()
    }
    if (this.subsApiObject) {
      this.subsApiObject.unsubscribe()
    }
    if (this.subsAuthor) {
      this.subsAuthor.unsubscribe()
    }
    if (this.subsTag) {
      this.subsTag.unsubscribe()
    }
  }
}

