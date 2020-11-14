import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
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
  implements OnInit
{
  private subs:Subscription;
  public collection:ArticleModel[] = [];
  public errorMessage:string = "";
  public showLoading:boolean = true;


  constructor(
    private articlesService:ArticlesService,
    private changeDetectorRef:ChangeDetectorRef
  ) {}


  ngOnInit():void {
    this.subs = this.articlesService.getAll().subscribe(
      (response:ArticleModel[]) => {
        this.collection = response;
        this.showLoading = false;
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
    if (this.subs && this.subs.unsubscribe) {
      this.subs.unsubscribe();
    }
  }

}
