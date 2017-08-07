import {Component} from "@angular/core";
import {UserService} from "../common/user/UserService";

@Component({
    selector: 'login-form',
    template: require('./login.html')
})
export class LoginComponent {

    constructor(private userService: UserService) {
    }

    public signIn() {
        this.userService.signIn();
    }
}