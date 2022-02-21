import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LogoComponent } from './header/logo/logo.component';
import { CoursesComponent } from './courses/courses.component';
import { SettingsComponent } from './courses/settings/settings.component';
import { FormsModule } from '@angular/forms';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { CoursesItemComponent } from './courses/courses-list/courses-item/courses-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    CoursesComponent,
    SettingsComponent,
    CoursesListComponent,
    CoursesItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
