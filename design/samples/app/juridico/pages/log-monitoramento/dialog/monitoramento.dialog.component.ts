import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { MatDialogRef } from "@angular/material";
import { JuridicoService } from "../../../juridico.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppComponent } from "../../../../app.component";

@Component({
  selector: "app-monitoramento-dialog",
  templateUrl: "./monitoramento.dialog.component.html",
  styleUrls: ["./monitoramento.dialog.component.scss"]
})
export class MonitoramentoDialogComponent implements OnInit {
  breadcumbs = {
    titulo: "Consultar Processo",
    paginas: [
      {
        titulo: "Log de Monitoramento",
        link: "/juridico/logMonitoramento"
      },
      {
        titulo: "Consulta de Processo",
        link: "/juridico/logMonitoramento",
        atual: true
      }
    ]
  };
  dataSourceTribunais = null;
  columnsToDisplay = [
    "Instancia",
    "Processo",
    "TipoDeConsulta",
    "DescricaoDoTribunal",
    "Juiz",
    "Url"
  ];
  dataSouceProcesso;
  exibirProcesso = false;
  busca: any = {};
  isLinear = false;
  msgBusca = "Aguarde...";

  constructor(
    private _juridicoService: JuridicoService,
    private snackBar: MatSnackBar,
    private thisDialogRef: MatDialogRef<MonitoramentoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.obterTribunais();
    this.busca.processo = this.data.NumeroDoProcesso;
    this.snackBar.dismiss();
  }

  onCloseConfirm() {
    this.thisDialogRef.close("Confirm");
  }

  fecharDialog() {
    this.thisDialogRef.close();
  }

  obterTribunais() {
    this._juridicoService.obterTribunais().then(
      (data: any) => {
        this.dataSourceTribunais = data;
      },
      (resErro: any) => {
        console.log("Erro obter tribunais", resErro);
      }
    );
  }

  validarNumeracaoUnica() {
    this.msgBusca = "Aguarde, validando numeração...";

    this._juridicoService.validarNumeracao(this.busca.processo).then(
      (data: any) => {
        if (data !== null) {
          this.msgBusca = "Aguarde, consultando tribunal...";
          this.obterProcessoTribunal();
        }
      },
      (resErro: any) => {
        this.msgBusca = resErro;
        console.log("Erro validar Numeracao", resErro);
      }
    );
  }

  obterProcessoTribunal() {
    this._juridicoService.obterProcessoTribunal(this.busca.processo).then(
      (data: any) => {
        this.dataSouceProcesso = data.Response;
        console.log(data.Response);
        this.exibirProcesso = true;
        this.msgBusca = "";
      },
      (resErro: any) => {
        console.log("Erro obter tribunais", resErro);
        this.msgBusca = resErro;
      }
    );
  }

  abrirLink(link) {
    window.open(link);
  }

  agendarProcesso(processo) {
    this.snackBar.dismiss();
    this._juridicoService.agendarMonitoramento(processo.ApiKey, processo.IdMonitoramento).then(
      (data: any) => {
        this.snackBar.open("Agendamento realizdo!", "OK");
        this.dataSourceTribunais = data;
      },
      (resErro: any) => {
        this.snackBar.open(`Erro ao tentar agendar o processo ${processo.NumeroDoProcesso}`, "OK");
        console.log("Erro ao tentar agendar o processo", resErro);
      }
    );
  }
}
