import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {Http, Headers, Request, RequestMethod, Response} from '@angular/http';

@Injectable()
export class AuthorizationService {
    private _baseURL = 'http://localhost:3000/api/coursesByStudent';
    constructor(private _http: Http) { }
 
     listAllStudent(): Observable<any> {
        return this._http
            .get('http://localhost:3000/api/auth/allStudents')
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    listByStudent(studentnumber:string): Observable<any> {
     
        console.log(`${this._baseURL}/${studentnumber}`);
        return this._http
            .get(`${this._baseURL}/${studentnumber}`)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    private handleError(error: Response) {
        return Observable.throw(error.json().message || 'Server error');
    }
}
