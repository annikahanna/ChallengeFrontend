import {Component, OnInit} from '@angular/core';
import * as Chart from 'chart.js';
import {DefaultService, Task, Venturer} from '../api-client';

@Component({
    selector: 'app-profile',
    templateUrl: 'profile.page.html',
    styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {

    constructor(private api: DefaultService) {
    }

    private venturer: Venturer;
    private tasks: Task[];

    private sortedTasks : Task[][] = [];
    private openTasks : Task[] = [];
    private beatenTasks : Task[] = [];
    private failedTasks : Task[] = [];

    ngOnInit(): void {
    }

    ionViewWillEnter() {
        // Get User
        this.api.findVenturerByEMail(localStorage.getItem('username')).subscribe(
            v => this.venturer = v,
            err => {
            },
            () => {
                this.chart();
                this.api.getTasks(this.venturer.id).subscribe(
                    t => this.tasks = t,
                    err => {
                    },
                    () => {
                        this.sortTasks();
                        this.initializeTaskArray();
                    }
                );
            }
        );
    }

    //Initialize Canvas for Magic Chart

    private chart() {
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
        });
    }

    initializeTaskArray(){
        this.sortedTasks.push(this.openTasks);
        this.sortedTasks.push(this.beatenTasks);
        this.sortedTasks.push(this.failedTasks);
    }

    sortTasks() {
        for (let t of this.tasks){
            t.accepted = new Date(t.accepted);
            if (t.done == null && t.failed == null){
                this.openTasks.push(t);
                console.log("opentask", t);
            } else if (!t.failed == null && t.done < new Date()){
                this.beatenTasks.push(t);
            } else if (t.failed < new Date()) {
                this.failedTasks.push(t);
            }
        }
    }

}
