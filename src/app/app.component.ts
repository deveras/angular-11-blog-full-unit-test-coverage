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
  public openMobileMenu:boolean = false;


  constructor(
    private router:Router,
    private titleService:Title
  ) { }

  ngOnInit() {
    this.router.events.subscribe(
      (event) => {
        if (event instanceof ActivationEnd) {
          if (event.snapshot.data.title) {
            this.titleService.setTitle(event.snapshot.data.title)
          } else {
            this.titleService.setTitle("Blog");
          }
        }
      }
    );
  }
}
