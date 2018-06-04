import { Component, OnInit ,Input} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';
import { CoursesService } from '../courses.service';
@Component({
  selector: 'edit',
  templateUrl: './edit.component.html',
  //styleUrls: ['./edit.component.css']
})
export class EditComponent {
  course: any = {};

    errorMessage: string;
    paramsObserver: any;
    constructor(private _router: Router,
        private _route: ActivatedRoute,
        private _coursesService: CoursesService,private _authenticationService:AuthenticationService) { 
          this.course.student=_authenticationService.user;
        }
    ngOnInit() {
        this.paramsObserver = this._route.params.subscribe(params => {
            let courseId = params['coursecode'];
            this._coursesService.read(courseId).subscribe(course => {
                this.course = course;
            },
                error => this._router.navigate(['/courses']));
});
    }
    ngOnDestroy() {
        this.paramsObserver.unsubscribe();
    }
    update() {
      
        this._coursesService.update(this.course).subscribe(savedCourse => this._router.navigate(['/courses', savedCourse.coursecode]),
            error => this.errorMessage =
                error);
    }
}