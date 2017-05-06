import {GoogleApiService} from "./GoogleApiService";
import {ModuleWithProviders, NgModule} from "@angular/core";
import {GoogleAuthService} from "./GoogleAuthService";
import {GoogleApiConfig} from "./config/GoogleApiConfig";

//TODO: Add authConfig
@NgModule()
export class GoogleApiModule {
    static setConfig(apiConfig: GoogleApiConfig, authConfig?: any): ModuleWithProviders {
        return {
            ngModule: GoogleApiModule,
            providers: [
                {
                    provide: GoogleApiService,
                    useFactory: () => GoogleApiService.factory(apiConfig),
                },
                {
                    provide: GoogleAuthService,
                    useFactory: GoogleAuthService.factory,
                    deps: [
                        GoogleApiService,
                        authConfig
                    ]
                }
            ]
        }
    }
}