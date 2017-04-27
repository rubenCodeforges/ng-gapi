import {GoogleApi} from "./GoogleApi";
import {NgModule} from "@angular/core";
import {GoogleAuthService} from "./GoogleAuthService";

@NgModule({
    providers: [
        GoogleApi,
        GoogleAuthService
    ]
})
export class GoogleApiModule {
}