import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TutorialsComponent } from './tutorials.component';
import { Title } from '@angular/platform-browser';
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
  let component: TutorialsComponent;
  let titleService:Title;
  let tutorialsService:TutorialsService;
  let spyTitleServiceSet:jasmine.Spy;
  let spyTutorialsServiceGetAll:jasmine.Spy;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialsComponent ],
      providers: [ Title, TutorialsService ],
      imports: [ HttpClientTestingModule ]
    })
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialsComponent);
    component = fixture.componentInstance;

    titleService = TestBed.inject(Title);
    spyTitleServiceSet = spyOn(titleService, "setTitle");

    tutorialsService = TestBed.inject(TutorialsService);
    spyTutorialsServiceGetAll = spyOn(tutorialsService, "getAll");
  });


  it('should create the component', () => {
    expect( component ).toBeTruthy();
  });


  it('ngOnInit should set the page title to Bookshelf', () => {
    expect( component.collection ).toBeDefined();
    expect( component.collection ).toEqual([]);
    expect( component.errorMessage ).toBeDefined();
    expect( component.errorMessage ).toBe("");
  });


  it('ngOnInit should set the page title to Bookshelf', () => {
    spyTutorialsServiceGetAll.and.returnValue( of("") );
    fixture.detectChanges();

    expect( spyTitleServiceSet.calls.count() ).toBe(1);
    expect( spyTitleServiceSet ).toHaveBeenCalledWith("Tutorials");
  });


  it('ngOnInit should collect all books onInit if successfull', () => {
    spyTutorialsServiceGetAll.and.returnValue( of(expectedTutorials) );
    fixture.detectChanges();

    expect( spyTutorialsServiceGetAll.calls.count() ).toBe(1);
    expect( component.collection ).toEqual(expectedTutorials);
  });


  it('ngOnInit should populate the errorMessage when getting books fails', () => {
    spyTutorialsServiceGetAll.and.returnValue( throwError("foo bar baz") );
    fixture.detectChanges();

    expect( spyTutorialsServiceGetAll.calls.count() ).toBe(1);
    expect( component.errorMessage ).toEqual("foo bar baz");
  });

});
