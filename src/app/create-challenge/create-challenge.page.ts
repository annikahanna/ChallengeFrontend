import {Component, Inject, OnInit} from '@angular/core';
import {Challenge, DefaultService, Tag} from '../api-client';

@Component({
    selector: 'app-create-challenge',
    templateUrl: './create-challenge.page.html',
    styleUrls: ['./create-challenge.page.scss'],
})
export class CreateChallengePage implements OnInit {

    nutScore = 0;
    spoScore = 0;
    menScore = 0;

    title = '';
    description = '';

    gesamtScore = 0;

    public tagsFromAPI: TagWithEntry[] = [];
    private tags: Tag[] = [];

    constructor(public api: DefaultService) {
    }

    ngOnInit() {
        this.initializeTags();
    }

    valueChanged() {
        this.gesamtScore = this.menScore + this.spoScore + this.nutScore;
    }

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


    sendCreateChallengeRequest() {
        let chosenTags: Tag[] = [];
        for (let i = 0; i < this.tagsFromAPI.length; i++) {
            if (this.tagsFromAPI[i].isChecked) {
                chosenTags.push(this.tagsFromAPI[i].tag);
            }
        }
        let challenge: Challenge = {
            title: this.title,
            description: this.description,
            tags: chosenTags,
            sportPoints: this.spoScore,
            mentalPoints: this.menScore,
            nutritionPoints: this.nutScore
        };
        console.log('HALLO');
        this.api.createChallenge(challenge).subscribe();
    }

}

class TagWithEntry {
    tag: Tag;
    isChecked: Boolean;

    constructor(tag: Tag, isChecked: Boolean) {
        this.tag = tag;
        this.isChecked = isChecked;
    }
}