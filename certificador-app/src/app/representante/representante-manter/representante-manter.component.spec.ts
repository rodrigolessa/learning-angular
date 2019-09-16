import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentanteManterComponent } from './representante-manter.component';

describe('RepresentanteManterComponent', () => {
  let component: RepresentanteManterComponent;
  let fixture: ComponentFixture<RepresentanteManterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepresentanteManterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepresentanteManterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
