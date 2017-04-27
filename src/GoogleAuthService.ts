import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {GoogleApi} from "./GoogleApi";
import {GoogleApiConfig} from "./config/GoogleApiConfig";
import GoogleAuth = gapi.auth2.GoogleAuth;


@Injectable()
export class GoogleAuthService {
    private GoogleAuth: GoogleAuth = undefined;
    private config: GoogleApiConfig;

    constructor(googleApi: GoogleApi, config: GoogleApiConfig) {
        this.config = config;

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
                let auth = gapi.auth2.init(this.config.getAuthConfig());
                observer.next(auth);
                this.GoogleAuth = auth;
                return auth;
            });
        });
    }

    public static factory(googleApi: GoogleApi, config: GoogleApiConfig) {
        return new GoogleAuthService(googleApi, config)
    }

}