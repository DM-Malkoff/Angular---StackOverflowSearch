import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
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
          //Теперь вы можете зайти в систему используя свои данные
        }else if(params['accessDenied']){
          //Для начала авторизуйтесь в системе
        }
      }
    )
  }
  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
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
  }
}
