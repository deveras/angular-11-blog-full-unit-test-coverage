import { Component, ChangeDetectionStrategy } from '@angular/core';


@Component(
  {
    selector: 'blog-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss'],
    inputs: [ 'crumbs' ],
    changeDetection: ChangeDetectionStrategy.OnPush
  }
)
export class BreadcrumbsComponent
{
  public crumbs: any[] = [];


  constructor() { }

}
