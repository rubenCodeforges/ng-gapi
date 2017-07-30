import {Observable} from "rxjs";
import {Inject, Injectable, InjectionToken} from "@angular/core";
import {ClientConfig, GoogleApiConfig} from "./config/GoogleApiConfig";


export let NG_GAPI_CONFIG: InjectionToken<ClientConfig> =
    new InjectionToken<ClientConfig>("ng-gapi.config");

@Injectable()
export class GoogleApiService {
    private readonly gapiUrl: string = 'https://apis.google.com/js/platform.js';
    private isLoaded: boolean = false;
    private config: GoogleApiConfig;

    constructor(@Inject(NG_GAPI_CONFIG) config: ClientConfig) {
        this.config = new GoogleApiConfig(config);
        this.loadGapi();
    }

    public onLoad(callback: () => any) {
        if (this.isLoaded) {
            callback();
            return;
        }
        this.loadGapi().subscribe(callback);
    }

    public getConfig(): GoogleApiConfig {
        return this.config;
    }

    private loadGapi(): Observable<void> {
        return Observable.create((observer: any) => {
            let node = document.createElement('script');
            node.src = this.gapiUrl;
            node.type = 'text/javascript';
            node.async = true;
            node.charset = 'utf-8';
            document.getElementsByTagName('head')[0].appendChild(node);
            node.onload = () => {
                observer.next();
                this.isLoaded = true;
            };
        });
    }
}
