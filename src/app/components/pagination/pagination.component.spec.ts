import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { PaginationComponent, PageModel } from './pagination.component';
import { ArticleModel } from '../../models/article-model';
import { BookModel } from '../../models/book-model';
import { TutorialModel } from '../../models/tutorial-model';


describe('PaginationComponent', () => {
  let subjectUnderTest: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  const routerStub = {
    navigate: jasmine.createSpy('navigate'),
    url: '/foo/1'
  };
  const mockArticleModel1: ArticleModel = new ArticleModel(1, 'foo', 'bar', 'baz', new Date(), new Date());
  const mockArticleModel2: ArticleModel = new ArticleModel(2, 'foo', 'bar', 'baz', new Date(), new Date());
  const mockArticleModel3: ArticleModel = new ArticleModel(3, 'foo', 'bar', 'baz', new Date(), new Date());
  const mockArticleModel4: ArticleModel = new ArticleModel(4, 'foo', 'bar', 'baz', new Date(), new Date());
  const mockBookModel1: BookModel = new BookModel(
    1, 'foo', 'bar', 'baz', 'fooFoo', 'fooBar', 'fooBaz', 'barFoo', true, 1, new Date(), new Date()
  );
  const mockBookModel2: BookModel = new BookModel(
    2, 'foo', 'bar', 'baz', 'fooFoo', 'fooBar', 'fooBaz', 'barFoo', true, 1, new Date(), new Date()
  );
  const mockBookModel3: BookModel = new BookModel(
    3, 'foo', 'bar', 'baz', 'fooFoo', 'fooBar', 'fooBaz', 'barFoo', true, 1, new Date(), new Date()
  );
  const mockBookModel4: BookModel = new BookModel(
    4, 'foo', 'bar', 'baz', 'fooFoo', 'fooBar', 'fooBaz', 'barFoo', true, 1, new Date(), new Date()
  );
  const mockTutorialModel1: TutorialModel = new TutorialModel(1, 'foo', 'bar', 'baz', new Date(), new Date());
  const mockTutorialModel2: TutorialModel = new TutorialModel(2, 'foo', 'bar', 'baz', new Date(), new Date());
  const mockTutorialModel3: TutorialModel = new TutorialModel(3, 'foo', 'bar', 'baz', new Date(), new Date());
  const mockTutorialModel4: TutorialModel = new TutorialModel(4, 'foo', 'bar', 'baz', new Date(), new Date());
  const mockCollection = [
    mockArticleModel1, mockArticleModel2, mockArticleModel3, mockArticleModel4,
    mockBookModel1, mockBookModel2, mockBookModel3, mockBookModel4,
    mockTutorialModel1, mockTutorialModel2, mockTutorialModel3, mockTutorialModel4
  ];


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationComponent ],
      providers: [
        { provide: Router, useValue: routerStub }
      ]
    });

    fixture = TestBed.createComponent(PaginationComponent);
    subjectUnderTest = fixture.componentInstance;

    subjectUnderTest.collection = mockCollection;
    subjectUnderTest.pageSize = 5;
    subjectUnderTest.currentPageIndex = 0;
    subjectUnderTest.collectionType = 'baz';

    fixture.detectChanges();
  });


  it('should create the component', () => {
    expect(subjectUnderTest).toBeTruthy();
  });


  it('should have the following properties', () => {
    const mockPage0 = new PageModel(0);
    const mockPage1 = new PageModel(1);
    const mockPage2 = new PageModel(2);

    expect( subjectUnderTest.collection ).toBeDefined();
    expect( subjectUnderTest.collection ).toEqual(mockCollection);
    expect( subjectUnderTest.pageSize ).toBeDefined();
    expect( subjectUnderTest.pageSize ).toBe(5);
    expect( subjectUnderTest.currentPageIndex ).toBeDefined();
    expect( subjectUnderTest.currentPageIndex ).toBe(0);
    expect( subjectUnderTest.collectionType ).toBeDefined();
    expect( subjectUnderTest.collectionType ).toBe('baz');
    expect( subjectUnderTest.pages ).toBeDefined();
    expect( subjectUnderTest.pages ).toEqual( [ mockPage0, mockPage1, mockPage2 ] );
    expect( subjectUnderTest.firstRecord ).toBeDefined();
    expect( subjectUnderTest.firstRecord ).toBe(1);
    expect( subjectUnderTest.lastRecord ).toBeDefined();
    expect( subjectUnderTest.lastRecord ).toBe(5);
  });


  it('should have a public ngOnInit method', () => {
    expect( subjectUnderTest.ngOnInit ).toEqual(jasmine.any(Function));
  });


  it('should calculate firstRecord and lastRecord accoring to changes in currentPageIndex', () => {
    subjectUnderTest.currentPageIndex = 2;
    subjectUnderTest.ngOnInit();
    expect( subjectUnderTest.firstRecord ).toBe(11);
    expect( subjectUnderTest.lastRecord ).toBe(12);
  });


  it('onPageIndexClicked should navigate to current url fragment passing index', () => {
    subjectUnderTest.onPageIndexClicked(1);

    expect( routerStub.navigate ).toHaveBeenCalledWith(
      [ '/foo', 1 ], { replaceUrl: true } );

    routerStub.navigate.calls.reset();
  });


  it('onPageIndexClicked should NOT navigate if pageIndex is lower than zero', () => {
    subjectUnderTest.onPageIndexClicked(-1);

    expect( routerStub.navigate ).not.toHaveBeenCalled();

    routerStub.navigate.calls.reset();
  });


  it('onPageIndexClicked should NOT navigate if pageIndex is bigger than pages length', () => {
    subjectUnderTest.onPageIndexClicked(3);

    expect( routerStub.navigate ).not.toHaveBeenCalled();

    routerStub.navigate.calls.reset();
  });


  it('trackByPagesId should return the current index', () => {
    fixture.detectChanges();

    expect( subjectUnderTest.trackByPagesId(0, subjectUnderTest.pages[0]) ).toBe(0);
    expect( subjectUnderTest.trackByPagesId(1, subjectUnderTest.pages[1]) ).toBe(1);
    expect( subjectUnderTest.trackByPagesId(2, subjectUnderTest.pages[2]) ).toBe(2);
  });

});
