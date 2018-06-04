import { Component } from '@angular/core';
import { AuthenticationService } from './authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    template: '<app-home></app-home>',
})
export class AppComponent {
    constructor(private _authenticationService: AuthenticationService, private router: Router) { }
}
