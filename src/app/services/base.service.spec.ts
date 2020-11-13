import { TestBed } from '@angular/core/testing';

import { BaseService } from './base.service';

describe('BaseService', () => {
  let subjectUnderTest:BaseService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: 'urlEndpoint', useValue: "foo/bar/baz" }
      ]
    });
    subjectUnderTest = TestBed.inject(BaseService);
  });


  it('should be created', () => {
    expect(subjectUnderTest).toBeTruthy();
  });


  it('should have a getAll method', () => {
    expect( subjectUnderTest.getAll ).toBeDefined();
  });


  xit('handleError() and getAll() are tested on the extended classes', () => {} );

});