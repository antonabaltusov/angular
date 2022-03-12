import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { USER } from 'src/app/mocks/mock-user';
import { AuthService } from '../../../services/auth/auth.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const fakeAuthService = jasmine.createSpyObj("fakeAuth", ["getUserInfo", 'logout']);

  beforeEach(async () => {
    TestBed.overrideComponent(HeaderComponent, {
      set: {
          providers: [
            { provide: AuthService, useValue: fakeAuthService }
          ]
        }
      }
    );
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fakeAuthService.getUserInfo.and.callFake(() => USER.firstName)
    fakeAuthService.logout.and.callFake(() => USER)
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    component.isAuth = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have class background-white", () => {
    const header = fixture.debugElement.query(By.css("header"));
    expect(header.classes).toEqual({'background-white': true});
  });

  it("should not have class background-white", () => {
    component.isAuth = false
    const header = fixture.debugElement.query(By.css("header"));
    fixture.detectChanges();
    expect(header.classes).toEqual({'': true});
  });

  it("should call metod 'logout'", () => {
    const event = spyOn(component, "logout");
    const button = fixture.debugElement.query(By.css(".log-off"));
    button.nativeElement.click();
    expect(event).toHaveBeenCalled();
  });

  it("should call metod of authService 'logout'", () => {
    const event = spyOn(console, "log");
    component.logout();
    expect(fakeAuthService.logout).toHaveBeenCalled();
    expect(event).toHaveBeenCalledWith(component.userName);


  });
});
