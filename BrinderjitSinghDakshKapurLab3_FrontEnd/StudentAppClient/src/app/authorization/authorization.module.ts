import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthorizationRoutes } from './authorization.routes';
import { AuthorizationComponent } from './authorization.component';
import { CourselistComponent } from './courselist/courselist.component';
import { StudentListComponent } from './student-list/student-list.component';
@NgModule({
    imports: [
   CommonModule,
        FormsModule,
        RouterModule.forChild(AuthorizationRoutes),
    ],
    exports:[AuthorizationComponent],
    declarations: [
        AuthorizationComponent,
        CourselistComponent,
        StudentListComponent ,
    ]
})
export class AuthorizationModule { }
