export class BreadcrumbsModel
{
  constructor(
    public title: string = '',
    public route: string = ''
  ) {
    this.title = title;
    this.route = route;
  }

}
