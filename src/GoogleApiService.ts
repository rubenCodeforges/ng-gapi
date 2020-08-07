import {Inject, Injectable, InjectionToken} from '@angular/core';
import {GoogleApiConfig, NgGapiClientConfig} from './config/GoogleApiConfig';
import {Observable, Observer} from 'rxjs';

export let NG_GAPI_CONFIG: InjectionToken<NgGapiClientConfig> =
  new InjectionToken<NgGapiClientConfig>('ng-gapi.config');

@Injectable()
export class GoogleApiService {
  private readonly gapiUrl: string = 'https://apis.google.com/js/api.js';
  private config: GoogleApiConfig;
  private gapiLoaded: boolean;
  private node: HTMLScriptElement;
  private observers: Observer<boolean>[] = [];

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
      if (this.gapiLoaded) {
        observer.next(true);
        observer.complete();
      } else if (!this.node) {
        /**
         * script element has not yet been added to document
         */
        this.node = document.createElement('script');
        this.node.async = true;
        this.node.src = this.gapiUrl;
        this.node.type = 'text/javascript';
        this.node.onload = () => {
          this.gapiLoaded = true;
          while (this.observers.length) {
            const observer = this.observers.shift();
            observer.next(true);
            observer.complete();
          }
          this.node = undefined;
        };
        this.node.onerror = () => {
          this.node = undefined;
        }
        document.getElementsByTagName('head')[0].appendChild(this.node);
      } else {
        /**
         * script is in the middle of being loaded
         */
        this.observers.push(observer);
      }
    });
  }
}
