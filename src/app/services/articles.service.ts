import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ArticleModel, ApiArticleInterface, ArticleAdapter } from '../models/article-model';
import { environment } from '../../environments/environment.prod';


@Injectable(
  {
    providedIn: 'root'
  }
)
export class ArticlesService
{
  private errorMessage = 'Failed to retrieve data from the server - ArticlesService';


  constructor(
    private adapter: ArticleAdapter,
    private httpClient: HttpClient
  ) {}


  private handleError(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` +
        `body was: ${error.message}`);
    }
    return this.errorMessage;
  }


  public getAll(): Observable<ArticleModel[]>
  {
    return this.httpClient.get<ApiArticleInterface[]>(
      environment.api.url + environment.api.articles.get
    ).pipe(
      map(
        (response: ApiArticleInterface[]): ArticleModel[] => response.map(
          (item: ApiArticleInterface): ArticleModel => this.adapter.adapt(item)
        )
      ),
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(this.handleError(error));
        }
      )
    );
  }


  public getById(id: number): Observable<ArticleModel>
  {
    return this.httpClient.get<ApiArticleInterface>(
      environment.api.url + environment.api.articles.get + '?' + id
    ).pipe(
      map(
        (item: ApiArticleInterface): ArticleModel => this.adapter.adapt(item)
      ),
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(this.handleError(error));
        }
      )
    );
  }
}
