import { Component, OnInit } from '@angular/core';
import { TutorialsService } from '../../services/tutorials.service';
import { TutorialModel } from '../../models/tutorial-model';


@Component(
  {
    selector: 'blog-tutorials',
    templateUrl: './tutorials.component.html',
    styleUrls: ['./tutorials.component.scss']
  }
)
export class TutorialsComponent
  implements OnInit
{
  public collection:TutorialModel[] = [];
  public errorMessage:string = "";


  constructor(
    private tutorialsService:TutorialsService
  ) { }


  ngOnInit():void {
    this.tutorialsService.getAll().subscribe(
      (response:TutorialModel[]) => this.collection = response,
      (errorMessage) => this.errorMessage = errorMessage
    );
  }

}
