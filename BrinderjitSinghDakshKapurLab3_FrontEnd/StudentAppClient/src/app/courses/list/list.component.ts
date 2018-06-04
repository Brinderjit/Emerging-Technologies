import { Component, OnInit,Input } from '@angular/core';
import { CoursesService } from '../courses.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';
import { AuthorizationService } from '../../authorization/authorization.service';
@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  //styleUrls: ['./list.component.css']
})

export class ListComponent {
user: any;
    courses: any;
    errorMessage: string;
    constructor(private _router: Router ,private _coursesService: CoursesService,private _authService:AuthorizationService,private _authenticationService:AuthenticationService) { 
        this.user=_authenticationService.user;
    }
    ngOnInit() {
          console.log("from" + window.sessionStorage.getItem('token'));
               // if(this._authenticationService.user.role==='Admin')
               // {
               //     this._router.navigate(['/Admin'])
               // }
               // else
              //  {
                  
                   this._authService.listByStudent(this.user.studentnumber).subscribe(courses => this.courses
            = courses);
               // }
        
    }
    ondelete(course: any){
          this._coursesService.delete(course).subscribe(courses => this.courses
            = courses);
    }
}

