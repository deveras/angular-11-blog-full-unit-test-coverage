import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ThoughtModel, ApiThoughtInterface, ThoughtAdapter } from '../models/thought-model';
import { environment } from '../../environments/environment.prod';


@Injectable(
  {
    providedIn: 'root'
  }
)
export class RandomThoughtsService
{
  private errorMessage = 'Failed to retrieve data from the server - RandomThoughtsService';


  constructor(
    private httpClient: HttpClient,
    private adapter: ThoughtAdapter,
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


  public getThought(): Observable<ThoughtModel>
  {
    return this.httpClient.get<ApiThoughtInterface>(
      environment.api.url + environment.api.thoughts.get
    ).pipe(
      map(
        (item: ApiThoughtInterface): ThoughtModel => this.adapter.adapt(item)
      ),
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(this.handleError(error));
        }
      )
    );
  }

}
