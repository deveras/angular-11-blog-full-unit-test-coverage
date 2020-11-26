import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { StorageService } from './storage.service';
import { QuoteModel, QuoteAdapter } from '../models/quote-model';
import { environment } from '../../environments/environment.prod';


@Injectable(
  {
    providedIn: 'root'
  }
)
export class QuoteService
{
  private errorMessage:string = 'Failed to retrieve data from the server';


  constructor(
    private httpClient:HttpClient,
    private adapter:QuoteAdapter,
    private storageService:StorageService
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


  public getQuote():Observable<QuoteModel>
  {
    return this.httpClient.get<QuoteModel>(
      environment.api.url + environment.api.quotes.get
    )
      .pipe(
        map(
          (item:QuoteModel) => this.adapter.adapt(item)
        ),
        catchError(
          (error:HttpErrorResponse) => {
            return throwError(this.handleError(error));
          }
        )
      );
  }


  public updateNumVotes(value:number, quoteId:number) {
    var postData: any = new FormData();
    postData.append("id", quoteId);
    postData.append("value", value);

    this.httpClient.post(environment.api.url + environment.api.quotes.votes, postData)
      .pipe(
        catchError(
          (error:HttpErrorResponse) => {
            return throwError(this.handleError(error));
          }
        )
      ).subscribe(
        (response) => this.storageService.set("quoteOfTheDay", quoteId.toString())
      );
  }

}
