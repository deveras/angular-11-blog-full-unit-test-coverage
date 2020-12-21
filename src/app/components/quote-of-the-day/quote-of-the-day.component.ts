import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { QuoteModel } from './../../models/quote-model';
import { QuoteService } from './../../services/quote.service';
import { LocalStorageService } from './../../services/local-storage.service';
import { Subscription } from 'rxjs';


@Component(
  {
    selector: 'blog-quote-of-the-day',
    templateUrl: './quote-of-the-day.component.html',
    styleUrls: ['./quote-of-the-day.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  }
)
export class QuoteOfTheDayComponent
  implements OnInit, OnDestroy
{
  private quoteServiceSubscription: Subscription = new Subscription();
  public hasVotedThisQuote = false;
  public showLoadingQuote = true;
  public showLoadingVote = false;
  public quote?: QuoteModel;
  public errorMessage = '';


  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private quoteService: QuoteService,
    private localStorageService: LocalStorageService
  ) {}


  public ngOnInit(): void {
    this.quoteServiceSubscription = this.quoteService.getQuote().subscribe(
      (response: QuoteModel) => {
        this.quote = response;
        this.showLoadingQuote = false;
        this.hasVotedThisQuote = Number(this.localStorageService.get('quoteOfTheDay')) === this.quote.id;
        this.changeDetectorRef.markForCheck();
      },
      (errorMessage) => {
        this.errorMessage = errorMessage;
        this.showLoadingQuote = false;
        this.changeDetectorRef.markForCheck();
      }
    );
  }


  public ngOnDestroy(): void {
    this.quoteServiceSubscription.unsubscribe();
  }


  public onThumbsClick(value: string): void {
    if (!this.hasVotedThisQuote && this.quote) {
      this.showLoadingVote = true;
      this.changeDetectorRef.markForCheck();

      this.quote.numVotes += Number(value);
      this.quoteService.updateNumVotes(value, this.quote.id);
      this.hasVotedThisQuote = true;
      this.showLoadingVote = false;
      this.changeDetectorRef.markForCheck();
    }
  }
}
