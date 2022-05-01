import {Users} from "./interfaces";
import actualUser from "./krutch-users";

import {Injectable} from "@angular/core";
import {Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user: any
  isLoggedIn = false
  private token = ''
  errMessage = ''

  constructor() {

  }

  register(user: Users): Observable<boolean> {
    let isRegistered = true
    if (user.email === actualUser.email) {
      isRegistered = false
    }
    return of(isRegistered)
  }

  forgot(user: Users): Observable<boolean> {
    let isError = false
    if (user.email !== actualUser.email) {
      isError = true
    }
    return of(isError)
  }

  login(user: Users): Observable<boolean> {
    console.log("user ", user.email, user.password)
    if (user.email === actualUser.email && user.password === actualUser.password) {
      this.isLoggedIn = true
      this.token = 'Example-Token';
      localStorage.setItem('auth-token', this.token)
    } else {
      if (user.email !== actualUser.email) {
        this.errMessage = "User with this E-mail not found"
      } else if (user.email === actualUser.email && user.password !== actualUser.password) {
        this.errMessage = "Incorrect username or password"
      }
    }
    return of(this.isLoggedIn)
  }

  setToken(token: string) {
    this.token = token
  }

  isAuthenticated(): boolean {
    //console.log("check token ",this.token)
    //console.log("localstorage: ",localStorage.getItem('auth-token'))
    if (localStorage.getItem('auth-token')) {
      return true
    } else {
      return false
    }
  }

  logout() {
    this.setToken('');
    localStorage.clear()
  }
}

