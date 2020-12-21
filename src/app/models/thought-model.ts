import { Injectable } from '@angular/core';
import { Adapter } from './adapter';

export class ThoughtModel
{
  constructor(
    public id: number = 0,
    public thought: string = '',
    public createDate: Date = new Date()
  ) {
    this.id = id;
    this.thought = thought;
    this.createDate = createDate;
  }
}


export interface ApiThoughtInterface {
  id: number;
  thought: string;
  createDate: Date;
}


@Injectable(
  {
    providedIn: 'root'
  }
)
export class ThoughtAdapter
  implements Adapter<ApiThoughtInterface, ThoughtModel>
{
  public adapt(item: ApiThoughtInterface): ThoughtModel {
    return new ThoughtModel(
      item.id,
      item.thought,
      new Date(item.createDate)
    );
  }
}
