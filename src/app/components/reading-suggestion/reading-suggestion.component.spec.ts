import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReadingSuggestionComponent } from './reading-suggestion.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { BookshelfService } from '../../services/bookshelf.service';
import { BookModel } from '../../models/book-model';
import { SlugPipe } from '../../pipes/slug.pipe';


describe('ReadingSuggestionComponent', () => {
  const expectedBook: BookModel = new BookModel(
    1, 'foo', 'bar', 'baz', 'fooFoo', 'fooBar', 'fooBaz', 'barFoo', true, 1, new Date(), new Date()
  );
  let subjectUnderTest: ReadingSuggestionComponent;
  let fixture: ComponentFixture<ReadingSuggestionComponent>;
  let bookshelfService: BookshelfService;
  let spyBookshelfServiceGetRandom: jasmine.Spy;
  let spyChangeDetectorRefMarkForCheck: jasmine.Spy;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadingSuggestionComponent, SlugPipe ],
      imports: [ HttpClientTestingModule ]
    });

    fixture = TestBed.createComponent(ReadingSuggestionComponent);
    subjectUnderTest = fixture.componentInstance;

    bookshelfService = TestBed.inject(BookshelfService);
    spyBookshelfServiceGetRandom = spyOn(bookshelfService, 'getRandom');

    // tslint:disable: no-any
    spyChangeDetectorRefMarkForCheck = spyOn((subjectUnderTest as any).changeDetectorRef, 'markForCheck');
  });


  it('should create', () => {
    expect( subjectUnderTest ).toBeTruthy();
  });


  it('should have a public bookModel property undefined', () => {
    expect( subjectUnderTest.bookModel ).toBeUndefined();
  });


  it('should define 1 public initialised property', () => {
    expect( subjectUnderTest.showLoading ).toBeDefined();
    expect( subjectUnderTest.showLoading ).toBe(true);
  });


  it('should have the following public methods', () => {
    expect( subjectUnderTest.ngOnInit ).toEqual(jasmine.any(Function));
    expect( subjectUnderTest.ngOnDestroy ).toEqual(jasmine.any(Function));
  });


  it('ngOnInit should collect a book if successfull', () => {
    spyBookshelfServiceGetRandom.and.returnValue( of(expectedBook) );
    fixture.detectChanges();

    expect( spyBookshelfServiceGetRandom.calls.count() ).toBe(1);
    expect( subjectUnderTest.bookModel ).toEqual(expectedBook);
    expect( subjectUnderTest.showLoading ).toBe(false);
    expect( spyChangeDetectorRefMarkForCheck ).toHaveBeenCalled();
  });


  it('ngOnDestroy should unsubscribe', () => {
    spyBookshelfServiceGetRandom.and.returnValue( {
      subscribe: () => {
        return {
          unsubscribe: () => 'bar'
        };
      }
    });
    fixture.detectChanges();

    // subjectUnderTest.subs is private,
    // however i want to ensure that unsubscribe is called
    // tslint:disable: no-any
    spyOn((subjectUnderTest as any).bookshelfServiceSubscription, 'unsubscribe');

    subjectUnderTest.ngOnDestroy();

    // tslint:disable: no-any
    expect( (subjectUnderTest as any).bookshelfServiceSubscription.unsubscribe ).toHaveBeenCalled();
  });
});
