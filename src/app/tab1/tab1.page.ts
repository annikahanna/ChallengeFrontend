import {Component, OnInit} from '@angular/core';
import {DefaultService, Task, Venturer} from "../api-client";

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {


    constructor(private api: DefaultService) {
    }

    private venturer: Venturer;
    private tasks: Task[];

    ngOnInit() {
        // Get User
        console.log(localStorage.getItem("username"));

        this.api.findVenturerByEMail(localStorage.getItem("username")).subscribe(
            v => this.venturer = v,
            err => {
                console.log('Feeeeehler')
            },
            () => {
                console.log('venturer:', this.venturer)
                this.api.getOpenTasks(this.venturer.id).subscribe(
                    t => this.tasks = t,
                    err => {
                    },
                    () => {
                        console.log(this.tasks);
                    }
                )
            }
        );
    }

    private toDate(date: Date): string{

        let string = new Date(date);
        return string.getDate().toString()+'.'+(string.getMonth()+1).toString()+'.'+string.getFullYear();

    }
}
