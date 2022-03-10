import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesComponent } from './courses.component';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;

  beforeEach(async () => {
      await TestBed.configureTestingModule({
      declarations: [ CoursesComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // const teg = fixture.debugElement.query(By.css('app-settings'));
    // console.log('teg-'+teg);
    expect(component).toBeTruthy();
  });

  // it('should emit changeSearch from onSearch', () => {
  //   const teg = fixture.debugElement.query(By.css('app-settings'));
  //   console.log('teg-'+teg);
  //   teg.triggerEventHandler('onSearch', null);
  //   fixture.detectChanges();

  //   expect(spy.calls.any()).toBeTruthy();
  // });
});
