import { Component } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';


@Component(
  {
    selector: 'blog-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
  }
)
export class AppComponent {
  public openMobileMenu = false;
  public breadcrumbsTitle = '';
  public breadcrumbsRoute = '';
  public showLoading = true;


  constructor(
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.router.events.subscribe(
      (event) => {
        this.showLoading = true;
        if (event instanceof ActivationEnd) {
          if (event.snapshot.data.title) {
            this.titleService.setTitle(event.snapshot.data.title);
            this.breadcrumbsTitle = event.snapshot.data.breadcrumbs.title;
            this.breadcrumbsRoute = event.snapshot.data.breadcrumbs.route || undefined;
          } else {
            this.titleService.setTitle('Blog');
            this.breadcrumbsTitle = '';
          }
        }
        this.showLoading = false;
      }
    );
  }
}
