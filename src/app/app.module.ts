import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BASE_PATH, DefaultService} from './api-client';
import {environment} from '../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt';

export function tokenGetter() {
    return localStorage.getItem('jwt_token');
}

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, JwtModule.forRoot({
        config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: environment.whitelistedDomains
        }
    })],
    providers: [
        StatusBar,
        SplashScreen,
        DefaultService,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {provide: BASE_PATH, useValue: environment.basePath},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
