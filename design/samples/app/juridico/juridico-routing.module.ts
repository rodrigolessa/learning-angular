import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { MonitoramentoComponent } from "./pages/monitoramento/monitoramento.component";
import { LogMonitoramentoComponent } from "./pages/log-monitoramento/log-monitoramento.component";
import { LogMonitoramentoOabComponent } from "./pages/log-monitoramento-oab/log-monitoramento-oab.component";
import { TribunalComponent } from "./pages/tribunal/tribunal.component";
import { PushSemMonitoramentoComponent } from "./pages/push-sem-monitoramento/push-sem-monitoramento.component";
import { ChaveUsuariosComponent } from "./pages/chave-usuarios/chave-usuarios.component";
import { LogConsoleComponent } from "./pages/log-console/log-console.component";

const routes: Routes = [
  {
    path: "dashboard", component: DashboardComponent
  },
  { path: "monitoramento", component: MonitoramentoComponent },
  { path: "logconsole", component: LogConsoleComponent },
  { path: "logmonitoramento", component: LogMonitoramentoComponent },
  { path: "logmonitoramentooab", component: LogMonitoramentoOabComponent },
  { path: "pushsemmonitoramento", component: PushSemMonitoramentoComponent },
  { path: "tribunal", component: TribunalComponent },
  { path: "chaveusuarios", component: ChaveUsuariosComponent },
  {
    path: "**",
    redirectTo: "dashboard",
    pathMatch: "full"
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class JuridicoRoutingModule {}
