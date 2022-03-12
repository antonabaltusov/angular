import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CoursesService } from '../../services/courses/courses.service';
import { ICourse } from 'src/app/shared/models/course/course.model';
import { SearchByTitlePipe } from 'src/app/shared/pipes/search-by-title.pipe';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.sass'],
  providers: [SearchByTitlePipe, CoursesService],
})
export class CoursesComponent implements OnInit {
  public coursesData: ICourse[] = this.coursesService.getList();
  public sortBy: string = 'creation';
  public courses: ICourse[] = this.coursesData;
  public inputValue: string = '';

  constructor(
    private searchByTitle: SearchByTitlePipe,
    private coursesService: CoursesService
  ) {}

  async ngOnInit(): Promise<void> {}

  public search(): void {
    this.courses = this.searchByTitle.transform(
      this.coursesData,
      this.inputValue
    );
  }

  public async delete(id: number): Promise<void> {
    if (confirm('Do you really want to delete this course')) {
      if (await this.coursesService.removeCourse(id)) {
        this.coursesData = await this.coursesService.getList();
        this.search();
      }
    }
  }

  public loadMore(): void {
    console.log('loadMore');
  }
}
