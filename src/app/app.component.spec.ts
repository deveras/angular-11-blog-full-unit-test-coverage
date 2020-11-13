import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { of } from 'rxjs';


describe('AppComponent', () => {
  let fixture:ComponentFixture<AppComponent>;
  let app:AppComponent;
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
      imports: [ RouterTestingModule.withRoutes(
        [
          {
            path: "articles",
            component: PageNotFoundComponent,
            data: { title: "The title is now FOO" }
          }, {
            path: "tutorials",
            component: PageNotFoundComponent,
            data: { title: "The title is now BAR" }
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
    app = fixture.componentInstance;

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


  it('should create the app', () => {
    expect( app ).toBeTruthy();
  });


  it('should have as openMobileMenu public boolean', () => {
    expect( app.openMobileMenu ).toBe(false);
  });


  it('ngOnInit listens to router events setting page title from tutorials route data', fakeAsync(
    () => {
      fixture.ngZone.run(() => {
        router.navigate(['tutorials']);
        tick(); // resolve promises

        expect( location.path()).toBe("/tutorials");
        expect( spyTitleServiceSet.calls.count() ).toBe(1);
        expect( spyTitleServiceSet ).toHaveBeenCalledWith("The title is now BAR");
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
     });
    }
  ));


});
