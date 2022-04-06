import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SearchResultsPageComponent} from "../../search-results-page/search-results-page.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-tag-modal',
  templateUrl: './tag-modal.component.html',
  styleUrls: ['./tag-modal.component.css']
})
export class TagModalComponent implements OnInit, OnDestroy {
  private subsTags: Subscription


  @Input()
  tagName:any;
  tagData:any;
  @Input()
  tagClicked:any;

  constructor(
    public searchResultsPageComponent:SearchResultsPageComponent
  ) {
    this.subsTags = this.searchResultsPageComponent.apiTags$.subscribe((apiUrlTag: any) => {
      console.log("1. ",this.tagClicked)
      this.tagData = apiUrlTag
      if (this.tagData.items){
        this.tagClicked = true
      }
      console.log("2. ",this.tagClicked)
      console.log("Hey",this.tagData)
    });
  }

  ngOnInit(): void {

  }
  ngOnDestroy():void {
    this.subsTags.unsubscribe()
  }

}
