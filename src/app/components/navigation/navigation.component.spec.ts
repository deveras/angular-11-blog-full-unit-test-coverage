import { ComponentFixture, TestBed } from '@angular/core/testing';
// Required due to this output:
// 'Can't bind to 'routerLink' since it isn't a known property of 'a'.'
import { RouterModule } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { NavigationComponent } from './navigation.component';


describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationComponent ],
      imports: [ RouterModule.forRoot([], { relativeLinkResolution: 'legacy' })]
    });

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create the component', () => {
    expect( component ).toBeTruthy();
  });


  it('should have 2 public properties', () => {
    expect ( component.openMobileMenu ).toBeDefined();
    expect ( component.openMobileMenu ).toBe(false);
    expect ( component.openMobileMenuChange ).toBeDefined();
    expect ( component.openMobileMenuChange instanceof EventEmitter).toBe(true);
  });


  it('closeMobileMenu should emit a toogle of openMobileMenu', () => {
    const spyEventEmitter = spyOn(component.openMobileMenuChange, 'emit');
    component.closeMobileMenu();
    expect( spyEventEmitter ).toHaveBeenCalledWith(true);

    component.openMobileMenu = true;
    component.closeMobileMenu();
    expect( spyEventEmitter ).toHaveBeenCalledWith(false);
  });
});
