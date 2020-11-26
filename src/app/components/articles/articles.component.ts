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
  private articlesServiceSubscription:Subscription = new Subscription();
  public collection:ArticleModel[] = [];
  public errorMessage:string = "";
  public showLoading:boolean = true;
  public currentPageIndex:number = 0;
  public pageSize:number = 5;


  constructor(
    private router:Router,
    private changeDetectorRef:ChangeDetectorRef,
    private articlesService:ArticlesService
  ) {
    // https://github.com/angular/angular/issues/13831
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }


  ngOnInit():void {
    this.articlesServiceSubscription = this.articlesService.getAll().subscribe(
      (response:ArticleModel[]) => {
        this.collection = response;
        this.showLoading = false;
        this.currentPageIndex = Number(this.router.url.split("/")[2]) || 0;
        this.changeDetectorRef.markForCheck();
      },
      (errorMessage) => {
        this.errorMessage = errorMessage;
        this.showLoading = false;
        this.changeDetectorRef.markForCheck();
      }
    );
  }


  ngOnDestroy():void {
    if (this.articlesServiceSubscription && this.articlesServiceSubscription.unsubscribe) {
      this.articlesServiceSubscription.unsubscribe();
    }
  }

}
