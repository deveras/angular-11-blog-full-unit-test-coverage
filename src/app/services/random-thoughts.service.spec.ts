import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RandomThoughtsService } from './random-thoughts.service';
import { ThoughtModel, ApiThoughtInterface, ThoughtAdapter } from '../models/thought-model';
import { environment } from '../../environments/environment.prod';


describe('RandomThoughtsService', () => {
  const readEndPoint: string = environment.api.url + environment.api.thoughts.get;
  let subjectUnderTest: RandomThoughtsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ThoughtAdapter ],
      imports: [ HttpClientTestingModule ]
    });
    subjectUnderTest = TestBed.inject(RandomThoughtsService);

    httpTestingController = TestBed.inject(HttpTestingController);
  });


  it('should be created', () => {
    expect( subjectUnderTest ).toBeTruthy();
  });


  it('getThought should return a ThoughtModel', () => {
    const mockDate = new Date();
    const mockThought = { id: 1, thought: 'foo', createDate: mockDate };

    subjectUnderTest.getThought().subscribe(
      (response) => expect( response ).toEqual( new ThoughtModel(1, 'foo', mockDate) )
    );

    const req = httpTestingController.expectOne(readEndPoint);

    expect( req.request.method ).toEqual('GET');

    req.flush(mockThought);
    httpTestingController.verify();
  });


  it('getThought should return an observable error string, when there is a problem in the client', () => {
    const errorMessage = 'Failed to retrieve data from the server - RandomThoughtsService';

    subjectUnderTest.getThought().subscribe(
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


  it('getThought should return an observable error string, when there is a problem with the network', () => {
    const errorMessage = 'Failed to retrieve data from the server - RandomThoughtsService';

    subjectUnderTest.getThought().subscribe(
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

});
