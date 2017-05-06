import {Component} from "@angular/core";
import {GapiUserService} from "../services/GapiUserService";
import {GapiReportingModel} from "../services/GapiReportingModel";

@Component({
    selector: "gapi-reports",
    templateUrl: './reportsComponent.html'
})
export class ReportsComponent {
    public viewId: string;

    constructor(private gapiUserService: GapiUserService,
                private model: GapiReportingModel) {
    }

    signIn(): void {
        this.gapiUserService.signIn();
    }

    isSignedIn(): boolean {
        return this.gapiUserService.isUserSignedIn();
    }

    getReport() {
        this.model.getReports([
            {
                viewId: this.viewId,
                dateRanges: [
                    {
                        startDate: "2015-06-15",
                        endDate: "2015-06-30"
                    }
                ],
                metrics: [
                    {
                        expression: "ga:sessions"
                    }
                ],
                dimensions: [
                    {
                        name: "ga:browser"
                    }
                ]
            }
        ]).subscribe((res) => {
            console.log(res);
        });
    }
}