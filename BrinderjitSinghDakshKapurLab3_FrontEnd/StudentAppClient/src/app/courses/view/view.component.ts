
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';
import { CoursesService } from '../../courses/courses.service';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  //styleUrls: ['./view.component.css']
})
export class ViewComponent {
 user: any;
    course: any;
    paramsObserver: any;
    errorMessage: string;
    allowEdit: boolean = false;
    //
    constructor(private _router: Router,
        private _route: ActivatedRoute,
        private _authenticationService: AuthenticationService,
        private _coursesService: CoursesService) { }
    //
    ngOnInit() {
        this.user = this._authenticationService.user
        this.paramsObserver = this._route.params.subscribe(params => {
            let coursecode = params['coursecode'];
            this._coursesService
                .read(coursecode)
                .subscribe(
                course => 
                    this.course = course  
                ,
                error => this._router.navigate(['/courses'])
                );
        });
    }
    
    //
    ngOnDestroy() {
        this.paramsObserver.unsubscribe();
    }
    //
    delete() {
        this._coursesService.delete(this.course.coursecode).
            subscribe(deletedArticle => this._router.navigate(['/courses']),
            error => this.errorMessage = error);
    }

}
