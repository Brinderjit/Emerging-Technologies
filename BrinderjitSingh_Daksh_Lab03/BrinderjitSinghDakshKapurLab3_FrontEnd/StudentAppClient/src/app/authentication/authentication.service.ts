import 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from
'@angular/http';
import {Subject,BehaviorSubject} from 'rxjs';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class AuthenticationService {
    public loggedIn = new BehaviorSubject<boolean>(false);
    public user=window['user']
    public user1 = new BehaviorSubject<any>(window['user']) ;   
    private _signinURL = 'http://localhost:3000/api/auth/signin';
    private _signupURL = 'http://localhost:3000/api/auth/signup';
    constructor(private http: Http) {
      
    }
    isLoggedIn() {
        return this.loggedIn.asObservable();;
    }
    signin(credentials: any): Observable<any> {
        let body = JSON.stringify(credentials);
        let headers = new Headers({
            'Content-Type':
            'application/json'
            
        });
        let options = new RequestOptions({ headers: headers});
        return this.http.post(this._signinURL, body, options)
            .map(response => this.signInSuccess(response))
            .catch(this.handleError)
    }
    signup(user: any): Observable<any> {
        let body = JSON.stringify(user);
        let headers = new Headers({
            'Content-Type':
            'application/json'
        }); let options = new RequestOptions({ headers: headers });
        return this.http.post(this._signupURL, body, options)
            .map(res => this.user = res.json())
            .catch(this.handleError)
    }
    private signInSuccess(res : Response){
        console.log(res.json().token);
       window.sessionStorage.setItem('token',res.json().token);
         this.loggedIn.next(true) ;
         this.user=res.json().user;
       this.user1.next(res.json().user);
       return res.json().user;
   
    }
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().message ||
            'Server error');
    }
    public signout(){
        
        window.sessionStorage.removeItem("token")
        this.user1.next(window['user']);
         this.loggedIn.next(false) ;
         this.user=window['user'];
         return true;
    }
    public getToken(): string {
    return window.sessionStorage.getItem('token');
  }
 
}