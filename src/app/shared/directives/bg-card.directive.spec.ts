import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BgCardDirective } from './bg-card.directive';

@Component({
  template: ` <h2 [appBgCard]="today">Something Yellow</h2>`,
})
class TestComponent {
  today = new Date();
}

describe('BgCardDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, BgCardDirective],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });
});
