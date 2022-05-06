import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseAddEditComponent } from './course-add-edit/course-add-edit.component';
import { CoursePageComponent } from './course-page/course-page.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseExistsGuard, CoursesStatePreloadingGuard } from './guards';

const routes: Routes = [
  {
    path: '',
    canActivate: [CoursesStatePreloadingGuard],
    component: CoursePageComponent,
    data: { breadcrumb: { alias: 'Courses' } },
    children: [
      {
        path: 'new',
        component: CourseAddEditComponent,
        data: { breadcrumb: { alias: 'new' } },
      },
      {
        path: 'edit/:id',
        canActivate: [CourseExistsGuard],
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
