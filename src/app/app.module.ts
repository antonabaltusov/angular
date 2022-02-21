import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './home/components/header/header.component';
import { FooterComponent } from './home/components/footer/footer.component';
import { LogoComponent } from './home/components/header/logo/logo.component';
import { CoursesComponent } from './home/components/courses/courses.component';
import { SettingsComponent } from './home/components/settings/settings.component';
import { FormsModule } from '@angular/forms';
import { CoursesListComponent } from './home/components/courses-list/courses-list.component';
import { CoursesItemComponent } from './home/components/courses-item/courses-item.component';

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
