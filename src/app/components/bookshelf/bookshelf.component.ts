import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
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


  constructor(
    private titleService:Title,
    private bookshelfService:BookshelfService) {
  }


  ngOnInit():void {
    this.titleService.setTitle("Bookshelf");

    this.bookshelfService.getAll().subscribe(
      (response:BookModel[]) => this.collection = response
    );
  }

}
