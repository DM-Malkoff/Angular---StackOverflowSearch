import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component';
import {SiteLayoutComponent} from './shared/layouts/site-layout/site-layout.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {OverviewPageComponent} from './overview-page/overview-page.component';
import {SearchComponent} from './search/search.component';
import {SearchResultsPageComponent} from './search-results-page/search-results-page.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {QuestionInfoPageComponent} from './question-info-page/question-info-page.component';
import {HttpClientModule} from "@angular/common/http";
import {PageNotFoundComponentComponent} from './page-not-found-component/page-not-found-component.component';
import { SearchPageModalComponent } from './search-page-modal/search-page-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    RegisterPageComponent,
    OverviewPageComponent,
    SearchComponent,
    QuestionInfoPageComponent,
    SearchResultsPageComponent,
    PageNotFoundComponentComponent,
    SearchPageModalComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule

  ],
  bootstrap: [AppComponent],

})
export class AppModule {
}
