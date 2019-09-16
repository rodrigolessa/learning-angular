import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObraManterComponent } from './obra-manter.component';

describe('ObraManterComponent', () => {
  let component: ObraManterComponent;
  let fixture: ComponentFixture<ObraManterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObraManterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObraManterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
