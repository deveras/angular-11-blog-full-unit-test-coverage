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


export interface ApiBookInterface {
  id: number;
  title: string;
  recomendationSummary: string;
  author: string;
  authorLink: string;
  image: string;
  body: string;
  bookLink: string;
  featured: boolean;
  weight: number;
  lastUpdate: Date;
  createDate: Date;
}


@Injectable(
  {
    providedIn: 'root'
  }
)
export class BookAdapter
  implements Adapter<ApiBookInterface, BookModel>
{
  public adapt(item: ApiBookInterface): BookModel {
    return new BookModel(
      Number(item.id),
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
