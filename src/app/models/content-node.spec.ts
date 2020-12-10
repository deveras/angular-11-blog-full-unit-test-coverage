import { ContentNode } from './content-node';
import { AttributeNode } from './attribute-node';


describe('ContentNode', () => {
  let subjectUnderTest: ContentNode;


  beforeEach( () => {
    subjectUnderTest = new ContentNode();
  });


  it('should create an instance', () => {
    expect( subjectUnderTest ).toBeTruthy();
  });


  it('should have exactly 6 properties', () => {
    expect( Object.getOwnPropertyNames(subjectUnderTest).length ).toBe(6);
  });


  it('should have defined the following properties and types', () => {
    expect( subjectUnderTest.type ).toBeDefined();
    expect( subjectUnderTest.type ).toBeInstanceOf(String);
    expect( subjectUnderTest.tag ).toBeDefined();
    expect( subjectUnderTest.tag ).toBeInstanceOf(String);
    expect( subjectUnderTest.content ).toBeDefined();
    expect( subjectUnderTest.content ).toBeInstanceOf(String);
    expect( subjectUnderTest.classes ).toBeDefined();
    expect( subjectUnderTest.classes ).toBeInstanceOf(String);
    expect( subjectUnderTest.attributes ).toBeDefined();
    expect( subjectUnderTest.children ).toBeDefined();
  });


  it('should have the following properties defaults', () => {
    expect( subjectUnderTest.type ).toBe('');
    expect( subjectUnderTest.tag ).toBe('');
    expect( subjectUnderTest.content ).toBe('');
    expect( subjectUnderTest.classes ).toBe('');
    expect( subjectUnderTest.attributes ).toBe(null);
    expect( subjectUnderTest.children ).toBe(null);
  });

});
