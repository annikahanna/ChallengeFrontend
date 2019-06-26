import { Component, OnInit } from '@angular/core';
import {TagWithEntry} from "../create-challenge/create-challenge.page";
import {DefaultService, Venturer} from "../api-client";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  venturer: Venturer;

  constructor(private api: DefaultService, private router: Router) { }

  ngOnInit() {
  }

  async registration(value: any) {
    this.venturer.email = value.username;
    this.venturer.lastName = value.lastName;
    this.venturer.firstName = value.firstName;
    this.venturer.password = value.password;
    this.api.registerVenturer(this.venturer).subscribe(
        venturer =>{this.venturer = venturer},
        error => console.log(error),
        () => {
          console.log(this.venturer);
          this.router.navigate(['/login'])
          }
        );
  }

}
