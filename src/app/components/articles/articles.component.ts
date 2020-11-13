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


  constructor(
    private articlesService:ArticlesService
  ) {}


  ngOnInit():void {
    this.articlesService.getAll().subscribe(
      (response:ArticleModel[]) => this.collection = response,
      (errorMessage) => this.errorMessage = errorMessage
    );
  }

}
