import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { environment } from '../../environments/environment.prod';
import { ArticleModel, ArticleAdapter } from '../models/article-model';
import { BookModel, BookAdapter } from '../models/book-model';
import { TutorialModel, TutorialAdapter } from '../models/tutorial-model';


@Injectable(
  {
    providedIn: 'root'
  }
)
export class BaseService
{
  protected adapter:ArticleAdapter | BookAdapter | TutorialAdapter;
  protected httpClient:HttpClient;
  private errorMessage:string = 'Failed to retrieve data from the server';


  constructor(
    @Inject("urlEndpoint") private urlEndpoint:string
  ) { }


  private handleError(error:HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` +
        `body was: ${error.message}`);
    }
    return this.errorMessage;
  }


  public getAll():
    Observable<ArticleModel[]> | Observable<BookModel[]> | Observable<TutorialModel[]>
  {
    return this.httpClient.get<ArticleModel[] | BookModel[] | TutorialModel[]>(
      environment.apiUrl + this.urlEndpoint
    )
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



  public getById(id:number):Observable<ArticleModel> | Observable<BookModel> | Observable<TutorialModel>
  {
    return this.httpClient.get<ArticleModel | BookModel | TutorialModel>(
      environment.apiUrl + this.urlEndpoint + "?" + id
    )
      .pipe(
        map(
          (item:any) => this.adapter.adapt(item)
        ),
        catchError(
          (error:HttpErrorResponse) => {
            return throwError(this.handleError(error));
          }
        )
      );
  }

}
