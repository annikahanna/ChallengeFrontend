import {Component, OnInit} from '@angular/core';
import {Challenge, DefaultService, Tag, Task} from '../api-client';
import {TagWithEntry} from '../create-challenge/create-challenge.page';
import {applySourceSpanToExpressionIfNeeded} from '@angular/compiler/src/output/output_ast';
import {createOutput} from '@angular/compiler/src/core';

@Component({
    selector: 'app-claim-challenge',
    templateUrl: './claim-challenge.page.html',
    styleUrls: ['./claim-challenge.page.scss'],
})
export class ClaimChallengePage implements OnInit {

    constructor(private api: DefaultService) {
    }

    ngOnInit() {
        this.initializeTags();
    }

    public tagsFromAPI: TagWithEntry[] = [];
    private tags: Tag[] = [];
    private challenges: Challenge[] = [];

    initializeTags() {
        this.api.findAllTags().subscribe(
            tags => this.tags = tags,
            error => console.log(error),
            () => {
                for (let i = 0; i < this.tags.length; i++) {
                    this.tagsFromAPI[i] = new TagWithEntry(this.tags[i], false);
                }
            });
    }

    sendPreferences() {
        let tags = this.tagsFromAPI.filter(tag => tag.isChecked == true);
        let chosenTags = [];
        tags.forEach(tag => chosenTags.push(tag.tag));
        this.api.getDaily(chosenTags).subscribe(challenges => this.challenges = challenges);
    }

    accept(c: Challenge) {
        let ind = this.challenges.indexOf(c);
        this.challenges.splice(ind, 1);

        // create task from information
        this.api.findVenturerByEMail(localStorage.getItem('username')).subscribe(
            vent => {
                let task: Task = {
                    accepted: new Date(),
                    challenge: c,
                    done: null,
                    failed: null,
                    venturer: {id: vent.id}
                };
                this.api.createTask(task).subscribe();
            }
        );

    }

}
