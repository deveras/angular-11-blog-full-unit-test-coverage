import { Inject, Injectable, InjectionToken } from '@angular/core';


export const BROWSER_STORAGE = new InjectionToken<Storage>(
  'Browser Storage', {
    providedIn: 'root',
    factory: () => sessionStorage
  }
);


@Injectable(
  {
    providedIn: 'root'
  }
)
export class SessionStorageService
{
  constructor(
    @Inject(BROWSER_STORAGE) public storage: Storage
  ) { }


  public get(key: string): string | null {
    return this.storage.getItem(key);
  }


  public set(key: string, value: string): void {
    this.storage.setItem(key, value);
  }


  public remove(key: string): void {
    this.storage.removeItem(key);
  }


  public clear(): void {
    this.storage.clear();
  }

}
