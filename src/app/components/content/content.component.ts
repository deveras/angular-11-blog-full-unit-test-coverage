import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { BookshelfService } from './../../services/bookshelf.service';
import { TutorialsService } from './../../services/tutorials.service';
import { ArticlesService } from './../../services/articles.service';
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
  implements OnInit
{
  private serviceSubscription:Subscription;
  public errorMessage:string = "";
  public section:string = "";
  public content:any = "";
  public showLoading:boolean = true;


  constructor(
    private route:ActivatedRoute,
    private changeDetectorRef:ChangeDetectorRef,
    private titleService:Title,
    private bookshelfService:BookshelfService,
    private tutorialsService:TutorialsService,
    private articlesService:ArticlesService,
  ) {}


  ngOnInit(): void {
    this.section = this.route.snapshot.data.title;
    let serviceName = this.section.toLowerCase() + "Service";
    this.serviceSubscription = this[serviceName].getById( this.route.snapshot.params.id ).subscribe(
      (response) => {
        this.titleService.setTitle(response.title);
        this.content = response;
        this.showLoading = false;
        this.changeDetectorRef.markForCheck();
      },
      (errorMessage) => {
        this.errorMessage = errorMessage;
        this.showLoading = false;
        this.changeDetectorRef.markForCheck();
      }
    )
  }


  ngOnDestroy():void {
    if (this.serviceSubscription && this.serviceSubscription.unsubscribe) {
      this.serviceSubscription.unsubscribe();
    }
  }

}
