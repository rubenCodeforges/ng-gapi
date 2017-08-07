import {Component} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {UserService} from "./common/user/UserService";

@Component({
    selector: 'app-root',
    templateUrl: 'app.html',
    styles: [require('./app.less')]
})
export class AppComponent {

    constructor(private userService: UserService,
                translate: TranslateService) {
        translate.setDefaultLang('eng');
    };

    public isSignedIn(): boolean {
        return this.userService.isUserSignedIn();
    }

}
