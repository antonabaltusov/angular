import { NgModule } from '@angular/core';
import { CoursesComponent } from './courses/courses.component';
import { CoursesItemComponent } from './courses-item/courses-item.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { CourseAddEditComponent } from './course-add-edit/course-add-edit.component';
import { DatePipe } from '@angular/common';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursePageComponent } from './course-page/course-page.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { DateComponent } from './course-add-edit/date/date.component';
import { DurationComponent } from './course-add-edit/duration/duration.component';
import { AuthorsComponent } from './course-add-edit/authors/authors.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CoursesItemComponent,
    CourseAddEditComponent,
    CoursePageComponent,
    DateComponent,
    DurationComponent,
    AuthorsComponent,
  ],
  imports: [CoreModule, SharedModule, CoursesRoutingModule, BreadcrumbModule],
  providers: [DatePipe],
  exports: [CoursesComponent],
})
export class CoursesModule {}
