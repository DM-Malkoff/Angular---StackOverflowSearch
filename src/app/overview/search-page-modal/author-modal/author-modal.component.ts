import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {StackExchangeService} from "../../../shared/services/se-api.service";
import {LoaderService} from "../../../shared/services/loader/loader.service";
import {CleaningCodeService} from "../../../shared/services/cleaning-code.service";

@Component({
  selector: 'app-search-page-modal',
  templateUrl: './author-modal.component.html',
  styleUrls: ['./author-modal.component.css']
})
export class AuthorModalComponent implements OnInit {
  @Input()
  authorName = '';
  authorData: any;
  authorClicked: any
  haveAnswers = false
  subApiAuthors: Subscription
  getApiError = false
  apiErrorMessage = ''
  amount = ''

  constructor(
    public loaderService: LoaderService,
    private stackExchangeService: StackExchangeService,
    public cleaningCodeService:CleaningCodeService
  ) {
    this.stackExchangeService.getApiError$.subscribe((response) => {
      if (response === true){
        this.getApiError = true
        this.apiErrorMessage = stackExchangeService.getApiErrorMessage
      }
    })
    this.subApiAuthors = this.stackExchangeService.apiAuthor$.subscribe((apiUrlAuthor: any) => {
        this.authorData = apiUrlAuthor
        this.authorClicked = true
        this.amount = apiUrlAuthor.items.length
        if (apiUrlAuthor.has_more == true) {
          this.amount = '30+'
        }
        this.haveAnswers = !!this.authorData.items.length
        this.authorData.items.forEach(function (value: any) {
          value.title = cleaningCodeService.cleanCode(value.title)
          value.link = value.title.replace(/[^a-zA-Z ]/g, "")
          value.link = value.link.replaceAll(" ", "-").toLowerCase()
        })
      }
    );
  }

  ngOnInit(): void {

  }

  closeModal() {
    document.getElementById('closeAuthorModal')!.click()
    this.ngOnInit();
  }

  ngOnDestroy(): void {
    this.subApiAuthors.unsubscribe()
  }
}
