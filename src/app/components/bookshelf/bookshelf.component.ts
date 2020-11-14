import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy  } from '@angular/core';
import { BookshelfService } from '../../services/bookshelf.service';
import { BookModel } from '../../models/book-model';
import { Subscription } from 'rxjs';


@Component(
  {
    selector: 'blog-bookshelf',
    templateUrl: './bookshelf.component.html',
    styleUrls: ['./bookshelf.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  }
)
export class BookshelfComponent
  implements OnInit
{
  private subs:Subscription;
  public collection:BookModel[] = [];
  public errorMessage:string = "";
  public showLoading:boolean = true;


  constructor(
    private bookshelfService:BookshelfService,
    private changeDetectorRef:ChangeDetectorRef
  ) {}


  ngOnInit():void {
    this.subs = this.bookshelfService.getAll().subscribe(
      (response:BookModel[]) => {
        this.collection = response;
        this.showLoading = false;
        this.changeDetectorRef.markForCheck();
      },
      (errorMessage) => {
        this.errorMessage = errorMessage;
        this.showLoading = false;
        this.changeDetectorRef.markForCheck();
      }
    );
  }


  ngOnDestroy():void {
    if (this.subs && this.subs.unsubscribe) {
      this.subs.unsubscribe();
    }
  }

}
