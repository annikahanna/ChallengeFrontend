import {Component, OnInit, ViewChild} from '@angular/core';
import {NgModel} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {LoadingController, ToastController} from "@ionic/angular";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
  export class SignupPage {

  usernameModel: NgModel;

  constructor(private router: Router,
              private readonly authService: AuthService,
              private readonly loadingCtrl: LoadingController,
              private readonly toastCtrl: ToastController) {
  }

  async signup(value: any) {
    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'Signing up ...'
    });

    loading.present();

    this.authService
        .signup(value)
        .pipe(finalize(() => loading.dismiss()))
        .subscribe(
            jwt => this.showSuccesToast(jwt),
            err => this.handleError(err));
  }

  async handleError(error: any) {
    const message = 'Unexpected error occurred';

    const toast = await this.toastCtrl.create({
      message,
      duration: 5000,
      position: 'bottom'
    });

    toast.present();
  }

  private async showSuccesToast(jwt) {
    if (jwt !== 'EXISTS') {
      const toast = await this.toastCtrl.create({
        message: 'Sign up successful',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
      this.router.navigate(['/tabs/tab1'], {replaceUrl: true});
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Username already registered',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();

      this.usernameModel.control.setErrors({'usernameTaken': true});
    }
  }


}
