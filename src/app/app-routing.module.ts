import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'create-challenge', loadChildren: './create-challenge/create-challenge.module#CreateChallengePageModule' },
  { path: 'claim-challenge', loadChildren: './claim-challenge/claim-challenge.module#ClaimChallengePageModule' },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
