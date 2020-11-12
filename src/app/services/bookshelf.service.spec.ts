import { HttpClientTestingModule, HttpTestingController }
  from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BookshelfService } from './bookshelf.service';
import { BookModel, BookAdapter } from '../models/book-model';
import { environment } from '../../environments/environment.prod';


describe('BookshelfService', () => {
  let subjectUnderTest:BookshelfService;
  let httpTestingController: HttpTestingController;


  beforeEach( () => {
    TestBed.configureTestingModule(
      {
        providers: [ BookshelfService, BookAdapter ],
        imports: [ HttpClientTestingModule ]
      }
    );

    subjectUnderTest = TestBed.inject(BookshelfService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });


  it('should be created', () => {
    expect( subjectUnderTest ).toBeTruthy();
  });


  it('should have a getAll method', () => {
    expect( subjectUnderTest.getAll ).toBeDefined();
  });


  it('getAll should return a BookModel array via GET request method', () => {
    const mockDateString = "1977-11-19 03:00:00";
    const mockBooksAPIResponse = [
      {
        id: 1, title: "foo", recomendationSummary: "bar", author: "baz",
        authorLink: "foofoo", image: "foobar", body: "foobaz", bookLink: "barfoo",
        featured: false, weight: 1, lastUpdate: mockDateString,
        createDate: mockDateString
      }, {
        id: 2, title: "FOO", recomendationSummary: "BAR", author: "BAZ",
        authorLink: "FOOFOO", image: "FOOBAR", body: "FOOBAZ", bookLink: "BARFOO",
        featured: true, weight: 0.5, lastUpdate: mockDateString,
        createDate: mockDateString
      }
    ];
    const expectedBooks = [
      new BookModel(1, "foo", "bar", "baz", "foofoo", "foobar", "foobaz", "barfoo",
        false, 1, new Date(mockDateString), new Date(mockDateString)
      ),
      new BookModel(2, "FOO", "BAR", "BAZ", "FOOFOO", "FOOBAR", "FOOBAZ", "BARFOO",
        true, 0.5, new Date(mockDateString), new Date(mockDateString)
      )
    ];

    subjectUnderTest.getAll().subscribe(
      response => expect( response ).toEqual(expectedBooks)
    );
    const testingRequest = httpTestingController.expectOne(environment.apiUrl + "bookshelf/read.php");
    expect( testingRequest.request.method ).toEqual('GET');

    testingRequest.flush(mockBooksAPIResponse);
    httpTestingController.verify();
  });

});
