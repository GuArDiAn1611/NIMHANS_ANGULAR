import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TellaComponent } from './tella.component';

describe('TellaComponent', () => {
  let component: TellaComponent;
  let fixture: ComponentFixture<TellaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TellaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TellaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
