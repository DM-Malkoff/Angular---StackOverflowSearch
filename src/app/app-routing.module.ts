import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component';
import {LoginPageComponent} from "./login-page/login-page.component";
import {RegisterPageComponent} from "./register-page/register-page.component";
import {AuthService} from "./shared/services/auth.service";
import {SiteLayoutComponent} from './shared/layouts/site-layout/site-layout.component';
import {OverviewPageComponent} from "./overview-page/overview-page.component";
import {SearchComponent} from "./search/search.component";
import {SearchResultsPageComponent} from "./search-results-page/search-results-page.component";
import {PageNotFoundComponentComponent} from "./page-not-found-component/page-not-found-component.component";
import {QuestionInfoPageComponent} from "./question-info-page/question-info-page.component";

const routes: Routes = [

  {
    path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'register', component: RegisterPageComponent},
    ]
  },
  {
    path: '', component: SiteLayoutComponent, children: [
      {path: 'overview', redirectTo: '/search-page', pathMatch: 'full'},
      {path: 'search', component: SearchComponent, pathMatch: 'full'},
      {path: 'search-results-page', component: SearchResultsPageComponent},
      {path: 'search/q/:searchQuery', component: SearchResultsPageComponent},
      {path: 'search/q/:questionId/:question', component: QuestionInfoPageComponent},
    ]
  },
  {
    path: '**', component: PageNotFoundComponentComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
