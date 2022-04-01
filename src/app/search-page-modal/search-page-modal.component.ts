import {Component, Input, OnInit} from '@angular/core';
import {SearchResultsPageComponent} from "../search-results-page/search-results-page.component";

@Component({
  selector: 'app-search-page-modal',
  templateUrl: './search-page-modal.component.html',
  styleUrls: ['./search-page-modal.component.css']
})
export class SearchPageModalComponent implements OnInit {
  @Input()
  authorName='';
  authorData:any;
  @Input()
  tagName:any;
  tagData:any;
  constructor(
    public searchResultsPageComponent:SearchResultsPageComponent
  ) {
    this.searchResultsPageComponent.apiAuthors$.subscribe((apiUrlAuthor: any) => {
      this.authorData = apiUrlAuthor
      console.log("HI",this.authorData)
    });
    this.searchResultsPageComponent.apiTags$.subscribe((apiUrlTag: any) => {
      this.tagData = apiUrlTag
      console.log("Hey",this.tagData)
    });
  }

  ngOnInit(): void {
  }

}
