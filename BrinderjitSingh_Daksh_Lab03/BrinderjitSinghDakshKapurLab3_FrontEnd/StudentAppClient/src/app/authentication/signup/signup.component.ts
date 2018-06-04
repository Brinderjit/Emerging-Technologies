import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
@Component({
    selector: 'signup',
    templateUrl: './signup.template.html',
    //styleUrls: ['./signup/signup.template.css']
})
export class SignupComponent {
    errorMessage: string;
    user: any = {};
    constructor(private _authenticationService: AuthenticationService,
        private _router: Router) { }
    signup() {
        this._authenticationService.signup(this.user)
            .subscribe(result=> this._router.navigate(['/authentication/signin']),
            error => this.errorMessage = error);
    }
}