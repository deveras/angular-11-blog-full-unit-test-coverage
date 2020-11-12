import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { ArticleAdapter } from '../models/article-model';


@Injectable(
  {
    providedIn: 'root'
  }
)
export class ArticlesService
  extends BaseService
{

  constructor(
    protected httpClient:HttpClient,
    protected adapter:ArticleAdapter)
  {
    super("articles/read.php");
  }

}
