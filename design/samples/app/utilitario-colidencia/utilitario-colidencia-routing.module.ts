import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EliminarImagensDuplicadasComponent } from "./pages/eliminar-imagens-duplicadas/eliminar-imagens-duplicadas";
import { PrototipoPainelNominativaComponent } from "./pages/prototipo-painel-nominativa/prototipo-painel-nominativa";

const routes: Routes = [

  { path: "eliminarimagensduplicadas", component: EliminarImagensDuplicadasComponent },
  { path: "prototipopainelnominativa", component: PrototipoPainelNominativaComponent },
  {
    path: "**",
    redirectTo: "eliminarimagensduplicadas",
    pathMatch: "full"
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class UtilitarioColidenciaRoutingModule {}
