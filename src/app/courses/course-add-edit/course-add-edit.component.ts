import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseClass } from '../../shared/models/course/course';
import { CoursesService } from '../../services/courses/courses.service';
import { ICourse } from '../../shared/models/course/course.model';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-course-add-edit',
  templateUrl: './course-add-edit.component.html',
  styleUrls: ['./course-add-edit.component.sass'],
})
export class CourseAddEditComponent implements OnInit {
  @Output() onCancel: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSave: EventEmitter<ICourse> = new EventEmitter<ICourse>();
  public nameBlock = 'Add Cousre';
  public id: number;
  public title: string = '';
  public decription: string = '';
  public creation: Date;
  public duration: number;
  constructor(
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private router: Router,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((routeParams) => {
      if (routeParams['id']) {
        this.breadcrumbService.set('@course', `course №${routeParams['id']}`);
        const id = routeParams['id'];
        console.log(id);
        const course = this.coursesService.getCourseById(id);
        if (course) {
          this.id = course.id || 0;
          this.nameBlock = 'Edit Course';
          this.title = course.title;
          this.duration = course.duration;
          this.decription = course.description;
          this.creation = course.creation;
        } else {
          this.router.navigateByUrl('courses');
        }
      }
    });
  }

  public cancel(): void {
    this.router.navigateByUrl('courses');
  }

  public async save(): Promise<void> {
    const course = new CourseClass(
      this.title,
      this.creation,
      this.duration,
      this.decription,
      this.id
    );
    if (this.id) {
      if (await this.coursesService.updateCourse(course)) {
        this.router.navigateByUrl('courses');
      }
    } else {
      if (await this.coursesService.createCourse(course)) {
        this.router.navigateByUrl('courses');
      }
    }
  }
}
