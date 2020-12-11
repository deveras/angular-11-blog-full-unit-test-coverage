import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { BreadcrumbsModel } from './models/breadcrumbs-model';


@Component(
  {
    selector: 'blog-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
  }
)
export class AppComponent
  implements OnInit
{
  public openMobileMenu = false;
  public showLoading = true;
  public breadcrumbs: BreadcrumbsModel[] = [];


  constructor(
    private router: Router,
    private titleService: Title
  ) { }


  public ngOnInit(): void {
    this.router.events.subscribe(
      (event) => {
        this.showLoading = true;
        if (event instanceof ActivationEnd) {
          this.breadcrumbs = [];
          if (event.snapshot.data.title) {
            this.titleService.setTitle(event.snapshot.data.title);
            this.breadcrumbs.push(
              new BreadcrumbsModel(
                event.snapshot.data.breadcrumbs.title,
                event.snapshot.data.breadcrumbs.route || undefined
              )
            );
          } else {
            this.titleService.setTitle('Blog');
            this.breadcrumbs.push( new BreadcrumbsModel('', '') );
          }
        }
        this.showLoading = false;
      }
    );
  }

}
