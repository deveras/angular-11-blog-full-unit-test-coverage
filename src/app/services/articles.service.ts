import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { ArticleModel, ArticleAdapter } from '../models/article-model';
import { environment } from '../../environments/environment.prod';


@Injectable(
  {
    providedIn: 'root'
  }
)
export class ArticlesService {
  private collection:ArticleModel[];


  constructor(
    private httpClient:HttpClient,
    private adapter:ArticleAdapter) {
  }


  public getAll():Observable<ArticleModel[]> {
    return this.httpClient.get<ArticleModel[]>(environment.apiUrl + "articles/read.php")
      .pipe(
        map(
          (response:any[]) => response.map(
            (item) => this.adapter.adapt(item)
          )
        )
      );
  }
}
