import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioParametroComponent } from './usuario-parametro.component';

describe('UsuarioParametroComponent', () => {
  let component: UsuarioParametroComponent;
  let fixture: ComponentFixture<UsuarioParametroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioParametroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioParametroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
