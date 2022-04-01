import {Users} from "./interfaces";
import actualUser from "./Users";

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthService{

  constructor() {

  }

  register(user: Users){

    }

  login(user: Users){
    //return this.http.get('assets/test1.txt', {responseType: 'text'})
      //.pipe(
      //  tap(
          //({token})=>{
          //  localStorage.setItem('auth-token', token)
          //  this.setToken(token)
          //}
      //  )
      //)
//    this.isLoggedIn = (user.email === actualUser.email && user.password === actualUser.password)
//    console.log(this.isLoggedIn)
  }
  setToken(token:string | null){

  }
  getToken(token:string){

  }
  isAuthentikated(){

  }
  logout(){

  }
}

