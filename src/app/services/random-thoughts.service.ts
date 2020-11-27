import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { ThoughtModel, ThoughtAdapter } from '../models/thought-model';
import { environment } from '../../environments/environment.prod';


@Injectable(
  {
    providedIn: 'root'
  }
)
export class RandomThoughtsService
{
  private errorMessage:string = 'Failed to retrieve data from the server - RandomThoughtsService';


  constructor(
    private httpClient:HttpClient,
    private adapter:ThoughtAdapter,
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


  public getThought():Observable<ThoughtModel>
  {
    return this.httpClient.get<ThoughtModel>(
      environment.api.url + environment.api.thoughts.get
    ).pipe(
      map(
        (item:ThoughtModel) => this.adapter.adapt(item)
      ),
      catchError(
        (error:HttpErrorResponse) => {
          return throwError(this.handleError(error));
        }
      )
    );
  }

}