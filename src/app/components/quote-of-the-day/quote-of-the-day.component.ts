import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { QuoteModel } from './../../models/quote-model';
import { QuoteService } from './../../services/quote.service';
import { StorageService } from './../../services/storage.service';
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
  private quoteServiceSubscription:Subscription;
  public quote:QuoteModel;
  public hasVotedThisQuote:boolean = false;
  public showLoadingQuote:boolean = true;
  public showLoadingVote:boolean = false;
  public errorMessage:string = "";


  constructor(
    private changeDetectorRef:ChangeDetectorRef,
    private quoteService:QuoteService,
    private storageService:StorageService
  ) { }


  ngOnInit(): void {
    this.quoteServiceSubscription = this.quoteService.getQuote().subscribe(
      (response:QuoteModel) => {
        this.quote = response;
        this.showLoadingQuote = false;
        this.hasVotedThisQuote = Number(this.storageService.get("quoteOfTheDay")) === this.quote.id;
        this.changeDetectorRef.markForCheck();
      },
      (errorMessage) => {
        this.errorMessage = errorMessage;
        this.showLoadingQuote = false;
        this.changeDetectorRef.markForCheck();
      }
    );
  }


  ngOnDestroy():void {
    if (this.quoteServiceSubscription && this.quoteServiceSubscription.unsubscribe) {
      this.quoteServiceSubscription.unsubscribe();
    }
  }


  public onThumbsClick (value:number):void {
    if (!this.hasVotedThisQuote) {
      this.showLoadingVote = true;
      this.changeDetectorRef.markForCheck();

      this.quote.numVotes += value;
      this.quoteService.updateNumVotes(value, this.quote.id);
      this.hasVotedThisQuote = true;
      this.showLoadingVote = false;
      this.changeDetectorRef.markForCheck();
    }
  }
}
