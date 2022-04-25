import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {StackExchangeService} from "../../../shared/services/se-api.service";

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
    public seService:StackExchangeService
  ) {
      this.subsTags = this.seService.apiTags$.subscribe((apiUrlTag: any) => {
        this.tagData = apiUrlTag
        if (this.tagData.items){
          this.tagClicked = true
          this.tagData.items.forEach(function (value: any) {
            value.title = value.title.replaceAll("&#39;", "\'").replaceAll("&amp;", "&").replaceAll("&quot;", "\"")
            value.link = value.title.replace(/[^a-zA-Z ]/g, "")
            value.link = value.link.replaceAll(" ","-").toLowerCase( )
          })
        }
      })
  }

  ngOnInit(): void {

  }
  closeModal(){
    document.getElementById('closeTagModal')!.click();
    //location.reload()
  }
  ngOnDestroy():void {
    this.subsTags.unsubscribe()
  }

}
