import { TestBed } from '@angular/core/testing';
import { USER } from '../../mocks/mock-user';

import { AuthService } from './auth.service';


describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should call window.localStorage.setItem with with key and firstName", () => {
    const event = spyOn(window.localStorage, "setItem");
    service.login('email','password');
    expect(event).toHaveBeenCalledWith("user", USER.firstName);
  });

  it("should call window.localStorage.removeItem with with key", () => {
    const event = spyOn(window.localStorage, "removeItem");
    service.logout();
    expect(event).toHaveBeenCalledWith("user");
  });

  it("should call window.localStorage.getItem with with key", () => {
    const event = spyOn(window.localStorage, "getItem");
    service.isAuth();
    expect(event).toHaveBeenCalledWith("user");
  });

  it("should return false", () => {
    spyOn(window.localStorage, "getItem").and.callFake(()=> '');
    const answer = service.isAuth();
    expect(answer).toBeFalsy();
  });

  it("should return true", () => {
    spyOn(window.localStorage, "getItem").and.callFake(()=> USER.firstName);
    const answer = service.isAuth();
    expect(answer).toBeTruthy();
  });

  it("should call window.localStorage.getItem with with key", () => {
    const event = spyOn(window.localStorage, "getItem");
    service.getUserInfo();
    expect(event).toHaveBeenCalledWith("user");
  });

  it("should return firsName", () => {
    spyOn(window.localStorage, "getItem").and.callFake(()=> USER.firstName);
    const answer = service.getUserInfo();
    expect(answer).toBe(USER.firstName);
  });
});
