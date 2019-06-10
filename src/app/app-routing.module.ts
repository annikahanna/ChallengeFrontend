import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
    {path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard]},
    {
        path: 'create-challenge',
        loadChildren: './create-challenge/create-challenge.module#CreateChallengePageModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'claim-challenge',
        loadChildren: './claim-challenge/claim-challenge.module#ClaimChallengePageModule',
        canActivate: [AuthGuard]
    },
    {path: 'login', loadChildren: './login/login.module#LoginPageModule'},
    {path: 'signup', loadChildren: './signup/signup.module#SignupPageModule'},
  { path: 'users', loadChildren: './users/users.module#UsersPageModule' , canActivate: [AuthGuard]},




];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
