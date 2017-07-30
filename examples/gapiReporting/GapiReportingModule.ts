import {NgModule} from "@angular/core";
import {ReportsComponent} from "./reports/ReportsComponent";
import {GapiReportingResource} from "./services/GapiReportingResource";
import {GoogleApiModule} from "ng-gapi";
import {GapiUserService} from "./services/GapiUserService";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {GapiReportingModel} from "./services/GapiReportingModel";
import {NG_GAPI_CONFIG} from "../../src/GoogleApiService";
import {ClientConfig} from "../../lib/config/GoogleApiConfig";

let gapiClientConfig: ClientConfig = {
    clientId: "CLIENT_ID",
    discoveryDocs: ["https://analyticsreporting.googleapis.com/$discovery/rest?version=v4"],
    scope: [
        "https://www.googleapis.com/auth/analytics.readonly",
        "https://www.googleapis.com/auth/analytics"
    ].join(" ")
};

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        GoogleApiModule.forRoot({
            provide: NG_GAPI_CONFIG,
            useValue: gapiClientConfig
        })
    ],
    declarations: [
        ReportsComponent
    ],
    providers: [
        GapiReportingResource,
        GapiReportingModel,
        GapiUserService
    ],
    exports: [
        ReportsComponent
    ]
})
export class GapiReportingModule {
}
