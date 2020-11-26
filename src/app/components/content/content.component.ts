import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { BookshelfService } from './../../services/bookshelf.service';
import { TutorialsService } from './../../services/tutorials.service';
import { ArticlesService } from './../../services/articles.service';
import { ArticleModel } from '../../models/article-model';
import { BookModel } from '../../models/book-model';
import { TutorialModel } from '../../models/tutorial-model';
import { Subscription } from 'rxjs';


@Component(
  {
    selector: 'blog-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  }
)
export class ContentComponent
  implements OnInit, OnDestroy
{
  private serviceSubscription:Subscription = new Subscription();
  public errorMessage:string = "";
  public section:string = "";
  public content:any = "";
  public showLoading:boolean = true;


  constructor(
    private route:ActivatedRoute,
    private changeDetectorRef:ChangeDetectorRef,
    private titleService:Title,
    private articlesService:ArticlesService,
    private bookshelfService:BookshelfService,
    private tutorialsService:TutorialsService
  ) {}


  ngOnInit():void {
    this.section = this.route.snapshot.data.title;
    let serviceName = this.section.toLowerCase() + "Service";
    let service:ArticlesService | BookshelfService | TutorialsService;

    switch(serviceName) {
      case "articlesService":
        service = this.articlesService;
        break;
      case "bookshelfService":
        service = this.bookshelfService;
        break;
      default:
        service = this.tutorialsService;
        break;
    }

    this.serviceSubscription = service.getById( this.route.snapshot.params.id ).subscribe(
      (response:ArticleModel | TutorialModel | BookModel) => {
        this.titleService.setTitle(response.title);
        this.content = response;
        this.showLoading = false;
        this.changeDetectorRef.markForCheck();
      },
      (errorMessage:string) => {
        this.errorMessage = errorMessage;
        this.showLoading = false;
        this.changeDetectorRef.markForCheck();
      }
    );
  }


  ngOnDestroy():void {
    if (this.serviceSubscription && this.serviceSubscription.unsubscribe) {
      this.serviceSubscription.unsubscribe();
    }
  }

}
