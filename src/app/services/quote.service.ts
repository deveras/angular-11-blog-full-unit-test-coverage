import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import { QuoteModel, ApiQuoteInterface, QuoteAdapter } from '../models/quote-model';
import { environment } from '../../environments/environment.prod';


@Injectable(
  {
    providedIn: 'root'
  }
)
export class QuoteService
{
  private errorMessage = 'Failed to retrieve data from the server - QuoteService';


  constructor(
    private httpClient: HttpClient,
    private adapter: QuoteAdapter,
    private localStorageService: LocalStorageService
  ) { }


  private handleError(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` +
        `body was: ${error.message}`);
    }
    return this.errorMessage;
  }


  public getQuote(): Observable<QuoteModel>
  {
    return this.httpClient.get<ApiQuoteInterface>(
      environment.api.url + environment.api.quotes.get
    )
      .pipe(
        map(
          (item: ApiQuoteInterface): QuoteModel => this.adapter.adapt(item)
        ),
        catchError(
          (error: HttpErrorResponse) => {
            return throwError(this.handleError(error));
          }
        )
      );
  }


  public updateNumVotes(value: string, quoteId: number): void {
    const postData: FormData = new FormData();
    postData.append('id', quoteId.toString());
    postData.append('value', value);

    this.httpClient.post(environment.api.url + environment.api.quotes.votes, postData)
      .subscribe(
        (response) => this.localStorageService.set('quoteOfTheDay', quoteId.toString()),
        (error: HttpErrorResponse) => {
          return throwError(this.handleError(error));
        }
      );
  }

}
