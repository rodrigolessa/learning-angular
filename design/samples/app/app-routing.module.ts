import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AuthComponent } from "./auth/auth.component";
import { ParametroUsuarioComponent } from "./configuracao-usuario/parametro-usuario/parametro-usuario.component";
import { PerfilUsuarioComponent } from "./configuracao-usuario/perfil-usuario/perfil-usuario.component";
import { EliminarImagensDuplicadasComponent } from "./utilitario-colidencia/pages/eliminar-imagens-duplicadas/eliminar-imagens-duplicadas";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "login",
    component: AuthComponent
  },
  {
    path: "juridico",
    loadChildren: "../app/juridico/juridico.module#JuridicoModule"
  },
  {
    path: "parametrosusuarios",
    component: ParametroUsuarioComponent
  },
  {
    path: "perfisusuarios",
    component: PerfilUsuarioComponent
  },
  {
    path: "utilitario/colidencia",
    loadChildren: "../app/utilitario-colidencia/utilitario-colidencia.module#UtilitarioColidenciaModule"
  },
  {
    path: "**",
    redirectTo: "",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
