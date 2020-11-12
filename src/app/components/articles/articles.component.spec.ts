import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticlesComponent } from './articles.component';
import { Title } from '@angular/platform-browser';
import { ArticlesService } from './../../services/articles.service';
import { HttpClientTestingModule, HttpTestingController }
  from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';


describe('ArticlesComponent', () => {
  const expectedArticles = [ {
    id: 1, title: "foo", recomendationSummary: "baz", body: "foo",
    lastUpdateDate: new Date(), createDate: new Date()
  }];
  let fixture: ComponentFixture<ArticlesComponent>;
  let component: ArticlesComponent;
  let titleService:Title;
  let articlesService:ArticlesService;
  let spyTitleServiceSet:jasmine.Spy;
  let spyArticlesServiceGetAll:jasmine.Spy;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlesComponent ],
      providers: [ Title, ArticlesService ],
      imports: [ HttpClientTestingModule ]
    })
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesComponent);
    component = fixture.componentInstance;

    titleService = TestBed.inject(Title);
    spyTitleServiceSet = spyOn(titleService, "setTitle");

    articlesService = TestBed.inject(ArticlesService);
    spyArticlesServiceGetAll = spyOn(articlesService, "getAll");
  });


  it('should create the component', () => {
    expect( component ).toBeTruthy();
  });


  it('should have 2 public properties', () => {
    expect( component.collection ).toBeDefined();
    expect( component.collection ).toEqual([]);
    expect( component.errorMessage ).toBeDefined();
    expect( component.errorMessage ).toBe("");
  });


  it('ngOnInit should set the page title to Bookshelf', () => {
    spyArticlesServiceGetAll.and.returnValue( of("") );
    fixture.detectChanges();

    expect( spyTitleServiceSet.calls.count() ).toBe(1);
    expect( spyTitleServiceSet ).toHaveBeenCalledWith("Articles");
  });


  it('ngOnInit should collect all books onInit if successfull', () => {
    spyArticlesServiceGetAll.and.returnValue( of(expectedArticles) );
    fixture.detectChanges();

    expect( spyArticlesServiceGetAll.calls.count() ).toBe(1);
    expect( component.collection ).toEqual(expectedArticles);
  });


  it('ngOnInit should populate the errorMessage when getting books fails', () => {
    spyArticlesServiceGetAll.and.returnValue( throwError("foo bar baz") );
    fixture.detectChanges();

    expect( spyArticlesServiceGetAll.calls.count() ).toBe(1);
    expect( component.errorMessage ).toEqual("foo bar baz");
  });

});
