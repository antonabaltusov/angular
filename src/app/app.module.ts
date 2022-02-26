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
import { BgCardDirective } from './shared/directives/bg-card.directive';
import { DurationPipe } from './shared/pipes/duration.pipe';
import { OrderByPipe } from './shared/pipes/order-by.pipe';
import { SearchByTitlePipe } from './shared/pipes/search-by-title.pipe';

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
    BgCardDirective,
    DurationPipe,
    OrderByPipe,
    SearchByTitlePipe,
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
