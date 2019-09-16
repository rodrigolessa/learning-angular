import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../shared/material.module";
import { FormsModule, FormBuilder } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { JuridicoRoutingModule } from "./juridico-routing.module";

import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { MonitoramentoComponent } from "./pages/monitoramento/monitoramento.component";
import { TribunalComponent } from "./pages/tribunal/tribunal.component";
import { LogMonitoramentoOabComponent } from "./pages/log-monitoramento-oab/log-monitoramento-oab.component";
import { LogMonitoramentoComponent, BottomSheetAndamentosComponent } from "./pages/log-monitoramento/log-monitoramento.component";
import { MonitoramentoDialogComponent } from "./pages/log-monitoramento/dialog/monitoramento.dialog.component";
import { MonitoramentoManterLogComponent } from "./pages/log-monitoramento/dialog/monitoramento.manter.component";
import { JuridicoService } from "./juridico.service";
import { PushSemMonitoramentoComponent } from "./pages/push-sem-monitoramento/push-sem-monitoramento.component";
import { ChaveUsuariosComponent } from "./pages/chave-usuarios/chave-usuarios.component";
import { TrelloService } from "../shared/trello.service";
import { LogConsoleComponent } from "./pages/log-console/log-console.component";


@NgModule({
  imports: [
    CommonModule,
    JuridicoRoutingModule,
    SharedModule,
    FormsModule,
    MaterialModule,

  ],
  providers: [JuridicoService, TrelloService],
  declarations: [
    DashboardComponent,
    MonitoramentoComponent,
    TribunalComponent,
    LogMonitoramentoOabComponent,
    LogMonitoramentoComponent,
    LogConsoleComponent,
    MonitoramentoDialogComponent,
    MonitoramentoManterLogComponent,
    BottomSheetAndamentosComponent,
    PushSemMonitoramentoComponent,
    ChaveUsuariosComponent,

  ],
  entryComponents: [
    MonitoramentoDialogComponent,
    MonitoramentoManterLogComponent,
    BottomSheetAndamentosComponent

  ]
})
export class JuridicoModule {}
