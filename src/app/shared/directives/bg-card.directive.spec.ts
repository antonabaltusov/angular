import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BgCardDirective } from './bg-card.directive';

@Component({
  template: `
  <h2 [appBgCard]="today">Something Yellow</h2>`
})
class TestComponent {
  today = new Date();
 }

describe('BgCardDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, BgCardDirective]
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  // it('style bgcolor should be green', () => {
  //   const debugEl: HTMLElement = fixture.debugElement.nativeElement;
  //   const h2: HTMLElement|null = debugEl.querySelector('h2')
  //   expect('rgba(0, 0, 255, 0.2)').toBe(h2?.style.backgroundColor);
  // });
});
