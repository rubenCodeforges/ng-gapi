import {GoogleApiService} from "./GoogleApiService";
import {ModuleWithProviders, NgModule, Provider} from "@angular/core";
import {GoogleAuthService} from "./GoogleAuthService";

@NgModule()
export class GoogleApiModule {
    static forRoot(gapiConfigProvider: Provider): ModuleWithProviders {
        return {
            ngModule: GoogleApiModule,
            providers: [
                gapiConfigProvider,
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
