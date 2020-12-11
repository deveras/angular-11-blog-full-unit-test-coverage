import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef, Renderer2, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { ContentComponent } from './content.component';
import { ArticlesService } from './../../services/articles.service';
import { BookshelfService } from './../../services/bookshelf.service';
import { TutorialsService } from './../../services/tutorials.service';
import { ArticleModel } from '../../models/article-model';
import { BookModel } from '../../models/book-model';
import { TutorialModel } from '../../models/tutorial-model';


describe('ContentComponent', () => {
  const mockDate = new Date();
  let subjectUnderTest: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;
  let titleService: Title;
  let renderer: Renderer2;
  let spyTitleServiceSet: jasmine.Spy;
  let spyRendererAppendChild: jasmine.Spy;
  let spyRendererCreateText: jasmine.Spy;
  let spyRendererCreateElement: jasmine.Spy;
  let spyRendererAttribute: jasmine.Spy;
  let articlesService: ArticlesService;
  let spyArticlesService: jasmine.Spy;
  let bookshelfService: BookshelfService;
  let spyBookshelfService: jasmine.Spy;
  let tutorialsService: TutorialsService;
  let spyTutorialsService: jasmine.Spy;
  let spyChangeDetectorRefDetectChanges: jasmine.Spy;
  let spyChangeDetectorRefMarkForCheck: jasmine.Spy;


  beforeEach(async () => {
    jasmine.clock().install();
    jasmine.clock().mockDate( new Date(2020, 11, 19) );

    await TestBed.configureTestingModule({
      declarations: [ ContentComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        ChangeDetectorRef,
        Title,
        Renderer2,
        BookshelfService,
        TutorialsService,
        ArticlesService,
        { provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                title: 'Bookshelf'
              },
              params: {
                id: 1
              }
            }
          }
        }
      ]
    });

    fixture = TestBed.createComponent(ContentComponent);
    subjectUnderTest = fixture.componentInstance;

    titleService = TestBed.inject(Title);
    spyTitleServiceSet = spyOn(titleService, 'setTitle');

    renderer = fixture.componentRef.injector.get(Renderer2);
    // Need to allow the object to do its job: callThrough()
    spyRendererAppendChild = spyOn(renderer, 'appendChild').and.callThrough();
    spyRendererCreateText = spyOn(renderer, 'createText').and.callThrough();
    spyRendererCreateElement = spyOn(renderer, 'createElement').and.callThrough();
    spyRendererAttribute = spyOn(renderer, 'setAttribute').and.callThrough();

    articlesService = TestBed.inject(ArticlesService);
    spyArticlesService = spyOn(articlesService, 'getById');

    bookshelfService = TestBed.inject(BookshelfService);
    spyBookshelfService = spyOn(bookshelfService, 'getById');

    tutorialsService = TestBed.inject(TutorialsService);
    spyTutorialsService = spyOn(tutorialsService, 'getById');

    // subjectUnderTest.changeDetectorRef is private,
    // however i want to ensure that markForCheck is called
    // tslint:disable: no-any
    spyChangeDetectorRefMarkForCheck = spyOn((subjectUnderTest as any).changeDetectorRef, 'markForCheck');
    // tslint:disable: no-any
    spyChangeDetectorRefDetectChanges = spyOn((subjectUnderTest as any).changeDetectorRef, 'detectChanges');
  });


  afterEach(() => {
    jasmine.clock().uninstall();
  });


  it('should create the component', () => {
    expect( subjectUnderTest ).toBeTruthy();
  });


  it('should have 5 public properties', () => {
    expect( subjectUnderTest.errorMessage ).toBeDefined();
    expect( subjectUnderTest.errorMessage ).toBe('');
    expect( subjectUnderTest.section ).toBeDefined();
    expect( subjectUnderTest.section ).toBe('');
    expect( subjectUnderTest.content ).toBeDefined();
    expect( subjectUnderTest.content ).toEqual(new ArticleModel());
    expect( subjectUnderTest.showLoading ).toBeDefined();
    expect( subjectUnderTest.showLoading ).toBe(true);
    expect( subjectUnderTest.contentBodyElement ).toBeDefined();
    expect( subjectUnderTest.contentBodyElement ).toBeInstanceOf(ElementRef);
    expect( subjectUnderTest.contentBodyElement.nativeElement ).toBe(null);
  });


  it('should have the following public methods', () => {
    expect( subjectUnderTest.ngOnInit ).toEqual(jasmine.any(Function));
    expect( subjectUnderTest.ngOnDestroy ).toEqual(jasmine.any(Function));
  });


  it('ngOnInit should collect all articles onInit if successfull', () => {
    const expectedArticle = {
      id: 1, title: 'foo', recomendationSummary: 'baz',
      body: '[ { "type": "t", "tag": "p", "content": "foo", "classes": "foo, bar", "attributes": [ { "name": "title", "value": "foo" } ] } ]',
      lastUpdateDate: new Date(), createDate: new Date()
    };
    // tslint:disable: no-any
    (subjectUnderTest as any).route.snapshot.data.title = 'Articles';
    spyArticlesService.and.returnValue( of(expectedArticle) );
    subjectUnderTest.contentBodyElement.nativeElement = jasmine.createSpyObj('nativeElement', ['appendChild']);
    fixture.detectChanges();

    expect( spyArticlesService.calls.count() ).toBe(1);
    expect( spyTitleServiceSet.calls.count() ).toBe(1);
    expect( spyTitleServiceSet ).toHaveBeenCalledWith('foo');
    expect( subjectUnderTest.content ).toEqual(expectedArticle);
    expect( subjectUnderTest.showLoading ).toBe(false);
    expect( spyChangeDetectorRefDetectChanges.calls.count() ).toBe(1);
    expect( spyRendererAppendChild.calls.count() ).toBe(4); // +2
    expect( spyRendererCreateElement.calls.count() ).toBe(4); // +2
    expect( spyRendererCreateText.calls.count() ).toBe(1);
    expect( spyRendererAttribute.calls.count() ).toBe(2);
    expect( spyChangeDetectorRefMarkForCheck.calls.count() ).toBe(1);
  });


  it('ngOnInit should collect all books onInit if successfull', () => {
    const expectedBook = {
      id: 1, title: 'foo', recomendationSummary: 'baz', author: 'foo',
      authorLink: 'bar', image: 'baz',
      body: '[ { "type": "t", "tag": "p", "children": [ { "type": "t", "tag": "br", "content": "foo" } ] } ]',
      bookLink: 'bar', featured: false, weight: 1, lastUpdateDate: new Date(),
      createDate: new Date()
    };
    spyBookshelfService.and.returnValue( of(expectedBook) );
    subjectUnderTest.contentBodyElement.nativeElement = jasmine.createSpyObj('nativeElement', ['appendChild']);
    fixture.detectChanges();

    expect( spyBookshelfService.calls.count() ).toBe(1);
    expect( spyTitleServiceSet.calls.count() ).toBe(1);
    expect( spyTitleServiceSet ).toHaveBeenCalledWith('foo');
    expect( subjectUnderTest.content ).toEqual(expectedBook);
    expect( subjectUnderTest.showLoading ).toBe(false);
    expect( spyChangeDetectorRefDetectChanges.calls.count() ).toBe(1);
    expect( spyRendererAppendChild.calls.count() ).toBe(5); // +2
    expect( spyRendererCreateElement.calls.count() ).toBe(5); // +2
    expect( spyRendererCreateText.calls.count() ).toBe(1);
    expect( spyRendererAttribute ).not.toHaveBeenCalled();
    expect( spyChangeDetectorRefMarkForCheck.calls.count() ).toBe(1);
  });


  it('ngOnInit should collect all tutorials onInit if successfull', () => {
    const expectedTutorial = {
      id: 1, title: 'foo', recomendationSummary: 'baz',
      body: '[ { "type": "t", "tag": "p", "children": [ { "type": "c", "content": "baz" }]  } ]',
      lastUpdateDate: new Date(), createDate: new Date()
    };
    // tslint:disable: no-any
    (subjectUnderTest as any).route.snapshot.data.title = 'Tutorials';
    spyTutorialsService.and.returnValue( of(expectedTutorial) );
    subjectUnderTest.contentBodyElement.nativeElement = jasmine.createSpyObj('nativeElement', ['appendChild']);
    fixture.detectChanges();

    expect( spyTutorialsService.calls.count() ).toBe(1);
    expect( spyTitleServiceSet.calls.count() ).toBe(1);
    expect( spyTitleServiceSet ).toHaveBeenCalledWith('foo');
    expect( subjectUnderTest.content ).toEqual(expectedTutorial);
    expect( subjectUnderTest.showLoading ).toBe(false);
    expect( spyChangeDetectorRefDetectChanges.calls.count() ).toBe(1);
    expect( spyRendererAppendChild.calls.count() ).toBe(4); // +2
    expect( spyRendererCreateElement.calls.count() ).toBe(4); // +2
    expect( spyRendererCreateText.calls.count() ).toBe(1);
    expect( spyRendererAttribute ).not.toHaveBeenCalled();
    expect( spyChangeDetectorRefMarkForCheck.calls.count() ).toBe(1);
  });


  it('ngOnInit should skip script tags', () => {
    const expectedArticleWithScript =  {
      id: 1, title: 'foo', recomendationSummary: 'baz',
      body: '[ { "type": "t", "tag": "script", "content": "evil" } ]',
      lastUpdateDate: new Date(), createDate: new Date()
    };
    // tslint:disable: no-any
    (subjectUnderTest as any).route.snapshot.data.title = 'Articles';
    spyArticlesService.and.returnValue( of(expectedArticleWithScript) );
    subjectUnderTest.contentBodyElement.nativeElement = jasmine.createSpyObj('nativeElement', ['appendChild']);
    fixture.detectChanges();

    expect( spyArticlesService.calls.count() ).toBe(1);
    expect( spyTitleServiceSet.calls.count() ).toBe(1);
    expect( spyTitleServiceSet ).toHaveBeenCalledWith('foo');
    expect( subjectUnderTest.content ).toEqual(expectedArticleWithScript);
    expect( subjectUnderTest.showLoading ).toBe(false);
    expect( spyChangeDetectorRefMarkForCheck ).toHaveBeenCalled();
  });

  it('ngOnInit should populate the errorMessage when getting books fails', () => {
    spyBookshelfService.and.returnValue( throwError('foo bar baz') );
    fixture.detectChanges();

    expect( spyBookshelfService.calls.count() ).toBe(1);
    expect( subjectUnderTest.errorMessage ).toEqual('foo bar baz');
    expect( subjectUnderTest.showLoading ).toBe(false);
    expect( spyChangeDetectorRefMarkForCheck ).toHaveBeenCalled();
  });


  it('ngOnDestroy should unsubscribe', () => {
    spyBookshelfService.and.returnValue( {
      subscribe: () => {
        return {
          unsubscribe: () => 'bar'
        };
      }
    });
    fixture.detectChanges();

    // subjectUnderTest.serviceSubscription is private,
    // however i want to ensure that unsubscribe is called
    // tslint:disable: no-any
    spyOn((subjectUnderTest as any).serviceSubscription, 'unsubscribe');

    subjectUnderTest.ngOnDestroy();

    // tslint:disable: no-any
    expect( (subjectUnderTest as any).serviceSubscription.unsubscribe ).toHaveBeenCalled();
  });
});
