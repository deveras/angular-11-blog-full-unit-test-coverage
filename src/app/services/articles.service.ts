import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map  } from "rxjs/operators";
import { ArticleModel, ArticleAdapter } from '../models/article-model';
import { environment } from '../../environments/environment.prod';


@Injectable(
  {
    providedIn: 'root'
  }
)
export class ArticlesService
{
  private errorMessage:string = 'Failed to retrieve articles from the server';


  constructor(
    private httpClient:HttpClient,
    private adapter:ArticleAdapter) {
  }


  private handleError(error:HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` +
        `body was: ${error.message}`);
    }
    return this.errorMessage;
  }


  public getAll():Observable<ArticleModel[]> {
    return this.httpClient.get<ArticleModel[]>(environment.apiUrl + "articles/read.php")
      .pipe(
        map(
          (response:any[]) => response.map(
            (item) => this.adapter.adapt(item)
          )
        ),
        catchError(
          (error:HttpErrorResponse) => {
            return throwError(this.handleError(error));
          }
        )
      );
  }
}
