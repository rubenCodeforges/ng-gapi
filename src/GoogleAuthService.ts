import {Injectable} from "@angular/core";
import {GoogleApiService} from "./GoogleApiService";
import GoogleAuth = gapi.auth2.GoogleAuth;
import {mergeMap} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

@Injectable()
export class GoogleAuthService {
    private GoogleAuth: GoogleAuth = undefined;

    constructor(private googleApi: GoogleApiService) {
        this.googleApi.onLoad().subscribe(() => {
            this.loadGapiAuth();
        });
    }

    public getAuth(newInstance = false): Observable<GoogleAuth> {
        if (!this.GoogleAuth || newInstance) {
            return this.googleApi.onLoad()
                .pipe(mergeMap(() => this.loadGapiAuth()));
        }
        return of(this.GoogleAuth);
    }

    private loadGapiAuth(): Observable<GoogleAuth> {
        return Observable.create((observer: Observer<GoogleAuth>) => {
            gapi.load('auth2', () => {
                gapi.auth2.init(this.googleApi.getConfig().getClientConfig()).then((auth: GoogleAuth) => {
                  this.GoogleAuth = auth;
                  observer.next(auth);
                  observer.complete();
                }).catch(err => {
                    observer.error(err);
                });
            });
        });
    }
}
