import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BookshelfService } from './bookshelf.service';
import { SessionStorageService } from '../services/session-storage.service';
import { BookModel, BookAdapter } from '../models/book-model';
import { environment } from '../../environments/environment.prod';


describe('BookshelfService', () => {
  const endPointGet: string = environment.api.url + environment.api.bookshelf.get;
  const endPointRandom: string = environment.api.url + environment.api.bookshelf.random;
  let subjectUnderTest: BookshelfService;
  let httpTestingController: HttpTestingController;
  let sessionStorageService: SessionStorageService;
  let spySessionStorageServiceSet: jasmine.Spy;
  let spySessionStorageServiceGet: jasmine.Spy;
  let spySessionStorageServiceRemove: jasmine.Spy;


  beforeEach( () => {
    TestBed.configureTestingModule(
      {
        providers: [ BookshelfService, BookAdapter ],
        imports: [ HttpClientTestingModule ]
      }
    );

    subjectUnderTest = TestBed.inject(BookshelfService);
    httpTestingController = TestBed.inject(HttpTestingController);

    sessionStorageService = TestBed.inject(SessionStorageService);
    spySessionStorageServiceSet = spyOn(sessionStorageService, 'set');
    spySessionStorageServiceGet = spyOn(sessionStorageService, 'get');
    spySessionStorageServiceRemove = spyOn(sessionStorageService, 'remove');
  });


  it('should be created', () => {
    expect( subjectUnderTest ).toBeTruthy();
  });


  it('should have a getAll method', () => {
    expect( subjectUnderTest.getAll ).toBeDefined();
  });


  it('getAll should return a BookModel array via GET request method', () => {
    const mockDateString = '1977-11-19 03:00:00';
    const mockBooksAPIResponse = [
      {
        id: 1, title: 'foo', recomendationSummary: 'bar', author: 'baz',
        authorLink: 'foofoo', image: 'foobar', body: 'foobaz', bookLink: 'barfoo',
        featured: false, weight: 1, lastUpdate: mockDateString,
        createDate: mockDateString
      }, {
        id: 2, title: 'FOO', recomendationSummary: 'BAR', author: 'BAZ',
        authorLink: 'FOOFOO', image: 'FOOBAR', body: 'FOOBAZ', bookLink: 'BARFOO',
        featured: true, weight: 0.5, lastUpdate: mockDateString,
        createDate: mockDateString
      }
    ];
    const expectedBooks = [
      new BookModel(1, 'foo', 'bar', 'baz', 'foofoo', 'foobar', 'foobaz', 'barfoo',
        false, 1, new Date(mockDateString), new Date(mockDateString)
      ),
      new BookModel(2, 'FOO', 'BAR', 'BAZ', 'FOOFOO', 'FOOBAR', 'FOOBAZ', 'BARFOO',
        true, 0.5, new Date(mockDateString), new Date(mockDateString)
      )
    ];

    subjectUnderTest.getAll().subscribe(
      response => expect( response ).toEqual(expectedBooks)
    );
    const testingRequest = httpTestingController.expectOne(endPointGet);
    expect( testingRequest.request.method ).toEqual('GET');

    testingRequest.flush(mockBooksAPIResponse);
    httpTestingController.verify();
  });


  it('getAll should return an observable error string, when there is a problem in the client', () => {
    const errorMessage = 'Failed to retrieve data from the server - BookshelfService';

    subjectUnderTest.getAll().subscribe(
      (response) => fail('no reason to stop here...'),
      (receivedErrorMessage: string) => {
        expect( receivedErrorMessage ).toBe(errorMessage);
      }
    );
    const testingRequest = httpTestingController.expectOne(endPointGet);
    expect( testingRequest.request.method ).toEqual('GET');

    testingRequest.error(
      new ErrorEvent('Client error', { message: errorMessage })
    );
    httpTestingController.verify();
  });


  it('getAll should return an observable error string, when there is a problem with the network', () => {
    const errorMessage = 'Failed to retrieve data from the server - BookshelfService';

    subjectUnderTest.getAll().subscribe(
      (response) => fail('no reason to stop here...'),
      (receivedErrorMessage: string) => {
        expect( receivedErrorMessage ).toBe(errorMessage);
      }
    );
    const testingRequest = httpTestingController.expectOne(endPointGet);
    expect( testingRequest.request.method ).toEqual('GET');

    testingRequest.flush('Network error',
      {
        status: 404,
        statusText: errorMessage
      }
    );
    httpTestingController.verify();
  });


  it('should have a getById method', () => {
    expect( subjectUnderTest.getById ).toBeDefined();
  });


  it('getById should return a BookModel array via GET request method', () => {
    const mockDateString = '1977-11-19 03:00:00';
    const mockBooksAPIResponse = {
      id: 1, title: 'foo', recomendationSummary: 'bar', author: 'baz',
      authorLink: 'foofoo', image: 'foobar', body: 'foobaz', bookLink: 'barfoo',
      featured: false, weight: 1, lastUpdate: mockDateString,
      createDate: mockDateString
    };
    const expectedBook = new BookModel(1, 'foo', 'bar', 'baz', 'foofoo', 'foobar', 'foobaz', 'barfoo',
      false, 1, new Date(mockDateString), new Date(mockDateString)
    );

    subjectUnderTest.getById(1).subscribe(
      response => expect( response ).toEqual(expectedBook)
    );
    const testingRequest = httpTestingController.expectOne(endPointGet + '?1');
    expect( testingRequest.request.method ).toEqual('GET');

    testingRequest.flush(mockBooksAPIResponse);
    httpTestingController.verify();
  });


  it('getById should return an observable error string, when there is a problem in the client', () => {
    const errorMessage = 'Failed to retrieve data from the server - BookshelfService';

    subjectUnderTest.getById(1).subscribe(
      (response) => fail('no reason to stop here...'),
      (receivedErrorMessage: string) => {
        expect( receivedErrorMessage ).toBe(errorMessage);
      }
    );
    const testingRequest = httpTestingController.expectOne(endPointGet + '?1');
    expect( testingRequest.request.method ).toEqual('GET');

    testingRequest.error(
      new ErrorEvent('Client error', { message: errorMessage })
    );
    httpTestingController.verify();
  });


  it('getById should return an observable error string, when there is a problem with the network', () => {
    const errorMessage = 'Failed to retrieve data from the server - BookshelfService';

    subjectUnderTest.getById(1).subscribe(
      (response) => fail('no reason to stop here...'),
      (receivedErrorMessage: string) => {
        expect( receivedErrorMessage ).toBe(errorMessage);
      }
    );
    const testingRequest = httpTestingController.expectOne(endPointGet + '?1');
    expect( testingRequest.request.method ).toEqual('GET');

    testingRequest.flush('Network error',
      {
        status: 404,
        statusText: errorMessage
      }
    );
    httpTestingController.verify();
  });


  it('getRandom should return a BookModel via GET request method when sessionStorage is empty', () => {
    const mockDateString = '1977-11-19 03:00:00';
    const mockBooksAPIResponse = {
      id: 1, title: 'foo', recomendationSummary: 'bar', author: 'baz',
      authorLink: 'foofoo', image: 'foobar', body: 'foobaz', bookLink: 'barfoo',
      featured: false, weight: 1, lastUpdate: mockDateString,
      createDate: mockDateString
    };
    const expectedBook = new BookModel(1, 'foo', 'bar', 'baz', 'foofoo', 'foobar', 'foobaz', 'barfoo',
      false, 1, new Date(mockDateString), new Date(mockDateString)
    );
    spySessionStorageServiceGet.and.returnValue(null);

    subjectUnderTest.getRandom().subscribe(
      response => expect( response ).toEqual(expectedBook)
    );
    const testingRequest = httpTestingController.expectOne(endPointRandom + '?');
    expect( testingRequest.request.method ).toEqual('GET');

    testingRequest.flush(mockBooksAPIResponse);
    httpTestingController.verify();

    expect( spySessionStorageServiceGet ).toHaveBeenCalledWith('readingSuggestions');
    expect( spySessionStorageServiceSet ).toHaveBeenCalledWith('readingSuggestions', '1');
  });


  it('getRandom should return a BookModel via GET request method when sessionStorage has values', () => {
    const mockDateString = '1977-11-19 03:00:00';
    const mockBooksAPIResponse = {
      id: 1, title: 'foo', recomendationSummary: 'bar', author: 'baz',
      authorLink: 'foofoo', image: 'foobar', body: 'foobaz', bookLink: 'barfoo',
      featured: false, weight: 1, lastUpdate: mockDateString,
      createDate: mockDateString
    };
    const expectedBook = new BookModel(1, 'foo', 'bar', 'baz', 'foofoo', 'foobar', 'foobaz', 'barfoo',
      false, 1, new Date(mockDateString), new Date(mockDateString)
    );
    spySessionStorageServiceGet.and.returnValue('2,3');

    subjectUnderTest.getRandom().subscribe(
      response => expect( response ).toEqual(expectedBook)
    );
    const testingRequest = httpTestingController.expectOne(endPointRandom + '?2,3');
    expect( testingRequest.request.method ).toEqual('GET');

    testingRequest.flush(mockBooksAPIResponse);
    httpTestingController.verify();

    expect( spySessionStorageServiceGet ).toHaveBeenCalledWith('readingSuggestions');
    expect( spySessionStorageServiceSet ).toHaveBeenCalledWith('readingSuggestions', '2,3,1');
  });


  it('getRandom should return a BookModel via GET request method clean sessionStorage and add sessionStorage value', () => {
    const mockDateString = '1977-11-19 03:00:00';
    const mockBooksAPIResponse = {
      id: 1, title: 'foo', recomendationSummary: 'bar', author: 'baz',
      authorLink: 'foofoo', image: 'foobar', body: 'foobaz', bookLink: 'barfoo',
      featured: false, weight: 1, lastUpdate: mockDateString,
      createDate: mockDateString
    };
    const expectedBook = new BookModel(1, 'foo', 'bar', 'baz', 'foofoo', 'foobar', 'foobaz', 'barfoo',
      false, 1, new Date(mockDateString), new Date(mockDateString)
    );
    spySessionStorageServiceGet.and.returnValue('1');

    subjectUnderTest.getRandom().subscribe(
      response => expect( response ).toEqual(expectedBook)
    );
    const testingRequest = httpTestingController.expectOne(endPointRandom + '?1');
    expect( testingRequest.request.method ).toEqual('GET');

    testingRequest.flush(mockBooksAPIResponse);
    httpTestingController.verify();

    expect( spySessionStorageServiceGet ).toHaveBeenCalledWith('readingSuggestions');
    expect( spySessionStorageServiceRemove ).toHaveBeenCalledWith('readingSuggestions');
    expect( spySessionStorageServiceSet ).toHaveBeenCalledWith('readingSuggestions', '1');
  });


  it('getRandom should return an observable error string, when there is a problem in the client', () => {
    const errorMessage = 'Failed to retrieve data from the server - BookshelfService';
    spySessionStorageServiceGet.and.returnValue(null);

    subjectUnderTest.getRandom().subscribe(
      (response) => fail('no reason to stop here...'),
      (receivedErrorMessage: string) => {
        expect( receivedErrorMessage ).toBe(errorMessage);
      }
    );
    const testingRequest = httpTestingController.expectOne(endPointRandom + '?');
    expect( testingRequest.request.method ).toEqual('GET');

    testingRequest.error(
      new ErrorEvent('Client error', { message: errorMessage })
    );
    httpTestingController.verify();
  });


  it('getRandom should return an observable error string, when there is a problem with the network', () => {
    const errorMessage = 'Failed to retrieve data from the server - BookshelfService';
    spySessionStorageServiceGet.and.returnValue(null);

    subjectUnderTest.getRandom().subscribe(
      (response) => fail('no reason to stop here...'),
      (receivedErrorMessage: string) => {
        expect( receivedErrorMessage ).toBe(errorMessage);
      }
    );
    const testingRequest = httpTestingController.expectOne(endPointRandom + '?');
    expect( testingRequest.request.method ).toEqual('GET');

    testingRequest.flush('Network error',
      {
        status: 404,
        statusText: errorMessage
      }
    );
    httpTestingController.verify();
  });
});
