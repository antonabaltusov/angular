import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseAddEditComponent } from './course-add-edit/course-add-edit.component';
import { CoursePageComponent } from './course-page/course-page.component';
import { CoursesComponent } from './courses/courses.component';

const routes: Routes = [
  {
    path: '',
    component: CoursePageComponent,
    data: { breadcrumb: { alias: 'Courses' } },
    children: [
      {
        path: 'new',
        component: CourseAddEditComponent,
        data: { breadcrumb: { alias: 'new' } },
      },
      {
        path: ':id',
        component: CourseAddEditComponent,
        data: { breadcrumb: { alias: `course` } },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
