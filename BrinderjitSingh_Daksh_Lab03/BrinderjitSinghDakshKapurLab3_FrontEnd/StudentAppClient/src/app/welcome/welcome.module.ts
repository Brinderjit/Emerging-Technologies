import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WelcomeRoutes } from './welcome.routes';
import { WelcomeComponent } from './welcome.component';
import { AuthenticationComponent } from '../authentication/authentication.component';
import { AuthenticationModule } from '../authentication/authentication.module';
@NgModule({
    imports: [
        
        CommonModule,
AuthenticationModule ,
        RouterModule.forChild(WelcomeRoutes),
    ],
    exports: [WelcomeComponent],
    declarations: [
        
        WelcomeComponent,
       
    ]
})
export class WelcomeModule { }