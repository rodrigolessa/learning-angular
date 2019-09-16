import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObraListarComponent } from './obra-listar.component';

describe('ObraListarComponent', () => {
  let component: ObraListarComponent;
  let fixture: ComponentFixture<ObraListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObraListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObraListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
