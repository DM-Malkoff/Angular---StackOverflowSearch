import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component';
import {LoginPageComponent} from "./authorize/login-page/login-page.component";
import {RegisterPageComponent} from "./authorize/register-page/register-page.component";
import {AuthService} from "./shared/services/auth.service";
import {SiteLayoutComponent} from './shared/layouts/site-layout/site-layout.component';
import {SearchComponent} from "./overview/search/search.component";
import {SearchResultsPageComponent} from "./overview/search-results-page/search-results-page.component";
import {PageNotFoundComponentComponent} from "./page-not-found-component/page-not-found-component.component";
import {QuestionInfoPageComponent} from "./overview/question-info-page/question-info-page.component";
import {AuthGuard} from "./shared/classes/auth.guard";
import {PasswordRecoveryComponent} from "./authorize/password-recovery/password-recovery.component";

const routes: Routes = [

  {
    path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'register', component: RegisterPageComponent},
      {path: 'forgot', component: PasswordRecoveryComponent},
    ]
  },
  {
    path: '', component: SiteLayoutComponent, canActivate:[AuthGuard], children: [
      {path: 'search', component: SearchComponent, pathMatch: 'full'},
      {path: 'search-results-page', component: SearchResultsPageComponent},
      {path: 'search/q/:searchQuery', component: SearchResultsPageComponent},
      {path: 'questions/:questionId/:someQuestion', component: QuestionInfoPageComponent},
    ]
  },
  {
    path: '**', component: PageNotFoundComponentComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
