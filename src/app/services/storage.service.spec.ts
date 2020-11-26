import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';


describe('StorageService', () => {
  let store = {};
  const mockLocalStorage = {
    getItem: (key:string):string => {
      return key in store ? store[key] : null;
    },
    setItem: (key:string, value:string):void => {
      store[key] = `${value}`;
    },
    removeItem: (key:string):void => {
      delete store[key];
    },
    clear: ():void => {
      store = {};
    }
  };
  let subjectUnderTest:StorageService;


  beforeEach(() => {
    TestBed.configureTestingModule({});
    subjectUnderTest = TestBed.inject(StorageService);

    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);
  });


  afterEach(() => {
    store = {};
  });


  it('should be created', () => {
    expect( subjectUnderTest ).toBeTruthy();
  });


  it('get return nothing if key does not exist', () => {
    expect( subjectUnderTest.get("foo") ).toBe(null);
  });


  it('set should set key foo with value bar', () => {
    subjectUnderTest.set("foo", "bar");

    expect( subjectUnderTest.get("foo") ).toBe("bar");
  });


  it('remove should delete key from storage', () => {
    subjectUnderTest.set("foo", "bar");

    subjectUnderTest.remove("foo")

    expect( subjectUnderTest.get("foo") ).toBe(null);
  });


  it('remove should do nothing when removing a key that does not exist', () => {
    subjectUnderTest.set("foo", "bar");

    subjectUnderTest.remove("baz")

    expect( subjectUnderTest.get("foo") ).toBe("bar");
  });


  it('clear should remove everything from storage', () => {
    subjectUnderTest.set("foo", "bar");
    subjectUnderTest.set("bar", "baz");

    subjectUnderTest.clear();

    expect ( subjectUnderTest.get("foo") ).toBe(null);
    expect ( subjectUnderTest.get("bar") ).toBe(null);
  });

});
