import { BreadcrumbsModel } from './breadcrumbs-model';


describe('BreadcrumbsModel', () => {
  let subjectUnderTest: BreadcrumbsModel;


  beforeEach( () => {
    subjectUnderTest = new BreadcrumbsModel();
  });


  it('should create an instance', () => {
    expect( subjectUnderTest ).toBeTruthy();
  });


  it('should have exactly 2 properties', () => {
    expect( Object.getOwnPropertyNames(subjectUnderTest).length ).toBe(2);
  });


  it('should have defined the following properties and types', () => {
    expect( subjectUnderTest.title ).toBeDefined();
    expect( subjectUnderTest.title ).toBeInstanceOf(String);
    expect( subjectUnderTest.route ).toBeDefined();
    expect( subjectUnderTest.route ).toBeInstanceOf(String);

  });


  it('should have the following properties defaults', () => {
    expect( subjectUnderTest.title ).toBe('');
    expect( subjectUnderTest.route ).toBe('');
  });


  it('should allow public update of all its properties values', () => {
    subjectUnderTest.title = 'foo';
    subjectUnderTest.route = 'bar';

    expect( subjectUnderTest.title ).toBe('foo');
    expect( subjectUnderTest.route ).toBe('bar');
  });

});


