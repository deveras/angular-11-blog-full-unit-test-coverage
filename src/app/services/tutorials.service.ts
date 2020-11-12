import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { TutorialAdapter } from '../models/tutorial-model';


@Injectable(
  {
    providedIn: 'root'
  }
)
export class TutorialsService
  extends BaseService
{

  constructor(
    protected httpClient:HttpClient,
    protected adapter:TutorialAdapter)
  {
    super("tutorials/read.php");
  }

}
