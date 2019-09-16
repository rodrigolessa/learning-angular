import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { MatPaginator, PageEvent, MatTableDataSource, MatSnackBar } from "@angular/material";
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
import { FormGroup } from "@angular/forms";
import { LogMonitoramentoOab } from "./log-monitoramento-oab.model";
import { JuridicoService } from "../../juridico.service";
import { AppComponent } from "../../../app.component";

@Component({
  selector: "app-log-monitoramento-oab",
  templateUrl: "./log-monitoramento-oab.component.html",
  styleUrls: ["./log-monitoramento-oab.component.scss"]
})
export class LogMonitoramentoOabComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild("form") form: FormGroup;
  @ViewChild("txtFiltro") txtFiltro: ElementRef;

  title = "Log de monitoramento da oab";
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
        titulo: "Log de monitoramento da oab",
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
  dataSource = new MatTableDataSource<LogMonitoramentoOab>(this.data);
  columnsToDisplay = ["ID", "Data", "Corpo", "Mensagem"];
  quantidadeRegistros = 0;
  quantidadePagina = 15;
  filtroMensagem = "";
  pageEvent: PageEvent;

  constructor(
    private router: Router,
    private _juridicoService: JuridicoService,
    private app: AppComponent,
    private snackBar: MatSnackBar
  ) {
    app.esconderLoading(true);
  }

  ngOnInit() {
    this.snackBar.dismiss();
    this.app.traduzirPaginator(this.paginator);
    this.paginator.pageSize = this.quantidadePagina;
    this.obeterMonitoramentoOab();
  }
  irPara(url: string) {
    this.router.navigate([`/${url}`]);
  }
  obeterMonitoramentoOab() {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.app.exibirLoading();

          return this._juridicoService.obterLogMonitoramentoOabObs(
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
            this.data = data.Resultados;
            this.quantidadeRegistros = data.TotalDeRegistros;
            for (let i = 0; i < data.Resultados.length; i++) {
              if (this.data[i].Corpo.length > 100) {
                this.data[i].CorpoCurto = this.data[i].Corpo.substring(0, 100) + "...";
              } else {
                this.data[i].CorpoCurto = this.data[i].Corpo;
              }
              this.data[i].CorpoCompleto = this.data[i].Corpo;
              this.data[i].Corpo = this.data[i].CorpoCurto;
              this.data[i].ExibirCorpoCurto = true;
            }
          } else {
            this.snackBar.open("Sem resultados.", "OK");
            this.data = [];
          }
          this.app.esconderLoading();
        },
        (erro: any) => {
          this.app.esconderLoading();
        }
      );
  }
  filtroMonitoramentoOab() {
    this.paginator.pageIndex = 0;
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.app.exibirLoading();

          return this._juridicoService.obterLogMonitoramentoOabObs(
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
            this.data = data.Resultados;
            this.quantidadeRegistros = data.TotalDeRegistros;
            for (let i = 0; i < data.Resultados.length; i++) {
              if (this.data[i].Corpo.length > 100) {
                this.data[i].CorpoCurto = this.data[i].Corpo.substring(0, 100) + "...";
              } else {
                this.data[i].CorpoCurto = this.data[i].Corpo;
              }
              this.data[i].CorpoCompleto = this.data[i].Corpo;
              this.data[i].Corpo = this.data[i].CorpoCurto;
              this.data[i].ExibirCorpoCurto = true;
            }
          } else {
            this.snackBar.open("Sem resultados.", "OK");
            this.data = [];
          }
          this.app.esconderLoading();
        },
        (erro: any) => {
          this.app.esconderLoading();
        }
      );
  }
  limparBusca() {
    this.snackBar.dismiss();
    this.busca.texto = "";
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.app.exibirLoading();

          return this._juridicoService.obterLogMonitoramentoOabObs(
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
            this.data = data.Resultados;
            this.quantidadeRegistros = data.TotalDeRegistros;
            for (let i = 0; i < data.Resultados.length; i++) {
              this.data[i].CorpoCurto = this.data[i].Corpo.substring(0, 100) + "...";
              this.data[i].CorpoCompleto = this.data[i].Corpo;
              this.data[i].Corpo = this.data[i].CorpoCurto;
              this.data[i].ExibirCorpoCurto = true;
            }
          } else {
            this.snackBar.open("Sem resultados.", "OK");
          }
          this.app.esconderLoading();
        },
        (erro: any) => {
          this.app.esconderLoading();
        }
      );
  }
}
