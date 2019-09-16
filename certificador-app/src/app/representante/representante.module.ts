import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepresentanteListarComponent } from './representante-listar/representante-listar.component';
import { RepresentanteManterComponent } from './representante-manter/representante-manter.component';



@NgModule({
  declarations: [RepresentanteListarComponent, RepresentanteManterComponent],
  imports: [
    CommonModule
  ]
})
export class RepresentanteModule { }
