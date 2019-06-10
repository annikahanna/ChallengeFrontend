import {Component, OnInit} from '@angular/core';
import * as Chart from 'chart.js';
import {DefaultService, Task, Venturer} from "../api-client";

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

    constructor(private api: DefaultService) {
    }

    private venturer: Venturer;
    private tasks: Task[];

    ngOnInit() {
        // Get User
        this.api.findVenturerByEMail(localStorage.getItem("username")).subscribe(
            v => this.venturer = v,
            err => {
            },
            () => {this.chart()
            this.api.getTasks(this.venturer.id).subscribe(
                t => this.tasks = t,
                err => {
                },
                () => {console.log(this.tasks)}
            )
            }
        );




    }

    //Initialize Canvas for Magic Chart

    private chart(){
    var ctx = document.getElementById('myChart');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'radar',

        // The data for our dataset
        data: {
            labels: ['Sport', 'Ernährung', 'Mental'],
            datasets: [{
                label: 'Dein Score',
                data: [this.venturer.sportScore, this.venturer.nutritionScore, this.venturer.mentalScore],
                backgroundColor: [
                    'rgba(246, 190, 0, 0.5)'
                ]
            },
                {
                    label: '',
                    data: [0, 0, 0],
                    backgroundColor: [
                        'rgba(255, 255, 255, 0.0)'
                    ],
                    borderColor: [
                        'rgba(255, 255, 255, 0.0)'
                    ]
                }]
        },

        // Configuration options go here
        options: {}
    });}

}
