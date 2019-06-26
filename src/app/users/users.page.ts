import {Component, OnInit} from '@angular/core';
import * as Chart from 'chart.js';
import {DefaultService, Venturer} from "../api-client";

@Component({
    selector: 'app-users',
    templateUrl: './users.page.html',
    styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

    private venturers: Venturer[];
    private user: Venturer;

    constructor(private api: DefaultService) {
    }

    ngOnInit() {


        this.api.findVenturerByEMail(localStorage.getItem('username')).subscribe(
            u => this.user = u,
            err => {
            },
            () => {
                this.api.getOtherVenturers(this.user.id).subscribe(
                    v => this.venturers = v,
                    err => {
                    },
                    () => {
                    })
            }
        )

    }

}
