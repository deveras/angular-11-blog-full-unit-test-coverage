import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { TutorialsService } from '../../services/tutorials.service';
import { TutorialModel } from '../../models/tutorial-model';
import { Subscription } from 'rxjs';


@Component(
  {
    selector: 'blog-tutorials',
    templateUrl: './tutorials.component.html',
    styleUrls: ['./tutorials.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  }
)
export class TutorialsComponent
  implements OnInit
{
  private subs:Subscription;
  public collection:TutorialModel[] = [];
  public errorMessage:string = "";
  public showLoading:boolean = true;


  constructor(
    private tutorialsService:TutorialsService,
    private changeDetectorRef:ChangeDetectorRef
  ) { }


  ngOnInit():void {
    this.subs = this.tutorialsService.getAll().subscribe(
      (response:TutorialModel[]) => {
        this.collection = response;
        this.showLoading = false;
        this.changeDetectorRef.markForCheck();
      },
      (errorMessage) => {
        this.errorMessage = errorMessage;
        this.showLoading = false;
        this.changeDetectorRef.markForCheck();
      }
    );
  }


  ngOnDestroy():void {
    if (this.subs && this.subs.unsubscribe) {
      this.subs.unsubscribe();
    }
  }

}
