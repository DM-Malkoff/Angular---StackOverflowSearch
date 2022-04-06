import {Component, DoCheck, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {StackExchangeService} from "../../shared/services/se-api.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  @Input()
  sentQuery = '';
  searchQuery = '';
  paramQuery='';
  isItems = false;
  isClicked = false;
  // @ts-ignore
  form: FormGroup;
  query = ''

  constructor(
    private stackExchangeService: StackExchangeService,
    private router: Router,
    private activatedRoute:ActivatedRoute

  ) {
  }
  ngOnInit() {
    let paramQuery = this.activatedRoute.snapshot.paramMap.get("searchQuery")
    if (paramQuery){
      this.form = new FormGroup({
          searchQuery: new FormControl( paramQuery, [Validators.required])
        }
      )
      this.autoLoad(paramQuery)//выводим результат если введен напрямую в адреснной строке или вернулись на пред.страницы
    }
    else{
      this.form = new FormGroup({
          searchQuery: new FormControl( this.sentQuery, [Validators.required])
        }
      )
    }
  }
  getQuestionsList() {
    this.searchQuery = this.form.get("searchQuery")?.value
    this.router.navigateByUrl(`/search/q/${this.searchQuery}`).then(() => {
      this.stackExchangeService.getSearchResult(this.searchQuery)
    })
  }
  autoLoad(paramQuery:string) {
    this.searchQuery = paramQuery
    this.router.navigateByUrl(`/search/q/${this.searchQuery}`).then(() => {
      this.stackExchangeService.getSearchResult(this.searchQuery)
    })
  }
}
