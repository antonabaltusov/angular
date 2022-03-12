import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth/auth.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const fakeAuthService = jasmine.createSpyObj("fakeAuth", ["isAuth"]);

  beforeEach(async () => {
    TestBed.overrideComponent(AppComponent, {
      set: {
          providers: [
            { provide: AuthService, useValue: fakeAuthService }
          ]
        }
      }
    );
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fakeAuthService.isAuth.and.callFake(() => true)
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should call fakeAuthService.isAuth`, () => {
    component.ngDoCheck();
    fixture.detectChanges();
    expect(fakeAuthService.isAuth).toHaveBeenCalled();
  });
});
