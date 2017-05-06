import {Injectable} from "@angular/core";
import {ReportResponse, GapiReportingResource, ReportRequest} from "./GapiReportingResource";
import {GapiUserService} from "./GapiUserService";
import {Observable} from "rxjs";

@Injectable()
export class GapiReportingModel {
    private reports: ReportResponse[];

    constructor(private userService: GapiUserService,
                private resource: GapiReportingResource) {

    }

    getReports(reportsRequest: ReportRequest[]): Observable<ReportResponse[]> {
        let token = this.userService.getToken();
        return this.resource.batchGet(reportsRequest, token).map((response) => response.json().reports);
    }
}