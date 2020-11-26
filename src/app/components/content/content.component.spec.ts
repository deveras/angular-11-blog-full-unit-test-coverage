import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule }  from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController }
  from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { ContentComponent } from './content.component';
import { ArticlesService } from './../../services/articles.service';
import { BookshelfService } from './../../services/bookshelf.service';
import { TutorialsService } from './../../services/tutorials.service';



describe('ContentComponent', () => {
  const expectedArticle =  {
    id: 1, title: "foo", recomendationSummary: "baz", body: "foo",
    lastUpdateDate: new Date(), createDate: new Date()
  };
  const expectedBook =  {
    id: 1, title: "foo", recomendationSummary: "baz", author: "foo",
    authorLink: "bar", image: "baz", body: "foo", bookLink: "bar",
    featured: false, weight: 1, lastUpdateDate: new Date(),
    createDate: new Date()
  };
  const expectedTutorial =  {
    id: 1, title: "foo", recomendationSummary: "baz", body: "foo",
    lastUpdateDate: new Date(), createDate: new Date()
  };
  let subjectUnderTest:ContentComponent;
  let fixture:ComponentFixture<ContentComponent>;
  let titleService:Title;
  let spyTitleServiceSet:jasmine.Spy;
  let articlesService:ArticlesService;
  let spyArticlesService:jasmine.Spy;
  let bookshelfService:BookshelfService;
  let spyBookshelfService:jasmine.Spy;
  let tutorialsService:TutorialsService;
  let spyTutorialsService:jasmine.Spy;
  let spyChangeDetectorRefMarkForCheck:jasmine.Spy;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        Title,
        BookshelfService,
        TutorialsService,
        ArticlesService,
        { provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                title: "Bookshelf"
              },
              params: {
                id: 1
              }
            }
          }
        }
      ]
    });
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(ContentComponent);
    subjectUnderTest = fixture.componentInstance;

    titleService = TestBed.inject(Title);
    spyTitleServiceSet = spyOn(titleService, "setTitle");

    articlesService = TestBed.inject(ArticlesService);
    spyArticlesService = spyOn(articlesService, "getById");

    bookshelfService = TestBed.inject(BookshelfService);
    spyBookshelfService = spyOn(bookshelfService, "getById");

    tutorialsService = TestBed.inject(TutorialsService);
    spyTutorialsService = spyOn(tutorialsService, "getById");

    // subjectUnderTest.changeDetectorRef is private,
    // however i want to ensure that markForCheck is called
    spyChangeDetectorRefMarkForCheck = spyOn((subjectUnderTest as any).changeDetectorRef, "markForCheck");
  });


  it('should create the component', () => {
    expect( subjectUnderTest ).toBeTruthy();
  });


  it('should have 4 public properties', () => {
    expect( subjectUnderTest.errorMessage ).toBeDefined();
    expect( subjectUnderTest.errorMessage ).toBe("");
    expect( subjectUnderTest.section ).toBeDefined();
    expect( subjectUnderTest.content ).toBeDefined();
    expect( subjectUnderTest.showLoading ).toBeDefined();
    expect( subjectUnderTest.showLoading ).toBe(true);
  });


  it('ngOnInit should collect all articles onInit if successfull', () => {
    (subjectUnderTest as any).route.snapshot.data.title = "Articles";
    spyArticlesService.and.returnValue( of(expectedArticle) );
    fixture.detectChanges();

    expect( spyArticlesService.calls.count() ).toBe(1);
    expect( spyTitleServiceSet.calls.count() ).toBe(1);
    expect( spyTitleServiceSet ).toHaveBeenCalledWith("foo");
    expect( subjectUnderTest.content ).toEqual(expectedArticle);
    expect( subjectUnderTest.showLoading ).toBe(false);
    expect( spyChangeDetectorRefMarkForCheck ).toHaveBeenCalled();
  });


  it('ngOnInit should collect all books onInit if successfull', () => {
    spyBookshelfService.and.returnValue( of(expectedBook) );
    fixture.detectChanges();

    expect( spyBookshelfService.calls.count() ).toBe(1);
    expect( spyTitleServiceSet.calls.count() ).toBe(1);
    expect( spyTitleServiceSet ).toHaveBeenCalledWith("foo");
    expect( subjectUnderTest.content ).toEqual(expectedBook);
    expect( subjectUnderTest.showLoading ).toBe(false);
    expect( spyChangeDetectorRefMarkForCheck ).toHaveBeenCalled();
  });


  it('ngOnInit should collect all tutorials onInit if successfull', () => {
    (subjectUnderTest as any).route.snapshot.data.title = "Tutorials";
    spyTutorialsService.and.returnValue( of(expectedTutorial) );
    fixture.detectChanges();

    expect( spyTutorialsService.calls.count() ).toBe(1);
    expect( spyTitleServiceSet.calls.count() ).toBe(1);
    expect( spyTitleServiceSet ).toHaveBeenCalledWith("foo");
    expect( subjectUnderTest.content ).toEqual(expectedTutorial);
    expect( subjectUnderTest.showLoading ).toBe(false);
    expect( spyChangeDetectorRefMarkForCheck ).toHaveBeenCalled();
  });


  it('ngOnInit should populate the errorMessage when getting books fails', () => {
    spyBookshelfService.and.returnValue( throwError("foo bar baz") );
    fixture.detectChanges();

    expect( spyBookshelfService.calls.count() ).toBe(1);
    expect( subjectUnderTest.errorMessage ).toEqual("foo bar baz");
    expect( subjectUnderTest.showLoading ).toBe(false);
    expect( spyChangeDetectorRefMarkForCheck ).toHaveBeenCalled();;
  });


  it('ngOnDestroy should unsubscribe', () => {
    spyBookshelfService.and.returnValue( {
      subscribe: () => {
        return {
          unsubscribe: () => { return "bar"}
        };
      }
    });
    fixture.detectChanges();

    // subjectUnderTest.serviceSubscription is private,
    // however i want to ensure that unsubscribe is called
    spyOn((subjectUnderTest as any).serviceSubscription, 'unsubscribe');

    subjectUnderTest.ngOnDestroy();

    expect( (subjectUnderTest as any).serviceSubscription.unsubscribe ).toHaveBeenCalled();
  });
});
