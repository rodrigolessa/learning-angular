import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequerenteComponent } from './requerente.component';

describe('RequerenteComponent', () => {
  let component: RequerenteComponent;
  let fixture: ComponentFixture<RequerenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequerenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequerenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
