import { Pipe, PipeTransform } from '@angular/core';


@Pipe(
  {
    name: 'slug'
  }
)
export class SlugPipe
  implements PipeTransform
{

  public transform(input: string): string {
    return input.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }

}
