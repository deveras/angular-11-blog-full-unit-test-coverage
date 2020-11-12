import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
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


  constructor(
    private titleService:Title,
    private articlesService:ArticlesService) {
  }


  ngOnInit():void {
    this.titleService.setTitle("Articles");

    this.articlesService.getAll().subscribe(
      (response:ArticleModel[]) => this.collection = response
    );
  }

}
