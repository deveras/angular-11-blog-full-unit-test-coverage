export class BookModel
{
  public id:number;
  public title:string;
  public recomendationSummary:string;
  public author:string;
  public authorLink:string;
  public image:string;
  public body:string;
  public bookLink:string;
  public featured:boolean;
  public weight:number;
  public lastUpdate:string;
  public createDate:string;


  constructor() {
    this.id = 0;
    this.title = "";
    this.recomendationSummary = "";
    this.author = "";
    this.authorLink = "";
    this.image = "";
    this.body = "";
    this.bookLink = "";
    this.featured = false;
    this.weight = 1;
    this.lastUpdate = "";
    this.createDate = "";
  }

}
