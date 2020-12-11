import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { BookshelfService } from '../../services/bookshelf.service';
import { BookModel } from '../../models/book-model';
import { Subscription } from 'rxjs';


@Component(
  {
    selector: 'blog-reading-suggestion',
    templateUrl: './reading-suggestion.component.html',
    styleUrls: ['./reading-suggestion.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  }
)
export class ReadingSuggestionComponent
  implements OnInit, OnDestroy
{
  private bookshelfServiceSubscription: Subscription = new Subscription();
  public showLoading = true;
  public bookModel?: BookModel;


  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private bookshelfService: BookshelfService
  ) { }


  public ngOnInit(): void {
    this.bookshelfServiceSubscription = this.bookshelfService.getRandom().subscribe(
      (response: BookModel) => {
        this.bookModel = response;
        this.showLoading = false;
        this.changeDetectorRef.markForCheck();
      }
    );
  }


  public ngOnDestroy(): void {
    this.bookshelfServiceSubscription.unsubscribe();
  }

}
