import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  public lenghtBD: number = 0;

  constructor(
    private coursesService: CoursesService,
    private breadcrumbService: BreadcrumbService,
    private route: ActivatedRoute
  ) {
    console.log(this.route);
  }

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.getList(this.inputSearch);
    });
    this.breadcrumbService.set('@Courses', 'Courses');
  }

  private getList(search?: string) {
    this.coursesService.getList(0, search).subscribe((data) => {
      this.lenghtBD = data.length;
      this.courses = data.courses;
    });
  }

  public search(): void {
    this.getList(this.inputSearch);
  }

  public update(boolean: any) {
    console.log(boolean);

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
