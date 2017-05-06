import {NgModule} from "@angular/core";
import {ReportsComponent} from "./reports/ReportsComponent";
import {GapiReportingResource} from "./services/GapiReportingResource";
import {GoogleApiModule} from "ng-gapi";
import {GapiUserService} from "./services/GapiUserService";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {GapiReportingModel} from "./services/GapiReportingModel";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        GoogleApiModule.setConfig({
            clientId: "372063809670-qoggl887ba9vpt7aclf411hhk9f7icil.apps.googleusercontent.com",
            discoveryDocs: ["https://analyticsreporting.googleapis.com/$discovery/rest?version=v4"],
            scope: [
                "https://www.googleapis.com/auth/analytics.readonly",
                "https://www.googleapis.com/auth/analytics"
            ].join(" ")
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