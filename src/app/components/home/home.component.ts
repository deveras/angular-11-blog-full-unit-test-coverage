import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { ArticlesService } from './../../services/articles.service';
import { ArticleModel } from '../../models/article-model';
import { BookshelfService } from './../../services/bookshelf.service';
import { BookModel } from '../../models/book-model';
import { TutorialsService } from './../../services/tutorials.service';
import { TutorialModel } from '../../models/tutorial-model';
import { Subscription } from 'rxjs';


@Component(
  {
    selector: 'blog-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  }
)
export class HomeComponent
  implements OnInit, OnDestroy
{
  private articlesServiceSubscription: Subscription = new Subscription();
  private bookshelfServiceSubscription: Subscription = new Subscription();
  private tutorialsServiceSubscription: Subscription = new Subscription();
  private collectionsReceived = 0;
  private errorsReceived = 0;
  public collection: (ArticleModel | BookModel | TutorialModel)[] = [];
  public errorMessage = '';
  public showLoading = true;


  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private articlesService: ArticlesService,
    private bookshelfService: BookshelfService,
    private tutorialsService: TutorialsService
  ) {}


  public ngOnInit(): void {
    this.articlesServiceSubscription = this.articlesService.getAll().subscribe(
      this.prepareSuccessResponse.bind(this),
      this.prepareErrorMessage.bind(this)
    );

    this.bookshelfServiceSubscription = this.bookshelfService.getAll().subscribe(
      this.prepareSuccessResponse.bind(this),
      this.prepareErrorMessage.bind(this)
    );

    this.tutorialsServiceSubscription = this.tutorialsService.getAll().subscribe(
      this.prepareSuccessResponse.bind(this),
      this.prepareErrorMessage.bind(this)
    );
  }


  public ngOnDestroy(): void {
    this.articlesServiceSubscription.unsubscribe();
    this.bookshelfServiceSubscription.unsubscribe();
    this.tutorialsServiceSubscription.unsubscribe();
  }


  private prepareSuccessResponse(response: (ArticleModel | BookModel | TutorialModel)[]): void {
    for (const index in response) {
      if (response.hasOwnProperty(index)) {
        this.collection.push(response[index]);
      }
    }
    this.collection.sort(this.sortCollection);
    this.collection = this.collection.slice(0, 5);
    this.showLoading = false;
    this.changeDetectorRef.markForCheck();
  }


  private prepareErrorMessage(): void {
    if (this.errorsReceived !== 2) {
      this.errorsReceived++;
    } else {
      this.errorMessage = 'Cannot connect to the server';
      this.showLoading = false;
      this.changeDetectorRef.markForCheck();
    }
  }


  private sortCollection(a: (ArticleModel | BookModel | TutorialModel), b: (ArticleModel | BookModel | TutorialModel)): number {
    if (a.lastUpdateDate.getTime() >= b.lastUpdateDate.getTime()) {
      return -1;
    }
    return 0;
  }


  public prepareLink(item: ArticleModel | BookModel | TutorialModel): string {
    switch (item.constructor.name) {
      case 'ArticleModel': return '/articles';
      case 'BookModel': return '/bookshelf';
      default: return '/tutorials';
    }
  }


  public trackByCollectionId(index: number, model: ArticleModel | BookModel | TutorialModel): number {
    return index;
  }
}
