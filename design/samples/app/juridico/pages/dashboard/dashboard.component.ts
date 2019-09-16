import { Component, OnInit } from "@angular/core";
import { AppComponent } from "../../../app.component";
import * as moment from "moment";
import { JuridicoService } from "../../juridico.service";
import { MatSnackBar } from "../../../../../node_modules/@angular/material";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  title = "dashboard";
  isLoadingResults = true;
  pushSemMonitoramento: any = {};
  pushSemMonitoramento1: any = {};
  breadcumbs = {
    titulo: "Dashboard",
    paginas: [
      {
        titulo: "Home",
        link: "/"
      },
      {
        titulo: "Jurídico",
        link: "/juridico"
      },
      {
        titulo: "Dashboard",
        link: "/juridico/dashboard",
        atual: true
      }
    ],
    acoes: [
      {
        titulo: "Versão para impressão",
        icone: "print",
        codigo: "print"
      },
      {
        titulo: "Exportar para PDF",
        icone: "save_alt",
        codigo: "pdf"
      }
    ]
  };

  datasetProcessos: any = {
    labels: [],
    data: [],
    codigo: "processos",
    titulo: "Total mensal de processos monitorados",
    loading: true,
    ativo: true
  };

  datasetProcessosValorMensal: any = {
    labels: [],
    data: [],
    codigo: "valormensalmonitoramento",
    titulo: "Valor mensal do monitoramento",
    loading: true,
    ativo: true
  };

  valorProcessosNaoMonitorados: any = {
    titulo: "Valor total não monitorados",
    codigo: "valornaomonitoradosmonitorados",
    loading: true,
    ehPositivo: true,
    cor: "#c0392b",
    ativo: true
  };

  qtdPushSemMonitoramento: any = {
    titulo: "Push não monitorados",
    codigo: "pushsemmonitoramento",
    cor: "#d35400",
    ehPositivo: false,
    loading: true,
    ativo: true
  };

  processosMonitorados: any = {
    titulo: "Processos monitorados",
    codigo: "quantidadeprocessosmonitorados",
    loading: true,
    ehPositivo: true,
    ativo: true
  };

  valorProcessosMonitorados: any = {
    titulo: "Valor total monitorados",
    codigo: "valorprocessosmonitorados",
    loading: true,
    ehPositivo: true,
    ativo: true
  };

  qtdMonitoramentosErro: any = {
    titulo: "Monitoramentos com erro",
    codigo: "monitoramentoerro",
    cor: "#d35400",
    ehPositivo: false,
    loading: true,
    ativo: true
  };

  qtdMonitoramentosNotificados: any = {
    titulo: "Monitoramentos notificados",
    codigo: "monitoramentonotificado",
    cor: "#0776A4",
    ehPositivo: false,
    loading: true,
    ativo: true
  };

  qtdMonitoramentosPublicadosApol: any = {
    titulo: "Monitoramentos publicados Apol",
    codigo: "monitoramentonotificado",
    cor: "#0776A4",
    ehPositivo: false,
    loading: true,
    ativo: true
  };

  objMonitoramentosDesatualizados: any = {
    titulo: "Monitoramentos sem atualização",
    codigo: "monitoramentoDesatualizado",
    corpo: "-",
    cor: "#0776A4",
    ehPositivo: false,
    loading: true,
    ativo: true
  };

  qtdProcessosMonitorados = 0;
  qtdMonitoramentosDesatualizados = 0;

  constructor(
    app: AppComponent,
    private _juridicoService: JuridicoService,
    private snakBar: MatSnackBar
  ) {
    app.semFundo = true;
    app.esconderLoading(true);
  }

  ngOnInit() {
    this.pushSemMonitoramento.exibir = true;
    this.obterQuantidadeMonitoramentoMes();
    this.obterPushSemMonitoramento();
    this.obterQuantidadeMonitoramentoTotal();
    this.obterMonitoramentoErro();
    this.obterMonitoramentosNotificados();
    this.obterMonitoramentosPublicadosApol();
    this.obterMonitoramentosDesatualizados();
  }

  obterPushSemMonitoramento() {
    this.pushSemMonitoramento1 = JSON.parse(
      window.localStorage.getItem("pushSemMonitoramento")
    );

    if (this.pushSemMonitoramento1) {
      if (
        moment(this.pushSemMonitoramento1.hora, "DD MM YYYY HH:mm:ss").add(
          30,
          "minute"
        ) > moment()
      ) {
        this.pushSemMonitoramento = this.pushSemMonitoramento1;
        this.qtdPushSemMonitoramento.corpo = this.pushSemMonitoramento.quantidade;
        this.valorProcessosNaoMonitorados.corpo = this.pushSemMonitoramento.valor;
        this.qtdPushSemMonitoramento.loading = false;
        this.valorProcessosNaoMonitorados.loading = false;
        this.pushSemMonitoramento.exibir = false;
      } else {
        this.pushSemMonitoramento.exibir = true;
      }
    } else {
      this.pushSemMonitoramento.exibir = true;
    }
    if (this.pushSemMonitoramento.exibir === true) {
      this._juridicoService.obterPushSemMonitoramento().then(
        (data: any) => {
          if (
            data.TotalDeRegistros === 0 ||
            data.TotalDeRegistros === "0" ||
            data.TotalDeRegistros === null
          ) {
            this.qtdPushSemMonitoramento.corpo = "0";
          } else {
            this.qtdPushSemMonitoramento.corpo = data.TotalDeRegistros;
          }
          this.valorProcessosNaoMonitorados.corpo =
            "R$" + (data.TotalDeRegistros * 0.15).toFixed(2);
          this.qtdPushSemMonitoramento.loading = false;
          this.valorProcessosNaoMonitorados.loading = false;

          this.pushSemMonitoramento.hora = moment().format(
            "DD MM YYYY HH:mm:ss"
          );
          this.pushSemMonitoramento.quantidade = data.TotalDeRegistros;
          this.pushSemMonitoramento.valor = this.valorProcessosNaoMonitorados.corpo;
          this.pushSemMonitoramento.exibir = true;
          this.pushSemMonitoramento.Resultados = data.Resultados;
          window.localStorage.setItem(
            "pushSemMonitoramento",
            JSON.stringify(this.pushSemMonitoramento)
          );
        },
        (resErro: any) => {
          console.log("Erro obter qtd de push sem monitoramento", resErro);

          this.qtdPushSemMonitoramento.loading = false;
          this.valorProcessosNaoMonitorados.loading = false;
          this.qtdPushSemMonitoramento.corpo = "erro";
          this.valorProcessosNaoMonitorados.corpo = "erro";
        }
      );
    }
  }

  obterQuantidadeMonitoramentoMes() {
    const dataInicio = moment()
      .add("month", -6)
      .format("YYYY-MM-DD");
    const dataFinal = moment().format("YYYY-MM-DD");

    this._juridicoService
      .quantidadeDeMonitoramentosPorMes(dataInicio, dataFinal)
      .then(
        (data: any) => {
          this.datasetProcessos.dataset = [];
          this.datasetProcessos.tipo = "bar";
          this.datasetProcessosValorMensal.dataset = [];
          this.datasetProcessosValorMensal.tipo = "bar";

          for (let i = 0; i < data.Data.length; i++) {
            this.datasetProcessos.labels.push(data.Data[i].Label);
            this.datasetProcessos.data.push(data.Data[i].Value);
            this.datasetProcessosValorMensal.labels.push(data.Data[i].Label);
            this.datasetProcessosValorMensal.data.push(
              (data.Data[i].Value * 0.15).toFixed(2)
            );
          }

          this.datasetProcessos.dataset = [
            {
              label: this.datasetProcessos.titulo,
              fill: true,
              lineTension: 0.1,
              color: "white",
              borderDash: [],
              borderCapStyle: "butt",
              borderJoinStyle: "miter",
              // backgroundColor: "rgba(0, 0, 0, 1.0)",
              backgroundColor: "rgba(7,118,164,0.5)",
              borderColor: "rgba(77,132,156,1.0)",
              pointBackgroundColor: "rgba(45, 52, 54,1.0)",
              pointBorderColor: "rgba(99, 110, 114,1.0)",
              pointHoverBackgroundColor: "rgba(99, 110, 114,1.0)",
              pointHoverBorderColor: "rgba(45, 52, 54,1.0)",
              pointRadius: 6,
              pointHitRadius: 10,
              data: this.datasetProcessos.data
            }
          ];
          this.datasetProcessos.loading = false;

          this.datasetProcessosValorMensal.dataset = [
            {
              label: this.datasetProcessosValorMensal.titulo,
              fill: true,
              lineTension: 0.1,
              color: "white",
              borderDash: [],
              borderCapStyle: "butt",
              borderJoinStyle: "miter",
              // backgroundColor: "rgba(0, 0, 0, 1.0)",
              backgroundColor: "rgba(7,118,164,0.5)",
              borderColor: "rgba(77,132,156,1.0)",
              pointBackgroundColor: "rgba(45, 52, 54,1.0)",
              pointBorderColor: "rgba(99, 110, 114,1.0)",
              pointHoverBackgroundColor: "rgba(99, 110, 114,1.0)",
              pointHoverBorderColor: "rgba(45, 52, 54,1.0)",
              pointRadius: 6,
              pointHitRadius: 10,
              data: this.datasetProcessosValorMensal.data
            }
          ];
          this.datasetProcessosValorMensal.loading = false;
        },
        (resErro: any) => {
          console.log("Erro obter quantidade de processos por mês", resErro);
          this.datasetProcessos.loading = false;
          this.datasetProcessosValorMensal.loading = false;
        }
      );
  }

  obterQuantidadeMonitoramentoTotal() {
    this.qtdProcessosMonitorados = null;
    this._juridicoService.obterTotalDeMonitoramentosAtivos().then(
      (data: any) => {
        this.qtdProcessosMonitorados = data;
        this.valorProcessosMonitorados.corpo =
          "R$" + (this.qtdProcessosMonitorados * 0.15).toFixed(2);
        this.processosMonitorados.corpo = this.qtdProcessosMonitorados;
        this.valorProcessosMonitorados.loading = false;
        this.processosMonitorados.loading = false;
      },
      (resErro: any) => {
        console.log("Erro obter quantidade de processos", resErro);
        this.processosMonitorados.loading = false;
        this.valorProcessosMonitorados.loading = false;
        this.valorProcessosMonitorados.corpo = "R$0,00";
        this.processosMonitorados.corpo = "0";
      }
    );
  }

  obterMonitoramentoErro() {
    this._juridicoService.obterMonitoramento(1, "", 15, true, false).then(
      (data: any) => {
        if (data.TotalDeRegistros !== null && data.TotalDeRegistros !== "") {
          this.qtdMonitoramentosErro.corpo = data.TotalDeRegistros.toString();
        } else {
          this.qtdMonitoramentosErro.corpo = "erro";
        }
        this.qtdMonitoramentosErro.loading = false;
      },
      (resErro: any) => {
        console.log("Erro ao obter a quantidade de erros monitorados", resErro);
        this.qtdMonitoramentosErro.loading = false;
        this.qtdMonitoramentosErro.corpo = "erro";
      }
    );
  }

  obterMonitoramentosNotificados() {
    this._juridicoService.obterLogMonitoramento(1, "", 15, true, false).then(
      (data: any) => {
        if (data.TotalDeRegistros !== null) {
          this.qtdMonitoramentosNotificados.corpo = data.TotalDeRegistros;
        } else {
          this.qtdMonitoramentosNotificados.corpo = "0";
        }
        this.qtdMonitoramentosNotificados.loading = false;
      },
      (resErro: any) => {
        console.log("Erro ao obter a quantidade de erros monitorados", resErro);
        this.qtdMonitoramentosNotificados.loading = false;
        this.qtdMonitoramentosNotificados.corpo = "erro";
        this.snakBar.dismiss();
      }
    );
  }

  obterMonitoramentosPublicadosApol() {
    this._juridicoService.obterLogMonitoramento(1, "", 15, false, true).then(
      (data: any) => {
        if (data.TotalDeRegistros !== null && data.TotalDeRegistros) {
          this.qtdMonitoramentosPublicadosApol.corpo = data.TotalDeRegistros;
        } else {
          this.qtdMonitoramentosPublicadosApol.corpo = "0";
        }
        this.qtdMonitoramentosPublicadosApol.loading = false;
      },
      (resErro: any) => {
        console.log("Erro ao obter a quantidade de erros monitorados", resErro);
        this.qtdMonitoramentosPublicadosApol.loading = false;
        this.qtdMonitoramentosPublicadosApol.corpo = "erro";
        this.snakBar.dismiss();
      }
    );
  }

  obterMonitoramentosDesatualizados() {
    this.qtdMonitoramentosDesatualizados = null;
    this._juridicoService.obterTotalDeMonitoramentosDesatualizados().then(
      (data: any) => {
        this.qtdMonitoramentosDesatualizados = data;
        this.objMonitoramentosDesatualizados.corpo = this.qtdMonitoramentosDesatualizados;
        this.objMonitoramentosDesatualizados.loading = false;
      },
      (resErro: any) => {
        console.log("Erro obter quantidade de monitoramentos", resErro);
        this.objMonitoramentosDesatualizados.loading = false;
        this.objMonitoramentosDesatualizados.corpo = "0";
      }
    );
  }

}
