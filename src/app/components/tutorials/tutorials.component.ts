import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
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
  implements OnInit, OnDestroy
{
  private tutorialsServiceSubscription: Subscription = new Subscription();
  public collection: TutorialModel[] = [];
  public errorMessage = '';
  public showLoading = true;
  public currentPageIndex = 0;
  public pageSize = 5;


  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private tutorialsService: TutorialsService
  ) {}


  public ngOnInit(): void {
    // https://github.com/angular/angular/issues/13831
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.tutorialsServiceSubscription = this.tutorialsService.getAll().subscribe(
      (response: TutorialModel[]) => {
        this.collection = response;
        this.showLoading = false;
        this.currentPageIndex = Number(this.router.url.split('/')[2]) || 0;
        this.changeDetectorRef.markForCheck();
      },
      (errorMessage) => {
        this.errorMessage = errorMessage;
        this.showLoading = false;
        this.changeDetectorRef.markForCheck();
      }
    );
  }


  public ngOnDestroy(): void {
    this.tutorialsServiceSubscription.unsubscribe();
  }


  public trackByCollectionId(index: number, model: TutorialModel): number {
    return model.id;
  }

}
