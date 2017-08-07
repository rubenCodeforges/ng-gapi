import {Injectable} from "@angular/core";
import {AbstractHttpError} from "../http/AbstractHttpError";
import {GoogleHttpErrorBody} from "../google/GoogleHttpError";
import * as _ from "lodash";
import {Router} from "@angular/router";

@Injectable()
/**
 * Security service used for security check and redirects
 * TODO: Rework
 */
export class SecurityService {

    constructor(private router: Router) {
    }

    public denyAndRedirectOnAuthError(errorBody: any) {
        _.each(errorBody.error.errors, (error) => {
            if (error.reason == "authError") {
                this.router.navigateByUrl('');
                location.reload();
            }
        });
    }
}