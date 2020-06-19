import {Component} from '@angular/core';
import {GoogleApiService} from 'ng-gapi/lib/src';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gapitest';

  constructor(private gapiService: GoogleApiService) {
    gapiService.onLoad().subscribe((loaded) => console.log(loaded));
  }

}
