import {Component, OnInit} from '@angular/core';
import * as Chart from 'chart.js';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

    constructor() {
    }

    ngOnInit() {
        var
            ctx = document.getElementById('myChart');
        var
            chart = new Chart(ctx, {
                // The type of chart we want to create
                type: 'radar',

                // The data for our dataset
                data: {
                    labels: ['Sport', 'Ernährung', 'Mental'],
                    datasets: [{
                        label: 'Dein Score',
                        data: [10, 8, 7],
                        backgroundColor:[
                            'rgba(246, 190, 0, 0.5)'
                        ]
                    },
                        {
                            label:'',
                            data:[0,0,0],
                            backgroundColor:[
                                'rgba(255, 255, 255, 0.0)'
                            ],
                            borderColor:[
                                'rgba(255, 255, 255, 0.0)'
                            ]
                        }]
                },

                // Configuration options go here
                options: {}
            });
    }
}
