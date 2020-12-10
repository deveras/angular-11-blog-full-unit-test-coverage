import { SlugPipe } from './slug.pipe';


describe('SlugPipe', () => {
  let subjectUnderTest: SlugPipe;


  beforeEach(() => {
    subjectUnderTest = new SlugPipe();
  });


  it('create an instance', () => {
    expect( subjectUnderTest ).toBeTruthy();
  });


  it('transform should replace all whitespaces with -', () => {
    expect( subjectUnderTest.transform('foo bar baz') ).toBe('foo-bar-baz');
  });


  it('transform should remove all non-word chars', () => {
    expect( subjectUnderTest.transform('foo ? + = , . baz') ).toBe('foo-baz');
  });


  it('transform should replace multiple - with single -', () => {
    expect( subjectUnderTest.transform('foo--bar--baz') ).toBe('foo-bar-baz');
  });


  it('transform should trim from the start of text', () => {
    expect( subjectUnderTest.transform('   foo bar--baz') ).toBe('foo-bar-baz');
  });


  it('transform should trim from the end of text', () => {
    expect( subjectUnderTest.transform('foo bar--baz   ') ).toBe('foo-bar-baz');
  });


  it('transform should leave number as they are', () => {
    expect( subjectUnderTest.transform('foo bar--baz 1977   ') ).toBe('foo-bar-baz-1977');
  });


});
