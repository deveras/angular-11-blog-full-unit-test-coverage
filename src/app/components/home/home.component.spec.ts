import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomeComponent } from './home.component';
import { ArticlesService } from '../../services/articles.service';
import { BookshelfService } from '../../services/bookshelf.service';
import { TutorialsService } from '../../services/tutorials.service';
import { ArticleModel } from '../../models/article-model';
import { BookModel } from '../../models/book-model';
import { TutorialModel } from '../../models/tutorial-model';
import { of, throwError } from 'rxjs';
import { SlugPipe } from '../../pipes/slug.pipe';


describe('HomeComponent', () => {
  const expectedArticles = [ {
    id: 1, title: 'foo', recomendationSummary: 'baz', body: 'foo',
    lastUpdateDate: new Date(2018, 11, 19), createDate: new Date(2018, 11, 19)
  }];
  const expectedBooks = [ {
    id: 1, title: 'foo', recomendationSummary: 'baz', author: 'foo',
    authorLink: 'bar', image: 'baz', body: 'foo', bookLink: 'bar',
    featured: false, weight: 1, lastUpdateDate: new Date(2019, 11, 19),
    createDate: new Date(2019, 11, 19)
  }];
  const expectedTutorials = [ {
    id: 1, title: 'foo', recomendationSummary: 'baz', body: 'foo',
    lastUpdateDate: new Date(2020, 11, 19), createDate: new Date(2020, 11, 19)
  }];
  let subjectUnderTest: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let articlesService: ArticlesService;
  let spyArticlesServiceGetAll: jasmine.Spy;
  let bookshelfService: BookshelfService;
  let spyBookshelfServiceGetAll: jasmine.Spy;
  let tutorialsService: TutorialsService;
  let spyTutorialsServiceGetAll: jasmine.Spy;
  let spyChangeDetectorRefMarkForCheck: jasmine.Spy;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent, SlugPipe ],
      providers: [
        ArticlesService,
        BookshelfService,
        TutorialsService
      ],
      imports: [
        HttpClientTestingModule,
        RouterModule.forRoot([], { relativeLinkResolution: 'legacy' })
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    });

    fixture = TestBed.createComponent(HomeComponent);
    subjectUnderTest = fixture.componentInstance;

    articlesService = TestBed.inject(ArticlesService);
    spyArticlesServiceGetAll = spyOn(articlesService, 'getAll');
    bookshelfService = TestBed.inject(BookshelfService);
    spyBookshelfServiceGetAll = spyOn(bookshelfService, 'getAll');
    tutorialsService = TestBed.inject(TutorialsService);
    spyTutorialsServiceGetAll = spyOn(tutorialsService, 'getAll');

    // tslint:disable: no-any
    spyChangeDetectorRefMarkForCheck = spyOn((subjectUnderTest as any).changeDetectorRef, 'markForCheck');
  });


  it('should create the component', () => {
    expect( subjectUnderTest ).toBeTruthy();
  });


  it('should have 3 public properties', () => {
    expect( subjectUnderTest.collection ).toBeDefined();
    expect( subjectUnderTest.collection ).toEqual([]);
    expect( subjectUnderTest.errorMessage ).toBeDefined();
    expect( subjectUnderTest.errorMessage ).toBe('');
    expect( subjectUnderTest.showLoading ).toBeDefined();
    expect( subjectUnderTest.showLoading ).toBe(true);
  });


  it('should have the following public methods', () => {
    expect( subjectUnderTest.ngOnInit ).toEqual(jasmine.any(Function));
    expect( subjectUnderTest.ngOnDestroy ).toEqual(jasmine.any(Function));
  });


  it('ngOnInit should collect all collections', () => {
    spyArticlesServiceGetAll.and.returnValue( of(expectedArticles) );
    spyBookshelfServiceGetAll.and.returnValue( of(expectedBooks) );
    spyTutorialsServiceGetAll.and.returnValue( of(expectedTutorials) );
    fixture.detectChanges();

    expect( spyArticlesServiceGetAll.calls.count() ).toBe(1);
    expect( spyBookshelfServiceGetAll.calls.count() ).toBe(1);
    expect( spyTutorialsServiceGetAll.calls.count() ).toBe(1);
    expect( subjectUnderTest.collection ).toEqual(
      expectedTutorials.concat(expectedBooks, expectedArticles), 'Ordered by lastUpdateDate' );
    expect( subjectUnderTest.showLoading ).toBe(false);
    expect( spyChangeDetectorRefMarkForCheck ).toHaveBeenCalled();
  });


  it('ngOnInit should collect 2 collections and 1 error', () => {
    spyArticlesServiceGetAll.and.returnValue( of(expectedArticles) );
    spyBookshelfServiceGetAll.and.returnValue( throwError('bar baz foo') );
    spyTutorialsServiceGetAll.and.returnValue( of(expectedTutorials) );
    fixture.detectChanges();

    expect( spyArticlesServiceGetAll.calls.count() ).toBe(1);
    expect( spyBookshelfServiceGetAll.calls.count() ).toBe(1);
    expect( spyTutorialsServiceGetAll.calls.count() ).toBe(1);
    expect( subjectUnderTest.collection ).toEqual(
      expectedTutorials.concat(expectedArticles), 'Ordered by lastUpdateDate' );
    expect( subjectUnderTest.showLoading ).toBe(false);
    expect( spyChangeDetectorRefMarkForCheck ).toHaveBeenCalled();
    expect( subjectUnderTest.errorMessage ).toBe('');
  });


  it('ngOnInit should collect 1 collections and 2 errors', () => {
    spyArticlesServiceGetAll.and.returnValue( throwError('foo bar baz') );
    spyBookshelfServiceGetAll.and.returnValue( of(expectedBooks) );
    spyTutorialsServiceGetAll.and.returnValue( throwError('baz foo bar') );
    fixture.detectChanges();

    expect( spyArticlesServiceGetAll.calls.count() ).toBe(1);
    expect( spyBookshelfServiceGetAll.calls.count() ).toBe(1);
    expect( spyTutorialsServiceGetAll.calls.count() ).toBe(1);
    expect( subjectUnderTest.collection ).toEqual(expectedBooks);
    expect( subjectUnderTest.showLoading ).toBe(false);
    expect( spyChangeDetectorRefMarkForCheck ).toHaveBeenCalled();
    expect( subjectUnderTest.errorMessage ).toBe('');
  });


  it('ngOnInit should populate the errorMessage when getting all collections fails', () => {
    spyArticlesServiceGetAll.and.returnValue( throwError('foo bar baz') );
    spyBookshelfServiceGetAll.and.returnValue( throwError('bar baz foo') );
    spyTutorialsServiceGetAll.and.returnValue( throwError('baz foo bar') );
    fixture.detectChanges();

    expect( spyArticlesServiceGetAll.calls.count() ).toBe(1);
    expect( spyBookshelfServiceGetAll.calls.count() ).toBe(1);
    expect( spyTutorialsServiceGetAll.calls.count() ).toBe(1);
    expect( subjectUnderTest.errorMessage ).toEqual('Cannot connect to the server');
    expect( subjectUnderTest.showLoading ).toBe(false);
    expect( spyChangeDetectorRefMarkForCheck ).toHaveBeenCalled();
  });


  it('ngOnDestroy should unsubscribe all 3 subscriptions', () => {
    spyArticlesServiceGetAll.and.returnValue( {
      subscribe: () => ({ unsubscribe: () => 'bar' })
    });
    spyBookshelfServiceGetAll.and.returnValue( {
      subscribe: () => ({ unsubscribe: () => 'bar' })
    });
    spyTutorialsServiceGetAll.and.returnValue( {
      subscribe: () => ({ unsubscribe: () => 'bar' })
    });
    fixture.detectChanges();

    // subjectUnderTest.subs is private,
    // however i want to ensure that unsubscribe is called
    // tslint:disable: no-any
    spyOn((subjectUnderTest as any).articlesServiceSubscription, 'unsubscribe');
    // tslint:disable: no-any
    spyOn((subjectUnderTest as any).bookshelfServiceSubscription, 'unsubscribe');
    // tslint:disable: no-any
    spyOn((subjectUnderTest as any).tutorialsServiceSubscription, 'unsubscribe');

    subjectUnderTest.ngOnDestroy();

    // tslint:disable: no-any
    expect( (subjectUnderTest as any).articlesServiceSubscription.unsubscribe ).toHaveBeenCalled();
    // tslint:disable: no-any
    expect( (subjectUnderTest as any).bookshelfServiceSubscription.unsubscribe ).toHaveBeenCalled();
    // tslint:disable: no-any
    expect( (subjectUnderTest as any).tutorialsServiceSubscription.unsubscribe ).toHaveBeenCalled();
  });


  it('prepareLink should return /articles if argument item is ArticleModel', () => {
    expect ( subjectUnderTest.prepareLink(new ArticleModel()) ).toBe('/articles');
  });


  it('prepareLink should return /bookshelf if argument item is BookModel', () => {
    expect ( subjectUnderTest.prepareLink(new BookModel()) ).toBe('/bookshelf');
  });


  it('prepareLink should return /tutorials if argument item is TutorialModel', () => {
    expect ( subjectUnderTest.prepareLink(new TutorialModel()) ).toBe('/tutorials');
  });


  it('trackByCollectionId should return the current index', () => {
    spyArticlesServiceGetAll.and.returnValue( of(expectedArticles) );
    spyBookshelfServiceGetAll.and.returnValue( of(expectedBooks) );
    spyTutorialsServiceGetAll.and.returnValue( of(expectedTutorials) );
    fixture.detectChanges();

    expect( subjectUnderTest.trackByCollectionId(1, subjectUnderTest.collection[0]) ).toBe(1);
    expect( subjectUnderTest.trackByCollectionId(2, subjectUnderTest.collection[1]) ).toBe(2);
    expect( subjectUnderTest.trackByCollectionId(3, subjectUnderTest.collection[2]) ).toBe(3);
  });

});
