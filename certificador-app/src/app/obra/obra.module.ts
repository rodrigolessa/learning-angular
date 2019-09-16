import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ObraListarComponent } from './obra-listar/obra-listar.component';
import { ObraManterComponent } from './obra-manter/obra-manter.component';



@NgModule({
  declarations: [DashboardComponent, ObraListarComponent, ObraManterComponent],
  imports: [
    CommonModule
  ]
})
export class ObraModule { }
