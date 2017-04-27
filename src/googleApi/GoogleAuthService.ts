import {Injectable} from "@angular/core";
import {GoogleApiConfig} from "../../config/GoogleApiConfig";
import {Observable} from "rxjs";
import {GoogleApi} from "./GoogleApi";
import GoogleAuth = gapi.auth2.GoogleAuth;


@Injectable()
export class GoogleAuthService {
    private GoogleAuth: GoogleAuth = undefined;

    constructor(googleApi: GoogleApi) {
        googleApi.onLoad(() => {
            this.loadGapiAuth()
        });
    }

    public getAuth(): Observable<GoogleAuth> {
        if (!this.GoogleAuth) {
            return this.loadGapiAuth();
        }
        return Observable.of(this.GoogleAuth);
    }

    private loadGapiAuth(): Observable<GoogleAuth> {
        return Observable.create((observer) => {
            gapi.load('auth2', () => {
                let auth = gapi.auth2.init(GoogleApiConfig.getConfig());
                observer.next(auth);
                this.GoogleAuth = auth;
                return auth;
            });
        });
    }

}