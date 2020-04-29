import {ModuleWithProviders, NgModule, Provider} from "@angular/core";
import {GoogleAuthService} from "./GoogleAuthService";
import {GoogleApiService} from "./GoogleApiService";

@NgModule()
export class GoogleApiModule {
    static forRoot(gapiConfigProvider: Provider): ModuleWithProviders<GoogleApiModule> {
        return {
            ngModule: GoogleApiModule,
            providers: [
                gapiConfigProvider,
                GoogleAuthService,
                GoogleApiService
            ]
        }
    }
}
