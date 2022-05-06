import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './home/components/footer/footer.component';
import { LoginModule } from './login/login.module';
import { CoreModule } from './core/core.module';
import { CoursesModule } from './courses/courses.module';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BreadcrumbModule, BreadcrumbService } from 'xng-breadcrumb';
import { RootStoreModule } from './core/@ngrx/root-store.module';

@NgModule({
  declarations: [AppComponent, FooterComponent],
  imports: [
    CoreModule,
    LoginModule,
    CoursesModule,
    BrowserModule,
    HttpClientModule,
    RootStoreModule,
    BreadcrumbModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [BreadcrumbService],
  bootstrap: [AppComponent],
})
export class AppModule {}
