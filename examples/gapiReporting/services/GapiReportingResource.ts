import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

@Injectable()
export class GapiReportingResource {
    private readonly URL: string = 'https://analyticsreporting.googleapis.com/v4/reports:batchGet';

    constructor(private http: Http) {
    }

    batchGet(requests: ReportRequest[], accessToken) {
        return this.http.post(this.URL + "?access_token=" + accessToken, {reportRequests: requests});
    }

}

//TODO: Replace "any" in all interfaces with real data type
export interface ReportResponse {
    columnHeader: ColumnHeader,
    data: ReportData,
    nextPageToken: string
}

export interface ReportData {
    rows: any[],
    totals: any[]
    rowCount: number,
    minimums: any[],
    maximums: any[],
    samplesReadCounts: string[],
    samplingSpaceSizes: string[],
    isDataGolden: boolean
}

export interface ColumnHeader {
    dimensions: string[],
    metricHeader: any,
}

export interface ReportRequest {
    viewId: string,
    dateRanges: DateRange[],
    samplingLevel?: Sampling,
    dimensions: Dimension[],
    metrics: Metric[],
    metricFilterClauses?: any[],
    filtersExpression?: string,
    orderBys?: any[],
    segments?: any[],
    pivots?: any[],
    cohortGroup?: any,
    pageToken?: string,
    pageSize?: number,
    includeEmptyRows?: boolean,
    hideTotals?: boolean,
    hideValueRanges?: boolean,
}

export interface DateRange {
    startDate: string,
    endDate: string
}

export interface Dimension {
    name: string,
    histogramBuckets?: string[]
}

export interface Metric {
    expression: string,
    alias?: string,
    formattingType?: MetricType
}

export enum Sampling {
    SAMPLING_UNSPECIFIED,
    DEFAULT,
    SMALL,
    LARGE
}

export enum MetricType {
    METRIC_TYPE_UNSPECIFIED,
    INTEGER,
    FLOAT,
    CURRENCY,
    PERCENT,
    TIME
}