import {Component, OnInit} from '@angular/core';
import {TagWithEntry} from '../create-challenge/create-challenge.page';
import {DefaultService, Venturer} from '../api-client';
import {Router} from '@angular/router';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.page.html',
    styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

    venturer: Venturer;

    constructor(private api: DefaultService, private router: Router) {
    }

    ngOnInit() {
    }

    private firstName: string = '';
    private lastName: string = '';
    private email: string = '';
    private passwort: string = '';


    register() {
        this.api.registerVenturer({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.passwort
        }).subscribe( ()=> {},
            (err)=> console.log(err),
            () => this.router.navigate(['/login']));
    }

}
