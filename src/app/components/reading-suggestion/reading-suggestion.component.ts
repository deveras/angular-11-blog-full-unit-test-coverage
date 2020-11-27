import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { BookshelfService } from '../../services/bookshelf.service';
import { BookModel } from '../../models/book-model';


@Component(
  {
    selector: 'blog-reading-suggestion',
    templateUrl: './reading-suggestion.component.html',
    styleUrls: ['./reading-suggestion.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  }
)
export class ReadingSuggestionComponent
  implements OnInit
{
  public showLoading:boolean = true;
  public bookModel?:BookModel;


  constructor(
    private changeDetectorRef:ChangeDetectorRef,
    private bookshelfService:BookshelfService
  ) { }


  ngOnInit(): void {
    this.bookshelfService.getRandom().subscribe(
      (response:BookModel) => {
        this.bookModel = response;
        this.showLoading = false;
        this.changeDetectorRef.markForCheck();
      }
    );
  }

}
