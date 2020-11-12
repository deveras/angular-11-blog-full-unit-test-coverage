import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { BookAdapter } from '../models/book-model';


@Injectable(
  {
    providedIn: 'root'
  }
)
export class BookshelfService
  extends BaseService
{

  constructor(
    protected httpClient:HttpClient,
    protected adapter:BookAdapter)
  {
    super("bookshelf/read.php");
  }

}
