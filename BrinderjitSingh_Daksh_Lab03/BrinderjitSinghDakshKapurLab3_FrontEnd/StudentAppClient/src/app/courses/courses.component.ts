import { Component } from '@angular/core';
import { CoursesService } from './courses.service';
import {AuthenticationService} from '../authentication/authentication.service';
@Component({
    selector: 'courses',
    templateUrl: './courses.component.html',
    providers: [CoursesService]
})
export class CoursesComponent { 
  user:any;
  constructor() {
        
    }
}
