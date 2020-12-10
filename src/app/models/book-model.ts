import { Injectable } from '@angular/core';
import { Adapter } from './adapter';


export class BookModel
{
  constructor(
    public id: number = 0,
    public title: string = '',
    public recomendationSummary: string = '',
    public author: string = '',
    public authorLink: string = '',
    public image: string = '',
    public body: string = '',
    public bookLink: string = '',
    public featured: boolean = false,
    public weight: number = 1,
    public lastUpdateDate: Date = new Date(),
    public createDate: Date = new Date()
  ) {
    this.id = id;
    this.title = title;
    this.recomendationSummary = recomendationSummary;
    this.author = author;
    this.authorLink = authorLink;
    this.image = image;
    this.body = body;
    this.bookLink = bookLink;
    this.featured = featured;
    this.weight = weight;
    this.lastUpdateDate = lastUpdateDate;
    this.createDate = createDate;
  }
}


@Injectable(
  {
    providedIn: 'root'
  }
)
export class BookAdapter
  implements Adapter<BookModel>
{
  public adapt(item: any): BookModel {
    return new BookModel(
      item.id,
      item.title,
      item.recomendationSummary,
      item.author,
      item.authorLink,
      item.image,
      item.body,
      item.bookLink,
      item.featured,
      item.weight,
      new Date(item.lastUpdate),
      new Date(item.createDate)
    );
  }
}
