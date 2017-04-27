import {GoogleApi} from "./GoogleApi";
import {ModuleWithProviders, NgModule} from "@angular/core";
import {GoogleAuthService} from "./GoogleAuthService";
import {GoogleApiConfig} from "./config/GoogleApiConfig";

@NgModule()
export class GoogleApiModule {
    static forRoot(apiConfig: GoogleApiConfig): ModuleWithProviders {
        return {
            ngModule: GoogleApiModule,
            providers: [
                GoogleApi,
                {
                    provide: GoogleAuthService,
                    useFactory: GoogleAuthService.factory,
                    deps: [
                        GoogleApi,
                        apiConfig
                    ]
                }
            ]
        }
    }
}