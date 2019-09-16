import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequerenteManterComponent } from './requerente-manter.component';

describe('RequerenteManterComponent', () => {
  let component: RequerenteManterComponent;
  let fixture: ComponentFixture<RequerenteManterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequerenteManterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequerenteManterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
