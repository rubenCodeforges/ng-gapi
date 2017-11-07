import {Observable} from "rxjs";
import { DOCUMENT } from '@angular/common';
import {Inject, Injectable, InjectionToken} from "@angular/core";
import {GoogleApiConfig, NgGapiClientConfig} from "./config/GoogleApiConfig";
import {Observer} from "rxjs/Observer";

export let NG_GAPI_CONFIG: InjectionToken<NgGapiClientConfig> =
    new InjectionToken<NgGapiClientConfig>("ng-gapi.config");

@Injectable()
export class GoogleApiService {
    private readonly gapiUrl: string = 'https://apis.google.com/js/platform.js';
    private config: GoogleApiConfig;

    constructor(@Inject(NG_GAPI_CONFIG) config: NgGapiClientConfig,
                @Inject(DOCUMENT) private document: any) {
        this.config = new GoogleApiConfig(config);
        this.loadGapi().subscribe();
    }

    public onLoad(): Observable<void> {
        return this.loadGapi();
    }

    public getConfig(): GoogleApiConfig {
        return this.config;
    }

    private loadGapi(): Observable<void> {
        return Observable.create((observer: Observer<boolean>) => {
            let node = this.document.createElement('script');
            node.src = this.gapiUrl;
            node.type = 'text/javascript';
            node.charset = 'utf-8';
            this.document.getElementsByTagName('head')[0].appendChild(node);
            node.onload = () => {
                observer.next(true);
                observer.complete();
            };
        });
    }
}
