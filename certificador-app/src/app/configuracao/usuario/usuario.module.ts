import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioParametroComponent } from './usuario-parametro/usuario-parametro.component';
import { UsuarioPerfilComponent } from './usuario-perfil/usuario-perfil.component';



@NgModule({
  declarations: [UsuarioParametroComponent, UsuarioPerfilComponent],
  imports: [
    CommonModule
  ]
})
export class UsuarioModule { }
