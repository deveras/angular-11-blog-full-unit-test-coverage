import { BookModel, ApiBookInterface, BookAdapter } from './book-model';


describe('BookModel', () => {
  let subjectUnderTest: BookModel;
  const dateInstance = new Date();


  beforeEach( () => {
    subjectUnderTest = new BookModel();
    subjectUnderTest.lastUpdateDate = dateInstance;
    subjectUnderTest.createDate = dateInstance;
  });


  it('should create an instance', () => {
    expect( subjectUnderTest ).toBeTruthy();
  });


  it('should have exactly 12 properties', () => {
    expect( Object.getOwnPropertyNames(subjectUnderTest).length ).toBe(12);
  });


  it('should have defined the following properties and types', () => {
    expect( subjectUnderTest.id ).toBeDefined();
    expect( subjectUnderTest.id ).toBeInstanceOf(Number);
    expect( subjectUnderTest.title ).toBeDefined();
    expect( subjectUnderTest.title ).toBeInstanceOf(String);
    expect( subjectUnderTest.recomendationSummary ).toBeDefined();
    expect( subjectUnderTest.recomendationSummary ).toBeInstanceOf(String);
    expect( subjectUnderTest.author ).toBeDefined();
    expect( subjectUnderTest.author ).toBeInstanceOf(String);
    expect( subjectUnderTest.authorLink ).toBeDefined();
    expect( subjectUnderTest.authorLink ).toBeInstanceOf(String);
    expect( subjectUnderTest.image ).toBeDefined();
    expect( subjectUnderTest.image ).toBeInstanceOf(String);
    expect( subjectUnderTest.body ).toBeDefined();
    expect( subjectUnderTest.body ).toBeInstanceOf(String);
    expect( subjectUnderTest.bookLink ).toBeDefined();
    expect( subjectUnderTest.bookLink ).toBeInstanceOf(String);
    expect( subjectUnderTest.featured ).toBeDefined();
    expect( subjectUnderTest.featured ).toBeFalsy();
    expect( subjectUnderTest.weight ).toBeDefined();
    expect( subjectUnderTest.weight ).toBeInstanceOf(Number);
    expect( subjectUnderTest.lastUpdateDate ).toBeDefined();
    expect( subjectUnderTest.lastUpdateDate ).toBeInstanceOf(Date);
    expect( subjectUnderTest.createDate ).toBeDefined();
    expect( subjectUnderTest.createDate ).toBeInstanceOf(Date);
  });


  it('should have the following properties defaults', () => {
    expect( subjectUnderTest.id ).toBe(0);
    expect( subjectUnderTest.title ).toBe('');
    expect( subjectUnderTest.recomendationSummary ).toBe('');
    expect( subjectUnderTest.author ).toBe('');
    expect( subjectUnderTest.authorLink ).toBe('');
    expect( subjectUnderTest.image ).toBe('');
    expect( subjectUnderTest.body ).toBe('');
    expect( subjectUnderTest.bookLink ).toBe('');
    expect( subjectUnderTest.featured ).toBe(false);
    expect( subjectUnderTest.weight ).toBe(1);
    expect( subjectUnderTest.lastUpdateDate ).toEqual(dateInstance);
    expect( subjectUnderTest.createDate ).toEqual(dateInstance);
  });


  it('should allow public update of all its properties values', () => {
    subjectUnderTest.id = 100;
    subjectUnderTest.title = 'foo';
    subjectUnderTest.recomendationSummary = 'bar';
    subjectUnderTest.author = 'baz';
    subjectUnderTest.authorLink = 'foofoo';
    subjectUnderTest.image = 'foobar';
    subjectUnderTest.body = 'foobaz';
    subjectUnderTest.bookLink = 'barfoo';
    subjectUnderTest.featured = true;
    subjectUnderTest.weight = 0.5;
    subjectUnderTest.lastUpdateDate = dateInstance;
    subjectUnderTest.createDate = dateInstance;

    expect( subjectUnderTest.id ).toBe(100);
    expect( subjectUnderTest.title ).toBe('foo');
    expect( subjectUnderTest.recomendationSummary ).toBe('bar');
    expect( subjectUnderTest.author ).toBe('baz');
    expect( subjectUnderTest.authorLink ).toBe('foofoo');
    expect( subjectUnderTest.image ).toBe('foobar');
    expect( subjectUnderTest.body ).toBe('foobaz');
    expect( subjectUnderTest.bookLink ).toBe('barfoo');
    expect( subjectUnderTest.featured ).toBe(true);
    expect( subjectUnderTest.weight ).toBe(0.5);
    expect( subjectUnderTest.lastUpdateDate ).toEqual(dateInstance);
    expect( subjectUnderTest.createDate ).toEqual(dateInstance);
  });

});


describe('BookAdapter', () => {
  let subjectUnderTest: BookAdapter;
  const dateInstance = new Date();


  beforeEach( () => {
    subjectUnderTest = new BookAdapter();
  });


  it('should create an instance', () => {
    expect( subjectUnderTest ).toBeTruthy();
  });


  it('should have an adapt method', () => {
    expect( subjectUnderTest.adapt ).toBeDefined();
    expect( typeof subjectUnderTest.adapt ).toBe('function');
  });


  it('adapt should return a BookModel instance', () => {
    const mockDateString = new Date('1977-11-19 03:00:00');
    const mockResponse: ApiBookInterface = {
      id: 100,
      title: 'foo',
      recomendationSummary: 'bar',
      author: 'baz',
      authorLink: 'foofoo',
      image: 'foobar',
      body: 'foobaz',
      bookLink: 'barfoo',
      featured: true,
      weight: 0.5,
      lastUpdate: mockDateString,
      createDate: mockDateString,
    };

    const bookModel: BookModel = subjectUnderTest.adapt(mockResponse);

    expect( bookModel.id ).toBe(100);
    expect( bookModel.title ).toBe('foo');
    expect( bookModel.recomendationSummary ).toBe('bar');
    expect( bookModel.author ).toBe('baz');
    expect( bookModel.authorLink ).toBe('foofoo');
    expect( bookModel.image ).toBe('foobar');
    expect( bookModel.body ).toBe('foobaz');
    expect( bookModel.bookLink ).toBe('barfoo');
    expect( bookModel.featured ).toBe(true);
    expect( bookModel.weight ).toBe(0.5);
    expect( bookModel.lastUpdateDate ).toEqual(new Date(mockDateString));
    expect( bookModel.createDate ).toEqual(new Date(mockDateString));
  });

});
