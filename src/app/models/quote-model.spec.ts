import { QuoteModel, QuoteAdapter } from './quote-model';


describe('QuoteModel', () => {
  let subjectUnderTest: QuoteModel;
  const dateInstance = new Date();


  beforeEach( () => {
    subjectUnderTest = new QuoteModel();
    subjectUnderTest.displayDate = dateInstance;
    subjectUnderTest.lastUpdateDate = dateInstance;
    subjectUnderTest.createDate = dateInstance;
  });


  it('should create an instance', () => {
    expect( subjectUnderTest ).toBeTruthy();
  });


  it('should have exactly 8 properties', () => {
    expect( Object.getOwnPropertyNames(subjectUnderTest).length ).toBe(8);
  });


  it('should have defined the following properties and types', () => {
    expect( subjectUnderTest.id ).toBeDefined();
    expect( subjectUnderTest.id ).toBeInstanceOf(Number);
    expect( subjectUnderTest.quote ).toBeDefined();
    expect( subjectUnderTest.quote ).toBeInstanceOf(String);
    expect( subjectUnderTest.author ).toBeDefined();
    expect( subjectUnderTest.author ).toBeInstanceOf(String);
    expect( subjectUnderTest.authorLink ).toBeDefined();
    expect( subjectUnderTest.authorLink ).toBeInstanceOf(String);
    expect( subjectUnderTest.displayDate ).toBeDefined();
    expect( subjectUnderTest.displayDate ).toBeInstanceOf(Date);
    expect( subjectUnderTest.numVotes ).toBeDefined();
    expect( subjectUnderTest.numVotes ).toBeInstanceOf(Number);
    expect( subjectUnderTest.lastUpdateDate ).toBeDefined();
    expect( subjectUnderTest.lastUpdateDate ).toBeInstanceOf(Date);
    expect( subjectUnderTest.createDate ).toBeDefined();
    expect( subjectUnderTest.createDate ).toBeInstanceOf(Date);
  });


  it('should have the following properties defaults', () => {
    expect( subjectUnderTest.id ).toBe(0);
    expect( subjectUnderTest.quote ).toBe('');
    expect( subjectUnderTest.author ).toBe('');
    expect( subjectUnderTest.authorLink ).toBe('');
    expect( subjectUnderTest.displayDate ).toBe(dateInstance);
    expect( subjectUnderTest.numVotes ).toBe(0);
    expect( subjectUnderTest.lastUpdateDate ).toBe(dateInstance);
    expect( subjectUnderTest.createDate ).toBe(dateInstance);
  });


  it('should allow public update of all its properties values', () => {
    subjectUnderTest.id = 100;
    subjectUnderTest.quote = 'foo';
    subjectUnderTest.author = 'bar';
    subjectUnderTest.authorLink = 'baz';
    subjectUnderTest.displayDate = dateInstance;
    subjectUnderTest.numVotes = 100;
    subjectUnderTest.lastUpdateDate = dateInstance;
    subjectUnderTest.createDate = dateInstance;

    expect( subjectUnderTest.id ).toBe(100);
    expect( subjectUnderTest.quote ).toBe('foo');
    expect( subjectUnderTest.author ).toBe('bar');
    expect( subjectUnderTest.authorLink ).toBe('baz');
    expect( subjectUnderTest.displayDate ).toBe(dateInstance);
    expect( subjectUnderTest.numVotes ).toBe(100);
    expect( subjectUnderTest.lastUpdateDate ).toBe(dateInstance);
    expect( subjectUnderTest.createDate ).toBe(dateInstance);
  });

});
