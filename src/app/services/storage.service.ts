// https://angular.io/guide/dependency-injection-in-action

import { Inject, Injectable, InjectionToken } from '@angular/core';


export const BROWSER_STORAGE = new InjectionToken<Storage>(
  'Browser Storage', {
    providedIn: 'root',
    factory: () => localStorage
  }
);


@Injectable(
  {
    providedIn: 'root'
  }
)
export class StorageService
{
  constructor(
    @Inject(BROWSER_STORAGE) public storage: Storage
  ) { }


  public get(key: string) {
    return this.storage.getItem(key);
  }


  public set(key: string, value: string) {
    this.storage.setItem(key, value);
  }


  public remove(key: string) {
    this.storage.removeItem(key);
  }


  public clear() {
    this.storage.clear();
  }

}
