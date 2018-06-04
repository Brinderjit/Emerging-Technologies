import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service'
@Component({
    selector: 'signin',
    templateUrl: './signin.template.html',
    

})
export class SigninComponent {
    errorMessage: string;
    credentials: any = {};
    constructor(private _authenticationService: AuthenticationService,
        private _router: Router) { }
    //handle any value event with the
    //first arrow function and any error with the second arrow function
    signin() {
        //this._router.navigate(['/courses']);
        this._authenticationService.signin(
            this.credentials).subscribe(this.signInSuccess(result),
            error => this.errorMessage = error);
    }
    signInSuccess(user:any){

        if(user.role=='user')
        {
            this._router.navigate(['/courses']);
        }
        
        else{
            this._router.navigate(['/admin']);
        }
    }
    signout() {
    }
}