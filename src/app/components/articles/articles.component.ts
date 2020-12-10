import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ArticlesService } from '../../services/articles.service';
import { ArticleModel } from '../../models/article-model';
import { Subscription } from 'rxjs';


@Component(
  {
    selector: 'blog-articles',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  }
)
export class ArticlesComponent
  implements OnInit, OnDestroy
{
  private articlesServiceSubscription: Subscription = new Subscription();
  public collection: ArticleModel[] = [];
  public errorMessage = '';
  public showLoading = true;
  public currentPageIndex = 0;
  public pageSize = 5;


  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private articlesService: ArticlesService
  ) {
    // https://github.com/angular/angular/issues/13831
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }


  public ngOnInit(): void {
    this.articlesServiceSubscription = this.articlesService.getAll().subscribe(
      (response: ArticleModel[]) => {
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
    this.articlesServiceSubscription.unsubscribe();
  }


  public trackByCollectionId(index: number, model: ArticleModel): number {
    return model.id;
  }

}
