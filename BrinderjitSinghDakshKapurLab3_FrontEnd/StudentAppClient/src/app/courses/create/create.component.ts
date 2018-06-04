import { Component, OnInit ,Input } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from '../courses.service';
import { AuthenticationService } from '../../authentication/authentication.service';
@Component({
  selector: 'create',
  templateUrl: './create.component.html',
 // styleUrls: ['./create.component.css']
})
export class CreateComponent  {


 course: any = {};

    errorMessage: string;
    constructor(private _router: Router,
        private _coursesService: CoursesService, private _authenticationService:AuthenticationService) { }
    create() {
       
   
        this._coursesService
            .create(this.course)
            .subscribe(createdCourse => this._router.navigate(['/courses',
                createdCourse.coursecode]),
            error => this.errorMessage = error);
    }
}



