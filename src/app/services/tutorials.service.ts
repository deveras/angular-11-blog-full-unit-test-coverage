import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { TutorialModel, TutorialAdapter } from '../models/tutorial-model';
import { environment } from '../../environments/environment.prod';


@Injectable(
  {
    providedIn: 'root'
  }
)
export class TutorialsService
{
  private errorMessage = 'Failed to retrieve data from the server - TutorialsService';


  constructor(
    private adapter: TutorialAdapter,
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


  public getAll(): Observable<TutorialModel[]>
  {
    return this.httpClient.get<TutorialModel[]>(
      environment.api.url + environment.api.tutorials.get
    ).pipe(
      map(
        (response: any[]) => response.map(
          (item) => this.adapter.adapt(item)
        )
      ),
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(this.handleError(error));
        }
      )
    );
  }


  public getById(id: number): Observable<TutorialModel>
  {
    return this.httpClient.get<TutorialModel>(
      environment.api.url + environment.api.tutorials.get + '?' + id
    ).pipe(
      map(
        (item: any) => this.adapter.adapt(item)
      ),
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(this.handleError(error));
        }
      )
    );
  }

}
