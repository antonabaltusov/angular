import { Component, OnInit } from '@angular/core';
import { ICourse } from 'src/app/shared/models/course/course.model';
import { COURSES } from 'src/app/shared/models/course/mock-courses';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.sass']
})
export class CoursesListComponent implements OnInit {
  public courses: ICourse[] = COURSES;

  constructor() { }


  ngOnInit(): void {
  }

  public delete(id: number): void {
    console.log(id);
  }
  public loadMore(): void {
    console.log('loadMore');
  }
}
