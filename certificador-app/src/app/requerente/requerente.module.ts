import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequerenteListarComponent } from './requerente-listar/requerente-listar.component';
import { RequerenteManterComponent } from './requerente-manter/requerente-manter.component';



@NgModule({
  declarations: [RequerenteListarComponent, RequerenteManterComponent],
  imports: [
    CommonModule
  ]
})
export class RequerenteModule { }
