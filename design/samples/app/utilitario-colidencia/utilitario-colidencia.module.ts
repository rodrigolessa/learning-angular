import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../shared/material.module";
import { FormsModule, FormBuilder } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { EliminarImagensDuplicadasComponent } from "./pages/eliminar-imagens-duplicadas/eliminar-imagens-duplicadas";
import { UtilitarioColidenciaService } from "./utilitario-colidencia.service";
import { UtilitarioColidenciaRoutingModule } from "./utilitario-colidencia-routing.module";
import { PrototipoPainelNominativaComponent } from "./pages/prototipo-painel-nominativa/prototipo-painel-nominativa";

@NgModule({
  imports: [
    CommonModule,
    UtilitarioColidenciaRoutingModule,
    SharedModule,
    FormsModule,
    MaterialModule
  ],
  providers: [UtilitarioColidenciaService],
  declarations: [
    EliminarImagensDuplicadasComponent,
    PrototipoPainelNominativaComponent
  ],
  entryComponents: []
})
export class UtilitarioColidenciaModule {}
