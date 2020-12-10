import { Injectable } from '@angular/core';
import { Adapter } from './adapter';


export class TutorialModel
{
  constructor(
    public id: number = 0,
    public title: string = '',
    public recomendationSummary: string = '',
    public body: string = '',
    public lastUpdateDate: Date = new Date(),
    public createDate: Date = new Date()
  ) {
    this.id = id;
    this.title = title;
    this.recomendationSummary = recomendationSummary;
    this.body = body;
    this.lastUpdateDate = lastUpdateDate;
    this.createDate = createDate;
  }

}


@Injectable(
  {
    providedIn: 'root'
  }
)
export class TutorialAdapter
  implements Adapter<TutorialModel>
{
  adapt(item: any): TutorialModel {
    return new TutorialModel(
      item.id,
      item.title,
      item.recomendationSummary,
      item.body,
      new Date(item.lastUpdate),
      new Date(item.createDate)
    );
  }
}
