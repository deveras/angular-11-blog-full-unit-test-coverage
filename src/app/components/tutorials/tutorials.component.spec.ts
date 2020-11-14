import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { TutorialsComponent } from './tutorials.component';
import { TutorialsService } from './../../services/tutorials.service';
import { HttpClientTestingModule, HttpTestingController }
  from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';


describe('TutorialsComponent', () => {
  const expectedTutorials = [ {
    id: 1, title: "foo", recomendationSummary: "baz", body: "foo",
    lastUpdateDate: new Date(), createDate: new Date()
  }];
  let fixture: ComponentFixture<TutorialsComponent>;
  let subjectUnderTest: TutorialsComponent;
  let tutorialsService:TutorialsService;
  let spyTutorialsServiceGetAll:jasmine.Spy;
  let spyChangeDetectorRefMarkForCheck:jasmine.Spy;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialsComponent ],
      providers: [ TutorialsService ],
      imports: [
        HttpClientTestingModule,
        RouterModule.forRoot([])
      ]
    })
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialsComponent);
    subjectUnderTest = fixture.componentInstance;

    tutorialsService = TestBed.inject(TutorialsService);
    spyTutorialsServiceGetAll = spyOn(tutorialsService, "getAll");

    // subjectUnderTest.changeDetectorRef is private,
    // however i want to ensure that markForCheck is called
    spyChangeDetectorRefMarkForCheck = spyOn((subjectUnderTest as any).changeDetectorRef, "markForCheck");
  });


  it('should create the component', () => {
    expect( subjectUnderTest ).toBeTruthy();
  });


  it('should have 3 public properties', () => {
    expect( subjectUnderTest.collection ).toBeDefined();
    expect( subjectUnderTest.collection ).toEqual([]);
    expect( subjectUnderTest.errorMessage ).toBeDefined();
    expect( subjectUnderTest.errorMessage ).toBe("");
    expect( subjectUnderTest.showLoading ).toBeDefined();
    expect( subjectUnderTest.showLoading ).toBe(true);
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
    spyTutorialsServiceGetAll.and.returnValue( throwError("foo bar baz") );
    fixture.detectChanges();

    expect( spyTutorialsServiceGetAll.calls.count() ).toBe(1);
    expect( subjectUnderTest.errorMessage ).toEqual("foo bar baz");
    expect( subjectUnderTest.showLoading ).toBe(false);
    expect( spyChangeDetectorRefMarkForCheck ).toHaveBeenCalled();
  });


  it('ngOnDestroy should unsubscribe', () => {
    spyTutorialsServiceGetAll.and.returnValue( {
      subscribe: () => {
        return {
          unsubscribe: () => { return "bar"}
        };
      }
    });
    fixture.detectChanges();

    // subjectUnderTest.subs is private,
    // however i want to ensure that unsubscribe is called
    spyOn((subjectUnderTest as any).subs, 'unsubscribe');

    subjectUnderTest.ngOnDestroy();

    expect( (subjectUnderTest as any).subs.unsubscribe ).toHaveBeenCalled();
  });
});
