import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleModel } from '../../models/article-model';
import { BookModel } from '../../models/book-model';
import { TutorialModel } from '../../models/tutorial-model';


export class Page {
  public pageIndex:number;

  constructor(index:number) {
    this.pageIndex = index;
  }

};


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
  @Input() collection:(ArticleModel | TutorialModel | BookModel)[] = [];
  @Input() pageSize:number = 5;
  @Input() currentPageIndex:number = 0;
  @Input() collectionType:string = "Articles";

  public pages:Page[] = [];
  public firstRecord:number = 0;
  public lastRecord:number = 99;


  constructor(private router:Router) {}


  ngOnInit(): void {
    this.calculateNoOfPages();
    this.firstRecord = this.currentPageIndex * this.pageSize + 1;
    this.lastRecord = this.getLastRecord();
  }


  private calculateNoOfPages():void {
    const noOfPages = Math.ceil(this.collection.length / this.pageSize);
    this.pages = [];
    for (let i = 0; i < noOfPages; i++){
      this.pages.push( new Page(i) );
    }
  }


  private getLastRecord() {
    const maxLast = this.currentPageIndex * this.pageSize + this.pageSize;
    return (maxLast < this.collection.length) ? maxLast : this.collection.length;
  }


  public onPageIndexClicked(pageIndex: number) {
    if (pageIndex >= 0 && pageIndex < this.pages.length) {
      this.router.navigate(
        ['/' + this.router.url.split("/")[1], pageIndex],
        { replaceUrl: true }
      );
    }
  }

}
