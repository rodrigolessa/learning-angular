import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequerenteListarComponent } from './requerente-listar.component';

describe('RequerenteListarComponent', () => {
  let component: RequerenteListarComponent;
  let fixture: ComponentFixture<RequerenteListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequerenteListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequerenteListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
