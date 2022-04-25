import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-page-not-found-component',
  templateUrl: './page-not-found-component.component.html',
  styleUrls: ['./page-not-found-component.component.css']
})
export class PageNotFoundComponentComponent implements OnInit {

  constructor(
    private title:Title
  ) {
    this.title.setTitle('404 Error - StackOverflowSearch')
  }

  ngOnInit(): void {
  }

}
