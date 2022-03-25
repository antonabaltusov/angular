import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { CoursePageComponent } from './courses/course-page/course-page.component';
import { CoursesComponent } from './courses/courses/courses.component';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  {
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    path: 'courses',
    loadChildren: () =>
      import('./courses/courses.module').then((m) => m.CoursesModule),
    data: { breadcrumb: { skip: false } },
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
