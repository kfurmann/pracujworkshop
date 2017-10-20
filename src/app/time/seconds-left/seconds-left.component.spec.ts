import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondsLeftComponent } from './seconds-left.component';

describe('SecondsLeftComponent', () => {
  let component: SecondsLeftComponent;
  let fixture: ComponentFixture<SecondsLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondsLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondsLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
