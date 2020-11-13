import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { of } from 'rxjs';


describe('AppComponent', () => {
  let fixture:ComponentFixture<AppComponent>;
  let subjectUnderTest:AppComponent;
  let titleService:Title;
  let spyTitleServiceSet:jasmine.Spy;
  let router:Router;
  let location:Location;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavigationComponent
      ],
      providers: [ Title ],
      imports: [
        RouterModule.forRoot([
          {
            path: "articles",
            component: PageNotFoundComponent,
            data: {
              title: "The title is now FOO",
              breadcrumb: "foo"
            }
          }, {
            path: "tutorials",
            component: PageNotFoundComponent,
            data: {
              title: "The title is now BAR",
              breadcrumb: "bar"
            }
          }, {
            path: "**",
            component: PageNotFoundComponent
          }
        ]
      ) ],
    });
  });

  beforeEach( () => {
    fixture = TestBed.createComponent(AppComponent);
    subjectUnderTest = fixture.componentInstance;

    titleService = TestBed.inject(Title);
    spyTitleServiceSet = spyOn(titleService, "setTitle");

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    // avoid console.log warning "outside Angular zone...""
    fixture.ngZone.run(() => {
      // setup the required listeners and performs initial navigation
      router.initialNavigation();
    });

    fixture.detectChanges();
  });


  it('should create the subjectUnderTest', () => {
    expect( subjectUnderTest ).toBeTruthy();
  });


  it('should have 3 public properties', () => {
    expect( subjectUnderTest.openMobileMenu ).toBeDefined();
    expect( subjectUnderTest.openMobileMenu ).toBe(false);
    expect( subjectUnderTest.breadcrumbsTitle ).toBeDefined();
    expect( subjectUnderTest.breadcrumbsTitle ).toBe("");
    expect( subjectUnderTest.showLoading ).toBeDefined();
    expect( subjectUnderTest.showLoading ).toBe(true);
  });


  it('ngOnInit listens to router events setting page title from tutorials route data', fakeAsync(
    () => {
      fixture.ngZone.run(() => {
        router.navigate(['tutorials']);
        tick(); // resolve promises

        expect( location.path()).toBe("/tutorials");
        expect( spyTitleServiceSet.calls.count() ).toBe(1);
        expect( spyTitleServiceSet ).toHaveBeenCalledWith("The title is now BAR");
        expect( subjectUnderTest.breadcrumbsTitle ).toBe("bar");
        expect( subjectUnderTest.showLoading ).toBe(false);
      });
    }
  ));


  it('ngOnInit listens to router events setting page title from articles route data', fakeAsync(
    () => {
      fixture.ngZone.run(() => {
        router.navigate(['articles']);
        tick();

        expect( location.path()).toBe("/articles");
        expect( spyTitleServiceSet.calls.count() ).toBe(1);
        expect( spyTitleServiceSet ).toHaveBeenCalledWith("The title is now FOO");
        expect( subjectUnderTest.breadcrumbsTitle ).toBe("foo");
        expect( subjectUnderTest.showLoading ).toBe(false);
     });
    }
  ));


  it('ngOnInit listens to router events setting page title to default when data not set', fakeAsync(
    () => {
      fixture.ngZone.run(() => {
        router.navigate(['DoNotExist']);
        tick();

        expect( location.path()).toBe("/DoNotExist");
        expect( spyTitleServiceSet.calls.count() ).toBe(1);
        expect( spyTitleServiceSet ).toHaveBeenCalledWith("Blog");
        expect( subjectUnderTest.breadcrumbsTitle ).toBe("");
        expect( subjectUnderTest.showLoading ).toBe(false);
     });
    }
  ));


});
