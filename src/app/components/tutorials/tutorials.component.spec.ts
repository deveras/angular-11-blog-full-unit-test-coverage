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
  let component: TutorialsComponent;
  let tutorialsService:TutorialsService;
  let spyTutorialsServiceGetAll:jasmine.Spy;


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
    component = fixture.componentInstance;

    tutorialsService = TestBed.inject(TutorialsService);
    spyTutorialsServiceGetAll = spyOn(tutorialsService, "getAll");
  });


  it('should create the component', () => {
    expect( component ).toBeTruthy();
  });


  it('should have 3 public properties', () => {
    expect( component.collection ).toBeDefined();
    expect( component.collection ).toEqual([]);
    expect( component.errorMessage ).toBeDefined();
    expect( component.errorMessage ).toBe("");
    expect( component.showLoading ).toBeDefined();
    expect( component.showLoading ).toBe(true);
  });


  it('ngOnInit should collect all books onInit if successfull', () => {
    spyTutorialsServiceGetAll.and.returnValue( of(expectedTutorials) );
    fixture.detectChanges();

    expect( spyTutorialsServiceGetAll.calls.count() ).toBe(1);
    expect( component.collection ).toEqual(expectedTutorials);
    expect( component.showLoading ).toBe(false);
  });


  it('ngOnInit should populate the errorMessage when getting books fails', () => {
    spyTutorialsServiceGetAll.and.returnValue( throwError("foo bar baz") );
    fixture.detectChanges();

    expect( spyTutorialsServiceGetAll.calls.count() ).toBe(1);
    expect( component.errorMessage ).toEqual("foo bar baz");
    expect( component.showLoading ).toBe(false);
  });

});
