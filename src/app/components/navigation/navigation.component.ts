import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';


@Component(
  {
    selector: 'blog-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  }
)
export class NavigationComponent
{
  @Input() public openMobileMenu = false;
  @Output() public openMobileMenuChange: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor() {}


  public closeMobileMenu(): void {
    this.openMobileMenuChange.emit(!this.openMobileMenu);
  }

}
