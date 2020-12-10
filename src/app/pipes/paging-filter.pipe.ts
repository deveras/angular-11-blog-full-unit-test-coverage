import { Pipe, PipeTransform } from '@angular/core';
import { ArticleModel } from '../models/article-model';
import { BookModel } from '../models/book-model';
import { TutorialModel } from '../models/tutorial-model';


@Pipe(
  {
    name: 'pagingFilter'
  }
)
export class PagingFilterPipe
  implements PipeTransform
{

  public transform(
    value: (ArticleModel | BookModel | TutorialModel)[] | null,
    currentPageIndex: number,
    pageSize: number
  ): (ArticleModel | BookModel | TutorialModel)[] | null {
    if (value == null) { return null; }

    const resultsArray: (ArticleModel | BookModel | TutorialModel)[] = [];
    for (let i = currentPageIndex * pageSize; i < (currentPageIndex + 1) * pageSize; i++) {
      if (value[i]) {
        resultsArray.push(value[i]);
      }
    }
    return resultsArray;
  }

}
