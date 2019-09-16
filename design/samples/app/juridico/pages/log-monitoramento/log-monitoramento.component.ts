import { Component, OnInit, Inject, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog, MatPaginator, MatSnackBar, MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from "@angular/material";
import { MonitoramentoDialogComponent } from "./dialog/monitoramento.dialog.component";
import { MonitoramentoManterLogComponent } from "./dialog/monitoramento.manter.component";
import { Tribunal } from "../tribunal/tribunal.model";
import { Andamento } from "../../models/andamento.model";
import {
  catchError,
  startWith,
  switchMap,
  map,
  debounceTime,
  distinctUntilChanged,
  tap
} from "rxjs/operators";
import { merge } from "rxjs/internal/observable/merge";
import { of as observableOf, fromEvent } from "rxjs";
import { JuridicoService } from "../../juridico.service";
import { AppComponent } from "../../../app.component";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";
import { FormGroup } from "@angular/forms";
import { TrelloService } from "../../../shared/trello.service";
import { PerguntaDialogComponent } from "../../../shared/dialogs/pergunta.dialog.component";
import { InputDialogComponent } from "../../../shared/dialogs/input.dialog.component";
import { ApiService } from "src/app/core/api.service";

@Component({
  selector: "app-log-monitoramento",
  templateUrl: "./log-monitoramento.component.html",
  styleUrls: ["./log-monitoramento.component.scss"],
  animations: [
    trigger("detailExpand", [
      state(
        "collapsed",
        style({ height: "0px", minHeight: "0", display: "none" })
      ),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      )
    ])
  ]
})
export class LogMonitoramentoComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild("txtFiltro") txtFiltro: ElementRef;
  @ViewChild("form") form: FormGroup;

  title = "Log de monitoramento";
  dataSourceTribunais: Tribunal;
  dataSourceAndamentos = [];
  dataSourceOriginal: any;
  dataSourceLogMonitoramento = [];
  dataSourceSituacaoLog = [];
  data = [];
  isLoadingResults = true;
  busca: any = {
    texto: "",
    situacao: ""
  };
  resultado = false;
  columnsToDisplay = [
    "Processo",
    "SiglaDoTribunal",
    "IdMonitoramento",
    "Usuario",
    "Empresa",
    "Data",
    "UltimaExecucaoComSucessoNaBipbop",
    "Dialog",
    "Resolvido",
    "EnviarUsuario",
    "Trello",
    "Manter",
    "IconeDetalhe"
  ];
  columnsToDisplayDetails = ["Descricao"];
  quantidadeRegistros;
  filtroMensagem = "";
  quantidadePagina = 15;
  breadcumbs = {
    titulo: "Log de monitoramento",
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
        titulo: "Log de monitoramento",
        link: "/juridico/logmonitoramento",
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
  status = false;
  exibirResolvidos = false;
  exibirPublicadosApol = false;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private _juridicoService: JuridicoService,
    private _trelloService: TrelloService,
    private app: AppComponent,
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet
  ) {
    app.esconderLoading(true);
  }

  ngOnInit() {
    this.snackBar.dismiss();
    this.app.traduzirPaginator(this.paginator);
    this.paginator.pageSize = this.quantidadePagina;
    this.obterMonitoramentoLog();

    if (this.exibirPublicadosApol === undefined || this.exibirResolvidos === undefined ) {
      this.exibirPublicadosApol = false;
      this.exibirResolvidos = false;
    }
    this.obterTribunais();
    this.obterSituacaoMonitoramentoLog();
  }

  irPara(url: string) {
    this.router.navigate([`/${url}`]);
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

  exibirAndamentos(processo) {
    this._juridicoService.obterAndamentosPorProcesso(processo.IdProcesso, 10).then(
      (data: any) => {
        this.dataSourceAndamentos = data;
        this.openBottomSheet();
      },
      (resErro: any) => {
        console.log("Erro obter andamentos", resErro);
      }
    );
  }

  exibirEmails(processo) {
    this._juridicoService.obterEmailsDeNotificacaoMonitoramentoLog(processo.Id).then(
      (data: any) => {
        this.dataSourceAndamentos = [];
        for (const element of data) {
          this.dataSourceAndamentos.push({ "Data": element.DataInclusao, "DescricaoAndamento": element.Assunto });
        }
        this.openBottomSheet();
      },
      (resErro: any) => {
        console.log("Erro ao obter e-mails", resErro);
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

  downloadXmlDeProcessos(processo) {
    this._juridicoService.downloadXmlDeProcessos(processo.IdMonitoramento);
  }

  abirDialog(row) {
    this.dialog.open(MonitoramentoDialogComponent, {
      data: row
    });
  }

  abirManter(row): void {
    const dialogManter = this.dialog.open(MonitoramentoManterLogComponent, {
      data: row
    });

    dialogManter.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }

  limparBusca() {
    this.snackBar.dismiss();
    this.busca.texto = "";
    this.busca.situacao = "";
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.app.exibirLoading();
          return this._juridicoService.obterLogMonitoramentoObs(
            this.paginator.pageIndex,
            this.busca.texto,
            this.paginator.pageSize,
            this.exibirResolvidos,
            this.exibirPublicadosApol,
            this.busca.situacao
          );
        }),
        map(data => {
          return data;
        }),
        catchError(() => {
          return observableOf([]);
        })
      )
      .subscribe(
        (data: any) => {
          if (data.TotalDeRegistros > 0) {
            this.dataSourceLogMonitoramento = data.Resultados;
            this.quantidadeRegistros = data.TotalDeRegistros;
            for (let i = 0; i < data.Resultados.length; i++) {
              this.dataSourceLogMonitoramento[i].CorpoCurto = this.dataSourceLogMonitoramento[i].Corpo.substring(0, 100) + "...";
              this.dataSourceLogMonitoramento[i].CorpoCompleto = this.dataSourceLogMonitoramento[i].Corpo;
              this.dataSourceLogMonitoramento[i].Corpo = this.dataSourceLogMonitoramento[i].CorpoCurto;
              this.dataSourceLogMonitoramento[i].ExibirCorpoCurto = true;
              this.dataSourceLogMonitoramento[i].DescricaoArray = [];
              this.dataSourceLogMonitoramento[i].DescricaoArray.push({
              Descricao: data.Resultados[i].Descricao
              });
              if (this.dataSourceLogMonitoramento[i].Resolvido != null) {
                this.dataSourceLogMonitoramento[i].Status = true;
              }
            }
          } else {
              this.snackBar.open("Sem resultados.", "OK",
            {duration: 5000});
              this.dataSourceLogMonitoramento = [];
          }
          this.app.esconderLoading();
        },
        (erro: any) => {
          this.app.esconderLoading();
        }
      );
  }

  obterMonitoramentoLog() {
    merge(this.paginator.page)
    .pipe(
      startWith({}),
      switchMap(() => {
        this.app.exibirLoading();
        return this._juridicoService.obterLogMonitoramentoObs(
          this.paginator.pageIndex,
          this.busca.texto,
          this.paginator.pageSize,
          this.exibirResolvidos,
          this.exibirPublicadosApol,
          this.busca.situacao
        );
      }),
      map(data => {
        return data;
      }),
      catchError(() => {
        return observableOf([]);
      })
    )
      .subscribe(
        (data: any) => {
          if (data.TotalDeRegistros > 0) {
            this.dataSourceLogMonitoramento = data.Resultados;
            this.quantidadeRegistros = data.TotalDeRegistros;
            for (let i = 0; i < data.Resultados.length; i++) {
              // this.dataSourceLogMonitoramento[i].CorpoCurto = this.dataSourceLogMonitoramento[i].Corpo.substring(0, 290) + "...";
              // this.dataSourceLogMonitoramento[i].CorpoCompleto = this.dataSourceLogMonitoramento[i].Corpo;
              this.dataSourceLogMonitoramento[i].Corpo = this.dataSourceLogMonitoramento[i].Corpo;
              this.dataSourceLogMonitoramento[i].ExibirCorpoCurto = true;
              this.dataSourceLogMonitoramento[i].DescricaoArray = [];
              this.dataSourceLogMonitoramento[i].DescricaoArray.push({
              Descricao: data.Resultados[i].Descricao
              });
              if (this.dataSourceLogMonitoramento[i].Resolvido != null) {
                this.dataSourceLogMonitoramento[i].Status = true;
              }
            }
          } else {
              this.snackBar.open("Sem resultados.", "OK",
            {duration: 5000});
              this.dataSourceLogMonitoramento = [];
          }
          this.app.esconderLoading();
        },
        (erro: any) => {
          this.app.esconderLoading();
        }
      );
  }

  filtroMonitoramentoLog() {
    this.paginator.pageIndex = 0;
    merge(this.paginator.page)
    .pipe(
      startWith({}),
      switchMap(() => {
        this.app.exibirLoading();
        return this._juridicoService.obterLogMonitoramentoObs(
          this.paginator.pageIndex,
          this.busca.texto,
          this.paginator.pageSize,
          this.exibirResolvidos,
          this.exibirPublicadosApol,
          this.busca.situacao
        );
      }),
      map(data => {
        return data;
      }),
      catchError(() => {
        return observableOf([]);
      })
    )
      .subscribe(
        (data: any) => {
          if (data.TotalDeRegistros > 0) {
            this.dataSourceLogMonitoramento = data.Resultados;
            this.quantidadeRegistros = data.TotalDeRegistros;
            for (let i = 0; i < data.Resultados.length; i++) {
              this.dataSourceLogMonitoramento[i].CorpoCurto = this.dataSourceLogMonitoramento[i].Corpo.substring(0, 290) + "...";
              this.dataSourceLogMonitoramento[i].CorpoCompleto = this.dataSourceLogMonitoramento[i].Corpo;
              this.dataSourceLogMonitoramento[i].Corpo = this.dataSourceLogMonitoramento[i].CorpoCurto;
              this.dataSourceLogMonitoramento[i].ExibirCorpoCurto = true;
              this.dataSourceLogMonitoramento[i].DescricaoArray = [];
              this.dataSourceLogMonitoramento[i].DescricaoArray.push({
              Descricao: data.Resultados[i].Descricao
              });
              if (this.dataSourceLogMonitoramento[i].Resolvido != null) {
                this.dataSourceLogMonitoramento[i].Status = true;
              }
            }
          } else {
              this.snackBar.open("Sem resultados.", "OK",
            {duration: 5000});
              this.dataSourceLogMonitoramento = [];
          }
          this.app.esconderLoading();
        },
        (erro: any) => {
          this.app.esconderLoading();
        }
      );
  }

  marcarComoResolvido(monitoramento) {
    if (this.resultado) {
      this.app.exibirLoading();

      this._juridicoService
        .marcarComoResolvido(monitoramento.IdMonitoramento)
        .then(
          (data: any) => {
            monitoramento.Resolvido = true;

            this.app.esconderLoading();
          },
          (resErro: any) => {
            console.log(
              "Erro ao tentar marcar o monitoramento como resolvido",
              resErro
            );
            this.app.esconderLoading();
          }
        );
    }
  }

  marcarComoResolvidoDialog(monitoramento): void {
    this.resultado = false;
    const dialogRef = this.dialog.open(PerguntaDialogComponent, {
      data: {
        mensagem: `Tem certeza que deseja marcar como resolvido este monitoramento do processo ${
          monitoramento.NumeroDoProcesso
        }?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.resultado = result;
      this.marcarComoResolvido(monitoramento);
      return result;
    });
  }

  adicionarCartaoTrelloDialog(monitoramento): void {
    this.resultado = false;
    const dialogRef = this.dialog.open(InputDialogComponent, {
      data: {
        mensagem: "Insira uma descrição para o card",
        // tslint:disable-next-line:max-line-length
        Descricao: `Usuário: ${monitoramento.Usuario}, ApiKey: ${monitoramento.ApiKey}, ID do Monitoramento: ${monitoramento.IdMonitoramento}, Descrição: `
      },
      width: "500px",
      height: "300px"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.resultado = result;
      this.adicionarCartaoTrello(monitoramento);
      return result;
    });
  }

  adicionarCartaoTrello(monitoramento) {
    if (this.resultado) {
      this.app.exibirLoading();
      this._trelloService
        .criarCardTrello(
          `Verificar Processo: ${monitoramento.NumeroDoProcesso}`,
           `${this.resultado}`
        )
        .then(
          (data: any) => {
            this.adicionarNotificacaoMonitoramentoLog(monitoramento);
            this.app.esconderLoading();
          },
          (resErro: any) => {
            console.log(
              "Erro ao tentar marcar o criar um cartão no trello",
              resErro
            );
            this.app.esconderLoading();
          }
        );
    }
  }

  // Alterar status para publicado no Trello
  adicionarNotificacaoMonitoramentoLog(monitoramento) {
    this.app.exibirLoading();

    this._juridicoService
      .adicionarNotificacaoMonitoramentoLog(monitoramento.Id)
      .then(
        (data: any) => {
          monitoramento.Notificado = 1;
          this.app.esconderLoading();
        },
        (resErro: any) => {
          console.log(
            "Erro ao tentar marcar o monitoramento como Notificado",
            resErro
          );
          this.app.esconderLoading();
        }
      );
  }

  adicionarPublicacaoMonitoramentoLog(monitoramento) {
    if (this.resultado) {
      this.app.exibirLoading();
      this._juridicoService.adicionarPublicacaoMonitoramentoLog(monitoramento.Id).then(
        (data: any) => {
          monitoramento.PublicadoNoApol = 1;

          this.app.esconderLoading();
        },
        (resErro: any) => {
          console.log(
            "Erro ao tentar marcar o monitoramento como Publicado",
            resErro
          );
          this.app.esconderLoading();
        }
      );
    }
  }

  adicionarPublicacaoMonitoramentoLogDialog(monitoramento): void {
    this.resultado = false;
    const dialogRef = this.dialog.open(PerguntaDialogComponent, {
      data: {
        mensagem: `Tem certeza que deseja notificar no Apol do usuário o processo: ${
          monitoramento.NumeroDoProcesso
        }?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.resultado = result;
      this.adicionarPublicacaoMonitoramentoLog(monitoramento);
      return result;
    });
  }

  caixaDeFiltros(ev) {
    this.busca.situacao = ev.value;
    this.snackBar.dismiss();
    merge(
      this.paginator.page,
      fromEvent(this.txtFiltro.nativeElement, "keyup").pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
        })
      )
    )
      .pipe(
        startWith({}),
        switchMap(() => {
          this.app.exibirLoading();

          return this._juridicoService.obterLogMonitoramentoObs(
            this.paginator.pageIndex,
            this.busca.texto,
            this.paginator.pageSize,
            this.exibirResolvidos,
            this.exibirPublicadosApol,
            this.busca.situacao
          );
        }),
        map(data => {
          return data;
        }),
        catchError(() => {
          return observableOf([]);
        })
      )
      .subscribe(
        (data: any) => {
          if (data.TotalDeRegistros > 0) {
            this.dataSourceLogMonitoramento = data.Resultados;
            this.quantidadeRegistros = data.TotalDeRegistros;
            for (let i = 0; i < data.Resultados.length; i++) {
              this.dataSourceLogMonitoramento[i].CorpoCurto = this.dataSourceLogMonitoramento[i].Corpo.substring(0, 100) + "...";
              this.dataSourceLogMonitoramento[i].CorpoCompleto = this.dataSourceLogMonitoramento[i].Corpo;
              this.dataSourceLogMonitoramento[i].Corpo = this.dataSourceLogMonitoramento[i].CorpoCurto;
              this.dataSourceLogMonitoramento[i].ExibirCorpoCurto = true;
              this.dataSourceLogMonitoramento[i].DescricaoArray = [];
              this.dataSourceLogMonitoramento[i].DescricaoArray.push({
              Descricao: data.Resultados[i].Descricao
              });
              if (this.dataSourceLogMonitoramento[i].Resolvido != null) {
                this.dataSourceLogMonitoramento[i].Status = true;
              }
            }
          } else {
              this.snackBar.open("Sem resultados.", "OK",
            {duration: 5000});
              this.dataSourceLogMonitoramento = [];
          }
          this.app.esconderLoading();
        },
        (erro: any) => {
          this.app.esconderLoading();
        }
      );
  }

  comunicarClientePorEmail() {
      this.app.exibirLoading();
      this._juridicoService.gerarEmailNotificacaoMonitoramentoLog().then(
        (data: any) => {
          this.app.esconderLoading();
          let msg = `${data} e-mails gravados na fila para envio!`;
          if (data === 0) {
            msg = `Não existem e-mails pendentes para envio.`;
          }
          const dialogRef = this.dialog.open(PerguntaDialogComponent, {
            data: {
              mensagem: msg
            }
          });
        },
        (resErro: any) => {
          console.log(
            "Erro ao tentar marcar o monitoramento como Publicado",
            resErro
          );
          this.app.esconderLoading();
        }
      );
  }

  openBottomSheet(): void {
    const sheetRef = this.bottomSheet.open(BottomSheetAndamentosComponent, {
      data: this.dataSourceAndamentos
    });
  }

}

// Componente para bottom sheet Popups

@Component({
  selector: "app-log-monitoramento.component.sheet",
  templateUrl: "log-monitoramento.component.sheet.html",
})
export class BottomSheetAndamentosComponent implements OnInit {

  busca: any = {};

  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetAndamentosComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {}

  ngOnInit() {
    this.busca = this.data;
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
