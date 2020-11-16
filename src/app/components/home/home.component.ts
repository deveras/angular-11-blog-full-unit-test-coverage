import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { ArticlesService } from './../../services/articles.service';
import { ArticleModel } from '../../models/article-model';
import { BookshelfService } from './../../services/bookshelf.service';
import { BookModel } from '../../models/book-model';
import { TutorialsService } from './../../services/tutorials.service';
import { TutorialModel } from '../../models/tutorial-model';
import { Subscription } from 'rxjs';


@Component(
  {
    selector: 'blog-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  }
)
export class HomeComponent
  implements OnInit
{
  private articlesServiceSubscription:Subscription;
  private bookshelfServiceSubscription:Subscription;
  private tutorialsServiceSubscription:Subscription;
  private collectionsReceived:number = 0;
  private errorsReceived:number = 0;
  public collection:any[] = [];
  public errorMessage:string = "";
  public showLoading:boolean = true;


  constructor(
    private changeDetectorRef:ChangeDetectorRef,
    private articlesService:ArticlesService,
    private bookshelfService:BookshelfService,
    private tutorialsService:TutorialsService
  ) { }


  ngOnInit(): void {
    this.articlesServiceSubscription = this.articlesService.getAll().subscribe(
      this.prepareSuccessResponse.bind(this),
      this.prepareErrorMessage.bind(this)
    );

    this.bookshelfServiceSubscription = this.bookshelfService.getAll().subscribe(
      this.prepareSuccessResponse.bind(this),
      this.prepareErrorMessage.bind(this)
    );

    this.tutorialsServiceSubscription = this.tutorialsService.getAll().subscribe(
      this.prepareSuccessResponse.bind(this),
      this.prepareErrorMessage.bind(this)
    );
  }


  ngOnDestroy():void {
    if (this.articlesServiceSubscription && this.articlesServiceSubscription.unsubscribe) {
      this.articlesServiceSubscription.unsubscribe();
    }
    if(this.bookshelfServiceSubscription && this.bookshelfServiceSubscription.unsubscribe) {
      this.bookshelfServiceSubscription.unsubscribe();
    }
    if(this.tutorialsServiceSubscription && this.tutorialsServiceSubscription.unsubscribe) {
      this.tutorialsServiceSubscription.unsubscribe();
    }
  }


  private prepareSuccessResponse(response:ArticleModel[]):void {
    for (let index in response) {
      this.collection.push(response[index]);
    }
    this.collection.sort(this.sortCollection);
    this.collection = this.collection.slice(0, 5);
    this.showLoading = false;
    this.changeDetectorRef.markForCheck();
  }


  private prepareErrorMessage() {
    if (this.errorsReceived !== 2) {
      this.errorsReceived++;
    } else {
      this.errorMessage = "Cannot connect to the server";
      this.showLoading = false;
      this.changeDetectorRef.markForCheck();
    }
  }


  private sortCollection(a,b) {
    if (parseInt(a.lastUpdateDate.getTime(), 10) >= parseInt(b.lastUpdateDate.getTime(),10)) {
      return -1;
    }
    return 0;
  }


  public prepareLink(item:ArticleModel | BookModel | TutorialModel):string {
    switch(item.constructor.name) {
      case "ArticleModel": return "/articles";
      case "BookModel": return "/bookshelf";
      default: return "/tutorials";
    }
  }
}
