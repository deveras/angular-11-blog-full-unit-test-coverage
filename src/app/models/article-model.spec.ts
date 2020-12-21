import { ArticleModel, ApiArticleInterface, ArticleAdapter } from './article-model';


describe('ArticleModel', () => {
  let subjectUnderTest: ArticleModel;
  const dateInstance = new Date();


  beforeEach( () => {
    subjectUnderTest = new ArticleModel();
    subjectUnderTest.lastUpdateDate = dateInstance;
    subjectUnderTest.createDate = dateInstance;
  });


  it('should create an instance', () => {
    expect( subjectUnderTest ).toBeTruthy();
  });


  it('should have exactly 6 properties', () => {
    expect( Object.getOwnPropertyNames(subjectUnderTest).length ).toBe(6);
  });


  it('should have defined the following properties and types', () => {
    expect( subjectUnderTest.id ).toBeDefined();
    expect( subjectUnderTest.id ).toBeInstanceOf(Number);
    expect( subjectUnderTest.title ).toBeDefined();
    expect( subjectUnderTest.title ).toBeInstanceOf(String);
    expect( subjectUnderTest.recomendationSummary ).toBeDefined();
    expect( subjectUnderTest.recomendationSummary ).toBeInstanceOf(String);
    expect( subjectUnderTest.body ).toBeDefined();
    expect( subjectUnderTest.body ).toBeInstanceOf(String);
    expect( subjectUnderTest.lastUpdateDate ).toBeDefined();
    expect( subjectUnderTest.lastUpdateDate ).toBeInstanceOf(Date);
    expect( subjectUnderTest.createDate ).toBeDefined();
    expect( subjectUnderTest.createDate ).toBeInstanceOf(Date);
  });


  it('should have the following properties defaults', () => {
    expect( subjectUnderTest.id ).toBe(0);
    expect( subjectUnderTest.title ).toBe('');
    expect( subjectUnderTest.recomendationSummary ).toBe('');
    expect( subjectUnderTest.body ).toBe('');
    expect( subjectUnderTest.lastUpdateDate ).toEqual(dateInstance);
    expect( subjectUnderTest.createDate ).toEqual(dateInstance);
  });


  it('should allow public update of all its properties values', () => {
    subjectUnderTest.id = 100;
    subjectUnderTest.title = 'foo';
    subjectUnderTest.recomendationSummary = 'bar';
    subjectUnderTest.body = 'foobaz';
    subjectUnderTest.lastUpdateDate = dateInstance;
    subjectUnderTest.createDate = dateInstance;

    expect( subjectUnderTest.id ).toBe(100);
    expect( subjectUnderTest.title ).toBe('foo');
    expect( subjectUnderTest.recomendationSummary ).toBe('bar');
    expect( subjectUnderTest.body ).toBe('foobaz');
    expect( subjectUnderTest.lastUpdateDate ).toEqual(dateInstance);
    expect( subjectUnderTest.createDate ).toEqual(dateInstance);
  });

});


describe('ArticleAdapter', () => {
  let subjectUnderTest: ArticleAdapter;
  const dateInstance = new Date();


  beforeEach( () => {
    subjectUnderTest = new ArticleAdapter();
  });


  it('should create an instance', () => {
    expect( subjectUnderTest ).toBeTruthy();
  });


  it('should have an adapt method', () => {
    expect( subjectUnderTest.adapt ).toBeDefined();
    expect( typeof subjectUnderTest.adapt ).toBe('function');
  });


  it('adapt should return a ArticleModel instance', () => {
    const mockDateString = new Date('1977-11-19 03:00:00');
    const mockResponse: ApiArticleInterface = {
      id: 100,
      title: 'foo',
      recomendationSummary: 'bar',
      body: 'baz',
      lastUpdate: mockDateString,
      createDate: mockDateString,
    };

    const articleModel: ArticleModel = subjectUnderTest.adapt(mockResponse);

    expect( articleModel.id ).toBe(100);
    expect( articleModel.title ).toBe('foo');
    expect( articleModel.recomendationSummary ).toBe('bar');
    expect( articleModel.body ).toBe('baz');
    expect( articleModel.lastUpdateDate ).toEqual(new Date(mockDateString));
    expect( articleModel.createDate ).toEqual(new Date(mockDateString));
  });

});
