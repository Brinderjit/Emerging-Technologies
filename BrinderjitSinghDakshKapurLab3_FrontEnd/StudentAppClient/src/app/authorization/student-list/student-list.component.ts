import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  //styleUrls: ['./list.component.css']
})

export class StudentListComponent {
user: any;
   students: any;
    errorMessage: string;
    constructor(private _router: Router ,private _authorizationService: AuthorizationService,private _authenticationService:AuthenticationService) { 
        this.user=_authenticationService.user;
    }
    ngOnInit() {
          
                   this._authorizationService.listAllStudent().subscribe(students => this.students
            = students);
               
        
    }
    
}

