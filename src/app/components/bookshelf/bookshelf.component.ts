import { Component, OnInit } from '@angular/core';
import { BookshelfService } from '../../services/bookshelf.service';
import { BookModel } from '../../models/book-model';


@Component(
  {
    selector: 'blog-bookshelf',
    templateUrl: './bookshelf.component.html',
    styleUrls: ['./bookshelf.component.scss']
  }
)
export class BookshelfComponent
  implements OnInit
{
  public collection:BookModel[] = [];
  public errorMessage:string = "";


  constructor(
    private bookshelfService:BookshelfService
  ) {}


  ngOnInit():void {
    this.bookshelfService.getAll().subscribe(
      (response:BookModel[]) => this.collection = response,
      (errorMessage) => this.errorMessage = errorMessage
    );
  }

}
