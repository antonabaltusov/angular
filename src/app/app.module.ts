import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './home/components/footer/footer.component';
import { LoginModule } from './login/login.module';
import { CoreModule } from './core/core.module';
import { CoursesModule } from './courses/courses.module';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { BreadcrumbModule, BreadcrumbService } from 'xng-breadcrumb';

@NgModule({
  declarations: [AppComponent, FooterComponent],
  imports: [
    CoreModule,
    AppRoutingModule,
    LoginModule,
    CoursesModule,
    SharedModule,
    BrowserModule,
    BreadcrumbModule,
  ],
  providers: [BreadcrumbService],
  bootstrap: [AppComponent],
})
export class AppModule {}
