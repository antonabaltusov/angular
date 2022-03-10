import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoreModule } from 'src/app/core/core.module';
import { COURSES } from 'src/app/mocks/mock-courses';
import { SharedModule } from 'src/app/shared/shared.module';

import { CoursesItemComponent } from './courses-item.component';

describe('CoursesItemComponent', () => {
  let component: CoursesItemComponent;
  let fixture: ComponentFixture<CoursesItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CoreModule,
        SharedModule,
      ],
      declarations: [ CoursesItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesItemComponent);
    component = fixture.componentInstance;
    component.course = COURSES[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
