import {Component} from "@angular/core";
import {UserService} from "../user/UserService";

@Component({
    selector: 'toolbar',
    template: require('./toolbar.html')
})
export class ToolbarComponent {
    constructor(private userService: UserService) {
    };

    public logout() {
        this.userService.signOut();
    }
}