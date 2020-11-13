import { Component } from '@angular/core';


@Component(
  {
    selector: 'blog-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss'],
    inputs: [ "crumbs" ]
  }
)
export class BreadcrumbsComponent
{
  public crumbs:any[] = [];


  constructor() { }

}
