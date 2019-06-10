import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';
import {AuthGuard} from '../auth.guard';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'tab1',
                children: [
                    {
                        path: '',
                        loadChildren: '../tab1/tab1.module#Tab1PageModule',
                        canActivate: [AuthGuard],
                    }
                ]
            },
            {
                path: 'users',
                children: [
                    {
                        path: '',
                        loadChildren: '../users/users.module#UsersPageModule'
                    }
                ]
            },
            {
                path: 'tab2',
                children: [
                    {
                        path: '',
                        loadChildren: '../challenge-overview/challenge-overview.module#ChallengeOverviewModule',
                        canActivate: [AuthGuard],
                    }
                ]
            },
            {
                path: 'profile',
                children: [
                    {
                        path: '',
                        loadChildren: '../profile/profile.module#ProfilePageModule',
                        canActivate: [AuthGuard],
                    }
                ]
            },
            {
                path: 'create-challenge',
                children: [
                    {
                        path: '',
                        loadChildren: '../create-challenge/create-challenge.module#CreateChallengePageModule',
                        canActivate: [AuthGuard],
                    }
                ]
            },
            {
                path: 'claim-challenge',
                children: [
                    {
                        path: '',
                        loadChildren: '../claim-challenge/claim-challenge.module#ClaimChallengePageModule',
                        canActivate: [AuthGuard],
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/tabs/tab1',
                pathMatch: 'full',
                canActivate: [AuthGuard],
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/tab1',
        canActivate: [AuthGuard],
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
