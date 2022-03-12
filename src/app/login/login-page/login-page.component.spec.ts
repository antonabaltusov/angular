import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CoreModule } from 'src/app/core/core.module';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedModule } from 'src/app/shared/shared.module';

import { LoginPageComponent } from './login-page.component';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  const fakeAuthService = jasmine.createSpyObj("fakeAuth", ["login"]);

  beforeEach(async () => {
    TestBed.overrideComponent(LoginPageComponent, {
      set: {
          providers: [
            { provide: AuthService, useValue: fakeAuthService }
          ]
        }
      }
    );
    await TestBed.configureTestingModule({
      imports: [
        CoreModule,
        SharedModule,
      ],
      declarations: [ LoginPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fakeAuthService.login.and.callFake(() => {})
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('if input and passwort are true - call authService.login', () => {
    component.inputEmail = 'email';
    component.password = 'password';
    component.login();
    expect(fakeAuthService.login).toHaveBeenCalledWith('email', 'password');
  })

  it("should call metod 'login', by click button", () => {
    const event = spyOn(component, "login");
    const button = fixture.debugElement.query(By.css(".login-button"));
    button.nativeElement.click();
    expect(event).toHaveBeenCalled();
  });
});
