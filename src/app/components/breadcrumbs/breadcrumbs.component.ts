import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { BreadcrumbsModel } from '../../models/breadcrumbs-model';


@Component(
  {
    selector: 'blog-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  }
)
export class BreadcrumbsComponent
{
  @Input() public crumbs: BreadcrumbsModel[] = [];


  constructor() { }

}
