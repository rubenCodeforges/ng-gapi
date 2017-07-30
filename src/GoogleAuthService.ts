import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {GoogleApiService} from "./GoogleApiService";
import GoogleAuth = gapi.auth2.GoogleAuth;

@Injectable()
export class GoogleAuthService {
    private GoogleAuth: GoogleAuth = undefined;

    constructor(private googleApi: GoogleApiService) {
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
        return Observable.create((observer: any) => {
            gapi.load('auth2', () => {
                let auth = gapi.auth2.init(this.googleApi.getConfig().getClientConfig());
                observer.next(auth);
                this.GoogleAuth = auth;
                return auth;
            });
        });
    }
}
