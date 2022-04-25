import {Component, Input, OnInit} from '@angular/core';
import {SearchResultsPageComponent} from "../../search-results-page/search-results-page.component";
import {Subscription} from "rxjs";
import {StackExchangeService} from "../../../shared/services/se-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search-page-modal',
  templateUrl: './author-modal.component.html',
  styleUrls: ['./author-modal.component.css']
})
export class AuthorModalComponent implements OnInit {
  @Input()
  authorName='';
  authorData:any;
  authorClicked:any
  haveAnswers = false
  subApiAuthors: Subscription
  amount=''


  constructor(
    public seService:StackExchangeService,
    private router: Router
  ) {
    this.subApiAuthors = this.seService.apiAuthor$.subscribe((apiUrlAuthor: any) => {
      this.authorData = apiUrlAuthor
      console.log(apiUrlAuthor)
      this.authorClicked=true
      this.amount = apiUrlAuthor.items.length
      if (apiUrlAuthor.has_more ==true){
        this.amount = '30+'
      }
      this.haveAnswers = !!this.authorData.items.length
      this.authorData.items.forEach(function (value: any) {
        value.title = value.title.replaceAll("&#39;", "\'").replaceAll("&amp;", "&").replaceAll("&quot;", "\"")
        value.link = value.title.replace(/[^a-zA-Z ]/g, "")
        value.link = value.link.replaceAll(" ","-").toLowerCase( )
      })
    });
  }

  ngOnInit(): void {

  }
  closeModal(){
    document.getElementById('closeAuthorModal')!.click()
    this.ngOnInit();
    //location.reload()
  }
  ngOnDestroy():void {
    this.subApiAuthors.unsubscribe()
  }
}
