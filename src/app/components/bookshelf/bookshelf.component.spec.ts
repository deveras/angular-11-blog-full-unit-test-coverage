import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookshelfComponent } from './bookshelf.component';
import { Title } from '@angular/platform-browser';
import { BookshelfService } from './../../services/bookshelf.service';
import { of } from 'rxjs';


describe('BookshelfComponent', () => {
  const expectedBooks = [ {
    id: 1, title: "foo", recomendationSummary: "baz", author: "foo",
    authorLink: "bar", image: "baz", body: "foo", bookLink: "bar",
    featured: false, weight: 1, lastUpdateDate: new Date(),
    createDate: new Date()
  }];
  const BookshelfServiceStub = {
    getAll: () => of(expectedBooks)
  };

  let fixture: ComponentFixture<BookshelfComponent>;
  let component: BookshelfComponent;
  let titleService:Title;
  let spyTitleServiceSet:jasmine.Spy;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookshelfComponent ],
      providers: [
        Title,
        { provide: BookshelfService, useValue: BookshelfServiceStub }
      ]
    });
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(BookshelfComponent);
    component = fixture.componentInstance;
    titleService = TestBed.inject(Title);
    spyTitleServiceSet = spyOn(titleService, "setTitle");
    fixture.detectChanges();
  });


  it('should create component', () => {
    expect( component ).toBeTruthy();
  });


  it('should have 1 public property', () => {
    expect( component.collection ).toBeDefined();
  });


  it('ngOnInit should set the page title to Bookshelf', () => {
    expect( spyTitleServiceSet.calls.count() ).toBe(1);
    expect( spyTitleServiceSet ).toHaveBeenCalledWith("Bookshelf");
  });


  it('ngOnInit should collect all books onInit if successfull', () => {
    expect( component.collection ).toEqual(expectedBooks);
  });

});
