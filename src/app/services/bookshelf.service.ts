import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { BookModel, BookAdapter } from '../models/book-model';
import { environment } from '../../environments/environment.prod';


@Injectable(
  {
    providedIn: 'root'
  }
)
export class BookshelfService
{
  private errorMessage:string = 'Failed to retrieve data from the server';


  constructor(
    private adapter:BookAdapter,
    private httpClient:HttpClient
  ) {}


  private handleError(error:HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` +
        `body was: ${error.message}`);
    }
    return this.errorMessage;
  }


  public getAll():Observable<BookModel[]>
  {
    return this.httpClient.get<BookModel[]>(
      environment.api.url + environment.api.bookshelf.get
    ).pipe(
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


  public getById(id:number):Observable<BookModel>
  {
    return this.httpClient.get<BookModel>(
      environment.api.url + environment.api.bookshelf.get + "?" + id
    ).pipe(
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
