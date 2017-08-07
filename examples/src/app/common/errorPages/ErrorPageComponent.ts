import {Component} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
    template: require('./errorPage.html')
})
export class ErrorPageComponent {
    public errorCode: string;
    public errorMessage: string;

    constructor(private route: ActivatedRoute) {
        route.params.subscribe((params: Params) => {
            this.errorCode = params['code'];
        });
    }
}