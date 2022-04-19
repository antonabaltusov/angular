import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Subject,
  Subscription,
} from 'rxjs';
import { BreadcrumbService } from 'xng-breadcrumb';
import { CoursesService } from '../../services/courses/courses.service';
import { ICourse } from '../../shared/models/course/course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.sass'],
  providers: [CoursesService],
})
export class CoursesComponent implements OnInit {
  public sortBy: string = 'date';
  public courses: ICourse[];
  public inputSearch: string = '';
  public inputForm: FormControl;
  public lenghtBD: number = 0;
  public keyUp = new Subject<Event>();
  private subscription: Subscription;

  constructor(
    private coursesService: CoursesService,
    private breadcrumbService: BreadcrumbService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.inputForm = this.fb.control('');
    this.getList();
    this.search();
    this.breadcrumbService.set('@Courses', 'Courses');
  }

  private getList(search?: string) {
    this.coursesService.getList(0, search).subscribe((data) => {
      this.lenghtBD = data.length;
      this.courses = data.courses;
    });
  }

  public search(): void {
    this.inputForm.valueChanges
      .pipe(
        filter((data) => data.length > 3 || data.length == 0),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((data) => this.getList(data));
  }

  public update(boolean: any) {
    if (boolean) {
      this.coursesService
        .getList(0, this.inputSearch, this.courses.length)
        .subscribe((data) => {
          this.lenghtBD = data.length;
          this.courses = data.courses;
        });
    }
  }

  public delete(id: number) {
    if (confirm('Do you really want to delete this course')) {
      this.coursesService.removeCourse(id).subscribe(() => {
        this.update(true);
      });
    }
  }

  public loadMore() {
    this.coursesService
      .getList(this.courses.length, this.inputSearch)
      .subscribe((data) => {
        this.lenghtBD = data.length;
        this.courses.push(...data.courses);
      });
  }
}
