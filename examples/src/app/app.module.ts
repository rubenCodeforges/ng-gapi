import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

const gapiClientConfig: NgGapiClientConfig = {
  client_id: '',
  discoveryDocs: ['https://analyticsreporting.googleapis.com/$discovery/rest?version=v4'],
  ux_mode: 'redirect',
  redirect_uri: 'https://ng-gapi-example.stackblitz.io/redirect',
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile'
  ].join(' ')
};

import { AppComponent } from './app.component';
import {GoogleApiModule, NG_GAPI_CONFIG, NgGapiClientConfig} from 'ng-gapi/lib/src';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
