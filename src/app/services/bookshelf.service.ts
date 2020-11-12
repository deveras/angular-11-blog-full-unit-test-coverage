import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { BookModel, BookAdapter } from '../models/book-model';
import { environment } from '../../environments/environment.prod';


@Injectable(
  {
    providedIn: 'root'
  }
)
export class BookshelfService {
  private collection:BookModel[];


  constructor(
    private httpClient:HttpClient,
    private adapter:BookAdapter) {
  }


  public getAll():Observable<BookModel[]> {
    return this.httpClient.get<BookModel[]>(environment.apiUrl + "bookshelf/read.php")
      .pipe(
        map(
          (response:any[]) => response.map(
            (item) => this.adapter.adapt(item)
          )
        )
      );
  }
}
