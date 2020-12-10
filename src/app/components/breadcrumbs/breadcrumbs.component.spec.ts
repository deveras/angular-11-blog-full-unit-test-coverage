import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from './breadcrumbs.component';


describe('BreadcrumbsComponent', () => {
  let subjectUnderTest: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreadcrumbsComponent ],
      imports: [ RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }) ]
    });

    fixture = TestBed.createComponent(BreadcrumbsComponent);
    subjectUnderTest = fixture.componentInstance;
  });


  it('should create the component', () => {
    expect( subjectUnderTest ).toBeTruthy();
  });


  it('should have one property crumbs as array', () => {
    expect ( subjectUnderTest.crumbs ).toBeDefined();
    expect ( subjectUnderTest.crumbs ).toEqual([]);
  });


  it('should have the right values when detectChanges is called by angular', () => {
    subjectUnderTest.crumbs = [ { title: 'foo', route: 'bar'} ];
    fixture.detectChanges();

    expect (subjectUnderTest.crumbs[0].title).toBe('foo');
    expect (subjectUnderTest.crumbs[0].route).toBe('bar');
  });

});
