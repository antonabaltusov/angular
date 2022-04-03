import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseClass } from '../../shared/models/course/course';
import { CoursesService } from '../../services/courses/courses.service';
import { ICourse } from '../../shared/models/course/course.model';
import { BreadcrumbService } from 'xng-breadcrumb';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-course-add-edit',
  templateUrl: './course-add-edit.component.html',
  styleUrls: ['./course-add-edit.component.sass'],
})
export class CourseAddEditComponent implements OnInit {
  @Output() onSave: EventEmitter<boolean> = new EventEmitter<boolean>();
  public nameBlock = 'Add Cousre';
  public course: ICourse = {
    name: '',
    length: 0,
    description: '',
    date: '',
    authors: [],
  };
  constructor(
    private coursesService: CoursesService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((routeParams) => {
      if (routeParams['id']) {
        this.breadcrumbService.set('@course', `course №${routeParams['id']}`);
        const id = routeParams['id'];
        const course = this.coursesService.getCourseById(id);
        if (course) {
          this.course.id = course.id;
          this.course.name = course.name;
          this.course.length = course.length;
          this.course.description = course.description;
          this.course.date = course.date;
          this.course.authors = course.authors;
          this.nameBlock = 'Edit Course';
        }
      }
    });
  }

  public cancel(): void {
    this.router.navigateByUrl('courses');
  }

  public save(): void {
    if (
      this.course.date &&
      this.course.description &&
      this.course.length &&
      this.course.name
    ) {
      if (this.nameBlock == 'Edit Course') {
        this.coursesService.updateCourse(this.course).subscribe(() => {
          this.onSave.emit(true);
          this.router.navigateByUrl('courses');
        });
      } else {
        this.authService.getUserInfo().subscribe((user) => {
          this.course.authors.push(user);
          this.coursesService.createCourse(this.course).subscribe(() => {
            this.onSave.emit(true);
            this.router.navigateByUrl('courses');
          });
        });
      }
    }
  }
}
