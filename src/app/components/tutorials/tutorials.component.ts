import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
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


  constructor(
    private titleService:Title,
    private tutorialsService:TutorialsService) {
  }

  ngOnInit():void {
    this.titleService.setTitle("Tutorials");

    this.tutorialsService.getAll().subscribe(
      (response:TutorialModel[]) => this.collection = response
    );
  }

}
