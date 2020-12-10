import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { LazyImageLoadingDirective } from './lazy-image-loading.directive';


@Component(
  {
    template: `<img src="foo"><img src="bar">`
  }
)
class DummyComponent {}


describe('LazyImageLoadingDirective', () => {
  let fixture: ComponentFixture<DummyComponent>;
  let imgFirstElement: DebugElement;
  let imgSecondElement: DebugElement;


  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [
        LazyImageLoadingDirective,
        DummyComponent
      ]
    });

    fixture = TestBed.createComponent(DummyComponent);
    imgFirstElement = fixture.debugElement.query(By.css('img:first-of-type'));
    imgSecondElement = fixture.debugElement.query(By.css('img:last-of-type'));
  });


  it('should add a loading attribute with the value of lazy', () => {
    fixture.detectChanges();

    expect( imgFirstElement.nativeElement.hasAttribute('loading') ).toBeTruthy();
    expect( imgFirstElement.nativeElement.getAttribute('loading') ).toBe('lazy');

    expect( imgSecondElement.nativeElement.hasAttribute('loading') ).toBeTruthy();
    expect( imgSecondElement.nativeElement.getAttribute('loading') ).toBe('lazy');
  });

});
