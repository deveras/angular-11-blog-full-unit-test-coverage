import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../services/articles.service';
import { ArticleModel } from '../../models/article-model';


@Component(
  {
    selector: 'blog-articles',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.scss']
  }
)
export class ArticlesComponent
  implements OnInit
{
  public collection:ArticleModel[] = [];
  public errorMessage:string = "";
  public showLoading:boolean = true;


  constructor(
    private articlesService:ArticlesService
  ) {}


  ngOnInit():void {
    this.articlesService.getAll().subscribe(
      (response:ArticleModel[]) => {
        this.collection = response;
        this.showLoading = false;
      },
      (errorMessage) => {
        this.errorMessage = errorMessage;
        this.showLoading = false;
      }
    );
  }

}
