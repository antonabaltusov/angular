import { NgModule } from '@angular/core';
import { CoursesComponent } from './courses/courses.component';
import { CoursesItemComponent } from './courses-item/courses-item.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from '../home/components/header/header.component';
import { CourseAddEditComponent } from './course-add-edit/course-add-edit.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    CoursesComponent,
    CoursesItemComponent,
    CourseAddEditComponent,
  ],
  imports: [CoreModule, SharedModule],
  providers: [DatePipe],
  exports: [CoursesComponent],
})
export class CoursesModule {}
