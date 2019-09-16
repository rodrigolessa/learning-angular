import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentanteListarComponent } from './representante-listar.component';

describe('RepresentanteListarComponent', () => {
  let component: RepresentanteListarComponent;
  let fixture: ComponentFixture<RepresentanteListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepresentanteListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepresentanteListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
