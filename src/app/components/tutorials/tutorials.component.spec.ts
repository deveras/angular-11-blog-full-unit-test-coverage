import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { TutorialsComponent } from './tutorials.component';
import { TutorialsService } from './../../services/tutorials.service';
import { PagingFilterPipe } from '../../pipes/paging-filter.pipe';
import { SlugPipe } from '../../pipes/slug.pipe';


describe('TutorialsComponent', () => {
  const expectedTutorials = [ {
    id: 1, title: 'foo', recomendationSummary: 'baz', body: 'foo',
    lastUpdateDate: new Date(), createDate: new Date()
  }];
  let fixture: ComponentFixture<TutorialsComponent>;
  let subjectUnderTest: TutorialsComponent;
  let tutorialsService: TutorialsService;
  let spyTutorialsServiceGetAll: jasmine.Spy;
  let spyChangeDetectorRefMarkForCheck: jasmine.Spy;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialsComponent, PagingFilterPipe, SlugPipe ],
      providers: [ TutorialsService ],
      imports: [
        HttpClientTestingModule,
        RouterModule.forRoot([], { relativeLinkResolution: 'legacy' })
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    });

    fixture = TestBed.createComponent(TutorialsComponent);
    subjectUnderTest = fixture.componentInstance;

    tutorialsService = TestBed.inject(TutorialsService);
    spyTutorialsServiceGetAll = spyOn(tutorialsService, 'getAll');

    // subjectUnderTest.changeDetectorRef is private,
    // however i want to ensure that markForCheck is called
    // tslint:disable: no-any
    spyChangeDetectorRefMarkForCheck = spyOn((subjectUnderTest as any).changeDetectorRef, 'markForCheck');
  });


  it('should create the component', () => {
    expect( subjectUnderTest ).toBeTruthy();
  });


  it('should have 5 public properties', () => {
    expect( subjectUnderTest.collection ).toBeDefined();
    expect( subjectUnderTest.collection ).toEqual([]);
    expect( subjectUnderTest.errorMessage ).toBeDefined();
    expect( subjectUnderTest.errorMessage ).toBe('');
    expect( subjectUnderTest.showLoading ).toBeDefined();
    expect( subjectUnderTest.showLoading ).toBe(true);
    expect( subjectUnderTest.currentPageIndex ).toBeDefined();
    expect( subjectUnderTest.currentPageIndex ).toBe(0);
    expect( subjectUnderTest.pageSize ).toBeDefined();
    expect( subjectUnderTest.pageSize ).toBe(5);
  });


  it('should have the following public methods', () => {
    expect( subjectUnderTest.ngOnInit ).toEqual(jasmine.any(Function));
    expect( subjectUnderTest.ngOnDestroy ).toEqual(jasmine.any(Function));
  });


  it('ngOnInit should collect all books onInit if successfull', () => {
    spyTutorialsServiceGetAll.and.returnValue( of(expectedTutorials) );
    fixture.detectChanges();

    expect( spyTutorialsServiceGetAll.calls.count() ).toBe(1);
    expect( subjectUnderTest.collection ).toEqual(expectedTutorials);
    expect( subjectUnderTest.showLoading ).toBe(false);
    expect( spyChangeDetectorRefMarkForCheck ).toHaveBeenCalled();
  });


  it('ngOnInit should populate the errorMessage when getting books fails', () => {
    spyTutorialsServiceGetAll.and.returnValue( throwError('foo bar baz') );
    fixture.detectChanges();

    expect( spyTutorialsServiceGetAll.calls.count() ).toBe(1);
    expect( subjectUnderTest.errorMessage ).toEqual('foo bar baz');
    expect( subjectUnderTest.showLoading ).toBe(false);
    expect( spyChangeDetectorRefMarkForCheck ).toHaveBeenCalled();
  });


  it('ngOnDestroy should unsubscribe', () => {
    spyTutorialsServiceGetAll.and.returnValue( {
      subscribe: () => {
        return {
          unsubscribe: () => 'bar'
        };
      }
    });
    fixture.detectChanges();

    // subjectUnderTest.subs is private,
    // however i want to ensure that unsubscribe is called
    // tslint:disable: no-any
    spyOn((subjectUnderTest as any).tutorialsServiceSubscription, 'unsubscribe');

    subjectUnderTest.ngOnDestroy();

    // tslint:disable: no-any
    expect( (subjectUnderTest as any).tutorialsServiceSubscription.unsubscribe ).toHaveBeenCalled();
  });


  it('trackByCollectionId should return the id of the model', () => {
    spyTutorialsServiceGetAll.and.returnValue( of(expectedTutorials) );
    fixture.detectChanges();

    expect( subjectUnderTest.trackByCollectionId(77, subjectUnderTest.collection[0]) ).toBe(1);
  });

});
