import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { PaginationComponent } from './pagination.component';


describe('PaginationComponent', () => {
  let subjectUnderTest:PaginationComponent;
  let fixture:ComponentFixture<PaginationComponent>;
  let routerStub = {
    navigate: jasmine.createSpy("navigate"),
    url: "/foo/1"
  };
  const mockCollection = [
    { title: "foo" }, { title: "bar"}, { title: "baz" },
    { title: "fooFoo" }, { title: "fooBar"}, { title: "fooBaz" },
    { title: "barFoo" }, { title: "barBar"}, { title: "barBaz" },
    { title: "bazFoo" }, { title: "bazBar"}, { title: "bazBaz" }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationComponent ],
      providers: [
        { provide: Router, useValue: routerStub }
      ]
    });
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    subjectUnderTest = fixture.componentInstance;

    subjectUnderTest.collection = mockCollection;
    subjectUnderTest.pageSize = 5;
    subjectUnderTest.currentPageIndex = 0;
    subjectUnderTest.collectionType = "baz";

    fixture.detectChanges();
  });


  it('should create the component', () => {
    expect(subjectUnderTest).toBeTruthy();
  });


  it("should have the following properties", () => {
    expect( subjectUnderTest.collection ).toBeDefined();
    expect( subjectUnderTest.collection ).toEqual(mockCollection)
    expect( subjectUnderTest.pageSize ).toBeDefined();
    expect( subjectUnderTest.pageSize ).toBe(5);
    expect( subjectUnderTest.currentPageIndex ).toBeDefined();
    expect( subjectUnderTest.currentPageIndex ).toBe(0);
    expect( subjectUnderTest.collectionType ).toBeDefined();
    expect( subjectUnderTest.collectionType ).toBe("baz");
    expect( subjectUnderTest.pages ).toBeDefined();
    expect( subjectUnderTest.pages ).toEqual(
      [ { pageIndex: 0 }, { pageIndex: 1 }, { pageIndex: 2 } ]);
    expect( subjectUnderTest.firstRecord ).toBeDefined();
    expect( subjectUnderTest.firstRecord ).toBe(1);
    expect( subjectUnderTest.lastRecord ).toBeDefined();
    expect( subjectUnderTest.lastRecord ).toBe(5);
  });


  it("should calculate firstRecord and lastRecord accoring to changes in currentPageIndex", () => {
    subjectUnderTest.currentPageIndex = 2;
    subjectUnderTest.ngOnInit();
    expect( subjectUnderTest.firstRecord ).toBe(11);
    expect( subjectUnderTest.lastRecord ).toBe(12);
  });


  it('onPageIndexClicked should navigate to current url fragment passing index', () => {
    subjectUnderTest.onPageIndexClicked(1);

    expect( routerStub.navigate ).toHaveBeenCalledWith(
      [ '/foo', 1 ], { replaceUrl: true } );

    routerStub.navigate.calls.reset();
  });


  it('onPageIndexClicked should NOT navigate if pageIndex is lower than zero', () => {
    subjectUnderTest.onPageIndexClicked(-1);

    expect( routerStub.navigate ).not.toHaveBeenCalled();

    routerStub.navigate.calls.reset();
  });


  it('onPageIndexClicked should NOT navigate if pageIndex is bigger than pages length', () => {
    subjectUnderTest.onPageIndexClicked(3);

    expect( routerStub.navigate ).not.toHaveBeenCalled();

    routerStub.navigate.calls.reset();
  });

});
