import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {Http, Headers, Request, RequestMethod, Response} from '@angular/http';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class CoursesService {
    private _baseURL = 'http://localhost:3000/api/courses';
    constructor(private _http: Http,private _httpclient:HttpClient) { }
    create(course: any): Observable<any> {
        return this._httpclient
            .post(this._baseURL, course)
            .map(res => res)
            .catch(this.handleError);
    }
    read(courseId: string): Observable<any> {
        return this._httpclient
            .get(`${this._baseURL}/${courseId}`)
            .map(res=>this.readSuccess(res))
            .catch(this.handleError);
    } 
    readSuccess(res:any){

        console.log(res);
        return res;
    }
    update(course: any): Observable<any> {
          console.log(course);
        return this._httpclient
            .put(`${this._baseURL}/${course.coursecode}`, course).map(res => res)
            .catch(this.handleError);
    }
    
    delete(coursecode: any): Observable<any> {
        return this._httpclient
            .delete(`${this._baseURL}/${coursecode}`)
            .map(res => res)
            .catch(this.handleError);
    }
    listByStudent(): Observable<any> {
        return this._httpclient
            .get(this._baseURL)
            .map(res => res)
            .catch(this.handleError);
    }
    private handleError(error: Response) {
        return Observable.throw(error || 'Server error');
    }
}
