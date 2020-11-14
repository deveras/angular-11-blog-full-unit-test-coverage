import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { BookshelfComponent } from './bookshelf.component';
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
  let subjectUnderTest: BookshelfComponent;
  let bookshelfService:BookshelfService;
  let spyBookshelfServiceGetAll:jasmine.Spy;
  let spyChangeDetectorRefMarkForCheck:jasmine.Spy;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookshelfComponent ],
      providers: [ BookshelfService ],
      imports: [
        HttpClientTestingModule,
        RouterModule.forRoot([])
      ]
    });
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(BookshelfComponent);
    subjectUnderTest = fixture.componentInstance;

    bookshelfService = TestBed.inject(BookshelfService);
    spyBookshelfServiceGetAll = spyOn(bookshelfService, "getAll");

    // subjectUnderTest.changeDetectorRef is private,
    // however i want to ensure that markForCheck is called
    spyChangeDetectorRefMarkForCheck = spyOn((subjectUnderTest as any).changeDetectorRef, "markForCheck");
  });


  it('should create the component', () => {
    expect( subjectUnderTest ).toBeTruthy();
  });


  it('should have 2 public property', () => {
    expect( subjectUnderTest.collection ).toBeDefined();
    expect( subjectUnderTest.collection ).toEqual([]);
    expect( subjectUnderTest.errorMessage ).toBeDefined();
    expect( subjectUnderTest.errorMessage ).toBe("");
    expect( subjectUnderTest.showLoading ).toBeDefined();
    expect( subjectUnderTest.showLoading ).toBe(true);
  });


  it('ngOnInit should collect all books onInit if successfull', () => {
    spyBookshelfServiceGetAll.and.returnValue( of(expectedBooks) );
    fixture.detectChanges();

    expect( spyBookshelfServiceGetAll.calls.count() ).toBe(1);
    expect( subjectUnderTest.collection ).toEqual(expectedBooks);
    expect( subjectUnderTest.showLoading ).toBe(false);
    expect( spyChangeDetectorRefMarkForCheck ).toHaveBeenCalled();
  });


  it('ngOnInit should populate the errorMessage when getting books fails', () => {
    spyBookshelfServiceGetAll.and.returnValue( throwError("foo bar baz") );
    fixture.detectChanges();

    expect( spyBookshelfServiceGetAll.calls.count() ).toBe(1);
    expect( subjectUnderTest.errorMessage ).toEqual("foo bar baz");
    expect( subjectUnderTest.showLoading ).toBe(false);
    expect( spyChangeDetectorRefMarkForCheck ).toHaveBeenCalled();
  });


  it('ngOnDestroy should unsubscribe', () => {
    spyBookshelfServiceGetAll.and.returnValue( {
      subscribe: () => {
        return {
          unsubscribe: () => { return "bar"}
        };
      }
    });
    fixture.detectChanges();

    // subjectUnderTest.subs is private,
    // however i want to ensure that unsubscribe is called
    spyOn((subjectUnderTest as any).subs, 'unsubscribe');

    subjectUnderTest.ngOnDestroy();

    expect( (subjectUnderTest as any).subs.unsubscribe ).toHaveBeenCalled();
  });
});
