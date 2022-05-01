import {Component, OnInit} from '@angular/core';
import {authAnimate} from "../../animations/app.animations";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css'],
  animations: [authAnimate]
})
export class AuthLayoutComponent implements OnInit {

  constructor() {
  }

  public getRouterOutletState(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  ngOnInit(): void {
  }

}
