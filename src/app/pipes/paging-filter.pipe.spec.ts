import { PagingFilterPipe } from './paging-filter.pipe';
import { ArticleModel } from '../models/article-model';
import { BookModel } from '../models/book-model';
import { TutorialModel } from '../models/tutorial-model';


describe('PagingFilterPipe', () => {
  let subjectUnderTest: PagingFilterPipe;


  beforeEach(() => {
    subjectUnderTest = new PagingFilterPipe();
  });


  it('create an instance', () => {
    expect( subjectUnderTest ).toBeTruthy();
  });


  it('transform should return null', () => {
    expect( subjectUnderTest.transform(null, 1, 1) ).toBe(null);
  });


  it('transform should return a subset of the passed in collection', () => {
    const mockArticleModel1: ArticleModel = new ArticleModel(
      1, 'foo', 'bar', 'baz', new Date(), new Date()
    );
    const mockBookModel1: BookModel = new BookModel(
      2, 'foo', 'bar', 'baz', 'fooFoo', 'fooBar', 'fooBaz', 'barFoo', true, 1, new Date(), new Date()
    );
    const mockTutorialModel1: TutorialModel = new TutorialModel(
      3, 'foo', 'bar', 'baz', new Date(), new Date()
    );
    const mockCollection = [ mockArticleModel1, mockBookModel1, mockTutorialModel1 ];

    expect( subjectUnderTest.transform(mockCollection, 0, 1) ).toEqual( [ mockArticleModel1 ] );
    expect( subjectUnderTest.transform(mockCollection, 1, 1) ).toEqual( [ mockBookModel1 ] );
    expect( subjectUnderTest.transform(mockCollection, 2, 1) ).toEqual( [ mockTutorialModel1 ] );
    expect( subjectUnderTest.transform(mockCollection, 0, 2) ).toEqual( [ mockArticleModel1, mockBookModel1 ] );
    expect( subjectUnderTest.transform(mockCollection, 1, 2) ).toEqual( [ mockTutorialModel1 ] );
    expect( subjectUnderTest.transform(mockCollection, 100, 200) ).toEqual( [] );
  });

});
