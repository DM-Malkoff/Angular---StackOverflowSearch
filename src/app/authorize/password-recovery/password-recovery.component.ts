import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit, OnDestroy {
  // @ts-ignore
  form: FormGroup
  // @ts-ignore
  aSub: Subscription
  resultMessage = ''
  isError=true

  constructor(private auth:AuthService) {
  }

  ngOnInit(): void {

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    })
  }
  onSubmit(){
    this.form.disable()
    this.aSub = this.auth.forgot(this.form.value).subscribe(
      (response) => {
        console.log("otvet", response)
        this.isError = response
        if (this.isError){
          this.form.enable()
          this.resultMessage='User with this E-mail not found'
        }
        else {
          this.resultMessage = "Link for recovery password sent on your E-mail"
        }
      }
    )
  }
  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

}
