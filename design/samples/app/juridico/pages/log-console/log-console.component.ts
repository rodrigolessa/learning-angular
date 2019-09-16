import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog, MatPaginator, MatSnackBar } from "@angular/material";
import { Tribunal } from "../tribunal/tribunal.model";
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

@Component({
  selector: "app-log-console",
  templateUrl: "./log-console.component.html",
  styleUrls: ["./log-console.component.scss"],
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
export class LogConsoleComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild("txtFiltro") txtFiltro: ElementRef;
  @ViewChild("form") form: FormGroup;

  title = "Log de Erros do Console de Correção";
  dataSourceTribunais: Tribunal;
  dataSourceOriginal: any;
  dataSourceConsoleLog = [];
  data = [];
  isLoadingResults = true;
  busca: any = {
    texto: ""
  };
  resultado = false;
  columnsToDisplay = [
    "Data",
    "Descricao",
    "Excluir"
  ];
  columnsToDisplayDetails = ["Descricao"];
  quantidadeRegistros;
  filtroMensagem = "";
  quantidadePagina = 15;
  breadcumbs = {
    titulo: "Log de Console",
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
        titulo: "Log de Console",
        link: "/juridico/logconsole",
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
    private snackBar: MatSnackBar
  ) {
    app.esconderLoading(true);
  }

  ngOnInit() {
    this.snackBar.dismiss();
    this.app.traduzirPaginator(this.paginator);
    this.paginator.pageSize = this.quantidadePagina;
    this.obterConsoleLog();
  }

  irPara(url: string) {
    this.router.navigate([`/${url}`]);
  }

  limparBusca() {
    this.snackBar.dismiss();
    this.busca.texto = "";
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.app.exibirLoading();
          return this._juridicoService.obterConsoleLog(
            this.paginator.pageIndex,
            this.busca.texto,
            this.paginator.pageSize
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
            this.dataSourceConsoleLog = data.Resultados;
            this.quantidadeRegistros = data.TotalDeRegistros;
            for (let i = 0; i < data.Resultados.length; i++) {
              // this.dataSourceConsoleLog[i].CorpoCurto = this.dataSourceConsoleLog[i].Corpo.substring(0, 100) + "...";
              // this.dataSourceConsoleLog[i].CorpoCompleto = this.dataSourceConsoleLog[i].Corpo;
              // this.dataSourceConsoleLog[i].Corpo = this.dataSourceConsoleLog[i].CorpoCurto;
              // this.dataSourceConsoleLog[i].ExibirCorpoCurto = true;
              // this.dataSourceConsoleLog[i].DescricaoArray = [];
              // this.dataSourceConsoleLog[i].DescricaoArray.push({
              // Descricao: data.Resultados[i].Descricao
              // });
              if (this.dataSourceConsoleLog[i].Resolvido != null) {
                this.dataSourceConsoleLog[i].Status = true;
              }
            }
          } else {
              this.snackBar.open("Sem resultados.", "OK",
            {duration: 5000});
              this.dataSourceConsoleLog = [];
          }
          this.app.esconderLoading();
        },
        (erro: any) => {
          this.app.esconderLoading();
        }
      );
  }

  obterConsoleLog() {
    merge(this.paginator.page)
    .pipe(
      startWith({}),
      switchMap(() => {
        this.app.exibirLoading();
        return this._juridicoService.obterConsoleLog(
          this.paginator.pageIndex,
          this.busca.texto,
          this.paginator.pageSize
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
            this.dataSourceConsoleLog = data.Resultados;
            this.quantidadeRegistros = data.TotalDeRegistros;
            for (let i = 0; i < data.Resultados.length; i++) {
              //  this.dataSourceConsoleLog[i].CorpoCurto = this.dataSourceConsoleLog[i].Descricao.substring(0, 290) + "...";
              //  this.dataSourceConsoleLog[i].CorpoCompleto = this.dataSourceConsoleLog[i].Descricao;
              //  this.dataSourceConsoleLog[i].Corpo = this.dataSourceConsoleLog[i].CorpoCurto;
              //  this.dataSourceConsoleLog[i].ExibirCorpoCurto = true;
              //  this.dataSourceConsoleLog[i].DescricaoArray = [];
              //  this.dataSourceConsoleLog[i].DescricaoArray.push({
              //   Descricao: data.Resultados[i].Descricao
              //  });
               if (this.dataSourceConsoleLog[i].Resolvido != null) {
                 this.dataSourceConsoleLog[i].Status = true;
               }
            }
          } else {
              this.snackBar.open("Sem resultados.", "OK",
            {duration: 5000});
              this.dataSourceConsoleLog = [];
          }
          this.app.esconderLoading();
        },
        (erro: any) => {
          this.app.esconderLoading();
        }
      );
  }

  caixaDeFiltros() {
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

          return this._juridicoService.obterConsoleLog(
            this.paginator.pageIndex,
            this.busca.texto,
            this.paginator.pageSize
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
            this.dataSourceConsoleLog = data.Resultados;
            this.quantidadeRegistros = data.TotalDeRegistros;
            for (let i = 0; i < data.Resultados.length; i++) {
              // this.dataSourceConsoleLog[i].CorpoCurto = this.dataSourceConsoleLog[i].Descricao.substring(0, 100) + "...";
              // this.dataSourceConsoleLog[i].CorpoCompleto = this.dataSourceConsoleLog[i].Descricao;
              // this.dataSourceConsoleLog[i].Corpo = this.dataSourceConsoleLog[i].CorpoCurto;
              // this.dataSourceConsoleLog[i].ExibirCorpoCurto = true;
              // this.dataSourceConsoleLog[i].DescricaoArray = [];
              // this.dataSourceConsoleLog[i].DescricaoArray.push({
              // Descricao: data.Resultados[i].Descricao
              // });
              if (this.dataSourceConsoleLog[i].Resolvido != null) {
                this.dataSourceConsoleLog[i].Status = true;
              }
            }
          } else {
              this.snackBar.open("Sem resultados.", "OK",
            {duration: 5000});
              this.dataSourceConsoleLog = [];
          }
          this.app.esconderLoading();
        },
        (erro: any) => {
          this.app.esconderLoading();
        }
      );
  }

  removerLog(linhaDeLog) {
    if (this.resultado) {
      this.app.exibirLoading();
      this._juridicoService
        .excluirLogConsole(linhaDeLog.Id)
        .then(
          (data: any) => {
            this.app.esconderLoading();
            this.dataSourceConsoleLog.forEach((item, index) => {
              if (item === linhaDeLog) {
                this.dataSourceConsoleLog.splice(index, 1);
              }
            });
          },
          (resErro: any) => {
            console.log("Erro ao remover o log", resErro);
            this.app.esconderLoading();
          }
        );
    }
  }

  // Observação neste método
  openDialog(linhaDeLog): void {
    const dialogRef = this.dialog.open(PerguntaDialogComponent, {
      data: {
        mensagem: `Tem certeza que deseja remover o log?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.resultado = result;
      this.removerLog(linhaDeLog);
      return result;
    });
  }
}
