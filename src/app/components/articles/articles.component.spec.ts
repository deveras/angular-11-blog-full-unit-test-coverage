import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticlesComponent } from './articles.component';
import { Title } from '@angular/platform-browser';
import { ArticlesService } from './../../services/articles.service';
import { of } from 'rxjs';


describe('ArticlesComponent', () => {
  const expectedArticles = [ {
    id: 1, title: "foo", recomendationSummary: "baz", body: "foo",
    lastUpdateDate: new Date(), createDate: new Date()
  }];
  const ArticlesServiceStub = {
    getAll: () => of(expectedArticles)
  };
  let fixture: ComponentFixture<ArticlesComponent>;
  let component: ArticlesComponent;
  let titleService:Title;
  let spyTitleServiceSet:jasmine.Spy;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlesComponent ],
      providers: [
        Title,
        { provide: ArticlesService, useValue: ArticlesServiceStub }
      ]
    })
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesComponent);
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
    expect( spyTitleServiceSet ).toHaveBeenCalledWith("Articles");
  });


  it('ngOnInit should collect all books onInit if successfull', () => {
    expect( component.collection ).toEqual(expectedArticles);
  });

});
