import { HttpClientTestingModule, HttpTestingController }
  from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TutorialsService } from './tutorials.service';
import { TutorialModel, TutorialAdapter } from '../models/tutorial-model';
import { environment } from '../../environments/environment.prod';


describe('TutorialsService', () => {
  let subjectUnderTest:TutorialsService;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule(
      {
        providers: [ TutorialsService, TutorialAdapter ],
        imports: [ HttpClientTestingModule ]
      }
    );

    subjectUnderTest = TestBed.inject(TutorialsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });


  it('should be created', () => {
    expect( subjectUnderTest ).toBeTruthy();
  });


  it('should have a getAll method', () => {
    expect( subjectUnderTest.getAll ).toBeDefined();
  });


  it('getAll should return a TutorialModel array via GET request method', () => {
    const mockDateString = "1977-11-19 03:00:00";
    const mockTutorialsAPIResponse = [
      {
        id: 1, title: "foo", recomendationSummary: "bar", body: "baz",
       lastUpdate: mockDateString, createDate: mockDateString
      }, {
        id: 2, title: "FOO", recomendationSummary: "BAR", body: "BAZ",
        lastUpdate: mockDateString, createDate: mockDateString
      }
    ];
    const expectedTutorials = [
      new TutorialModel(1, "foo", "bar", "baz", new Date(mockDateString), new Date(mockDateString) ),
      new TutorialModel(2, "FOO", "BAR", "BAZ", new Date(mockDateString), new Date(mockDateString) )
    ];

    subjectUnderTest.getAll().subscribe(
      response => expect( response ).toEqual(expectedTutorials)
    );
    const testingRequest = httpTestingController.expectOne(environment.apiUrl + "tutorials/read.php");
    expect( testingRequest.request.method ).toEqual('GET');

    testingRequest.flush(mockTutorialsAPIResponse);
    httpTestingController.verify();
  });

});
