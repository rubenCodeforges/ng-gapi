import {Http, RequestOptionsArgs, Response} from "@angular/http";
import {HttpErrorHandler} from "./HttpErrorHandler";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class HttpService {

    constructor(private http: Http,
                private errorHandler: HttpErrorHandler) {
    }

    public get(url: string, options?: RequestOptionsArgs): Observable<any> {
        return this.http.get(url, options)
            .map(HttpService.toJsonResponse)
            .catch(response => this.errorHandler.handleError(response));
    }

    public post(url: string, requestBody: any, options?: RequestOptionsArgs): Observable<any> {
        return this.http.post(url, requestBody, options)
            .map(HttpService.toJsonResponse)
            .catch(response => this.errorHandler.handleError(response))
    }

    public put(url: string, requestBody: any, options?: RequestOptionsArgs): Observable<any> {
        return this.http.put(url, requestBody, options)
            .map(HttpService.toJsonResponse)
            .catch(response => this.errorHandler.handleError(response))
    }

    public delete(url: string, options?: RequestOptionsArgs): Observable<any> {
        return this.http.delete(url, options)
            .map(HttpService.toJsonResponse)
            .catch(response => this.errorHandler.handleError(response));
    }

    private static toJsonResponse(response: Response): JSON | number {
        try {
            return response.json();
        } catch (e) {
            return response.status;
        }
    }

}