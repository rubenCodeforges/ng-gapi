import {GoogleApiService} from "./GoogleApiService";
import {ModuleWithProviders, NgModule} from "@angular/core";
import {GoogleAuthService} from "./GoogleAuthService";
import {GapiInitConfigs} from "./config/GoogleApiConfig";

@NgModule()
export class GoogleApiModule {
    static setConfig(apiConfig: GapiInitConfigs): ModuleWithProviders {
        return {
            ngModule: GoogleApiModule,
            providers: [
                GoogleApiService,
                {
                    provide: GoogleApiService,
                    useFactory: GoogleApiService.factory,
                    deps: [
                        apiConfig
                    ]
                },
                {
                    provide: GoogleAuthService,
                    useFactory: GoogleAuthService.factory,
                    deps: [
                        GoogleApiService
                    ]
                }
            ]
        }
    }
}