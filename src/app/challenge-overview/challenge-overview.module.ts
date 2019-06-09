import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ChallengeOverviewPage} from './challenge-overview';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ChallengeOverviewPage }])
  ],
  declarations: [ChallengeOverviewPage]
})
export class ChallengeOverviewModule {}
