import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookshelfComponent } from './bookshelf.component';
import { Title } from '@angular/platform-browser';
import { BookshelfService } from './../../services/bookshelf.service';
import { HttpClientTestingModule, HttpTestingController }
  from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';


describe('BookshelfComponent', () => {
  const expectedBooks = [ {
    id: 1, title: "foo", recomendationSummary: "baz", author: "foo",
    authorLink: "bar", image: "baz", body: "foo", bookLink: "bar",
    featured: false, weight: 1, lastUpdateDate: new Date(),
    createDate: new Date()
  }];
  let fixture: ComponentFixture<BookshelfComponent>;
  let component: BookshelfComponent;
  let titleService:Title;
  let bookshelfService:BookshelfService;
  let spyTitleServiceSet:jasmine.Spy;
  let spyBookshelfServiceGetAll:jasmine.Spy;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookshelfComponent ],
      providers: [ Title, BookshelfService ],
      imports: [ HttpClientTestingModule ]
    });
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(BookshelfComponent);
    component = fixture.componentInstance;

    titleService = TestBed.inject(Title);
    spyTitleServiceSet = spyOn(titleService, "setTitle");

    bookshelfService = TestBed.inject(BookshelfService);
    spyBookshelfServiceGetAll = spyOn(bookshelfService, "getAll");
  });


  it('should create the component', () => {
    expect( component ).toBeTruthy();
  });


  it('should have 2 public property', () => {
    expect( component.collection ).toBeDefined();
    expect( component.collection ).toEqual([]);
    expect( component.errorMessage ).toBeDefined();
    expect( component.errorMessage ).toBe("");
  });


  it('ngOnInit should set the page title to Bookshelf', () => {
    spyBookshelfServiceGetAll.and.returnValue( of("") );
    fixture.detectChanges();

    expect( spyTitleServiceSet.calls.count() ).toBe(1);
    expect( spyTitleServiceSet ).toHaveBeenCalledWith("Bookshelf");
  });


  it('ngOnInit should collect all books onInit if successfull', () => {
    spyBookshelfServiceGetAll.and.returnValue( of(expectedBooks) );
    fixture.detectChanges();

    expect( spyBookshelfServiceGetAll.calls.count() ).toBe(1);
    expect( component.collection ).toEqual(expectedBooks);
  });


  it('ngOnInit should populate the errorMessage when getting books fails', () => {
    spyBookshelfServiceGetAll.and.returnValue( throwError("foo bar baz") );
    fixture.detectChanges();

    expect( spyBookshelfServiceGetAll.calls.count() ).toBe(1);
    expect( component.errorMessage ).toEqual("foo bar baz");
  });

});
