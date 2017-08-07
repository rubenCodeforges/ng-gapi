import {Route} from "@angular/router";
import {ErrorPageComponent} from "./errorPages/ErrorPageComponent";

export const AppCommonRoutes: Route[] = [
    {path: 'error/:code', component: ErrorPageComponent}
];
