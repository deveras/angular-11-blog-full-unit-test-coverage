import { Pipe, PipeTransform } from '@angular/core';


@Pipe(
  {
    name: 'pagingFilter'
  }
)
export class PagingFilterPipe
  implements PipeTransform
{

  transform(value: unknown, currentPageIndex: number, pageSize: number): unknown {
    if(value == null) return null;

    let resultsArray = [];
    for (let i = currentPageIndex * pageSize; i < (currentPageIndex+1) * pageSize; i++) {
      if (value[i]) {
        resultsArray.push(value[i]);
      }
    }
    return resultsArray;
  }

}
