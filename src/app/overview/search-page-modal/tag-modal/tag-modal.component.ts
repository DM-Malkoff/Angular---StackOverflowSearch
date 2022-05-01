import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {StackExchangeService} from "../../../shared/services/se-api.service";
import {CleaningCodeService} from "../../../shared/services/cleaning-code.service";
import {LoaderService} from "../../../shared/services/loader/loader.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tag-modal',
  templateUrl: './tag-modal.component.html',
  styleUrls: ['./tag-modal.component.css']
})
export class TagModalComponent implements OnInit, OnDestroy {
  private subsTags: Subscription

  @Input() tagName: any;
  @Input() tagClicked: any;
  @Input() fromTagClicked: any;

  getApiError = false
  apiErrorMessage = ''
  tagData: any;

  constructor(
    public stackExchangeService: StackExchangeService,
    public cleaningCodeService: CleaningCodeService,
    public router: Router,
    public loaderService: LoaderService,
  ) {
    this.stackExchangeService.getApiError$.subscribe((response) => {
      if (response === true) {
        this.getApiError = true
        this.apiErrorMessage = stackExchangeService.getApiErrorMessage
      }
    })
    this.subsTags = this.stackExchangeService.apiTags$.subscribe((apiUrlTag: any) => {
      this.tagData = apiUrlTag
      if (this.tagData.items) {
        this.tagClicked = true
        this.tagData.items.forEach(function (value: any) {
          value.title = cleaningCodeService.cleanCode(value.title)
          value.link = value.title.replace(/[^a-zA-Z ]/g, "")//убираем все ненужные символы из Url
          value.link = value.link.replaceAll(" ", "-").toLowerCase()
        })
      }
    })
  }

  ngOnInit(): void {

  }

  closeModal() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }; //запрет на повторное использование маршрута
    document.getElementById('closeTagModal')!.click();
    let url: string = document.location.pathname
  }

  ngOnDestroy(): void {
    this.subsTags.unsubscribe()
  }
}
