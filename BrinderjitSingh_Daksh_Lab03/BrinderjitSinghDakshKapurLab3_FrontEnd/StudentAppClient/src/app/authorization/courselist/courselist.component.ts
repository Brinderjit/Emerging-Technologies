import { Component, OnInit ,Input} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';
import { AuthorizationService } from '../authorization.service';
@Component({
 selector: 'app-courselist',
  templateUrl: './courselist.component.html',
})
export class CourselistComponent {
  courses: any = {};

    errorMessage: string;
    paramsObserver: any;
    constructor(private _router: Router,
        private _route: ActivatedRoute,
        private _authorisationService: AuthorizationService) { 
        
        }
    ngOnInit() {
        this.paramsObserver = this._route.params.subscribe(params => {
            let studentnumber = params['studentnumber'];
            console.log(studentnumber);
            this._authorisationService.listByStudent(studentnumber).subscribe(courses => {
                this.courses = courses;
            },
                error => this._router.navigate(['/welcome']));
});
    }
    ngOnDestroy() {
        this.paramsObserver.unsubscribe();
    }
   
}
