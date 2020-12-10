import { AttributeNode } from './attribute-node';


describe('AttributeNode', () => {
  let subjectUnderTest: AttributeNode;


  beforeEach( () => {
    subjectUnderTest = new AttributeNode();
  });

  it('should create an instance', () => {
    expect( subjectUnderTest ).toBeTruthy();
  });


  it('should have exactly 2 properties', () => {
    expect( Object.getOwnPropertyNames(subjectUnderTest).length ).toBe(2);
  });


  it('should have defined the following properties and types', () => {
    expect( subjectUnderTest.name ).toBeDefined();
    expect( subjectUnderTest.name ).toBeInstanceOf(String);
    expect( subjectUnderTest.value ).toBeDefined();
    expect( subjectUnderTest.value ).toBeInstanceOf(String);
  });


  it('should have the following properties defaults', () => {
    expect( subjectUnderTest.name ).toBe('');
    expect( subjectUnderTest.value ).toBe('');
  });

});
