import { Component, OnInit } from '@angular/core';
import {finalize} from "rxjs/operators";
import {LoadingController, NavController, ToastController} from "@ionic/angular";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(private router: Router,
              private readonly loadingCtrl: LoadingController,
              private readonly authService: AuthService,
              private readonly toastCtrl: ToastController) {
  }

  username : string;

  signup() {
    this.router.navigate(['/signup']);
  }

  async login(value: any) {
    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'Logging in ...'
    });

    localStorage.setItem("username", value.username)

    loading.present();

    this.authService
        .login(value)
        .pipe(finalize(() => loading.dismiss()))
        .subscribe(
            _ => {
              this.router.navigate(['/tabs/tab1'], {replaceUrl: true});
            },
            err => this.handleError(err));
  }

  async handleError(error: any) {
    let message: string;
    if (error.status && error.status === 401) {
      message = 'Login failed';
    } else {
      message = `Unexpected error: ${error.statusText}`;
    }

    const toast = await this.toastCtrl.create({
      message,
      duration: 5000,
      position: 'bottom'
    });

    toast.present();
  }

}
