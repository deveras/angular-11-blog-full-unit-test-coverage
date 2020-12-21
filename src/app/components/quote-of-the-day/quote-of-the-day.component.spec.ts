import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuoteOfTheDayComponent } from './quote-of-the-day.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { QuoteService } from './../../services/quote.service';
import { LocalStorageService } from './../../services/local-storage.service';
import { QuoteModel } from '../../models/quote-model';


describe('QuoteOfTheDayComponent', () => {
  const mockDate = new Date();
  const expectedQuote = new QuoteModel(1, 'foo', 'bar', 'baz', mockDate, 100, mockDate, mockDate);
  let subjectUnderTest: QuoteOfTheDayComponent;
  let fixture: ComponentFixture<QuoteOfTheDayComponent>;
  let quoteService: QuoteService;
  let spyQuoteServiceGetQuote: jasmine.Spy;
  let spyQuoteServiceUpdateNumVotes: jasmine.Spy;
  let localStorateService: LocalStorageService;
  let spyLocalStorageServiceGet: jasmine.Spy;
  let spyChangeDetectorRefMarkForCheck: jasmine.Spy;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteOfTheDayComponent ],
      imports: [ HttpClientTestingModule ]
    });

    fixture = TestBed.createComponent(QuoteOfTheDayComponent);
    subjectUnderTest = fixture.componentInstance;

    quoteService = TestBed.inject(QuoteService);
    spyQuoteServiceGetQuote = spyOn(quoteService, 'getQuote');
    spyQuoteServiceUpdateNumVotes = spyOn(quoteService, 'updateNumVotes');

    localStorateService = TestBed.inject(LocalStorageService);
    spyLocalStorageServiceGet = spyOn(localStorateService, 'get');

    // tslint:disable: no-any
    spyChangeDetectorRefMarkForCheck = spyOn((subjectUnderTest as any).changeDetectorRef, 'markForCheck');
  });


  it('should create the component', () => {
    expect( subjectUnderTest ).toBeTruthy();
  });


  it('should have a public quote property undefined', () => {
    expect( subjectUnderTest.quote ).toBeUndefined();
  });


  it('should define 4 public initialised properties', () => {
    expect( subjectUnderTest.hasVotedThisQuote ).toBeDefined();
    expect( subjectUnderTest.hasVotedThisQuote ).toBe(false);
    expect( subjectUnderTest.showLoadingQuote ).toBeDefined();
    expect( subjectUnderTest.showLoadingQuote ).toBe(true);
    expect( subjectUnderTest.showLoadingVote ).toBeDefined();
    expect( subjectUnderTest.showLoadingVote ).toBe(false);
    expect( subjectUnderTest.errorMessage ).toBeDefined();
    expect( subjectUnderTest.errorMessage ).toBe('');
  });


  it('should have the following public methods', () => {
    expect( subjectUnderTest.ngOnInit ).toEqual(jasmine.any(Function));
    expect( subjectUnderTest.ngOnDestroy ).toEqual(jasmine.any(Function));
  });


  it('ngOnInit should collect a quote if successfull and set hasVotedThisQuote true when storage id matches the quote id', () => {
    spyQuoteServiceGetQuote.and.returnValue( of(expectedQuote) );
    spyLocalStorageServiceGet.and.returnValue(1);
    fixture.detectChanges();

    expect( spyQuoteServiceGetQuote.calls.count() ).toBe(1);
    expect( subjectUnderTest.quote ).toEqual(expectedQuote);
    expect( subjectUnderTest.showLoadingQuote ).toBe(false);
    expect( spyLocalStorageServiceGet ).toHaveBeenCalled();
    expect( subjectUnderTest.hasVotedThisQuote ).toBe(true);
    expect( spyChangeDetectorRefMarkForCheck ).toHaveBeenCalled();
  });


  it('ngOnInit should collect a quote if successfull and set hasVotedThisQuote false when storage id does not match the quote id', () => {
    spyQuoteServiceGetQuote.and.returnValue( of(expectedQuote) );
    spyLocalStorageServiceGet.and.returnValue(100);
    fixture.detectChanges();

    expect( spyQuoteServiceGetQuote.calls.count() ).toBe(1);
    expect( subjectUnderTest.quote ).toEqual(expectedQuote);
    expect( subjectUnderTest.showLoadingQuote ).toBe(false);
    expect( spyLocalStorageServiceGet ).toHaveBeenCalled();
    expect( subjectUnderTest.hasVotedThisQuote ).toBe(false);
    expect( spyChangeDetectorRefMarkForCheck ).toHaveBeenCalled();
  });


  it('ngOnInit should populate the errorMessage when getting a quote fails', () => {
    spyQuoteServiceGetQuote.and.returnValue( throwError('foo bar baz') );
    fixture.detectChanges();

    expect( spyQuoteServiceGetQuote.calls.count() ).toBe(1);
    expect( subjectUnderTest.errorMessage ).toEqual('foo bar baz');
    expect( subjectUnderTest.showLoadingQuote ).toBe(false);
    expect( spyChangeDetectorRefMarkForCheck ).toHaveBeenCalled();
  });


  it('ngOnDestroy should unsubscribe', () => {
    spyQuoteServiceGetQuote.and.returnValue( {
      subscribe: () => {
        return {
          unsubscribe: () => 'bar'
        };
      }
    });
    fixture.detectChanges();

    // subjectUnderTest.quoteServiceSubscription is private,
    // however i want to ensure that unsubscribe is called
    // tslint:disable: no-any
    spyOn((subjectUnderTest as any).quoteServiceSubscription, 'unsubscribe');

    subjectUnderTest.ngOnDestroy();

    // tslint:disable: no-any
    expect( (subjectUnderTest as any).quoteServiceSubscription.unsubscribe ).toHaveBeenCalled();
  });


  it('onThumbsClick should handle the vote if quote not voted before', () => {
    spyQuoteServiceGetQuote.and.returnValue( of(expectedQuote) );

    fixture.detectChanges();
    expect( subjectUnderTest.hasVotedThisQuote ).toBe(false);
    expect( subjectUnderTest.showLoadingVote ).toBe(false);
    expect( spyChangeDetectorRefMarkForCheck.calls.count() ).toBe(1);

    subjectUnderTest.onThumbsClick('1');

    if ( subjectUnderTest.quote ) {
      expect( subjectUnderTest.quote.numVotes ).toBe(101);
    }
    expect( subjectUnderTest.hasVotedThisQuote ).toBe(true);
    expect( spyChangeDetectorRefMarkForCheck.calls.count() ).toBe(3);
    expect( subjectUnderTest.showLoadingVote ).toBe(false);
  });


  it('onThumbsClick should do nothing if quote was voted before', () => {
    subjectUnderTest.hasVotedThisQuote = true;

    subjectUnderTest.onThumbsClick('1');

    expect( subjectUnderTest.showLoadingVote ).toBe(false);
    expect( spyChangeDetectorRefMarkForCheck ).not.toHaveBeenCalled();
    expect( spyQuoteServiceUpdateNumVotes ).not.toHaveBeenCalled();
  });

});
