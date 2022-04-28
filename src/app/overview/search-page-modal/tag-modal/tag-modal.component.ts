import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {StackExchangeService} from "../../../shared/services/se-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CleaningCodeService} from "../../../shared/services/cleaning-code.service";

@Component({
  selector: 'app-tag-modal',
  templateUrl: './tag-modal.component.html',
  styleUrls: ['./tag-modal.component.css']
})
export class TagModalComponent implements OnInit, OnDestroy {
  private subsTags: Subscription

  @Input() tagName:any;
  @Input() tagClicked:any;
  @Input() fromTagClicked:any;


  tagData:any;

  constructor(
    public seService:StackExchangeService,
    public cleaningCodeService:CleaningCodeService,
    public router:Router
) {
    this.subsTags = this.seService.apiTags$.subscribe((apiUrlTag: any) => {
      this.tagData = apiUrlTag
      if (this.tagData.items){
        this.tagClicked = true
        this.tagData.items.forEach(function (value: any) {
          //value.title = value.title.replaceAll("&#39;", "\'").replaceAll("&amp;", "&").replaceAll("&quot;", "\"")
          value.title = cleaningCodeService.cleanCode(value.title)
          value.link = value.title.replace(/[^a-zA-Z ]/g, "")//убираем все ненужные символы из Url
          value.link = value.link.replaceAll(" ","-").toLowerCase( )
        })
      }
    })
  }

  ngOnInit(): void {

  }
  closeModal(){
    this.router.routeReuseStrategy.shouldReuseRoute = function() { return false; }; //запрет на повторное использование маршрута
    document.getElementById('closeTagModal')!.click();
    let url: string = document.location.pathname
    // this.router.navigate([url], {
    //   queryParams: {sort: selectedSort?.sortName, type: selectedSort?.sortType},
    //   queryParamsHandling: null
    // })
    //this.router.navigateByUrl()
    //location.reload()

  }
  ngOnDestroy():void {
    this.subsTags.unsubscribe()
  }

}
