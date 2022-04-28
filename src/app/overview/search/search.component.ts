import {Component, DoCheck, Input, EventEmitter, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {StackExchangeService} from "../../shared/services/se-api.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {searchFormMove} from "../../shared/animations/app.animations";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [searchFormMove]
})
export class SearchComponent implements OnInit{
  @Input() sentQuery = '';
  sortParam = 'activity'
  sortType = 'desc'
  searchQuery = '';
  paramQuery='';
  isItems = false;
  isClicked = false;
  // @ts-ignore
  form: FormGroup;
  query = ''

  clickState='end'

  constructor(
    private stackExchangeService: StackExchangeService,
    private router: Router,
    private activatedRoute:ActivatedRoute,
    private title:Title
  ) {
    this.title.setTitle('Search from StackOverflow')
  }
  ngOnInit() {
    let paramQuery = this.activatedRoute.snapshot.paramMap.get("searchQuery")
    if (paramQuery){
      this.form = new FormGroup({
          searchQuery: new FormControl( paramQuery, [Validators.required])
        }
      )
    }
    else{
      this.form = new FormGroup({
          searchQuery: new FormControl( this.sentQuery, [Validators.required])
        }
      )
      this.clickState='start'
    }
  }
  // String.prototype.escapeURI = function () {
  //   return encodeURIComponent(this).replace(/%20/g, '+');
  // }
  getQuestionsList() {
    this.stackExchangeService.clearQueryParams = true
    alert(this.sortParam + this.sortType)
    this.searchQuery = this.form.get("searchQuery")?.value
    this.router.navigateByUrl(`/search/q/${this.searchQuery}`).then(() => {
          this.stackExchangeService.getSearchResult(this.searchQuery, this.sortParam, this.sortType)
        }
    )
  }

  buttonPress(){
    this.clickState='end';
    setTimeout(() => {
        this.getQuestionsList()
      },
      500)
  }
}
