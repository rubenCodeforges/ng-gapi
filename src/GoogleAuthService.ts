import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";

import {Observer} from "rxjs/Observer";
import {GoogleApiService} from "./GoogleApiService";
import GoogleAuth = gapi.auth2.GoogleAuth;

@Injectable()
export class GoogleAuthService {
    private GoogleAuth: GoogleAuth = undefined;

    constructor(private googleApi: GoogleApiService) {
        this.googleApi.onLoad().subscribe(() => {
            this.loadGapiAuth();
        });
    }

    public getAuth(): Observable<GoogleAuth> {
        if (!this.GoogleAuth) {
            return this.googleApi.onLoad().mergeMap(() => this.loadGapiAuth());
        }
        return Observable.of(this.GoogleAuth);
    }

    private loadGapiAuth(): Observable<GoogleAuth> {
        return Observable.create((observer: Observer<GoogleAuth>) => {
            gapi.load('auth2', () => {
                let auth = gapi.auth2.init(this.googleApi.getConfig().getClientConfig());
                this.GoogleAuth = auth;
                observer.next(auth);
                observer.complete();
            });
        });
    }
}
