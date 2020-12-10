import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy  } from '@angular/core';
import { Router } from '@angular/router';
import { BookshelfService } from '../../services/bookshelf.service';
import { BookModel } from '../../models/book-model';
import { Subscription } from 'rxjs';


@Component(
  {
    selector: 'blog-bookshelf',
    templateUrl: './bookshelf.component.html',
    styleUrls: ['./bookshelf.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  }
)
export class BookshelfComponent
  implements OnInit, OnDestroy
{
  private bookshelfServiceSubscription: Subscription = new Subscription();
  public collection: BookModel[] = [];
  public errorMessage = '';
  public showLoading = true;
  public currentPageIndex = 0;
  public pageSize = 5;


  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private bookshelfService: BookshelfService
  ) {
    // https://github.com/angular/angular/issues/13831
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }


  public ngOnInit(): void {
    this.bookshelfServiceSubscription = this.bookshelfService.getAll().subscribe(
      (response: BookModel[]) => {
        this.collection = response;
        this.showLoading = false;
        this.currentPageIndex = Number(this.router.url.split('/')[2]) || 0;
        this.changeDetectorRef.markForCheck();
      },
      (errorMessage) => {
        this.errorMessage = errorMessage;
        this.showLoading = false;
        this.changeDetectorRef.markForCheck();
      }
    );
  }


  public ngOnDestroy(): void {
    this.bookshelfServiceSubscription.unsubscribe();
  }


  public trackByCollectionId(index: number, model: BookModel): number {
    return model.id;
  }
}
