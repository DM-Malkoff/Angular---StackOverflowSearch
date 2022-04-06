import {Component, Input, OnInit} from '@angular/core';
import {SearchResultsPageComponent} from "../../search-results-page/search-results-page.component";

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

  constructor(
    public searchResultsPageComponent:SearchResultsPageComponent
  ) {
    this.searchResultsPageComponent.apiAuthors$.subscribe((apiUrlAuthor: any) => {
      this.authorData = apiUrlAuthor
      this.authorClicked=true
      console.log("HI",this.authorData)
    });
  }

  ngOnInit(): void {


  }

}
