import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


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
  @Input() collection:any[];
  @Input() pageSize:number;
  @Input() currentPageIndex:number;
  @Input() collectionType:string;

  public pages:any[] = [];
  public firstRecord:number;
  public lastRecord:number;


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
      this.pages.push({ pageIndex: i})
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
