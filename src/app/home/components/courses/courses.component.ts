import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { COURSES } from 'src/app/mocks/mock-courses';
import { ICourse } from 'src/app/shared/models/course/course.model';
import { SearchByTitlePipe } from 'src/app/shared/pipes/search-by-title.pipe';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.sass'],
  providers: [ SearchByTitlePipe ]
})
export class CoursesComponent implements OnInit {
  public coursesData: ICourse[] = COURSES;
  public courses: ICourse[] = this.coursesData;
  public sortBy: string = 'creation';


  constructor(private searchByTitle: SearchByTitlePipe) {}

  ngOnInit(): void {
  }
  public changeSearch(value: string): void{
    this.courses = this.searchByTitle.transform(this.coursesData, value)
  }
}
