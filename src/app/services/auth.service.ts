import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from '@auth0/angular-jwt';
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly jwtTokenName = 'jwt_token';

    private authUser = new ReplaySubject<any>(1);
    public authUserObservable = this.authUser.asObservable();

    constructor(private readonly httpClient: HttpClient,
                private router: Router,
                private readonly jwtHelper: JwtHelperService) {
    }

    hasAccess(): Promise<boolean> {
        const jwt = localStorage.getItem(this.jwtTokenName);

        if (jwt
        // TODO:&& !this.jwtHelper.isTokenExpired(jwt)
        ) {

            return new Promise((resolve, _) => {

                this.httpClient.get(`${environment.basePath}/api/login/authenticate`)
                    .subscribe(() => {
                            this.authUser.next(jwt);
                            resolve(true);
                        },
                        err => {
                            this.logout();
                            resolve(false);
                        });
            });

        } else {
            this.logout();
            return Promise.resolve(false);
        }
    }

    logout() {
        localStorage.removeItem(this.jwtTokenName);
        this.authUser.next(null);
        this.router.navigate(['/login'], {replaceUrl: true});
    }

    login(values: any): Observable<string> {
        console.log(values);
        return this.httpClient.post(`${environment.basePath}/api/login`, values, {responseType: 'text'})
            .pipe(tap(jwt => this.handleJwtResponse(jwt)));
    }

    private handleJwtResponse(jwt: string): string {
        console.log("HALALAI");
        console.log(jwt);
        localStorage.setItem(this.jwtTokenName, jwt);

        this.authUser.next(jwt);

        return jwt;
    }

    signup(values: any): Observable<string> {
        return this.httpClient.post(`${environment.serverURL}/api/signup`, values, {responseType: 'text'})
            .pipe(tap(jwt => {
                if (jwt !== 'EXISTS') {
                    return this.handleJwtResponse(jwt);
                }
                return jwt;
            }));
    }
}
