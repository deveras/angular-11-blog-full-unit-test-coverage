import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RandomThoughtsService } from '../../services/random-thoughts.service';
import { ThoughtModel } from '../../models/thought-model';


@Component(
  {
    selector: 'blog-random-thoughts',
    templateUrl: './random-thoughts.component.html',
    styleUrls: ['./random-thoughts.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  }
)
export class RandomThoughtsComponent
  implements OnInit, OnDestroy
{
 private randomThoughtsServiceSubscription: Subscription = new Subscription();
  public showLoading = true;
  public thoughtModel?: ThoughtModel;


  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private randomThoughtsService: RandomThoughtsService
  ) { }


  public ngOnInit(): void {
    this.randomThoughtsServiceSubscription = this.randomThoughtsService.getThought().subscribe(
      (response) => {
        this.thoughtModel = response;
        this.showLoading = false;
        this.changeDetectorRef.markForCheck();
      },
      (error) => {
        this.thoughtModel = new ThoughtModel(0, 'Why can\'t apple fix their display arragement after each lock screen...', new Date());
        this.showLoading = false;
        this.changeDetectorRef.markForCheck();
      }
    );
  }


  public ngOnDestroy(): void {
    this.randomThoughtsServiceSubscription.unsubscribe();
  }

}
