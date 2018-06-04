import { Routes } from '@angular/router';
import { AuthorizationComponent } from './authorization.component';
import { CourselistComponent } from './courselist/courselist.component';
import { StudentListComponent } from './student-list/student-list.component';
export const AuthorizationRoutes: Routes = [{
    path: 'admin',
    component: AuthorizationComponent,
    children: [
        { path: '', component: StudentListComponent },
        { path: ':studentnumber/courses', component: CourselistComponent},
       
    ],
}];