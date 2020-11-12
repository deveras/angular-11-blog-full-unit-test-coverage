import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TutorialsComponent } from './tutorials.component';
import { Title } from '@angular/platform-browser';
import { TutorialsService } from './../../services/tutorials.service';
import { of } from 'rxjs';


describe('TutorialsComponent', () => {
  const expectedTutorials = [ {
    id: 1, title: "foo", recomendationSummary: "baz", body: "foo",
    lastUpdateDate: new Date(), createDate: new Date()
  }];
  const TutorialsServiceStub = {
    getAll: () => of(expectedTutorials)
  };
  let fixture: ComponentFixture<TutorialsComponent>;
  let component: TutorialsComponent;
  let titleService:Title;
  let spyTitleServiceSet:jasmine.Spy;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialsComponent ],
      providers: [
        Title,
        { provide: TutorialsService, useValue: TutorialsServiceStub }
      ]
    })
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialsComponent);
    component = fixture.componentInstance;
    titleService = TestBed.inject(Title);
    spyTitleServiceSet = spyOn(titleService, "setTitle");
    fixture.detectChanges();
  });


  it('should create the component', () => {
    expect( component ).toBeTruthy();
  });


  it('should have 1 public property', () => {
    expect( component.collection ).toBeDefined();
  });


  it('ngOnInit should set the page title to Bookshelf', () => {
    expect( spyTitleServiceSet.calls.count() ).toBe(1);
    expect( spyTitleServiceSet ).toHaveBeenCalledWith("Tutorials");
  });


  it('ngOnInit should collect all books onInit if successfull', () => {
    expect( component.collection ).toEqual(expectedTutorials);
  });

});
