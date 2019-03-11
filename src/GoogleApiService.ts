import {Observable} from "rxjs/Observable";
import {Inject, Injectable, InjectionToken} from "@angular/core";
import {GoogleApiConfig, NgGapiClientConfig} from "./config/GoogleApiConfig";
import {Observer} from "rxjs/Observer";

export let NG_GAPI_CONFIG: InjectionToken<NgGapiClientConfig> =
    new InjectionToken<NgGapiClientConfig>("ng-gapi.config");

@Injectable()
export class GoogleApiService {
    private readonly gapiUrl: string = 'https://apis.google.com/js/api.js';
    private config: GoogleApiConfig;

    constructor(@Inject(NG_GAPI_CONFIG) config: NgGapiClientConfig) {
        this.config = new GoogleApiConfig(config);
        this.loadGapi().subscribe();
    }

    public onLoad(): Observable<boolean> {
        return this.loadGapi();
    }

    public getConfig(): GoogleApiConfig {
        return this.config;
    }

    private loadGapi(): Observable<boolean> {
        return new Observable((observer: Observer<boolean>) => {
            let node = document.createElement('script');
            node.src = this.gapiUrl;
            node.type = 'text/javascript';
            node.charset = 'utf-8';
            document.getElementsByTagName('head')[0].appendChild(node);
            node.onload = () => {
                observer.next(true);
                observer.complete();
            };
        });
    }
}
