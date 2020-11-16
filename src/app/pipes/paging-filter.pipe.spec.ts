import { PagingFilterPipe } from './paging-filter.pipe';


describe('PagingFilterPipe', () => {
  let subjectUnderTest:PagingFilterPipe;


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
    const mockCollection = [ { id: 1 }, { id: 2 }, { id: 3 } ];
    expect( subjectUnderTest.transform(mockCollection, 0, 1) ).toEqual( [{ id: 1 }] );
    expect( subjectUnderTest.transform(mockCollection, 1, 1) ).toEqual( [{ id: 2 }] );
    expect( subjectUnderTest.transform(mockCollection, 2, 1) ).toEqual( [{ id: 3 }] );

    expect( subjectUnderTest.transform(mockCollection, 0, 2) ).toEqual( [{ id: 1 }, { id: 2 }] );
    expect( subjectUnderTest.transform(mockCollection, 1, 2) ).toEqual( [{ id: 3 }] );

    expect( subjectUnderTest.transform(mockCollection, 100, 200) ).toEqual( [] );
  });

});
