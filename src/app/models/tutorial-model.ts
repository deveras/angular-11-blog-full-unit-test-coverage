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


export interface ApiTutorialInterface {
  id: number;
  title: string;
  recomendationSummary: string;
  body: string;
  lastUpdate: Date;
  createDate: Date;
}


@Injectable(
  {
    providedIn: 'root'
  }
)
export class TutorialAdapter
  implements Adapter<ApiTutorialInterface, TutorialModel>
{
  public adapt(item: ApiTutorialInterface): TutorialModel {
    return new TutorialModel(
      Number(item.id),
      item.title,
      item.recomendationSummary,
      item.body,
      new Date(item.lastUpdate),
      new Date(item.createDate)
    );
  }
}
