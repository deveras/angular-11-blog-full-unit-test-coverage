import { Component, EventEmitter } from "@angular/core";


@Component(
  {
    selector: "blog-navigation",
    templateUrl: "./navigation.component.html",
    styleUrls: ["./navigation.component.scss"],
    inputs : [ "openMobileMenu" ],
    outputs : [ "openMobileMenuChange" ],
  }
)
export class NavigationComponent
{
  public openMobileMenu:boolean = false;
  public openMobileMenuChange = new EventEmitter<boolean>();


  constructor() {}


  public closeMobileMenu():void {
    this.openMobileMenuChange.emit(!this.openMobileMenu);
  }

}
