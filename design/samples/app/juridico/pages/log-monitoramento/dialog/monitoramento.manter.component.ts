import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { MatDialogRef } from "@angular/material";
import { JuridicoService } from "../../../juridico.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppComponent } from "../../../../app.component";

@Component({
  selector: "app-monitoramento-manter",
  templateUrl: "./monitoramento.manter.component.html",
  styleUrls: ["./monitoramento.manter.component.scss"]
})
export class MonitoramentoManterLogComponent implements OnInit {
  breadcumbs = {
    titulo: "Log de Monitoramento",
    paginas: [
      {
        titulo: "Log de Monitoramento",
        link: "/juridico/logMonitoramento"
      },
      {
        titulo: "Editar Log",
        link: "/juridico/logMonitoramento",
        atual: true
      }
    ]
  };
  dataSourceTribunais = null;
  dataSourceSituacaoLog = null;
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
    private thisDialogRef: MatDialogRef<MonitoramentoManterLogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.obterTribunais();
    this.obterSituacaoMonitoramentoLog();
    this.busca.processo = this.data.NumeroDoProcesso;
    this.busca.Id = this.data.Id;
    this.busca.NumeroDoProcesso = this.data.NumeroDoProcesso;
    this.busca.SiglaDoTribunal = this.data.SiglaDoTribunal;
    this.busca.TipoDeConsulta = this.data.TipoDeConsulta;
    this.busca.Secao = this.data.Secao;
    this.busca.Comarca = this.data.Comarca;
    this.busca.Situacao = this.data.Situacao;
    this.busca.MensagemParaCliente = this.data.MensagemParaCliente;
    this.busca.Observacao = this.data.Observacao;
    this.busca.Email = this.data.Email;
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

  obterSituacaoMonitoramentoLog() {
    this._juridicoService.obterSituacaoMonitoramentoLog().then(
      (data: any) => {
        this.dataSourceSituacaoLog = data;
      },
      (resErro: any) => {
        console.log("Erro ao obter situação", resErro);
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

  salvarLog() {
    this.snackBar.dismiss();
    this._juridicoService.EditarMonitoramentoLog(this.busca).then(
      (data: any) => {
        this.snackBar.open("Salvo com sucesso!", "OK");
      },
      (resErro: any) => {
        this.snackBar.open(`Erro ao alterar o log do processo ${this.busca.NumeroDoProcesso}`, "OK");
        console.log("Erro ao alterar o log do processo", resErro);
      }
    );
  }
}
