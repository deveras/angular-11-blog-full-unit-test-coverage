import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from './breadcrumbs.component';


describe('BreadcrumbsComponent', () => {
  let subjectUnderTest: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreadcrumbsComponent ],
      imports: [ RouterModule.forRoot([])]
    });
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbsComponent);
    subjectUnderTest = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create the component', () => {
    expect( subjectUnderTest ).toBeTruthy();
  });


  it('should have one property crumbs as array', () => {
    expect ( subjectUnderTest.crumbs ).toBeDefined();
    expect ( subjectUnderTest.crumbs ).toEqual([]);
  });

});
