import { Injectable } from "@angular/core";
import { Adapter } from "./adapter";


export class QuoteModel
{
  constructor(
    public id:number = 0,
    public quote:string = "",
    public author:string = "",
    public authorLink:string = "",
    public displayDate:Date = new Date(),
    public numVotes:number = 0,
    public lastUpdateDate:Date = new Date(),
    public createDate:Date = new Date()
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


@Injectable(
  {
    providedIn: "root"
  }
)
export class QuoteAdapter
  implements Adapter<QuoteModel>
{
  adapt(item:any):QuoteModel {
    return new QuoteModel(
      item.id,
      item.quote,
      item.author,
      item.authorLink,
      new Date(item.displayDate),
      item.numVotes,
      new Date(item.lastUpdate),
      new Date(item.createDate)
    )
  }
}
