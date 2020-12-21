import { Injectable } from '@angular/core';
import { Adapter } from './adapter';


export class QuoteModel
{
  constructor(
    public id: number = 0,
    public quote: string = '',
    public author: string = '',
    public authorLink: string = '',
    public displayDate: Date = new Date(),
    public numVotes: number = 0,
    public lastUpdateDate: Date = new Date(),
    public createDate: Date = new Date()
  ) {
    this.id = id;
    this.quote = quote;
    this.author = author;
    this.authorLink = authorLink;
    this.displayDate = displayDate;
    this.numVotes = numVotes;
    this.lastUpdateDate = lastUpdateDate;
    this.createDate = createDate;
  }
}


export interface ApiQuoteInterface {
  id: number;
  quote: string;
  author: string;
  authorLink: string;
  displayDate: Date;
  numVotes: number;
  lastUpdate: Date;
  createDate: Date;
}


@Injectable(
  {
    providedIn: 'root'
  }
)
export class QuoteAdapter
  implements Adapter<ApiQuoteInterface, QuoteModel>
{
  public adapt(item: ApiQuoteInterface): QuoteModel {
    return new QuoteModel(
      Number(item.id),
      item.quote,
      item.author,
      item.authorLink,
      new Date(item.displayDate),
      item.numVotes,
      new Date(item.lastUpdate),
      new Date(item.createDate)
    );
  }
}
