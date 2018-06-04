import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeRoutes } from './home.routes';
import { HomeComponent } from './home.component';
import { AuthenticationComponent } from '../authentication/authentication.component';
import { AuthenticationModule } from '../authentication/authentication.module';
@NgModule({
    imports: [
        
        CommonModule,
AuthenticationModule ,
        RouterModule.forChild(HomeRoutes),
    ],
    exports: [HomeComponent],
    declarations: [
        
        HomeComponent,
       
    ]
})
export class HomeModule { }