import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleModel } from '../../models/article-model';
import { BookModel } from '../../models/book-model';
import { TutorialModel } from '../../models/tutorial-model';


export class PageModel {
  public pageIndex: number;

  constructor(index: number) {
    this.pageIndex = index;
  }

}


@Component(
  {
    selector: 'blog-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
  }
)
export class PaginationComponent
  implements OnInit
{
  @Input() public collection: (ArticleModel | TutorialModel | BookModel)[] = [];
  @Input() public pageSize = 5;
  @Input() public currentPageIndex = 0;
  @Input() public collectionType = 'Articles';

  public pages: PageModel[] = [];
  public firstRecord = 0;
  public lastRecord = 99;


  constructor(private router: Router) {}


  public ngOnInit(): void {
    this.calculateNoOfPages();
    this.firstRecord = this.currentPageIndex * this.pageSize + 1;
    this.lastRecord = this.getLastRecord();
  }


  private calculateNoOfPages(): void {
    const noOfPages = Math.ceil(this.collection.length / this.pageSize);
    this.pages = [];
    for (let i = 0; i < noOfPages; i++){
      this.pages.push( new PageModel(i) );
    }
  }


  private getLastRecord(): number {
    const maxLast = this.currentPageIndex * this.pageSize + this.pageSize;
    return (maxLast < this.collection.length) ? maxLast : this.collection.length;
  }


  public onPageIndexClicked(pageIndex: number): void {
    if (pageIndex >= 0 && pageIndex < this.pages.length) {
      this.router.navigate(
        ['/' + this.router.url.split('/')[1], pageIndex],
        { replaceUrl: true }
      );
    }
  }


  public trackByPagesId(index: number, model: PageModel): number {
    return index;
  }

}
