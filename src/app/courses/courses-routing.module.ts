import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseAddEditComponent } from './course-add-edit/course-add-edit.component';
import { CoursePageComponent } from './course-page/course-page.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseExistsGuard, CoursesStatePreloadingGuard } from './guards';
import { AuthorStatePreloadingGuard } from './guards/authors-state-preloading.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [CoursesStatePreloadingGuard],
    component: CoursePageComponent,
    data: { breadcrumb: { alias: 'Courses' } },
    children: [
      {
        path: 'new',
        canActivate: [AuthorStatePreloadingGuard],
        component: CourseAddEditComponent,
        data: { breadcrumb: { alias: 'new' } },
      },
      {
        path: 'edit/:id',
        canActivate: [CourseExistsGuard, AuthorStatePreloadingGuard],
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
