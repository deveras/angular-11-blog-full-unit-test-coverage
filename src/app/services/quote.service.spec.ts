import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { QuoteService } from './quote.service';
import { LocalStorageService } from './local-storage.service';
import { QuoteModel, QuoteAdapter } from '../models/quote-model';
import { environment } from '../../environments/environment.prod';


describe('QuoteService', () => {
  const readEndPoint: string = environment.api.url + environment.api.quotes.get;
  const votesEndPoint: string = environment.api.url + environment.api.quotes.votes;
  let subjectUnderTest: QuoteService;
  let httpTestingController: HttpTestingController;
  let storateService: LocalStorageService;
  let spyLocalStorageServiceSet: jasmine.Spy;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ QuoteAdapter ],
      imports: [ HttpClientTestingModule ]
    });
    subjectUnderTest = TestBed.inject(QuoteService);

    httpTestingController = TestBed.inject(HttpTestingController);

    storateService = TestBed.inject(LocalStorageService);
    spyLocalStorageServiceSet = spyOn(storateService, 'set');
  });


  it('should be created', () => {
    expect( subjectUnderTest ).toBeTruthy();
  });


  it('getQuote should return a QuoteModel', () => {
    const mockDate = new Date();
    const mockQuote = {
      id: 1, quote: 'foo', author: 'bar', authorLink: 'baz',
      displayDate: mockDate, numVotes: 100, lastUpdate: mockDate,
      createDate: mockDate
    };

    subjectUnderTest.getQuote().subscribe(
      (response) => expect( response ).toEqual(
        new QuoteModel(1, 'foo', 'bar', 'baz', mockDate, 100, mockDate, mockDate)
      )
    );
    const req = httpTestingController.expectOne(readEndPoint);
    expect( req.request.method ).toEqual('GET');
    req.flush(mockQuote);
    httpTestingController.verify();
  });


  it('getQuote should return an observable error string, when there is a problem in the client', () => {
    const errorMessage = 'Failed to retrieve data from the server - QuoteService';

    subjectUnderTest.getQuote().subscribe(
      (response) => fail('no reason to stop here...'),
      (receivedErrorMessage: string) => {
        expect( receivedErrorMessage ).toBe(errorMessage);
      }
    );
    const testingRequest = httpTestingController.expectOne(readEndPoint);
    expect( testingRequest.request.method ).toEqual('GET');

    testingRequest.error(
      new ErrorEvent('Client error', { message: errorMessage })
    );
    httpTestingController.verify();
  });


  it('getQuote should return an observable error string, when there is a problem with the network', () => {
    const errorMessage = 'Failed to retrieve data from the server - QuoteService';

    subjectUnderTest.getQuote().subscribe(
      (response) => fail('no reason to stop here...'),
      (receivedErrorMessage: string) => {
        expect( receivedErrorMessage ).toBe(errorMessage);
      }
    );
    const testingRequest = httpTestingController.expectOne(readEndPoint);
    expect( testingRequest.request.method ).toEqual('GET');

    testingRequest.flush('Network error',
      {
        status: 404,
        statusText: errorMessage
      }
    );
    httpTestingController.verify();
  });


  it('updateNumVotes should update the storage with quoteOfDay and value 1', () => {
    subjectUnderTest.updateNumVotes('1', 1);

    const testingRequest = httpTestingController.expectOne(votesEndPoint);

    expect( testingRequest.request.method ).toEqual('POST');

    testingRequest.flush({ id: 1, value: 1});

    expect( spyLocalStorageServiceSet ).toHaveBeenCalledWith('quoteOfTheDay', '1');

    httpTestingController.verify();
  });


  it('updateNumVotes should not update the storage and throw', () => {
    const errorMessage = 'Failed to retrieve data from the server - QuoteService';

    subjectUnderTest.updateNumVotes('1', 1);

    const testingRequest = httpTestingController.expectOne(votesEndPoint);

    expect( testingRequest.request.method ).toEqual('POST');

    testingRequest.flush('Network error',
      {
        status: 404,
        statusText: errorMessage
      }
    );

    expect( spyLocalStorageServiceSet ).not.toHaveBeenCalled();

    httpTestingController.verify();
  });
});
