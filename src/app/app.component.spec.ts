import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';


describe('AppComponent', () => {
  let fixture:ComponentFixture<AppComponent>;
  let app:AppComponent;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    });
  });

  beforeEach( () => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });


  it('should create the app', () => {
    expect( app ).toBeTruthy();
  });


  it(`should have as title 'Blog'`, () => {
    expect( app.title ).toEqual('Blog');
  });


});
