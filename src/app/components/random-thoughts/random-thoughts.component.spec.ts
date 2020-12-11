import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { RandomThoughtsComponent } from './random-thoughts.component';
import { RandomThoughtsService } from '../../services/random-thoughts.service';
import { ThoughtModel } from '../../models/thought-model';


describe('RandomThoughtsComponent', () => {
  const mockDate = new Date();
  const expectedThought = new ThoughtModel(1, 'foo', mockDate);
  let subjectUnderTest: RandomThoughtsComponent;
  let fixture: ComponentFixture<RandomThoughtsComponent>;
  let randomThoughtsService: RandomThoughtsService;
  let spyRandomThoughtsServiceGet: jasmine.Spy;
  let spyChangeDetectorRefMarkForCheck: jasmine.Spy;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomThoughtsComponent ],
      imports: [ HttpClientTestingModule ]
    });

    fixture = TestBed.createComponent(RandomThoughtsComponent);
    subjectUnderTest = fixture.componentInstance;

    randomThoughtsService = TestBed.inject(RandomThoughtsService);
    spyRandomThoughtsServiceGet = spyOn(randomThoughtsService, 'getThought');

    // tslint:disable: no-any
    spyChangeDetectorRefMarkForCheck = spyOn((subjectUnderTest as any).changeDetectorRef, 'markForCheck');
  });


  it('should create the component', () => {
    expect( subjectUnderTest ).toBeTruthy();
  });


  it('should have a public thoughtModel property undefined', () => {
    expect( subjectUnderTest.thoughtModel ).toBeUndefined();
  });


  it('should define 1 public showLoading initialised property', () => {
    expect( subjectUnderTest.showLoading ).toBeDefined();
    expect( subjectUnderTest.showLoading ).toBe(true);
  });


  it('should have the following public methods', () => {
    expect( subjectUnderTest.ngOnInit ).toEqual(jasmine.any(Function));
    expect( subjectUnderTest.ngOnDestroy ).toEqual(jasmine.any(Function));
  });


  it('ngOnInit should collect a thoughtModel if successfull', () => {
    spyRandomThoughtsServiceGet.and.returnValue( of(expectedThought) );

    fixture.detectChanges();

    expect( spyRandomThoughtsServiceGet.calls.count() ).toBe(1);
    expect( subjectUnderTest.thoughtModel ).toEqual(expectedThought);
    expect( subjectUnderTest.showLoading ).toBe(false);
    expect( spyChangeDetectorRefMarkForCheck ).toHaveBeenCalled();
  });


  it('ngOnInit should populate', () => {
    jasmine.clock().install();
    jasmine.clock().mockDate( new Date(2020, 11, 19) );
    spyRandomThoughtsServiceGet.and.returnValue( throwError('foo bar baz') );
    const expectedModel = new ThoughtModel(0, 'Why can\'t apple fix their display arragement after each lock screen...', new Date());

    fixture.detectChanges();

    expect( spyRandomThoughtsServiceGet.calls.count() ).toBe(1);
    expect( subjectUnderTest.thoughtModel ).toEqual(expectedModel);
    expect( subjectUnderTest.showLoading ).toBe(false);
    expect( spyChangeDetectorRefMarkForCheck ).toHaveBeenCalled();

    jasmine.clock().uninstall();
  });


  it('ngOnDestroy should unsubscribe', () => {
    spyRandomThoughtsServiceGet.and.returnValue( {
      subscribe: () => {
        return {
          unsubscribe: () => 'bar'
        };
      }
    });
    fixture.detectChanges();

    // subjectUnderTest.subs is private,
    // however i want to ensure that unsubscribe is called
    // tslint:disable: no-any
    spyOn((subjectUnderTest as any).randomThoughtsServiceSubscription, 'unsubscribe');

    subjectUnderTest.ngOnDestroy();

    // tslint:disable: no-any
    expect( (subjectUnderTest as any).randomThoughtsServiceSubscription.unsubscribe ).toHaveBeenCalled();
  });

});
