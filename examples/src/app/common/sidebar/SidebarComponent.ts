import {Component} from "@angular/core";
import {SideNavConfig} from "../config/SideNavConfig";
import {ExtendedRoute, ExtendedRoutes} from "../infrastructure/routes/ExtendedRoutes";

@Component({
    selector: 'sidebar',
    template: require('./sidebar.html'),
    styles: [require('./sidebar.less')]
})
export class SidebarComponent {
}
