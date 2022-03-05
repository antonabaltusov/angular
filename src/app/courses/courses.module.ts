import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses/courses.component';
import { CoursesItemComponent } from './courses-item/courses-item.component';
import { SettingsComponent } from './settings/settings.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    CoursesComponent,
    SettingsComponent,
    CoursesItemComponent,
  ],
  imports: [
    CoreModule,
    SharedModule
  ],
  exports: [
    CoursesComponent
  ]
})
export class CoursesModule { }
