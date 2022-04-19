import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseClass } from '../../shared/models/course/course';
import { CoursesService } from '../../services/courses/courses.service';
import { ICourse } from '../../shared/models/course/course.model';
import { BreadcrumbService } from 'xng-breadcrumb';
import { AuthService } from '../../auth/auth.service';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-course-add-edit',
  templateUrl: './course-add-edit.component.html',
  styleUrls: ['./course-add-edit.component.sass'],
})
export class CourseAddEditComponent implements OnInit {
  @Output() onSave: EventEmitter<boolean> = new EventEmitter<boolean>();
  public nameBlock = 'Add Cousre';
  public form: FormGroup;
  private id: number;
  constructor(
    private datePipe: DatePipe,
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private fb: FormBuilder
  ) {
    this.route.params.subscribe((routeParams) => {
      console.log(routeParams['id']);

      if (routeParams['id']) {
        this.breadcrumbService.set('@course', `course №${routeParams['id']}`);
        this.id = routeParams['id'];
        this.coursesService.getCourseById(this.id).subscribe((course) => {
          console.log(course);

          if (course) {
            this.form = this.fb.group({
              name: [
                course.name,
                [Validators.required, Validators.maxLength(50)],
              ],
              description: [
                course.description,
                [Validators.required, Validators.maxLength(500)],
              ],
              date: [
                this.datePipe.transform(course.date, 'dd/MM/yyyy'),
                Validators.required,
              ],
              length: [course.length, [Validators.required]],
              authors: this.fb.array(
                [],
                [Validators.required, Validators.minLength(1)]
              ),
            });
            const contrlol = <FormArray>this.form.controls['authors'];
            course.authors.forEach((user) => {
              contrlol.push(
                this.fb.group({
                  id: [user.id],
                  firstName: [user.firstName],
                  lastName: [user.lastName],
                })
              );
            });
            this.nameBlock = 'Edit Course';
          } else {
            this.newForm();
          }
        });
      } else {
        this.newForm();
      }
    });
  }

  async ngOnInit() {}

  private newForm() {
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.maxLength(50)]],
      description: [null, [Validators.required, Validators.maxLength(500)]],
      date: [null, Validators.required],
      length: [null, [Validators.required]],
      authors: this.fb.array([]),
    });
  }

  get name() {
    return this.form.get('name');
  }

  get description() {
    return this.form.get('description');
  }

  public cancel(): void {
    this.router.navigateByUrl('courses');
  }

  public save(): void {
    const date = this.form.value.date.split('/') as Array<number>;
    const course: ICourse = {
      ...this.form.value,
      date: new Date(date[2], date[1], date[0]).toISOString(),
    };
    if (this.nameBlock == 'Edit Course') {
      this.coursesService
        .updateCourse({ ...course, id: this.id })
        .subscribe(() => {
          this.onSave.emit(true);
          this.router.navigateByUrl('courses');
        });
    } else {
      this.coursesService.createCourse(course).subscribe({
        next: () => {
          this.onSave.emit(true);
          this.router.navigateByUrl('courses');
        },
        error: () => {
          console.log('error');
        },
      });
    }
  }
}
