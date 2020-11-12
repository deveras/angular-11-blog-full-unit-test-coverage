import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { TutorialModel, TutorialAdapter } from '../models/tutorial-model';
import { environment } from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class TutorialsService {
  private collection:TutorialModel[];


  constructor(
    private httpClient:HttpClient,
    private adapter:TutorialAdapter) {
  }


  public getAll():Observable<TutorialModel[]> {
    return this.httpClient.get<TutorialModel[]>(environment.apiUrl + "tutorials/read.php")
      .pipe(
        map(
          (response:any[]) => response.map(
            (item) => this.adapter.adapt(item)
          )
        )
      );
  }
}
