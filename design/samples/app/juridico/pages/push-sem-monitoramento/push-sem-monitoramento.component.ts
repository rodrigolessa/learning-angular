import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import * as moment from "moment";
import { Router } from "@angular/router";
import {
  MatPaginator,
  PageEvent,
  MatTableDataSource,
  MatDialog,
  MatSnackBar
} from "@angular/material";
import { FormGroup } from "@angular/forms";
import { PushSemMonitoramento } from "./push-sem-monitoramento.model";
import { JuridicoService } from "../../juridico.service";
import { AppComponent } from "../../../app.component";
import { distinctUntilChanged, debounceTime, tap } from "rxjs/operators";
import { fromEvent, merge, of as observableOf } from "rxjs";
import { PerguntaDialogComponent } from "../../../shared/dialogs/pergunta.dialog.component";

@Component({
  selector: "app-push-sem-monitoramento",
  templateUrl: "./push-sem-monitoramento.component.html",
  styleUrls: ["./push-sem-monitoramento.component.scss"]
})
export class PushSemMonitoramentoComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild("form")
  form: FormGroup;
  @ViewChild("txtFiltro")
  txtFiltro: ElementRef;

  title = "Push sem monitoramento";
  busca: any = {
    texto: ""
  };
  breadcumbs = {
    titulo: this.title,
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
        titulo: "Push sem Monitoramento",
        link: "/juridico/logmonitoramentooab",
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
  data = [];
  dataOriginal;
  dataSource1: any = {};
  dataSource = new MatTableDataSource<PushSemMonitoramento>(this.dataSource);
  columnsToDisplay = [
    "IdMonitoramento",
    "Processo",
    "Usuario",
    "Criacao",
    "Excluir"
  ];
  quantidadeRegistros = 0;
  filtroMensagem = "";
  isLoadingResults = false;
  isRateLimitReached = false;
  pageEvent: PageEvent;
  resultado = true;

  constructor(
    private router: Router,
    private _juridicoService: JuridicoService,
    private app: AppComponent,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    app.esconderLoading(true);
  }

  ngOnInit() {
    this.dataSource.exibir = true;
    this.app.traduzirPaginator(this.paginator);
    this.obterPushSemMonitoramento();
  }

  irPara(url: string) {
    this.router.navigate([`/${url}`]);
  }

  filtrarObterPushSemMonitoramento() {
    const dataAux = [];
    this.dataOriginal.forEach((item, index) => {
      if (
        item.NumeroDoProcesso != null &&
        item.NumeroDoProcesso.replace(/\s/g, "").toUpperCase().indexOf(
          this.busca.texto.replace(/\s/g, "").toUpperCase()
        ) !== -1
      ) {
        dataAux.push(item);
      }
    });

    this.dataSource.data = dataAux;
  }

  obterPushSemMonitoramento() {
    this.app.exibirLoading();

    this.dataSource1 = JSON.parse(
      window.localStorage.getItem("pushSemMonitoramento")
    );

    if (this.dataSource1) {
      if (
        moment(this.dataSource1.hora, "DD MM YYYY HH:mm:ss").add(30, "minute") >
        moment()
      ) {
        if (this.dataSource1.Resultados.length > 0) {
              this.dataSource1.Resultados.sort(function(x, y) {
          // Ordenar por processo que não estão monitorados pela BipBop e estão cadastrados no Apol
          return x.NaoMonitoradoBipBop === y.NaoMonitoradoBipBop
            ? 0
            : x.NaoMonitoradoBipBop
              ? -1
              : 1;
          //  return (x.NaoMonitoradoBipBop === y.NaoMonitoradoBipBop) ? 0 : x.NaoMonitoradoBipBop ? 1 : -1;
        });
        } else {
          this.snackBar.open("Sem resultados.", "OK", { duration: 5000 });
        }
        this.dataSource.data = this.dataSource1.Resultados;
        this.dataOriginal =  this.dataSource1.Resultados;
        this.dataSource.paginator = this.paginator;
        this.dataSource.exibir = false;
        this.app.esconderLoading();

      } else {
        this.dataSource.exibir = true;
      }
    } else {
      this.dataSource.exibir = true;
    }

    if (this.dataSource.exibir === true) {
      this._juridicoService.obterPushSemMonitoramento().then(
        (data: any) => {
          if (data.Resultados.length !== null && data.Resultados.length > 0) {
            data.Resultados.sort(function(x, y) {
              // Ordenar por processo que não estão monitorados pela BipBop e estão cadastrados no Apol
              return x.NaoMonitoradoBipBop === y.NaoMonitoradoBipBop
                ? 0
                : x.NaoMonitoradoBipBop
                  ? -1
                  : 1;
              //  return (x.NaoMonitoradoBipBop === y.NaoMonitoradoBipBop) ? 0 : x.NaoMonitoradoBipBop ? 1 : -1;
            });
            this.dataSource.data = data.Resultados;
            this.dataSource.paginator = this.paginator;
            this.dataOriginal = data.Resultados;

          } else {
            this.snackBar.open("Sem resultados.", "OK", { duration: 5000 });
          }
          this.app.esconderLoading();
          this.dataSource1 = {};
          this.dataSource1.hora = moment().format("DD MM YYYY HH:mm:ss");
          this.dataSource1.quantidade = data.TotalDeRegistros;
          this.dataSource1.valor = "R$" + (data.TotalDeRegistros * 0.15).toFixed(2);
          this.dataSource1.exibir = true;
          this.dataSource1.Resultados = data.Resultados;

          window.localStorage.setItem(
            "pushSemMonitoramento",
            JSON.stringify(this.dataSource1)
          );

        },
        (resErro: any) => {
          console.log("Erro obter push sem monitoramento", resErro);
          this.app.esconderLoading();
        }
      );
    }
  }

  removerPushSemMonitoramento(monitoramento) {
    if (this.resultado) {
      this.app.exibirLoading();

      this._juridicoService
        .removerPushSemMonitoramento(monitoramento.IdProcesso)
        .then(
          (data: any) => {
            this.app.esconderLoading();

            this.dataOriginal.forEach((item, index) => {
              if (item === monitoramento) {
                this.dataOriginal.splice(index, 1);
              }
            });
            this.dataSource.data = this.dataOriginal;
          },
          (resErro: any) => {
            console.log("Erro ao remover push sem monitoramento", resErro);
            this.app.esconderLoading();
          }
        );
    }
  }

  // Observação neste método
  openDialog(monitoramento): void {
    // alert("Em construção!");
    // Assim que a api de remover o monitoramento da Bibop for concluída, descomenta o código abaixo e remover o alert.
    const dialogRef = this.dialog.open(PerguntaDialogComponent, {
      data: {
        mensagem: `Tem certeza que deseja remover o monitoramento deste processo: ${
          monitoramento.NumeroDoProcesso
        }?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.resultado = result;
      this.removerPushSemMonitoramento(monitoramento);
      return result;
    });
  }

  limparBusca() {
    this.busca.texto = "";
    this.dataSource.data = this.dataOriginal;
  }
}
