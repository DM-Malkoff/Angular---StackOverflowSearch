import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  form = new FormGroup({})

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
        rePassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
        name: new FormControl(null)
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

  rePassSymbols() {
    // @ts-ignore
    return this.form.get('rePassword')?.errors['minlength'].requiredLength
  }

  actualrePassSymbols() {
    // @ts-ignore
    return this.form.get('rePassword')?.errors['minlength'].actualLength
  }

  checkPassword() {
    return this.form.get('rePassword')?.value !== this.form.get('password')?.value
  }

  onSubmit() {

    this.auth.register(this.form.value)
  }
}