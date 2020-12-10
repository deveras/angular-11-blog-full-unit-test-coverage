import { Component, ChangeDetectionStrategy, EventEmitter } from '@angular/core';


@Component(
  {
    selector: 'blog-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    inputs : [ 'openMobileMenu' ],
    outputs : [ 'openMobileMenuChange' ],
    changeDetection: ChangeDetectionStrategy.OnPush
  }
)
export class NavigationComponent
{
  public openMobileMenu = false;
  public openMobileMenuChange = new EventEmitter<boolean>();


  constructor() {}


  public closeMobileMenu(): void {
    this.openMobileMenuChange.emit(!this.openMobileMenu);
  }

}
