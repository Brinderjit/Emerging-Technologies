import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutes } from './app.routes';
import { HttpModule } from '@angular/http';
import { HomeModule } from './home/home.module';
import { WelcomeModule } from './welcome/welcome.module';
import { RequestOptions } from '@angular/http';
import { TokenInterceptor } from './authentication/authentication.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoursesModule } from './courses/courses.module';
import { CoursesService } from './courses/courses.service';
import { AuthorizationComponent } from './authorization/authorization.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthorizationModule } from './authorization/authorization.module';
import { AuthorizationService } from './authorization/authorization.service';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
  
   
   
   
   
   
 
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
   HttpModule,
   WelcomeModule,
   CoursesModule,
   HomeModule,
   AuthorizationModule,
    RouterModule.forRoot(AppRoutes)

  ],
  providers: [  {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },AuthenticationService,AuthorizationService ,CoursesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
