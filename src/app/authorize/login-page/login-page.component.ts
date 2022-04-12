import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})



export class LoginPageComponent implements OnInit, OnDestroy {

  // @ts-ignore
  form: FormGroup
  // @ts-ignore
  aSub: Subscription
  isLogined=false
  error = ''
  loginError=''
  regMessage = ''

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.form = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(6)])
      }
    )
    this.route.queryParams.subscribe(
      (params)=>{
        if (params['registered']){
          this.regMessage ='Enter you verification data'
        }else if(params['accessDenied']){
          this.loginError = 'Before using this service you must Login'
        }
      }
    )
  }


  passSymbols() {
    // @ts-ignore
    return this.form.get('password')?.errors['minlength'].requiredLength
  }

  actualPassSymbols() {
    // @ts-ignore
    return this.form.get('password')?.errors['minlength'].actualLength
  }

  onSubmit() {
    this.form.disable()
    this.aSub = this.auth.login(this.form.value).subscribe(
      (response)=> {
        this.isLogined = response
        if (this.isLogined == true) {
          console.log("Login success")
          this.router.navigate(['/search'])
        }else {
          this.form.enable()
          this.error = this.auth.errMessage
          console.log("access denied")
        }
      }
      ,
      // error => {
      //   console.warn("warn",error)
      //   this.form.enable()
      // }
    )
  }
  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }
}
