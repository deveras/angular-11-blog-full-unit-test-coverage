import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { SessionStorageService } from './session-storage.service';
import { BookModel, ApiBookInterface, BookAdapter } from '../models/book-model';
import { environment } from '../../environments/environment.prod';


@Injectable(
  {
    providedIn: 'root'
  }
)
export class BookshelfService
{
  private errorMessage = 'Failed to retrieve data from the server - BookshelfService';


  constructor(
    private adapter: BookAdapter,
    private httpClient: HttpClient,
    private sessionStorageService: SessionStorageService
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


  public getAll(): Observable<BookModel[]>
  {
    return this.httpClient.get<ApiBookInterface[]>(
      environment.api.url + environment.api.bookshelf.get
    ).pipe(
      map(
        (response: ApiBookInterface[]): BookModel[] => response.map(
          (item: ApiBookInterface): BookModel => this.adapter.adapt(item)
        )
      ),
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(this.handleError(error));
        }
      )
    );
  }


  public getById(id: number): Observable<BookModel>
  {
    return this.httpClient.get<ApiBookInterface>(
      environment.api.url + environment.api.bookshelf.get + '?' + id
    ).pipe(
      map(
        (item: ApiBookInterface): BookModel => this.adapter.adapt(item)
      ),
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(this.handleError(error));
        }
      )
    );
  }


  private isModelAlreadyInStorage(readingSuggestions: string | null, id: string): boolean {
    if (readingSuggestions) {
      return readingSuggestions.indexOf(id) !== -1;
    } else {
      return true;
    }
  }


  public getRandom(): Observable<BookModel>
  {
    let readingSuggestions = this.sessionStorageService.get('readingSuggestions') !== null
      ? this.sessionStorageService.get('readingSuggestions')
      : '';

    return this.httpClient.get<ApiBookInterface>(
      environment.api.url + environment.api.bookshelf.random + '?' + readingSuggestions
    ).pipe(
      map(
        (item: ApiBookInterface): BookModel => {
          const model = this.adapter.adapt(item);

          if (this.isModelAlreadyInStorage(readingSuggestions, model.id.toString())) {
            this.sessionStorageService.remove('readingSuggestions');
            readingSuggestions = '';
          }

          readingSuggestions = readingSuggestions === '' ? model.id.toString() : (readingSuggestions + ',' + model.id.toString());
          this.sessionStorageService.set('readingSuggestions', readingSuggestions);
          return model;
        }
      ),
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(this.handleError(error));
        }
      )
    );
  }

}
