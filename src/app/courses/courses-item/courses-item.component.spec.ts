import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CoreModule } from 'src/app/core/core.module';
import { COURSES } from 'src/app/mocks/mock-courses';
import { SharedModule } from 'src/app/shared/shared.module';

import { CoursesItemComponent } from './courses-item.component';

describe('CoursesItemComponent', () => {
  let component: CoursesItemComponent;
  let fixture: ComponentFixture<CoursesItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreModule, SharedModule],
      declarations: [CoursesItemComponent],
    }).compileComponents();
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

  it("should call metod 'delete', by click bytton", () => {
    const event = spyOn(component, 'delete');
    const button = fixture.debugElement.query(By.css('.delete'));
    button.nativeElement.click();

    expect(event).toHaveBeenCalled();
  });

  it('should emit event with courses id', () => {
    const event = spyOn(component.onDelete, 'emit');
    component.delete();

    expect(event).toHaveBeenCalledWith(component.course.id);
  });

  it('should change value of element when chenge value Input', () => {
    component.course = COURSES[1];
    fixture.detectChanges();
    const p = fixture.debugElement.query(By.css('.info-description'));

    expect(p.nativeElement.innerHTML).toContain(COURSES[1].description);
  });
});
