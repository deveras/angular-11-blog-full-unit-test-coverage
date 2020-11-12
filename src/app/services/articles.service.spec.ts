import { HttpClientTestingModule, HttpTestingController }
  from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ArticlesService } from './articles.service';
import { ArticleModel, ArticleAdapter } from '../models/article-model';
import { environment } from '../../environments/environment.prod';


describe('ArticlesService', () => {
  let subjectUnderTest:ArticlesService;
  let httpTestingController: HttpTestingController;


  beforeEach( () => {
    TestBed.configureTestingModule(
      {
        providers: [ ArticlesService, ArticleAdapter ],
        imports: [ HttpClientTestingModule ]
      }
    );

    subjectUnderTest = TestBed.inject(ArticlesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });


  it('should be created', () => {
    expect( subjectUnderTest ).toBeTruthy();
  });


  it('should have a getAll method', () => {
    expect( subjectUnderTest.getAll ).toBeDefined();
  });


  it('getAll should return a ArticleModel array via GET request method', () => {
    const mockDateString = "1977-11-19 03:00:00";
    const mockArticlesAPIResponse = [
      {
        id: 1, title: "foo", recomendationSummary: "bar", body: "baz",
       lastUpdate: mockDateString, createDate: mockDateString
      }, {
        id: 2, title: "FOO", recomendationSummary: "BAR", body: "BAZ",
        lastUpdate: mockDateString, createDate: mockDateString
      }
    ];
    const expectedArticles = [
      new ArticleModel(1, "foo", "bar", "baz", new Date(mockDateString), new Date(mockDateString) ),
      new ArticleModel(2, "FOO", "BAR", "BAZ", new Date(mockDateString), new Date(mockDateString) )
    ];

    subjectUnderTest.getAll().subscribe(
      response => expect( response ).toEqual(expectedArticles)
    );
    const testingRequest = httpTestingController.expectOne(environment.apiUrl + "articles/read.php");
    expect( testingRequest.request.method ).toEqual('GET');

    testingRequest.flush(mockArticlesAPIResponse);
    httpTestingController.verify();
  });

});
