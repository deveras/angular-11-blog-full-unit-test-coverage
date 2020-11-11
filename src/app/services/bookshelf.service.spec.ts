import { HttpClientTestingModule, HttpTestingController }
  from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BookshelfService } from './bookshelf.service';
import { environment } from '../../environments/environment.prod';


describe('BookshelfService', () => {
  let subjectUnderTest:BookshelfService;
  let httpTestingController: HttpTestingController;
  const expectedBooks = [
    { id: 1, title: "foo", recomendationSummary: "baz", author: "foo",
      authorLink: "bar", image: "baz", body: "foo", bookLink: "bar",
      featured: false, weight: 1, lastUpdate: "baz", createDate: "foo"
    }
  ];


  beforeEach( () => {
    TestBed.configureTestingModule(
      {
        providers: [ BookshelfService ],
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
    subjectUnderTest.getAll().subscribe(
      response => expect( response ).toEqual(expectedBooks)
    );
    const testingRequest = httpTestingController.expectOne(environment.apiUrl + "bookshelf/read.php");
    expect( testingRequest.request.method ).toEqual('GET');

    testingRequest.flush(expectedBooks);
    httpTestingController.verify();
  });

});
