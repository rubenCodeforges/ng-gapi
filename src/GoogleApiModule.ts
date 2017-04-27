import {GoogleApiService} from "./GoogleApiService";
import {ModuleWithProviders, NgModule} from "@angular/core";
import {GoogleAuthService} from "./GoogleAuthService";
import {GoogleApiConfig} from "./config/GoogleApiConfig";

@NgModule()
export class GoogleApiModule {
    static setConfig(apiConfig: GoogleApiConfig): ModuleWithProviders {
        return {
            ngModule: GoogleApiModule,
            providers: [
                GoogleApiService,
                {
                    provide: GoogleAuthService,
                    useFactory: GoogleAuthService.factory,
                    deps: [
                        GoogleApiService,
                        apiConfig
                    ]
                }
            ]
        }
    }
}